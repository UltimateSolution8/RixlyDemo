import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, BarChart3, Settings, LogOut, Menu, TrendingUp, 
  Search, MessageSquare, Shield, Bell, Plus, MoreVertical,
  FolderKanban, Play, RefreshCw, ChevronDown, ChevronUp, StopCircle,
  Loader2
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const mockStats = [
  { label: "Projects Being Scraped", value: "12", icon: FolderKanban, description: "Active scraping schedules", clickable: true },
  { label: "Total Users", value: "1,234", icon: Users, description: "" },
  { label: "Jobs Running Now", value: "3", icon: Play, description: "" },
];

const mockTodaysLeads = [
  { projectName: "TechSaaS Growth", organic: 45, scraped: 23, total: 68 },
  { projectName: "CloudScale Marketing", organic: 32, scraped: 18, total: 50 },
  { projectName: "DataFlow Pro", organic: 28, scraped: 12, total: 40 },
];

const mockNextScheduledJob = {
  projectName: "Marketing Campaign",
  nextRunAt: new Date(Date.now() + 1800000).toISOString(),
  jobType: "find_posts"
};

const mockActiveJobs = [
  { id: 1, projectName: "TechSaaS Monitoring", jobType: "find_posts", startedAt: new Date(Date.now() - 120000).toISOString() },
  { id: 2, projectName: "CloudScale Project", jobType: "find_leads", startedAt: new Date(Date.now() - 60000).toISOString() },
];

const mockRecentJobs = [
  { id: 1, name: "TechSaaS Monitoring", status: "completed", postsFound: 234, leadsFound: 45, time: "2 min ago" },
  { id: 2, name: "CloudScale Project", status: "completed", postsFound: 89, leadsFound: 12, time: "5 min ago" },
  { id: 3, name: "Marketing Leads", status: "failed", postsFound: 0, leadsFound: 0, time: "10 min ago" },
];

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", projects: 5 },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "User", status: "active", projects: 2 },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "inactive", projects: 0 },
  { id: 4, name: "Emily Brown", email: "emily@example.com", role: "Editor", status: "active", projects: 3 },
];

const mockJobs = [
  { id: 1, name: "TechSaaS Monitoring", status: "completed", postsFound: 234, leadsFound: 45, time: "2 min ago" },
  { id: 2, name: "CloudScale Project", status: "running", postsFound: 89, leadsFound: 12, time: "Running..." },
  { id: 3, name: "Marketing Leads", status: "completed", postsFound: 567, leadsFound: 89, time: "5 min ago" },
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadsExpanded, setIsLeadsExpanded] = useState(true);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
  const [selectedJobToStop, setSelectedJobToStop] = useState(null);

  const handleLogout = () => {
    navigate("/");
  };

  const formatStartTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return `Today ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
    }
    return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const handleStopJob = () => {
    setIsStopDialogOpen(false);
    setSelectedJobToStop(null);
    alert("Job stopped successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">Rixly Admin</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "overview" 
                    ? "text-teal-600 dark:text-teal-400" 
                    : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "users" 
                    ? "text-teal-600 dark:text-teal-400" 
                    : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "jobs" 
                    ? "text-teal-600 dark:text-teal-400" 
                    : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
                }`}
              >
                Jobs
              </button>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
              </Button>
              <div className="hidden md:flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-medium">
                  AD
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <button onClick={() => { setActiveTab("overview"); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2">Overview</button>
            <button onClick={() => { setActiveTab("users"); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2">Users</button>
            <button onClick={() => { setActiveTab("jobs"); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2">Jobs</button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Monitor projects, jobs, and lead generation
                </p>
              </div>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div 
                onClick={() => navigate("/admin/projects")}
                className={mockStats[0].clickable ? "cursor-pointer" : ""}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FolderKanban className="w-4 h-4 text-teal-600" />
                    <span className="text-sm text-slate-500">{mockStats[0].label}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{mockStats[0].value}</div>
                  <div className="text-xs text-slate-500 mt-1">{mockStats[0].description}</div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span className="text-sm text-slate-500">{mockStats[1].label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{mockStats[1].value}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-4 h-4 text-teal-600" />
                  <span className="text-sm text-slate-500">{mockStats[2].label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{mockStats[2].value}</div>
              </motion.div>
            </div>

            {/* Today's Leads Section */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Leads by Project</CardTitle>
                    <CardDescription>
                      Breakdown of leads generated today by type and source
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsLeadsExpanded(!isLeadsExpanded)}>
                    {isLeadsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {isLeadsExpanded && (
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Project</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Organic</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Scraped</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTodaysLeads.map((lead, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-700/50">
                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{lead.projectName}</td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{lead.organic}</td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{lead.scraped}</td>
                            <td className="py-3 px-4 font-semibold text-teal-600 dark:text-teal-400">{lead.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Job Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Next Scheduled Job */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Next Scheduled Job</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white text-sm">
                        {mockNextScheduledJob.projectName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {mockNextScheduledJob.jobType.replace('_', ' ')} • Runs in 30 min
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-teal-600 dark:text-teal-400">30:00</div>
                      <div className="text-xs text-slate-500">remaining</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Currently Running Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Currently Running</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockActiveJobs.length === 0 ? (
                    <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                      No jobs currently running
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {mockActiveJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white text-sm">
                              {job.projectName}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {job.jobType.replace('_', ' ')} • Started {formatStartTime(job.startedAt)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedJobToStop(job);
                                setIsStopDialogOpen(true);
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 p-0"
                            >
                              <StopCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Job Runs */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Job Runs</CardTitle>
                    <CardDescription>Last 10 completed or failed jobs</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("jobs")}>
                    View All History
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Project</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Posts</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Leads</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Time</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRecentJobs.map((job) => (
                        <tr key={job.id} className="border-b border-slate-100 dark:border-slate-700/50">
                          <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{job.name}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{job.postsFound}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{job.leadsFound}</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{job.time}</td>
                          <td className="py-3 px-4">
                            <Badge className={job.status === "completed" ? "bg-emerald-100 text-emerald-700" : job.status === "failed" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}>
                              {job.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-6" onClick={() => setActiveTab("users")}>
                <div className="text-center w-full">
                  <Users className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <div className="font-semibold">Manage Users & Projects</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    View and manage all users
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-6" onClick={() => setActiveTab("jobs")}>
                <div className="text-center w-full">
                  <Play className="w-6 h-6 mx-auto mb-2 text-teal-600" />
                  <div className="font-semibold">Job History</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    View complete job history
                  </div>
                </div>
              </Button>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">Users Management</h3>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
            
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Projects</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-teal-600 text-teal-600">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{user.projects}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">Job History</h3>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Project</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Posts Found</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Leads Found</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockJobs.map((job) => (
                    <tr key={job.id} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{job.name}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{job.postsFound}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{job.leadsFound}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{job.time}</td>
                      <td className="py-3 px-4">
                        <Badge className={job.status === "completed" ? "bg-emerald-100 text-emerald-700" : job.status === "failed" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}>
                          {job.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Stop Job Confirmation Dialog */}
      {isStopDialogOpen && selectedJobToStop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Stop Running Job?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Are you sure you want to stop this job? This action cannot be undone.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
              <div className="font-medium text-slate-900 dark:text-white mb-1">
                {selectedJobToStop.projectName}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {selectedJobToStop.jobType.replace('_', ' ')} • Job #{selectedJobToStop.id}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setIsStopDialogOpen(false);
                  setSelectedJobToStop(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleStopJob}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <StopCircle className="w-4 h-4 mr-2" />
                Stop Job
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
