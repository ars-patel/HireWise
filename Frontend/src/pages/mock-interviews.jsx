"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import Navbar from "./subpages/navbar";
import axios from "axios";
import { toast } from "react-hot-toast";

export function MockInterviews() {
  const [formData, setFormData] = useState({
    role: "",
    interviewType: "",
    jobExperience: "",
    technologies: [],
    numberOfQuestions: 0,
  });

  const [currentTech, setCurrentTech] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.role ||
      !formData.interviewType ||
      !formData.jobExperience ||
      formData.numberOfQuestions <= 0
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setQuestions([]);

    try {
      // --- 1. Generate interview questions (AI) ---
      const generated = await generateInterviewQuestions(formData);
      setQuestions(generated);

      // Extract just the text for backend
      const generatedList = generated.map((q) => q.question);

      // --- 2. Get logged user from localStorage ---
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error(
          "User data not found in localStorage. Please log in again."
        );
      }

      let user;
      try {
        user = JSON.parse(userData);
      } catch (err) {
        throw new Error("Invalid user data in localStorage.");
      }

      if (!user.user_id) {
        throw new Error("User ID not found in localStorage.");
      }

      // --- 3. Build payload ---
      const payload = {
        jobrole: formData.role,
        type:
          formData.interviewType.charAt(0).toUpperCase() +
          formData.interviewType.slice(1),
        level:
          formData.jobExperience.charAt(0).toUpperCase() +
          formData.jobExperience.slice(1),
        skills: formData.technologies,
        question: formData.numberOfQuestions.toString(),
        generated_questions: generatedList,
        user: user.user_id, // ✅ send user ID
      };

      // --- 4. POST to backend ---
      const backendResponse = await axios.post(
        "http://localhost:8000/api/mock-interviews/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Mock interview saved to backend:", backendResponse.data);
    } catch (err) {
      let backendError =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Failed to generate or save interview questions. Please try again.";
      console.error("❌ Error:", backendError);
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "numberOfQuestions" ? Number(value) : value,
    }));
  };

  const addTechnology = () => {
    if (
      currentTech.trim() &&
      !formData.technologies.includes(currentTech.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, currentTech.trim()],
      }));
      setCurrentTech("");
    }
  };

  const removeTechnology = (techToRemove) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  const handleTechKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  async function generateInterviewQuestions(formData) {
    const prompt = `
You are an experienced technical interviewer. 
Your task is to generate exactly ${
      formData.numberOfQuestions
    } **unique and well-structured** ${
      formData.interviewType
    } interview questions 
for a ${formData.jobExperience} candidate applying for the role of **${
      formData.role
    }**.

Key guidelines:
- Focus heavily on these technologies/skills: ${
      formData.technologies.join(", ") || "general professional skills"
    }.
- Make the questions relevant to the candidate’s ${
      formData.jobExperience
    } experience level.
- Ensure variety (do not repeat the same type of question).
- Keep each question clear, concise, and professional.
- Do **not** include answers, explanations, or extra commentary.
- Format strictly as a numbered list:
  1. Question one
  2. Question two
  3. Question three
  ... up to ${formData.numberOfQuestions}.
`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert mock interviewer." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) throw new Error(`API request failed: ${res.status}`);
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse numbered list
    return content
      .split(/\d+\.\s/)
      .filter(Boolean)
      .map((q, i) => ({
        id: i + 1,
        question: q.trim(),
      }));
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Mock Interview
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Practice your interview skills with our advanced AI interviewer
          </p>
        </div>

        {/* Form Card */}
        <Card className="w-full max-w-2xl mb-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Configure Your Interview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Job Role</Label>
                <Input
                  id="role"
                  placeholder="e.g., Software Engineer, Product Manager"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  required
                />
              </div>

              {/* Interview Type */}
              <div className="space-y-2">
                <Label htmlFor="interviewType">Interview Type</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("interviewType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="jobExperience">Job Experience Level</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("jobExperience", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">
                      Entry Level (0-2 years)
                    </SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">
                      Senior Level (6+ years)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies/Skills</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      id="technologies"
                      placeholder="e.g., React, Node.js, Python, AWS"
                      value={currentTech}
                      onChange={(e) => setCurrentTech(e.target.value)}
                      onKeyDown={handleTechKeyDown}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addTechnology}
                      disabled={!currentTech.trim()}
                      variant="outline"
                    >
                      Add
                    </Button>
                  </div>
                  {formData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{tech}</span>
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Number of Questions */}
              <div className="space-y-2">
                <Label htmlFor="numberOfQuestions">Number of Questions</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("numberOfQuestions", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Mock Interview"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Generated Interview Summary + Questions */}
        {questions.length > 0 && (
          <div className="w-full max-w-3xl space-y-6">
            {/* Interview Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Interview Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold">Role:</span> {formData.role}
                </p>
                <p>
                  <span className="font-semibold">Interview Type:</span>{" "}
                  {formData.interviewType.charAt(0).toUpperCase() +
                    formData.interviewType.slice(1)}
                </p>
                <p>
                  <span className="font-semibold">Experience Level:</span>{" "}
                  {formData.jobExperience === "entry"
                    ? "Entry Level (0-2 years)"
                    : formData.jobExperience === "mid"
                    ? "Mid Level (3-5 years)"
                    : "Senior Level (6+ years)"}
                </p>
                <p>
                  <span className="font-semibold">Technologies:</span>{" "}
                  {formData.technologies.length > 0
                    ? formData.technologies.join(", ")
                    : "General skills"}
                </p>
                <p>
                  <span className="font-semibold">Number of Questions:</span>{" "}
                  {formData.numberOfQuestions}
                </p>
              </CardContent>
            </Card>

            {/* Questions */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                Your Mock Interview Questions
              </h2>
              {questions.map((q) => (
                <Card key={q.id}>
                  <CardContent className="p-4">
                    <p className="text-lg text-gray-800">
                      <span className="font-semibold">{q.id}.</span>{" "}
                      {q.question}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
