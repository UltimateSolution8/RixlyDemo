import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Search, TrendingUp, AlertCircle, Users, Zap } from "lucide-react";
import { Badge } from "./ui/badge";

export const ProblemSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const floatingStats = [
    { label: "Active Discussions", value: "12.5K" },
    { label: "Problems Found", value: "3,847" },
    { label: "High Intent", value: "89%" },
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[30%] right-[5%] w-[25%] h-[25%] rounded-full bg-orange-500 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm border-primary/30 bg-primary/5">
            <AlertCircle className="w-4 h-4 mr-2 text-primary" />
            PROBLEM SECTION
          </Badge>
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Cold outreach is <span className="text-primary">saturated</span>.
            <br />
            Social conversations are <span className="text-orange-500">not</span>.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Buyers openly discuss problems on Reddit and LinkedIn every day. Most companies never see those conversations — or they see them too late. 
            <span className="text-primary font-medium"> Rixly surfaces them in real time.</span>
          </p>
        </motion.div>

        <div className="relative min-h-[600px] flex items-center justify-center">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-30 bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-lg w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Live Intelligence</h3>
                  <p className="text-xs text-muted-foreground">Real-time monitoring</p>
                </div>
              </div>
              <Badge variant="success" className="animate-pulse">● Live</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {floatingStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-3 bg-muted/30 rounded-xl"
                >
                  <div className="font-heading font-bold text-2xl text-primary">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { text: "New: SaaS founders discussing pricing alternatives", time: "2m ago" },
                { text: "Hot: Agency looking for Reddit marketing tools", time: "5m ago" },
                { text: "Trending: API integration problems on the rise", time: "12m ago" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </motion.div>
              ))}
            </div>

            <div className="absolute -top-4 -right-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1">
                <span className="mr-1">⭐</span> Most Premium
              </Badge>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute left-0 top-1/4 z-20 bg-card border border-border rounded-xl p-6 shadow-xl cursor-pointer hidden lg:block"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="font-heading font-bold mb-1">Reddit Conversations</h4>
            <p className="text-sm text-muted-foreground mb-2">12,847 discussions found today</p>
            <span className="text-xs text-green-500 font-medium">↑ 234% this week</span>
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-0 top-1/3 z-20 bg-card border border-border rounded-xl p-6 shadow-xl cursor-pointer hidden lg:block"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="font-heading font-bold mb-1">Problem Queries</h4>
            <p className="text-sm text-muted-foreground mb-2">High-intent search signals</p>
            <span className="text-xs text-blue-500 font-medium">1,247 urgent needs</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-10 left-1/4 z-10 bg-card border border-border rounded-xl p-6 shadow-xl cursor-pointer hidden lg:block"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="font-heading font-bold mb-1">Trending Topics</h4>
            <p className="text-sm text-muted-foreground mb-2">Before they go mainstream</p>
            <span className="text-xs text-green-500 font-medium">48 emerging trends</span>
          </motion.div>
        </div>

        <div className="lg:hidden grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="bg-card border border-border rounded-xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="font-heading font-bold mb-1">Reddit Conversations</h4>
            <p className="text-sm text-muted-foreground mb-2">12,847 discussions found today</p>
            <span className="text-xs text-green-500 font-medium">↑ 234% this week</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="font-heading font-bold mb-1">Problem Queries</h4>
            <p className="text-sm text-muted-foreground mb-2">High-intent search signals</p>
            <span className="text-xs text-blue-500 font-medium">1,247 urgent needs</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="font-heading font-bold mb-1">Trending Topics</h4>
            <p className="text-sm text-muted-foreground mb-2">Before they go mainstream</p>
            <span className="text-xs text-green-500 font-medium">48 emerging trends</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Join 10,000+ companies already using Rixly
          </p>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-medium">Start free trial</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
