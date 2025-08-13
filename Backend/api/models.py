from mongoengine import Document, StringField, ReferenceField, FloatField
from django.contrib.auth.hashers import make_password, check_password
import uuid

class User(Document):
    username = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    meta = {
        'collection': 'users'  # optional: name of MongoDB collection
    }

class Resume(Document):
    resumeId = StringField(required=True, unique=True, default=lambda: str(uuid.uuid4()))
    user = ReferenceField(User, required=True)  # Link to User model
    atsScore = FloatField(required=True, min_value=0, max_value=100)  # ATS score (0-100)

    meta = {
        'collection': 'resumes'  # MongoDB collection name
    }
