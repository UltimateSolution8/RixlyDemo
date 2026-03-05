import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// =====================
// Utility Functions
// =====================

/**
 * Clamps a value between min and max
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Advances carousel index with wrapping
 */
const advanceIndex = (current, total, direction) => {
  if (direction === "next") {
    return (current + 1) % total;
  }
  return (current - 1 + total) % total;
};

// =====================
// Sample Data
// =====================

const stepsData = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Monitor",
    description: "Track high-intent conversations across targeted subreddits with AI-powered surveillance.",
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Engage",
    description: "AI suggests contextual replies aligned with platform rules for authentic engagement.",
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Convert",
    description: "Turn conversations into demo-ready leads with tracked links and seamless CRM sync.",
  },
];

const statsData = [
  { value: 50, suffix: "+", label: "Active Users" },
  { value: 3, suffix: "x", label: "More Leads" },
  { value: 95, suffix: "%", label: "Accuracy" },
  { value: 100, suffix: "%", label: "Trusted by growth teams" },
];

// Brand logos - using placeholder service
const brandLogos = [
  { name: "SaaS Co", url: "https://placehold.co/80x28/1e293b/ffffff?text=SaaS+Co" },
  { name: "Agency Pro", url: "https://placehold.co/80x28/1e293b/ffffff?text=Agency" },
  { name: "Web3 Inc", url: "https://placehold.co/80x28/1e293b/ffffff?text=Web3" },
  { name: "Tech Corp", url: "https://placehold.co/80x28/1e293b/ffffff?text=Tech" },
];

// =====================
// Custom Hooks
// =====================

/**
 * Animated counter using requestAnimationFrame
 * @param {number} end - The end value to count up to
 * @param {number} duration - Animation duration in ms
 */
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasReducedMotion = useReducedMotion();
  const rafRef = useRef(null);

  useEffect(() => {
    if (hasReducedMotion) {
      setCount(end);
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      
      // Ease out quart for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(end * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, hasReducedMotion]);

  return count;
}

// =====================
// Components
// =====================

/**
 * Stat Tile Component with animated counter
 */
function StatTile({ value, suffix, label, index }) {
  const count = useCountUp(value, 1500 + index * 200);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700 shadow-sm"
      role="stat"
      aria-label={`${value}${suffix} ${label}`}
    >
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          {isVisible ? count : 0}
        </span>
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          {suffix}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{label}</p>
    </div>
  );
}

/**
 * Step Card Component
 */
function StepCard({ step, isActive, index, totalCards }) {
  const hasReducedMotion = useReducedMotion();
  
  // Calculate z-index and transform for stacking effect
  const zIndex = totalCards - index;
  const translateY = index * 8; // Each card shifted down by 8px
  
  return (
    <motion.div
      initial={hasReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: translateY,
        zIndex: zIndex,
        scale: isActive ? 1 : 0.95
      }}
      whileHover={hasReducedMotion ? {} : { y: translateY - 6 }}
      transition={{ duration: 0.3 }}
      className={`
        absolute w-64 sm:w-72 cursor-pointer
        bg-white dark:bg-slate-800 rounded-2xl p-5
        border border-slate-200 dark:border-slate-700
        transition-all duration-300
        ${isActive 
          ? 'shadow-xl shadow-indigo-500/10' 
          : 'shadow-md'
        }
      `}
      style={{
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px) scale(${isActive ? 1 : 0.95})`,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Step ${step.id}: ${step.title}`}
      aria-pressed={isActive}
    >
      {/* Step Badge */}
      <div className="mb-3">
        <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Step {step.id}
        </span>
      </div>

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400">
        {step.icon}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
        {step.title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

/**
 * Main Merged Section Component
 */
function HowRixlyMergedSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const hasReducedMotion = useReducedMotion();

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || hasReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => advanceIndex(prev, stepsData.length, "next"));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, hasReducedMotion]);

  // Keyboard controls for carousel
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => advanceIndex(prev, stepsData.length, "prev"));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => advanceIndex(prev, stepsData.length, "next"));
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("keydown", handleKeyDown);
      return () => carousel.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section 
      id="how-it-works" 
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 relative"
      aria-label="How Rixly Works - Trusted by Growth Teams"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Two column layout: Left 66% (8 cols), Right 34% (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT COLUMN - 8/12 (66%) */}
          <div className="lg:col-span-8 h-full">
            {/* Left Box with border - equal height */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 lg:p-8 h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                  How Rixly Works
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Turn Reddit conversations into your sales pipeline with three simple steps.
                </p>
              </div>

              {/* Carousel Container - flexible space */}
              <div 
                ref={carouselRef}
                className="relative flex-1 flex flex-col items-center justify-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                tabIndex={0}
                role="region"
                aria-label="Step carousel - Use arrow keys to navigate"
              >
                {/* Cards Stack Container */}
                <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
                  <AnimatePresence mode="sync">
                    {stepsData.map((step, index) => {
                      // Show current, next, and next+1 cards stacked
                      const showIndex = (activeIndex + index) % stepsData.length;
                      const isActive = index === 0;
                      
                      return (
                        <StepCard
                          key={step.id}
                          step={stepsData[showIndex]}
                          isActive={isActive}
                          index={index}
                          totalCards={stepsData.length}
                        />
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-3 mt-8">
                  <button
                    onClick={() => setActiveIndex((prev) => advanceIndex(prev, stepsData.length, "prev"))}
                    className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="Previous step"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex gap-2" role="tablist" aria-label="Carousel navigation">
                    {stepsData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`
                          h-2 rounded-full transition-all duration-300
                          ${index === activeIndex 
                            ? 'bg-indigo-600 w-6' 
                            : 'bg-slate-300 dark:bg-slate-600 w-2 hover:bg-indigo-400'
                          }
                        `}
                        role="tab"
                        aria-selected={index === activeIndex}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveIndex((prev) => advanceIndex(prev, stepsData.length, "next"))}
                    className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="Next step"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Keyboard hint */}
                <p className="text-xs text-slate-500 dark:text-slate-500 text-center mt-3" aria-hidden="true">
                  Use ← → arrow keys to navigate
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - 4/12 (34%) */}
          <div className="lg:col-span-4 h-full">
            {/* Right Box with border - equal height */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 lg:p-8 h-full flex flex-col">
              {/* Trusted by text - same size as heading */}
              <div className="mb-6">
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                  Trusted by growth teams across SaaS, Agencies & Web3
                </h3>
              </div>

              {/* Brand logos row */}
              <div className="flex flex-wrap justify-start gap-3 mb-6">
                {brandLogos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.url}
                    alt={logo.name}
                    className="h-7 opacity-70 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                ))}
              </div>

              {/* Stats grid - equal size tiles */}
              <div 
                className="grid grid-cols-2 gap-3 flex-1"
                role="list"
                aria-label="Key statistics"
              >
                {statsData.map((stat, index) => (
                  <div key={index} role="listitem">
                    <StatTile 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      label={stat.label}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HowRixlyMergedSection };
