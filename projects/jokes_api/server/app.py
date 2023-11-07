#!/usr/bin/env python3

from flask import Flask, jsonify, request, Response
import json
import pyjokes
from flask_cors import cross_origin
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

@app.route("/api/v1/jokes")
def send_specific_joke():
    category = request.args.get('category')
    language = request.args.get('language')
    number = int(request.args.get('number', 1))

    jokes = pyjokes.get_jokes(language=language, category=category)

    if 0 < number <= len(jokes):
       
        jokes_list = [{'joke': joke} for joke in jokes[:number]]
        return jsonify(jokes_list)

    else:
        return Response(json.dumps({'error': 'Joke not found'}), status=404, mimetype='application/json')

@app.route("/api/v1/jokes/<language>/<category>/<int:id>")
def send_specific_joke_Id(language, category, id):
    jokes = pyjokes.get_jokes(language=language, category=category)

    if 0 <= id < len(jokes):
        return jsonify({"joke": jokes[id]})
    else:
        return Response(json.dumps({'error': 'Joke not found'}), status=404, mimetype='application/json')
    

@app.route('/test')
def test():
    return 'Test route is working'


if __name__ == "__main__":
    app.run(debug=True)
