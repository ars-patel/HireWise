// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Bot, Search, MapPin, Clock, DollarSign, Users, Building, Bookmark, ExternalLink } from "lucide-react"

// export function JobOpportunities() {
//   const [jobs, setJobs] = useState([])
//   const [filteredJobs, setFilteredJobs] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [jobType, setJobType] = useState("")
//   const [location, setLocation] = useState("")
//   const [salaryRange, setSalaryRange] = useState("")
//   const [skillFilter, setSkillFilter] = useState("")
//   const [companyFilter, setCompanyFilter] = useState("")

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/jobs/")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data)
//         setFilteredJobs(data)
//       })
//       .catch((err) => console.error("Error fetching jobs:", err))
//   }, [])

//   const handleSearch = () => {
//     let results = jobs

//     if (searchTerm) {
//       results = results.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.skills?.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
//       )
//     }

//     if (jobType) {
//       results = results.filter((job) => job.type?.toLowerCase() === jobType.toLowerCase())
//     }

//     if (location) {
//       results = results.filter((job) => job.location?.toLowerCase() === location.toLowerCase())
//     }

//     if (salaryRange) {
//       const [min, max] = salaryRange.split("-").map(Number)
//       results = results.filter((job) => {
//         const salary = Number(job.salary)
//         if (!isNaN(min) && !isNaN(max)) return salary >= min && salary <= max
//         if (!isNaN(min) && isNaN(max)) return salary >= min
//         return true
//       })
//     }

//     if (skillFilter) {
//       results = results.filter((job) =>
//         job.skills?.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))
//       )
//     }

//     if (companyFilter) {
//       results = results.filter((job) => job.company?.toLowerCase().includes(companyFilter.toLowerCase()))
//     }

//     setFilteredJobs(results)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <a href="/dashboard" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">InterviewAI</span>
//             </a>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-600">Job Opportunities</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm">
//               <a href="/jobs/applications">My Applications</a>
//             </Button>
//             <Button variant="ghost" size="sm">
//               <Bookmark className="w-4 h-4 mr-2" />
//               Saved Jobs
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
//           <p className="text-gray-600">Discover and apply to positions at top companies</p>
//         </div>

//         {/* Search and Filters */}
//         <Card className="mb-8">
//           <CardContent className="p-6 space-y-4">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="relative flex">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search by title, company, location, skills..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <Select onValueChange={(val) => setJobType(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Job Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="full-time">Full-time</SelectItem>
//                   <SelectItem value="part-time">Part-time</SelectItem>
//                   <SelectItem value="contract">Contract</SelectItem>
//                   <SelectItem value="internship">Internship</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(val) => setLocation(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Location" />
//                 </SelectTrigger>
//                 <SelectContent>

//                   <SelectItem value="remote">Remote</SelectItem>
//                   <SelectItem value="san francisco, ca">San Francisco, CA</SelectItem>
//                   <SelectItem value="new york, ny">New York, NY</SelectItem>
//                   <SelectItem value="austin, tx">Austin, TX</SelectItem>
//                   <SelectItem value="seattle, wa">Seattle, WA</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4">
//               <Select onValueChange={(val) => setSalaryRange(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Salary Range" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0-50000">0 - 50,000</SelectItem>
//                   <SelectItem value="50000-100000">50,000 - 100,000</SelectItem>
//                   <SelectItem value="100000-">100,000+</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Input
//                 placeholder="Filter by skill..."
//                 value={skillFilter}
//                 onChange={(e) => setSkillFilter(e.target.value)}
//               />

//               <Input
//                 placeholder="Filter by company..."
//                 value={companyFilter}
//                 onChange={(e) => setCompanyFilter(e.target.value)}
//               />
//             </div>

//             <Button onClick={handleSearch} className="w-full">
//               Search
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Stats */}
//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Jobs</p>
//                   <p className="text-2xl font-bold text-gray-900">{filteredJobs.length}</p>
//                 </div>
//                 <Building className="w-8 h-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">New This Week</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <Clock className="w-8 h-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Applications Sent</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <Users className="w-8 h-8 text-purple-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Response Rate</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <DollarSign className="w-8 h-8 text-orange-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Job Listings */}
//         <div className="space-y-6">
//           {filteredJobs.map((job) => (
//             <Card key={job.id || job._id} className="hover:shadow-lg transition-shadow">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start space-x-4 flex-1">
//                     <div className="text-3xl">{job.logo || "🏢"}</div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
//                           <p className="text-gray-600 font-medium">{job.company}</p>
//                         </div>
//                         <div className="flex space-x-2">
//                           <Button variant="ghost" size="sm">
//                             <Bookmark className="w-4 h-4" />
//                           </Button>
//                           <Button variant="ghost" size="sm">
//                             <ExternalLink className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {job.location}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {job.type}
//                         </div>
//                         <div className="flex items-center">
//                           <DollarSign className="w-4 h-4 mr-1" />
//                           {job.salary}
//                         </div>
//                         <div className="flex items-center">
//                           <Users className="w-4 h-4 mr-1" />
//                           {job.requirements} requirements
//                         </div>
//                       </div>

