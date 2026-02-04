import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useSiteSetting } from "@/hooks/useSiteSettings";
import { renderMarkdown } from "@/lib/markdown";

const defaultContent = `## Refund Policy

We strive to provide excellent service. This policy outlines the conditions for refunds.

### Refund Eligibility

Refunds may be considered in the following cases:
- Service not initiated within promised timeline due to our fault
- Duplicate payment made by error
- Service cancellation before work commencement

### Non-Refundable Items

The following are non-refundable:
- Government fees paid on your behalf
- Third-party service charges
- Services already completed or in progress
- Consultation fees

### Refund Process

To request a refund, please email us at info@setupr.com with your order details and reason for the refund request. Refunds, when approved, will be processed within 7-10 business days.

### Contact Us

For any questions about our refund policy, please reach out to our support team at info@setupr.com.`;

const Refund = () => {
  const { data: setting, isLoading } = useSiteSetting("refund_content");
  const content = setting?.value || defaultContent;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Refund Policy | Setupr</title>
        <meta name="description" content="Read Setupr's refund policy to understand our refund eligibility and process for business services." />
        <link rel="canonical" href="https://setupr.com/refund" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {setting?.updated_at ? new Date(setting.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'January 2026'}
          </p>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              {renderMarkdown(content)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;
