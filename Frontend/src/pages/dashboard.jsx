import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "./subpages/navbar";
import ResumeDialog from "@/components/ResumeDialog";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Ready to take your career to the next level?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mock Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Interviews Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AI Mock Interviews */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>AI Mock Interviews</CardTitle>
                  <CardDescription>
                    Practice with AI and improve your skills
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-7">
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Progress this week
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our AI Mock Interview system simulates real-world interviews
                  using advanced AI.You’ll receive instant, personalized feedback to help improve your confidence,
      communication, and technical skills.
                </p>

                {/* Button */}
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <a href="/mock-interviews" className="w-full">
                      Start Interview
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Opportunities */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Job Opportunities</CardTitle>
                  <CardDescription>
                    Browse and apply to real positions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New matches</span>
                  <Badge className="bg-green-100 text-green-700">15 jobs</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• 5 Software Engineer positions</p>
                  <p>• 3 Product Manager roles</p>
                  <p>• 7 Data Scientist openings</p>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <a href="/jobs" className="w-full">
                      Browse Jobs
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resume Analysis */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Resume Analysis</CardTitle>
                  <CardDescription>
                    Get AI-powered resume insights
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quick Check</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• Upload your resume</p>
                  <p>• Get instant AI suggestions</p>
                  <p>• No data stored</p>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <a href="/resume-analysis" className="w-full">
                      Analyze Resume
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Career Assistant */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>AI Career Assistant</CardTitle>
                  <CardDescription>
                    Get personalized career guidance
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    "What skills should I focus on for senior developer roles?"
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>💡 Ask about market trends</p>
                  <p>💡 Get skill recommendations</p>
                  <p>💡 Company insights</p>
                </div>
                <Button className="w-full" asChild>
                  <a href="/ai-assistant">Chat with AI Assistant</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>{/* ... unchanged list ... */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