//                       <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {job.skills &&
//                           job.skills.map((skill, index) => (
//                             <Badge key={index} variant="secondary">
//                               {skill}
//                             </Badge>
//                           ))}
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">Posted {job.posted}</span>
//                         <div className="flex space-x-2">
//                           <Button variant="outline">
//                             <a href={`/jobs/${job.id || job._id}`}>View Details</a>
//                           </Button>
//                           <Button>
//                             <a href={`/jobs/${job.id || job._id}/apply`}>Apply Now</a>
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Load More */}
//         <div className="text-center mt-8">
//           <Button variant="outline" size="lg">
//             Load More Jobs
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Bot,
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Users,
//   Building,
//   Bookmark,
//   ExternalLink,
// } from "lucide-react";

// export function JobOpportunities() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [location, setLocation] = useState("");
//   const [salaryRange, setSalaryRange] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [appliedJobs, setAppliedJobs] = useState([]); // Track applied jobs

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/jobs/")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data);
//       })
//       .catch((err) => console.error("Error fetching jobs:", err));
//   }, []);

//   const handleSearch = () => {
//     let results = jobs;

//     if (searchTerm) {
//       results = results.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.skills?.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//     }

//     if (jobType) {
//       results = results.filter(
//         (job) => job.type?.toLowerCase() === jobType.toLowerCase()
//       );
//     }

//     if (location) {
//       results = results.filter(
//         (job) => job.location?.toLowerCase() === location.toLowerCase()
//       );
//     }

//     if (salaryRange) {
//       const [min, max] = salaryRange.split("-").map(Number);
//       results = results.filter((job) => {
//         const salary = Number(job.salary);
//         if (!isNaN(min) && !isNaN(max)) return salary >= min && salary <= max;
//         if (!isNaN(min) && isNaN(max)) return salary >= min;
//         return true;
//       });
//     }

//     if (skillFilter) {
//       results = results.filter((job) =>
//         job.skills?.some((skill) =>
//           skill.toLowerCase().includes(skillFilter.toLowerCase())
//         )
//       );
//     }

//     if (companyFilter) {
//       results = results.filter((job) =>
//         job.company?.toLowerCase().includes(companyFilter.toLowerCase())
//       );
//     }

//     setFilteredJobs(results);
//   };

//   const handleApply = async (jobId) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/jobs/${jobId}/apply/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // Include auth headers if required
//             // "Authorization": "Bearer YOUR_TOKEN"
//           },
//           body: JSON.stringify({
//             user_id: 1, // Replace with actual user ID or remove if handled by backend session
//           }),
//         }
//       );

//       if (response.ok) {
//         alert("Application submitted successfully!");
//         setAppliedJobs((prev) => [...prev, jobId]);
//       } else {
//         alert("Failed to apply. Try again.");
//       }
//     } catch (error) {
//       console.error("Application error:", error);
//       alert("An error occurred while applying.");
//     }
//   };
//   console.log(filteredJobs);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <a href="/dashboard" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">
//                 InterviewAI
//               </span>
//             </a>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-600">Job Opportunities</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm">
//               <a href="/jobs/applications">My Applications</a>
//             </Button>
//             <Button variant="ghost" size="sm">
//               <Bookmark className="w-4 h-4 mr-2" />
//               Saved Jobs
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Job Opportunities
//           </h1>
//           <p className="text-gray-600">
//             Discover and apply to positions at top companies
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <Card className="mb-8">
//           <CardContent className="p-6 space-y-4">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="relative flex">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search by title, company, location, skills..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <Select onValueChange={(val) => setJobType(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Job Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="full-time">Full-time</SelectItem>
//                   <SelectItem value="part-time">Part-time</SelectItem>
//                   <SelectItem value="contract">Contract</SelectItem>
//                   <SelectItem value="internship">Internship</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(val) => setLocation(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="remote">Remote</SelectItem>
//                   <SelectItem value="san francisco, ca">
//                     San Francisco, CA
//                   </SelectItem>
//                   <SelectItem value="new york, ny">New York, NY</SelectItem>
//                   <SelectItem value="austin, tx">Austin, TX</SelectItem>
//                   <SelectItem value="seattle, wa">Seattle, WA</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4">
//               <Select onValueChange={(val) => setSalaryRange(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Salary Range" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0-50000">0 - 50,000</SelectItem>
//                   <SelectItem value="50000-100000">50,000 - 100,000</SelectItem>
//                   <SelectItem value="100000-">100,000+</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Input
//                 placeholder="Filter by skill..."
//                 value={skillFilter}
//                 onChange={(e) => setSkillFilter(e.target.value)}
//               />

