import { Headphones, FileText, Shield, Key } from "lucide-react";

const inclusions = [
  {
    icon: FileText,
    title: "Full setup handling",
    description: "We manage the entire process from start to finish",
  },
  {
    icon: Headphones,
    title: "Document guidance",
    description: "Clear instructions for what you need to provide",
  },
  {
    icon: Shield,
    title: "Direct support",
    description: "Reach us with questions throughout the process",
  },
  {
    icon: Key,
    title: "Secure handover",
    description: "All credentials and access handed over to you safely",
  },
];

const WhatsIncluded = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">
            What's included
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
