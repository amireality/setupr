import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2026</p>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">Refund Eligibility</h2>
              <p>
                We strive to provide excellent service. Refunds may be considered in the following cases:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Service not initiated within promised timeline due to our fault</li>
                <li>Duplicate payment made by error</li>
                <li>Service cancellation before work commencement</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">Non-Refundable Items</h2>
              <p>The following are non-refundable:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Government fees paid on your behalf</li>
                <li>Third-party service charges</li>
                <li>Services already completed or in progress</li>
                <li>Consultation fees</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">Refund Process</h2>
              <p>
                To request a refund, please email us at info@setupr.com with your order details and reason 
                for the refund request. Refunds, when approved, will be processed within 7-10 business days.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground">Contact Us</h2>
              <p>
                For any questions about our refund policy, please reach out to our support team at info@setupr.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;