//               <Input
//                 placeholder="Filter by company..."
//                 value={companyFilter}
//                 onChange={(e) => setCompanyFilter(e.target.value)}
//               />
//             </div>

//             <Button onClick={handleSearch} className="w-full">
//               Search
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Stats */}
//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Jobs</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {filteredJobs.length}
//                   </p>
//                 </div>
//                 <Building className="w-8 h-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">New This Week</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <Clock className="w-8 h-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Applications Sent</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {appliedJobs.length}
//                   </p>
//                 </div>
//                 <Users className="w-8 h-8 text-purple-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Response Rate</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <DollarSign className="w-8 h-8 text-orange-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Job Listings */}
//         <div className="space-y-6">
//           {filteredJobs.map((job) => (
//             <Card
//               key={job.id || job._id}
//               className="hover:shadow-lg transition-shadow"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start space-x-4 flex-1">
//                     <div className="text-3xl">{job.logo || "🏢"}</div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                             {job.title}
//                           </h3>
//                           <p className="text-gray-600 font-medium">
//                             {job.company}
//                           </p>
//                         </div>
//                         <div className="flex space-x-2">
//                           <Button variant="ghost" size="sm">
//                             <Bookmark className="w-4 h-4" />
//                           </Button>
//                           <Button variant="ghost" size="sm">
//                             <ExternalLink className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {job.location}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {job.type}
//                         </div>
//                         <div className="flex items-center">
//                           <DollarSign className="w-4 h-4 mr-1" />
//                           {job.salary}
//                         </div>
//                         <div className="flex items-center">
//                           <Users className="w-4 h-4 mr-1" />
//                           {job.requirements} requirements
//                         </div>
//                       </div>

//                       <p className="text-gray-700 mb-4 leading-relaxed">
//                         {job.description}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {job.skills &&
//                           job.skills.map((skill, index) => (
//                             <Badge key={index} variant="secondary">
//                               {skill}
//                             </Badge>
//                           ))}
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           Posted {job.posted}
//                         </span>
//                         <div className="flex space-x-2">
//                           <Button variant="outline">
//                             <a href={`/jobs/${job.id || job._id}`}>
//                               View Details
//                             </a>
//                           </Button>
//                           <Button
//                             onClick={() => {
//                               const jobId = job.id || job._id;
//                               if (!jobId) {
//                                 console.error(
//                                   "Missing job ID for application."
//                                 );
//                                 alert("Unable to apply: Job ID is missing.");
//                                 return;
//                               }
//                               handleApply(jobId);
//                             }}
//                             disabled={appliedJobs.includes(job.id || job._id)}
//                           >
//                             {appliedJobs.includes(job.id || job._id)
//                               ? "Applied"
//                               : "Apply Now"}
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Load More */}
//         <div className="text-center mt-8">
//           <Button variant="outline" size="lg">
//             Load More Jobs
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Bot,
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Users,
//   Building,
//   Bookmark,
//   ExternalLink,
// } from "lucide-react";

// export function JobOpportunities() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [location, setLocation] = useState("");
//   const [salaryRange, setSalaryRange] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const userId = localStorage.getItem("userId"); // yeh MongoDB ObjectId hoga
// console.log('u s :',userId);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/jobs/")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data);
//       })
//       .catch((err) => console.error("Error fetching jobs:", err));
//   }, []);

//   const handleSearch = () => {
//     let results = jobs;

//     if (searchTerm) {
//       results = results.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.skills?.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//     }

//     if (jobType) {
//       results = results.filter(
//         (job) => job.type?.toLowerCase() === jobType.toLowerCase()
//       );
//     }

//     if (location) {
//       results = results.filter(
//         (job) => job.location?.toLowerCase() === location.toLowerCase()
//       );
//     }

//     if (salaryRange) {
//       const [min, max] = salaryRange.split("-").map(Number);
//       results = results.filter((job) => {
//         const salary = Number(job.salary);
//         if (!isNaN(min) && !isNaN(max)) return salary >= min && salary <= max;
//         if (!isNaN(min) && isNaN(max)) return salary >= min;
//         return true;
//       });
//     }

//     if (skillFilter) {
//       results = results.filter((job) =>
//         job.skills?.some((skill) =>
//           skill.toLowerCase().includes(skillFilter.toLowerCase())
//         )
//       );
//     }

