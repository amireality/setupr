import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreAuth, useCustomerProfile } from "@/hooks/useStoreAuth";
import StoreNavbar from "@/components/store/StoreNavbar";
import StoreFooter from "@/components/store/StoreFooter";
import { Button } from "@/components/ui/button";
import { Package, FileText, CreditCard, Settings, LogOut } from "lucide-react";

const StoreDashboard = () => {
  const { user, loading, signOut } = useStoreAuth();
  const { data: profile } = useCustomerProfile(user?.id);
  const navigate = useNavigate();

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

  const cards = [
    { icon: Package, title: "Subscriptions", desc: "Manage your active licenses", badge: "Coming Soon" },
    { icon: FileText, title: "Invoices", desc: "View billing history", badge: "Coming Soon" },
    { icon: CreditCard, title: "Payment Methods", desc: "Manage payment options", badge: "Coming Soon" },
    { icon: Settings, title: "Account Settings", desc: "Update your profile", badge: "Coming Soon" },
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="glass-card rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-display font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
};

export default StoreDashboard;
