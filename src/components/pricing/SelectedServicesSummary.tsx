import { CheckCircle2 } from "lucide-react";
import type { ServiceId } from "@/pages/Services";

interface SelectedServicesSummaryProps {
  services: ServiceId[];
}

const serviceNames: Record<ServiceId, string> = {
  "proprietorship": "Proprietorship Registration",
  "llp": "LLP Registration",
  "pvt-ltd": "Private Limited Registration",
  "gst": "GST Registration",
  "msme": "MSME (Udyam) Registration",
  "pan-tan": "PAN / TAN Assistance",
  "website": "Professional Website",
  "domain-hosting": "Domain & Hosting Setup",
  "email": "Business Email Setup",
  "brand-identity": "Basic Brand Identity",
  "social-media": "Social Media Profile Setup",
  "google-business": "Google Business Profile Setup",
  "trust-assets": "Basic Trust Assets",
};

const SelectedServicesSummary = ({ services }: SelectedServicesSummaryProps) => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">
            Selected Services
          </h2>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <ul className="space-y-3">
              {services.map((serviceId) => (
                <li key={serviceId} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{serviceNames[serviceId]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedServicesSummary;
