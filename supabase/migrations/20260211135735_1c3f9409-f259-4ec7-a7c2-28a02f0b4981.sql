
-- Create cms-assets storage bucket for admin-managed images
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-assets', 'cms-assets', true);

-- Public read access
CREATE POLICY "Anyone can view cms assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'cms-assets');

-- Admin-only upload
CREATE POLICY "Admins can upload cms assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'cms-assets' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Admin-only update
CREATE POLICY "Admins can update cms assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'cms-assets' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Admin-only delete
CREATE POLICY "Admins can delete cms assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'cms-assets' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
