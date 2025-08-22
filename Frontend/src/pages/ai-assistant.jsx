import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../pages/subpages/navbar";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `
You are "AI Career Assistant". Help users explore job roles,
responsibilities, skills required, company overviews, and interview prep tips.
If the user asks anything unrelated to jobs, careers, companies, or interviews,
politely refuse and remind them this assistant is only for career-related guidance.
`;

function SeedWelcome() {
  return {
    role: "assistant",
    content:
      "👋 Hi! I’m your AI Career Assistant. Ask me about a job role (e.g., Backend Developer), skills required, or a company.",
  };
}

export default function AICareerAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("careerChat");
    if (stored && stored !== "[]") {
      setMessages(JSON.parse(stored));
    } else {
      const seed = SeedWelcome();
      setMessages([seed]);
      localStorage.setItem("careerChat", JSON.stringify([seed]));
    }
  }, []);

  // Save chat to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("careerChat", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const openAIMessages = useMemo(() => {
    const rest = messages.map((m) => ({ role: m.role, content: m.content }));
    return [{ role: "system", content: SYSTEM_PROMPT }, ...rest];
  }, [messages]);

  const sendMessage = async () => {
    const content = input.trim();
    if (!content || loading) return;

    const userMsg = { role: "user", content };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);

    try {
      setLoading(true);
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [...openAIMessages, userMsg],
          temperature: 0.5,
        }),
      });

      if (!resp.ok) throw new Error("OpenAI request failed");

      const data = await resp.json();
      const aiText = data?.choices?.[0]?.message?.content || "…";
      const aiMsg = { role: "assistant", content: aiText };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errMsg = {
        role: "assistant",
        content: "⚠️ Sorry, something went wrong while contacting AI.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    const seed = SeedWelcome();
    setMessages([seed]);
    localStorage.setItem("careerChat", JSON.stringify([seed]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            💼 AI Career Assistant
          </h1>
          <button
            onClick={clearChat}
            className="px-4 py-2 rounded-xl bg-white shadow-md border hover:bg-gray-100 transition"
          >
            Clear Chat
          </button>
        </div>

        {/* Chat box */}
        <div
          ref={scrollerRef}
          className="flex-1 bg-white/70 backdrop-blur-md border rounded-2xl p-4 space-y-3 overflow-y-auto shadow-inner"
        >
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap shadow ${
                m.role === "user"
                  ? "ml-auto bg-blue-600 text-white rounded-br-none"
                  : "mr-auto bg-gray-100 text-slate-800 rounded-bl-none"
              }`}
            >
              {m.content}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="mr-auto flex items-center gap-1 bg-gray-100 px-4 py-3 rounded-2xl text-slate-600">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="mt-4 flex gap-2 items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a job role, skills, or company..."
            className="flex-1 border rounded-2xl p-3 bg-white shadow-md min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-3 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}