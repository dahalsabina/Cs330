#!/usr/bin/env python3
"""Simple Flask app"""
from flask import Flask, request, jsonify,session
from flask_cors import CORS, cross_origin
from config import app
from config import db
from models import MensClothing, WomensClothing, MensClothingSchema, WomensClothingSchema,Book, BookSchema, Category, CategorySchema
from sqlalchemy import update, delete
CORS(app)

app.secret_key = 'qwertyuioihgfcvbnm'
mens_clothing_schema = MensClothingSchema()
womens_clothing_schema = WomensClothingSchema()

@app.route('/api/v1/clothing/men', methods=['GET'])
@cross_origin()
def men_clothing_customer():
    # Join MensClothing and Category tables
    items = db.session.query(MensClothing, Category).join(Category, MensClothing.category_id == Category.category_id).all()
    
    # Process the query results and format them for JSON response
    results = []
    for item, category in items:
        item_data = mens_clothing_schema.dump(item)
        item_data['category_name'] = category.category_name
        results.append(item_data)

    return jsonify(results)

@app.route('/api/v1/clothing/women', methods=['GET'])
@cross_origin()
def women_clothing_customer():
    items = WomensClothing.query.all()
    return jsonify(womens_clothing_schema.dump(items, many=True))

@app.route('/api/v1/books', methods=['GET'])
@cross_origin()  
def customer_books():
    """
    Customer view to display all books.
    """
    all_books = Book.query.all()
    
    return jsonify(book_schema.dump(all_books, many=True))


@app.route('/api/v1/admin/clothing/men', methods=['GET', 'POST'])
@cross_origin()
def men_clothing():
    if request.method == 'GET':
        # Retrieve all men's clothing items along with their categories
        items = db.session.query(MensClothing, Category.category_name).join(Category, MensClothing.category_id == Category.category_id).all()
        results = []
        for item, category_name in items:
            item_data = mens_clothing_schema.dump(item)
            item_data['category_name'] = category_name
            results.append(item_data)
        return jsonify(results)
    elif request.method == 'POST':
        # Add a new men's clothing item
        new_item_data = request.json

        
        try:
            new_item = MensClothing(**new_item_data)
            db.session.add(new_item)
            db.session.commit()

            

            # Include the id in the response data
            response_data = mens_clothing_schema.dump(new_item)
            response_data['id'] = new_item.id  

            return jsonify(response_data), 201
        except Exception as e:
            # Handle any other exceptions and return an appropriate error message
            return jsonify({"error": str(e)}), 500


@app.route('/api/v1/admin/clothing/men/<int:item_id>', methods=['PUT', 'DELETE'])
@cross_origin()
def edit_delete_men_clothing(item_id):
    item = MensClothing.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    if request.method == 'PUT':
        # Edit an existing men's clothing item
        updated_data = request.json
        for key, value in updated_data.items():
            setattr(item, key, value)
            
        db.session.commit()
        return jsonify(mens_clothing_schema.dump(item))

    elif request.method == 'DELETE':
        # Remove a men's clothing item
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted"}), 200


@app.route('/api/v1/admin/clothing/women', methods=['GET', 'POST'])
@cross_origin()
def women_clothing():
    if request.method == 'GET':
        # Retrieve all women's clothing items along with their categories
        items = db.session.query(WomensClothing, Category.category_name).join(Category, WomensClothing.category_id == Category.category_id).all()
        results = []
        for item, category_name in items:
            item_data = womens_clothing_schema.dump(item)
            item_data['category_name'] = category_name
            results.append(item_data)
        return jsonify(results)
    elif request.method == 'POST':
        # Add a new women's clothing item
        new_item_data = request.json

        # Check if the received data is None
        if new_item_data is None:
            return jsonify({"error": "No data provided"}), 400

        # Continue with the creation of a new item
        try:
            new_item = WomensClothing(**new_item_data)
            db.session.add(new_item)
            db.session.commit()
            return jsonify(womens_clothing_schema.dump(new_item)), 201
        except Exception as e:
            # Handle any other exceptions and return an appropriate error message
            return jsonify({"error": str(e)}), 500


@app.route('/api/v1/admin/clothing/women/<int:item_id>', methods=['PUT', 'DELETE'])
@cross_origin()
def edit_delete_women_clothing(item_id):
    item = WomensClothing.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    if request.method == 'PUT':
        # Edit an existing women's clothing item
        updated_data = request.json
        for key, value in updated_data.items():
            setattr(item, key, value)
        db.session.commit()

        return jsonify(womens_clothing_schema.dump(item))

    elif request.method == 'DELETE':
        # Remove a women's clothing item
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted"}), 200
    


book_schema = BookSchema()

@app.route('/api/v1/admin/books', methods=['GET', 'POST'])
@cross_origin()

def books():

    if request.method == 'GET':
        # Retrieve all books
        all_books = Book.query.all()
        return jsonify(book_schema.dump(all_books, many=True))
    
    elif request.method == 'POST':
        # Add a new book
        new_book_data = request.json
        # new_book_data = request.json()
        new_book = Book(**new_book_data)
        db.session.add(new_book)
        db.session.commit()
        return jsonify(book_schema.dump(new_book)), 201
    

    

@app.route('/api/v1/admin/books/<int:book_id>', methods=['PUT', 'DELETE'])
@cross_origin()
def edit_delete_book(book_id):

    book = Book.query.all()

    if not book:
        return jsonify({"message": "Book not found"}), 404

    if request.method == 'PUT':
        

        stmt = (
            update(Book).
            where(Book.id == book_id).
            values(status='1')
        )
        db.session.execute(stmt)
        db.session.commit()
        return jsonify(book_schema.dump(book))

    elif request.method == 'DELETE':
        # Remove a book

        stmt = (
    delete(Book).
    where(Book.id == book_id)
)
        
        db.session.execute(stmt)
        db.session.commit()
        return jsonify({"message": "Book deleted"}), 200
    



if __name__ == "__main__": 
    app.run(debug=True)

    
    
    
