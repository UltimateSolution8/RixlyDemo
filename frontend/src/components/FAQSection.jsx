import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is Reddit good for B2B lead generation?",
    answer: "Yes. Many B2B buyers openly discuss product challenges, alternatives, and recommendations inside niche subreddits. Monitoring those conversations allows timely, value-first engagement that converts into qualified leads without relying on cold outreach or paid ads.",
  },
  {
    question: "How does Reddit lead generation work?",
    answer: "Reddit lead generation works by tracking targeted subreddits and keywords for high-intent discussions. When users mention problems or tools related to your solution, you engage with helpful, contextual responses that naturally drive demo interest or direct inquiries.",
  },
  {
    question: "Will using Rixly get my Reddit account banned?",
    answer: "No. Rixly focuses on compliant, value-first engagement aligned with subreddit rules. It does not promote mass spam, automation blasting, or abusive scraping practices. The goal is sustainable lead generation, not short-term hacks.",
  },
  {
    question: "What makes Reddit leads higher intent than cold outreach?",
    answer: "Reddit leads are often higher intent because users initiate discussions about real problems. Unlike cold outreach, you are responding to existing demand rather than interrupting someone who may not be actively looking for a solution.",
  },
  {
    question: "How quickly can I start seeing results?",
    answer: "Most teams begin identifying relevant conversations within days of setup. Qualified leads typically appear within 2 to 4 weeks depending on targeting, engagement quality, and follow-up process.",
  },
  {
    question: "Is Rixly only for Reddit?",
    answer: "Currently, Reddit monitoring is live. LinkedIn integration is launching soon, followed by Twitter. Rixly is evolving into a multi-platform conversation intelligence system designed for social lead generation across major networks.",
  },
  {
    question: "How is this different from scraping tools?",
    answer: "Scraping tools collect raw data without context. Rixly identifies real buyer intent inside conversations and helps you engage intelligently. The focus is conversion-ready discussions rather than exporting lists of usernames or posts.",
  },
  {
    question: "Does this work for SaaS companies?",
    answer: "Yes. SaaS buyers frequently compare alternatives and request recommendations inside Reddit communities. Monitoring these discussions allows timely engagement before purchase decisions are finalized.",
  },
  {
    question: "Can agencies use Rixly for clients?",
    answer: "Yes. Agencies can monitor niche conversations for multiple clients and offer social lead generation as a structured, repeatable service. Rixly provides organized workflows rather than manual searching.",
  },
  {
    question: "How do you track ROI from Reddit leads?",
    answer: "ROI is tracked by attributing demo bookings and pipeline revenue to specific conversations or campaigns. Tracked links and CRM integrations help measure which engagements convert into qualified opportunities.",
  },
  {
    question: "Is Reddit lead generation better than LinkedIn?",
    answer: "Both platforms have advantages. Reddit often reveals unfiltered buying intent in niche communities, while LinkedIn provides professional targeting. Combining both creates a stronger multi-platform lead generation strategy.",
  },
  {
    question: "Do I need technical skills to use Rixly?",
    answer: "No. Setup involves selecting target subreddits, keywords, and engagement preferences. The platform automatically surfaces relevant conversations, reducing the need for manual searching.",
  },
  {
    question: "How does Rixly identify buyer intent?",
    answer: "Rixly monitors keyword signals, problem statements, alternative comparisons, and recommendation requests inside discussions. These patterns indicate users who are actively evaluating solutions.",
  },
  {
    question: "Is social media lead generation scalable?",
    answer: "Yes. With structured monitoring and engagement workflows, social lead generation scales across multiple communities without relying on paid ads or mass cold messaging.",
  },
  {
    question: "What types of companies benefit most from Rixly?",
    answer: "B2B SaaS companies, agencies, and Web3 teams benefit most because their buyers frequently research tools and discuss solutions in public forums before making decisions.",
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
