import { useState } from "react";
import { Globe, Edit, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteSetting } from "@/hooks/useSiteSettings";

const footerFields = [
  { key: "footer_tagline", label: "Footer Tagline", placeholder: "Your trusted partner for business setup & compliance in India." },
  { key: "footer_ownership", label: "Ownership Line", placeholder: "Owned & operated by Altered." },
  { key: "footer_email", label: "Contact Email", placeholder: "info@setupr.com" },
  { key: "footer_instagram", label: "Instagram URL", placeholder: "https://www.instagram.com/setuprhq" },
  { key: "footer_twitter", label: "Twitter/X URL", placeholder: "https://x.com/setuprhq" },
  { key: "footer_linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/setupr" },
];

interface FooterSettingsSectionProps {
  settings: SiteSetting[];
  onSave: (key: string, value: string) => Promise<void>;
  isPending: boolean;
}

const FooterSettingsSection = ({ settings, onSave, isPending }: FooterSettingsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

  const handleEdit = () => {
    const values: Record<string, string> = {};
    footerFields.forEach((field) => {
      values[field.key] = getSetting(field.key);
    });
    setEditValues(values);
    setIsEditing(true);
  };

  const handleSave = async () => {
    for (const [key, value] of Object.entries(editValues)) {
      if (value !== getSetting(key)) {
        await onSave(key, value);
      }
    }
    setIsEditing(false);
  };

  return (
    <>
      <AccordionItem value="footer" className="border-border/50">
        <AccordionTrigger className="hover:no-underline px-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-semibold">Footer Settings</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Customize footer text and social media links.
            </p>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          <div className="space-y-2">
            {footerFields.map((field) => {
              const value = getSetting(field.key);
              return (
                <div key={field.key} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm text-muted-foreground">{field.label}</span>
                  <span className="text-sm text-foreground truncate max-w-[250px]">
                    {value || <span className="text-muted-foreground/50 italic">Not set</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Editor Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Footer Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {footerFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  value={editValues[field.key] || ""}
                  onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FooterSettingsSection;
