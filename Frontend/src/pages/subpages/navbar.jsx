import React from "react";
import { Bot, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const user = localStorage.getItem("username");
  return (
    <div>
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">InterviewAI</span>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">
                  {localStorage.getItem("username")[0]}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button variant="ghost">Sign In</Button>
              <Button>
                <a href="/dashboard">Get Started</a>
              </Button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
