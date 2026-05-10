import { Star, Quote, MessageSquareHeart } from "lucide-react";
import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials";
import { cn } from "@/lib/utils";
import { useSiteSettingsByCategory } from "@/hooks/useSiteSettings";
import { SectionHeader } from "./ui/section-header";

const TestimonialSkeleton = ({ quote }: { quote: string }) => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-border/20 relative overflow-hidden">
      {/* Animated dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary) / 0.4) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Warm glow */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/25 rounded-full blur-3xl group-hover/bento:w-32 group-hover/bento:h-32 transition-all duration-500" />
      
      {/* Quote content */}
      <div className="absolute inset-0 flex items-center p-4">
        <div className="flex gap-3">
          <Quote className="w-6 h-6 text-primary/60 flex-shrink-0 mt-1" />
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed line-clamp-4">
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
    <section className="py-20 md:py-28 relative bg-black border-t border-primary/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative">
        <SectionHeader
          icon={<MessageSquareHeart />}
          badge={badge}
          title={
            <>
              Trusted by <span className="text-primary">{title}</span>
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
                "row-span-1 rounded-2xl group/bento hover:shadow-glow transition-all duration-300 p-4",
                "bg-secondary/40 backdrop-blur-sm border border-border/20 hover:border-primary/40",
                "flex flex-col overflow-hidden",
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