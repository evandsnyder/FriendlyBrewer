from ..db import database


class Hop(database.Document):
    name: str = database.StringField(required=True, unique=False)
    phase: str = database.StringField(required=True, unique=False)
    time: str = database.StringField(required=True, unique=False)
    amount: str = database.StringField(required=True, unique=False)
