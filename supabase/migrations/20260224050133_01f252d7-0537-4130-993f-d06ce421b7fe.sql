
-- Cart items table
CREATE TABLE public.store_cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.store_products(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.store_product_plans(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, plan_id)
);

ALTER TABLE public.store_cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart" ON public.store_cart_items FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can add to own cart" ON public.store_cart_items FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own cart" ON public.store_cart_items FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own cart items" ON public.store_cart_items FOR DELETE USING (user_id = auth.uid());

CREATE TRIGGER update_store_cart_items_updated_at
  BEFORE UPDATE ON public.store_cart_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Orders table
CREATE TABLE public.store_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_provider TEXT,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  subtotal_inr NUMERIC NOT NULL DEFAULT 0,
  tax_inr NUMERIC NOT NULL DEFAULT 0,
  total_inr NUMERIC NOT NULL DEFAULT 0,
  billing_address TEXT,
  gstin TEXT,
  company_name TEXT,
  ingram_order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.store_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON public.store_orders FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all orders" ON public.store_orders FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON public.store_orders FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert orders" ON public.store_orders FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_store_orders_updated_at
  BEFORE UPDATE ON public.store_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Order items table
CREATE TABLE public.store_order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.store_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.store_products(id),
  plan_id UUID REFERENCES public.store_product_plans(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_inr NUMERIC NOT NULL DEFAULT 0,
  total_inr NUMERIC NOT NULL DEFAULT 0,
  ingram_sku TEXT,
  license_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.store_order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items" ON public.store_order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.store_orders WHERE id = order_id AND user_id = auth.uid()));
CREATE POLICY "Admins can view all order items" ON public.store_order_items FOR SELECT 
  USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert order items" ON public.store_order_items FOR INSERT 
  WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update order items" ON public.store_order_items FOR UPDATE 
  USING (has_role(auth.uid(), 'admin'));

-- Auto-generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON public.store_orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION public.generate_order_number();
