import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Info, Phone, Briefcase, Wrench, Edit, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface SettingField {
  key: string;
  label: string;
  type: "text" | "textarea";
  placeholder?: string;
}

interface PageConfig {
  id: string;
  title: string;
  icon: React.ElementType;
  fields: SettingField[];
}

const pageConfigs: PageConfig[] = [
  {
    id: "homepage",
    title: "Home Page",
    icon: Home,
    fields: [
      { key: "homepage_hero_title", label: "Hero Title", type: "text", placeholder: "Set up your {type} The right way." },
      { key: "homepage_hero_subtitle", label: "Hero Subtitle", type: "textarea", placeholder: "Company registration, GST, MSME..." },
      { key: "homepage_cta_primary", label: "Primary CTA Text", type: "text", placeholder: "Start with your journey" },
      { key: "homepage_cta_secondary", label: "Secondary CTA Text", type: "text", placeholder: "See How It Works" },
      { key: "homepage_how_it_works_title", label: "How It Works Title", type: "text", placeholder: "How Setupr helps you register your business" },
      { key: "homepage_step1_title", label: "Step 1 Title", type: "text", placeholder: "Share your requirements" },
      { key: "homepage_step1_desc", label: "Step 1 Description", type: "textarea", placeholder: "Tell us if you need company registration..." },
      { key: "homepage_step2_title", label: "Step 2 Title", type: "text", placeholder: "Get a clear plan with pricing" },
      { key: "homepage_step2_desc", label: "Step 2 Description", type: "textarea", placeholder: "We provide an exact checklist of services..." },
      { key: "homepage_step3_title", label: "Step 3 Title", type: "text", placeholder: "We handle everything" },
      { key: "homepage_step3_desc", label: "Step 3 Description", type: "textarea", placeholder: "Our experts manage all filings..." },
      { key: "homepage_final_cta_title", label: "Final CTA Title", type: "text", placeholder: "Ready to make your business official?" },
      { key: "homepage_final_cta_subtitle", label: "Final CTA Subtitle", type: "textarea", placeholder: "From freelancer to registered business..." },
    ],
  },
  {
    id: "about",
    title: "About Page",
    icon: Info,
    fields: [
      { key: "about_hero_title", label: "Hero Title", type: "text", placeholder: "We help freelancers and startups become legitimate businesses" },
      { key: "about_hero_subtitle", label: "Hero Subtitle", type: "textarea", placeholder: "Setupr is a business setup platform..." },
      { key: "about_stat_1_value", label: "Stat 1 Value", type: "text", placeholder: "500+" },
      { key: "about_stat_1_label", label: "Stat 1 Label", type: "text", placeholder: "Businesses Launched" },
      { key: "about_stat_2_value", label: "Stat 2 Value", type: "text", placeholder: "98%" },
      { key: "about_stat_2_label", label: "Stat 2 Label", type: "text", placeholder: "Client Satisfaction" },
      { key: "about_stat_3_value", label: "Stat 3 Value", type: "text", placeholder: "48hrs" },
      { key: "about_stat_3_label", label: "Stat 3 Label", type: "text", placeholder: "Avg. Turnaround" },
      { key: "about_stat_4_value", label: "Stat 4 Value", type: "text", placeholder: "24/7" },
      { key: "about_stat_4_label", label: "Stat 4 Label", type: "text", placeholder: "Support Available" },
      { key: "about_mission_title", label: "Mission Section Title", type: "text", placeholder: "Built for freelancers, consultants & startups" },
      { key: "about_mission_content", label: "Mission Content", type: "textarea", placeholder: "Setupr exists because talented professionals..." },
      { key: "about_founder_name", label: "Founder Name", type: "text", placeholder: "Amir Khan" },
      { key: "about_founder_title", label: "Founder Title", type: "text", placeholder: "Founder, Setupr" },
      { key: "about_founder_bio", label: "Founder Bio", type: "textarea", placeholder: "Amir Khan is the founder of Setupr..." },
    ],
  },
  {
    id: "contact",
    title: "Contact Page",
    icon: Phone,
    fields: [
      { key: "contact_title", label: "Page Title", type: "text", placeholder: "Contact Us" },
      { key: "contact_subtitle", label: "Page Subtitle", type: "textarea", placeholder: "Have questions about our services? We're here to help." },
      { key: "contact_success_title", label: "Success Title", type: "text", placeholder: "Message Sent!" },
      { key: "contact_success_message", label: "Success Message", type: "textarea", placeholder: "Thank you for reaching out. We'll get back to you within 24-48 hours." },
    ],
  },
  {
    id: "career",
    title: "Career Page",
    icon: Briefcase,
    fields: [
      { key: "career_title", label: "Fellowship Title", type: "text", placeholder: "Setupr Founders Fellowship" },
      { key: "career_subtitle", label: "Fellowship Subtitle", type: "textarea", placeholder: "Learn how startups, business registration platforms..." },
      { key: "career_disclaimer", label: "Disclaimer Text", type: "textarea", placeholder: "⚠️ This is a learning program, not a traditional internship..." },
    ],
  },
  {
    id: "services",
    title: "Services Page",
    icon: Wrench,
    fields: [
      { key: "services_intro_title", label: "Intro Title", type: "text", placeholder: "Business registration services in India" },
      { key: "services_intro_subtitle", label: "Intro Subtitle", type: "textarea", placeholder: "Company registration, GST, MSME, compliance..." },
      { key: "services_intro_note", label: "Intro Note", type: "text", placeholder: "Pick individual services or choose a bundle..." },
    ],
  },
];

