import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, Sparkles, BarChart3, Settings, Plus, ExternalLink, 
  MessageSquare, TrendingUp, Filter, Eye, Bell, User, LogOut, Menu
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";

const mockProjects = [
  { id: 1, name: "TechSaaS Growth", description: "B2B SaaS lead generation", posts: 23, leads: 12 },
  { id: 2, name: "CloudScale Marketing", description: "Cloud services outreach", posts: 45, leads: 28 },
];

const mockPosts = [
  {
    id: 1,
    title: "Looking for Reddit monitoring tool for my startup",
    subreddit: "r/entrepreneur",
    keywords: ["startup", "tools"],
    comments: 12,
    upvotes: 34,
    time: "2h ago",
    sentiment: "positive"
  },
  {
    id: 2,
    title: "AI-powered social media monitoring - any recommendations?",
    subreddit: "r/SaaS",
    keywords: ["AI", "monitoring"],
    comments: 8,
    upvotes: 24,
    time: "5h ago",
    sentiment: "neutral"
  },
  {
    id: 3,
    title: "Best B2B lead gen tools for 2024?",
    subreddit: "r/marketing",
    keywords: ["B2B", "lead gen"],
    comments: 21,
    upvotes: 56,
    time: "1d ago",
    sentiment: "positive"
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
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
              <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">Rixly</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab("posts")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "posts" 
                    ? "text-teal-600 dark:text-teal-400" 
                    : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
                }`}
              >
                Find Posts
              </button>
              <button
                onClick={() => setActiveTab("leads")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "leads" 
                    ? "text-teal-600 dark:text-teal-400" 
                    : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
                }`}
              >
                Find Leads
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "settings" 
                    ? "text-teal-600 dark:text-teal-400" 
                    : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
                }`}
              >
                Settings
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
                  JD
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
            <button
              onClick={() => { setActiveTab("posts"); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left py-2 ${activeTab === "posts" ? "text-teal-600" : "text-slate-600"}`}
            >
              Find Posts
            </button>
            <button
              onClick={() => { setActiveTab("leads"); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left py-2 ${activeTab === "leads" ? "text-teal-600" : "text-slate-600"}`}
            >
              Find Leads
            </button>
            <button
              onClick={() => { setActiveTab("settings"); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left py-2 ${activeTab === "settings" ? "text-teal-600" : "text-slate-600"}`}
            >
              Settings
            </button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Project Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Projects</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {mockProjects.map((project) => {
              const isActive = project.id === selectedProject.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? "bg-teal-100 dark:bg-teal-900/30 border border-teal-600/20"
                      : "bg-white dark:bg-slate-800 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {project.name.charAt(0)}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${
                    isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-900 dark:text-white"
                  }`}>
                    {project.name}
                  </span>
                </button>
              );
            })}
            <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-teal-600 hover:bg-slate-200 dark:hover:bg-slate-700">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {selectedProject.name}
            </h1>
            <a href="#" className="text-teal-600 hover:text-teal-700">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{selectedProject.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-teal-600" />
              <span className="text-xs text-slate-500">Posts Found</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProject.posts}</div>
            <div className="text-xs text-emerald-600">+12% today</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              <span className="text-xs text-slate-500">Leads</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProject.leads}</div>
            <div className="text-xs text-emerald-600">+8% this week</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-xs text-slate-500">AI Suggestions</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">5</div>
            <div className="text-xs text-teal-600">Ready to review</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <span className="text-xs text-slate-500">Subreddits</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">247</div>
            <div className="text-xs text-slate-500">Monitoring</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 w-fit">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === "posts"
                ? "bg-white dark:bg-slate-700 text-teal-600 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="font-medium">Find Posts</span>
            {mockPosts.length > 0 && (
              <Badge className="bg-teal-600 text-white text-xs">{mockPosts.length}</Badge>
            )}
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === "leads"
                ? "bg-white dark:bg-slate-700 text-teal-600 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <User className="w-4 h-4" />
            <span className="font-medium">Find Leads</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === "settings"
                ? "bg-white dark:bg-slate-700 text-teal-600 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="font-medium">Settings</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.keywords.map((kw) => (
                        <Badge key={kw} className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                          #{kw}
                        </Badge>
                      ))}
                      <span className="text-xs text-slate-500">{post.subreddit}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{post.time}</span>
                      <span>{post.comments} comments</span>
                      <span>{post.upvotes} upvotes</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">Reply</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "leads" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm text-center">
            <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Find Leads</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Discover potential leads from the posts and conversations you monitor.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700">Start Lead Discovery</Button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Project Settings</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Name</label>
                <Input defaultValue={selectedProject.name} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <Input defaultValue={selectedProject.description} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Keywords (comma separated)</label>
                <Input defaultValue="SaaS, B2B, marketing, growth" />
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