//     if (companyFilter) {
//       results = results.filter((job) =>
//         job.company?.toLowerCase().includes(companyFilter.toLowerCase())
//       );
//     }

//     setFilteredJobs(results);
//   };

// const handleApply = async (jobId) => {
//   try {
//     const response = await fetch(
//       `http://127.0.0.1:8000/api/jobs/${jobId}/apply/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: userId, // yahan ab ObjectId jayega, '1' nahi
//         }),
//       }
//     );

//       if (response.ok) {
//         alert("Application submitted successfully!");
//         setAppliedJobs((prev) => [...prev, jobId]);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error || "Failed to apply. Try again.");
//       }
//     } catch (error) {
//       console.error("Application error:", error);
//       alert("An error occurred while applying.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <a href="/dashboard" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">
//                 InterviewAI
//               </span>
//             </a>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-600">Job Opportunities</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm">
//               <a href="/jobs/applications">My Applications</a>
//             </Button>
//             <Button variant="ghost" size="sm">
//               <Bookmark className="w-4 h-4 mr-2" />
//               Saved Jobs
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Job Opportunities
//           </h1>
//           <p className="text-gray-600">
//             Discover and apply to positions at top companies
//           </p>
//         </div>

//         <Card className="mb-8">
//           <CardContent className="p-6 space-y-4">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="relative flex">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search by title, company, location, skills..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <Select onValueChange={(val) => setJobType(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Job Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="full-time">Full-time</SelectItem>
//                   <SelectItem value="part-time">Part-time</SelectItem>
//                   <SelectItem value="contract">Contract</SelectItem>
//                   <SelectItem value="internship">Internship</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(val) => setLocation(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="remote">Remote</SelectItem>
//                   <SelectItem value="san francisco, ca">
//                     San Francisco, CA
//                   </SelectItem>
//                   <SelectItem value="new york, ny">New York, NY</SelectItem>
//                   <SelectItem value="austin, tx">Austin, TX</SelectItem>
//                   <SelectItem value="seattle, wa">Seattle, WA</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4">
//               <Select onValueChange={(val) => setSalaryRange(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Salary Range" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0-50000">0 - 50,000</SelectItem>
//                   <SelectItem value="50000-100000">50,000 - 100,000</SelectItem>
//                   <SelectItem value="100000-">100,000+</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Input
//                 placeholder="Filter by skill..."
//                 value={skillFilter}
//                 onChange={(e) => setSkillFilter(e.target.value)}
//               />

//               <Input
//                 placeholder="Filter by company..."
//                 value={companyFilter}
//                 onChange={(e) => setCompanyFilter(e.target.value)}
//               />
//             </div>

//             <Button onClick={handleSearch} className="w-full">
//               Search
//             </Button>
//           </CardContent>
//         </Card>

//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Jobs</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {filteredJobs.length}
//                   </p>
//                 </div>
//                 <Building className="w-8 h-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">New This Week</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <Clock className="w-8 h-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Applications Sent</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {appliedJobs.length}
//                   </p>
//                 </div>
//                 <Users className="w-8 h-8 text-purple-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Response Rate</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <DollarSign className="w-8 h-8 text-orange-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           {filteredJobs.map((job) => (
//             <Card
//               key={job.id || job._id}
//               className="hover:shadow-lg transition-shadow"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start space-x-4 flex-1">
//                     <div className="text-3xl">{job.logo || "🏢"}</div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                             {job.title}
//                           </h3>
//                           <p className="text-gray-600 font-medium">
//                             {job.company}
//                           </p>
//                         </div>
//                         <div className="flex space-x-2">
//                           <Button variant="ghost" size="sm">
//                             <Bookmark className="w-4 h-4" />
//                           </Button>
//                           <Button variant="ghost" size="sm">
//                             <ExternalLink className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {job.location}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {job.type}
//                         </div>
//                         <div className="flex items-center">
//                           <DollarSign className="w-4 h-4 mr-1" />
//                           {job.salary}
//                         </div>
//                         <div className="flex items-center">
//                           <Users className="w-4 h-4 mr-1" />
//                           {job.requirements} requirements
//                         </div>
//                       </div>

