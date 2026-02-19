import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const CTASection = () => {
  return (
    <section
      id="cta"
      className="py-24 md:py-32 relative"
      data-testid="cta-section"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-primary-gradient opacity-[0.08]" />
          <div className="absolute inset-0 bg-white/80" />

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              data-testid="cta-title"
            >
              Ready to 3x Your Leads?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Join 10,000+ businesses using Rixly to transform their lead
              generation. Start your free trial today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="rounded-full font-medium text-lg px-8 glow-primary glow-primary-hover btn-press"
                data-testid="cta-get-started"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-medium text-lg px-8 btn-press"
                data-testid="cta-book-demo"
              >
                Book a Demo
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              No credit card required · 14-day free trial · Cancel anytime
            </motion.p>
          </div>

          {/* Decorative glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};
