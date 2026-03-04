import "@/App.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { VideoSection } from "./components/VideoSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { UseCasesSection } from "./components/UseCasesSection";
import { ComplianceSection } from "./components/ComplianceSection";
import { ROIComparisonTable } from "./components/ROIComparisonTable";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PricingSection } from "./components/PricingSection";
import { CTASection } from "./components/CTASection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { CompanyLogos } from "./components/CompanyLogos";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { ROIPage } from "./components/ROIPage";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    try {
      return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    } catch (e) {
      return false;
    }
  });
  const [view, setView] = useState("landing");
  const [error, setError] = useState(null);

  // Safety for external scripts calling unknown handlers
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

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <button onClick={() => { setError(null); setView("landing"); }}>
            Reset App
          </button>
        </div>
      </div>
    );
  }

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
            <ProblemSection />
            <HowItWorksSection />
            <VideoSection />
            <FeaturesSection />
            <UseCasesSection />
            <ComplianceSection />
            <ROIComparisonTable />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
            <FAQSection />
            <Footer />
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

export default App;
