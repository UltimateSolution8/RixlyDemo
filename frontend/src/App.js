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

  // Safety for external scripts calling unknown handlers
  useEffect(() => {
    window.handleBackToLanding = () => setView("landing");
    return () => { delete window.handleBackToLanding; };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Subtle grain overlay */}
      <div className="fixed inset-0 pointer-events-none grain" />

      {view === "landing" ? (
        <div key="landing">
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
        </div>
      ) : (
        <div key="dashboard">
          <AnalyticsDashboard onBack={() => setView("landing")} />
        </div>
      )}
    </div>
  );
}

export default App;
