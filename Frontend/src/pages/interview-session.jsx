"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Video, VideoOff, RotateCcw, CheckCircle } from "lucide-react"

export function InterviewSession() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(1800) // 30 minutes
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)

  const questions = [
    "Tell me about yourself and your background in software development.",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "How do you handle working with tight deadlines and multiple priorities?",
    "Explain a time when you had to learn a new technology quickly.",
    "How do you approach debugging complex issues in your code?",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Live Interview
            </Badge>
            <span className="text-white">Software Engineer - Technical Interview</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white font-mono">{formatTime(timeRemaining)}</span>
            <Button variant="destructive">
              <a href="/mock-interviews/feedback">End Interview</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                {/* Video Feed */}
                <div className="aspect-video bg-gray-900 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl font-bold">You</span>
                          </div>
                          <p className="text-sm opacity-75">Camera is on</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <VideoOff className="w-16 h-16 mx-auto mb-4" />
                        <p>Camera is off</p>
                      </div>
                    )}
                  </div>

                  {/* Recording Indicator */}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm">Recording</span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="p-4 bg-gray-800 flex items-center justify-center space-x-4">
                  <Button
                    variant={isAudioOn ? "secondary" : "destructive"}
                    size="sm"
                    onClick={() => setIsAudioOn(!isAudioOn)}
                  >
                    {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>

                  <Button
                    variant={isVideoOn ? "secondary" : "destructive"}
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>

                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interview Panel */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Progress</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-4" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Started</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Question</CardTitle>
                <Badge variant="outline">Behavioral</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 leading-relaxed">{questions[currentQuestion]}</p>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                    Previous
                  </Button>
                  <Button size="sm" onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>Maintain eye contact with the camera</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>Use the STAR method for behavioral questions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>Take your time to think before answering</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p>Ask clarifying questions if needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart Question
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Skip Question
                </Button>
                <Button variant="destructive" size="sm" className="w-full">
                  <a href="/mock-interviews/feedback">End Interview</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
