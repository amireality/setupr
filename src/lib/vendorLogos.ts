// Vendor logo map — used as fallback when vendor_logo_url is null
const VENDOR_LOGOS: Record<string, string> = {
  microsoft: "https://logo.clearbit.com/microsoft.com",
  google: "https://logo.clearbit.com/google.com",
  adobe: "https://logo.clearbit.com/adobe.com",
  amazon: "https://logo.clearbit.com/aws.amazon.com",
  aws: "https://logo.clearbit.com/aws.amazon.com",
  zoho: "https://logo.clearbit.com/zoho.com",
  dropbox: "https://logo.clearbit.com/dropbox.com",
  slack: "https://logo.clearbit.com/slack.com",
  salesforce: "https://logo.clearbit.com/salesforce.com",
  hubspot: "https://logo.clearbit.com/hubspot.com",
  atlassian: "https://logo.clearbit.com/atlassian.com",
  oracle: "https://logo.clearbit.com/oracle.com",
  sap: "https://logo.clearbit.com/sap.com",
  ibm: "https://logo.clearbit.com/ibm.com",
  cisco: "https://logo.clearbit.com/cisco.com",
  dell: "https://logo.clearbit.com/dell.com",
  hp: "https://logo.clearbit.com/hp.com",
  lenovo: "https://logo.clearbit.com/lenovo.com",
  autodesk: "https://logo.clearbit.com/autodesk.com",
  intuit: "https://logo.clearbit.com/intuit.com",
  freshworks: "https://logo.clearbit.com/freshworks.com",
  cloudflare: "https://logo.clearbit.com/cloudflare.com",
  crowdstrike: "https://logo.clearbit.com/crowdstrike.com",
  paloaltonetworks: "https://logo.clearbit.com/paloaltonetworks.com",
  fortinet: "https://logo.clearbit.com/fortinet.com",
  vmware: "https://logo.clearbit.com/vmware.com",
};

export const getVendorLogo = (vendor: string, vendorLogoUrl?: string | null): string | null => {
  if (vendorLogoUrl) return vendorLogoUrl;
  const key = vendor.toLowerCase().replace(/\s+/g, "");
  return VENDOR_LOGOS[key] || null;
};
