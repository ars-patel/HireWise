"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, MessageSquare, TrendingUp, Briefcase, BookOpen, Lightbulb } from "lucide-react"

export function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm your AI Career Assistant. I can help you with career guidance, skill recommendations, job market insights, and interview preparation. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickQuestions = [
    "What are the best skills to learn for backend engineering in 2025?",
    "Which companies are actively hiring freshers in AI roles?",
    "How can I improve my chances of getting hired at FAANG companies?",
    "What's the current job market like for data scientists?",
    "How should I prepare for system design interviews?",
    "What are the highest paying tech roles right now?",
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "assistant",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const getAIResponse = (question) => {
    if (question.toLowerCase().includes("backend") || question.toLowerCase().includes("skills")) {
      return "For backend engineering in 2025, I recommend focusing on these key skills:\n\n🔹 **Core Technologies**: Node.js, Python, Go, or Java\n🔹 **Cloud Platforms**: AWS, Azure, or Google Cloud\n🔹 **Databases**: PostgreSQL, MongoDB, Redis\n🔹 **DevOps**: Docker, Kubernetes, CI/CD\n🔹 **System Design**: Microservices, API design, scalability\n🔹 **Emerging**: AI/ML integration, serverless architecture\n\nWould you like me to elaborate on any of these areas or help you create a learning roadmap?"
    }

    if (question.toLowerCase().includes("companies") || question.toLowerCase().includes("hiring")) {
      return "Here are companies actively hiring for AI roles in 2025:\n\n🚀 **Tech Giants**: Google, Microsoft, Amazon, Meta, Apple\n🏢 **AI-First Companies**: OpenAI, Anthropic, Hugging Face, Scale AI\n💼 **Startups**: Many well-funded AI startups are expanding rapidly\n🏦 **Traditional Industries**: Banks, healthcare, automotive companies investing heavily in AI\n\nFor freshers, I recommend:\n- Building a strong portfolio with AI projects\n- Contributing to open-source AI projects\n- Getting relevant certifications\n- Networking at AI conferences and meetups\n\nWould you like specific company recommendations or tips for AI job applications?"
    }

    return "That's a great question! Based on current market trends and industry insights, I'd recommend focusing on developing both technical and soft skills. The job market is competitive but there are many opportunities for well-prepared candidates.\n\nWould you like me to provide more specific guidance based on your particular situation or career goals?"
  }

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">InterviewAI</span>
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">AI Career Assistant</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Clear Chat
            </Button>
            <Button variant="ghost" size="sm">
              Export Chat
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>AI Career Assistant</CardTitle>
                    <CardDescription>Get personalized career guidance and market insights</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.type === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div
                            className={`text-xs mt-2 ${message.type === "user" ? "text-purple-200" : "text-gray-500"}`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-6 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about your career..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <CardDescription>Popular career questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left h-auto p-3 justify-start"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Topics I Can Help With</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Market Trends</p>
                    <p className="text-xs text-gray-600">Industry insights & salary data</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-50">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Skill Development</p>
                    <p className="text-xs text-gray-600">Learning paths & recommendations</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg bg-purple-50">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Job Search</p>
                    <p className="text-xs text-gray-600">Company insights & applications</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2 rounded-lg bg-orange-50">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Interview Prep</p>
                    <p className="text-xs text-gray-600">Questions & strategies</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Insights</CardTitle>
                <CardDescription>Latest market updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Badge className="mb-2">Trending</Badge>
                  <p className="text-sm font-medium">AI Engineer roles up 150%</p>
                  <p className="text-xs text-gray-600">High demand for ML engineers</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <Badge variant="secondary" className="mb-2">
                    Salary
                  </Badge>
                  <p className="text-sm font-medium">Remote work premium</p>
                  <p className="text-xs text-gray-600">15% higher for remote roles</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <Badge variant="outline" className="mb-2">
                    Skills
                  </Badge>
                  <p className="text-sm font-medium">Cloud skills in demand</p>
                  <p className="text-xs text-gray-600">AWS, Azure certifications valuable</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
