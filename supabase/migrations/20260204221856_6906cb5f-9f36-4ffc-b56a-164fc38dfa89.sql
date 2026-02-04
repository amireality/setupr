-- Create site_settings table for editable page content
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'content',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read all settings (needed for displaying content)
CREATE POLICY "Anyone can view settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can insert settings
CREATE POLICY "Admins can insert settings"
ON public.site_settings
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update settings
CREATE POLICY "Admins can update settings"
ON public.site_settings
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete settings
CREATE POLICY "Admins can delete settings"
ON public.site_settings
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default values for legal pages and content
INSERT INTO public.site_settings (key, value, category) VALUES
('terms_content', '## Terms of Service

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

For questions about these terms, contact us at info@setupr.com', 'legal'),

('privacy_content', '## Privacy Policy

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

You have the right to access, update, or delete your personal information. Contact us at info@setupr.com to exercise these rights.', 'legal'),

('refund_content', '## Refund Policy

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

For any questions about our refund policy, please reach out to our support team at info@setupr.com.', 'legal'),

('footer_tagline', 'Your trusted partner for business setup & compliance in India.', 'content'),
('footer_ownership', 'Owned & operated by Altered.', 'content');