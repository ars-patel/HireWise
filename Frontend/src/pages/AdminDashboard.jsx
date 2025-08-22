// import { useEffect, useState } from "react"

// export default function AdminDashboard() {
//   const [jobs, setJobs] = useState([])
//   const [applications, setApplications] = useState([])
//   const [selectedJobId, setSelectedJobId] = useState(null)

//   const token = localStorage.getItem("accessToken")

//   // ✅ Fetch all jobs on load
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/jobs/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch jobs")
//         return res.json()
//       })
//       .then((data) => setJobs(data))
//       .catch((err) => console.error("Error fetching jobs:", err))
//   }, [token])

//   // ✅ Fetch applications for a specific job
//   const fetchApplications = (jobId) => {
//     setSelectedJobId(jobId)
//     fetch(`http://127.0.0.1:8000/api/jobs/${jobId}/applications/`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch applications")
//         return res.json()
//       })
//       .then((data) => setApplications(data))
//       .catch((err) => console.error("Error fetching applications:", err))
//   }

//   // ✅ Update application status
//   const updateStatus = (appId, status) => {
//     fetch(`http://127.0.0.1:8000/api/applications/${appId}/update_status/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update status")
//         return res.json()
//       })
//       .then((data) => {
//         alert(data.message)
//         fetchApplications(selectedJobId) // refresh
//       })
//       .catch((err) => console.error("Error updating status:", err))
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

