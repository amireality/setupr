import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/hooks/useCart";
import { formatStorePrice } from "@/hooks/useStoreProducts";
import { getVendorLogo } from "@/lib/vendorLogos";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const product = item.product;
  const plan = item.plan;
  const price = plan?.price_inr ?? product?.base_price_inr ?? 0;
  const logoUrl = product ? getVendorLogo(product.vendor, product.vendor_logo_url) : null;

  return (
    <div className="flex gap-4 py-4 border-b border-border/50 last:border-0">
      <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center p-2 shrink-0">
        {logoUrl ? (
          <img src={logoUrl} alt={product?.vendor} className="w-full h-full object-contain" />
        ) : (
          <span className="text-primary font-bold">{product?.vendor?.charAt(0)}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">{product?.name}</h4>
        {plan && <p className="text-xs text-muted-foreground">{plan.plan_name}</p>}
        <p className="text-sm font-semibold text-foreground mt-1">₹{formatStorePrice(price)}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
          <Minus className="w-3 h-3" />
        </Button>
        <span className="text-sm w-6 text-center">{item.quantity}</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          <Plus className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onRemove(item.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
