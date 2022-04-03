from flask import Flask
from flask_restful import Api
from flask_restful.utils import cors
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from controllers.routes import initialize_routes
from database.db import initialize_database

app = Flask(__name__)

app.config.from_envvar("ENV_FILE_PATH")
app.config["MONGODB_SETTINGS"] = {
    "host": app.config["MONGO_URI"]
}

api = Api(app, decorators=[cors.crossdomain(origin="*", headers=['accept', 'Content-Type', 'Authorization'])])
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


initialize_database(app)
initialize_routes(api)

app.run(debug=True)


# class FriendlyBrewerApiServer:
#     def __init__(self):
#         app = None
#         api = None

#     def initialize(self):
#         app: Flask = Flask(__name__)

#         app.config.from_envvar("ENV_FILE_PATH")
#         app.config["MONGODB_SETTINGS"] = {
#             "host": app.config["MONGO_URI"]
#         }

#         self.cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
#         api = Api(app)
#         self.bcrypt = Bcrypt(app)
#         self.jwt = JWTManager(app)
        

#         initialize_database(app)
#         initialize_routes(api)

#     def run(self):
#         app.run(debug=True)


# if __name__ == "__main__":
#     app = FriendlyBrewerApiServer()
#     app.initialize()
#     app.run()
