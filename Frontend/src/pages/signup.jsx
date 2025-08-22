"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, User, Mail, Lock, UserCheck, Sparkles, FileText } from "lucide-react"
import { toast } from 'react-hot-toast';

const SimpleSignup = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // ✅ step 1 (signup) → step 2 (profile)
  const [userId, setUserId] = useState(null)

  const [form, setForm] = useState({ fullname: "", email: "", password: "", role: "user" })
  const [profile, setProfile] = useState({ bio: "", resume_file: null })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Validate step 1
  const validateForm = () => {
    const newErrors = {}
    if (!form.fullname.trim()) newErrors.fullname = "Fullname is required"
    else if (form.fullname.length < 3) newErrors.fullname = "Min 3 characters required"
    if (!form.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format"
    if (!form.password) newErrors.password = "Password is required"
    else if (form.password.length < 6) newErrors.password = "Min 6 characters required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Step 1: Signup
  const handleSignup = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/api/users/signup/", form)
      toast.success("Account created successfully! Now complete your profile.")
      console.log("Signup response:", res.data)
      setUserId(res.data.user_id)
      setStep(2) // ✅ go to profile setup
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Signup failed. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Profile setup
  const handleProfileSetup = async (e) => {
    e.preventDefault()
    if (!profile.resume_file) {
      setErrors({ resume_file: "Resume file is required" })
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("bio", profile.bio)
      formData.append("resume_file", profile.resume_file)

      await axios.post(`http://localhost:8000/api/users/${userId}/profile_setup/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast.success("Profile setup completed! You can now login.")
      navigate("/login")
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Profile setup failed. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">
              {step === 1 ? "Create Account" : "Complete Profile"}
            </CardTitle>
            <p className="text-slate-600 mt-2">
              {step === 1 ? "Join InterviewAI and start your career journey" : "Upload your resume & bio"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 ? (
              // STEP 1: Signup form
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Fullname */}
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-sm font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" /> Fullname
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    value={form.fullname}
                    onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                    className={`h-12 ${errors.fullname ? "border-red-500" : "border-slate-200"}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`h-12 ${errors.email ? "border-red-500" : "border-slate-200"}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center">
                    <Lock className="w-4 h-4 mr-2" /> Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className={`h-12 pr-12 ${errors.password ? "border-red-500" : "border-slate-200"}`}
                      placeholder="Create a strong password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Role selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center">
                    <UserCheck className="w-4 h-4 mr-2" /> Account Type
                  </Label>
                  <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value })}>
                    <SelectTrigger className="h-12 border-slate-200">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Job Seeker</SelectItem>
                      <SelectItem value="admin">Admin/Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

                <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  {loading ? "Creating Account..." : "Next"}
                </Button>
              </form>
            ) : (
              // STEP 2: Profile setup form
              <form onSubmit={handleProfileSetup} className="space-y-6">
                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                  <Input
                    id="bio"
                    type="text"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                  />
                </div>

                {/* Resume upload */}
                <div className="space-y-2">
                  <Label htmlFor="resume_file" className="text-sm font-medium flex items-center">
                    <FileText className="w-4 h-4 mr-2" /> Resume (PDF/DOC)
                  </Label>
                  <Input
                    id="resume_file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setProfile({ ...profile, resume_file: e.target.files[0] })}
                  />
                  {errors.resume_file && <p className="text-red-500 text-sm">{errors.resume_file}</p>}
                </div>

                {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

                <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  {loading ? "Saving Profile..." : "Finish Signup"}
                </Button>
              </form>
            )}

            <div className="text-center pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
                  Sign In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SimpleSignup
