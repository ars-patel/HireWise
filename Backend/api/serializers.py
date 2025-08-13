from django.db import models

# Create your models here.


from rest_framework import serializers
from .models import User, Resume

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        if User.objects(username=validated_data['username']).first():
            raise serializers.ValidationError("Username already exists")
        if User.objects(email=validated_data['email']).first():
            raise serializers.ValidationError("Email already registered")

        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


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
