# app.py

# Required imports
import subprocess
import os
from sys import stdout
from unittest import case
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from flask_cors import CORS, cross_origin
from easynmt import EasyNMT
import requests

useShell = True

def getInterestLink(category):
    return 'https://news.google.com/rss/headlines/section/topic/' + category + '?hl='

def getKeywordUrl(keyword):
    return 'https://news.google.com/rss/search?q=' + keyword + '&hl='

def getWebsiteUrl(website):
    return 'https://news.google.com/rss/search?q=allinurl:' + website + '&hl='

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





@app.route('/updateKeyword', methods=['POST'])
def updateKeyword():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    keyWord = request.json['params']['keyword']
    url = getKeywordUrl(keyWord)

    try:
        users_ref.document(id).collection('subscriptions').document('language').collection(language).document(
            'keywordLinks').update({keyWord: url})
    except:
        users_ref.document(id).collection('subscriptions').document('language').collection(language).document(
            'keywordLinks').set({keyWord: url})

    return jsonify({'url': url + language}), 200



@app.route('/updateInterest', methods=['POST'])
def updateInterest():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    category = request.json['params']['category']
    dict = {}
    bool = False
    try:
        dict = users_ref.document(id).collection(
            'subscriptions').document('language').collection(language).document('interests').get().to_dict()
    except:
        dict = {}

    if dict == None:
        dict = {}

    try:
        bool = users_ref.document(id).collection('subscriptions').document('language').collection(language).document(
            'interests').get().to_dict()[category]
    except:
        bool = False
    shouldSubscribe = not bool
    dict[category] = shouldSubscribe
    users_ref.document(id).collection(
        'subscriptions').document('language').collection(language).document('interests').set(dict)

    return jsonify({'url': getInterestLink(category) + language, 'subscribed': shouldSubscribe}), 200



@app.route('/updateWebsite', methods=['POST'])
def updateWebsite():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    website = request.json['params']['website']
    url = getWebsiteUrl(website)

    try:
        users_ref.document(id).collection('subscriptions').document('language').collection(language).document(
            'websiteLinks').update({str(website): url})
    except:
        users_ref.document(id).collection('subscriptions').document('language').collection(language).document(
            'websiteLinks').set({str(website): url})

    return jsonify({'url': url + language}), 200


@app.route('/getKeyword', methods=['POST'])
def getKeyword():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    RSSUrl = users_ref.document(id).collection(
        'subscriptions').document('language').collection(language).document('keywordLinks').get().to_dict()
    urlKey = list(RSSUrl.keys())[0]
    url = RSSUrl[urlKey] + language

    return (jsonify({'url': url}), 200)


@app.route('/getInterestsRSS', methods=['POST'])
def getInterest():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    RSSUrl = users_ref.document(id).collection(
        'subscriptions').document('language').collection(language).document('interests').get().to_dict()
    urlKey = list(RSSUrl.keys())[0]
    url = getInterestLink(urlKey) + language

    return (jsonify({'url': url}), 200)


@app.route('/subscribedTo', methods=['POST'])
def getSubscribedTo():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    resultDict = users_ref.document(id).collection(
        'subscriptions').document('language').collection(language).document('interests').get().to_dict()
    

    return (jsonify({'dict': resultDict}), 200)





@app.route('/getWebsite', methods=['POST'])
def getWebsit():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    RSSUrl = users_ref.document(id).collection(
        'subscriptions').document('language').collection(language).document('websiteLinks').get().to_dict()
    urlKey = list(RSSUrl.keys())[0]
    url = RSSUrl[urlKey] + language

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

@app.route('/getSubs', methods=['POST'])
def getSubs():
    id = request.json['params']['uid']
    language = request.json['params']['language']
    result = users_ref.document(id).collection('subscriptions').document('language').collection(language)
    array_of_links = []
    for r in result.get(): 
        print(r.id)
        print(r.to_dict())
        d = r.to_dict()
        for k in d: 
            v = d[k]
            if(r.id == 'interests'):
                if(v):
                    array_of_links.append({'type': r.id, 'key': k, 'link': getInterestLink(k) + language})
            elif(r.id == 'keywordLinks'):
                array_of_links.append({'type': r.id, 'key': k, 'link': v + language})
            elif(r.id == 'websiteLinks'):
                array_of_links.append({'type': r.id, 'key': k, 'link': v + language})
    
    return jsonify({'result': array_of_links}), 200

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
