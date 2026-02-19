import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const HeroSection = () => {
  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: TrendingUp, value: "3x", label: "More Leads" },
    { icon: Sparkles, value: "95%", label: "Accuracy" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20"
      data-testid="hero-section"
    >
      {/* Background glow and subtle waves */}
      <div className="absolute inset-0 bg-[#F1F5F9]" />
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-light blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-primary-dark blur-[100px]" />
      </div>

      {/* Abstract wave-like overlay (simplified) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(20,184,166,0.1), transparent 40%)' }} />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/5"
                data-testid="hero-badge"
              >
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                AI-Powered Lead Generation
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
              data-testid="hero-title"
            >
              Turn Visitors Into{" "}
              <span className="text-primary">Qualified Leads</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
              data-testid="hero-description"
            >
              Rixly uses advanced AI to identify, score, and convert your
              website visitors into high-quality leads automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button
                size="lg"
                className="rounded-full font-medium text-lg px-8 glow-primary glow-primary-hover btn-press"
                data-testid="hero-get-started"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-medium text-lg px-8 btn-press"
                data-testid="hero-book-demo"
                onClick={() => document.getElementById("video")?.scrollIntoView({ behavior: "smooth" })}
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3"
                  data-testid={`hero-stat-${index}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative perspective-1000">
              <motion.div
                initial={{ rotateY: 15, rotateX: 5 }}
                animate={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="bg-white p-6 rounded-[20px] shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    </div>
                    <Badge variant="success" className="bg-[#DCFCE7] text-[#166534] border-none font-medium">
                      Live Processing
                    </Badge>
                  </div>

                  {/* Mock dashboard content */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="font-heading font-bold text-xl text-[#0F172A]">Lead Dashboard</div>
                      <div className="text-xs text-[#64748B] font-medium">Updated 2m ago</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "New Leads", value: "247", color: "#0D9488" },
                        { label: "Qualified", value: "189", color: "#14B8A6" },
                        { label: "Converted", value: "72", color: "#22C55E" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-center"
                        >
                          <div className="font-heading font-bold text-xl mb-0.5" style={{ color: item.color }}>
                            {item.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider font-semibold text-[#64748B]">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mock chart */}
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 h-44 flex items-end gap-2 relative overflow-hidden">
                      <div className="absolute top-3 left-4 text-[10px] font-bold text-[#94A3B8] uppercase">Conversion Velocity</div>
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map(
                        (height, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                            className="flex-1 bg-primary-gradient rounded-t-sm"
                            style={{ opacity: 0.3 + (i / 12) * 0.7 }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">New Lead!</div>
                      <div className="text-xs text-muted-foreground">
                        Score: 92/100
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
