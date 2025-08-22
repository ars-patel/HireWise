import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landing-page";
import { Dashboard } from "./pages/dashboard";
import AICareerAssistant from "./pages/ai-assistant";
import { InterviewSession } from "./pages/interview-session";
import { JobOpportunities } from "./pages/job-opportunities";
import { ResumeAnalysis } from "./pages/resume-analysis";
import EnhancedLogin from "./pages/login";
import SimpleSignup from "./pages/signup";
import { MockInterviews } from "./pages/mock-interviews";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";
import NoPageFound from './pages/subpages/NoPageFound';
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/MainProfile";
import Interviews from './pages/Interview';
import AnswerQuestions from './pages/AnsQuestion';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<EnhancedLogin />} />
        <Route path="/signup" element={<SimpleSignup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AICareerAssistant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-session"
          element={
            <ProtectedRoute>
              <InterviewSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobOpportunities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-interviews"
          element={
            <ProtectedRoute>
              <MockInterviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-analysis"
          element={
            <ProtectedRoute>
              <ResumeAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mock-interviews/user/:userId"
          element={
            <ProtectedRoute>
              <Interviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/answer-questions/:interviewId"
          element={
            <ProtectedRoute>
              <AnswerQuestions />
            </ProtectedRoute>
          }
        />

        <Route path="/mock-interviews/:interviewId/report" element={<Report />} />


        {/* Catch-all */}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
