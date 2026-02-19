import "@/App.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { VideoSection } from "./components/VideoSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PricingSection } from "./components/PricingSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState("landing");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Subtle grain overlay */}
      <div className="fixed inset-0 pointer-events-none grain" />

      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar isDark={isDark} toggleTheme={toggleTheme} setView={setView} />
            <main>
              <HeroSection />
              <VideoSection />
              <FeaturesSection />
              <TestimonialsSection />
              <PricingSection />
              <CTASection />
            </main>
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AnalyticsDashboard onBack={() => setView("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
