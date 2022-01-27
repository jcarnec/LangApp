import subprocess
from random import choice, sample
from nltk.corpus import words
import random
import flask
from flask_restful import Resource, Api, reqparse

import json
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
import requests
import pandas as pd
from collections import Counter
from subprocess import call
import nltk
import json

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('words')
nltk.download('wordnet')
acceptable_pos = ['v', 'j', 'm', 'n']
baseURL = 'https://tatoeba.org/en/api_v0/search?'
default_settings = 'orphans=no&sort=random&trans_filter=limit&trans_unapproved=no&unapproved=no&rand_seed=aXyg'

def construct_clozemaster_url(query, from_, trans_to, page):

    query_string = ''

    if(query):
        query_string = '&' + query
    elif(not query):
        query_string = ''

    return baseURL + default_settings+'&from='+from_+'&trans_to='+trans_to + '&page=' + page + query_string
class sentence(Resource):

    def get_list_of_words_from_response(self, response):
        resulting_words = []

        sentences = response['results']

        for s in sentences:
            if len(resulting_words) <= 20:
                for w in nltk.pos_tag(word_tokenize(s['text']), lang="eng"):
                    if len(resulting_words) <= 20:
                        if w[1][0].lower() in acceptable_pos:
                            if len([x for x in w[0] if x.isalpha()]) > 3:
                                resulting_words.append(w[0])
        
        return resulting_words
    


    def get(self):
        parser = reqparse.RequestParser()  # initialize
        parser.add_argument('from', required=True)  # add args
        parser.add_argument('trans_to', required=True)
        parser.add_argument('query', required=False)
        parser.add_argument('length', required=True)
        parser.add_argument('sentence', required=True)
        parser.add_argument('page', required=True)
        args = parser.parse_args()
        sentence = args['sentence']
        # First thing to do is to get a random NV or NN
        tagged_sentence = nltk.pos_tag(word_tokenize(sentence), lang="eng"),

        list_of_indeces = []

        for s in tagged_sentence[0]:
            if s[1][0].lower() in acceptable_pos:
                list_of_indeces.append(tagged_sentence[0].index(s))
        
        chosen_missing_word_index = random.choice(list_of_indeces)
        chosen_missing_word = tagged_sentence[0][chosen_missing_word_index][0]

        # Get options

        request_url = construct_clozemaster_url(args['query'], args['from'], args['trans_to'], args['page'])
        response = requests.get(request_url).json()
        words = self.get_list_of_words_from_response(response)
        three_words = random.sample(words, 3)

        return {'missingWordIndex': chosen_missing_word_index, 'missingWord': chosen_missing_word, 'threeWords': three_words}


class clozemaster(Resource):

    def construct_response_from_json(self, result, length):

        result_json = []

        sentences = result['results']

        i = 0

        for s in sentences:
            if(len(word_tokenize(s['text'])) > int(length)):
                    result_json.append(
                        {
                        'tagged_sentence': nltk.pos_tag(word_tokenize(s['text']), lang="eng"),
                        'tokenised_sentence': word_tokenize(s['text']),
                        'sentence': s['text']
                        }
                    )

        return result_json


    def get(self):
        parser = reqparse.RequestParser()  # initialize
        parser.add_argument('from', required=True)  # add args
        parser.add_argument('trans_to', required=True)
        parser.add_argument('query', required=False)
        parser.add_argument('page', required=True)
        parser.add_argument('length', required=True)
        
        args = parser.parse_args()  # parse arguments to dictionary
        
        request_url = construct_clozemaster_url(args['query'], args['from'], args['trans_to'], args['page'])
        response = requests.get(request_url).json()

        filtered_response = self.construct_response_from_json(response, args['length'])

        return {'results': filtered_response}




app = flask.Flask(__name__)
api = Api(app)
# api.add_resource(clozemaster, '/clozemaster/')
api.add_resource(clozemaster, '/clozemaster')
# api.add_resource(sentence, '/sentence/')
api.add_resource(sentence, '/sentence')
# subprocess.call('./post-run-script.sh')
app.run(host="0.0.0.0")
