from ..db import database


class BeerRecipe(database.Document):
    name: str = database.StringField(required=True, unique=False)
    hops: list[str] = database.ListField(database.StringField(), required=True)
    grains: list[str] = database.ListField(database.StringField(), required=True)
    created_by = database.ReferenceField('User')
