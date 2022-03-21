from .beer_recipe_controller import AllRecipesApi, RecipeApi
from .identity_controller import LoginApi, RegisterApi


def initialize_routes(api):
    api.add_resource(AllRecipesApi, "/recipes")
    api.add_resource(RecipeApi, "/recipes/<id>")

    api.add_resource(RegisterApi, "/auth/signup")
    api.add_resource(LoginApi, "/auth/login")
