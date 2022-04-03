# FriendlyBrewer

This is a small social app designed to share beer recipes among homebrewers


## Installation

### REST API
The API is built using Python 3.10. This guide is written for Linux or Mac since I am developing on Linux. If you are on Windows, the process will be slightly different. You can find instructions for install Python on the [Python website](https://www.python.org/downloads/).

You'll also need to make sure you have `pip` installed as well as the `venv` module. From there, you can set up an environment as follows:

```bash
git clone https://github.com/evandsnyder/FriendlyBrewer.git -o friendly_brewer
cd friendly_brewer
python3.10 -m venv venv
source venv/bin/activate
pip install -r api/requirements.txt
```
Once your environment is set up, you'll need to do just a little more prep to ensure that the application is ready for first time use. Namely, create a file called `.env` with the following content:
```bash
touch .env
echo "JWT_SECRET_TOKEN='<random_string_here>'" >> .env
echo "MONGO_URI='<MongoDB Connection String>'" >> .env
export ENV_FILE_PATH=`pwd`/.env
```

If you're on windows, I leave the previous block as an exercise to the reader.

You're FINALLY ready to launch the app:
```bash
python3 api/app.py
```

### Angular Client
Work has begun on the Angular client! In order to build and run the app, execute the following instructions:
```
cd client-app
npm install
ng serve
```

### Testing
For convenience, I have added a collection of postman requests stored in the `FriendlyBrewerAPI.postman_collection.json` file. You can import that into Postman and run the requests to verify that the server works. You MUST register and Login before you can create a recipe though!

## Architecture

Friendly Brewer is a 3-tier application where the front-end, written in Angular JS, will communicate with a backend written in Python using Flask. The Flask REST API will communicate with a MongoDB database hosted on Mongo's Atlas System.