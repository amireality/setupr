import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useSiteSetting } from "@/hooks/useSiteSettings";
import { renderMarkdown } from "@/lib/markdown";

const defaultContent = `## Terms of Service

These are the default terms of service for Setupr. You can edit this content from the admin panel.

### Acceptance of Terms

By accessing and using Setupr services, you agree to be bound by these Terms and Conditions.

### Services

Setupr provides business registration, compliance, and related professional services in India.

### Payment Terms

- All fees are exclusive of GST (18%)
- Payment is required before service commencement
- Government fees are collected separately

### Limitation of Liability

Setupr acts as a facilitator and is not liable for delays caused by government departments or third parties.

### Contact

For questions about these terms, contact us at info@setupr.com`;

const Terms = () => {
  const { data: setting, isLoading } = useSiteSetting("terms_content");
  const content = setting?.value || defaultContent;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms & Conditions | Setupr</title>
        <meta name="description" content="Read the terms and conditions for using Setupr's business registration and compliance services in India." />
        <link rel="canonical" href="https://setupr.com/terms" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">Terms & Conditions</h1>
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

export default Terms;
