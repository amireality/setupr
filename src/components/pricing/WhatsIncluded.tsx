import { Headphones, FileText, Shield, Key } from "lucide-react";

const inclusions = [
  {
    icon: FileText,
    title: "End-to-end setup assistance",
    description: "We handle the entire setup process from start to finish",
  },
  {
    icon: Headphones,
    title: "Documentation guidance",
    description: "Clear instructions for all required documents",
  },
  {
    icon: Shield,
    title: "Direct support during setup",
    description: "Dedicated assistance throughout the process",
  },
  {
    icon: Key,
    title: "Secure handover of credentials",
    description: "All access details handed over safely to you",
  },
];

const WhatsIncluded = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">
            What's Included
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inclusions.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
