import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/landing-page';
import { Dashboard } from './pages/dashboard';
import { AIAssistant } from './pages/ai-assistant';
import { InterviewSession } from './pages/interview-session';
import { JobOpportunities } from './pages/job-opportunities';
import { ResumeAnalysis } from './pages/resume-analysis';
import EnhancedLogin from './pages/login';
import SimpleSignup from './pages/signup';
import { MockInterviews } from './pages/mock-interviews';

function App() {

  return (
   <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />  
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/ai-assistant" element={<AIAssistant />} />  
        <Route path="/interview-session" element={<InterviewSession />} />  
        <Route path="/jobs" element={<JobOpportunities />} />  
        <Route path="/mock-interviews" element={<MockInterviews />} />  
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />  
        <Route path="/login" element={<EnhancedLogin />} />  
        <Route path="/signup" element={<SimpleSignup />} />  



        
      </Routes>
    </Router>
  )
}

export default App
