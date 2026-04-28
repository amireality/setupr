CREATE TABLE public.email_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_preview TEXT NOT NULL DEFAULT '',
  template_type TEXT NOT NULL DEFAULT 'custom',
  status TEXT NOT NULL DEFAULT 'sent',
  error_message TEXT,
  sent_by UUID,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view email log"
  ON public.email_log FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert email log"
  ON public.email_log FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete email log"
  ON public.email_log FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_email_log_sent_at ON public.email_log(sent_at DESC);
CREATE INDEX idx_email_log_recipient ON public.email_log(recipient);