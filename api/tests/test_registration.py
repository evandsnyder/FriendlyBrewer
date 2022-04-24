import json
from .BaseCase import BaseCase

class RegistrationTest(BaseCase):
    def test_successful_registration(self):
        payload = json.dumps({
            "email": "test@test.com",
            "firstName": "testFirst",
            "lastName": "testLast",
            "password": "testPass",
            "confirmPassword": "testPass"
        })

        response = self.app.post('/api/auth/signup', headers={"Content-Type": "application/json"}, data=payload)

        self.assertEqual(str, type(response.json['id']))
        self.assertEqual(200, response.status_code)