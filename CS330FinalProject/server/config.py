#!/usr/bin/env python3
"""Simple Flask app config"""

import pathlib

from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from flask_cors import CORS

def create_app():
    """Create Flask app"""
    # this_app = Flask(__name__, static_folder='static/Images')

    this_app = Flask(__name__)
    
    if not pathlib.Path(".flaskenv").exists():
        load_dotenv(pathlib.Path(__file__).parent / pathlib.Path(".flaskenv"))
    
    this_app.config.from_prefixed_env()

    # Initialize CORS
    CORS(this_app)

    return this_app


app = create_app()

# Update the database URI to point to the new database file
this_dir = pathlib.Path(__file__).parent
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////" + str(
    this_dir / pathlib.Path("site_db.sqlite3")
)



db = SQLAlchemy(app)
ma = Marshmallow(app)
