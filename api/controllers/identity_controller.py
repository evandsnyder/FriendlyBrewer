import datetime
from .errors import InternalErrorServer, MismatchedPasswordsError, SchemaValidationError, UnauthorizedError, UserAlreadyExistsError

from database.models.user import User
from flask import request
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from flask import current_app as app

from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist


class RegisterApi(Resource):
    def options(self):
        pass

    def post(self):
        body = request.get_json()

        if body.get("password") != body.get("confirmPassword"):
            raise MismatchedPasswordsError

        try:
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
        except FieldDoesNotExist:
            raise SchemaValidationError
        except NotUniqueError:
            raise UserAlreadyExistsError
        except Exception as e:
            raise InternalErrorServer


class LoginApi(Resource):
    def options(self):
        pass
    
    def post(self):
        body = request.get_json()

        try:
            user = User.objects.get(email=body.get("email"))

            authorized = user.check_password(body.get("password"))
            if not authorized:
                return {"error": "Invalid email or password"}, 401

            expires = datetime.timedelta(days=7)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {"isLoginSuccessful": True, "token": access_token}, 200
        except (UnauthorizedError, DoesNotExist):
            raise UnauthorizedError
        except Exception as e:
            raise InternalErrorServer
