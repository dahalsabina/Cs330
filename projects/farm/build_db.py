#!/usr/bin/env python3
"""Build the database"""

import csv
import pathlib

import sqlalchemy as sa
from sqlalchemy.orm import scoped_session, sessionmaker

from models import Product

def init_db(filename: str):
    """Initialize the database"""
    this_dir = pathlib.Path(__file__).parent
    if pathlib.Path(f"{this_dir}/{filename}.sqlite3").exists():
        pathlib.Path(f"{this_dir}/{filename}.sqlite3").unlink()
    engine = sa.create_engine(f"sqlite:////{this_dir}/{filename}.sqlite3")
    session = scoped_session(sessionmaker(bind=engine))

    Product.metadata.create_all(engine)

    with open(f"{filename}.csv", "r", encoding="utf8") as f:
        content = csv.DictReader(f)
        for item in content:
            availability_bool = item["availability"] == "TRUE"
            a_product = Product(
                id=item.get('\ufeffid', item.get('id')),  
                name=item["name"],
                description=item["description"],
                image=item["image"],
                availability= availability_bool,
                price=item["price"],
            )
            session.add(a_product)
        session.commit()



def main():
    """This is the main function"""
    init_db("farm")


if __name__ == "__main__":
    main()
