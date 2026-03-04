import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is Reddit good for B2B lead generation?",
    answer: "Yes. B2B buyers openly discuss product challenges, compare alternatives, and ask for recommendations inside niche subreddits. Monitoring those conversations lets you engage at the moment of intent — no cold outreach, no paid ads.",
  },
  {
    question: "How does Reddit lead generation work?",
    answer: "It works by tracking targeted subreddits and keywords for high-intent discussions. When users mention problems your product solves, you respond with helpful, contextual replies that naturally drive interest and demo requests.",
  },
  {
    question: "Will using Rixly get my Reddit account banned?",
    answer: "No. Rixly focuses on compliant, value-first engagement aligned with subreddit rules. We don't do mass automation, spam, or abusive scraping. You post from your own account with thoughtful, human replies. That's what keeps your account safe.",
  },
  {
    question: "What makes Reddit leads higher intent than cold outreach?",
    answer: "Because the buyer starts the conversation. On Reddit, users are actively describing their problems and asking for solutions. You're responding to existing demand — not interrupting someone who didn't ask to hear from you.",
  },
  {
    question: "How quickly can I start seeing results?",
    answer: "You'll see relevant conversations surfaced within minutes of setup. Qualified leads typically appear within 2-4 weeks depending on your niche, engagement quality, and follow-up process.",
  },
  {
    question: "Do I need technical skills to use Rixly?",
    answer: "No. Setup takes under 2 minutes — select your target subreddits, set keywords, and choose engagement preferences. Rixly surfaces relevant conversations automatically. You just reply.",
  },
  {
    question: "How is Rixly different from scraping tools?",
    answer: "Scraping tools export raw data — usernames, post lists, bulk exports. Rixly identifies real buyer intent inside conversations and helps you engage intelligently with AI-suggested replies. The focus is on conversion-ready discussions, not data dumps.",
  },
  {
    question: "Does this work for SaaS companies?",
    answer: "Yes. SaaS buyers frequently compare alternatives and ask for recommendations inside Reddit communities. Monitoring these discussions lets you engage before they finalize a purchase decision — when your input matters most.",
  },
  {
    question: "Can agencies use Rixly for their clients?",
    answer: "Yes. Agencies can monitor niche conversations across multiple client verticals and offer social lead generation as a structured, repeatable service. It's a high-margin offering with minimal overhead.",
  },
  {
    question: "How does Rixly identify buyer intent?",
    answer: "Rixly monitors keyword signals, problem statements, alternative comparisons, and recommendation requests inside discussions. These patterns indicate users who are actively evaluating solutions — not just browsing.",
  },
  {
    question: "Is Reddit lead generation better than LinkedIn?",
    answer: "They serve different purposes. Reddit reveals raw, unfiltered buying intent in niche communities. LinkedIn provides professional targeting and direct outreach. Combining both creates the strongest multi-platform lead generation strategy. Rixly supports Reddit now, with LinkedIn launching soon.",
  },
  {
    question: "How do I track ROI from Reddit leads?",
    answer: "Rixly lets you track which conversations, subreddits, and replies drive results. Use tracked links and CRM integrations to attribute demo bookings and pipeline revenue to specific Reddit engagements.",
  },
  {
    question: "What types of companies benefit most from Rixly?",
    answer: "B2B SaaS companies, growth agencies, and Web3 teams see the strongest results — because their buyers actively research tools and discuss solutions in public forums before making decisions.",
  },
  {
    question: "Is social media lead generation scalable?",
    answer: "Yes. With structured monitoring and AI-assisted engagement, you can cover dozens of subreddits and hundreds of conversations without it becoming a full-time job. Most users spend 15-20 minutes per day.",
  },
  {
    question: "Is Rixly only for Reddit?",
    answer: "Currently, Reddit monitoring is live. LinkedIn integration is launching soon, followed by Twitter. Rixly is evolving into a multi-platform conversation intelligence platform for social lead generation across all major networks.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-muted/30" itemscope itemtype="https://schema.org/FAQPage">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4" itemprop="headline">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground" itemprop="description">
            Everything you need to know about Rixly and Reddit lead generation.
          </p>
        </motion.div>

        <div className="space-y-4" itemprop="mainEntity" itemscope itemType="https://schema.org/Question">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border/50 rounded-2xl bg-card overflow-hidden"
              itemprop="acceptedAnswer" 
              itemScope 
              itemType="https://schema.org/Answer"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                aria-expanded={openIndex === index}
                aria-label={faq.question}
                itemprop="name"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed" itemprop="text">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
