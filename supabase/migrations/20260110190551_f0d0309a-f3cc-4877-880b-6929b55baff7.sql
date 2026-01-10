-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  business_type text NOT NULL,
  service_used text NOT NULL,
  quote text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for testimonials
CREATE POLICY "Anyone can view testimonials" ON public.testimonials
  FOR SELECT USING (true);

-- Admin insert access
CREATE POLICY "Admins can insert testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update access
CREATE POLICY "Admins can update testimonials" ON public.testimonials
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete access
CREATE POLICY "Admins can delete testimonials" ON public.testimonials
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  featured_image_url text,
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  author_name text NOT NULL DEFAULT 'Setupr Team',
  read_time_minutes integer NOT NULL DEFAULT 5,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts only
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
  FOR SELECT USING (is_published = true);

-- Admin full read access (including unpublished)
CREATE POLICY "Admins can view all posts" ON public.blog_posts
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin insert access
CREATE POLICY "Admins can insert posts" ON public.blog_posts
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update access
CREATE POLICY "Admins can update posts" ON public.blog_posts
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete access
CREATE POLICY "Admins can delete posts" ON public.blog_posts
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger for blog_posts
CREATE TRIGGER handle_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Insert sample testimonials
INSERT INTO public.testimonials (client_name, business_type, service_used, quote, rating, is_featured, sort_order) VALUES
('Priya Sharma', 'E-commerce Founder', 'Pvt Ltd Registration + GST', 'Setupr made the entire company registration process seamless. Within 2 weeks, I had my Pvt Ltd registered with GST. Highly recommend!', 5, true, 1),
('Rahul Mehta', 'Tech Startup CEO', 'LLP Registration', 'As a first-time entrepreneur, I was overwhelmed by the paperwork. Setupr handled everything professionally and kept me updated throughout.', 5, true, 2),
('Ananya Gupta', 'Freelance Designer', 'Proprietorship + MSME', 'Quick, affordable, and hassle-free. Got my MSME registration in just 3 days. The team is super responsive on WhatsApp.', 5, true, 3),
('Vikram Singh', 'Restaurant Owner', 'FSSAI License + GST', 'Professional service at reasonable prices. They guided me through all the food license requirements. Very satisfied!', 4, false, 4),
('Sneha Reddy', 'Online Educator', 'OPC Registration', 'Excellent support throughout the process. The cost calculator helped me plan my budget perfectly. Transparent pricing!', 5, false, 5);

-- Insert sample blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, category, is_published, published_at, author_name, read_time_minutes, sort_order) VALUES
('pvt-ltd-vs-llp-which-is-right', 'Private Limited vs LLP: Which is Right for Your Business?', 'Confused between Pvt Ltd and LLP? This comprehensive guide breaks down the key differences to help you make the right choice.', '## Introduction

Choosing the right business structure is one of the most important decisions you''ll make as an entrepreneur. Two popular options in India are Private Limited Company (Pvt Ltd) and Limited Liability Partnership (LLP). Let''s break down the key differences.

## Private Limited Company

A Pvt Ltd is ideal for businesses looking to raise funding or scale rapidly.

**Advantages:**
- Separate legal entity
- Easy to raise venture capital
- Better credibility with banks and clients
- Perpetual succession

**Considerations:**
- More compliance requirements
- Higher registration costs
- Mandatory annual audits

## Limited Liability Partnership (LLP)

LLPs offer flexibility with limited liability protection.

**Advantages:**
- Lower compliance burden
- No mandatory audit (under ₹40 lakh turnover)
- Flexible profit sharing
- Lower registration costs

**Considerations:**
- Harder to raise VC funding
- Cannot issue shares

## Which Should You Choose?

- **Choose Pvt Ltd if:** You plan to raise funding, want maximum credibility, or expect rapid growth
- **Choose LLP if:** You''re a small team, want flexibility, or are in professional services

Need help deciding? Our experts at Setupr can guide you through the process.', 'Business Formation', true, now(), 'Setupr Team', 5, 1),

('gst-registration-complete-guide', 'GST Registration: A Complete Guide for New Businesses', 'Everything you need to know about GST registration - when it''s mandatory, required documents, and the registration process.', '## What is GST Registration?

GST (Goods and Services Tax) registration is mandatory for businesses with annual turnover exceeding ₹40 lakhs (₹20 lakhs for services). Here''s your complete guide.

## When is GST Registration Mandatory?

- Annual turnover exceeds threshold limit
- Inter-state supply of goods/services
- E-commerce operators and sellers
- Casual taxable persons

## Documents Required

1. PAN card of the business/proprietor
2. Aadhaar card
3. Business registration proof
4. Bank account details
5. Address proof of business premises
6. Photograph of proprietor/partners/directors

## Registration Process

1. Visit the GST portal
2. Fill Part A of the application
3. Complete Part B with business details
4. Upload required documents
5. Verification through OTP/Digital signature
6. Receive GSTIN within 3-7 working days

## Benefits of GST Registration

- Legal recognition
- Input tax credit
- Interstate business operations
- E-commerce platform selling

Let Setupr handle your GST registration hassle-free!', 'Compliance', true, now(), 'Setupr Team', 4, 2),

('digital-presence-new-business', '5 Essential Digital Tools Every New Business Needs', 'From websites to payment gateways, discover the must-have digital tools to launch your business successfully in 2024.', '## The Digital Essentials

In today''s digital-first world, having the right online presence is crucial for business success. Here are 5 essential tools every new business needs.

## 1. Professional Website

Your website is your digital storefront. A well-designed website:
- Builds credibility
- Showcases your products/services
- Generates leads 24/7

## 2. Google Business Profile

A free tool that helps local customers find you:
- Appear in Google Maps
- Collect customer reviews
- Share business updates

## 3. WhatsApp Business

India''s preferred communication channel:
- Professional business profile
- Quick replies and catalogs
- Customer labels and organization

## 4. Payment Gateway

Accept payments seamlessly:
- UPI integration
- Credit/debit cards
- EMI options for customers

## 5. Accounting Software

Keep your finances organized:
- Invoice generation
- Expense tracking
- GST-compliant reports

## Get Started with Setupr

We offer complete digital setup packages including website development, WhatsApp Business setup, and payment gateway integration. Focus on your business while we handle the tech!', 'Digital Setup', true, now(), 'Setupr Team', 3, 3);