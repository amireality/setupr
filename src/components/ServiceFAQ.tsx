import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useServiceFaqs } from "@/hooks/useServiceFaqs";

interface ServiceFAQProps {
  serviceName: string;
  serviceId: string;
  category?: string;
}

// Default FAQ data based on service categories (fallback)
const faqsByCategory: Record<string, { question: string; answer: string }[]> = {
  registration: [
    { question: "How long does the registration process take?", answer: "The typical timeline is 10-15 business days from document submission. This includes government processing time, which we track and update you on regularly." },
    { question: "What documents do I need to provide?", answer: "You'll need basic identity proofs (Aadhaar, PAN), address proof, and business-specific documents. We'll send you a detailed checklist based on your specific registration type." },
    { question: "Can I track the status of my application?", answer: "Yes! You'll receive regular updates via email and WhatsApp. Our team proactively monitors your application and handles any queries from authorities." },
    { question: "What if my application gets rejected?", answer: "With our 100% compliance guarantee, rejections are extremely rare. If it happens, we'll refile at no extra cost and work directly with authorities to resolve issues." },
  ],
  compliance: [
    { question: "How do you ensure compliance accuracy?", answer: "Our team of CA-qualified experts reviews every filing before submission. We use checklists and multi-level review processes to ensure 100% accuracy." },
    { question: "What happens if I miss a compliance deadline?", answer: "We send proactive reminders well before deadlines. If you're already past a deadline, we'll help you file with minimal penalties and get you back on track." },
    { question: "Do you handle all types of business compliances?", answer: "Yes, we cover GST, Income Tax, MCA filings, MSME updates, and more. If there's a compliance you need that's not listed, reach out and we'll help." },
    { question: "Can you handle compliance for multiple entities?", answer: "Absolutely. Many clients use us for multiple companies. We offer consolidated dashboard views and preferential pricing for multi-entity management." },
  ],
  default: [
    { question: "How do I get started?", answer: "Simply click 'Proceed with this service' and fill out a quick form. Our team will reach out within 2 hours to guide you through the next steps." },
    { question: "What's included in the pricing?", answer: "Our fee covers complete end-to-end service including document preparation, government fee coordination, filing, and follow-up until completion." },
    { question: "Do you offer refunds?", answer: "Yes, we offer a satisfaction guarantee. If you're not happy with our service before we begin filing, you can request a full refund." },
    { question: "How can I contact support?", answer: "You can reach us via WhatsApp, email, or the contact form. Our team typically responds within 2 hours during business hours." },
  ],
};

const ServiceFAQ = ({ serviceName, serviceId, category = "default" }: ServiceFAQProps) => {
  const { data: dbFaqs = [] } = useServiceFaqs(serviceId);

  // Use database FAQs if available, otherwise fallback to category defaults
  const faqs = dbFaqs.length > 0
    ? dbFaqs.map(f => ({ question: f.question, answer: f.answer }))
    : (faqsByCategory[category] || faqsByCategory.default);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground">About {serviceName}</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border/50 rounded-xl px-4 data-[state=open]:bg-secondary/30 transition-colors"
          >
            <AccordionTrigger className="text-left text-sm font-medium py-4 hover:no-underline hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Still have questions?{" "}
          <Link to="/contact" className="text-primary hover:underline font-medium">Contact our team</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceFAQ;