//                       <p className="text-gray-700 mb-4 leading-relaxed">
//                         {job.description}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {job.skills &&
//                           job.skills.map((skill, index) => (
//                             <Badge key={index} variant="secondary">
//                               {skill}
//                             </Badge>
//                           ))}
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           Posted {job.posted}
//                         </span>
//                         <div className="flex space-x-2">
//                           <Button variant="outline">
//                             <a href={`/jobs/${job.id || job._id}`}>
//                               View Details
//                             </a>
//                           </Button>
//                           <Button
//                             onClick={() => {
//                               const jobId = job.id || job._id;
//                               if (!jobId) {
//                                 console.error(
//                                   "Missing job ID for application."
//                                 );
//                                 alert("Unable to apply: Job ID is missing.");
//                                 return;
//                               }
//                               handleApply(jobId);
//                             }}
//                             disabled={appliedJobs.includes(job.id || job._id)}
//                           >
//                             {appliedJobs.includes(job.id || job._id)
//                               ? "Applied"
//                               : "Apply Now"}
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-8">
//           <Button variant="outline" size="lg">
//             Load More Jobs
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Bot,
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Users,
//   Building,
//   Bookmark,
//   ExternalLink,
// } from "lucide-react";

// export function JobOpportunities() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [location, setLocation] = useState("");
//   const [salaryRange, setSalaryRange] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/jobs/")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data);
//       })
//       .catch((err) => console.error("Error fetching jobs:", err));
//   }, []);

//   const handleSearch = () => {
//     let results = jobs;

//     if (searchTerm) {
//       results = results.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.skills?.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//     }

//     if (jobType) {
//       results = results.filter(
//         (job) => job.type?.toLowerCase() === jobType.toLowerCase()
//       );
//     }

//     if (location) {
//       results = results.filter(
//         (job) => job.location?.toLowerCase() === location.toLowerCase()
//       );
//     }

//     if (salaryRange) {
//       const [min, max] = salaryRange.split("-").map(Number);
//       results = results.filter((job) => {
//         const salary = Number(job.salary);
//         if (!isNaN(min) && !isNaN(max)) return salary >= min && salary <= max;
//         if (!isNaN(min) && isNaN(max)) return salary >= min;
//         return true;
//       });
//     }

//     if (skillFilter) {
//       results = results.filter((job) =>
//         job.skills?.some((skill) =>
//           skill.toLowerCase().includes(skillFilter.toLowerCase())
//         )
//       );
//     }

//     if (companyFilter) {
//       results = results.filter((job) =>
//         job.company?.toLowerCase().includes(companyFilter.toLowerCase())
//       );
//     }

//     setFilteredJobs(results);
//   };

//   const handleApply = async (jobId) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/jobs/${jobId}/apply/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: userId,
//           }),
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         alert("Application submitted successfully!");
//         setAppliedJobs((prev) => [...prev, jobId]);
//       } else if (data.message === "Already applied to this job") {
//         setAppliedJobs((prev) => [...prev, jobId]);
//         alert("You have already applied for this job.");
//       } else {
//         alert(data.error || "Failed to apply. Try again.");
//       }
//     } catch (error) {
//       console.error("Application error:", error);
//       alert("An error occurred while applying.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <a href="/dashboard" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">
//                 InterviewAI
//               </span>
//             </a>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-600">Job Opportunities</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm">
//               <a href="/jobs/applications">My Applications</a>
//             </Button>
//             <Button variant="ghost" size="sm">
//               <Bookmark className="w-4 h-4 mr-2" />
//               Saved Jobs
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Job Opportunities
//           </h1>
//           <p className="text-gray-600">
//             Discover and apply to positions at top companies
//           </p>
//         </div>

//         <Card className="mb-8">
//           <CardContent className="p-6 space-y-4">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="relative flex">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search by title, company, location, skills..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <Select onValueChange={(val) => setJobType(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Job Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="full-time">Full-time</SelectItem>
//                   <SelectItem value="part-time">Part-time</SelectItem>
//                   <SelectItem value="contract">Contract</SelectItem>
//                   <SelectItem value="internship">Internship</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(val) => setLocation(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="remote">Remote</SelectItem>
//                   <SelectItem value="san francisco, ca">
//                     San Francisco, CA
//                   </SelectItem>
//                   <SelectItem value="new york, ny">New York, NY</SelectItem>
//                   <SelectItem value="austin, tx">Austin, TX</SelectItem>
//                   <SelectItem value="seattle, wa">Seattle, WA</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4">
//               <Select onValueChange={(val) => setSalaryRange(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Salary Range" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0-50000">0 - 50,000</SelectItem>
//                   <SelectItem value="50000-100000">50,000 - 100,000</SelectItem>
//                   <SelectItem value="100000-">100,000+</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Input
//                 placeholder="Filter by skill..."
//                 value={skillFilter}
//                 onChange={(e) => setSkillFilter(e.target.value)}
//               />

//               <Input
//                 placeholder="Filter by company..."
//                 value={companyFilter}
//                 onChange={(e) => setCompanyFilter(e.target.value)}
//               />
//             </div>

