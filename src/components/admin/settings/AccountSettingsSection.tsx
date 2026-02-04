import { useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const AccountSettingsSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangeEmail = async () => {
    if (!newEmail) {
      toast({ title: "Error", description: "Please enter a new email address", variant: "destructive" });
      return;
    }
    setIsChangingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      toast({
        title: "Email update initiated",
        description: "Check your new email for confirmation link.",
      });
      setNewEmail("");
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update email",
        variant: "destructive",
      });
    } finally {
      setIsChangingEmail(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Password updated", description: "Your password has been changed successfully." });
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <AccordionItem value="account" className="border-border/50">
      <AccordionTrigger className="hover:no-underline px-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-primary" />
          <span className="font-semibold">Account Settings</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <p className="text-sm text-muted-foreground mb-6">
          Manage your admin account credentials.
        </p>

        {/* Current Email */}
        <div className="glass-card rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-primary" />
            <Label className="font-medium">Email Address</Label>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Current: <span className="text-foreground">{user?.email || "Not set"}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="New email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleChangeEmail}
              disabled={isChangingEmail || !newEmail}
              className="w-full sm:w-auto"
            >
              {isChangingEmail ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Update Email
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-primary" />
            <Label className="font-medium">Change Password</Label>
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              onClick={handleChangePassword}
              disabled={isChangingPassword || !newPassword || !confirmPassword}
              className="w-full sm:w-auto"
            >
              {isChangingPassword ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </>
              )}
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccountSettingsSection;
