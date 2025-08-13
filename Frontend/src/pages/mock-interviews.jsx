import { Button } from "@/components/ui/button";
import { Bot, Phone, Settings, History, User } from "lucide-react";
import Navbar from './subpages/navbar';

// Interview Card Component
const InterviewCard = ({ title, isAI }) => {
  return (
    <div className="relative h-80 bg-white border border-gray-200 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6">
      {/* Avatar Section */}
      <div className="mb-6 w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
        {isAI ? (
          <Bot size={48} className="text-blue-500" />
        ) : (
          <User size={48} className="text-gray-600" />
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 text-center">{title}</h3>

      {/* Status Indicator for AI */}
      {isAI && (
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-500">Ready to interview</span>
        </div>
      )}
    </div>
  );
};

// Interview Button
const InterviewButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-full shadow-lg transition-all hover:scale-105"
    >
      {children}
    </button>
  );
};

export function MockInterviews() {
  const handleStartInterview = () => {
    console.log("Interview started!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg- rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">InterviewAI</span>
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Mock Interviews</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
              <a href="/mock-interviews/history" className="flex items-center">
                <History className="w-4 h-4 mr-2" />
                History
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header> */}
      <Navbar/>

      {/* Main Interview Section */}
      <div className="flex flex-col items-center justify-center p-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Mock Interview
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Practice your interview skills with our advanced AI interviewer
          </p>
        </div>

        {/* Interview Cards */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <InterviewCard title="AI Interviewer" isAI />
            <InterviewCard title="You" />
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <InterviewButton onClick={handleStartInterview}>
              <Phone size={20} />
              Call
            </InterviewButton>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Ready when you are. Click start to begin your mock interview.
          </p>
        </div>
      </div>
    </div>
  );
}