import { Vortex } from "@/components/ui/vortex";

const ServiceIntro = () => {
  return (
    <section className="relative overflow-hidden">
      <Vortex
        backgroundColor="hsl(var(--background))"
        baseHue={25}
        rangeHue={20}
        rangeY={200}
        particleCount={500}
        baseSpeed={0.1}
        rangeSpeed={1.2}
        className="flex items-center justify-center py-24 md:py-32"
        containerClassName="min-h-[50vh]"
      >
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up text-balance">
              Build Your Business Setup
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-up-delay-1">
              Choose the services you need today. Add more as your business grows.
            </p>
            <p className="text-sm text-muted-foreground/70 animate-fade-up-delay-2">
              No forced packages. No long-term commitments.
            </p>
          </div>
        </div>
      </Vortex>
    </section>
  );
};

export default ServiceIntro;
