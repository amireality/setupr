
-- Create service_faqs table
CREATE TABLE public.service_faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service_deliverables table
CREATE TABLE public.service_deliverables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_deliverables ENABLE ROW LEVEL SECURITY;

-- RLS policies for service_faqs
CREATE POLICY "Anyone can view service FAQs" ON public.service_faqs FOR SELECT USING (true);
CREATE POLICY "Admins can insert service FAQs" ON public.service_faqs FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update service FAQs" ON public.service_faqs FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete service FAQs" ON public.service_faqs FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for service_deliverables
CREATE POLICY "Anyone can view service deliverables" ON public.service_deliverables FOR SELECT USING (true);
CREATE POLICY "Admins can insert service deliverables" ON public.service_deliverables FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update service deliverables" ON public.service_deliverables FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete service deliverables" ON public.service_deliverables FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_service_faqs_updated_at BEFORE UPDATE ON public.service_faqs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_service_deliverables_updated_at BEFORE UPDATE ON public.service_deliverables FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
