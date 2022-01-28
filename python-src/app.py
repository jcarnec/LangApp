# app.py

# Required imports
import subprocess
import os
from sys import stdout
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS, cross_origin
from easynmt import EasyNMT
import requests

useShell = True

def getInterestRSS(category):
    return 'https://news.google.com/rss/headlines/section/topic/' + category + '?hl='


# Initialize model
model = EasyNMT('opus-mt')

# Initialize Flask app
app = Flask(__name__)
cors = CORS(app)

translation = model.translate_sentences(['This is a sentence. This is another sentence'], target_lang='es')


# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
users_ref = db.collection('users')


def sentence_splitting(self, text: str, lang: str = None):
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')

    sentences = nltk.sent_tokenize(text)

    return sentences


@app.route('/updateInterest', methods=['POST'])
def create():
    id = request.json['params']['uid']
    category = request.json['params']['category']
    dict = {}
    bool = False
    try:
        dict = users_ref.document(id).collection(
            'subscriptions').document('interests').get().to_dict()
    except:
        dict = {}

    if dict == None:
        dict = {}

    try:
        bool = users_ref.document(id).collection('subscriptions').document(
            'interests').get().to_dict()[category]
    except:
        bool = False
    shouldSubscribe = not bool
    dict[category] = shouldSubscribe
    users_ref.document(id).collection(
        'subscriptions').document('interests').set(dict)

    # Now that interests have been logged get rss links and add them to subscriptions
    if(shouldSubscribe):
        url = getInterestRSS(category)
        users_ref.document(id).collection('subscriptions').document(
            'RSSLinks').set({category: url})

    return jsonify({"success": True}), 200


@app.route('/getInterestsRSS', methods=['POST'])
def read():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    RSSUrl = users_ref.document(id).collection(
        'subscriptions').document('RSSLinks').get().to_dict()
    urlKey = list(RSSUrl.keys())[0]
    url = RSSUrl[urlKey] + language['itemValue']

    return (jsonify({'url': url}), 200)

@app.route('/translate', methods=['POST'])
def translate():
    sentence = request.json['params']['sentence']
    source = request.json['params']['learningLanguage']
    target = request.json['params']['translateLanguage']

    
    translation = model.translate(sentence, source_lang=source, target_lang=target)

    return jsonify(str(translation)), 200


@app.route('/getLanguagePair', methods=['POST'])
def getLanguagePair():
    id = request.json['params']['uid']
    learningLanguage = users_ref.document(id).collection(
        'language').document('learningLanguage').get().to_dict()
    translateLanguage = users_ref.document(id).collection('language').document('translateLanguage').get().to_dict()
    return (jsonify(learningLanguage['itemValue'],
                     translateLanguage['itemValue']), 200)


@app.route('/getTranslate', methods=['POST'])
def getTranslate():
    id = request.json['params']['uid']
    language = users_ref.document(id).collection(
        'language').document('translateLanguage').get().to_dict()
    return (jsonify(language), 200)


@app.route('/getLearning', methods=['POST'])
def getLearning():
    id = request.json['params']['uid']
    language = users_ref.document(id).collection(
        'language').document('learningLanguage').get().to_dict()
    return (jsonify(language), 200)


@app.route('/postLearning', methods=['POST'])
def setLearningLanguage():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    users_ref.document(id).collection('language').document(
        'learningLanguage').set(language)
    return ({"success": True}, 200)


@app.route('/postTranslate', methods=['POST'])
def setTranslateLanguage():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    users_ref.document(id).collection('language').document(
        'translateLanguage').set({'itemValue': language})
    return ({"success": True}, 200)


@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        users_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        users_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)