//             <Button onClick={handleSearch} className="w-full">
//               Search
//             </Button>
//           </CardContent>
//         </Card>

//         <div className="grid md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Jobs</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {filteredJobs.length}
//                   </p>
//                 </div>
//                 <Building className="w-8 h-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">New This Week</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <Clock className="w-8 h-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Applications Sent</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {appliedJobs.length}
//                   </p>
//                 </div>
//                 <Users className="w-8 h-8 text-purple-600" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Response Rate</p>
//                   <p className="text-2xl font-bold text-gray-900">--</p>
//                 </div>
//                 <DollarSign className="w-8 h-8 text-orange-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           {filteredJobs.map((job) => (
//             <Card
//               key={job.id || job._id}
//               className="hover:shadow-lg transition-shadow"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start space-x-4 flex-1">
//                     <div className="text-3xl">{job.logo || "🏢"}</div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                             {job.title}
//                           </h3>
//                           <p className="text-gray-600 font-medium">
//                             {job.company}
//                           </p>
//                         </div>
//                         <div className="flex space-x-2">
//                           <Button variant="ghost" size="sm">
//                             <Bookmark className="w-4 h-4" />
//                           </Button>
//                           <Button variant="ghost" size="sm">
//                             <ExternalLink className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {job.location}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {job.type}
//                         </div>
//                         <div className="flex items-center">
//                           <DollarSign className="w-4 h-4 mr-1" />
//                           {job.salary}
//                         </div>
//                         <div className="flex items-center">
//                           <Users className="w-4 h-4 mr-1" />
//                           {job.requirements} requirements
//                         </div>
//                       </div>

//                       <p className="text-gray-700 mb-4 leading-relaxed">
//                         {job.description}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {job.skills &&
//                           job.skills.map((skill, index) => (
//                             <Badge key={index} variant="secondary">
//                               {skill}
//                             </Badge>
//                           ))}
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-500">
//                           Posted {job.posted}
//                         </span>
//                         <div className="flex space-x-2">
//                           <Button variant="outline">
//                             <a href={`/jobs/${job.id || job._id}`}>
//                               View Details
//                             </a>
//                           </Button>
//                           {appliedJobs.includes(job.id || job._id) ? (
//                             <Button variant="secondary" disabled>
//                               Pending
//                             </Button>
//                           ) : (
//                             <Button
//                               onClick={() => {
//                                 const jobId = job.id || job._id;
//                                 if (!jobId) {
//                                   alert("Job ID missing.");
//                                   return;
//                                 }
//                                 handleApply(jobId);
//                               }}
//                             >
//                               Apply Now
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-8">
//           <Button variant="outline" size="lg">
//             Load More Jobs
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Bot,
//   Search,
//   MapPin,
//   Clock,
//   DollarSign,
//   Users,
//   Building,
//   Bookmark,
//   ExternalLink,
// } from "lucide-react";

// export function JobOpportunities() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [location, setLocation] = useState("");
//   const [salaryRange, setSalaryRange] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [userApplications, setUserApplications] = useState({});
//   const userId = localStorage.getItem("userId"); // MongoDB ObjectId

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/jobs/")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data);
//       })
//       .catch((err) => console.error("Error fetching jobs:", err));
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetch(`http://127.0.0.1:8000/api/users/${userId}/applications/`)
//         .then((res) => res.json())
//         .then((data) => {
//           const map = {};
//           data.forEach((app) => {
//             map[app.job_id] = app.status;
//           });
//           setUserApplications(map);
//         })
//         .catch((err) =>
//           console.error("Error fetching user applications:", err)
//         );
//     }
//   }, [userId]);

//   const handleSearch = () => {
//     let results = jobs;

//     if (searchTerm) {
//       results = results.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.skills?.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//     }

//     if (jobType) {
//       results = results.filter(
//         (job) => job.type?.toLowerCase() === jobType.toLowerCase()
//       );
//     }

//     if (location) {
//       results = results.filter(
//         (job) => job.location?.toLowerCase() === location.toLowerCase()
//       );
//     }

//     if (salaryRange) {
//       const [min, max] = salaryRange.split("-").map(Number);
//       results = results.filter((job) => {
//         const salary = Number(job.salary);
//         if (!isNaN(min) && !isNaN(max)) return salary >= min && salary <= max;
//         if (!isNaN(min) && isNaN(max)) return salary >= min;
//         return true;
//       });
//     }

//     if (skillFilter) {
//       results = results.filter((job) =>
//         job.skills?.some((skill) =>
//           skill.toLowerCase().includes(skillFilter.toLowerCase())
//         )
//       );
//     }

//     if (companyFilter) {
//       results = results.filter((job) =>
//         job.company?.toLowerCase().includes(companyFilter.toLowerCase())
//       );
//     }

