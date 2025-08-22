// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ArrowRight, Bot, FileText, MessageSquare, Users, CheckCircle } from "lucide-react"
// import Navbar from "./subpages/navbar"
// import { logout } from "@/lib/auth"

// export function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
//      <Navbar/>

//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto text-center max-w-4xl">
//           <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
//             🚀 AI-Powered Career Platform
//           </Badge>
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//             Master Your Interviews,
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
//               {" "}
//               Land Your Dream Job
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//             Practice with AI-powered mock interviews, get personalized feedback, and connect with top companies. Your
//             complete solution for interview preparation and job placement.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="text-lg px-8 py-6" onClick={()=>logout()} >
//               <a href="/dashboard">
//                 Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
//               </a>
//             </Button>
//             <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
//               Watch Demo
//             </Button>
//           </div>
//           <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//               Free to start
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//               No credit card required
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//               Unlimited practice
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-4 bg-white">
//         <div className="container mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Our comprehensive platform combines AI technology with real-world opportunities
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
//                   <Bot className="w-6 h-6 text-white" />
//                 </div>
//                 <CardTitle>AI Mock Interviews</CardTitle>
//                 <CardDescription>
//                   Practice with unlimited AI-powered interviews and get instant feedback
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Unlimited practice sessions</li>
//                   <li>• Real-time feedback</li>
//                   <li>• Performance tracking</li>
//                   <li>• Industry-specific questions</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
//                   <Users className="w-6 h-6 text-white" />
//                 </div>
//                 <CardTitle>Real Company Interviews</CardTitle>
//                 <CardDescription>Connect with hiring managers and schedule live interviews</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Browse job opportunities</li>
//                   <li>• Direct company connections</li>
//                   <li>• Scheduled video interviews</li>
//                   <li>• Application tracking</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
//                   <FileText className="w-6 h-6 text-white" />
//                 </div>
//                 <CardTitle>Resume Analysis</CardTitle>
//                 <CardDescription>Get AI-powered insights and improvements for your resume</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Detailed CV analysis</li>
//                   <li>• Peer comparisons</li>
//                   <li>• Improvement suggestions</li>
//                   <li>• ATS optimization</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
//                   <MessageSquare className="w-6 h-6 text-white" />
//                 </div>
//                 <CardTitle>Career AI Assistant</CardTitle>
//                 <CardDescription>Get personalized career guidance and market insights</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• 24/7 career guidance</li>
//                   <li>• Market trend analysis</li>
//                   <li>• Skill recommendations</li>
//                   <li>• Company insights</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-gray-50 to-slate-100">
//         <div className="container mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
//             <p className="text-xl text-gray-600">Simple steps to accelerate your career</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-2xl font-bold text-white">1</span>
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Practice & Improve</h3>
//               <p className="text-gray-600">
//                 Take unlimited AI mock interviews and receive detailed feedback on your performance
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-2xl font-bold text-white">2</span>
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Optimize Profile</h3>
//               <p className="text-gray-600">
//                 Get your resume analyzed and optimized to stand out to recruiters and ATS systems
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-2xl font-bold text-white">3</span>
//               </div>
//               <h3 className="text-xl font-semibold mb-4">Land Your Job</h3>
//               <p className="text-gray-600">
//                 Apply to real positions and schedule interviews with top companies through our platform
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-4 bg-white">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
//               <div className="text-gray-600">Successful Placements</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
//               <div className="text-gray-600">Partner Companies</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
//               <div className="text-gray-600">Interview Success Rate</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-orange-600 mb-2">50K+</div>
//               <div className="text-gray-600">Mock Interviews Completed</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
//         <div className="container mx-auto text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
//           <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
//             Join thousands of professionals who have successfully landed their dream jobs with InterviewAI
//           </p>
//           <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
//             <a href="/dashboard">
//               Start Your Journey Today <ArrowRight className="ml-2 w-5 h-5" />
//             </a>
//           </Button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 px-4">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold">InterviewAI</span>
//               </div>
//               <p className="text-gray-400">
//                 Empowering careers through AI-powered interview preparation and job placement.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Platform</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Mock Interviews
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Job Opportunities
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Resume Analysis
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     AI Assistant
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Contact
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Support</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Help Center
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Status
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 InterviewAI. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }



