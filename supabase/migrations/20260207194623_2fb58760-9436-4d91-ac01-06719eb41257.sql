-- Add explicit UPDATE policy for intake_submissions table (admin-only)
CREATE POLICY "Admins can update submissions"
ON public.intake_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));