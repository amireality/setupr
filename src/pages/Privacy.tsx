import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useSiteSetting } from "@/hooks/useSiteSettings";
import { renderMarkdown } from "@/lib/markdown";

const defaultContent = `## Privacy Policy

This privacy policy describes how Setupr collects, uses, and protects your personal information.

### Information We Collect

We collect information you provide directly to us, including name, email address, phone number, business details, and other information necessary to provide our services.

### How We Use Your Information

We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send technical notices and support messages
- Respond to your comments and questions
- Comply with legal obligations

### Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

### Your Rights

You have the right to access, update, or delete your personal information. Contact us at info@setupr.com to exercise these rights.`;

const Privacy = () => {
  const { data: setting, isLoading } = useSiteSetting("privacy_content");
  const content = setting?.value || defaultContent;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Setupr</title>
        <meta name="description" content="Read Setupr's privacy policy to understand how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://setupr.com/privacy" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">Privacy Policy</h1>
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

export default Privacy;