//     setFilteredJobs(results);
//   };

//   const handleApply = async (jobId) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/jobs/${jobId}/apply/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: userId,
//           }),
//         }
//       );

//       if (response.ok) {
//         alert("Application submitted successfully!");
//         setUserApplications((prev) => ({
//           ...prev,
//           [jobId]: "pending",
//         }));
//       } else {
//         const errorData = await response.json();
//         alert(errorData.error || "Failed to apply. Try again.");
//       }
//     } catch (error) {
//       console.error("Application error:", error);
//       alert("An error occurred while applying.");
//     }
//   };

//   console.log('u',userApplications);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <a href="/dashboard" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">
//                 InterviewAI
//               </span>
//             </a>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-600">Job Opportunities</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm">
//               <a href="/jobs/applications">My Applications</a>
//             </Button>
//             <Button variant="ghost" size="sm">
//               <Bookmark className="w-4 h-4 mr-2" />
//               Saved Jobs
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Job Opportunities
//           </h1>
//           <p className="text-gray-600">
//             Discover and apply to positions at top companies
//           </p>
//         </div>

//         <Card className="mb-8">
//           <CardContent className="p-6 space-y-4">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="relative flex">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search by title, company, location, skills..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <Select onValueChange={(val) => setJobType(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Job Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="full-time">Full-time</SelectItem>
//                   <SelectItem value="part-time">Part-time</SelectItem>
//                   <SelectItem value="contract">Contract</SelectItem>
//                   <SelectItem value="internship">Internship</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(val) => setLocation(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="remote">Remote</SelectItem>
//                   <SelectItem value="san francisco, ca">
//                     San Francisco, CA
//                   </SelectItem>
//                   <SelectItem value="new york, ny">New York, NY</SelectItem>
//                   <SelectItem value="austin, tx">Austin, TX</SelectItem>
//                   <SelectItem value="seattle, wa">Seattle, WA</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4">
//               <Select onValueChange={(val) => setSalaryRange(val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Salary Range" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0-50000">0 - 50,000</SelectItem>
//                   <SelectItem value="50000-100000">50,000 - 100,000</SelectItem>
//                   <SelectItem value="100000-">100,000+</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Input
//                 placeholder="Filter by skill..."
//                 value={skillFilter}
//                 onChange={(e) => setSkillFilter(e.target.value)}
//               />

//               <Input
//                 placeholder="Filter by company..."
//                 value={companyFilter}
//                 onChange={(e) => setCompanyFilter(e.target.value)}
//               />
//             </div>

//             <Button onClick={handleSearch} className="w-full">
//               Search
//             </Button>
//           </CardContent>
//         </Card>

//         <div className="space-y-6">
//           {filteredJobs.map((job) => {
//             const jobId = job.id || job._id;
//             const status = userApplications[jobId];

//             return (
//               <Card key={jobId} className="hover:shadow-lg transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4 flex-1">
//                       <div className="text-3xl">{job.logo || "🏢"}</div>
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between mb-2">
//                           <div>
//                             <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                               {job.title}
//                             </h3>
//                             <p className="text-gray-600 font-medium">
//                               {job.company}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-1" />
//                             {job.location}
//                           </div>
//                           <div className="flex items-center">
//                             <Clock className="w-4 h-4 mr-1" />
//                             {job.type}
//                           </div>
//                           <div className="flex items-center">
//                             <DollarSign className="w-4 h-4 mr-1" />
//                             {job.salary}
//                           </div>
//                           <div className="flex items-center">
//                             <Users className="w-4 h-4 mr-1" />
//                             {job.requirements} requirements
//                           </div>
//                         </div>

//                         <p className="text-gray-700 mb-4 leading-relaxed">
//                           {job.description}
//                         </p>

//                         <div className="flex flex-wrap gap-2 mb-4">
//                           {job.skills &&
//                             job.skills.map((skill, index) => (
//                               <Badge key={index} variant="secondary">
//                                 {skill}
//                               </Badge>
//                             ))}
//                         </div>

//                         <div className="flex space-x-2">
//                           {status === "pending" ? (
//                             <Button disabled>Pending</Button>
//                           ) : status === "selected" ? (
//                             <Button disabled>selected</Button>
//                           ) : status === "rejected" ? (
//                             <Button disabled>rejected</Button>
//                           ) : (
//                             <Button onClick={() => handleApply(jobId)}>
//                               Apply Now
//                             </Button>
//                           )}
//                           {/* Action button based on application status */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

import Navbar from './subpages/navbar';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'react-hot-toast';
import {

  Bot,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building,
  ExternalLink,
  Filter,
  Star,
  Heart,
} from "lucide-react";

