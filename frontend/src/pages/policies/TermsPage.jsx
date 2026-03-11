import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Navbar } from "../../components/Navbar";

export default function TermsPage() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    try {
      return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 pt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-white" />
              <h1 className="font-heading text-4xl font-bold text-white">
                Terms of Service
              </h1>
            </div>
            <p className="text-teal-100">
              Last updated: March 2024
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Welcome to Rixly. By accessing and using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                By accessing or using Rixly's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Rixly provides AI-powered Reddit intelligence and lead generation services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Keyword tracking and monitoring</li>
                <li>Subreddit surveillance</li>
                <li>AI-powered reply suggestions</li>
                <li>Analytics and reporting</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                3. User Accounts
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Provide accurate and complete registration information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                4. Payment and Billing
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Some features require a paid subscription. By subscribing, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Pay all fees associated with your subscription</li>
                <li>Provide valid payment information</li>
                <li>Allow us to charge your payment method for recurring fees</li>
                <li>Review our refund policy for cancellation terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                5. Acceptable Use
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                You agree not to use Rixly to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Send spam or malicious content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Engage in activities that could harm Rixly or its users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Rixly and its content, features, and functionality are owned by Rixly and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, RIXLY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                9. Indemnification
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                You agree to indemnify, defend, and hold harmless Rixly and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses arising out of your use of our services or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                10. Termination
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                We may terminate or suspend your account and access to our services at any time, with or without notice, for any reason, including violation of these Terms. Upon termination, your right to use our services will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                11. Contact Information
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:support@rixly.io" className="text-teal-600 hover:underline">
                  support@rixly.io
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
