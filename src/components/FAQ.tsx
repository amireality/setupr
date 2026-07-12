import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const defaultFaqGroups: Record<string, { label: string; faqs: { question: string; answer: string }[] }> = {
  "getting-started": {
    label: "Getting Started",
    faqs: [
      { question: "What does Setupr actually do?", answer: "Setupr helps founders build legit, modern businesses. We handle business registration, custom websites, feature integrations like WhatsApp and payment gateways, and workflow automations. One team, done for you, so you don't juggle five vendors." },
      { question: "Do you work with founders outside India?", answer: "Yes. Our website, integrations, and automation work is delivered worldwide. Registration is supported in select regions, and we're actively expanding. Reach out and we'll tell you exactly what we can do for your country." },
      { question: "Can I start without a technical team?", answer: "That's exactly who we're built for. You bring the business idea and direction. We handle the setup, the code, the integrations, and the automations so you can focus on running the business." },
    ],
  },
  "pricing-process": {
    label: "Pricing & Process",
    faqs: [
      { question: "How does pricing work?", answer: "Pricing is transparent and shown upfront on each service page. You can pick individual services or bundle them for a better rate. No hidden charges, and no retainer traps." },
      { question: "How long does a typical project take?", answer: "Websites usually go live in 2 to 4 weeks. Integrations and automations depend on scope but most ship in 1 to 3 weeks. Registration timelines depend on the country and structure. You'll get a clear timeline before we start." },
      { question: "What do you need from me to get started?", answer: "The intake form takes about 5 minutes. You tell us what you're trying to do; we come back with a clear plan, timeline, and quote. From there we handle the rest with regular updates via email and WhatsApp." },
    ],
  },
  "after-setup": {
    label: "After Launch",
    faqs: [
      { question: "Can Setupr handle everything under one roof?", answer: "Yes. Registration, website, professional email, payment gateway, CRM integration, WhatsApp Business, AI chatbot, workflow automations. One team for all of it means fewer handoffs and faster launches." },
      { question: "Do you offer ongoing support after launch?", answer: "Yes. We offer maintenance, iteration, and support plans so your site, integrations, and automations stay reliable and keep evolving with your business." },
      { question: "What if I need something India-specific like GST?", answer: "We still support the full India stack (GST, MSME, PAN, trademark, Indian company types). It's not front-and-center on the site anymore, but you can request any of it and we'll set it up." },
    ],
  },
};

const FAQ = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");

  const getSetting = (key: string, fallback: string) =>
    settings.find((s) => s.key === key)?.value || fallback;

  const faqTitle = getSetting("homepage_faq_title", "Frequently Asked Questions");

  // Build FAQ groups from DB JSON or use defaults
  const faqGroups: Record<string, { label: string; faqs: { question: string; answer: string }[] }> = {};
  
  for (const [groupKey, defaultGroup] of Object.entries(defaultFaqGroups)) {
    const dbKey = `homepage_faq_${groupKey.replace("-", "_")}`;
    const dbValue = settings.find((s) => s.key === dbKey)?.value;
    
    let faqs = defaultGroup.faqs;
    if (dbValue) {
      try {
        const parsed = JSON.parse(dbValue);
        if (Array.isArray(parsed) && parsed.length > 0) faqs = parsed;
      } catch { /* fallback */ }
    }
    
    faqGroups[groupKey] = { label: defaultGroup.label, faqs };
  }

  return (
    <section className="py-20 md:py-28 relative bg-secondary/20 border-t border-primary/20 overflow-hidden">
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
            {faqTitle.includes(" ") ? (
              <>
                {faqTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="gradient-text">{faqTitle.split(" ").slice(-1)[0]}</span>
              </>
            ) : (
              <span className="gradient-text">{faqTitle}</span>
            )}
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
