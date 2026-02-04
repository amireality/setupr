import { useState } from "react";
import { Package, Edit, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { DbService } from "@/hooks/useServices";

interface ServiceSettingsSectionProps {
  settings: SiteSetting[];
  services: DbService[];
  onSave: (key: string, value: string) => Promise<void>;
  isPending: boolean;
}

const ServiceSettingsSection = ({ settings, services, onSave, isPending }: ServiceSettingsSectionProps) => {
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

  const getServiceFieldKeys = (serviceId: string) => [
    { key: `service_${serviceId}_faq`, label: "Custom FAQ (Markdown)", type: "textarea" as const },
    { key: `service_${serviceId}_deliverables`, label: "Custom Deliverables", type: "textarea" as const },
    { key: `service_${serviceId}_timeline`, label: "Custom Timeline Text", type: "textarea" as const },
  ];

  const handleEditService = (service: DbService) => {
    const fields = getServiceFieldKeys(service.service_id);
    const values: Record<string, string> = {};
    fields.forEach((field) => {
      values[field.key] = getSetting(field.key);
    });
    setEditValues(values);
    setEditingService(service);
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    for (const [key, value] of Object.entries(editValues)) {
      if (value !== getSetting(key)) {
        await onSave(key, value);
      }
    }
    setEditingService(null);
  };

  const hasCustomContent = (serviceId: string) => {
    const fields = getServiceFieldKeys(serviceId);
    return fields.some((f) => getSetting(f.key));
  };

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, DbService[]>);

  return (
    <>
      <AccordionItem value="individual-services" className="border-border/50">
        <AccordionTrigger className="hover:no-underline px-4">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <span className="font-semibold">Individual Services</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({services.length} services)
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-4">
            Add custom content to individual service pages (FAQ, deliverables, timeline). 
            These override default content on service detail pages.
          </p>
          <div className="space-y-4">
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 capitalize">
                  {category.replace(/-/g, " ")}
                </h4>
                <div className="space-y-2">
                  {categoryServices.map((service) => (
                    <div 
                      key={service.id} 
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{service.service_name}</span>
                        {hasCustomContent(service.service_id) && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            Customized
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Service Editor Dialog */}
      <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Customize: {editingService?.service_name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Add custom content that will appear on the service detail page. 
              Leave empty to use default content.
            </p>
            {editingService && getServiceFieldKeys(editingService.service_id).map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Textarea
                  id={field.key}
                  value={editValues[field.key] || ""}
                  onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                  placeholder={`Enter custom ${field.label.toLowerCase()}...`}
                  rows={4}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setEditingService(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService} disabled={isPending}>
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

export default ServiceSettingsSection;
