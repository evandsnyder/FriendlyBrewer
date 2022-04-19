from database.models.beer_recipe import BeerRecipe
from ..db import database

from flask_bcrypt import generate_password_hash, check_password_hash
from bson import json_util

class User(database.Document):
    first_name: str = database.StringField(required=True)
    last_name: str = database.StringField(required=True)
    email: str = database.EmailField(required=True, unique=True)
    password: str = database.StringField(required=True, min_length=6)
    recipes = database.ListField(
        database.ReferenceField("BeerRecipe", reverse_delete_rule=database.PULL)
    )
    favorites = database.ListField(database.ReferenceField('BeerRecipe'))

    def hash_password(self) -> None:
        self.password = generate_password_hash(self.password).decode("utf-8")

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)
    
    def __str__(self):
        res = f"({self.email}: {{"
        for r in self.recipes:
            res += f"({r.name})"
        return res + "}"
    
    def to_json(self):
        data = self.to_mongo()
        for i in range(len(data['recipes'])):
            data['recipes'][i] = self.recipes[i].to_mongo()
        for i in range(len(data['favorites'])):
            data['favorites'][i] = self.favorites[i].to_mongo()
        return json_util.dumps(data)


User.register_delete_rule(BeerRecipe, "created_by", database.CASCADE)