export function JobOpportunities() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [userApplications, setUserApplications] = useState({});

  const token = localStorage.getItem("accessToken");   // ✅ token from login
  const userId = JSON.parse(localStorage.getItem("user")).user_id; // ✅ correct userId from login

  // Fetch all jobs (public)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // Fetch user applications (protected)
  useEffect(() => {
    if (userId && token) {
      fetch(`http://127.0.0.1:8000/api/users/${userId}/applications/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const map = {};
          data.forEach((app) => {
            map[app.job_id] = app.status;
          });
          setUserApplications(map);
        })
        .catch((err) =>
          console.error("Error fetching user applications:", err)
        );
    }
  }, [userId, token]);

  const handleSearch = () => {
    let results = jobs;

    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills?.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (jobType) {
      results = results.filter(
        (job) => job.type?.toLowerCase() === jobType.toLowerCase()
      );
    }

    if (location) {
      results = results.filter(
        (job) => job.location?.toLowerCase() === location.toLowerCase()
      );
    }

    if (salaryRange) {
      const [min, max] = salaryRange.split("-").map(Number);
      results = results.filter((job) => {
        const salary = Number(job.salary);
        if (!isNaN(min) && !isNaN(max)) return salary >= min && salary <= max;
        if (!isNaN(min) && isNaN(max)) return salary >= min;
        return true;
      });
    }

    if (skillFilter) {
      results = results.filter((job) =>
        job.skills?.some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    if (companyFilter) {
      results = results.filter((job) =>
        job.company?.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    setFilteredJobs(results);
  };

  const handleApply = async (jobId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/jobs/${jobId}/apply/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ✅ must include token
          },
          body: JSON.stringify({
            user_id: userId, // backend ignores this, uses JWT user
          }),
        }
      );

      if (response.ok) {
        toast.success("Application submitted successfully!");
        setUserApplications((prev) => ({
          ...prev,
          [jobId]: "pending",
        }));
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to apply. Try again.");
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error("An error occurred while applying.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />



      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Discover Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}
              Dream Job
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect with top companies and find opportunities that match your
            skills and aspirations
          </p>
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-slate-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              {filteredJobs.length} opportunities
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 text-blue-500 mr-1" />
              500+ companies
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-blue-600"
            >
              <a
                href="/jobs/applications"
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>My Applications</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Enhanced Search Card */}
        <Card className="mb-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Find Your Perfect Match
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by title, company, location, skills..."
                  className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select onValueChange={(val) => setJobType(val)}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(val) => setLocation(val)}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco, ca">
                    San Francisco, CA
                  </SelectItem>
                  <SelectItem value="new york, ny">New York, NY</SelectItem>
                  <SelectItem value="austin, tx">Austin, TX</SelectItem>
                  <SelectItem value="seattle, wa">Seattle, WA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Select onValueChange={(val) => setSalaryRange(val)}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="Salary Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50000">$0 - $50,000</SelectItem>
                  <SelectItem value="50000-100000">
                    $50,000 - $100,000
                  </SelectItem>
                  <SelectItem value="100000-">$100,000+</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Filter by skill..."
                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              />

              <Input
                placeholder="Filter by company..."
                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSearch}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Jobs
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => {
            const jobId = job.id || job._id;
            const status = userApplications[jobId];

            return (
              <Card
                key={jobId}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        {job.logo || "🏢"}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-lg text-slate-600 font-medium flex items-center">
                              <Building className="w-4 h-4 mr-2" />
                              {job.company}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Heart className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-slate-500 mb-4">
                          <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            <DollarSign className="w-4 h-4 mr-1" />${job.salary}
                          </div>
                          <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            <Users className="w-4 h-4 mr-1" />
                            {job.requirements} requirements
                          </div>
                        </div>

                        <p className="text-slate-700 mb-6 leading-relaxed line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.skills &&
                            job.skills.slice(0, 6).map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1"
                              >
                                {skill}
                              </Badge>
                            ))}
                          {job.skills && job.skills.length > 6 && (
                            <Badge variant="outline" className="text-slate-500">
                              +{job.skills.length - 6} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {status === "pending" ? (
                            <Button
                              disabled
                              className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Pending Review
                            </Button>
                          ) : status === "selected" ? (
                            <Button
                              disabled
                              className="bg-green-100 text-green-700 hover:bg-green-100"
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Selected
                            </Button>
                          ) : status === "rejected" ? (
                            <Button
                              disabled
                              className="bg-red-100 text-red-700 hover:bg-red-100"
                            >
                              Rejected
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleApply(jobId)}
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6"
                            >
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No jobs found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search criteria to find more opportunities
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
