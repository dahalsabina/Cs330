#!/usr/bin/env python3
"""Models"""

from config import db, ma

class Category(db.Model):
    __tablename__ = "categories"
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"<Category(category_name={self.category_name!r})>"

class CategorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Category
        load_instance = True

    category_id = ma.auto_field()
    category_name = ma.auto_field()




class MensClothing(db.Model):
    __tablename__ = "mens_clothing"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float)
    size = db.Column(db.String(50))
    color = db.Column(db.String(50))
    image = db.Column(db.String(200))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'))
    category = db.relationship('Category', backref='mens_clothing', lazy=True)
    status = db.Column(db.Integer)


    def __repr__(self):
        return f"<MensClothing(name={self.name!r})>"

class MensClothingSchema(ma.SQLAlchemySchema):
    class Meta:
        model = MensClothing
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    price = ma.auto_field()
    size = ma.auto_field()
    color = ma.auto_field()
    image = ma.auto_field()
    category_name = ma.Method("get_category_name")
    status = ma.auto_field()

    def get_category_name(self, obj):
        # This method will extract the category name from the category object
        return obj.category.category_name if obj.category else None

class WomensClothing(db.Model):
    __tablename__ = "womens_clothing"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float)
    size = db.Column(db.String(50))
    color = db.Column(db.String(50))
    image = db.Column(db.String(200))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'))
    category = db.relationship('Category', backref='womens_clothing', lazy=True)
    status = db.Column(db.Integer)

    def __repr__(self):
        return f"<WomensClothing(name={self.name!r})>"

class WomensClothingSchema(ma.SQLAlchemySchema):
    class Meta:
        model = WomensClothing
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    price = ma.auto_field()
    size = ma.auto_field()
    color = ma.auto_field()
    image = ma.auto_field()
    category_name = ma.Method("get_category_name")
    status = ma.auto_field()

    def get_category_name(self, obj):
        # This method will extract the category name from the category object
        return obj.category.category_name if obj.category else None

# 
# 
# -------------------------------------------------------------------
# 
# 

class Book(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    isbn = db.Column(db.String(13))  # Assuming ISBN is a string
    publication_year = db.Column(db.Integer)
    image = db.Column(db.String(200))  # Path or URL to the book's image
    genre = db.Column(db.String(50))
    status = db.Column(db.Integer)
    link = db.Column(db.String)

    def __repr__(self):
        return f"<Book(title={self.title!r}, isbn={self.isbn})>"

class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        load_instance = True

    id = ma.auto_field()
    title = ma.auto_field()
    isbn = ma.auto_field()
    publication_year = ma.auto_field()
    image = ma.auto_field()
    genre = ma.auto_field()
    status = ma.auto_field()
    link=ma.auto_field()
