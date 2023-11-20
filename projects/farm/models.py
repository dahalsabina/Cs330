#!/usr/bin/env python3
"""Models"""

from config import db, ma


class Product(db.Model):
    """Animal class"""

    __tablename__ = "farm"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200))
    image = db.Column(db.String(200))
    availability = db.Column(db.Boolean, default=True)
    price = db.Column(db.Float)

    def __repr__(self):
        return f"<Product(name={self.name!r})>"


class ProductSchema(ma.SQLAlchemySchema):
    """Product schema"""

    class Meta:
        """Product metadata"""

        model = Product
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    description = ma.auto_field()
    image = ma.auto_field()
    availability = ma.auto_field()
    price = ma.auto_field()
