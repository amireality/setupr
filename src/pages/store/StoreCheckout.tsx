import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useStoreAuth, useCustomerProfile } from "@/hooks/useStoreAuth";
import { useCart } from "@/hooks/useCart";
import { formatStorePrice } from "@/hooks/useStoreProducts";
import { supabase } from "@/integrations/supabase/client";
import StoreNavbar from "@/components/store/StoreNavbar";
import StoreFooter from "@/components/store/StoreFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const StoreCheckout = () => {
  const { user, loading } = useStoreAuth();
  const { data: profile } = useCustomerProfile(user?.id);
  const { items, subtotal, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/store/login");
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setCompanyName(profile.company_name || "");
      setGstin(profile.gstin || "");
      setBillingAddress(profile.billing_address || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  // Preload Razorpay script
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handlePlaceOrder = async () => {
    if (!companyName.trim()) {
      toast({ title: "Company name is required", variant: "destructive" });
      return;
    }
    if (!billingAddress.trim()) {
      toast({ title: "Billing address is required", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Failed to load payment gateway");

      // Create order via edge function
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { companyName, gstin, billingAddress, phone },
      });

      if (error) throw new Error(error.message || "Failed to create order");
      if (data?.error) throw new Error(data.error);

      // Open Razorpay checkout
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Setupr Store",
        description: `Order ${data.orderNumber}`,
        order_id: data.razorpayOrderId,
        prefill: data.prefill,
        theme: { color: "#6366f1" },
        handler: async (response: any) => {
          try {
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              "verify-razorpay-payment",
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  order_id: data.orderId,
                },
              }
            );

            if (verifyError || verifyData?.error) {
              throw new Error("Payment verification failed");
            }

            setPaymentSuccess(true);
            setOrderNumber(verifyData?.orderNumber || data.orderNumber);
            clearCart.mutate();
          } catch (err: any) {
            toast({
              title: "Payment verification failed",
              description: "Please contact support with your payment ID: " + response.razorpay_payment_id,
              variant: "destructive",
            });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast({ title: "Payment cancelled", description: "Your order has been saved. You can retry payment from your dashboard." });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        setIsProcessing(false);
        toast({
          title: "Payment failed",
          description: response.error?.description || "Please try again",
          variant: "destructive",
        });
      });
      rzp.open();
    } catch (err: any) {
      setIsProcessing(false);
      toast({
        title: "Something went wrong",
        description: err.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  // Payment success view
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Order Successful | Setupr Store</title>
        </Helmet>
        <StoreNavbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 md:px-6 max-w-lg text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mb-6"
            >
              <CheckCircle className="w-20 h-20 text-primary mx-auto" />
            </motion.div>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-2">Order #{orderNumber}</p>
            <p className="text-sm text-muted-foreground mb-8">
              Your order has been confirmed. You'll receive an email with your license details shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/store/dashboard">View Orders</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/store/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        <StoreFooter />
      </div>
    );
  }

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout | Setupr Store</title>
      </Helmet>
      <StoreNavbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <Link
            to="/store/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

          {itemCount === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild>
                <Link to="/store/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Billing Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-3 space-y-6"
              >
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-display font-semibold text-lg mb-4">Billing Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your company name" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gstin">GSTIN (Optional)</Label>
                        <Input id="gstin" value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="22AAAAA0000A1Z5" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Billing Address *</Label>
                      <Textarea id="address" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} placeholder="Full billing address" rows={3} />
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-display font-semibold text-lg mb-4">Payment Method</h2>
                  <p className="text-sm text-muted-foreground">Secure payment powered by Razorpay. Pay via UPI, cards, net banking, or wallets.</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    All payments are secured with 256-bit encryption
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="glass-card rounded-2xl p-6 sticky top-24">
                  <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="min-w-0 mr-2">
                          <p className="truncate text-foreground">{item.product?.name}</p>
                          {item.plan && <p className="text-xs text-muted-foreground">{item.plan.plan_name}</p>}
                          {item.quantity > 1 && <p className="text-xs text-muted-foreground">×{item.quantity}</p>}
                        </div>
                        <span className="shrink-0 font-medium">
                          ₹{formatStorePrice((item.plan?.price_inr ?? item.product?.base_price_inr ?? 0) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{formatStorePrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span>₹{formatStorePrice(tax)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border/50">
                      <span>Total</span>
                      <span>₹{formatStorePrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${formatStorePrice(total)}`
                    )}
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center mt-2">
                    Secured by Razorpay • UPI, Cards, Net Banking
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <StoreFooter />
    </div>
  );
};

export default StoreCheckout;
