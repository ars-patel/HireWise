from django.conf import settings
from datetime import datetime, timedelta
from django.http import HttpResponse
import jwt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.authentication import BaseAuthentication

from mongoengine.errors import DoesNotExist
from .models import Job, JobApplication, User
from .serializers import (
    JobSerializer,
    ProfileSetupSerializer,
    SignupSerializer,
    LoginSerializer,
    ResumeSerializer,
    UserSerializer,
)


# -----------------------------
# AUTH & PERMISSIONS
# -----------------------------
class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None
        try:
            token = auth_header.split(" ")[1]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects(id=payload["user_id"]).first()
            if not user:
                raise AuthenticationFailed("User not found")
            request.user = user
            return (user, None)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except Exception:
            raise AuthenticationFailed("Invalid or expired token")


class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request, "user") and getattr(request.user, "role", None) == "admin"


# -----------------------------
# AUTH VIEWS
# -----------------------------
class SignupView(APIView):
    def post(self, request):
        data = request.data.copy()
        if "role" not in data:
            data["role"] = "user"  # default role
        serializer = SignupSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()   # ✅ get the user instance
            return Response({
                "message": "User registered successfully",
                "user_id": str(user.id),   # ✅ return ObjectId to frontend
                "fullname": user.fullname,
                "email": user.email,
                "role": user.role,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileSetupView(APIView):
    def post(self, request, user_id):
        user = User.objects(id=user_id).first()
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSetupSerializer(user, data=request.data)
        if serializer.is_valid():
            updated_user = serializer.update(user, serializer.validated_data)

            # return fresh user data
            from .serializers import UserSerializer
            return Response(UserSerializer(updated_user).data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# views.py - LoginView
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            user = User.objects(email=email).first()

            if not user or not user.check_password(password):
                raise AuthenticationFailed("Invalid credentials")

            payload = {
                "user_id": str(user.id),
                "fullname": user.fullname,
                "role": user.role,
                "exp": datetime.utcnow() + timedelta(hours=1),
                "iat": datetime.utcnow(),
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

            user_data = UserSerializer(user).data

            return Response(
                {
                    "token": token,
                    "user": user_data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# -----------------------------
# DASHBOARD & RESUME
# -----------------------------
class DashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Welcome {request.user.fullname}"})


class ResumeCreateView(APIView):
    def post(self, request):
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid():
            resume = serializer.save()
            return Response(
                {
                    "message": "Resume created successfully",
                    "resumeId": resume.resumeId,
                    "atsScore": resume.atsScore,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetResumeView(APIView):
    def get(self, request, user_id):
        user = User.objects(id=user_id).first()
        if not user or not user.resume_file:
            return Response({"error": "Resume not found"}, status=status.HTTP_404_NOT_FOUND)

        # Reset file cursor before reading
        user.resume_file.seek(0)

        response = HttpResponse(user.resume_file.read(), content_type="application/pdf")
        response['Content-Disposition'] = f'inline; filename="{user.fullname}_resume.pdf"'
        return response

# -----------------------------
# JOB VIEWS (PUBLIC)
# -----------------------------
class PublicJobListView(APIView):
    """Anyone can view jobs"""

    authentication_classes = []
    permission_classes = []

    def get(self, request):
        jobs = Job.objects().order_by("-posted_date")
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class JobApplyView(APIView):
    """Users apply for jobs"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        # Check requirements count
        if job.applications >= job.requirements:
            return Response({"message": "Job requirements already fulfilled"}, status=status.HTTP_400_BAD_REQUEST)

        # Prevent duplicate applications
        existing_app = JobApplication.objects(user=user, job=job).first()
        if existing_app:
            return Response({"message": "Already applied to this job"}, status=status.HTTP_200_OK)

        JobApplication(user=user, job=job).save()

        job.applications += 1
        job.save()

        user.applied_jobs.append(str(job.id))
        user.save()

        return Response({"message": "Application submitted successfully"}, status=status.HTTP_200_OK)


# -----------------------------
# JOB VIEWS (ADMIN)
# -----------------------------
class AdminJobListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        # filter by logged-in admin
        jobs = Job.objects(user=request.user).order_by("-posted_date")
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            # assign job to current admin
            job = Job(**serializer.validated_data, user=request.user,posted_date=datetime.utcnow() )
            job.save()
            return Response(
                {"message": "Job created successfully", "id": str(job.id)},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AdminJobDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id, user=request.user)
            serializer = JobSerializer(job, data=request.data, partial=True)
            if serializer.is_valid():
                for field, value in serializer.validated_data.items():
                    setattr(job, field, value)
                job.save()
                return Response({"message": "Job updated successfully"})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id, user=request.user)  # ✅ only own jobs
            job.delete()
            return Response({"message": "Job deleted successfully"}, status=status.HTTP_200_OK)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)


# -----------------------------
# APPLICATION VIEWS
# -----------------------------
class JobApplicationsListView(APIView):
    """Admin view applications for a job"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

        applications = JobApplication.objects(job=job)
        data = []
        for app in applications:
            user = app.user  # already a User object
            user_data = UserSerializer(user).data  # serialize full user info

            data.append({
                "application_id": str(app.id),
                "status": app.status,
                "applied_at": app.applied_at,
                "user": user_data,   # embed full user object
            })
        return Response(data, status=status.HTTP_200_OK)


class UpdateApplicationStatusView(APIView):
    """Admin update application status"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, application_id):
        status_choice = request.data.get("status")
        if status_choice not in ["selected", "rejected"]:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            application = JobApplication.objects.get(id=application_id)
            application.status = status_choice
            application.save()
            return Response({"message": f"Application {status_choice}"})
        except JobApplication.DoesNotExist:
            return Response({"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND)


class UserApplicationsView(APIView):
    """User can see their own applications"""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if str(request.user.id) != user_id and request.user.role != "admin":
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        applications = JobApplication.objects(user=user_id)
        data = []
        for app in applications:
            try:
                job = app.job
                job_data = {"job_id": str(job.id), "title": job.title, "company": job.company}
            except Exception:
                job_data = {"job_id": None, "title": "[Deleted Job]", "company": "-"}

            data.append({**job_data, "status": app.status, "applied_at": app.applied_at})

        return Response(data, status=status.HTTP_200_OK)

from rest_framework import generics
from .models import Mock_Interview
from .serializers import MockInterviewSerializer

# 👉 List & Create
class MockInterviewListCreateView(generics.ListCreateAPIView):
    queryset = Mock_Interview.objects.all()
    serializer_class = MockInterviewSerializer


# 👉 Retrieve, Update, Delete by ID

# Set up OpenAI API client
# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Mock_Interview, User
from .serializers import MockInterviewSerializer
import openai
import json

# Hardcode the OpenAI API key (NOT RECOMMENDED for production)
import os
openai.api_key = os.getenv("OPENAI_API_KEY")
class MockInterviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mock_Interview.objects.all()
    serializer_class = MockInterviewSerializer
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        # Extract user answers
        user_answers = serializer.validated_data.get("user_answers", instance.user_answers or [])
        print(f"Received user_answers: {user_answers}")

        # Analyze answers with OpenAI
        scores = []
        feedback = []
        for question, answer in zip(instance.generated_questions, user_answers):
            if answer:  # Only analyze non-empty answers
                score, suggestion = self.analyze_answer(question, answer, instance.jobrole, instance.level)
                scores.append(score)
                feedback.append({"question": question, "answer": answer, "suggestion": suggestion})
            else:
                scores.append(0.0)
                feedback.append({"question": question, "answer": answer, "suggestion": "No answer provided."})

        print(f"Generated scores: {scores}")
        print(f"Generated feedback: {feedback}")

        # Update instance with scores and feedback
        instance.user_answers = user_answers
        instance.scores = scores
        instance.feedback = feedback
        try:
            instance.save()
            print(f"Saved scores in DB: {instance.scores}")
        except Exception as e:
            print(f"Error saving to MongoDB: {str(e)}")
            return Response({"error": "Failed to save interview data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Fetch updated instance to ensure data consistency
        updated_instance = Mock_Interview.objects(id=instance.id).first()
        return Response(self.get_serializer(updated_instance).data)

    def analyze_answer(self, question, answer, jobrole, level):
        try:
            prompt = (
                f"You are an expert interviewer for a {jobrole} role at {level} level. "
                f"Evaluate the following answer to the question: '{question}'.\n\n"
                f"Answer: {answer}\n\n"
                f"Return a JSON object with 'score' (a number from 0 to 10) and 'suggestion' (2-3 sentences for improvement)."
            )
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=200,
                response_format={"type": "json_object"}  # Ensure JSON output
            )
            result = json.loads(response.choices[0].message.content)
            score = float(result.get("score", 0))
            suggestion = result.get("suggestion", "No suggestion provided.")
            print(f"OpenAI response for question '{question}': {result}")
            return score, suggestion
        except Exception as e:
            print(f"OpenAI API error for question '{question}': {str(e)}")
            return 0.0, f"Error analyzing answer: {str(e)}"

class MockInterviewReportView(generics.RetrieveAPIView):
    queryset = Mock_Interview.objects.all()
    serializer_class = MockInterviewSerializer
    lookup_field = "id"

class UserMockInterviewListView(generics.ListAPIView):
    serializer_class = MockInterviewSerializer

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        user = User.objects(id=user_id).first()
        if not user:
            return Mock_Interview.objects.none()
        return Mock_Interview.objects(user=user)    