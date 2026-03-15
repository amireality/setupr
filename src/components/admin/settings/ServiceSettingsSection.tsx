import { useState } from "react";
import { Package, Edit, Save, Loader2, Eye, ExternalLink, Users, Check, Clock, HelpCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteSetting } from "@/hooks/useSiteSettings";
import type { DbService } from "@/hooks/useServices";

interface ServiceSettingsSectionProps {
  settings: SiteSetting[];
  services: DbService[];
  onSave: (key: string, value: string) => Promise<void>;
  isPending: boolean;
}

// Default content that matches the actual service detail page
const getDefaultContent = (serviceId: string, serviceName: string) => ({
  // Who is this service for section
  who_its_for_scenarios: `Freelancers going legit, consultants building credibility, startups needing compliance, small businesses scaling operations.`,
  
  // What does Setupr provide section
  deliverables: `• Complete documentation preparation, review, and filing
• Expert guidance from professionals who understand Indian regulations
• Government fee coordination. We tell you exactly what to pay and when
• Regular status updates via WhatsApp and email until completion`,
  
  deliverables_outcome: `A fully compliant, registered service with all necessary documentation — ready to operate legally and build credibility.`,
  
  // Process Timeline
  process_step1_title: `Submit Details`,
  process_step1_desc: `Fill a simple form with your business information. Takes just 5 minutes.`,
  process_step1_duration: `5 min`,
  
  process_step2_title: `Document Review`,
  process_step2_desc: `Our experts review your documents and prepare the filing. We handle all the paperwork.`,
  process_step2_duration: `1-2 days`,
  
  process_step3_title: `Filing & Processing`,
  process_step3_desc: `We file with the relevant authorities and track progress. You get regular updates.`,
  process_step3_duration: `5-10 days`,
  
  process_step4_title: `Completion`,
  process_step4_desc: `Receive your certificates and documents. We'll guide you on next steps.`,
  process_step4_duration: `Final`,
  
  process_total_time: `7-15 business days`,
  
  // Comparison Section
  comparison_time_diy: `20-40 hours of research & filing`,
  comparison_time_setupr: `30 minutes of your time`,
  comparison_expertise_diy: `Deep understanding of compliance laws`,
  comparison_expertise_setupr: `Zero expertise needed`,
  comparison_risk_diy: `High - common for first-timers`,
  comparison_risk_setupr: `Zero - 100% acceptance rate`,
  comparison_cost_diy: `Possible penalties & refiling fees`,
  comparison_cost_setupr: `Transparent, fixed pricing`,
  comparison_bottom_note: `Save 30+ hours and eliminate the stress of compliance paperwork`,
  
  // FAQ Section
  faq: `## How do I get started?
Simply click 'Proceed with this service' and fill out a quick form. Our team will reach out within 2 hours to guide you through the next steps.

## What's included in the pricing?
Our fee covers complete end-to-end service including document preparation, government fee coordination, filing, and follow-up until completion.

## Do you offer refunds?
Yes, we offer a satisfaction guarantee. If you're not happy with our service before we begin filing, you can request a full refund.

## How can I contact support?
You can reach us via WhatsApp, email, or the contact form. Our team typically responds within 2 hours during business hours.`,
  
  // Pricing Card
  pricing_processing_time: `Typical processing: 7-15 days`,
  pricing_guarantee: `100% compliance guaranteed`,
  pricing_cta: `Proceed with this service`,
  pricing_subtext: `Add more services or bundles in the next step`,
  
  // Related Articles
  article1_title: `Complete Guide to ${serviceName}`,
  article1_desc: `Everything you need to know before getting started`,
  article2_title: `Common Mistakes to Avoid`,
  article2_desc: `Tips from our experts to ensure a smooth process`,
});

