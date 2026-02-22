
-- Create store_categories table
CREATE TABLE public.store_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Package',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create store_products table
CREATE TABLE public.store_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ingram_sku text,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  long_description text NOT NULL DEFAULT '',
  category_id uuid REFERENCES public.store_categories(id) ON DELETE SET NULL,
  product_type text NOT NULL DEFAULT 'subscription',
  vendor text NOT NULL DEFAULT '',
  vendor_logo_url text,
  featured_image_url text,
  base_price_inr numeric NOT NULL DEFAULT 0,
  billing_cycle text NOT NULL DEFAULT 'monthly',
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  ingram_metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create store_product_plans table
CREATE TABLE public.store_product_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.store_products(id) ON DELETE CASCADE,
  plan_name text NOT NULL,
  ingram_sku text,
  price_inr numeric NOT NULL DEFAULT 0,
  billing_cycle text NOT NULL DEFAULT 'monthly',
  seat_minimum integer NOT NULL DEFAULT 1,
  seat_maximum integer,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create customer_profiles table
CREATE TABLE public.customer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL DEFAULT '',
  gstin text,
  billing_address text,
  phone text,
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.store_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_product_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS: store_categories (public read, admin write)
CREATE POLICY "Anyone can view active store categories" ON public.store_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all store categories" ON public.store_categories FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert store categories" ON public.store_categories FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update store categories" ON public.store_categories FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete store categories" ON public.store_categories FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS: store_products (public read active, admin write)
CREATE POLICY "Anyone can view active store products" ON public.store_products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all store products" ON public.store_products FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert store products" ON public.store_products FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update store products" ON public.store_products FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete store products" ON public.store_products FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS: store_product_plans (public read active, admin write)
CREATE POLICY "Anyone can view active store plans" ON public.store_product_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all store plans" ON public.store_product_plans FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert store plans" ON public.store_product_plans FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update store plans" ON public.store_product_plans FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete store plans" ON public.store_product_plans FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS: customer_profiles (own read/write, admin read all)
CREATE POLICY "Users can view own profile" ON public.customer_profiles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.customer_profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can insert own profile" ON public.customer_profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can view all customer profiles" ON public.customer_profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update customer profiles" ON public.customer_profiles FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER store_categories_updated_at BEFORE UPDATE ON public.store_categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER store_products_updated_at BEFORE UPDATE ON public.store_products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER store_product_plans_updated_at BEFORE UPDATE ON public.store_product_plans FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER customer_profiles_updated_at BEFORE UPDATE ON public.customer_profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create customer profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_customer()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.customer_profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_customer
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_customer();
