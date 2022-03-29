from database.models.beer_recipe import BeerRecipe
from database.models.user import User
from flask import Response, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource

import logging

logger = logging.getLogger(__name__)


class AllRecipesApi(Resource):
    def get(self) -> Response:
        recipes = BeerRecipe.objects().to_json()
        return Response(recipes, mimetype="application/json", status=200)

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        body = request.get_json()
        user = User.objects.get(id=user_id)
        recipe = BeerRecipe(**body, created_by=user)
        recipe.save()
        user.update(push__recipes=recipe)
        user.save()
        recipe_id: int = recipe.id
        return {"id": str(recipe_id)}, 200


class RecipeApi(Resource):
    def get(self, id):
        recipe = BeerRecipe.objects.get(id=id).to_json()
        return Response(recipe, mimetype="application/json", status=200)
