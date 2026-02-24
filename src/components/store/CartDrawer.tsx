import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatStorePrice } from "@/hooks/useStoreProducts";
import CartItem from "@/components/store/CartItem";
import { Link } from "react-router-dom";
import { useStoreAuth } from "@/hooks/useStoreAuth";

interface CartDrawerProps {
  children?: React.ReactNode;
}

const CartDrawer = ({ children }: CartDrawerProps) => {
  const { user } = useStoreAuth();
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();

  const trigger = children || (
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {!user ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Sign in to use your cart</p>
            <Button asChild>
              <Link to="/store/login">Sign In</Link>
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" asChild>
              <Link to="/store/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(id, qty) => updateQuantity.mutate({ id, quantity: qty })}
                  onRemove={(id) => removeFromCart.mutate(id)}
                />
              ))}
            </div>

            <div className="border-t border-border/50 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{formatStorePrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-semibold">₹{formatStorePrice(Math.round(subtotal * 0.18))}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{formatStorePrice(Math.round(subtotal * 1.18))}</span>
              </div>
              <Button className="w-full" asChild>
                <Link to="/store/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
