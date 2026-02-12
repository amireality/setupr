import { useState, useMemo } from "react";
import { Edit, Save, Loader2 } from "lucide-react";
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

const categoryLabels: Record<string, string> = {
  homepage: "Home Page",
  about: "About Page",
  contact: "Contact Page",
  career: "Career Page",
  services: "Services Page",
  pricing: "Pricing Page",
  footer: "Footer",
  seo: "SEO Settings",
  legal: "Legal Documents",
  team: "Team Page",
  author: "Author Pages",
  guides: "Guides Page",
  content: "Blog / Content",
};

// Categories to exclude (handled by dedicated admin sections)
const excludedCategories = ["legal", "seo", "footer"];

interface PageSettingsSectionProps {
  settings: SiteSetting[];
  onSave: (key: string, value: string) => Promise<void>;
  isPending: boolean;
}

const PageSettingsSection = ({ settings, onSave, isPending }: PageSettingsSectionProps) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  // Group settings by category, sorted by sort_order within each group
  const grouped = useMemo(() => {
    const groups: Record<string, SiteSetting[]> = {};
    for (const s of settings) {
      if (excludedCategories.includes(s.category)) continue;
      if (!s.label) continue; // skip un-labeled settings
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    // Sort within each group by sort_order
    for (const cat of Object.keys(groups)) {
      groups[cat].sort((a, b) => a.sort_order - b.sort_order);
    }
    return groups;
  }, [settings]);

  const sortedCategories = useMemo(() => {
    const order = Object.keys(categoryLabels);
    return Object.keys(grouped).sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [grouped]);

  const handleEditCategory = (category: string) => {
    const values: Record<string, string> = {};
    for (const s of grouped[category]) {
      values[s.key] = s.value || "";
    }
    setEditValues(values);
    setEditingCategory(category);
  };

  const handleSave = async () => {
    if (!editingCategory) return;
    for (const s of grouped[editingCategory]) {
      if (editValues[s.key] !== s.value) {
        await onSave(s.key, editValues[s.key] || "");
      }
    }
    setEditingCategory(null);
  };

  const getFilledCount = (category: string) =>
    grouped[category].filter((s) => s.value).length;

  const renderField = (s: SiteSetting, value: string, onChange: (v: string) => void) => {
    const fieldType = s.field_type || "text";

    switch (fieldType) {
      case "textarea":
      case "markdown":
        return (
          <Textarea
            id={s.key}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={s.description || s.label}
            rows={fieldType === "markdown" ? 8 : 3}
          />
        );
      case "json":
        return (
          <div className="space-y-1">
            <Textarea
              id={s.key}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={s.description || "Enter valid JSON"}
              rows={6}
              className="font-mono text-xs"
            />
            {value && (() => {
              try { JSON.parse(value); return <p className="text-xs text-primary">✓ Valid JSON</p>; }
              catch { return <p className="text-xs text-destructive">✗ Invalid JSON</p>; }
            })()}
          </div>
        );
      case "number":
        return (
          <Input
            id={s.key}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={s.description || s.label}
          />
        );
      case "url":
        return (
          <Input
            id={s.key}
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={s.description || "https://..."}
          />
        );
      default: // text
        return (
          <Input
            id={s.key}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={s.description || s.label}
          />
        );
    }
  };

  const editingSettings = editingCategory ? grouped[editingCategory] : [];

  return (
    <>
      {sortedCategories.map((category) => (
        <AccordionItem key={category} value={category} className="border-border/50">
          <AccordionTrigger className="hover:no-underline px-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold">{categoryLabels[category] || category}</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({getFilledCount(category)}/{grouped[category].length} fields)
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Customize the content displayed on the {(categoryLabels[category] || category).toLowerCase()}.
              </p>
              <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit All
              </Button>
            </div>
            <div className="grid gap-2">
              {grouped[category].slice(0, 4).map((s) => (
                <div key={s.key} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className={`text-sm truncate max-w-[200px] ${s.value ? 'text-foreground' : 'text-muted-foreground/50 italic'}`}>
                    {s.value ? (s.field_type === 'json' ? 'JSON data' : s.value.substring(0, 40) + (s.value.length > 40 ? '…' : '')) : 'Not set'}
                  </span>
                </div>
              ))}
              {grouped[category].length > 4 && (
                <p className="text-xs text-muted-foreground mt-2">
                  + {grouped[category].length - 4} more fields
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}

      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit {editingCategory ? (categoryLabels[editingCategory] || editingCategory) : ""}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto space-y-4 py-4">
            {editingSettings.map((s) => (
              <div key={s.key} className="space-y-1.5">
                <Label htmlFor={s.key}>{s.label}</Label>
                {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
                {renderField(s, editValues[s.key] || "", (v) => setEditValues({ ...editValues, [s.key]: v }))}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save All Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PageSettingsSection;
