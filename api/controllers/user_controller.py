from flask_restful import Resource
from database.models.user import User


class UserApi(Resource):
    def options(self):
        pass

    def get(self, id):
        username = User.objects.get(id=id)
        return {"username": str(username.email)}, 200