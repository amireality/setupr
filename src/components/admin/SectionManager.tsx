import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  GripVertical,
  Star,
  BarChart3,
  Target,
  Package,
  Settings,
  Workflow,
  MessageSquare,
  HelpCircle,
  Megaphone,
} from "lucide-react";
import { useUpdateSiteSetting, useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  settingKey: string;
}

const HOMEPAGE_SECTIONS: Section[] = [
  {
    id: "hero",
    name: "Hero Section",
    description: "Main headline, subtitle, and CTA buttons",
    icon: Star,
    settingKey: "homepage_section_hero_visible",
  },
  {
    id: "trust_stats",
    name: "Trust Stats",
    description: "Animated counters showing business metrics",
    icon: BarChart3,
    settingKey: "homepage_section_trust_stats_visible",
  },
  {
    id: "goal_cards",
    name: "Journey Selection",
    description: "Goal cards for user journey selection",
    icon: Target,
    settingKey: "homepage_section_goal_cards_visible",
  },
  {
    id: "bundles",
    name: "Recommended Bundles",
    description: "Pre-packaged service bundles",
    icon: Package,
    settingKey: "homepage_section_bundles_visible",
  },
  {
    id: "services",
    name: "Service Categories",
    description: "Collapsible service category list",
    icon: Settings,
    settingKey: "homepage_section_services_visible",
  },
  {
    id: "how_it_works",
    name: "How It Works",
    description: "3-step process explanation",
    icon: Workflow,
    settingKey: "homepage_section_how_it_works_visible",
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Client reviews and ratings",
    icon: MessageSquare,
    settingKey: "homepage_section_testimonials_visible",
  },
  {
    id: "faq",
    name: "FAQ",
    description: "Frequently asked questions",
    icon: HelpCircle,
    settingKey: "homepage_section_faq_visible",
  },
  {
    id: "final_cta",
    name: "Final CTA",
    description: "Bottom call-to-action with lamp effect",
    icon: Megaphone,
    settingKey: "homepage_section_final_cta_visible",
  },
];

interface SectionManagerProps {
  onEditSection?: (sectionId: string) => void;
}

export const SectionManager: React.FC<SectionManagerProps> = ({ onEditSection }) => {
  const { data: settings = [] } = useSiteSettingsByCategory("visibility");
  const updateSetting = useUpdateSiteSetting();

  const isSectionVisible = (settingKey: string): boolean => {
    const setting = settings.find((s) => s.key === settingKey);
    // Default to visible if no setting exists
    return setting ? setting.value !== "false" : true;
  };

  const toggleSection = async (settingKey: string) => {
    const currentlyVisible = isSectionVisible(settingKey);
    await updateSetting.mutateAsync({
      key: settingKey,
      value: currentlyVisible ? "false" : "true",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Homepage Sections
        </CardTitle>
        <CardDescription>
          Toggle visibility of homepage sections. Hidden sections are not deleted, just not shown to visitors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {HOMEPAGE_SECTIONS.map((section) => {
            const visible = isSectionVisible(section.settingKey);
            const Icon = section.icon;

            return (
              <div
                key={section.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-all",
                  visible
                    ? "bg-card border-border/50"
                    : "bg-secondary/30 border-border/20 opacity-60"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Drag handle placeholder for future reordering */}
                  <GripVertical className="w-4 h-4 text-muted-foreground/30" />
                  
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    visible ? "bg-primary/10" : "bg-secondary"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      visible ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-medium",
                        !visible && "text-muted-foreground"
                      )}>
                        {section.name}
                      </span>
                      {!visible && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {onEditSection && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditSection(section.id)}
                      disabled={!visible}
                    >
                      Edit Content
                    </Button>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`toggle-${section.id}`} className="sr-only">
                      Toggle {section.name}
                    </Label>
                    <Switch
                      id={`toggle-${section.id}`}
                      checked={visible}
                      onCheckedChange={() => toggleSection(section.settingKey)}
                      disabled={updateSetting.isPending}
                    />
                    {visible ? (
                      <Eye className="w-4 h-4 text-primary" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Tip: Drag to reorder sections (coming soon)
        </p>
      </CardContent>
    </Card>
  );
};

export default SectionManager;
