DROP POLICY IF EXISTS "Anyone can submit intake" ON public.intake_submissions;
CREATE POLICY "Anyone can submit valid intake" ON public.intake_submissions
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 2 AND 120
  AND char_length(email) BETWEEN 6 AND 254
  AND email ~* '^[^@[:space:]]+@[^@[:space:]]+[.][^@[:space:]]+$'
  AND char_length(btrim(phone)) BETWEEN 7 AND 40
  AND char_length(btrim(city)) BETWEEN 1 AND 100
  AND char_length(btrim(current_stage)) BETWEEN 1 AND 80
  AND char_length(btrim(timeline)) BETWEEN 1 AND 100
  AND status IN ('pending', 'confirmed')
  AND cardinality(work_types) <= 20
  AND cardinality(selected_services) <= 50
  AND cardinality(existing_setup) <= 20
  AND char_length(array_to_string(
    coalesce(work_types, ARRAY[]::text[]) ||
    coalesce(selected_services, ARRAY[]::text[]) ||
    coalesce(existing_setup, ARRAY[]::text[]),
    E'\n'
  )) <= 6000
);

DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
CREATE POLICY "Public can view listed services" ON public.services
FOR SELECT TO anon, authenticated
USING (visibility = 'public');
CREATE POLICY "Admins can view all services" ON public.services
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can view categories" ON public.service_categories;
CREATE POLICY "Public can view categories with listed services" ON public.service_categories
FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.services s
  WHERE s.category = service_categories.category_id
    AND s.visibility = 'public'
));
CREATE POLICY "Admins can view all service categories" ON public.service_categories
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can view service FAQs" ON public.service_faqs;
CREATE POLICY "Public can view FAQs for listed services" ON public.service_faqs
FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.services s
  WHERE s.service_id = service_faqs.service_id
    AND s.visibility = 'public'
));
CREATE POLICY "Admins can view all service FAQs" ON public.service_faqs
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can view service deliverables" ON public.service_deliverables;
CREATE POLICY "Public can view deliverables for listed services" ON public.service_deliverables
FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.services s
  WHERE s.service_id = service_deliverables.service_id
    AND s.visibility = 'public'
));
CREATE POLICY "Admins can view all service deliverables" ON public.service_deliverables
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
CREATE POLICY "Public can view featured testimonials" ON public.testimonials
FOR SELECT TO anon, authenticated
USING (is_featured = true);
CREATE POLICY "Admins can view all testimonials" ON public.testimonials
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can view cms assets" ON storage.objects;
CREATE POLICY "Admins can list cms assets" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'cms-assets'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);