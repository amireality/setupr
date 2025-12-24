const ServiceIntro = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up">
            Build Your Business Setup
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-up-delay-1">
            Choose the services you need today. Add more as your business grows.
          </p>
          <p className="text-sm text-muted-foreground/80 animate-fade-up-delay-2">
            No forced packages. No long-term commitments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceIntro;