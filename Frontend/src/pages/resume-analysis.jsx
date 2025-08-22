import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from './subpages/navbar';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Upload,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Users,
  Target,
  Zap,
  Loader2,
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth/mammoth.browser";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios"; // make sure axios is imported at the top

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// File readers
const readAsArrayBuffer = (file) =>
  new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsArrayBuffer(file);
  });

const readAsText = (file) =>
  new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsText(file);
  });

async function extractPdfText(arrayBuffer) {
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it) => it.str).join(" ") + "\n";
  }
  return text;
}

async function extractDocxText(arrayBuffer) {
  const { value } = await mammoth.extractRawText({ arrayBuffer });
  return value || "";
}

function sanitize(text) {
  return (text || "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchResumeAnalysis(resumeText) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("Missing API key in .env file");

  const systemPrompt = `
You are an experienced career consultant, ATS (Applicant Tracking System) expert, and professional resume reviewer. 
Your task is to critically evaluate the provided resume text and return ONLY a JSON object in the following exact structure.

Rules for scoring:
- All scores must be integers from 0 to 100.
- Status must be one of: "excellent", "good", or "needs-improvement".
- Be objective, specific, and actionable in your feedback.
- Ensure all arrays contain at least 3-5 highly relevant, valuable, and non-generic items based on the resume content and current job market trends.
- Use clear, professional language without unnecessary words.
- Do NOT include any explanation, preface, or extra text outside the JSON.

JSON format:
{
  "overallScore": number,
  "sections": {
    "contact": { "score": number, "status": "excellent"|"good"|"needs-improvement" },
    "summary": { "score": number, "status": "excellent"|"good"|"needs-improvement" },
    "experience": { "score": number, "status": "excellent"|"good"|"needs-improvement" },
    "skills": { "score": number, "status": "excellent"|"good"|"needs-improvement" },
    "education": { "score": number, "status": "excellent"|"good"|"needs-improvement" },
    "projects": { "score": number, "status": "excellent"|"good"|"needs-improvement" }
  },
  "strengths": string[],
  "improvements": string[],
  "keywords": { 
    "present": string[],
    "missing": string[]
  },
  "comparison": { 
    "percentile": number,
    "similarProfiles": number,
    "topSkills": string[]
  }
}

Evaluation guidelines:
- Contact: Completeness & professionalism of contact info.
- Summary: Clarity, conciseness, and role alignment.
- Experience: Impact, achievements, and measurable results.
- Skills: Relevance, variety, and ATS keyword match.
- Education: Completeness and job relevance.
- Projects: Detail, depth, and real-world applicability.
- Strengths/Improvements: Must be targeted, not generic.
- Keywords: Identify industry-relevant terms; missing keywords must be impactful for ATS.
- Comparison: Provide realistic benchmarking.
Return ONLY valid JSON, no code formatting.
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Resume Analyzer",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: resumeText.slice(0, 24000) },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) throw new Error(`API request failed: ${res.status}`);
  const data = await res.json();
  let content = data?.choices?.[0]?.message?.content;
  return typeof content === "string" ? JSON.parse(content) : content;
}

export function ResumeAnalysis() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileBusy, setFileBusy] = useState(false);

  const handleFileUpload = async (file) => {
    setError("");
    if (!file) {
      setError("Please choose a resume file (PDF/DOC/DOCX/TXT).");
      return;
    }

    try {
      setFileBusy(true);

      // --- 1. Extract resume text ---
      const ext = file.name.toLowerCase();
      let rawText = "";
      if (ext.endsWith(".pdf")) {
        const ab = await readAsArrayBuffer(file);
        rawText = await extractPdfText(ab);
      } else if (ext.endsWith(".docx")) {
        const ab = await readAsArrayBuffer(file);
        rawText = await extractDocxText(ab);
      } else if (ext.endsWith(".doc") || file.type === "text/plain") {
        rawText = await readAsText(file);
      } else {
        throw new Error("Unsupported file type. Use PDF, DOCX, or TXT.");
      }

      const resumeText = sanitize(rawText);
      const minLength = 100;
      const keywords = [
        "experience",
        "skills",
        "education",
        "summary",
        "project",
        "work",
        "contact",
      ];
      const textLower = resumeText.toLowerCase();
      const keywordMatches = keywords.filter((kw) => textLower.includes(kw));
      if (resumeText.length < minLength || keywordMatches.length < 2) {
        throw new Error("This file does not appear to be a valid resume.");
      }

      sessionStorage.setItem("resume_text_for_analysis", resumeText);

      // --- 2. Get AI analysis ---
      setLoading(true);
      const data = await fetchResumeAnalysis(resumeText);
      if (typeof data.overallScore !== "number" || data.overallScore < 0 || data.overallScore > 100) {
        throw new Error("Invalid ATS score received from analysis.");
      }
      setAnalysisData(data);

      // --- 3. Send ATS score to backend ---
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("User data not found in localStorage. Please log in again.");
      }
      const user = JSON.parse(userData);
      if (!user.user_id) {
        throw new Error("User ID not found in localStorage.");
      }

      const backendResponse = await axios.post(
        "http://localhost:8000/api/resume/create/",
        {
          user: user.user_id,
          atsScore: data.overallScore,
        }
      );
      console.log("✅ Resume saved to backend:", backendResponse.data);
    } catch (e) {
      const backendError = e.response?.data?.detail || e.response?.data?.message || e.message;
      setError(backendError || "Failed to process or save resume. Please try again.");
      console.error("❌ Error:", backendError || e.message);
    } finally {
      setFileBusy(false);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Analyzing your
        resume...
      </div>
    );
  }

  const downloadPDFReport = () => {
    if (!analysisData) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Resume Analysis Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Overall Score: ${analysisData.overallScore}`, 14, 30);
    doc.text(`Percentile: Top ${analysisData.comparison.percentile}%`, 14, 38);
    doc.text(
      `Profiles Compared: ${analysisData.comparison.similarProfiles}`,
      14,
      46
    );

    // Sections Table
    const sections = Object.entries(analysisData.sections).map(
      ([name, data]) => [
        name.charAt(0).toUpperCase() + name.slice(1),
        `${data.score}%`,
        data.status,
      ]
    );
    autoTable(doc, {
      startY: 55,
      head: [["Section", "Score", "Status"]],
      body: sections,
    });

    // Strengths
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Strengths"]],
      body: analysisData.strengths.map((s) => [s]),
    });

    // Improvements
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Improvements"]],
      body: analysisData.improvements.map((i) => [i]),
    });

    // Keywords Present
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Present Keywords"]],
      body: analysisData.keywords.present.map((k) => [k]),
    });

    // Keywords Missing
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Missing Keywords"]],
      body: analysisData.keywords.missing.map((k) => [k]),
    });

    doc.save("resume_analysis_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar/>

      <div className="container mx-auto px-4 py-8">
        {analysisData && (
            <div className="flex items-center justify-end space-x-6 mb-4">
              <Button size="lg" onClick={() => setAnalysisData(null)}>
                <Upload className="w-5 h-5 mr-2" />
                Upload Updated Resume
              </Button>
              <Button variant="outline" size="lg" onClick={downloadPDFReport}>
                Download Detailed Report
              </Button>
            </div>
          )}
        {!analysisData ? (
          <Card className="max-w-2xl mx-auto shadow-md border">
            <CardHeader className="text-center">
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Choose your resume file to get AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="border border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:border-gray-400 transition-colors">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 mb-4">
                  Select a PDF, DOC, DOCX, or TXT file
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  disabled={fileBusy}
                  className="block mx-auto mb-4 text-sm file:mr-4 file:py-2 file:px-4 
                   file:rounded-full file:border-0 
                   file:text-sm file:font-semibold 
                   file:bg-blue-50 file:text-blue-700 
                   hover:file:bg-blue-100 cursor-pointer"
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <p className="text-xs text-gray-500 mt-4">
                  Max file size: 10MB
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Overall Score */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg
                        className="w-32 h-32 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeDasharray={`${analysisData.overallScore}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">
                          {analysisData.overallScore}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Overall Score
                    </h3>
                    <p className="text-gray-600">
                      Good resume with room for improvement
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          ATS Compatibility
                        </span>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Keyword Match
                        </span>
                        <span className="text-sm text-gray-600">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Content Quality
                        </span>
                        <span className="text-sm text-gray-600">
                          {analysisData.overallScore}%
                        </span>
                      </div>
                      <Progress
                        value={analysisData.overallScore}
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-700">
                          Top {analysisData.comparison.percentile}%
                        </p>
                        <p className="text-xs text-green-600">
                          vs similar profiles
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-blue-700">
                          {analysisData.comparison.similarProfiles.toLocaleString()}
                        </p>
                        <p className="text-xs text-blue-600">
                          profiles compared
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for details */}
            <Tabs defaultValue="sections" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sections">Section Analysis</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="comparison">Peer Comparison</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>

              {/* Section Analysis */}
              <TabsContent value="sections">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(analysisData.sections).map(
                    ([section, data]) => (
                      <Card key={section}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="capitalize">
                              {section.replace("-", " ")}
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                              {data.status === "excellent" && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {data.status === "good" && (
                                <Target className="w-5 h-5 text-blue-600" />
                              )}
                              {data.status === "needs-improvement" && (
                                <AlertCircle className="w-5 h-5 text-orange-600" />
                              )}
                              <Badge
                                variant={
                                  data.status === "excellent"
                                    ? "default"
                                    : data.status === "good"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {data.score}%
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Progress value={data.score} className="mb-4" />
                          <div className="space-y-2 text-sm">
                            {data.status === "excellent" && (
                              <p className="text-green-700">
                                ✓ This section is well-optimized
                              </p>
                            )}
                            {data.status === "good" && (
                              <p className="text-blue-700">
                                → Minor improvements recommended
                              </p>
                            )}
                            {data.status === "needs-improvement" && (
                              <p className="text-orange-700">
                                ⚠ Significant improvements needed
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </TabsContent>

              {/* Keywords */}
              <TabsContent value="keywords">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        Present Keywords
                      </CardTitle>
                      <CardDescription>
                        Keywords found in your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.present.map((keyword) => (
                          <Badge
                            key={keyword}
                            className="bg-green-100 text-green-700"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                        Missing Keywords
                      </CardTitle>
                      <CardDescription>
                        High-value keywords to consider adding
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.missing.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="outline"
                            className="border-orange-300 text-orange-700"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Comparison */}
              <TabsContent value="comparison">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Percentile Ranking</CardTitle>
                      <CardDescription>
                        Your position among similar profiles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {analysisData.comparison.percentile}%
                        </div>
                        <p className="text-gray-600">
                          Better than {analysisData.comparison.percentile}% of
                          similar profiles
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Profiles Analyzed</CardTitle>
                      <CardDescription>
                        Total comparison dataset
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {analysisData.comparison.similarProfiles.toLocaleString()}
                        </div>
                        <p className="text-gray-600">
                          Similar profiles in our database
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Skills</CardTitle>
                      <CardDescription>
                        Most common skills in your field
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analysisData.comparison.topSkills.map(
                          (skill, index) => (
                            <div
                              key={skill}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm">{skill}</span>
                              <Badge variant="secondary">#{index + 1}</Badge>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Suggestions */}
              <TabsContent value="suggestions">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        Strengths
                      </CardTitle>
                      <CardDescription>
                        What's working well in your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisData.strengths.map((strength, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{strength}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 text-orange-600 mr-2" />
                        Improvements
                      </CardTitle>
                      <CardDescription>
                        Areas to focus on for better results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisData.improvements.map((improvement, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <Zap className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">
                              {improvement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}