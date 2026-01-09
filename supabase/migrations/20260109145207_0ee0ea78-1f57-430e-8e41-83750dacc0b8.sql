-- Add trademark service as example of dynamically managed services
-- Note: Services will be managed in a services table for admin panel

-- Create services table for admin management
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    sub_category TEXT NOT NULL,
    service_name TEXT NOT NULL,
    description_short TEXT NOT NULL,
    who_its_for TEXT NOT NULL,
    setupr_fee_inr INTEGER NOT NULL,
    govt_or_third_party_fee TEXT NOT NULL DEFAULT '0',
    delivery_type TEXT NOT NULL CHECK (delivery_type IN ('coordination', 'done-for-you')),
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'add-on', 'bundle-only')),
    default_selected BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bundles table
CREATE TABLE public.bundles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bundle_id TEXT UNIQUE NOT NULL,
    bundle_name TEXT NOT NULL,
    who_its_for TEXT NOT NULL,
    included_service_ids TEXT[] NOT NULL DEFAULT '{}',
    bundle_setupr_fee INTEGER NOT NULL,
    govt_fee_note TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT 'Package',
    gradient TEXT NOT NULL DEFAULT 'from-primary/20 via-primary/10 to-transparent',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create service categories table
CREATE TABLE public.service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    intro TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Building2',
    gradient TEXT NOT NULL DEFAULT 'from-primary/20 via-primary/10 to-transparent',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (services are public info)
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Anyone can view bundles" ON public.bundles FOR SELECT USING (true);
CREATE POLICY "Anyone can view categories" ON public.service_categories FOR SELECT USING (true);

-- Admin-only write access
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert bundles" ON public.bundles FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update bundles" ON public.bundles FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete bundles" ON public.bundles FOR DELETE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert categories" ON public.service_categories FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update categories" ON public.service_categories FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete categories" ON public.service_categories FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_bundles_updated_at BEFORE UPDATE ON public.bundles FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.service_categories FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Insert initial categories
INSERT INTO public.service_categories (category_id, title, intro, icon, gradient, sort_order) VALUES
('business-formation', 'Business Formation & Legal Identity', 'Get your business registered and legally recognized.', 'Building2', 'from-primary/20 via-primary/10 to-transparent', 1),
('digital-presence', 'Digital Presence & Business Identity', 'Your website, domain, and email — set up professionally.', 'Globe', 'from-accent/20 via-accent/10 to-transparent', 2),
('trust-compliance', 'Trust, Compliance & Risk Reduction', 'The registrations and filings you need to operate legally.', 'Shield', 'from-secondary/40 via-secondary/20 to-transparent', 3),
('visibility', 'Visibility & Discoverability Setup', 'Get found online with profiles and listings.', 'Eye', 'from-primary/15 via-accent/10 to-transparent', 4),
('operations', 'Business Operations & Essentials', 'Internal tools and workflows to run smoothly.', 'Settings', 'from-accent/15 via-secondary/10 to-transparent', 5);

-- Insert all services including the new trademark service
INSERT INTO public.services (service_id, category, sub_category, service_name, description_short, who_its_for, setupr_fee_inr, govt_or_third_party_fee, delivery_type, visibility, sort_order) VALUES
-- Business Formation
('proprietorship', 'business-formation', 'Business Registration', 'Proprietorship Registration', 'Simple structure for solo businesses', 'Freelancers and solo professionals', 2999, '0', 'done-for-you', 'public', 1),
('partnership', 'business-formation', 'Business Registration', 'Partnership Firm Registration', 'For two or more partners', 'Business partners starting together', 4999, 'Stamp duty extra', 'done-for-you', 'public', 2),
('llp', 'business-formation', 'Business Registration', 'LLP Registration', 'Limited liability with flexibility', 'Growing businesses wanting protection', 9999, 'MCA fees extra', 'done-for-you', 'public', 3),
('pvt-ltd', 'business-formation', 'Business Registration', 'Private Limited Company Registration', 'Formal structure for scaling', 'Businesses planning to raise investment', 12999, 'MCA fees extra', 'done-for-you', 'public', 4),
('opc', 'business-formation', 'Business Registration', 'One Person Company (OPC) Registration', 'Company structure for solo founders', 'Solo entrepreneurs wanting company benefits', 11999, 'MCA fees extra', 'done-for-you', 'public', 5),
('msme', 'business-formation', 'Government Registrations', 'MSME / Udyam Registration', 'Access government schemes and benefits', 'Small and medium businesses', 1499, '0', 'done-for-you', 'public', 6),
('trade-license', 'business-formation', 'Government Registrations', 'Trade License Assistance', 'Local authority permission to operate', 'Businesses with physical locations', 2499, 'Govt fees extra', 'coordination', 'public', 7),
('shop-establishment', 'business-formation', 'Government Registrations', 'Shop & Establishment Registration', 'State-level business registration', 'Retail and service businesses', 2499, 'Govt fees extra', 'coordination', 'public', 8),
('trademark', 'business-formation', 'Legal Protection', 'Trademark Registration', 'Protect your brand name and logo legally', 'Businesses wanting brand protection', 6999, '₹4,500 (Individual/Startup/MSME) or ₹9,000 (Company/LLP/Partnership)', 'done-for-you', 'public', 9),

