import { ShieldCheck } from "lucide-react";

const TrustNote = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl shadow-card">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Quality You Can Trust
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We take pride in doing things right. Every registration, every document, 
                every setup is handled with care and attention to detail. Your business 
                deserves a proper foundation, and we're here to make that happen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustNote;
