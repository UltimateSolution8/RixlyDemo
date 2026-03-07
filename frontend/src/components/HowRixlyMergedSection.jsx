import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle, TrendingUp, Sparkles, Users, Target, Zap, Handshake, Building } from "lucide-react";

// Sample Data
const stepsData = [
  {
    id: 1,
    icon: Search,
    title: "Monitor",
    description: "AI tracks high-intent conversations across targeted subreddits in real-time.",
    color: "#FF6B4A",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Engage",
    description: "Get contextual reply suggestions that feel authentic and platform-native.",
    color: "#FF8F75",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Convert",
    description: "Turn conversations into demo-ready leads with tracked links and CRM sync.",
    color: "#FF6B4A",
  },
];

const statsData = [
  { value: "400+", label: "High-intent conversations identified", icon: Search },
  { value: "6+", label: "Deals closed in 30 days (case study)", icon: Handshake },
  { value: "15+", label: "Used globally across industries", icon: Building },
  { value: "3×", label: "Faster lead discovery", icon: TrendingUp },
];

// Animated counter hook
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const numericValue = parseInt(end.replace(/\D/g, ""));
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(numericValue * easeOut));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref: countRef };
}

function StatCard({ stat, index }) {
  const { count, ref } = useCountUp(stat.value, 2000);
  const suffix = stat.value.replace(/[0-9]/g, "");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center hover:border-primary/30 transition-all duration-300">
        <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
          <stat.icon className="w-5 h-5 text-primary" />
        </div>
        <div className="font-heading text-2xl font-bold text-foreground">
          {count}{suffix}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export function HowRixlyMergedSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stepsData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      id="how-it-works" 
      className="py-24 lg:py-32 relative overflow-hidden"
      aria-label="How Rixly Works"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* LEFT COLUMN - Stats & Trust */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="h-full min-h-[520px] bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                    <Sparkles className="w-3 h-3" />
                    Teams Use Us to Scale
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Trusted by Growth Teams
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Join thousands of SaaS companies, agencies, and Web3 projects accelerating their growth.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {statsData.map((stat, index) => (
                    <StatCard key={stat.label} stat={stat} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Auto-rotating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div 
              className="relative h-full min-h-[520px] bg-card/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8 overflow-hidden flex flex-col"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
              
              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

              {/* Title */}
              <div className="relative z-10 mb-4">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  How Rixly Works
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Simple steps to transform conversations
                </p>
              </div>

              {/* Cards Container */}
              <div className="relative flex-1 flex items-center justify-center">
                <AnimatePresence mode="sync">
                  {stepsData.map((step, index) => {
                    const isActive = index === activeIndex;
                    const isPrev = index === (activeIndex - 1 + stepsData.length) % stepsData.length;
                    const isNext = index === (activeIndex + 1) % stepsData.length;

                    if (!isActive && !isPrev && !isNext) return null;

                    return (
                      <motion.div
                        key={step.id}
                        initial={false}
                        animate={{
                          scale: isActive ? 1 : 0.85,
                          opacity: isActive ? 1 : 0.3,
                          y: isActive ? 0 : isPrev ? -40 : 40,
                          zIndex: isActive ? 10 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className={`absolute w-full max-w-sm ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                      >
                        <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-2xl shadow-black/20">
                          {/* Step Badge */}
                          <div className="flex items-center gap-3 mb-4">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${step.color}20` }}
                            >
                              <step.icon className="w-6 h-6" style={{ color: step.color }} />
                            </div>
                            <div>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Step {step.id}
                              </span>
                              <h3 className="font-heading text-xl font-semibold text-foreground">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {step.description}
                          </p>

                          {/* Progress Indicator */}
                          {isActive && (
                            <div className="mt-6 h-1 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 4, ease: "linear" }}
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Step Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {stepsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 bg-primary' 
                        : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowRixlyMergedSection;
