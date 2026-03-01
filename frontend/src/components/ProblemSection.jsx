import { motion } from "framer-motion";
import { useRef } from "react";
import { Badge } from "./ui/badge";
import { ArrowRight, Users, Target, TrendingUp, Activity, Zap, CheckCircle } from "lucide-react";

export const ProblemSection = () => {
  const sectionRef = useRef(null);

  const cardsData = [
    { 
      value: "247", 
      label: "New Leads", 
      status: "Live Processing",
      mockup: (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Users className="w-3 h-3" />
            <span>Active Users</span>
          </div>
          <div className="h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-end justify-around p-2">
            {[40, 65, 45, 80, 55, 70, 90, 75, 60, 85, 95, 70].map((h, i) => (
              <div key={i} className="w-2 bg-cyan-500 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
          </div>
        </div>
      )
    },
    { 
      value: "189", 
      label: "Qualified", 
      status: "Live Processing",
      mockup: (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Target className="w-3 h-3" />
            <span>Conversion Rate</span>
          </div>
          <div className="relative h-16 bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-500">76.5%</span>
            </div>
            <svg className="absolute bottom-0 left-0 right-0 h-10" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M0,30 L0,20 Q10,15 20,18 T40,12 T60,8 T80,5 T100,3 L100,30 Z" fill="url(#qualGradient)" />
              <defs>
                <linearGradient id="qualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span>+12.3% this week</span>
          </div>
        </div>
      )
    },
    { 
      value: "72", 
      label: "Converted", 
      status: "Live Processing",
      mockup: (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle className="w-3 h-3" />
            <span>Recent Conversions</span>
          </div>
          <div className="space-y-1.5">
            {[
              { name: "TechCorp Inc.", value: "$12,500", time: "2m ago" },
              { name: "StartupXYZ", value: "$8,200", time: "15m ago" },
              { name: "DataFlow Co.", value: "$15,000", time: "32m ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/30 p-1.5 rounded">
                <span className="text-slate-700 dark:text-slate-300 truncate">{item.name}</span>
                <span className="text-green-600 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-cyan-600">
            <Activity className="w-3 h-3" />
            <span>3 in last hour</span>
          </div>
        </div>
      )
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[30%] right-[5%] w-[25%] h-[25%] rounded-full bg-cyan-500 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/5"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
              AI-Powered Lead Generation
            </Badge>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Turn Social Conversations{" "}
              <span className="text-primary">Into Qualified Leads</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Monitor high-intent buyers across social platforms in real time.
              Convert demand before competitors even see it.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors hover:bg-primary/90"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE: Floating Cards */}
          <div className="relative h-[400px] lg:h-[450px]">
            {cardsData.map((card, index) => (
              <motion.div
                key={card.label}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.25 }
                }}
                className={`
                  absolute w-full max-w-[280px] md:max-w-[320px] p-6 rounded-2xl
                  backdrop-blur-xl border cursor-pointer
                  dark:bg-slate-900/75 dark:border-slate-400/12 dark:shadow-[0_8px_32px_rgba(6,182,212,0.15)]
                  bg-white/70 border-slate-900/08 shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                `}
                style={{
                  top: index === 0 ? '0%' : index === 1 ? '30%' : '60%',
                  left: index === 0 ? '0%' : index === 1 ? '15%' : '30%',
                  zIndex: 30 - index * 10,
                }}
              >
                {/* Card Header */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase tracking-widest text-cyan-500 dark:text-cyan-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {card.status}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  
                  <span className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                    {card.value}
                  </span>
                  
                  <span className="text-sm md:text-base text-muted-foreground mt-1">
                    {card.label}
                  </span>
                </div>

                {/* Dashboard Mockup */}
                {card.mockup}

                {/* Bottom glow effect for dark mode */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 dark:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
