#!/usr/bin/env python3
"""Simple Flask app"""

from flask import Flask, render_template, request, redirect, url_for, jsonify
from models import Product, ProductSchema,db
from flask import session
from config import app
import os



app.secret_key = os.getenv('FLASK_SECRET_KEY', 'default_secret_key')


@app.route("/")
def show_farm():
    """Show available products to customers"""
    farm = Product.query.all()
    return render_template("customer_view.html", farm=farm)



#For Owner
#Purpose: Shows the adminDashboard with add product, edit and delete functionality
@app.route("/admin")
def admin_dashboard():
    """Admin Dashboard"""
    products = Product.query.all()
    return render_template("admin_dashboard.html", products=products)


@app.route("/admin/add", methods=["GET", "POST"])
def add_product():
    """Add a new product"""
    if request.method == "POST":
        new_product = Product(
            name=request.form['name'],
            description=request.form['description'],
            image=request.form['image'],
            availability=request.form['availability'] == 'true',
            price=float(request.form['price'])
        )
        db.session.add(new_product)
        db.session.commit()
        return redirect(url_for('admin_dashboard'))

    return render_template("add_product.html")




@app.route("/admin/edit/<int:product_id>", methods=["GET", "POST"])
def edit_product(product_id):
    """Edit an existing product"""
    product = Product.query.get_or_404(product_id)
    if request.method == "POST":
        product.name = request.form['name']
        product.description = request.form['description']
        product.image = request.form['image']
        product.availability = request.form['availability'] == 'true'
        product.price = float(request.form['price'])
        db.session.commit()
        return redirect(url_for('admin_dashboard'))

    return render_template("edit_product.html", product=product)


#Purpose: Function to let owner delete the product which they don't want to show
@app.route("/admin/delete/<int:product_id>")
def delete_product(product_id):
    """Delete a product"""
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return redirect(url_for('admin_dashboard')) #remains in the admin_dashboard.html


# @app.route("/api/products")
# def api_get_products():
#     products = Product.query.all()
#     product_schema = ProductSchema(many=True)
#     return jsonify(product_schema.dump(products))







#Code Related to Cart manipulation by Customers
#https://stackoverflow.com/questions/58331469/adding-items-to-shopping-cart-python-flask

#Purpose: This function is use to add prouduct into the cart by the customers
@app.route("/add_to_cart/<int:product_id>")
def add_to_cart(product_id):
    if 'cart' not in session:
        session['cart'] = {}

    cart = session['cart']
    product_id = str(product_id)  
    if product_id in cart:
        cart[product_id] += 1  
    else:
        cart[product_id] = 1  

    session.modified = True  
    return redirect(url_for('show_farm')) #remains in the home page




#Purpose; Code to manipulate the look of cart as new items are added
@app.route("/cart")
def view_cart():
    cart_items = {}
    if 'cart' in session:
        for product_id, quantity in session['cart'].items():
            product = Product.query.get(product_id)
            if product:
                cart_items[product] = quantity

    return render_template("cart.html", cart_items=cart_items) #renders cart.html



#Purpose: Function to update the session storage with new details on items like quantity and total price to be stored
@app.route("/update_cart_item/<int:product_id>", methods=["POST"])
def update_cart_item(product_id):
    
    product_id_str = str(product_id)

    quantity = request.form.get('quantity', type=int)

    if 'cart' in session and product_id_str in session['cart']:
        if quantity > 0:
            session['cart'][product_id_str] = quantity
        else:
            session['cart'].pop(product_id_str)  

    session.modified = True
    return redirect(url_for('view_cart'))


#Purpose: Function to remove item from the cart
@app.route("/remove_from_cart/<int:product_id>")
def remove_from_cart(product_id):
    
    product_id_str = str(product_id)

    if 'cart' in session:

        if product_id_str in session['cart']:
            session['cart'].pop(product_id_str)
            

        

    session.modified = True
   

    return redirect(url_for('view_cart'))


if __name__ == "__main__":
    app.run(debug=True)
