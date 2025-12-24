-- Create table for intake submissions
CREATE TABLE public.intake_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contact details
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  
  -- Intake data
  current_stage TEXT NOT NULL,
  work_types TEXT[] NOT NULL DEFAULT '{}',
  selected_services TEXT[] NOT NULL DEFAULT '{}',
  existing_setup TEXT[] NOT NULL DEFAULT '{}',
  timeline TEXT NOT NULL,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no auth required for lead capture)
CREATE POLICY "Anyone can submit intake"
ON public.intake_submissions
FOR INSERT
WITH CHECK (true);

-- Only allow reading own submissions (if we add auth later)
CREATE POLICY "Public can view submissions"
ON public.intake_submissions
FOR SELECT
USING (true);