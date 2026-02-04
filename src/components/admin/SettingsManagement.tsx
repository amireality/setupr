import { Settings2 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { useSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { useDbServices } from "@/hooks/useServices";
import LegalDocumentsSection from "./settings/LegalDocumentsSection";
import PageSettingsSection from "./settings/PageSettingsSection";
import FooterSettingsSection from "./settings/FooterSettingsSection";
import ServiceSettingsSection from "./settings/ServiceSettingsSection";
import AccountSettingsSection from "./settings/AccountSettingsSection";

const SettingsManagement = () => {
  const { data: settings = [], isLoading } = useSiteSettings();
  const { data: services = [] } = useDbServices();
  const updateSetting = useUpdateSiteSetting();

  const handleSave = async (key: string, value: string) => {
    await updateSetting.mutateAsync({ key, value });
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
      <div className="flex items-center gap-3 mb-6">
        <Settings2 className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-xl font-display font-semibold">Site Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your website content, legal documents, and account settings
          </p>
        </div>
      </div>

      <Accordion type="multiple" className="w-full space-y-2" defaultValue={["legal"]}>
        {/* Legal Documents */}
        <LegalDocumentsSection 
          settings={settings} 
          onSave={handleSave} 
          isPending={updateSetting.isPending} 
        />

        {/* Page-specific Settings */}
        <PageSettingsSection 
          settings={settings} 
          onSave={handleSave} 
          isPending={updateSetting.isPending} 
        />

        {/* Individual Services */}
        <ServiceSettingsSection 
          settings={settings} 
          services={services}
          onSave={handleSave} 
          isPending={updateSetting.isPending} 
        />

        {/* Footer Settings */}
        <FooterSettingsSection 
          settings={settings} 
          onSave={handleSave} 
          isPending={updateSetting.isPending} 
        />

        {/* Account Settings */}
        <AccountSettingsSection />
      </Accordion>
    </div>
  );
};

export default SettingsManagement;
