import { X, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DbService, DbCategory } from "@/hooks/useServices";
import { formatPrice } from "@/hooks/useServices";
import { cn } from "@/lib/utils";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: string[];
  services: DbService[];
  categories: DbCategory[];
}

const CompareModal = ({
  isOpen,
  onClose,
  compareList,
  services,
  categories,
}: CompareModalProps) => {
  const servicesToCompare = compareList
    .map((id) => services.find((s) => s.service_id === id))
    .filter(Boolean) as DbService[];

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.category_id === categoryId)?.title || categoryId;
  };

  const attributes = [
    { key: "category", label: "Category", render: (s: DbService) => getCategoryName(s.category) },
    { key: "sub_category", label: "Sub-category", render: (s: DbService) => s.sub_category },
    { key: "setupr_fee_inr", label: "Setupr Fee", render: (s: DbService) => (
      <div>
        From ₹{formatPrice(s.setupr_fee_inr)}
        <div className="text-[10px] text-muted-foreground mt-0.5">Final quote shared after a quick call</div>
      </div>
    ) },
    { key: "govt_or_third_party_fee", label: "Govt/Other Fees", render: (s: DbService) => s.govt_or_third_party_fee === "0" ? "Nil" : s.govt_or_third_party_fee },
    { key: "delivery_type", label: "Delivery", render: (s: DbService) => s.delivery_type === "done-for-you" ? "Done for you" : "Coordination" },
    { key: "who_its_for", label: "Best for", render: (s: DbService) => s.who_its_for },
    { key: "description_short", label: "Description", render: (s: DbService) => s.description_short },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Compare Services</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-40">
                  Feature
                </th>
                {servicesToCompare.map((service) => (
                  <th
                    key={service.service_id}
                    className="text-left p-4 min-w-[200px]"
                  >
                    <div className="space-y-1">
                      <h3 className="font-display font-semibold text-foreground">
                        {service.service_name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-normal">
                        {service.description_short}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr, idx) => (
                <tr
                  key={attr.key}
                  className={cn(
                    "border-b border-border/20",
                    idx % 2 === 0 ? "bg-secondary/10" : ""
                  )}
                >
                  <td className="p-4 text-sm font-medium text-muted-foreground">
                    {attr.label}
                  </td>
                  {servicesToCompare.map((service) => (
                    <td key={service.service_id} className="p-4 text-sm">
                      {attr.render(service)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
