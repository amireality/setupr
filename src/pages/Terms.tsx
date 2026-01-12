import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2026</p>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Setupr's services, you accept and agree to be bound by the terms and 
                conditions outlined in this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">2. Services</h2>
              <p>
                Setupr provides business formation, compliance, and related professional services. The specific 
                terms for each service will be outlined in individual service agreements.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">3. Payment Terms</h2>
              <p>
                All fees are payable in Indian Rupees (INR). Government fees are collected separately and paid 
                directly to the respective authorities on your behalf.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">4. User Responsibilities</h2>
              <p>
                You are responsible for providing accurate and complete information required for our services. 
                Any delays due to incorrect information will not be the responsibility of Setupr.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">5. Contact</h2>
              <p>
                For any questions regarding these terms, please contact us at info@setupr.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
