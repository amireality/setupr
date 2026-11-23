import { Rocket, Globe, Zap, ArrowRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useDbBundles, useDbServices, formatPrice, calculateDbTotal } from "@/hooks/useServices";
import { motion } from "framer-motion";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "./ui/section-header";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Globe,
  Zap,
};

const BundleSkeleton = ({ gradient, title, subtitle }: { gradient: string; title: string; subtitle: string }) => (
  <div className={cn(
    "w-full h-20 md:h-24 rounded-xl bg-gradient-to-br shrink-0 relative overflow-hidden",
    gradient
  )}>
    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2)_0%,transparent_60%)]" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
      <span className="font-display text-lg md:text-xl font-bold text-foreground">{title}</span>
      <span className="text-xs text-muted-foreground">{subtitle}</span>
    </div>
  </div>
);

const RecommendedBundles = () => {
  const { data: bundles = [], isLoading: bundlesLoading } = useDbBundles();
  const { data: services = [], isLoading: servicesLoading } = useDbServices();
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  
  const sectionTitle = settings.find(s => s.key === "homepage_bundles_title")?.value || "Popular service bundles for new businesses";
  const sectionSubtitle = settings.find(s => s.key === "homepage_bundles_subtitle")?.value || "Save money with pre-built packages. Includes company registration, custom web engineering, digital presence, and AI workflows.";

  if (bundlesLoading || servicesLoading) {
    return (
      <section className="py-20 md:py-28 relative">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (bundles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 relative border-t border-white/[0.06] bg-black/20">
      <div className="container px-4 md:px-6 relative z-10">
        <SectionHeader
          icon={<Package />}
          badge="Curated Solutions"
          title={
            <>
              Popular Pre-Engineered Solution Bundles
            </>
          }
          subtitle={sectionSubtitle}
          alignment="center"
        />

        {/* Grid Layout: 3 columns for bundles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {bundles.map((bundle, index) => {
            const Icon = iconMap[bundle.icon] || Rocket;
            
            const getOutcomeLine = (name: string) => {
              if (name.includes("New Business Starter")) return "Company registered. Setup complete. You're official.";
              if (name.includes("Professional Online Presence")) return "Website live. Email active. Brand credible.";
              if (name.includes("Just One Thing")) return "Pick exactly what you need. Nothing more.";
              return "Complete business setup solutions.";
            };

            return (
              <motion.div
                key={bundle.bundle_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/services?bundle=${bundle.bundle_id}`}
                  className={cn(
                    "block rounded-2xl transition-all duration-300 p-5",
                    "bg-[#141726]/90 hover:bg-[#171b2d] border border-white/[0.12] hover:border-white/[0.22]",
                    "shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6),0_0_24px_-4px_rgba(245,158,11,0.08)] hover:-translate-y-1",
                    "h-full flex flex-col group"
                  )}
                >
                  <BundleSkeleton 
                    gradient={bundle.gradient} 
                    title={getOutcomeLine(bundle.bundle_name)} 
                    subtitle="" 
                  />
                  
                  <div className="mt-4 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.04] border border-white/[0.08] text-primary group-hover:border-primary/30 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-base font-semibold text-zinc-100">
                          {bundle.bundle_name}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">
                          {bundle.who_its_for}
                        </p>
                      </div>
                    </div>
                    
                    {bundle.included_service_ids.length > 0 && (
                      <p className="text-xs text-zinc-500 mb-2 line-clamp-2">
                        {bundle.govt_fee_note}
                      </p>
                    )}

                    <div className="flex items-center justify-end mt-auto pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1 text-primary text-xs font-mono font-medium">
                        Configure <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendedBundles;