from ..db import database


class Yeast(database.Document):
    name: str = database.StringField(required=True, unique=False)
    targetTemp: str = database.StringField(required=True, unique=False)
