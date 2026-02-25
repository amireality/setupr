// Vendor logo map — uses local SVG files for reliability
const VENDOR_LOGOS: Record<string, string> = {
  microsoft: "/images/vendors/microsoft.svg",
  google: "/images/vendors/google.svg",
  adobe: "/images/vendors/adobe.svg",
  amazon: "/images/vendors/amazon.svg",
  aws: "/images/vendors/amazon.svg",
  zoho: "/images/vendors/zoho.svg",
};

// Vendor brand gradient colors for product card backgrounds
export const VENDOR_GRADIENTS: Record<string, string> = {
  microsoft: "from-[#00A4EF]/20 to-[#7FBA00]/20",
  google: "from-[#4285F4]/20 to-[#EA4335]/20",
  adobe: "from-[#FF0000]/20 to-[#FF0000]/10",
  amazon: "from-[#FF9900]/20 to-[#232F3E]/30",
  aws: "from-[#FF9900]/20 to-[#232F3E]/30",
  zoho: "from-[#C8202B]/20 to-[#C8202B]/10",
  dropbox: "from-[#0061FF]/20 to-[#0061FF]/10",
  slack: "from-[#4A154B]/20 to-[#36C5F0]/20",
  salesforce: "from-[#00A1E0]/20 to-[#00A1E0]/10",
  hubspot: "from-[#FF7A59]/20 to-[#FF7A59]/10",
  atlassian: "from-[#0052CC]/20 to-[#0052CC]/10",
  oracle: "from-[#F80000]/20 to-[#F80000]/10",
  cisco: "from-[#1BA0D7]/20 to-[#1BA0D7]/10",
  autodesk: "from-[#0696D7]/20 to-[#0696D7]/10",
  freshworks: "from-[#F36E22]/20 to-[#F36E22]/10",
  cloudflare: "from-[#F38020]/20 to-[#F38020]/10",
};

export const getVendorLogo = (vendor: string, vendorLogoUrl?: string | null): string | null => {
  if (vendorLogoUrl) return vendorLogoUrl;
  const key = vendor.toLowerCase().replace(/\s+/g, "");
  return VENDOR_LOGOS[key] || null;
};

export const getVendorGradient = (vendor: string): string => {
  const key = vendor.toLowerCase().replace(/\s+/g, "");
  return VENDOR_GRADIENTS[key] || "from-primary/20 to-primary/10";
};
