import { IndianRupee } from "lucide-react";
import type { ServiceId } from "@/pages/Services";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PricingBreakdownProps {
  services: ServiceId[];
}

const servicePricing: Record<ServiceId, { name: string; price: number }> = {
  "proprietorship": { name: "Proprietorship Registration", price: 2999 },
  "llp": { name: "LLP Registration", price: 7999 },
  "pvt-ltd": { name: "Private Limited Registration", price: 12999 },
  "gst": { name: "GST Registration", price: 1999 },
  "msme": { name: "MSME (Udyam) Registration", price: 999 },
  "pan-tan": { name: "PAN / TAN Assistance", price: 1499 },
  "website": { name: "Professional Website", price: 14999 },
  "domain-hosting": { name: "Domain & Hosting Setup", price: 2999 },
  "email": { name: "Business Email Setup", price: 1999 },
  "brand-identity": { name: "Basic Brand Identity", price: 4999 },
  "social-media": { name: "Social Media Profile Setup", price: 2499 },
  "google-business": { name: "Google Business Profile Setup", price: 1499 },
  "trust-assets": { name: "Basic Trust Assets", price: 3999 },
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

const PricingBreakdown = ({ services }: PricingBreakdownProps) => {
  const total = services.reduce((sum, serviceId) => {
    return sum + (servicePricing[serviceId]?.price || 0);
  }, 0);

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">
            Pricing Breakdown
          </h2>
          
          <div className="glass-card rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground">Service</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">One-time Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((serviceId) => {
                  const service = servicePricing[serviceId];
                  if (!service) return null;
                  return (
                    <TableRow key={serviceId} className="border-border/50 hover:bg-secondary/30">
                      <TableCell className="text-foreground">{service.name}</TableCell>
                      <TableCell className="text-right">
                        <span className="flex items-center justify-end gap-1 text-foreground">
                          <IndianRupee className="w-4 h-4" />
                          {formatPrice(service.price)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter className="bg-primary/5 border-t border-border/50">
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-semibold text-foreground">Total</TableCell>
                  <TableCell className="text-right">
                    <span className="flex items-center justify-end gap-1 font-bold text-lg text-primary">
                      <IndianRupee className="w-5 h-5" />
                      {formatPrice(total)}
                    </span>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <p className="mt-5 text-sm text-muted-foreground text-center">
            No hidden charges. No recurring fees unless stated.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingBreakdown;
