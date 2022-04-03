class InternalErrorServer(Exception):
    pass

class SchemaValidationError(Exception):
    pass

class UpdatingRecipeError(Exception):
    pass

class DeleteRecipeError(Exception):
    pass

class RecipeNotFoundError(Exception):
    pass

class UserAlreadyExistsError(Exception):
    pass

class UnauthorizedError(Exception):
    pass

class MismatchedPasswordsError(Exception):
    pass

errors = {
    "InternalErrorServer": {
        "message": "Something went wrong on our end :(",
        "status": 400
    },
    "SchemaValidationError": {
        "message": "Request is missing required fields",
        "status": 400
    },
    "UpdatingRecipeError": {
        "message": "There was an error updating the recipe",
        "status": 400
    },
    "DeleteRecipeError": {
        "message": "Error deleting a recipe",
        "status": 400
    },
    "RecipeNotFoundError": {
        "message": "Could not find the recipe you're looking for",
        "status": 400
    },
    "UserAlreadyExistsError": {
        "message": "User with given email address already exists",
        "status": 400
    },
    "UnauthorizedError": {
        "message": "Invalid Username or password",
        "status": 401
    },
    "MismatchedPasswordsError": {
        "message": "Passwords must match",
        "status": 400
    }
}