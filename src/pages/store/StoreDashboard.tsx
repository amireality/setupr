import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreAuth, useCustomerProfile } from "@/hooks/useStoreAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import StoreNavbar from "@/components/store/StoreNavbar";
import StoreFooter from "@/components/store/StoreFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Save,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatStorePrice } from "@/hooks/useStoreProducts";
import { motion, AnimatePresence } from "framer-motion";

const StoreDashboard = () => {
  const { user, loading, signOut } = useStoreAuth();
  const { data: profile, refetch: refetchProfile } = useCustomerProfile(user?.id);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/store/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/store");
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">
                Welcome{profile?.company_name ? `, ${profile.company_name}` : ""}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="space-y-8">
            <OrderHistory userId={user.id} />
            <AccountSettings profile={profile} userId={user.id} onSaved={refetchProfile} />

            {/* Coming Soon cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Package, title: "Subscriptions", desc: "Manage your active licenses" },
                { icon: FileText, title: "Invoices", desc: "Download tax invoices" },
              ].map((card) => (
                <div key={card.title} className="glass-card rounded-2xl p-6 opacity-60">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="font-display font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
};

/* ─── Order History ─── */
const OrderHistory = ({ userId }: { userId: string }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["store-orders", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: orderItems } = useQuery({
    queryKey: ["store-order-items", expandedOrder],
    queryFn: async () => {
      if (!expandedOrder) return [];
      const { data, error } = await supabase
        .from("store_order_items")
        .select("*")
        .eq("order_id", expandedOrder);
      if (error) throw error;
      return data;
    },
    enabled: !!expandedOrder,
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { icon: any; color: string }> = {
      confirmed: { icon: CheckCircle, color: "text-green-500" },
      pending: { icon: Clock, color: "text-yellow-500" },
    };
    const s = map[status] || map.pending;
    const Icon = s.icon;
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium ${s.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="font-display font-semibold text-lg mb-4">Order History</h2>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading orders...</p>
      ) : !orders?.length ? (
        <p className="text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="border border-border/50 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-sm">{order.order_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {statusBadge(order.status)}
                  <span className="font-semibold text-sm">₹{formatStorePrice(Number(order.total_inr))}</span>
                  {expandedOrder === order.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-border/30">
                      {orderItems?.length ? (
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-xs text-muted-foreground">
                              <th className="text-left py-2">Product</th>
                              <th className="text-center py-2">Qty</th>
                              <th className="text-right py-2">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderItems.map((item) => (
                              <tr key={item.id} className="border-t border-border/20">
                                <td className="py-2">{item.product_name}</td>
                                <td className="py-2 text-center">{item.quantity}</td>
                                <td className="py-2 text-right">₹{formatStorePrice(Number(item.total_inr))}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-xs text-muted-foreground py-2">Loading items...</p>
                      )}
                      <div className="flex justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border/20">
                        <span>Subtotal: ₹{formatStorePrice(Number(order.subtotal_inr))}</span>
                        <span>GST: ₹{formatStorePrice(Number(order.tax_inr))}</span>
                        <span className="font-semibold text-foreground">Total: ₹{formatStorePrice(Number(order.total_inr))}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Account Settings ─── */
const AccountSettings = ({
  profile,
  userId,
  onSaved,
}: {
  profile: any;
  userId: string;
  onSaved: () => void;
}) => {
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setCompanyName(profile.company_name || "");
      setGstin(profile.gstin || "");
      setPhone(profile.phone || "");
      setBillingAddress(profile.billing_address || "");
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("customer_profiles")
      .update({
        company_name: companyName,
        gstin: gstin || null,
        phone: phone || null,
        billing_address: billingAddress || null,
      })
      .eq("user_id", userId);

    setSaving(false);
    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated" });
      onSaved();
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="font-display font-semibold text-lg">Account Settings</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dash-company">Company Name</Label>
          <Input id="dash-company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dash-gstin">GSTIN</Label>
          <Input id="dash-gstin" value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="22AAAAA0000A1Z5" />
        </div>
        <div>
          <Label htmlFor="dash-phone">Phone</Label>
          <Input id="dash-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="dash-address">Billing Address</Label>
          <Textarea id="dash-address" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} rows={2} />
        </div>
      </div>
      <Button className="mt-4" onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        Save Changes
      </Button>
    </div>
  );
};

export default StoreDashboard;
