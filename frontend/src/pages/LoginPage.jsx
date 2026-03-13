import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, X, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

function AuthBrandingSection() {
  return (
    <div className="hidden lg:flex flex-col justify-center p-8 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-2xl">Rixly</span>
          </Link>
        </div>
        
        <h2 className="font-heading text-3xl font-bold mb-4">
          Turn Reddit into your growth engine
        </h2>
        <p className="text-teal-100 text-lg mb-8">
          Join thousands of marketers who use Rixly to find leads, track keywords, and engage with their audience on Reddit.
        </p>

        <div className="space-y-4">
          {[
            "AI-powered keyword tracking",
            "Real-time subreddit monitoring",
            "Smart reply suggestions",
            "Detailed analytics dashboard"
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-teal-200" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-8 mt-12 text-center">
          <div>
            <div className="font-bold text-2xl">50+</div>
            <div className="text-teal-200 text-sm">Active Users</div>
          </div>
          <div>
            <div className="font-bold text-2xl">3x</div>
            <div className="text-teal-200 text-sm">More Leads</div>
          </div>
          <div>
            <div className="font-bold text-2xl">95%</div>
            <div className="text-teal-200 text-sm">Accuracy</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AuthToggle({ activeTab, onTabChange }) {
  return null; // Deprecated - using direct links now
}

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); navigate("/dashboard"); }, 1500);
  };

  const handleGoogleLogin = () => { console.log("Google login clicked"); };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="border-slate-200" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="border-slate-200 pr-10" required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <Link to="/forgot-password" className="text-sm text-teal-600 self-end">Forgot Password?</Link>

      <Button type="submit" disabled={isLoading} className="w-full bg-teal-600 mt-4">
        {isLoading ? "Signing In..." : "Continue with Email"}
      </Button>

      <div className="flex items-center gap-2 my-2"><hr className="w-full border-slate-200" /><span className="text-xs text-slate-500">OR</span><hr className="w-full border-slate-200" /></div>

      <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </Button>

      <p className="text-xs text-center text-slate-500 mt-4">
        By continuing, you agree to <Link to="/terms" className="text-teal-600">Terms</Link> and <Link to="/privacy" className="text-teal-600">Privacy</Link>
      </p>
    </form>
  );
}

function SignupForm() {
  return null; // Signup moved to separate SignupPage
}

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 w-full max-w-6xl mx-auto min-h-screen lg:min-h-[80vh]">
      <AuthBrandingSection />
      <div className="lg:col-span-3 flex items-center justify-center p-4 sm:p-8 relative">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="absolute top-4 right-4">
          <X className="w-5 h-5" />
        </Button>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h1 className="text-slate-900 text-[22px] font-bold pb-3">Welcome to Rixly</h1>
          <LoginForm />
          
          {/* New Customer Section */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
              Are you a new customer?
            </p>
            <Link
              to="/signup"
              className="mt-3 block w-full"
            >
              <Button variant="outline" className="w-full">
                Create your account
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
