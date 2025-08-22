from django.db import models

# Create your models here.


from rest_framework import serializers
from .models import User, Resume

# class SignupSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)

#     def create(self, validated_data):
#         if User.objects(username=validated_data['username']).first():
#             raise serializers.ValidationError("Username already exists")
#         if User.objects(email=validated_data['email']).first():
#             raise serializers.ValidationError("Email already registered")

#         user = User(
#             username=validated_data['username'],
#             email=validated_data['email']
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user


class SignupSerializer(serializers.Serializer):
    fullname = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=["user", "admin"], default="user")

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

# serializers.py
# serializers.py
class ProfileSetupSerializer(serializers.Serializer):
    fullname = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    role = serializers.ChoiceField(choices=["user", "admin"], required=False)
    bio = serializers.CharField(required=False, allow_blank=True)
    resume_file = serializers.FileField(required=False)

    def update(self, instance, validated_data):
        instance.fullname = validated_data.get("fullname", instance.fullname)
        instance.email = validated_data.get("email", instance.email)
        instance.role = validated_data.get("role", instance.role)
        instance.bio = validated_data.get("bio", instance.bio)

        file = validated_data.get("resume_file")
        if file:
            instance.resume_file.replace(file, content_type=file.content_type)

        instance.save()
        return instance



class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.Serializer):
    user_id = serializers.CharField(source="id", read_only=True)
    fullname = serializers.CharField()
    email = serializers.EmailField()
    role = serializers.CharField()
    bio = serializers.CharField(allow_blank=True, required=False)
    # resume_file will be stored in GridFS, so send file info if present
    resume_file = serializers.CharField(read_only=True, required=False)

    class Meta:
        fields = ["user_id", "fullname", "email", "role", "bio", "resume_file"]

class ResumeSerializer(serializers.Serializer):
    resumeId = serializers.CharField(read_only=True)  # Auto-generated
    user = serializers.CharField(write_only=True)    # User ID sent from frontend
    atsScore = serializers.FloatField(min_value=0, max_value=100)

    def create(self, validated_data):
        user_id = validated_data.pop('user')
        user = User.objects(id=user_id).first()
        if not user:
            raise serializers.ValidationError("User not found")

        resume = Resume(user=user, **validated_data)
        resume.save()
        return resume

# backend/api/serializers.py
# backend/api/serializers.py
from rest_framework import serializers

class JobSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    title = serializers.CharField()
    company = serializers.CharField()
    location = serializers.CharField()
    type = serializers.CharField(required=False, allow_blank=True)
    salary = serializers.CharField(required=False, allow_blank=True)
    posted_date = serializers.DateTimeField(read_only=True)  # ✅ match your model field
    description = serializers.CharField()
    skills = serializers.ListField(child=serializers.CharField(), required=False)
    requirements = serializers.IntegerField(required=False)
    applications = serializers.IntegerField(required=False)
    logo = serializers.CharField(required=False, allow_blank=True)
    user = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.id)

    def get_user(self, obj):
        # Return basic info about the user (admin who created the job)
        try:
            return {
                "id": str(obj.user.id),
                "username": obj.user.username,
                "email": obj.user.email,
            }
        except Exception:
            return None



class JobApplicationSerializer(serializers.Serializer):
    user_id = serializers.CharField(required=True)
    # Add more fields like resume, cover_letter if needed

class ApplicationStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=["selected", "rejected"])
    
from rest_framework import serializers
from .models import Mock_Interview
from .models import User   # adjust import if needed

# serializers.py
from rest_framework import serializers
from .models import Mock_Interview, User

class MockInterviewSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    jobrole = serializers.CharField(required=True)
    type = serializers.ChoiceField(choices=["Technical", "Behavioral", "Mixed"], default="Technical")
    level = serializers.ChoiceField(choices=["Entry", "Mid", "Senior"], default="Entry")
    skills = serializers.ListField(child=serializers.CharField(), required=True)
    question = serializers.ChoiceField(choices=["5", "10", "15", "20"], required=True)
    generated_questions = serializers.ListField(child=serializers.CharField(), required=False)
    user_answers = serializers.ListField(child=serializers.CharField(), required=False)
    scores = serializers.ListField(child=serializers.FloatField(min_value=0, max_value=10), required=False)
    feedback = serializers.ListField(child=serializers.DictField(), required=False)
    user = serializers.CharField(write_only=True, required=True)
    user_details = serializers.DictField(read_only=True)

    def create(self, validated_data):
        user_id = validated_data.pop("user", None)
        if not user_id:
            raise serializers.ValidationError({"user": ["This field is required."]})
        
        user = User.objects(id=user_id).first()
        if not user:
            raise serializers.ValidationError({"user": ["User not found"]})

        interview = Mock_Interview(user=user, **validated_data)
        interview.save()
        return interview

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == "user":  # Don't allow user change
                continue
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if instance.user:
            rep["user_details"] = {
                "id": str(instance.user.id),
                "fullname": instance.user.fullname,
                "email": instance.user.email,
            }
        return rep