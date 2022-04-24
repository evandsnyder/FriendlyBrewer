import unittest

from app import app
from database.db import database


class BaseCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.db = database.get_db()


    def tearDown(self):
        # Delete Database collections after the test is complete
        for collection in self.db.list_collection_names():
            self.db.drop_collection(collection)