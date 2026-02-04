-- Create authors table for team/author management
CREATE TABLE public.authors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  avatar_initials TEXT NOT NULL DEFAULT '',
  twitter_url TEXT,
  linkedin_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view active authors
CREATE POLICY "Anyone can view active authors"
ON public.authors
FOR SELECT
USING (is_active = true);

-- Admins can view all authors
CREATE POLICY "Admins can view all authors"
ON public.authors
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert authors
CREATE POLICY "Admins can insert authors"
ON public.authors
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update authors
CREATE POLICY "Admins can update authors"
ON public.authors
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete authors
CREATE POLICY "Admins can delete authors"
ON public.authors
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger
CREATE TRIGGER update_authors_updated_at
BEFORE UPDATE ON public.authors
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Seed initial author (Amir Khan)
INSERT INTO public.authors (slug, name, title, bio, avatar_initials, twitter_url, linkedin_url, is_active, sort_order)
VALUES (
  'amir-khan',
  'Amir Khan',
  'Founder, Setupr',
  'Amir Khan is the founder of Setupr, a platform focused on simplifying business setup, compliance, and digital presence for freelancers, startups, and small teams in India. He works on building systems and resources to help early founders start with clarity.',
  'AK',
  'https://x.com/setuprhq',
  'https://linkedin.com/company/setupr',
  true,
  0
);