interface PageSettingsSectionProps {
  settings: SiteSetting[];
  onSave: (key: string, value: string) => Promise<void>;
  isPending: boolean;
}

const PageSettingsSection = ({ settings, onSave, isPending }: PageSettingsSectionProps) => {
  const [editingPage, setEditingPage] = useState<PageConfig | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  // Get setting value from database
  const getDbSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";
  
  // Get placeholder/default value for a field
  const getDefaultValue = (page: PageConfig, key: string) => {
    const field = page.fields.find(f => f.key === key);
    return field?.placeholder || "";
  };

  // Get display value - show DB value if exists, otherwise show placeholder as current content
  const getDisplayValue = (page: PageConfig, key: string) => {
    const dbValue = getDbSetting(key);
    if (dbValue) return dbValue;
    return getDefaultValue(page, key);
  };

  const handleEditPage = (page: PageConfig) => {
    const values: Record<string, string> = {};
    page.fields.forEach((field) => {
      // Pre-populate with database value, or placeholder if not set
      values[field.key] = getDbSetting(field.key) || field.placeholder || "";
    });
    setEditValues(values);
    setEditingPage(page);
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    for (const [key, value] of Object.entries(editValues)) {
      // Save if value changed from database value
      if (value !== getDbSetting(key)) {
        await onSave(key, value);
      }
    }
    setEditingPage(null);
  };

  const getFilledCount = (page: PageConfig) => {
    return page.fields.filter((f) => getDbSetting(f.key)).length;
  };

  return (
    <>
      {pageConfigs.map((page) => (
        <AccordionItem key={page.id} value={page.id} className="border-border/50">
          <AccordionTrigger className="hover:no-underline px-4">
            <div className="flex items-center gap-3">
              <page.icon className="w-5 h-5 text-primary" />
              <span className="font-semibold">{page.title}</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({getFilledCount(page)}/{page.fields.length} fields)
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Customize the content displayed on the {page.title.toLowerCase()}.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditPage(page)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit All
              </Button>
            </div>
            <div className="grid gap-2">
              {page.fields.slice(0, 4).map((field) => {
                const dbValue = getDbSetting(field.key);
                const displayValue = getDisplayValue(page, field.key);
                const isDefault = !dbValue && displayValue;
                return (
                  <div key={field.key} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-sm text-muted-foreground">{field.label}</span>
                    <span className={`text-sm truncate max-w-[200px] ${isDefault ? 'text-muted-foreground/70 italic' : 'text-foreground'}`}>
                      {displayValue || <span className="text-muted-foreground/50 italic">Not set</span>}
                    </span>
                  </div>
                );
              })}
              {page.fields.length > 4 && (
                <p className="text-xs text-muted-foreground mt-2">
                  + {page.fields.length - 4} more fields
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}

      {/* Page Editor Dialog */}
      <Dialog open={!!editingPage} onOpenChange={(open) => !open && setEditingPage(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit {editingPage?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto space-y-4 py-4">
            {editingPage?.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.key}
                    value={editValues[field.key] || ""}
                    onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={field.key}
                    value={editValues[field.key] || ""}
                    onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setEditingPage(null)}>
              Cancel
            </Button>
            <Button onClick={handleSavePage} disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save All Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PageSettingsSection;
