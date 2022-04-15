from flask import Flask
from flask_mongoengine import MongoEngine

database = MongoEngine()

def initialize_database(app: Flask) -> None:
    database.init_app(app)
