import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StoreProduct, formatStorePrice } from "@/hooks/useStoreProducts";
import { getVendorLogo, getVendorGradient } from "@/lib/vendorLogos";

interface StoreProductCardProps {
  product: StoreProduct;
  index?: number;
}

const StoreProductCard = ({ product, index = 0 }: StoreProductCardProps) => {
  const billingLabel = product.billing_cycle === "monthly" ? "/mo" : product.billing_cycle === "annual" ? "/yr" : "";
  const [imgError, setImgError] = useState(false);
  const logoUrl = getVendorLogo(product.vendor, product.vendor_logo_url);
  const gradient = getVendorGradient(product.vendor);
  const showImage = product.featured_image_url && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/store/products/${product.slug}`}
        className="group block glass-card glass-card-hover rounded-2xl overflow-hidden h-full transition-all duration-300 hover-lift"
      >
        {/* Product Image or Vendor Gradient */}
        <div className={`relative h-40 overflow-hidden flex items-center justify-center bg-gradient-to-br ${gradient}`}>
          {showImage ? (
            <img
              src={product.featured_image_url!}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : logoUrl ? (
            <img
              src={logoUrl}
              alt={product.vendor}
              className="w-16 h-16 object-contain opacity-80 group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <span className="text-4xl font-bold text-foreground/30">{product.vendor.charAt(0)}</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-2">
                  <img src={logoUrl} alt={product.vendor} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {product.vendor.charAt(0)}
                </div>
              )}
              <div>
                <span className="text-xs text-muted-foreground">{product.vendor}</span>
                {product.is_featured && (
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground capitalize">
              {product.product_type}
            </span>
          </div>

          <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {product.short_description}
          </p>

          <div className="flex items-end justify-between mt-auto pt-4 border-t border-border/50">
            <div>
              <span className="text-xs text-muted-foreground">Starting at</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">₹{formatStorePrice(product.base_price_inr)}</span>
                <span className="text-sm text-muted-foreground">{billingLabel}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoreProductCard;
