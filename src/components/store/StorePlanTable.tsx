import { StoreProductPlan, formatStorePrice } from "@/hooks/useStoreProducts";
import { useCart } from "@/hooks/useCart";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StorePlanTableProps {
  plans: StoreProductPlan[];
  productId?: string;
}

const StorePlanTable = ({ plans, productId }: StorePlanTableProps) => {
  if (plans.length === 0) return null;

  const { user } = useStoreAuth();
  const { addToCart } = useCart();

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      window.location.href = "/store/login";
      return;
    }
    if (productId) {
      addToCart.mutate({ productId, planId });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const billingLabel = plan.billing_cycle === "monthly" ? "/mo" : plan.billing_cycle === "annual" ? "/yr" : "";
        const features = Array.isArray(plan.features) ? plan.features : [];

        return (
          <div
            key={plan.id}
            className="glass-card rounded-2xl p-6 flex flex-col"
          >
            <h3 className="font-display font-semibold text-lg mb-1">{plan.plan_name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold">₹{formatStorePrice(plan.price_inr)}</span>
              <span className="text-sm text-muted-foreground">{billingLabel}</span>
            </div>

            {plan.seat_minimum > 1 && (
              <p className="text-xs text-muted-foreground mb-4">
                Min {plan.seat_minimum} seats
                {plan.seat_maximum && ` • Max ${plan.seat_maximum} seats`}
              </p>
            )}

            {features.length > 0 && (
              <ul className="space-y-2 mb-6 flex-1">
                {features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{String(feat)}</span>
                  </li>
                ))}
              </ul>
            )}

            <Button
              variant="outline"
              className="w-full mt-auto"
              onClick={() => handleSelectPlan(plan.id)}
              disabled={addToCart.isPending}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Select Plan
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default StorePlanTable;
