import { motion } from "framer-motion";
import { useRef } from "react";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";

export const ProblemSection = () => {
  const sectionRef = useRef(null);

  const cardsData = [
    { value: "247", label: "New Leads", status: "Live Processing" },
    { value: "189", label: "Qualified", status: "Live Processing" },
    { value: "72", label: "Converted", status: "Live Processing" },
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
                {/* Card content */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase tracking-widest text-cyan-500 dark:text-cyan-400">
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
