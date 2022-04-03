from .beer_recipe_controller import AllRecipesApi, RecipeApi
from .identity_controller import LoginApi, RegisterApi


def initialize_routes(api):
    api.add_resource(AllRecipesApi, "/api/recipes")
    api.add_resource(RecipeApi, "/api/recipes/<id>")

    api.add_resource(RegisterApi, "/api/auth/signup")
    api.add_resource(LoginApi, "/api/auth/login")
