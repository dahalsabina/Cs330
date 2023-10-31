#!/usr/bin/env python3
"""Flask application to use `pyjokes`"""

import random
from typing import List

import pyjokes
from flask import Flask, render_template, request

app = Flask(__name__)

joke_categories = ["all", "neutral", "chuck"]
joke_languages = ["de", "en", "es"]
joke_number = [1,5,10]


@app.route("/", methods=["GET"])
def index():
    return render_template( "base.html", categories=joke_categories,languages=joke_languages, numbers=joke_number)

    """Render the template with form"""
    


@app.route("/", methods=["POST"])
def index_jokes():

    category = request.form.get("category")

    
    language = request.form.get("language")

    num_jokes = request.form.get("number")

    if category is None or category not in joke_categories:
        category = "all" 

    if language is None or language not in joke_languages:
        language = str("en")

    if num_jokes is None:
        num_jokes = 1 

    else:
        num_jokes= int(num_jokes)
    

    return render_template("jokes.html", jokes=send_joke(language,category, num_jokes))

    """Render the template with jokes"""





def send_joke(
    language: str = "en", category: str = "all", number: int = 1
) -> List[str]:
    """Return a list of jokes"""
    jokes = []

    if category == "chuck" and language == "es":
        jokes.append('No kidding!')
    else:
        max_jokes = len(pyjokes.get_jokes(language=language, category=category))

        if number > max_jokes:
            jokes = pyjokes.get_jokes(language=language, category=category)
        else:
            for i in range(number):
                joke = pyjokes.get_joke(language=language, category=category)
                jokes.append(joke)

    return jokes
