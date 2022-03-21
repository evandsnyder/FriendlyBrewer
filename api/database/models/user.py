from database.models.beer_recipe import BeerRecipe
from ..db import database

from flask_bcrypt import generate_password_hash, check_password_hash


class User(database.Document):
    email: str = database.EmailField(required=True, unique=True)
    password: str = database.StringField(required=True, min_length=6)
    recipes: list[BeerRecipe] = database.ListField(
        database.ReferenceField("BeerRecipe", reverse_delete_rule=database.PULL)
    )

    def hash_password(self) -> None:
        self.password = generate_password_hash(self.password).decode("utf-8")

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)


User.register_delete_rule(BeerRecipe, "created_by", database.CASCADE)