//       <h2 className="text-2xl font-semibold mb-4">All Jobs</h2>
//       {jobs.length === 0 ? (
//         <p className="text-gray-500">No jobs found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job.id || job._id}
//               className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col justify-between"
//             >
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
//                 <p className="text-gray-500">{job.company}</p>
//               </div>
//               <button
//                 onClick={() => fetchApplications(job.id || job._id)}
//                 className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
//               >
//                 View Applications
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedJobId && (
//         <div className="mt-10">
//           <h2 className="text-2xl font-semibold mb-4">Applications</h2>
//           {applications.length === 0 ? (
//             <p className="text-gray-500">No applications yet.</p>
//           ) : (
//             <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                       Applicant
//                     </th>
//                     <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {applications.map((app) => (
//                     <tr key={app.application_id}>
//                       <td className="px-6 py-4 text-sm text-gray-800">{app.fullname}</td>
//                       <td className="px-6 py-4 text-sm text-gray-500">{app.email}</td>
//                       <td className="px-6 py-4 text-sm">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             app.status === "pending"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : app.status === "selected"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {app.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm space-x-2">
//                         {app.status === "pending" ? (
//                           <>
//                             <button
//                               onClick={() =>
//                                 updateStatus(app.application_id, "selected")
//                               }
//                               className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition"
//                             >
//                               Select
//                             </button>
//                             <button
//                               onClick={() =>
//                                 updateStatus(app.application_id, "rejected")
//                               }
//                               className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
//                             >
//                               Reject
//                             </button>
//                           </>
//                         ) : (
//                           <span className="text-gray-500">—</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }



// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Users,
//   Briefcase,
//   TrendingUp,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Filter,
//   Search,
//   MoreHorizontal,
//   Building,
// } from "lucide-react";

// export default function AdminDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [stats, setStats] = useState({
//     totalJobs: 0,
//     totalApplications: 0,
//     pendingApplications: 0,
//     selectedApplications: 0,
//   });

//   const token = localStorage.getItem("accessToken");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/jobs/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch jobs");
//         return res.json();
//       })
//       .then((data) => {
//         setJobs(data);
//         setStats((prev) => ({ ...prev, totalJobs: data.length }));
//       })
//       .catch((err) => console.error("Error fetching jobs:", err));
//   }, [token]);

//   const fetchApplications = (jobId) => {
//     setSelectedJobId(jobId);
//     fetch(`http://127.0.0.1:8000/api/jobs/${jobId}/applications/`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch applications");
//         return res.json();
//       })
//       .then((data) => {
//         setApplications(data);
//         const pending = data.filter((app) => app.status === "pending").length;
//         const selected = data.filter((app) => app.status === "selected").length;
//         setStats((prev) => ({
//           ...prev,
//           totalApplications: data.length,
//           pendingApplications: pending,
//           selectedApplications: selected,
//         }));
//       })
//       .catch((err) => console.error("Error fetching applications:", err));
//   };

//   const updateStatus = (appId, status) => {
//     fetch(`http://127.0.0.1:8000/api/applications/${appId}/update_status/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update status");
//         return res.json();
//       })
//       .then((data) => {
//         alert(data.message);
//         fetchApplications(selectedJobId);
//       })
//       .catch((err) => console.error("Error updating status:", err));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "selected":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "rejected":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-900">
//                 Admin Dashboard
//               </h1>
//               <p className="text-slate-600 mt-1">
//                 Manage job applications and candidates
//               </p>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="border-slate-200 bg-transparent"
//               >
//                 <Filter className="w-4 h-4 mr-2" />
//                 Filters
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="border-slate-200 bg-transparent"
//               >
//                 <Search className="w-4 h-4 mr-2" />
//                 Search
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         {/* Stats Cards */}
//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-slate-600 mb-1">Total Jobs</p>
//                   <p className="text-3xl font-bold text-slate-900">
//                     {stats.totalJobs}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <Briefcase className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-slate-600 mb-1">
//                     Total Applications
//                   </p>
//                   <p className="text-3xl font-bold text-slate-900">
//                     {stats.totalApplications}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <Users className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-slate-600 mb-1">Pending Review</p>
//                   <p className="text-3xl font-bold text-slate-900">
//                     {stats.pendingApplications}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
//                   <Clock className="w-6 h-6 text-yellow-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-slate-600 mb-1">Selected</p>
//                   <p className="text-3xl font-bold text-slate-900">
//                     {stats.selectedApplications}
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
//                   <TrendingUp className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Jobs Section */}
//         <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-2xl text-slate-900 flex items-center">
//               <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
//               Job Positions
//             </CardTitle>
//             <p className="text-slate-600">
//               Click on any job to view applications
//             </p>
//           </CardHeader>
//           <CardContent>
//             {jobs.length === 0 ? (
//               <div className="text-center py-12">
//                 <Building className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                 <p className="text-slate-500 text-lg">No jobs found</p>
//               </div>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {jobs.map((job) => (
//                   <Card
//                     key={job.id || job._id}
//                     className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
//                       selectedJobId === (job.id || job._id)
//                         ? "border-blue-500 bg-blue-50"
//                         : "border-slate-200 hover:border-blue-300"
//                     }`}
//                     onClick={() => fetchApplications(job.id || job._id)}
//                   >
//                     <CardContent className="p-6">
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex-1">
//                           <h3 className="text-lg font-bold text-slate-900 mb-2">
//                             {job.title}
//                           </h3>
//                           <p className="text-slate-600 flex items-center">
//                             <Building className="w-4 h-4 mr-1" />
//                             {job.company}
//                           </p>
//                         </div>
//                         <Button variant="ghost" size="sm">
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <Badge variant="outline" className="text-slate-600">
//                           {job.location}
//                         </Badge>
//                         <span className="text-sm text-slate-500">
//                           {job.requirements || 0} requirements
//                         </span>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Applications Section */}
//         {selectedJobId && (
//           <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-2xl text-slate-900 flex items-center">
//                 <Users className="w-6 h-6 mr-3 text-green-600" />
//                 Applications
//               </CardTitle>
//               <p className="text-slate-600">
//                 Manage candidate applications for the selected position
//               </p>
//             </CardHeader>
//             <CardContent>
//               {applications.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-500 text-lg">No applications yet</p>
//                   <p className="text-slate-400">
//                     Applications will appear here once candidates apply
//                   </p>
//                 </div>
//               ) : (
//                 <div className="overflow-hidden rounded-lg border border-slate-200">
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-slate-200">
//                       <thead className="bg-slate-50">
//                         <tr>
//                           <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
//                             Candidate
//                           </th>
//                           <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
//                             Email
//                           </th>
//                           <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
//                             Status
//                           </th>
//                           <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-slate-200 bg-white">
//                         {applications.map((app) => (
//                           <tr
//                             key={app.application_id}
//                             className="hover:bg-slate-50 transition-colors"
//                           >
//                             <td className="px-6 py-4">
//                               <div className="flex items-center">
//                                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
//                                   {app.fullname.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div>
//                                   <p className="text-sm font-semibold text-slate-900">
//                                     {app.fullname}
//                                   </p>
//                                   <p className="text-xs text-slate-500">
//                                     Applied{" "}
//                                     {new Date(
//                                       app.applied_at
//                                     ).toLocaleDateString()}
//                                   </p>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 text-sm text-slate-600">
//                               {app.email}
//                             </td>
//                             <td className="px-6 py-4">
//                               <Badge
//                                 className={`${getStatusColor(
//                                   app.status
//                                 )} border`}
//                               >
//                                 {app.status === "pending" && (
//                                   <Clock className="w-3 h-3 mr-1" />
//                                 )}
//                                 {app.status === "selected" && (
//                                   <CheckCircle className="w-3 h-3 mr-1" />
//                                 )}
//                                 {app.status === "rejected" && (
//                                   <XCircle className="w-3 h-3 mr-1" />
//                                 )}
//                                 {app.status.charAt(0).toUpperCase() +
//                                   app.status.slice(1)}
//                               </Badge>
//                             </td>
//                             <td className="px-6 py-4">
//                               {app.status === "pending" ? (
//                                 <div className="flex items-center space-x-2">
//                                   <Button
//                                     onClick={() =>
//                                       updateStatus(
//                                         app.application_id,
//                                         "selected"
//                                       )
//                                     }
//                                     size="sm"
//                                     className="bg-green-600 hover:bg-green-700 text-white"
//                                   >
//                                     <CheckCircle className="w-4 h-4 mr-1" />
//                                     Select
//                                   </Button>
//                                   <Button
//                                     onClick={() =>
//                                       updateStatus(
//                                         app.application_id,
//                                         "rejected"
//                                       )
//                                     }
//                                     size="sm"
//                                     variant="destructive"
//                                   >
//                                     <XCircle className="w-4 h-4 mr-1" />
//                                     Reject
//                                   </Button>
//                                 </div>
//                               ) : (
//                                 <div className="flex items-center space-x-2">
//                                   <span className="text-slate-400 text-sm">
//                                     No actions available
//                                   </span>
//                                   <Button variant="ghost" size="sm">
//                                     <MoreHorizontal className="w-4 h-4" />
//                                   </Button>
//                                 </div>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Search,
  MoreHorizontal,
  Building,
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import Profile from "./Profile";
import { logout } from '@/lib/auth';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  // -------------------- State --------------------
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    selectedApplications: 0,
  });

  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [jobDialogMode, setJobDialogMode] = useState("create");
  const [savingJob, setSavingJob] = useState(false);

  const [deletingJobId, setDeletingJobId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const emptyForm = {
    id: "",
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    posted: "",
    description: "",
    skills: "",
    requirements: 1,
    logo: "🏢",
  };
  const [jobForm, setJobForm] = useState(emptyForm);

  // -------------------- Axios Config --------------------
  const token = useMemo(() => {
    try {
      return localStorage.getItem("accessToken") || "";
    } catch {
      return "";
    }
  }, []);

  const api = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:8000/api/",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }, [token]);

  // -------------------- API Calls --------------------
  const loadJobs = async () => {
    setError(null);
    try {
      const res = await api.get("jobs/admin/");
      setJobs(res.data);
      setStats((prev) => ({ ...prev, totalJobs: res.data.length }));
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.response?.data?.error || "Failed to load jobs");
    }
  };

  useEffect(() => {
    loadJobs();
  }, [token]);

  const fetchApplications = async (jobId) => {
    try {
      setSelectedJobId(jobId);
      const res = await api.get(`jobs/${jobId}/applications/`);
      const data = res.data;
      setApplications(data);

      const pending = data.filter((app) => app.status === "pending").length;
      const selected = data.filter((app) => app.status === "selected").length;
      setStats((prev) => ({
        ...prev,
        totalApplications: data.length,
        pendingApplications: pending,
        selectedApplications: selected,
      }));
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications");
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      const res = await api.post(`applications/${appId}/update_status/`, {
        status,
      });
      toast.success(res.data.message || "Status updated");
      if (selectedJobId) fetchApplications(selectedJobId);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status");
    }
  };

  const saveJob = async () => {
    setSavingJob(true);
    try {
      const payload = {
        title: jobForm.title.trim(),
        company: jobForm.company.trim(),
        location: jobForm.location.trim(),
        type: jobForm.type.trim(),
        salary: jobForm.salary.trim(),
        posted: jobForm.posted?.trim() || new Date().toISOString(),
        description: jobForm.description.trim(),
        skills: jobForm.skills
          ? jobForm.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
          : [],
        requirements: Number(jobForm.requirements || 1),
        logo: jobForm.logo || "🏢",
      };

      const endpoint = jobDialogMode === "create"
        ? "jobs/admin/"
        : `jobs/admin/${jobForm.id}/`;

      const method = jobDialogMode === "create" ? "post" : "patch";

      await api[method](endpoint, payload);
      toast.success(`Job ${jobDialogMode === "create" ? "created" : "updated"}`);
      setIsJobDialogOpen(false);
      setJobForm(emptyForm);
      loadJobs();
    } catch (err) {
      console.error("Error saving job:", err);
      setError(err.response?.data?.error || "Failed to save job");
    } finally {
      setSavingJob(false);
    }
  };

  const deleteJob = async () => {
    if (!deletingJobId) return;
    setDeleting(true);
    try {
      await api.delete(`jobs/admin/${deletingJobId}/`);
      setJobs((prev) => prev.filter((j) => (j.id || j._id) !== deletingJobId));
      if (selectedJobId === deletingJobId) {
        setSelectedJobId(null);
        setApplications([]);
      }
      setStats((prev) => ({
        ...prev,
        totalJobs: Math.max(0, prev.totalJobs - 1),
      }));
      toast.success("Job deleted");
    } catch (err) {
      console.error("Error deleting job:", err);
      setError(err.response?.data?.error || "Failed to delete job");
    } finally {
      setDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeletingJobId(null);
    }
  };

  // -------------------- Helpers --------------------
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "selected":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const openCreateDialog = () => {
    setJobDialogMode("create");
    setJobForm(emptyForm);
    setIsJobDialogOpen(true);
  };

  const openEditDialog = (job) => {
    setJobDialogMode("edit");
    setJobForm({
      id: job.id || job._id || "",
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      type: job.type || "Full-time",
      salary: job.salary || "",
      posted: job.posted || "",
      description: job.description || "",
      skills: Array.isArray(job.skills)
        ? job.skills.join(", ")
        : job.skills || "",
      requirements: Number(job.requirements ?? 1),
      logo: job.logo || "🏢",
    });
    setIsJobDialogOpen(true);
  };

  const handleFormChange = (field, value) => {
    setJobForm((f) => ({
      ...f,
      [field]:
        field === "requirements" ? Math.max(1, Number(value || 1)) : value,
    }));
  };

  const confirmDelete = (jobId) => {
    setDeletingJobId(jobId);
    setIsDeleteDialogOpen(true);
  };

  console.log(applications);

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Manage job applications and candidates
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                className="bg-destructive text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                onClick={openCreateDialog}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Job
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Jobs</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.totalJobs}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Total Applications
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.totalApplications}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.pendingApplications}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Selected</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.selectedApplications}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Section */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-slate-900 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
              Job Positions
            </CardTitle>
            <p className="text-slate-600">Click a job to view applications</p>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No jobs found</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => {
                  const jobId = job.id || job._id;
                  return (
                    <Card
                      key={jobId}
                      className={`transition-all duration-300 hover:shadow-lg border-2 ${selectedJobId === jobId
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                        }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-slate-600 flex items-center mb-1">
                              <Building className="w-4 h-4 mr-1" />
                              {job.company}
                            </p>
                            <Badge variant="outline" className="text-slate-600">
                              {job.location}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(job)}
                              title="Edit job"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => confirmDelete(jobId)}
                              title="Delete job"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            {job.requirements || 0} requirements
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => fetchApplications(jobId)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Applications
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Applications Section */}
        {selectedJobId && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-slate-900 flex items-center">
                <Users className="w-6 h-6 mr-3 text-green-600" />
                Applications
              </CardTitle>
              <p className="text-slate-600">
                Manage candidate applications for the selected position
              </p>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">No applications yet</p>
                  <p className="text-slate-400">
                    Applications will appear here once candidates apply
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Candidate
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {applications.map((app) => (
                          <tr
                            key={app.application_id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-6 py-4">

                              <Dialog>
                                <DialogTrigger>
                                  <div className="flex items-center cursor-pointer">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                      {app.user.fullname?.charAt(0)?.toUpperCase?.() ||
                                        "U"}
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-slate-900">
                                        {app.user.fullname}
                                      </p>
                                      <p className="text-xs text-slate-500">
                                        Applied{" "}
                                        {app.applied_at
                                          ? new Date(
                                            app.applied_at
                                          ).toLocaleDateString()
                                          : "-"}
                                      </p>
                                    </div>
                                  </div>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Applicant Details</DialogTitle>
                                  </DialogHeader>
                                  <Profile storedUser={app.user} />
                                </DialogContent>
                              </Dialog>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {app.user.email}
                            </td>
                            <td className="px-6 py-4">
                              <Badge
                                className={`${getStatusColor(
                                  app.status
                                )} border`}
                              >
                                {app.status === "pending" && (
                                  <Clock className="w-3 h-3 mr-1" />
                                )}
                                {app.status === "selected" && (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                )}
                                {app.status === "rejected" && (
                                  <XCircle className="w-3 h-3 mr-1" />
                                )}
                                {app.status?.charAt(0)?.toUpperCase() +
                                  app.status?.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              {app.status === "pending" ? (
                                <div className="flex items-center space-x-2">
                                  <Button
                                    onClick={() =>
                                      updateStatus(
                                        app.application_id,
                                        "selected"
                                      )
                                    }
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Select
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      updateStatus(
                                        app.application_id,
                                        "rejected"
                                      )
                                    }
                                    size="sm"
                                    variant="destructive"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <span className="text-slate-400 text-sm">
                                    No actions available
                                  </span>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create/Edit Job Dialog */}
      <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {jobDialogMode === "create" ? "Add New Job" : "Edit Job"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={jobForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={jobForm.company}
                onChange={(e) => handleFormChange("company", e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={jobForm.location}
                onChange={(e) => handleFormChange("location", e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Type</Label>
              <Select
                value={jobForm.type}
                onValueChange={(v) => handleFormChange("type", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                value={jobForm.salary}
                onChange={(e) => handleFormChange("salary", e.target.value)}
                placeholder="e.g., ₹10–15 LPA"
                required
              />
            </div>

            <div>
              <Label>Requirements (number of candidates)</Label>
              <Input
                type="number"
                min={1}
                value={jobForm.requirements}
                onChange={(e) => handleFormChange("requirements", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={jobForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                rows={4}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label>Skills (comma-separated)</Label>
              <Input
                value={jobForm.skills}
                onChange={(e) => handleFormChange("skills", e.target.value)}
                placeholder="React, Django, MongoDB"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Logo (emoji or URL)</Label>
              <Input
                value={jobForm.logo}
                onChange={(e) => handleFormChange("logo", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={saveJob} disabled={savingJob}>
              {savingJob
                ? jobDialogMode === "create"
                  ? "Creating..."
                  : "Saving..."
                : jobDialogMode === "create"
                  ? "Create Job"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
          </DialogHeader>
          <p className="text-slate-600">
            Are you sure you want to delete this job? This action cannot be
            undone.
          </p>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={deleteJob}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}