"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, FileText, MessageSquare, Users, CheckCircle, Star, Zap, Target, Award } from "lucide-react"
import Navbar from "./subpages/navbar"
import { logout } from "@/lib/auth"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="container mx-auto text-center max-w-5xl relative">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200 px-4 py-2 text-sm font-medium">
            🚀 AI-Powered Career Platform
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            Master Your Interviews,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}
              Land Your Dream Job
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Practice with AI-powered mock interviews, get personalized feedback, and connect with top companies. Your
            complete solution for interview preparation and job placement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
              onClick={() => logout()}
            >
              <a href="/dashboard" className="flex items-center">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-blue-300"
            >
              <span className="flex items-center">Watch Demo</span>
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Free to start
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Unlimited practice
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI technology with real-world opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Mock Interviews</CardTitle>
                <CardDescription className="text-slate-600">
                  Practice with unlimited AI-powered interviews and get instant feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 text-blue-500 mr-2" />
                    Unlimited practice sessions
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 text-blue-500 mr-2" />
                    Real-time feedback
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-blue-500 mr-2" />
                    Performance tracking
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-blue-500 mr-2" />
                    Industry-specific questions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Real Company Interviews</CardTitle>
                <CardDescription className="text-slate-600">
                  Connect with hiring managers and schedule live interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 text-green-500 mr-2" />
                    Browse job opportunities
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 text-green-500 mr-2" />
                    Direct company connections
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-green-500 mr-2" />
                    Scheduled video interviews
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-green-500 mr-2" />
                    Application tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Resume Analysis</CardTitle>
                <CardDescription className="text-slate-600">
                  Get AI-powered insights and improvements for your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 text-orange-500 mr-2" />
                    Detailed CV analysis
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 text-orange-500 mr-2" />
                    Peer comparisons
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-orange-500 mr-2" />
                    Improvement suggestions
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-orange-500 mr-2" />
                    ATS optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Career AI Assistant</CardTitle>
                <CardDescription className="text-slate-600">
                  Get personalized career guidance and market insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 text-purple-500 mr-2" />
                    24/7 career guidance
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 text-purple-500 mr-2" />
                    Market trend analysis
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 text-purple-500 mr-2" />
                    Skill recommendations
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-purple-500 mr-2" />
                    Company insights
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">How It Works</h2>
            <p className="text-xl text-slate-600">Simple steps to accelerate your career</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-900">Practice & Improve</h3>
              <p className="text-slate-600 leading-relaxed">
                Take unlimited AI mock interviews and receive detailed feedback on your performance
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-900">Optimize Profile</h3>
              <p className="text-slate-600 leading-relaxed">
                Get your resume analyzed and optimized to stand out to recruiters and ATS systems
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-slate-900">Land Your Job</h3>
              <p className="text-slate-600 leading-relaxed">
                Apply to real positions and schedule interviews with top companies through our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                10K+
              </div>
              <div className="text-slate-600 text-lg">Successful Placements</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-green-600 mb-4 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-slate-600 text-lg">Partner Companies</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                95%
              </div>
              <div className="text-slate-600 text-lg">Interview Success Rate</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                50K+
              </div>
              <div className="text-slate-600 text-lg">Mock Interviews Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative">
          <h2 className="text-5xl font-bold text-white mb-8">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs with InterviewAI
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
          >
            <a href="/dashboard" className="flex items-center">
              Start Your Journey Today <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">InterviewAI</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Empowering careers through AI-powered interview preparation and job placement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Platform</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mock Interviews
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Job Opportunities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resume Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Assistant
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
