import { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { SiteSetting } from "@/hooks/useSiteSettings";

const pages = [
  { id: "homepage", label: "Homepage" },
  { id: "about", label: "About" },
  { id: "blog", label: "Blog" },
  { id: "services", label: "Services" },
  { id: "team", label: "Team" },
  { id: "career", label: "Career" },
  { id: "contact", label: "Contact" },
  { id: "guides", label: "Guides" },
];

interface Props {
  settings: SiteSetting[];
  onSave: (key: string, value: string) => Promise<void>;
  isPending: boolean;
}

const SeoSettingsSection = ({ settings, onSave, isPending }: Props) => {
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const getValue = (key: string) => {
    if (editValues[key] !== undefined) return editValues[key];
    return settings.find(s => s.key === key)?.value || "";
  };

  const handleChange = (key: string, value: string) => {
    setEditValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    await onSave(key, getValue(key));
    setEditValues(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <AccordionItem value="seo">
      <AccordionTrigger className="px-4 py-3 bg-secondary/30 rounded-xl hover:no-underline">
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-primary" />
          <span className="font-display font-medium">SEO Settings</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-4 space-y-6">
        {pages.map(page => (
          <div key={page.id} className="space-y-3 p-4 rounded-xl bg-secondary/20 border border-border/30">
            <h4 className="font-medium text-sm">{page.label} Page</h4>
            {["title", "description"].map(field => {
              const key = `seo_${page.id}_${field}`;
              const hasChange = editValues[key] !== undefined;
              return (
                <div key={key} className="space-y-1">
                  <Label className="text-xs text-muted-foreground capitalize">Meta {field}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={getValue(key)}
                      onChange={e => handleChange(key, e.target.value)}
                      className="text-sm"
                    />
                    {hasChange && (
                      <Button size="sm" onClick={() => handleSave(key)} disabled={isPending}>
                        Save
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default SeoSettingsSection;
