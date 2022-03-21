from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from controllers.routes import initialize_routes
from database.db import initialize_database


class FriendlyBrewerApiServer:
    def __init__(self):
        self.flask_app = None
        self.flask_api = None

    def initialize(self):
        self.flask_app: Flask = Flask(__name__)

        self.flask_app.config["MONGODB_SETTINGS"] = {
            "host": "mongodb+srv://homebrew_guy:qBP&zo7ATsofdFbsFEX8aPSATCKdd8Na@friendly-brewer.zxtom.mongodb.net/beer_recipes?retryWrites=true&w=majority"
        }
        self.flask_app.config.from_envvar("ENV_FILE_PATH")

        self.flask_api = Api(self.flask_app)
        self.bcrypt = Bcrypt(self.flask_app)
        self.jwt = JWTManager(self.flask_app)

        initialize_database(self.flask_app)
        initialize_routes(self.flask_api)

    def run(self):
        self.flask_app.run()


# if __name__ == "__main__":
#     # app = FriendlyBrewerApiServer()
#     # app.initialize()
#     # app.run()

app: Flask = Flask(__name__)

app.config["MONGODB_SETTINGS"] = {
    "host": "mongodb+srv://homebrew_guy:qBP&zo7ATsofdFbsFEX8aPSATCKdd8Na@friendly-brewer.zxtom.mongodb.net/beer_recipes?retryWrites=true&w=majority"
}
app.config.from_envvar("ENV_FILE_PATH")

flask_api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

initialize_database(app)
initialize_routes(flask_api)