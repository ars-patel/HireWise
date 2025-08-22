
// // "use client"

// // import { useState } from "react"
// // import axios from "axios"
// // import { jwtDecode } from "jwt-decode"
// // import { useNavigate } from "react-router-dom"

// // const EnhancedLogin = () => {
// //   const navigate = useNavigate()
// //   const [form, setForm] = useState({ email: "", password: "" })
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState("")

// //   const handleLogin = async (e) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setError("")

// //     try {
// //       const res = await axios.post("http://localhost:8000/api/login/", form)
// //       const token = res.data.token
// //       const decoded = jwtDecode(token)

// //       localStorage.setItem("accessToken", token)
// //       localStorage.setItem("userId", decoded.user_id)
// //       localStorage.setItem("email", decoded.email)

// //       alert("Login successful!")
// //       navigate("/dashboard")
// //     } catch (err) {
// //       setError("Invalid credentials. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
// //       <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
// //         <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login to HireWise</h2>
// //         <form onSubmit={handleLogin} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-1">email or Email</label>
// //             <input
// //               type="text"
// //               value={form.email}
// //               onChange={(e) => setForm({ ...form, email: e.target.value })}
// //               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Password</label>
// //             <div className="relative">
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 value={form.password}
// //                 onChange={(e) => setForm({ ...form, password: e.target.value })}
// //                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-2 text-sm text-blue-500"
// //               >
// //                 {showPassword ? "Hide" : "Show"}
// //               </button>
// //             </div>
// //           </div>

// //           {error && <p className="text-red-500 text-sm">{error}</p>}

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
// //           >
// //             {loading ? "Logging in..." : "Login"}
// //           </button>
// //         </form>

// //         <p className="mt-4 text-center text-sm">
// //           Don't have an account?{" "}
// //           <button
// //             onClick={() => navigate("/signup")}
// //             className="text-blue-600 hover:underline"
// //           >
// //             Sign Up
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EnhancedLogin

// // login.jsx
// import { useState } from "react"
// import axios from "axios"
// import { jwtDecode } from "jwt-decode"
// import { useNavigate } from "react-router-dom"

// const EnhancedLogin = () => {
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ email: "", password: "" })
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       const res = await axios.post("http://localhost:8000/api/users/login/", form)
//       const token = res.data.token
//       const decoded = jwtDecode(token)

//       // Store login info
//       localStorage.setItem("accessToken", token)
//       localStorage.setItem("userId", decoded.user_id)
//       localStorage.setItem("email", decoded.email)
//       localStorage.setItem("role", decoded.role) // ✅ store role

//       alert("Login successful!")

//       // Redirect based on role
//       if (decoded.role === "admin") {
//         navigate("/admin-dashboard")
//       } else {
//         navigate("/dashboard")
//       }
//     } catch (err) {
//       setError("Invalid credentials. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login to HireWise</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">email or Email</label>
//             <input
//               type="text"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-2 text-sm text-blue-500"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm">
//           Don't have an account?{" "}
//           <button onClick={() => navigate("/signup")} className="text-blue-600 hover:underline">
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default EnhancedLogin


"use client"
import toast from 'react-hot-toast';

import { useState } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, User, Lock, LogIn, Sparkles } from "lucide-react"

const EnhancedLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await axios.post("http://localhost:8000/api/users/login/", form)
      const token = res.data.token
      const user = res.data.user

      localStorage.setItem("accessToken", token)
      localStorage.setItem("user", JSON.stringify(user))

      toast.success("Login successful!")

      if (user.role === "admin") {
        navigate("/admin-dashboard")
      } else {
        navigate("/dashboard")
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.")
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
            <CardTitle className="text-3xl font-bold text-slate-900">Welcome Back</CardTitle>
            <p className="text-slate-600 mt-2">Sign in to continue your career journey</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email or email"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-12 pr-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Create Account
                </button>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 mb-2">Demo Accounts</p>
              <div className="flex justify-center space-x-4 text-xs">
                <span className="text-slate-600">User: demo@user.com</span>
                <span className="text-slate-600">Admin: demo@admin.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EnhancedLogin
