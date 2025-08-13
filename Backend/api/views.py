from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from datetime import datetime, timedelta
import jwt

from .models import User
from .serializers import SignupSerializer, LoginSerializer, ResumeSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BaseAuthentication
import jwt

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            try:
                # First try username, then fallback to email
                user = User.objects(username=username).first() or User.objects(email=username).first()
                if not user or not user.check_password(password):
                    raise AuthenticationFailed("Invalid credentials")
            except Exception as e:
                raise AuthenticationFailed(str(e))

            # Prepare JWT payload
            payload = {
                "user_id": str(user.id),
                "username": user.username,
                "exp": datetime.utcnow() + timedelta(hours=1),
                "iat": datetime.utcnow()
            }

            # Encode the token
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

            return Response({
                "token": token,
                "user_id": str(user.id),
                "username": user.username,
                "email": user.email
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None

        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects(id=payload["user_id"]).first()
            return (user, None)
        except:
            raise AuthenticationFailed("Invalid or expired token")


class DashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Welcome {request.user.username}"})

class ResumeCreateView(APIView):
    def post(self, request):
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid():
            resume = serializer.save()
            return Response({
                "message": "Resume created successfully",
                "resumeId": resume.resumeId,
                "atsScore": resume.atsScore
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
