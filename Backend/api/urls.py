from django.urls import path
from .views import SignupView, LoginView, ResumeCreateView

urlpatterns = [
    path('users/signup/', SignupView.as_view(), name='signup'),
    path('users/login/', LoginView.as_view(), name='login'),

    # Resume creation endpoint
    path('resumes/create/', ResumeCreateView.as_view(), name='resume-create'),
]
