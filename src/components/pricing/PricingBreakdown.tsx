import { IndianRupee } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  getServiceById, 
  formatPrice, 
  formatGovtFee,
  calculateTotal,
  type ServiceId 
} from "@/data/services";

interface PricingBreakdownProps {
  services: ServiceId[];
}

const PricingBreakdown = ({ services }: PricingBreakdownProps) => {
  const total = calculateTotal(services);
  const hasActuals = services.some(id => {
    const service = getServiceById(id);
    return service?.govt_or_third_party_fee === "actuals";
  });

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">
            Pricing breakdown
          </h2>
          
          <div className="glass-card rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground">Service</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Setupr Fee</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Govt / Other</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((serviceId) => {
                  const service = getServiceById(serviceId);
                  if (!service) return null;
                  return (
                    <TableRow key={serviceId} className="border-border/50 hover:bg-secondary/30">
                      <TableCell className="text-foreground">{service.service_name}</TableCell>
                      <TableCell className="text-right">
                        <span className="flex items-center justify-end gap-1 text-foreground">
                          <IndianRupee className="w-4 h-4" />
                          {formatPrice(service.setupr_fee_inr)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {formatGovtFee(service.govt_or_third_party_fee)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter className="bg-primary/5 border-t border-border/50">
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-semibold text-foreground">Total (Setupr fees)</TableCell>
                  <TableCell className="text-right">
                    <span className="flex items-center justify-end gap-1 font-bold text-lg text-primary">
                      <IndianRupee className="w-5 h-5" />
                      {formatPrice(total)}
                    </span>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <p className="mt-5 text-sm text-muted-foreground text-center">
            No hidden charges. {hasActuals && "Government and third-party fees charged at actuals."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingBreakdown;
