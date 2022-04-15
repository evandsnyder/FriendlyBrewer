from ..db import database


class Grain(database.Document):
    name: str = database.StringField(required=True, unique=False)
    amount: str = database.StringField(required=True, unique=False)
