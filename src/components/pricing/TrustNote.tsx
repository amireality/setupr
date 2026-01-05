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
                Done right, every time
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every registration and document is handled carefully. 
                Your business gets a proper foundation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustNote;
