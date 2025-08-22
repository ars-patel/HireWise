// import { useEffect, useState } from "react"

// export default function MyApplications() {
//   const [applications, setApplications] = useState([])
//   const token = localStorage.getItem("accessToken")
//   const userId = localStorage.getItem("userId")

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/users/${userId}/applications/`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setApplications(data))
//       .catch((err) => console.error("Error:", err))
//   }, [token, userId])

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">My Applications</h1>
//       {applications.length === 0 ? (
//         <p className="text-gray-500">You haven't applied to any jobs yet.</p>
//       ) : (
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Job Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Company
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {applications.map((app, idx) => (
//                 <tr key={idx}>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.title}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{app.company}</td>
//                   <td className="px-6 py-4 text-sm">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         app.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : app.status === "selected"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {app.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  CheckCircle,
  XCircle,
  Building,
  MapPin,
  Calendar,
  ArrowLeft,
  Filter,
  Search,
  Eye,
  ExternalLink,
} from "lucide-react"

export default function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("accessToken")
  const userId = JSON.parse(localStorage.getItem("user")).user_id

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/users/${userId}/applications/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setApplications(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error:", err)
        setLoading(false)
      })
  }, [token, userId])

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "selected":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3 mr-1" />
      case "selected":
        return <CheckCircle className="w-3 h-3 mr-1" />
      case "rejected":
        return <XCircle className="w-3 h-3 mr-1" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
                <p className="text-slate-600 mt-1">Track your job application progress</p>
              </div>
            </div>
           
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">{applications.length}</div>
              <div className="text-sm text-slate-600">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {applications.filter((app) => app.status === "pending").length}
              </div>
              <div className="text-sm text-slate-600">Pending</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {applications.filter((app) => app.status === "selected").length}
              </div>
              <div className="text-sm text-slate-600">Selected</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {applications.filter((app) => app.status === "rejected").length}
              </div>
              <div className="text-sm text-slate-600">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Application History</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Applications Yet</h3>
                <p className="text-slate-600 mb-6">
                  You haven't applied to any jobs yet. Start exploring opportunities!
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <a href="/jobs" className="flex items-center">
                    Browse Jobs
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, idx) => (
                  <Card key={idx} className="border border-slate-200 hover:shadow-lg transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-semibold">
                            {app.company?.charAt(0) || "C"}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {app.title}
                                </h3>
                                <p className="text-slate-600 flex items-center mt-1">
                                  <Building className="w-4 h-4 mr-1" />
                                  {app.company}
                                </p>
                              </div>
                              <Badge className={`${getStatusColor(app.status)} border flex items-center`}>
                                {getStatusIcon(app.status)}
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </Badge>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Location
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Applied {new Date().toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-200 hover:border-blue-300 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              {app.status === "selected" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Congratulations!
                                </Button>
                              )}
                              {app.status === "pending" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  Under Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
