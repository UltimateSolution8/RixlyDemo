import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back to Login */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-heading font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
            Rixly
          </span>
        </Link>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Forgot your password?
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                No worries, we'll send you reset instructions
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Sending reset link...
                  </span>
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Check your email
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We sent a password reset link to <span className="font-medium text-slate-900 dark:text-white">{email}</span>
              </p>
              <p className="text-sm text-slate-500 mb-8">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-teal-600 hover:text-teal-700 dark:text-teal-400 font-medium"
                >
                  Resend
                </button>
              </p>
            </div>
          </>
        )}

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
