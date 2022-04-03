import datetime

from database.models.user import User
from flask import Response, request, jsonify
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from flask import current_app as app


class RegisterApi(Resource):
    def options(self):
        pass

    def post(self):
        body = request.get_json()
        app.logger.debug(f"Dumping data: {request.json}")

        if body.get("password") != body.get("confirmPassword"):
            return {"msg": "Passwords must match"}, 406

        user = User(
            email=body.get("email"),
            first_name=body.get("firstName"),
            last_name=body.get("lastName"),
            password=body.get("password"),
        )
        user.hash_password()
        user.save()
        user_id = user.id
        return {"id": str(user_id)}, 200


class LoginApi(Resource):
    def options(self):
        pass
    
    def post(self):
        body = request.get_json()
        app.logger.debug(f"Looking up user: {body.get('email')}")
        if User.objects(email=body.get("email")) is None:
            return {
                "isLoginSuccess": False,
                "errorMessage": "Invalid Username or Password",
            }, 405
        user = User.objects.get(email=body.get("email"))

        authorized = user.check_password(body.get("password"))
        if not authorized:
            return {"error": "Invalid email or password"}, 401

        expires = datetime.timedelta(days=7)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        return {"token": access_token}, 200
