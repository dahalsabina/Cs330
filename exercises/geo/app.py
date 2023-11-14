import pathlib
import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import sqlite3

app = Flask(__name__)

def get_data_from_db(query: str) -> list:
    """Retrieve data from the database and return to the user."""
    if __name__ == "app":
        db_dir = "."
    else:
        db_dir = "exercises/geo"

    with sqlite3.connect(pathlib.Path(db_dir) / pathlib.Path("world.sqlite3")) as conn:
        cur = conn.cursor()
        cur.execute(query)
        data = cur.fetchall()
    return data



@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        #display links to 3 options (country / region / continent)
        return render_template("index.html")

    elif request.method == "POST":
        scope = request.form.get('scope')
        return redirect(url_for('search', scope=scope))
    else:
        return "Invalid selection", 400

    


@app.route("/<string:scope>", methods=["GET", "POST"])
def search(scope: str):
    if request.method == "GET":
        if scope not in ['country', 'region', 'continent']:
            return "Invalid scope specified", 400

        query = ""
        if scope == "country":
            query = "SELECT code, name FROM Country ORDER BY name"
        elif scope == "region":
            query = "SELECT DISTINCT region FROM Country ORDER BY region"
        elif scope == "continent":
            query = "SELECT DISTINCT continent FROM Country ORDER BY continent"

        raw_options = get_data_from_db(query)

       
        if scope == "country":
            options = raw_options  
        else:
            options = [option[0] for option in raw_options]  

        return render_template(f"{scope}.html", options=options, scope=scope, details=None)


    else:
        selected_name = request.form.get('name')
        if scope == "country":
            query = f"""
        SELECT 
            Country.name, 
            Country.continent, 
            Country.region, 
            City.name AS Capital, 
            Country.surfacearea, 
            Country.population, 
            Country.governmentform, 
            Country.headofstate 
        FROM 
            Country 
        LEFT JOIN 
            City ON Country.capital = City.id 
        WHERE 
            Country.code = '{selected_name}'"""

        elif scope == "region":
            query = f"""
            SELECT 
                Country.name, 
                Country.continent, 
                Country.region, 
                City.name AS Capital, 
                Country.surfacearea, 
                Country.population, 
                Country.governmentform, 
                Country.headofstate 
            FROM 
                Country 
            LEFT JOIN 
                City ON Country.capital = City.id 
            WHERE 
                Country.region = '{selected_name}'"""
        elif scope == "continent":
            query = f"""
            SELECT 
                Country.name, 
                Country.continent, 
                Country.region, 
                City.name AS Capital, 
                Country.surfacearea, 
                Country.population, 
                Country.governmentform, 
                Country.headofstate 
            FROM 
                Country 
            LEFT JOIN 
                City ON Country.capital = City.id 
            WHERE 
                Country.continent = '{selected_name}'
                AND Country.population > 0"""
        else:
            return "Invalid scope specified", 400

        details = get_data_from_db(query)
        return render_template(f"{scope}.html", details=details, name=selected_name, options=None)