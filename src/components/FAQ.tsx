import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const faqGroups = {
  "getting-started": {
    label: "Getting Started",
    faqs: [
      {
        question: "How long does company registration take?",
        answer:
          "Company registration typically takes 7-15 working days depending on the type of entity. Pvt Ltd registration usually takes 10-15 days, LLP takes 7-10 days, and Proprietorship/OPC can be completed within a week. We keep you updated throughout the process.",
      },
      {
        question: "What documents do I need for registration?",
        answer:
          "The basic documents required are: PAN card, Aadhaar card, passport-size photographs, address proof (electricity bill/rent agreement), and bank statement. For Pvt Ltd/LLP, you'll also need Digital Signature Certificates (DSC) which we help you obtain.",
      },
      {
        question: "Can I choose only specific services I need?",
        answer:
          "Of course! Our services are modular - you can pick exactly what you need. Whether it's just company registration, or a complete package with GST, website, and digital presence setup, you have full control over your selection.",
      },
    ],
  },
  "pricing-process": {
    label: "Pricing & Process",
    faqs: [
      {
        question: "What's the difference between Setupr fees and government fees?",
        answer:
          "Setupr fees cover our professional services including document preparation, filing, follow-ups, and expert guidance. Government fees are mandatory charges payable to regulatory authorities like MCA, GST department, etc. Both are clearly displayed in our pricing with no hidden costs.",
      },
      {
        question: "Can I track my application status?",
        answer:
          "Yes! Once you submit your intake form, our team will keep you updated via WhatsApp and email at every stage. You'll receive notifications when documents are filed, when approvals are received, and when your registration is complete.",
      },
      {
        question: "Is my data secure with Setupr?",
        answer:
          "Yes, your data security is our priority. We use encrypted connections, secure document storage, and follow strict privacy protocols. Your documents are only shared with relevant government authorities as required for registration.",
      },
    ],
  },
  "after-setup": {
    label: "After Setup Support",
    faqs: [
      {
        question: "What if I need help after my business is set up?",
        answer:
          "We offer ongoing support for compliance, renewals, and additional services. Whether you need GST filing, annual compliance, or want to add new services like trademark registration, our team is here to help. Many clients continue working with us for years.",
      },
      {
        question: "Do you handle renewals and annual compliance?",
        answer:
          "Absolutely! We provide reminders and assistance for all renewals including MSME registration, GST annual returns, company annual filings, and more. Our proactive approach ensures you never miss a deadline.",
      },
    ],
  },
};

const FAQ = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wide text-primary bg-primary/10 rounded-full border border-primary/20">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1 rounded-xl">
              {Object.entries(faqGroups).map(([key, group]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(faqGroups).map(([key, group]) => (
              <TabsContent key={key} value={key}>
                <Accordion type="single" collapsible className="space-y-4">
                  {group.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="glass-card rounded-xl px-6 border-border/50 data-[state=open]:border-primary/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium py-5 hover:no-underline hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
