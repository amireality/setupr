import { Link } from "react-router-dom";
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
        question: "How do I register a business in India?",
        answer: (
          <>
            To register a business in India, you need to choose a business structure (Proprietorship, LLP, or Private Limited), obtain a Digital Signature Certificate (DSC), apply for Director Identification Number (DIN) if needed, reserve your company name, and file incorporation documents with MCA. Setupr handles all these steps for you — you just provide basic documents like PAN, Aadhaar, and address proof.{" "}
            <Link to="/services/pvt-ltd" className="text-primary hover:underline">Learn more about Pvt Ltd registration →</Link>
          </>
        ),
      },
      {
        question: "Do freelancers need GST registration?",
        answer: (
          <>
            Yes, if your annual turnover exceeds ₹20 lakh (₹10 lakh for special category states) or if you provide services to clients outside India. Even below this threshold, voluntary GST registration helps you look professional, claim input tax credits, and work with larger clients who require GST invoices.{" "}
            <Link to="/services/gst" className="text-primary hover:underline">Get GST registration →</Link>
          </>
        ),
      },
      {
        question: "Can I start a business without a CA or lawyer?",
        answer: (
          <>
            Yes. While CAs and lawyers are helpful for complex matters, basic business registration, GST filing, and compliance can be handled without them. Setupr provides expert guidance and handles all documentation, filings, and follow-ups — so you get professional-grade setup without expensive retainers.{" "}
            <Link to="/blog/freelancer-to-registered-business-guide" className="text-primary hover:underline">Read our freelancer guide →</Link>
          </>
        ),
      },
    ],
  },
  "pricing-process": {
    label: "Pricing & Process",
    faqs: [
      {
        question: "What is the cost of company registration in India?",
        answer: (
          <>
            The cost varies by business type. Private Limited registration typically costs ₹7,000-15,000 (Setupr fee) plus ₹5,000-10,000 government fees. LLP registration costs ₹5,000-10,000 plus government fees. Proprietorship is the most affordable at ₹1,500-3,000. Setupr shows all fees upfront with no hidden charges.{" "}
            <Link to="/services" className="text-primary hover:underline">View all services & pricing →</Link>
          </>
        ),
      },
      {
        question: "How long does it take to register a Private Limited company?",
        answer:
          "Private Limited company registration takes 10-15 working days from document submission. This includes DSC issuance (1-2 days), name approval (2-3 days), and incorporation certificate (5-7 days). LLP takes 7-10 days, while Proprietorship with MSME/GST can be done in 3-5 days. Setupr keeps you updated at every step via WhatsApp and email.",
      },
      {
        question: "What documents do I need to register a company?",
        answer:
          "Basic documents include: PAN card, Aadhaar card, passport-size photographs, address proof (electricity bill/rent agreement within 2 months), and a bank statement. For Pvt Ltd/LLP, you'll also need Digital Signature Certificates which Setupr helps you obtain. We provide a complete checklist based on your chosen business structure.",
      },
    ],
  },
  "after-setup": {
    label: "After Registration",
    faqs: [
      {
        question: "What services are required after company registration?",
        answer: (
          <>
            After registration, you'll need: GST registration (if applicable), professional tax registration, opening a current bank account, MSME/Udyam registration (for benefits), and setting up your digital presence (website, business email, Google listing). For companies, annual ROC filings and compliance are mandatory.{" "}
            <Link to="/blog/compliance-checklist-after-company-registration" className="text-primary hover:underline">View compliance checklist →</Link>
          </>
        ),
      },
      {
        question: "Can Setupr handle both legal setup and digital presence?",
        answer: (
          <>
            Yes. Setupr provides end-to-end business setup — from legal registration (company formation, GST, MSME) to digital presence (professional website, business email, domain, Google Business Profile). This means one partner for everything instead of coordinating with multiple vendors.{" "}
            <Link to="/services/website" className="text-primary hover:underline">Explore website setup →</Link>
          </>
        ),
      },
      {
        question: "Do you provide ongoing compliance support after registration?",
        answer:
          "Absolutely. We provide reminders and assistance for all renewals including GST returns, company annual filings (ROC), professional tax, and MSME updates. Our proactive approach ensures you never miss a deadline or face penalties. Many clients continue working with us for years for their compliance needs.",
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
                        {typeof faq.answer === "string" ? faq.answer : faq.answer}
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
