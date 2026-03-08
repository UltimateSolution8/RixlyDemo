import { motion } from "framer-motion";
import { Users, TrendingUp, Target } from "lucide-react";

export const TestimonialsSection = () => {
  const stats = [
    { icon: Users, value: "50+", label: "Active Users" },
    { icon: TrendingUp, value: "3x", label: "More Leads" },
    { icon: Target, value: "95%", label: "Accuracy" },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 relative overflow-hidden"
      data-testid="testimonials-section"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            data-testid="testimonials-title"
          >
            Trusted by growth teams across SaaS, Agencies & Web3
          </h2>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-4"
              data-testid={`hero-stat-${index}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-heading font-bold text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
