"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, Menu, X, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { logout } from "@/lib/auth"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const accessToken = localStorage.getItem("accessToken")
  const user = JSON.parse(localStorage.getItem("user"))
  const username = user?.fullname
  const role = user?.role

  const isLoggedIn = !!accessToken

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">HireWise</span>
                <div className="text-xs text-slate-500">Hiring Platform</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium">
              Dashboard
            </a>
            <a href="/jobs" className="text-slate-600 hover:text-blue-600 font-medium">
              Jobs
            </a>
            <a href="/mock-interviews" className="text-slate-600 hover:text-blue-600 font-medium">
              Mock Interviews
            </a>
            <a href="/resume-analysis" className="text-slate-600 hover:text-blue-600 font-medium">
              Resume Analysis
            </a>
            <a href="/ai-assistant" className="text-slate-600 hover:text-blue-600 font-medium">
              AI Assistant
            </a>
            {isLoggedIn && role === "admin" && (
              <a href="/admin-dashboard" className="text-slate-600 hover:text-blue-600 font-medium">
                Admin
              </a>
            )}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <Link to='/profile'>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-slate-900">{username}</div>
                      <div className="text-xs text-slate-500 capitalize">{role}</div>
                    </div>
                  </div>
                </Link>

                {/* Logout */}
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600 hover:text-red-600">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost">
                  <Link to="/login">Login</Link>
                </Button>
                <Button>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              {isLoggedIn ? (
                <>
                  {/* User Info */}
                  <Link to='/profile'>
                    <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{username}</div>
                        <div className="text-sm text-slate-500 capitalize">{role}</div>
                      </div>
                    </div>
                  </Link>

                  {/* Links */}
                  <a href="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium py-2">
                    Dashboard
                  </a>
                  <a href="/jobs" className="text-slate-600 hover:text-blue-600 font-medium py-2">
                    Jobs
                  </a>
                  <a href="/mock-interviews" className="text-slate-600 hover:text-blue-600 font-medium py-2">
                    Mock Interviews
                  </a>
                  <a href="/resume-analysis" className="text-slate-600 hover:text-blue-600 font-medium py-2">
                    Resume Analysis
                  </a>
                  {role === "admin" && (
                    <a href="/admin-dashboard" className="text-slate-600 hover:text-blue-600 font-medium py-2">
                      Admin Dashboard
                    </a>
                  )}

                  {/* Logout */}
                  <div className="pt-4 border-t border-slate-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 w-full justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Show Login & Signup if not logged in */}
                  <Button variant="ghost" className="w-full">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="w-full">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
