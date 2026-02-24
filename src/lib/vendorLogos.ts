// Vendor logo map — uses SimpleIcons CDN for clean SVG logos (white fill for dark backgrounds)
const VENDOR_LOGOS: Record<string, string> = {
  microsoft: "https://cdn.simpleicons.org/microsoft/ffffff",
  google: "https://cdn.simpleicons.org/google/ffffff",
  adobe: "https://cdn.simpleicons.org/adobe/ffffff",
  amazon: "https://cdn.simpleicons.org/amazonaws/ffffff",
  aws: "https://cdn.simpleicons.org/amazonaws/ffffff",
  zoho: "https://cdn.simpleicons.org/zoho/ffffff",
  dropbox: "https://cdn.simpleicons.org/dropbox/ffffff",
  slack: "https://cdn.simpleicons.org/slack/ffffff",
  salesforce: "https://cdn.simpleicons.org/salesforce/ffffff",
  hubspot: "https://cdn.simpleicons.org/hubspot/ffffff",
  atlassian: "https://cdn.simpleicons.org/atlassian/ffffff",
  oracle: "https://cdn.simpleicons.org/oracle/ffffff",
  sap: "https://cdn.simpleicons.org/sap/ffffff",
  ibm: "https://cdn.simpleicons.org/ibm/ffffff",
  cisco: "https://cdn.simpleicons.org/cisco/ffffff",
  dell: "https://cdn.simpleicons.org/dell/ffffff",
  hp: "https://cdn.simpleicons.org/hp/ffffff",
  lenovo: "https://cdn.simpleicons.org/lenovo/ffffff",
  autodesk: "https://cdn.simpleicons.org/autodesk/ffffff",
  intuit: "https://cdn.simpleicons.org/intuit/ffffff",
  freshworks: "https://cdn.simpleicons.org/freshworks/ffffff",
  cloudflare: "https://cdn.simpleicons.org/cloudflare/ffffff",
  crowdstrike: "https://cdn.simpleicons.org/crowdstrike/ffffff",
  paloaltonetworks: "https://cdn.simpleicons.org/paloaltonetworks/ffffff",
  fortinet: "https://cdn.simpleicons.org/fortinet/ffffff",
  vmware: "https://cdn.simpleicons.org/vmware/ffffff",
};

export const getVendorLogo = (vendor: string, vendorLogoUrl?: string | null): string | null => {
  if (vendorLogoUrl) return vendorLogoUrl;
  const key = vendor.toLowerCase().replace(/\s+/g, "");
  return VENDOR_LOGOS[key] || null;
};
