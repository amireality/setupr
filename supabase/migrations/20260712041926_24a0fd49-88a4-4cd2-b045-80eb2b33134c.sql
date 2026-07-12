ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS available_regions text[] NOT NULL DEFAULT ARRAY['Global']::text[],
  ADD COLUMN IF NOT EXISTS is_regional boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS services_is_regional_idx ON public.services (is_regional);