const ServiceSettingsSection = ({ settings, services, onSave, isPending }: ServiceSettingsSectionProps) => {
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("who-its-for");
  const [showPreview, setShowPreview] = useState(false);

  const getSetting = (key: string) => settings.find((s) => s.key === key)?.value || "";

  const getFieldValue = (serviceId: string, serviceName: string, fieldKey: string) => {
    const fullKey = `service_${serviceId}_${fieldKey}`;
    const dbValue = getSetting(fullKey);
    if (dbValue) return dbValue;
    
    // Return default content
    const defaults = getDefaultContent(serviceId, serviceName);
    return defaults[fieldKey as keyof typeof defaults] || "";
  };

  const handleEditService = (service: DbService) => {
    const defaults = getDefaultContent(service.service_id, service.service_name);
    const values: Record<string, string> = {};
    
    Object.keys(defaults).forEach((fieldKey) => {
      const fullKey = `service_${service.service_id}_${fieldKey}`;
      values[fullKey] = getSetting(fullKey) || defaults[fieldKey as keyof typeof defaults];
    });
    
    setEditValues(values);
    setEditingService(service);
    setActiveTab("who-its-for");
    setShowPreview(false);
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    
    const defaults = getDefaultContent(editingService.service_id, editingService.service_name);
    
    for (const [key, value] of Object.entries(editValues)) {
      const fieldKey = key.replace(`service_${editingService.service_id}_`, "");
      const defaultValue = defaults[fieldKey as keyof typeof defaults] || "";
      
      // Only save if different from default
      if (value !== defaultValue && value !== getSetting(key)) {
        await onSave(key, value);
      }
    }
    setEditingService(null);
  };

  const hasCustomContent = (serviceId: string, serviceName: string) => {
    const defaults = getDefaultContent(serviceId, serviceName);
    return Object.keys(defaults).some((fieldKey) => getSetting(`service_${serviceId}_${fieldKey}`));
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

  const getKey = (fieldKey: string) => 
    editingService ? `service_${editingService.service_id}_${fieldKey}` : "";

  const getValue = (fieldKey: string) => editValues[getKey(fieldKey)] || "";
  const setValue = (fieldKey: string, value: string) => 
    setEditValues({ ...editValues, [getKey(fieldKey)]: value });

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
            Customize content for each service detail page. Click Edit to see all sections exactly as they appear on the live page.
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
                        <span className="text-xs text-muted-foreground/70 ml-2">₹{service.setupr_fee_inr?.toLocaleString()}</span>
                        {hasCustomContent(service.service_id, service.service_name) && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            Customized
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <a href={`/services/${service.service_id}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle>Edit: {editingService?.service_name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                All sections from the service detail page
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showPreview ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Hide Preview" : "Preview"}
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            {showPreview ? (
              <ServicePreview 
                service={editingService!} 
                values={editValues}
                getKey={getKey}
              />
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start flex-wrap h-auto gap-1 p-1">
                  <TabsTrigger value="who-its-for" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    Who It's For
                  </TabsTrigger>
                  <TabsTrigger value="deliverables" className="text-xs">
                    <Check className="w-3 h-3 mr-1" />
                    Deliverables
                  </TabsTrigger>
                  <TabsTrigger value="process" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Process
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="text-xs">
                    Comparison
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="text-xs">
                    <HelpCircle className="w-3 h-3 mr-1" />
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="text-xs">
                    Pricing Card
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    Articles
                  </TabsTrigger>
                </TabsList>

                {/* Who It's For Tab */}
                <TabsContent value="who-its-for" className="space-y-4 mt-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Who is this service for?
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Target Audience (from service data)</Label>
                        <p className="text-sm bg-secondary/30 p-2 rounded mt-1">{editingService?.who_its_for}</p>
                      </div>
                      <div>
                        <Label htmlFor="scenarios">Common Scenarios</Label>
                        <Textarea
                          id="scenarios"
                          value={getValue("who_its_for_scenarios")}
                          onChange={(e) => setValue("who_its_for_scenarios", e.target.value)}
                          placeholder="Freelancers going legit, consultants building credibility..."
                          rows={3}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Comma-separated scenarios that appear below the main description
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Deliverables Tab */}
                <TabsContent value="deliverables" className="space-y-4 mt-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      What does Setupr provide?
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="deliverables">Deliverables List</Label>
                        <Textarea
                          id="deliverables"
                          value={getValue("deliverables")}
                          onChange={(e) => setValue("deliverables", e.target.value)}
                          placeholder="• Complete documentation preparation..."
                          rows={6}
                          className="mt-1 font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Each line starting with • will be rendered as a check item
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="outcome">The Outcome</Label>
                        <Textarea
                          id="outcome"
                          value={getValue("deliverables_outcome")}
                          onChange={(e) => setValue("deliverables_outcome", e.target.value)}
                          placeholder="A fully compliant, registered service..."
                          rows={2}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Process Tab */}
                <TabsContent value="process" className="space-y-4 mt-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Our Process Timeline
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="space-y-2 p-3 bg-secondary/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                              {step}
                            </span>
                            <span className="text-sm font-medium">Step {step}</span>
                          </div>
                          <Input
                            value={getValue(`process_step${step}_title`)}
                            onChange={(e) => setValue(`process_step${step}_title`, e.target.value)}
                            placeholder="Step title"
                            className="text-sm"
                          />
                          <Textarea
                            value={getValue(`process_step${step}_desc`)}
                            onChange={(e) => setValue(`process_step${step}_desc`, e.target.value)}
                            placeholder="Step description"
                            rows={2}
                            className="text-sm"
                          />
                          <Input
                            value={getValue(`process_step${step}_duration`)}
                            onChange={(e) => setValue(`process_step${step}_duration`, e.target.value)}
                            placeholder="Duration (e.g., 5 min)"
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="total_time">Total Estimated Time</Label>
                      <Input
                        id="total_time"
                        value={getValue("process_total_time")}
                        onChange={(e) => setValue("process_total_time", e.target.value)}
                        placeholder="7-15 business days"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Comparison Tab */}
                <TabsContent value="comparison" className="space-y-4 mt-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3">Why Choose Setupr? (Comparison Table)</h3>
                    <div className="space-y-4">
                      {["time", "expertise", "risk", "cost"].map((factor) => (
                        <div key={factor} className="grid grid-cols-3 gap-3 p-3 bg-secondary/20 rounded-lg">
                          <div className="flex items-center">
                            <span className="text-sm font-medium capitalize">{factor}</span>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">DIY</Label>
                            <Input
                              value={getValue(`comparison_${factor}_diy`)}
                              onChange={(e) => setValue(`comparison_${factor}_diy`, e.target.value)}
                              placeholder="DIY approach"
                              className="text-sm mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">With Setupr</Label>
                            <Input
                              value={getValue(`comparison_${factor}_setupr`)}
                              onChange={(e) => setValue(`comparison_${factor}_setupr`, e.target.value)}
                              placeholder="With Setupr"
                              className="text-sm mt-1"
                            />
                          </div>
                        </div>
                      ))}
                      <div>
                        <Label htmlFor="comparison_note">Bottom Note</Label>
                        <Input
                          id="comparison_note"
                          value={getValue("comparison_bottom_note")}
                          onChange={(e) => setValue("comparison_bottom_note", e.target.value)}
                          placeholder="Save 30+ hours..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* FAQ Tab */}
                <TabsContent value="faq" className="space-y-4 mt-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      Frequently Asked Questions
                    </h3>
                    <div>
                      <Label htmlFor="faq">FAQ Content (Markdown)</Label>
                      <Textarea
                        id="faq"
                        value={getValue("faq")}
                        onChange={(e) => setValue("faq", e.target.value)}
                        placeholder="## Question 1\nAnswer 1\n\n## Question 2\nAnswer 2"
                        rows={12}
                        className="mt-1 font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use ## for questions and regular text for answers. Each ## starts a new FAQ item.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Pricing Card Tab */}
                <TabsContent value="pricing" className="space-y-4 mt-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3">Pricing Card Content</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-secondary/20 rounded-lg">
                        <Label className="text-xs text-muted-foreground">Price (from service data)</Label>
                        <p className="text-lg font-bold mt-1">₹{editingService?.setupr_fee_inr?.toLocaleString()} + GST</p>
                        {editingService?.govt_or_third_party_fee && editingService.govt_or_third_party_fee !== '-' && (
                          <p className="text-sm text-muted-foreground">+ {editingService.govt_or_third_party_fee} (Govt Fee)</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="processing_time">Processing Time Text</Label>
                        <Input
                          id="processing_time"
                          value={getValue("pricing_processing_time")}
                          onChange={(e) => setValue("pricing_processing_time", e.target.value)}
                          placeholder="Typical processing: 7-15 days"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guarantee">Guarantee Text</Label>
                        <Input
                          id="guarantee"
                          value={getValue("pricing_guarantee")}
                          onChange={(e) => setValue("pricing_guarantee", e.target.value)}
                          placeholder="100% compliance guaranteed"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cta">CTA Button Text</Label>
                        <Input
                          id="cta"
                          value={getValue("pricing_cta")}
                          onChange={(e) => setValue("pricing_cta", e.target.value)}
                          placeholder="Proceed with this service"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subtext">Subtext below CTA</Label>
                        <Input
                          id="subtext"
                          value={getValue("pricing_subtext")}
                          onChange={(e) => setValue("pricing_subtext", e.target.value)}
                          placeholder="Add more services or bundles in the next step"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Related Articles Tab */}
                <TabsContent value="articles" className="space-y-4 mt-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-secondary/20 rounded-lg space-y-2">
                        <Label className="text-xs text-muted-foreground">Article 1</Label>
                        <Input
                          value={getValue("article1_title")}
                          onChange={(e) => setValue("article1_title", e.target.value)}
                          placeholder="Article title"
                        />
                        <Input
                          value={getValue("article1_desc")}
                          onChange={(e) => setValue("article1_desc", e.target.value)}
                          placeholder="Article description"
                        />
                      </div>
                      <div className="p-3 bg-secondary/20 rounded-lg space-y-2">
                        <Label className="text-xs text-muted-foreground">Article 2</Label>
                        <Input
                          value={getValue("article2_title")}
                          onChange={(e) => setValue("article2_title", e.target.value)}
                          placeholder="Article title"
                        />
                        <Input
                          value={getValue("article2_desc")}
                          onChange={(e) => setValue("article2_desc", e.target.value)}
                          placeholder="Article description"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
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

// Preview Component
const ServicePreview = ({ 
  service, 
  values, 
  getKey 
}: { 
  service: DbService; 
  values: Record<string, string>;
  getKey: (fieldKey: string) => string;
}) => {
  const getValue = (fieldKey: string) => values[getKey(fieldKey)] || "";
  
  return (
    <div className="space-y-6 py-4">
      {/* Header Preview */}
      <div className="p-4 bg-secondary/20 rounded-lg">
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {service.category}
        </span>
        <h1 className="text-2xl font-bold mt-2">{service.service_name}</h1>
        <p className="text-muted-foreground">{service.description_short}</p>
      </div>

      {/* Who It's For Preview */}
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Who is this service for?</h3>
        </div>
        <p className="text-muted-foreground mb-2">{service.who_its_for}</p>
        <p className="text-sm text-muted-foreground border-t pt-2 mt-2">
          <strong>Common scenarios:</strong> {getValue("who_its_for_scenarios")}
        </p>
      </div>

      {/* Deliverables Preview */}
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Check className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">What does Setupr provide?</h3>
        </div>
        <ul className="space-y-2">
          {getValue("deliverables").split("\n").filter(line => line.trim().startsWith("•")).map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5" />
              <span className="text-muted-foreground text-sm">{item.replace("•", "").trim()}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground border-t pt-2 mt-3">
          <strong>The outcome:</strong> {getValue("deliverables_outcome")}
        </p>
      </div>

      {/* Process Preview */}
      <div className="p-4 border border-border rounded-lg">
        <h3 className="font-semibold mb-4">Our Process</h3>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="text-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center mx-auto">
                {step}
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1 inline-block">
                {getValue(`process_step${step}_duration`)}
              </span>
              <p className="text-xs font-medium mt-1">{getValue(`process_step${step}_title`)}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-4 pt-3 border-t">
          Total: <span className="text-primary font-medium">{getValue("process_total_time")}</span>
        </p>
      </div>

      {/* FAQ Preview */}
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-2">
          {getValue("faq").split("##").filter(Boolean).slice(0, 2).map((item, i) => {
            const [question, ...answerParts] = item.trim().split("\n");
            return (
              <div key={i} className="p-2 bg-secondary/20 rounded">
                <p className="text-sm font-medium">{question}</p>
                <p className="text-xs text-muted-foreground">{answerParts.join(" ").slice(0, 100)}...</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing Card Preview */}
      <div className="p-4 border border-primary/30 rounded-lg bg-primary/5">
        <p className="text-center text-sm text-muted-foreground">Setupr Fee + GST</p>
        <p className="text-center text-3xl font-bold">₹{service.setupr_fee_inr?.toLocaleString()}</p>
        <p className="text-center text-xs text-muted-foreground">+ 18% GST</p>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><Clock className="w-3 h-3" /> {getValue("pricing_processing_time")}</p>
          <p className="flex items-center gap-2"><Check className="w-3 h-3" /> {getValue("pricing_guarantee")}</p>
        </div>
        <div className="mt-3 p-2 bg-primary text-primary-foreground rounded text-center text-sm font-medium">
          {getValue("pricing_cta")}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">{getValue("pricing_subtext")}</p>
      </div>
    </div>
  );
};

export default ServiceSettingsSection;
