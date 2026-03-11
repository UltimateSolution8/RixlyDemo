import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, CreditCard, AlertCircle } from "lucide-react";
import { Navbar } from "../../components/Navbar";

export default function CancelAndRefundPage() {
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
              <RefreshCw className="w-8 h-8 text-white" />
              <h1 className="font-heading text-4xl font-bold text-white">
                Cancellation & Refund Policy
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
              We want you to be completely satisfied with Rixly. This page outlines our cancellation and refund policies.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-teal-600" />
                Subscription Cancellation
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                You can cancel your subscription at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Logging into your account and navigating to Settings → Subscription</li>
                <li>Contacting our support team at <a href="mailto:support@rixly.io" className="text-teal-600 hover:underline">support@rixly.io</a></li>
                <li>Using the cancellation link in your subscription confirmation email</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 mt-4">
                Upon cancellation, your subscription will remain active until the end of your current billing period. You will not be charged further after cancellation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-teal-600" />
                Refund Policy
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied with our service, you can request a full refund within 14 days of your first payment.
              </p>
              <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4 mt-4">
                <p className="text-teal-800 dark:text-teal-200 font-medium">
                  Note: The 14-day money-back guarantee applies to your first subscription only. Subsequent renewals are not eligible for refunds unless required by law.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Refund Eligibility
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                To be eligible for a refund, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Request a refund within 14 days of your first payment</li>
                <li>Not have violated our Terms of Service</li>
                <li>Not have requested more than one refund</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Non-Refundable Items
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                The following are not eligible for refunds:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Subscription renewals (after the initial 14-day period)</li>
                <li>Add-on purchases or one-time fees</li>
                <li>Custom integrations or development work</li>
                <li>Services already rendered</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-teal-600" />
                How Refunds Are Processed
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Once your refund request is approved:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Refunds are processed within 5-10 business days</li>
                <li>Credits will be returned to the original payment method</li>
                <li>You will receive confirmation via email once the refund is processed</li>
                <li>Depending on your bank, it may take 5-14 business days for the refund to appear in your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Downgrading Your Plan
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                You can downgrade your subscription at any time. The change will take effect at the start of your next billing cycle. No refunds will be provided for the remaining days of your current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                If you have questions about our Cancellation & Refund Policy, please contact us:
              </p>
              <ul className="list-none pl-0 space-y-2 text-slate-600 dark:text-slate-300">
                <li>Email: <a href="mailto:support@rixly.io" className="text-teal-600 hover:underline">support@rixly.io</a></li>
                <li>Through our <Link to="/contactus" className="text-teal-600 hover:underline">contact form</Link></li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
