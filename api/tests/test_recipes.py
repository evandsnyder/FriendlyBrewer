import json
from .BaseCase import BaseCase


class RecipeTest(BaseCase):
    def test_successful_login_and_create_recipe(self):
        register_payload = json.dumps(
            {
                "email": "test@test.com",
                "firstName": "testFirst",
                "lastName": "testLast",
                "password": "testPass",
                "confirmPassword": "testPass",
            }
        )
        login_payload = json.dumps({"email": "test@test.com", "password": "testPass"})

        self.app.post(
            "/api/auth/signup",
            headers={"Content-Type": "application/json"},
            data=register_payload,
        )
        login_response = self.app.post(
            "/api/auth/login",
            headers={"Content-Type": "application/json"},
            data=login_payload,
        )

        self.assertEqual(str, type(login_response.json["token"]))
        self.assertEqual(200, login_response.status_code)

        login_token = login_response.json["token"]

        recipe_payload = json.dumps(
            {
                "name": "test_recipe",
                "description": "desc",
                "yeast": "test_yeast",
                "hops": ["test_hop_1"],
                "grains": ["test_grain_1"],
                "instructions": ["test_inst_1"],
            }
        )

        recipe_response = self.app.post(
            "/api/recipes",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {login_token}",
            },
            data=recipe_payload,
        )
        self.assertEqual(str, type(recipe_response.json["id"]))
        self.assertEqual(200, recipe_response.status_code)
