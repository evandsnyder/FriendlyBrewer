from flask import Flask
from flask_restful import Api
from flask_restful.utils import cors
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from controllers.routes import initialize_routes
from database.db import initialize_database
from controllers.errors import errors

app = Flask(__name__)

app.config.from_envvar("ENV_FILE_PATH")
app.config["MONGODB_SETTINGS"] = {
    "host": app.config["MONGO_URI"]
}

api = Api(app, decorators=[cors.crossdomain(origin="*", headers=['accept', 'Content-Type', 'Authorization'])], errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


initialize_database(app)
initialize_routes(api)

app.run(debug=True)