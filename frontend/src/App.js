import "@/App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { HowRixlyMergedSection } from "./components/HowRixlyMergedSection";
import { VideoSection } from "./components/VideoSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { UseCasesSection } from "./components/UseCasesSection";
import { ComplianceSection } from "./components/ComplianceSection";
import { ROIComparisonTable } from "./components/ROIComparisonTable";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PricingSection } from "./components/PricingSection";
import { ResourcesSection } from "./components/ResourcesSection";
import { LeadSourcesSection } from "./components/LeadSourcesSection";
import { CTASection } from "./components/CTASection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { CompanyLogos } from "./components/CompanyLogos";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { ROIPage } from "./components/ROIPage";
import { ScrollToTop } from "./components/ScrollToTop";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ContactUsPage from "./pages/ContactUsPage";
import RequestDemoPage from "./pages/RequestDemoPage";
import PrivacyPolicyPage from "./pages/policies/PrivacyPolicyPage";
import TermsPage from "./pages/policies/TermsPage";
import CancelAndRefundPage from "./pages/policies/CancelAndRefundPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import CreateProjectPage from "./pages/CreateProjectPage";

function LandingPage({ isDark, toggleTheme }) {
  const [view, setView] = useState("landing");
  const [error, setError] = useState(null);

  useEffect(() => {
    window.handleBackToLanding = () => {
      console.log("Global handleBackToLanding called");
      setView("landing");
    };

    const errorHandler = (e) => {
      console.error("Caught global error:", e);
    };

    window.addEventListener('error', errorHandler);
    return () => {
      delete window.handleBackToLanding;
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Subtle grain overlay */}
      <div className="fixed inset-0 pointer-events-none grain" />

      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar isDark={isDark} toggleTheme={toggleTheme} setView={setView} />
            <HeroSection />
            <VideoSection />
            <HowRixlyMergedSection />
            <ProblemSection />
            <FeaturesSection />
            <UseCasesSection />
            <ComplianceSection />
            <ROIComparisonTable />
            <LeadSourcesSection />
            <PricingSection />
            <TestimonialsSection />
            <ResourcesSection />
            <FAQSection />
            <CTASection />
            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
        {view === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnalyticsDashboard onBack={() => setView("landing")} />
          </motion.div>
        )}
        {view === "roi" && (
          <motion.div
            key="roi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ROIPage onBack={() => setView("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AppContent() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    try {
      return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    } catch (e) {
      return false;
    }
  });

  const location = useLocation();

  // Check if we're on an auth or policy page
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  const isPolicyPage = ['/privacy', '/terms', '/cancelandrefund'].includes(location.pathname);
  const isFullPage = ['/contactus', '/request-demo'].includes(location.pathname);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Render full page views
  if (location.pathname === '/login') {
    return <LoginPage />;
  }

  if (location.pathname === '/signup') {
    return <SignupPage />;
  }

  if (location.pathname === '/forgot-password') {
    return <ForgotPasswordPage />;
  }

  if (location.pathname === '/contactus') {
    return <ContactUsPage />;
  }

  if (location.pathname === '/request-demo') {
    return <RequestDemoPage />;
  }

  if (location.pathname === '/privacy') {
    return <PrivacyPolicyPage />;
  }

  if (location.pathname === '/terms') {
    return <TermsPage />;
  }

  if (location.pathname === '/cancelandrefund') {
    return <CancelAndRefundPage />;
  }

  if (location.pathname === '/dashboard') {
    return <DashboardPage />;
  }

  if (location.pathname === '/admin') {
    return <AdminPage />;
  }

  if (location.pathname === '/create-project') {
    return <CreateProjectPage />;
  }

  return <LandingPage isDark={isDark} toggleTheme={toggleTheme} />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
