import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Search, MapPin, Clock, DollarSign, Users, Building, Bookmark, ExternalLink } from "lucide-react"

export function JobOpportunities() {
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      posted: "2 days ago",
      description: "Join our engineering team to build scalable web applications using React, Node.js, and AWS.",
      skills: ["React", "Node.js", "AWS", "TypeScript"],
      applicants: 45,
      logo: "🏢",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLab",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100k - $150k",
      posted: "1 day ago",
      description:
        "Lead product strategy and work with cross-functional teams to deliver exceptional user experiences.",
      skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
      applicants: 32,
      logo: "🚀",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataFlow",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $160k",
      posted: "3 days ago",
      description: "Analyze large datasets and build machine learning models to drive business insights.",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      applicants: 28,
      logo: "📊",
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "DesignStudio",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$80k - $120k",
      posted: "1 week ago",
      description: "Create beautiful and responsive user interfaces using modern frontend technologies.",
      skills: ["React", "CSS", "JavaScript", "Figma"],
      applicants: 67,
      logo: "🎨",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $190k",
      posted: "4 days ago",
      description: "Manage cloud infrastructure and implement CI/CD pipelines for high-traffic applications.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      applicants: 23,
      logo: "☁️",
    },
    {
      id: 6,
      title: "UX Designer",
      company: "UserFirst",
      location: "Los Angeles, CA",
      type: "Contract",
      salary: "$70k - $100k",
      posted: "5 days ago",
      description: "Design intuitive user experiences and conduct user research for mobile and web applications.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      applicants: 41,
      logo: "✨",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">InterviewAI</span>
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Job Opportunities</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <a href="/jobs/applications">My Applications</a>
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved Jobs
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
          <p className="text-gray-600">Discover and apply to positions at top companies</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search jobs, companies, or skills..." className="pl-10" />
                </div>
              </div>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="new-york">New York, NY</SelectItem>
                  <SelectItem value="austin">Austin, TX</SelectItem>
                  <SelectItem value="seattle">Seattle, WA</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Software Engineer</Badge>
              <Badge variant="secondary">Product Manager</Badge>
              <Badge variant="secondary">Data Scientist</Badge>
              <Badge variant="secondary">Frontend Developer</Badge>
              <Badge variant="outline">+ More Filters</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New This Week</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Applications Sent</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">75%</p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl">{job.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.applicants} applicants
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Posted {job.posted}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline">
                            <a href={`/jobs/${job.id}`}>View Details</a>
                          </Button>
                          <Button>
                            <a href={`/jobs/${job.id}/apply`}>Apply Now</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  )
}