-- Digital Presence
('domain-hosting', 'digital-presence', 'Domain & Email', 'Domain & Hosting Setup', 'Your own web address and hosting', 'Anyone starting online', 2999, 'Domain/hosting at actuals', 'done-for-you', 'public', 1),
('email', 'digital-presence', 'Domain & Email', 'Business Email Setup', 'Professional email with your domain', 'Businesses wanting credibility', 1999, 'Email subscription at actuals', 'done-for-you', 'public', 2),
('website', 'digital-presence', 'Website', 'Basic Website Setup (5 pages)', 'A simple, professional website', 'Businesses needing online presence', 9999, 'Hosting extra', 'done-for-you', 'public', 3),
('website-content', 'digital-presence', 'Website', 'Website Content Setup', 'Content structuring for your website', 'Those who need help organizing content', 4999, '0', 'done-for-you', 'public', 4),
('website-customization', 'digital-presence', 'Website', 'Website UI Customization', 'Custom look and feel for your site', 'Businesses wanting unique design', 6999, '0', 'done-for-you', 'public', 5),
('ssl-security', 'digital-presence', 'Website', 'SSL & Security Setup', 'Secure your website with HTTPS', 'All websites handling user data', 1499, 'SSL cost extra', 'done-for-you', 'public', 6),
('payment-gateway', 'digital-presence', 'Payments', 'Payment Gateway Setup', 'Accept online payments', 'Businesses selling online', 2499, 'Gateway charges extra', 'done-for-you', 'public', 7),

-- Trust & Compliance
('gst', 'trust-compliance', 'Tax & Compliance', 'GST Registration', 'Required for invoicing and tax compliance', 'Businesses with turnover above threshold', 2499, '0', 'done-for-you', 'public', 1),
('current-account', 'trust-compliance', 'Banking', 'Current Account Assistance', 'Help opening a business bank account', 'New businesses needing banking', 1999, 'Bank charges', 'coordination', 'public', 2),
('invoice-setup', 'trust-compliance', 'Documentation', 'Professional Invoice Setup', 'Branded invoice templates', 'Businesses sending invoices', 1499, '0', 'done-for-you', 'public', 3),
('pan-tan', 'trust-compliance', 'Tax & Compliance', 'PAN–TAN Assistance', 'Tax identity for your business', 'Businesses needing tax registration', 1499, 'Govt fees extra', 'coordination', 'public', 4),
('compliance-support', 'trust-compliance', 'Compliance', 'Annual Compliance Reminder & Support', 'Stay on top of yearly filings', 'Registered companies', 2999, 'Filing fees extra', 'coordination', 'public', 5),
('legal-docs', 'trust-compliance', 'Documentation', 'Basic Legal Documentation', 'MOA/AOA guidance and templates', 'Companies needing founding documents', 3999, '0', 'done-for-you', 'public', 6),

-- Visibility
('google-business', 'visibility', 'Local Visibility', 'Google Business Profile Setup', 'Appear in local search results', 'Local and service businesses', 1999, '0', 'done-for-you', 'public', 1),
('social-media', 'visibility', 'Social Media', 'Social Media Account Setup', 'Profiles on up to 3 platforms', 'Businesses building online presence', 2499, '0', 'done-for-you', 'public', 2),
('whatsapp-business', 'visibility', 'Communication', 'WhatsApp Business Setup', 'Professional WhatsApp for customers', 'Businesses using WhatsApp', 1499, '0', 'done-for-you', 'public', 3),
('directory-listings', 'visibility', 'Local Visibility', 'Business Listing on Directories', 'Get listed on business directories', 'Businesses wanting more visibility', 2999, 'Listing fees extra', 'done-for-you', 'public', 4),
('brand-kit', 'visibility', 'Branding', 'Email Signature & Brand Kit Setup', 'Consistent branding across touchpoints', 'Professionals and teams', 1499, '0', 'done-for-you', 'public', 5),

-- Operations
('sop-setup', 'operations', 'Processes', 'Internal Process Setup (Basic SOPs)', 'Document your key processes', 'Growing teams', 4999, '0', 'done-for-you', 'public', 1),
('onboarding-workflow', 'operations', 'Processes', 'Client Onboarding Workflow Setup', 'Smooth onboarding for new clients', 'Service businesses', 3999, '0', 'done-for-you', 'public', 2),
('crm-setup', 'operations', 'Tools', 'CRM Setup (basic)', 'Manage leads and customers', 'Sales-driven businesses', 4999, 'CRM subscription extra', 'done-for-you', 'public', 3),
('accounting-setup', 'operations', 'Tools', 'Accounting Software Setup', 'Get your books organized', 'Businesses needing financial tracking', 2999, 'Software cost extra', 'done-for-you', 'public', 4);

-- Insert bundles
INSERT INTO public.bundles (bundle_id, bundle_name, who_its_for, included_service_ids, bundle_setupr_fee, govt_fee_note, icon, gradient, sort_order) VALUES
('new-business', 'New Business Starter', 'First-time business owners starting fresh', ARRAY['proprietorship', 'gst', 'website', 'google-business'], 15499, 'Government / platform fees extra (at actuals)', 'Rocket', 'from-primary/20 via-primary/10 to-transparent', 1),
('digital-presence', 'Professional Online Presence', 'Businesses needing credibility online', ARRAY['domain-hosting', 'website', 'email', 'ssl-security'], 14499, 'Domain, hosting, and email subscriptions at actuals', 'Globe', 'from-accent/20 via-accent/10 to-transparent', 2),
('just-one', 'Just One Thing', 'Pick exactly what you need', ARRAY[]::TEXT[], 0, '', 'Zap', 'from-secondary/40 via-secondary/20 to-transparent', 3);