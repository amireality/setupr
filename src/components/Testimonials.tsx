import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials(true);

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

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wide text-primary bg-primary/10 rounded-full border border-primary/20">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Trusted by <span className="gradient-text">Entrepreneurs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our clients say about their experience with Setupr.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col"
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/40" />
              </div>

              {/* Quote text */}
              <p className="text-foreground/90 mb-6 flex-grow leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
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
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {testimonial.client_name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.client_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.business_type}
                  </p>
                </div>
              </div>

              {/* Service used tag */}
              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                  {testimonial.service_used}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
