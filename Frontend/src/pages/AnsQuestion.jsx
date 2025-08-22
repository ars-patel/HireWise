import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Navbar from "./subpages/navbar"

const AnswerQuestions = () => {
    const { interviewId } = useParams()
    const [interview, setInterview] = useState(null)
    const [answers, setAnswers] = useState([])
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/mock-interviews/${interviewId}/`)
                if (!res.ok) throw new Error("Failed to fetch interview")
                const data = await res.json()
                console.log("Initial fetch data:", data)
                setInterview(data)
                setAnswers(data.user_answers || new Array(data.generated_questions?.length || 0).fill(""))
                setScores(data.scores || new Array(data.generated_questions?.length || 0).fill(null))
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchInterview()
    }, [interviewId])

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers]
        newAnswers[index] = value
        setAnswers(newAnswers)
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const res = await fetch(`http://localhost:8000/api/mock-interviews/${interviewId}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_answers: answers })
            })
            if (!res.ok) throw new Error("Failed to submit answers")
            const updated = await res.json()
            console.log("API response after submit:", updated)
            setScores(updated.scores || new Array(interview?.generated_questions?.length || 0).fill(null))
            setInterview(updated)
            // Delay navigation to allow state update and re-render
            setTimeout(() => navigate(`/mock-interviews/${interviewId}/report`), 100)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <p className="text-center text-slate-600">Loading...</p>
    if (error) return <p className="text-center text-red-500">{error}</p>
    if (!interview) return <p className="text-center text-slate-500">Interview not found.</p>

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">{interview.jobrole} Mock Interview</h1>
                <p className="mb-4">
                    <Badge className="mr-2 bg-blue-500">{interview.type}</Badge>
                    <Badge variant="outline">{interview.level}</Badge>
                </p>
                <div className="space-y-8">
                    {(interview.generated_questions || []).map((question, index) => (
                        <Card key={index} className="shadow-md border border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-lg text-slate-800">Question {index + 1}: {question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={answers[index] || ""}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    placeholder="Type your answer here..."
                                    className="mb-2 min-h-[100px]"
                                />
                                {typeof scores[index] === "number" && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        Score: {scores[index]} / 10
                                    </Badge>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Button 
                    onClick={handleSubmit} 
                    disabled={submitting} 
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600"
                >
                    {submitting ? "Submitting..." : "Submit Answers for AI Scoring"}
                </Button>
            </div>
        </div>
    )
}

export default AnswerQuestions