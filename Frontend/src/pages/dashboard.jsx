// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import {
//   Bot,
//   Calendar,
//   FileText,
//   MessageSquare,
//   TrendingUp,
//   Users,
// } from "lucide-react";
// import Navbar from "./subpages/navbar";
// import ResumeDialog from "@/components/ResumeDialog";

// export function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome back!
//           </h1>
//           <p className="text-gray-600">
//             Ready to take your career to the next level?
//           </p>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Mock Interviews</p>
//                   <p className="text-2xl font-bold text-gray-900">12</p>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Bot className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Applications</p>
//                   <p className="text-2xl font-bold text-gray-900">8</p>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <Users className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Success Rate</p>
//                   <p className="text-2xl font-bold text-gray-900">85%</p>
//                 </div>
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <TrendingUp className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Interviews Scheduled</p>
//                   <p className="text-2xl font-bold text-gray-900">3</p>
//                 </div>
//                 <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                   <Calendar className="w-6 h-6 text-orange-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Features Grid */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-8">
//           {/* AI Mock Interviews */}
//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle>AI Mock Interviews</CardTitle>
//                   <CardDescription>
//                     Practice with AI and improve your skills
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-7">
//                 {/* Header Row */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">
//                     Progress this week
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-sm text-gray-500 leading-relaxed">
//                   Our AI Mock Interview system simulates real-world interviews
//                   using advanced AI.You’ll receive instant, personalized feedback to help improve your confidence,
//       communication, and technical skills.
//                 </p>

//                 {/* Button */}
//                 <div className="flex space-x-2">
//                   <Button className="flex-1">
//                     <a href="/mock-interviews" className="w-full">
//                       Start Interview
//                     </a>
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Job Opportunities */}
//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
//                   <Users className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle>Job Opportunities</CardTitle>
//                   <CardDescription>
//                     Browse and apply to real positions
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">New matches</span>
//                   <Badge className="bg-green-100 text-green-700">15 jobs</Badge>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <p>• 5 Software Engineer positions</p>
//                   <p>• 3 Product Manager roles</p>
//                   <p>• 7 Data Scientist openings</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button className="flex-1">
//                     <a href="/jobs" className="w-full">
//                       Browse Jobs
//                     </a>
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Resume Analysis */}
//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//                   <FileText className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle>Resume Analysis</CardTitle>
//                   <CardDescription>
//                     Get AI-powered resume insights
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Quick Check</span>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <p>• Upload your resume</p>
//                   <p>• Get instant AI suggestions</p>
//                   <p>• No data stored</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button className="flex-1">
//                     <a href="/resume-analysis" className="w-full">
//                       Analyze Resume
//                     </a>
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* AI Career Assistant */}
//           <Card className="hover:shadow-lg transition-shadow">
//             <CardHeader>
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <MessageSquare className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle>AI Career Assistant</CardTitle>
//                   <CardDescription>
//                     Get personalized career guidance
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-sm text-gray-700">
//                     "What skills should I focus on for senior developer roles?"
//                   </p>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <p>💡 Ask about market trends</p>
//                   <p>💡 Get skill recommendations</p>
//                   <p>💡 Company insights</p>
//                 </div>
//                 <Button className="w-full" asChild>
//                   <a href="/ai-assistant">Chat with AI Assistant</a>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activity */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>
//               Your latest actions and achievements
//             </CardDescription>
//           </CardHeader>
//           <CardContent>{/* ... unchanged list ... */}</CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  Target,
  Award,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react"
import Navbar from "./subpages/navbar"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome back!
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}
              Ready to excel?
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Continue your journey to landing your dream job with AI-powered tools and real opportunities
          </p>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Mock Interviews</p>
                  <p className="text-3xl font-bold text-slate-900">12</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 this week
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Applications</p>
                  <p className="text-3xl font-bold text-slate-900">8</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />2 pending
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-slate-900">85%</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Star className="w-3 h-3 mr-1" />
                    Above average
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Interviews Scheduled</p>
                  <p className="text-3xl font-bold text-slate-900">3</p>
                  <p className="text-xs text-orange-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Next: Tomorrow
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* AI Mock Interviews */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Mock Interviews</CardTitle>
                  <CardDescription className="text-slate-600">Practice with AI and improve your skills</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Progress this week</span>
                  <Badge className="bg-blue-100 text-blue-700">+25% improvement</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Interview Skills</span>
                    <span className="text-slate-900 font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Our AI Mock Interview system simulates real-world interviews using advanced AI. You'll receive
                  instant, personalized feedback to help improve your confidence, communication, and technical skills.
                </p>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  <a href="/mock-interviews" className="flex items-center justify-center w-full">
                    Start Interview <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Opportunities */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Job Opportunities</CardTitle>
                  <CardDescription className="text-slate-600">Browse and apply to real positions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">New matches</span>
                  <Badge className="bg-green-100 text-green-700">15 jobs</Badge>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="flex items-center">
                      <Zap className="w-4 h-4 text-blue-500 mr-2" />
                      Software Engineer positions
                    </span>
                    <span className="font-medium text-slate-900">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="flex items-center">
                      <Target className="w-4 h-4 text-green-500 mr-2" />
                      Product Manager roles
                    </span>
                    <span className="font-medium text-slate-900">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="flex items-center">
                      <Award className="w-4 h-4 text-purple-500 mr-2" />
                      Data Scientist openings
                    </span>
                    <span className="font-medium text-slate-900">7</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  <a href="/jobs" className="flex items-center justify-center w-full">
                    Browse Jobs <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resume Analysis */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Resume Analysis</CardTitle>
                  <CardDescription className="text-slate-600">Get AI-powered resume insights</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Last scan</span>
                  <Badge variant="outline" className="text-slate-600">
                    2 days ago
                  </Badge>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span>Upload your resume</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Zap className="w-4 h-4 text-blue-500 mr-3" />
                    <span>Get instant AI suggestions</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Award className="w-4 h-4 text-purple-500 mr-3" />
                    <span>No data stored</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                  <a href="/resume-analysis" className="flex items-center justify-center w-full">
                    Analyze Resume <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Career Assistant */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all group hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Career Assistant</CardTitle>
                  <CardDescription className="text-slate-600">Get personalized career guidance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-sm text-slate-700 italic">
                    "What skills should I focus on for senior developer roles?"
                  </p>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">💡</span>
                    <span>Ask about market trends</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🎯</span>
                    <span>Get skill recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🏢</span>
                    <span>Company insights</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  asChild
                >
                  <a href="/ai-assistant" className="flex items-center justify-center">
                    Chat with AI Assistant <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Activity */}
        {/* <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-slate-600">Your latest actions and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Completed mock interview</p>
                  <p className="text-xs text-slate-500">Software Engineer - Technical Round</p>
                </div>
                <span className="text-xs text-slate-400">2 hours ago</span>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Applied to new position</p>
                  <p className="text-xs text-slate-500">Frontend Developer at TechCorp</p>
                </div>
                <span className="text-xs text-slate-400">1 day ago</span>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Resume analysis completed</p>
                  <p className="text-xs text-slate-500">Score improved by 15 points</p>
                </div>
                <span className="text-xs text-slate-400">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
