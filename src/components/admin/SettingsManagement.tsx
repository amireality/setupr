import { useState } from "react";
import { motion } from "framer-motion";
import { Save, FileText, Edit, Eye, User, Lock, Mail, Settings2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { renderMarkdown } from "@/lib/markdown";

const legalDocuments = [
  { key: "terms_content", label: "Terms & Conditions", description: "Legal terms for using Setupr services" },
  { key: "privacy_content", label: "Privacy Policy", description: "How we handle user data" },
  { key: "refund_content", label: "Refund Policy", description: "Refund eligibility and process" },
];

const contentSettings = [
  { key: "footer_tagline", label: "Footer Tagline", description: "Shown below the logo in footer" },
  { key: "footer_ownership", label: "Footer Ownership", description: "Legal ownership disclosure line" },
];

const SettingsManagement = () => {
  const { data: settings = [], isLoading } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const { user } = useAuth();
  const { toast } = useToast();

  const [editingDoc, setEditingDoc] = useState<{ key: string; label: string } | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  
  // Account settings
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

  const handleEditDocument = (key: string, label: string) => {
    setEditContent(getSetting(key));
    setEditingDoc({ key, label });
    setShowPreview(false);
  };

  const handleSaveDocument = async () => {
    if (!editingDoc) return;
    await updateSetting.mutateAsync({ key: editingDoc.key, value: editContent });
    setEditingDoc(null);
  };

  const handleSaveContentSetting = async (key: string, value: string) => {
    await updateSetting.mutateAsync({ key, value });
  };

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
        description: "Check your new email for confirmation link." 
      });
      setNewEmail("");
    } catch (err: unknown) {
      toast({ 
        title: "Error", 
        description: err instanceof Error ? err.message : "Failed to update email", 
        variant: "destructive" 
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
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      toast({ 
        title: "Error", 
        description: err instanceof Error ? err.message : "Failed to update password", 
        variant: "destructive" 
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="legal" className="w-full">
        <TabsList className="w-full flex overflow-x-auto">
          <TabsTrigger value="legal" className="flex-1 gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Legal Documents</span>
            <span className="sm:hidden">Legal</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex-1 gap-2">
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">Page Content</span>
            <span className="sm:hidden">Content</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex-1 gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
            <span className="sm:hidden">Account</span>
          </TabsTrigger>
        </TabsList>

        {/* Legal Documents Tab */}
        <TabsContent value="legal" className="mt-6">
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Legal Documents</h3>
              <p className="text-sm text-muted-foreground">
                Edit the content of your legal pages. Uses Markdown formatting.
              </p>
            </div>
            {legalDocuments.map((doc) => (
              <motion.div
                key={doc.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-primary" />
                    <h4 className="font-medium">{doc.label}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  {getSetting(doc.key) && (
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      {getSetting(doc.key).length} characters
                    </p>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditDocument(doc.key, doc.label)}
                    className="flex-1 sm:flex-initial"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Page Content Tab */}
        <TabsContent value="content" className="mt-6">
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Page Content</h3>
              <p className="text-sm text-muted-foreground">
                Customize text content that appears across the website.
              </p>
            </div>
            {contentSettings.map((setting) => {
              const currentValue = getSetting(setting.key);
              return (
                <div key={setting.key} className="glass-card rounded-xl p-4">
                  <Label htmlFor={setting.key} className="mb-1 block font-medium">
                    {setting.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mb-3">{setting.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id={setting.key}
                      defaultValue={currentValue}
                      onBlur={(e) => {
                        if (e.target.value !== currentValue) {
                          handleSaveContentSetting(setting.key, e.target.value);
                        }
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-6">
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Account Settings</h3>
              <p className="text-sm text-muted-foreground">
                Manage your admin account credentials.
              </p>
            </div>

            {/* Current Email */}
            <div className="glass-card rounded-xl p-4">
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
          </div>
        </TabsContent>
      </Tabs>

      {/* Document Editor Dialog */}
      <Dialog open={!!editingDoc} onOpenChange={(open) => !open && setEditingDoc(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Edit {editingDoc?.label}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Edit" : "Preview"}
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto min-h-[400px]">
            {showPreview ? (
              <div className="prose prose-invert max-w-none p-4">
                {renderMarkdown(editContent)}
              </div>
            ) : (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm resize-none"
                placeholder="Enter content using Markdown..."
              />
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setEditingDoc(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDocument} disabled={updateSetting.isPending}>
              {updateSetting.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsManagement;
