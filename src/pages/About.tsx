import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">About Setupr</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Setupr is your trusted partner in business setup and compliance services. We help entrepreneurs 
              and businesses navigate the complexities of starting and running a company in India.
            </p>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">Our Mission</h2>
            <p>
              To simplify business formation and compliance, enabling entrepreneurs to focus on what they do 
              best - building great products and services.
            </p>
            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">Why Choose Us</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Expert guidance from experienced professionals</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>End-to-end support from registration to compliance</li>
              <li>Fast turnaround times</li>
              <li>Dedicated support team</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
