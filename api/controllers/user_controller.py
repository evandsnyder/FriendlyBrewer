from flask_restful import Resource
from database.models.user import User
from flask import Response, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required


class UserApi(Resource):
    def options(self):
        pass

    def get(self, id):
        user = User.objects.filter(id=id).exclude("password").first().select_related()
        return Response(user.to_json(), mimetype="application/json", status=200)


class MyProfileApi(Resource):
    def options(self):
        pass

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id).to_json()
        return Response(user, mimetype="application/json", status=200)

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        body = request.json()
        user = User.objects.get(id=user_id).update(**body)
        return "", 200
