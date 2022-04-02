import datetime
from venv import create

from database.models.user import User
from flask import Response, request
from flask_jwt_extended import create_access_token
from flask_restful import Resource


class RegisterApi(Resource):
    def post(self):
        body = request.get_json()
        user = User(**body)
        user.hash_password()
        user.save()
        user_id = user.id
        return {"id": str(user_id)}, 200


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        user = User.objects.get(email=body.get("email"))
        authorized = user.check_password(body.get("password"))
        if not authorized:
            return {"error": "Invalid email or password"}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        return {"token": access_token}, 200
