import { Star, Quote, MessageSquareHeart } from "lucide-react";
import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials";
import { cn } from "@/lib/utils";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "./ui/section-header";

const TestimonialSkeleton = ({ quote }: { quote: string }) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden">
      {/* Subtle micro grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]" />
      
      {/* Quote content */}
      <div className="absolute inset-0 flex items-center p-5">
        <div className="flex gap-3">
          <Quote className="w-5 h-5 text-primary/80 shrink-0 mt-0.5" />
          <p className="text-sm md:text-base text-zinc-200 leading-relaxed line-clamp-4 font-normal">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials(true);
  const { data: settings = [] } = useSiteSettingsByCategory("homepage");
  
  const badge = settings.find(s => s.key === "homepage_testimonials_badge")?.value || "TESTIMONIALS";
  const rawTitle = settings.find(s => s.key === "homepage_testimonials_title")?.value || "Entrepreneurs";
  const title = rawTitle.replace(/^Trusted by\s*/i, "");
  const subtitle = settings.find(s => s.key === "homepage_testimonials_subtitle")?.value || "See what our clients say about their experience with Setupr.";
  const tagline = settings.find(s => s.key === "homepage_testimonials_tagline")?.value || "Built for founders who didn't know where to begin.";

  if (isLoading) {
    return (
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Determine grid layout classes for varying sizes
  const getGridClass = (index: number) => {
    // Create visual variety: first card wider, alternate sizes
    if (index === 0) return "md:col-span-2";
    if (index === 2) return "md:col-span-2";
    return "md:col-span-1";
  };

  return (
    <section className="py-20 md:py-28 relative bg-[#090a0d] border-t border-white/[0.06] overflow-hidden">
      {/* Subtle ambient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative">
        <SectionHeader
          icon={<MessageSquareHeart />}
          badge={badge}
          title={
            <>
              Trusted by <span className="gradient-text">{title}</span>
            </>
          }
          subtitle={
            <>
              {tagline && <span className="block mb-2 text-foreground font-medium">{tagline}</span>}
              {subtitle}
            </>
          }
          alignment="center"
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "row-span-1 rounded-2xl group/bento transition-all duration-300 p-4",
                "bg-[#0c0d12]/70 hover:bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.18]",
                "flex flex-col overflow-hidden hover:-translate-y-1",
                getGridClass(index)
              )}
            >
              {/* Quote in glowing header */}
              <TestimonialSkeleton quote={testimonial.quote} />

              {/* Content below */}
              <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                {/* Client info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {testimonial.client_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {testimonial.client_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.business_type}
                    </p>
                  </div>
                </div>

                {/* Service used tag */}
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    {testimonial.service_used}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;