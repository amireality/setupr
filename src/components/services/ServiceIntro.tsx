import { Spotlight } from "@/components/ui/spotlight";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";

const ServiceIntro = () => {
  const { data: settings = [] } = useSiteSettingsByCategory("services");
  
  const getSetting = (key: string, fallback: string) => 
    settings.find((s) => s.key === key)?.value || fallback;

  const introTitle = getSetting("services_intro_title", "Business registration services in India");
  const introSubtitle = getSetting("services_intro_subtitle", "Company registration, GST, MSME, compliance, website, and digital presence for freelancers, consultants, and startups.");
  const introNote = getSetting("services_intro_note", "Pick individual services or choose a bundle. Transparent pricing. No hidden fees. Add more anytime.");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      />

      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up text-balance">
            {introTitle}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-up-delay-1">
            {introSubtitle}
          </p>
          <p className="text-sm text-muted-foreground/70 animate-fade-up-delay-2">
            {introNote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntro;
