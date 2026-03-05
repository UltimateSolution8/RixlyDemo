import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, MessageCircle, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";

// Sample data
const stepsData = [
  {
    id: 1,
    icon: Search,
    title: "Monitor",
    description: "Track high-intent conversations across targeted subreddits with AI-powered surveillance.",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Engage",
    description: "AI suggests contextual replies aligned with platform rules for authentic engagement.",
  },
  {
    id: 3,
    icon: BarChart3,
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

// Brand logos placeholder URLs
const brandLogos = [
  { name: "Company A", url: "https://placehold.co/80x32/1e86b4/ffffff?text=SaaS+Co" },
  { name: "Company B", url: "https://placehold.co/80x32/7c3aed/ffffff?text=Agency" },
  { name: "Company C", url: "https://placehold.co/80x32/059669/ffffff?text=Web3+Inc" },
  { name: "Company D", url: "https://placehold.co/80x32/dc2626/ffffff?text=Tech+Corp" },
];

// Custom hook for animated counter using requestAnimationFrame
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
    const startValue = 0;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function with slight bounce at the end
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const bounce = progress === 1 ? 0.05 * Math.sin(progress * Math.PI * 4) : 0;
      
      const currentValue = Math.round(startValue + (end - startValue) * easeOutQuart + bounce * end);
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

// Stat tile component with animated counter
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
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border/50 rounded-xl p-4 text-center"
      role="stat"
      aria-label={`${value}${suffix} ${label}`}
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="font-heading text-3xl font-bold text-primary">
          {isVisible ? count : 0}
        </span>
        <span className="font-heading text-xl font-bold text-primary">{suffix}</span>
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}

// Step card component
function StepCard({ step, isActive, isPrev, onClick, index }) {
  const hasReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={hasReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={hasReducedMotion ? {} : { y: -6 }}
      onClick={onClick}
      className={`
        flex-shrink-0 w-72 md:w-80 cursor-pointer
        bg-card border border-border/50 rounded-2xl p-6
        transition-all duration-300
        ${isActive ? 'scale-[1.02] shadow-[0_20px_40px_rgba(30,134,141,0.15)]' : 'scale-[0.98] shadow-sm'}
        hover:shadow-[0_20px_40px_rgba(30,134,141,0.2)]
      `}
      role="button"
      tabIndex={0}
      aria-label={`Step ${step.id}: ${step.title}`}
      aria-pressed={isActive}
    >
      {/* Step Badge */}
      <div className="mb-4">
        <span className="inline-block bg-primary-gradient text-white font-heading font-bold text-xs px-3 py-1 rounded-full">
          Step {step.id}
        </span>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <step.icon className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

export const HowRixlyMergedSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const hasReducedMotion = useReducedMotion();

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || hasReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stepsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, hasReducedMotion]);

  // Keyboard controls
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      setActiveIndex((prev) => (prev - 1 + stepsData.length) % stepsData.length);
    } else if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % stepsData.length);
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
      className="py-12 md:py-16 relative overflow-hidden"
      aria-label="How Rixly Works"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Two column layout - Desktop */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - 66% */}
          <div className="lg:col-span-8 mb-12 lg:mb-0">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                How Rixly Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Turn Reddit conversations into your sales pipeline with three simple steps.
              </p>
            </motion.div>

            {/* Carousel */}
            <div 
              ref={carouselRef}
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              tabIndex={0}
              role="region"
              aria-label="Step carousel"
            >
              {/* Cards Container */}
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={hasReducedMotion ? false : { opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={hasReducedMotion ? false : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4"
                  >
                    {stepsData.map((step, index) => (
                      <div 
                        key={step.id} 
                        className="snap-start"
                      >
                        <StepCard
                          step={step}
                          isActive={index === activeIndex}
                          index={index}
                          onClick={() => goToSlide(index)}
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + stepsData.length) % stepsData.length)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex gap-2" role="tablist" aria-label="Carousel navigation">
                  {stepsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`
                        w-2.5 h-2.5 rounded-full transition-all duration-300
                        ${index === activeIndex ? 'bg-primary w-8' : 'bg-border hover:bg-primary/50'}
                      `}
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % stepsData.length)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Keyboard hint */}
              <p className="text-xs text-muted-foreground text-center mt-3" aria-hidden="true">
                Use ← → arrow keys to navigate
              </p>
            </div>
          </div>

          {/* Right Column - 34% */}
          <div className="lg:col-span-4">
            {/* Trusted by text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-sm font-medium text-muted-foreground text-center lg:text-left">
                Trusted by growth teams across SaaS, Agencies & Web3
              </p>
            </motion.div>

            {/* Brand logos row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              {brandLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.url}
                  alt={logo.name}
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              ))}
            </motion.div>

            {/* Stats grid - 2x2 on tablet/mobile */}
            <div 
              className="grid grid-cols-2 gap-4"
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
    </section>
  );
};

export default HowRixlyMergedSection;
