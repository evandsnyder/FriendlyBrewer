from .yeast import Yeast
from .grain import Grain
from .hop import Hop
from ..db import database


class BeerRecipe(database.Document):
    name: str = database.StringField(required=True, unique=False)
    yeast: Yeast = database.ReferenceField('Yeast')
    hops: list = database.ListField(database.ReferenceField('Hop'))
    grains: list = database.ListField(database.ReferenceField('Grain'))
    instructions: list = database.ListField(database.StringField())
    created_by = database.ReferenceField('User')
