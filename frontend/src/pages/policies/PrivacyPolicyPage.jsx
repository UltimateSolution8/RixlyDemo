import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Navbar } from "../../components/Navbar";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-white" />
              <h1 className="font-heading text-4xl font-bold text-white">
                Privacy Policy
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
              At Rixly, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Account information (name, email, company)</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Communications and support requests</li>
                <li>Data you import for monitoring (keywords, subreddits)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                3. Information Sharing
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Service providers who assist in our operations</li>
                <li>Business partners with your consent</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                4. Data Security
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                We implement appropriate technical and organizational measures to protect your personal information, including encryption, access controls, and regular security assessments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                5. Your Rights
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                8. Contact Us
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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
