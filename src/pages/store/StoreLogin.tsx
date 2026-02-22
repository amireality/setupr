import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreAuth } from "@/hooks/useStoreAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import StoreNavbar from "@/components/store/StoreNavbar";

const StoreLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useStoreAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/store/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar />
      <main className="pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="glass-card rounded-2xl p-8">
            <h1 className="font-display text-2xl font-bold mb-2">Sign In</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Access your Setupr Cloud Marketplace account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              Don't have an account?{" "}
              <Link to="/store/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoreLogin;
