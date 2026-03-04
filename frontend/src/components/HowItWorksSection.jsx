import { motion } from "framer-motion";
import { Search, MessageCircle, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "Step 1",
    title: "Monitor",
    description: "Track high-intent conversations across targeted subreddits.",
  },
  {
    icon: MessageCircle,
    step: "Step 2",
    title: "Engage",
    description: "AI suggests contextual replies aligned with platform rules.",
  },
  {
    icon: BarChart3,
    step: "Step 3",
    title: "Convert",
    description: "Turn conversations into demo-ready leads with tracked links and CRM sync.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            How Rixly Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Turn Reddit conversations into your sales pipeline with three simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Step Card */}
              <div className="bg-card border border-border/50 rounded-2xl p-8 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <div className="bg-primary-gradient text-white font-heading font-bold text-sm px-4 py-1.5 rounded-full">
                    {item.step}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 mt-2">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow connector (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-background border border-border/50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
