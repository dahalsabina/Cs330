#!/usr/bin/env python3
"""Build the database"""

import csv
import pathlib

import sqlalchemy as sa
from sqlalchemy.orm import scoped_session, sessionmaker

from models import MensClothing, WomensClothing, Category, Book

def init_db(filename: str):
    """Initialize the database"""
    this_dir = pathlib.Path(__file__).parent
    if pathlib.Path(f"{this_dir}/{filename}.sqlite3").exists():
        pathlib.Path(f"{this_dir}/{filename}.sqlite3").unlink()
    
    engine = sa.create_engine(f"sqlite:////{this_dir}/{filename}.sqlite3")
    session = scoped_session(sessionmaker(bind=engine))

    # Create all tables
    MensClothing.metadata.create_all(engine)
    WomensClothing.metadata.create_all(engine)
    Category.metadata.create_all(engine)
    Book.metadata.create_all(engine)


    # Load Categories
    load_data_from_csv(session, Category, "categories.csv")

    # Load Mens Clothing
    load_data_from_csv(session, MensClothing, "mens_clothing.csv")

    # Load Womens Clothing
    load_data_from_csv(session, WomensClothing, "womens_clothing.csv")


    load_data_from_csv(session, Book, "books.csv")

    session.commit()

def load_data_from_csv(session, model, csv_file):
    """Load data from a CSV file into the given model"""
    with open(csv_file, "r", encoding="utf-8") as f:  # Note the encoding
        content = csv.DictReader(f)
        for item in content:
            # Clean up fieldnames to remove BOM if present
            item = {key.lstrip('\ufeff'): value for key, value in item.items()}

            obj = model(**item)
            session.add(obj)
        session.commit()


def main():
    """This is the main function"""
    init_db("site_db")

if __name__ == "__main__":
    main()
