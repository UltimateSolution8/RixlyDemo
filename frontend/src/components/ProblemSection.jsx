import { motion } from "framer-motion";
import { MessageCircle, XCircle, TrendingUp } from "lucide-react";

export const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Cold outreach is saturated. <span className="text-primary">Social conversations are not.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Buyers openly discuss problems on Reddit every day. Most companies never see those conversations — or see them too late. Rixly surfaces them in real time.
          </p>
        </motion.div>

        {/* Visual comparison */}
        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-2 md:gap-3 items-stretch">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border/50 rounded-2xl p-5 md:p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-4">Cold Outreach</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <span>Low response rates (1-3%)</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <span>Buyers ignore cold messages</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <span>High unsubscribe rates</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <span>No warm introduction</span>
              </li>
            </ul>
          </motion.div>

          {/* Gap - Minimal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center px-1"
          >
            <div className="text-center">
              <div className="text-2xl">→</div>
            </div>
          </motion.div>

          {/* New Way */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-primary/50 rounded-2xl p-5 md:p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 relative z-10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-4 relative z-10">Rixly + Reddit</h3>
            <ul className="space-y-3 text-muted-foreground relative z-10">
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>High-intent conversations</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>Buyers actively seeking solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>Value-first engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span>Build trust before selling</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
