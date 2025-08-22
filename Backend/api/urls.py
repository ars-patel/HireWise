from django.urls import path
from .views import (
    GetResumeView,
    ProfileSetupView,
    SignupView,
    LoginView,
    DashboardView,
    ResumeCreateView,
    PublicJobListView,
    AdminJobListView,
    AdminJobDetailView,
    JobApplyView,
    JobApplicationsListView,
    UpdateApplicationStatusView,
    UserApplicationsView,
    MockInterviewListCreateView,
    MockInterviewDetailView,
    UserMockInterviewListView,
    MockInterviewReportView
)

urlpatterns = [
    # Auth
    path("users/signup/", SignupView.as_view(), name="signup"),
    path("users/login/", LoginView.as_view(), name="login"),
    path("users/<str:user_id>/profile_setup/", ProfileSetupView.as_view(), name="profile-setup"),
    path("users/<str:user_id>/resume/", GetResumeView.as_view(), name="resume"),

    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("resume/create/", ResumeCreateView.as_view(), name="resume-create"),
    
    path("mock-interviews/", MockInterviewListCreateView.as_view(), name="mock-interview-create"),
    path("mock-interviews/<str:id>/", MockInterviewDetailView.as_view(), name="mock-interview-detail"),
    path("mock-interviews/user/<str:user_id>/", UserMockInterviewListView.as_view(), name="user-mock-interview-list"),
    # urls.py
# urls.py
    path("mock-interviews/<str:id>/report/", MockInterviewReportView.as_view(), name="mock-interview-report"),

    # Public Job APIs
    path("jobs/", PublicJobListView.as_view(), name="jobs-list"),
    path("jobs/<str:job_id>/apply/", JobApplyView.as_view(), name="job-apply"),

    # User Applications
    path("users/<str:user_id>/applications/", UserApplicationsView.as_view(), name="user-applications"),

    # Applications (Admin)
    path("jobs/<str:job_id>/applications/", JobApplicationsListView.as_view(), name="job-applications"),
    path("applications/<str:application_id>/update_status/", UpdateApplicationStatusView.as_view(), name="update-application-status"),

    # Admin Jobs
    path("jobs/admin/", AdminJobListView.as_view(), name="admin-jobs"),
    path("jobs/admin/<str:job_id>/", AdminJobDetailView.as_view(), name="admin-job-detail"),
]
