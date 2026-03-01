import { motion } from "framer-motion";
import { Building2, Briefcase, Coins, ArrowRight, TrendingUp, Target, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const useCases = [
  {
    id: "saas",
    icon: Building2,
    title: "For SaaS",
    subtitle: "Find buyers comparing alternatives before they decide",
    color: "bg-blue-500",
    stats: [
      { label: "Avg. Deal Size", value: "$24,000" },
      { label: "Response Rate", value: "34%" },
      { label: "Sales Cycle", value: "-45%" },
    ],
    features: [
      "Track competitors mentioned in discussions",
      "Identify evaluation-stage prospects",
      "Real-time alt-tech comparison alerts",
      "Feature gap opportunity detection",
    ],
  },
  {
    id: "agencies",
    icon: Briefcase,
    title: "For Agencies",
    subtitle: "Offer Reddit lead generation as a high-margin service",
    color: "bg-purple-500",
    stats: [
      { label: "Client Retention", value: "92%" },
      { label: "Lead Quality", value: "4.8/5" },
      { label: "Margin", value: "78%" },
    ],
    features: [
      "White-label reporting dashboard",
      "Industry-specific lead filters",
      "Competitor mention monitoring",
      "Campaign performance analytics",
    ],
  },
  {
    id: "web3",
    icon: Coins,
    title: "For Web3",
    subtitle: "Monitor token & project discussions before they trend",
    color: "bg-orange-500",
    stats: [
      { label: "Early Alerts", value: "89%" },
      { label: "Sentiment Score", value: "Real-time" },
      { label: "Risk Detection", value: "24/7" },
    ],
    features: [
      "Token mentions & sentiment analysis",
      "Founder/Dev activity tracking",
      "FUD & FOMO detection",
      "Whale movement alerts",
    ],
  },
];

export const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full bg-primary blur-[150px]" />
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
            USE CASES
          </Badge>
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Built for <span className="text-primary">every industry</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're SaaS, an agency, or in Web3, Rixly helps you find high-intent leads where they gather.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${useCase.color.replace('bg-', 'bg-')}`} />

              <div className="p-8">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${useCase.color} flex items-center justify-center mb-6`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-heading text-2xl font-bold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground mb-6">{useCase.subtitle}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {useCase.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="font-heading font-bold text-lg text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <TrendingUp className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${useCase.color} opacity-10 rounded-bl-full`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Not sure which plan fits your needs?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Pricing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
