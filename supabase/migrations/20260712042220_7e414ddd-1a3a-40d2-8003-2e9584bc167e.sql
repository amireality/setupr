ALTER TABLE public.services DROP CONSTRAINT IF EXISTS services_visibility_check;
ALTER TABLE public.services ADD CONSTRAINT services_visibility_check
  CHECK (visibility = ANY (ARRAY['public'::text, 'add-on'::text, 'bundle-only'::text, 'hidden'::text]));