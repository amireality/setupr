-- Add DELETE policy for admins on intake_submissions table
-- This enables GDPR/CCPA compliance for data deletion requests
CREATE POLICY "Admins can delete submissions"
ON public.intake_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));