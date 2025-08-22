import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "./subpages/navbar"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title)

const Report = () => {
  const { interviewId } = useParams()
  const [interview, setInterview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/mock-interviews/${interviewId}/`)
        if (!res.ok) throw new Error("Failed to fetch interview")
        const data = await res.json()
        console.log("Report fetch data:", data)
        setInterview(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchInterview()
  }, [interviewId])

  if (loading) return <p className="text-center text-slate-600">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!interview) return <p className="text-center text-slate-500">Interview not found.</p>

  // Ensure scores is an array, default to empty array if undefined
  const scores = Array.isArray(interview.scores) ? interview.scores : []
  // Calculate average score with fallback
  const averageScore =
    scores.length > 0
      ? (scores.reduce((sum, score) => sum + (score || 0), 0) / scores.length).toFixed(2)
      : 0

  // Chart.js data and options
  const chartData = {
    labels: (interview.generated_questions || []).map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        label: "Scores",
        data: scores,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        title: { display: true, text: "Score (out of 10)" },
      },
      x: {
        title: { display: true, text: "Questions" },
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Mock Interview Scores" },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">{interview.jobrole} Mock Interview Report</h1>
        <p className="mb-4">
          <Badge className="mr-2 bg-blue-500">{interview.type}</Badge>
          <Badge variant="outline">{interview.level}</Badge>
          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
            Average Score: {averageScore} / 10
          </Badge>
        </p>
        {scores.length > 0 && (
          <div className="mb-8">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
        <div className="space-y-8">
          {(interview.generated_questions || []).map((question, index) => (
            <Card key={index} className="shadow-md border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">
                  Question {index + 1}: {question || "Question not available"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Your Answer:</strong>{" "}
                  {(interview.user_answers && interview.user_answers[index]) || "No answer provided"}
                </p>
                <p className="mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Score: {typeof scores[index] === "number" ? scores[index] : 0} / 10
                  </Badge>
                </p>
                <p>
                  <strong>Suggestions for Improvement:</strong>{" "}
                  {(interview.feedback && interview.feedback[index]?.suggestion) || "No feedback available"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Report