from email.policy import default
from random import choice
from tkinter import CASCADE
from typing import Required
from mongoengine import Document, StringField, ReferenceField, FloatField, FileField, DictField
from django.contrib.auth.hashers import make_password, check_password
import uuid


# class User(Document):
#     username = StringField(required=True, unique=True)
#     email = StringField(required=True, unique=True)
#     password = StringField(required=True)
#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)

#     meta = {
#         'collection': 'users'  # optional: name of MongoDB collection
#     }

from mongoengine import ListField, StringField

# class User(Document):
#     username = StringField(required=True, unique=True)
#     email = StringField(required=True, unique=True)
#     password = StringField(required=True)

#     # ✅ New field: track applied jobs (store job IDs)
#     applied_jobs = ListField(StringField())

#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)

#     meta = {
#         'collection': 'users'
#     }


# from mongoengine import Document, StringField, ListField
# from django.contrib.auth.hashers import make_password, check_password

# class User(Document):
#     username = StringField(required=True, unique=True)
#     email = StringField(required=True, unique=True)
#     password = StringField(required=True)

#     # ✅ Track applied jobs (store job IDs as strings)
#     applied_jobs = ListField(StringField())

#     # ✅ New field: User role (default "user")
#     role = StringField(default="user", choices=["user", "admin"])

#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)

#     meta = {
#         'collection': 'users'
#     }


class User(Document):
    fullname = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    applied_jobs = ListField(StringField())
    role = StringField(default="user", choices=["user", "admin"])
    bio = StringField()
    resume_file = FileField()

    @property
    def is_authenticated(self):
        return True

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    meta = {"collection": "users"}
    
class Mock_Interview(Document):
    jobrole = StringField(required=True)
    type = StringField(required=True, default="Technical", choices=["Technical", "Behavioral", "Mixed"])    
    level = StringField(required=True, default="Entry", choices=["Entry", "Mid", "Senior"])
    skills = ListField(StringField(), required=True)
    question = StringField(required=True, choices=["5", "10", "15", "20"])
    user_answers = ListField(StringField(), default=[])
    scores = ListField(FloatField(min_value=0, max_value=10), default=[])
    generated_questions = ListField(StringField(), default=[]) 
    feedback = ListField(DictField(), default=[])
    user = ReferenceField(User, required=True)


class Resume(Document):
    resumeId = StringField(required=True, unique=True, default=lambda: str(uuid.uuid4()))
    user = ReferenceField(User, required=True)  # Link to User model
    atsScore = FloatField(required=True, min_value=0, max_value=100)  # ATS score (0-100)

    meta = {
        'collection': 'resumes'  # MongoDB collection name
    }
# backend/api/models.py
from mongoengine import Document, StringField, IntField, ListField, DateTimeField
from datetime import datetime

class Job(Document):
    title = StringField(required=True)
    user = ReferenceField('User', required=True, reverse_delete_rule=CASCADE)
    company = StringField(required=True)
    location = StringField(required=True)
    type = StringField(required=True)
    salary = StringField(required=True)
    posted_date  = StringField(required=True)
    description = StringField(required=True)
    skills = ListField(StringField())
    requirements = IntField(default=1)
    applications = IntField(default=0)
    logo = StringField(default="🏢")
    posted_date = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'jobs',
        'strict': False   # ✅ Ignore extra fields like "applicants"
    }



from mongoengine import Document, ReferenceField, StringField, DateTimeField
from datetime import datetime

class JobApplication(Document):
    user = ReferenceField(User, required=True)
    job = ReferenceField(Job, required=True)
    status = StringField(default="pending", choices=["pending", "selected", "rejected"])
    applied_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'job_applications'
    }
