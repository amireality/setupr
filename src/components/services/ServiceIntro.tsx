const ServiceIntro = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

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
    </section>
  );
};

export default ServiceIntro;
