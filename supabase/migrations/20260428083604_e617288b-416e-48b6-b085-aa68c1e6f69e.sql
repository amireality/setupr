-- Trigger function that calls the send-welcome-email edge function via pg_net
CREATE OR REPLACE FUNCTION public.handle_new_user_welcome_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  edge_url text;
  service_key text;
BEGIN
  -- Use Supabase project URL for the edge function call
  edge_url := 'https://jfnyvtdiqejwyzbvhlry.supabase.co/functions/v1/send-welcome-email';

  -- Fire-and-forget HTTP call using pg_net
  PERFORM net.http_post(
    url := edge_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'email', NEW.email,
      'name', COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
    )
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block signup if email fails
  RETURN NEW;
END;
$$;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created_welcome ON auth.users;
CREATE TRIGGER on_auth_user_created_welcome
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_welcome_email();