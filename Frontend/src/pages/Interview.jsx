import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "./subpages/navbar";

const Interviews = () => {
  const { userId } = useParams();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/mock-interviews/user/${userId}/`
        );
        if (!res.ok) throw new Error("Failed to fetch mock interviews");
        const data = await res.json();
        setInterviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, [userId]);

  if (loading) return <p className="text-center text-slate-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          My Mock Interviews
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interviews.length === 0 ? (
            <p className="text-slate-500">No mock interviews found.</p>
          ) : (
            interviews.map((interview) => (
              <Link to={`/answer-questions/${interview.id}`} key={interview.id}>
                <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-800">
                      {interview.jobrole}
                    </CardTitle>
                    <Badge variant="secondary" className="mr-2">
                      {interview.type}
                    </Badge>
                    <Badge variant="outline">{interview.level}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Skills: {interview.skills.join(", ")}
                    </p>
                    <p className="text-slate-600">
                      Questions: {interview.question}
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      Generated Questions:{" "}
                      {interview.generated_questions.length}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
        <Link to={`/mock-interviews`}>
          <Button className="mt-6 bg-blue-500 hover:bg-blue-600">
            Create New Mock Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interviews;
