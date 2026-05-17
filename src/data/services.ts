// ============================================
// SETUPR SERVICE & PRICING CONFIGURATION
// ============================================
// Edit this file to add/remove services, update prices, or modify bundles.
// No frontend code changes required.

export type ServiceId = string;

export type DeliveryType = "coordination" | "done-for-you";
export type Visibility = "public" | "add-on" | "bundle-only";

export interface Service {
  service_id: ServiceId;
  category: string;
  sub_category: string;
  service_name: string;
  description_short: string;
  who_its_for: string;
  setupr_fee_inr: number;
  govt_or_third_party_fee: number | "actuals";
  delivery_type: DeliveryType;
  visibility: Visibility;
  default_selected: boolean;
}

export interface ServiceCategory {
  category_id: string;
  title: string;
  intro: string;
  icon: string; // lucide icon name
  gradient: string;
}

export interface Bundle {
  bundle_id: string;
  bundle_name: string;
  who_its_for: string;
  included_service_ids: ServiceId[];
  bundle_setupr_fee: number;
  govt_fee_note: string;
  icon: string;
  gradient: string;
}

// ============================================
// CATEGORIES
// ============================================

export const serviceCategories: ServiceCategory[] = [
  {
    category_id: "business-formation",
    title: "Business Formation & Legal Identity",
    intro: "Get your business registered and legally recognized.",
    icon: "Building2",
    gradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    category_id: "digital-presence",
    title: "Digital Presence & Business Identity",
    intro: "Your website, domain, and email, set up professionally.",
    icon: "Globe",
    gradient: "from-accent/20 via-accent/10 to-transparent",
  },
  {
    category_id: "trust-compliance",
    title: "Trust, Compliance & Risk Reduction",
    intro: "The registrations and filings you need to operate legally.",
    icon: "Shield",
    gradient: "from-secondary/40 via-secondary/20 to-transparent",
  },
  {
    category_id: "visibility",
    title: "Visibility & Discoverability Setup",
    intro: "Get found online with profiles and listings.",
    icon: "Eye",
    gradient: "from-primary/15 via-accent/10 to-transparent",
  },
  {
    category_id: "operations",
    title: "Business Operations & Essentials",
    intro: "Internal tools and workflows to run smoothly.",
    icon: "Settings",
    gradient: "from-accent/15 via-secondary/10 to-transparent",
  },
  {
    category_id: "ai-business",
    title: "AI for Business",
    intro: "AI tools, automation, and intelligent workflows set up for your business. No technical knowledge required.",
    icon: "Zap",
    gradient: "from-violet-500/20 to-orange-500/20",
  },
];

// ============================================
// SERVICES
// ============================================

export const services: Service[] = [
  // --- Business Formation & Legal Identity ---
  {
    service_id: "proprietorship",
    category: "business-formation",
    sub_category: "Business Registration",
    service_name: "Proprietorship Registration",
    description_short: "Simple structure for solo businesses",
    who_its_for: "Freelancers and solo professionals",
    setupr_fee_inr: 2999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "partnership",
    category: "business-formation",
    sub_category: "Business Registration",
    service_name: "Partnership Firm Registration",
    description_short: "For two or more partners",
    who_its_for: "Business partners starting together",
    setupr_fee_inr: 4999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "llp",
    category: "business-formation",
    sub_category: "Business Registration",
    service_name: "LLP Registration",
    description_short: "Limited liability with flexibility",
    who_its_for: "Growing businesses wanting protection",
    setupr_fee_inr: 9999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "pvt-ltd",
    category: "business-formation",
    sub_category: "Business Registration",
    service_name: "Private Limited Company Registration",
    description_short: "Formal structure for scaling",
    who_its_for: "Businesses planning to raise investment",
    setupr_fee_inr: 12999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "opc",
    category: "business-formation",
    sub_category: "Business Registration",
    service_name: "One Person Company (OPC) Registration",
    description_short: "Company structure for solo founders",
    who_its_for: "Solo entrepreneurs wanting company benefits",
    setupr_fee_inr: 11999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "msme",
    category: "business-formation",
    sub_category: "Government Registrations",
    service_name: "MSME / Udyam Registration",
    description_short: "Access government schemes and benefits",
    who_its_for: "Small and medium businesses",
    setupr_fee_inr: 1499,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "trade-license",
    category: "business-formation",
    sub_category: "Government Registrations",
    service_name: "Trade License Assistance",
    description_short: "Local authority permission to operate",
    who_its_for: "Businesses with physical locations",
    setupr_fee_inr: 2499,
    govt_or_third_party_fee: "actuals",
    delivery_type: "coordination",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "shop-establishment",
    category: "business-formation",
    sub_category: "Government Registrations",
    service_name: "Shop & Establishment Registration",
    description_short: "State-level business registration",
    who_its_for: "Retail and service businesses",
    setupr_fee_inr: 2499,
    govt_or_third_party_fee: "actuals",
    delivery_type: "coordination",
    visibility: "public",
    default_selected: false,
  },

  // --- Digital Presence & Business Identity ---
  {
    service_id: "domain-hosting",
    category: "digital-presence",
    sub_category: "Domain & Email",
    service_name: "Domain & Hosting Setup",
    description_short: "Your own web address and hosting",
    who_its_for: "Anyone starting online",
    setupr_fee_inr: 2999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "email",
    category: "digital-presence",
    sub_category: "Domain & Email",
    service_name: "Business Email Setup",
    description_short: "Professional email with your domain",
    who_its_for: "Businesses wanting credibility",
    setupr_fee_inr: 1999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "website",
    category: "digital-presence",
    sub_category: "Website",
    service_name: "Basic Website Setup (5 pages)",
    description_short: "A simple, professional website",
    who_its_for: "Businesses needing online presence",
    setupr_fee_inr: 9999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "website-content",
    category: "digital-presence",
    sub_category: "Website",
    service_name: "Website Content Setup",
    description_short: "Content structuring for your website",
    who_its_for: "Those who need help organizing content",
    setupr_fee_inr: 4999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "website-customization",
    category: "digital-presence",
    sub_category: "Website",
    service_name: "Website UI Customization",
    description_short: "Custom look and feel for your site",
    who_its_for: "Businesses wanting unique design",
    setupr_fee_inr: 6999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "ssl-security",
    category: "digital-presence",
    sub_category: "Website",
    service_name: "SSL & Security Setup",
    description_short: "Secure your website with HTTPS",
    who_its_for: "All websites handling user data",
    setupr_fee_inr: 1499,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "payment-gateway",
    category: "digital-presence",
    sub_category: "Payments",
    service_name: "Payment Gateway Setup",
    description_short: "Accept online payments",
    who_its_for: "Businesses selling online",
    setupr_fee_inr: 2499,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },

  // --- Trust, Compliance & Risk Reduction ---
  {
    service_id: "gst",
    category: "trust-compliance",
    sub_category: "Tax & Compliance",
    service_name: "GST Registration",
    description_short: "Required for invoicing and tax compliance",
    who_its_for: "Businesses with turnover above threshold",
    setupr_fee_inr: 2499,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "current-account",
    category: "trust-compliance",
    sub_category: "Banking",
    service_name: "Current Account Assistance",
    description_short: "Help opening a business bank account",
    who_its_for: "New businesses needing banking",
    setupr_fee_inr: 1999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "coordination",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "invoice-setup",
    category: "trust-compliance",
    sub_category: "Documentation",
    service_name: "Professional Invoice Setup",
    description_short: "Branded invoice templates",
    who_its_for: "Businesses sending invoices",
    setupr_fee_inr: 1499,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "pan-tan",
    category: "trust-compliance",
    sub_category: "Tax & Compliance",
    service_name: "PAN–TAN Assistance",
    description_short: "Tax identity for your business",
    who_its_for: "Businesses needing tax registration",
    setupr_fee_inr: 1499,
    govt_or_third_party_fee: "actuals",
    delivery_type: "coordination",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "compliance-support",
    category: "trust-compliance",
    sub_category: "Compliance",
    service_name: "Annual Compliance Reminder & Support",
    description_short: "Stay on top of yearly filings",
    who_its_for: "Registered companies",
    setupr_fee_inr: 2999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "coordination",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "legal-docs",
    category: "trust-compliance",
    sub_category: "Documentation",
    service_name: "Basic Legal Documentation",
    description_short: "MOA/AOA guidance and templates",
    who_its_for: "Companies needing founding documents",
    setupr_fee_inr: 3999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },

  // --- Visibility & Discoverability Setup ---
  {
    service_id: "google-business",
    category: "visibility",
    sub_category: "Local Visibility",
    service_name: "Google Business Profile Setup",
    description_short: "Appear in local search results",
    who_its_for: "Local and service businesses",
    setupr_fee_inr: 1999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "social-media",
    category: "visibility",
    sub_category: "Social Media",
    service_name: "Social Media Account Setup",
    description_short: "Profiles on up to 3 platforms",
    who_its_for: "Businesses building online presence",
    setupr_fee_inr: 2499,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "whatsapp-business",
    category: "visibility",
    sub_category: "Communication",
    service_name: "WhatsApp Business Setup",
    description_short: "Professional WhatsApp for customers",
    who_its_for: "Businesses using WhatsApp",
    setupr_fee_inr: 1499,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "directory-listings",
    category: "visibility",
    sub_category: "Local Visibility",
    service_name: "Business Listing on Directories",
    description_short: "Get listed on business directories",
    who_its_for: "Businesses wanting more visibility",
    setupr_fee_inr: 2999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "brand-kit",
    category: "visibility",
    sub_category: "Branding",
    service_name: "Email Signature & Brand Kit Setup",
    description_short: "Consistent branding across touchpoints",
    who_its_for: "Professionals and teams",
    setupr_fee_inr: 1499,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },

  // --- Business Operations & Essentials ---
  {
    service_id: "sop-setup",
    category: "operations",
    sub_category: "Processes",
    service_name: "Internal Process Setup (Basic SOPs)",
    description_short: "Document your key processes",
    who_its_for: "Growing teams",
    setupr_fee_inr: 4999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "onboarding-workflow",
    category: "operations",
    sub_category: "Processes",
    service_name: "Client Onboarding Workflow Setup",
    description_short: "Smooth onboarding for new clients",
    who_its_for: "Service businesses",
    setupr_fee_inr: 3999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "crm-setup",
    category: "operations",
    sub_category: "Tools",
    service_name: "CRM Setup (basic)",
    description_short: "Manage leads and customers",
    who_its_for: "Sales-driven businesses",
    setupr_fee_inr: 4999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "accounting-setup",
    category: "operations",
    sub_category: "Tools",
    service_name: "Accounting Software Setup",
    description_short: "Get your books organized",
    who_its_for: "Businesses needing financial tracking",
    setupr_fee_inr: 2999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },

  // --- AI for Business ---
  {
    service_id: "ai-workflow",
    category: "ai-business",
    sub_category: "AI & Automation",
    service_name: "AI Workflow Automation",
    description_short: "Automate repetitive business tasks using AI tools tailored to your workflow",
    who_its_for: "Businesses spending hours on manual, repetitive tasks that AI can handle in seconds",
    setupr_fee_inr: 14999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "ai-chatbot",
    category: "ai-business",
    sub_category: "AI & Automation",
    service_name: "AI Chatbot Setup",
    description_short: "Deploy an AI chatbot on your website that answers client questions 24/7",
    who_its_for: "Service businesses that lose leads because no one is available to answer inquiries at odd hours",
    setupr_fee_inr: 9999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "ai-crm",
    category: "ai-business",
    sub_category: "AI & Automation",
    service_name: "CRM + AI Integration",
    description_short: "Connect your CRM with AI to score leads, draft follow-ups, and flag opportunities automatically",
    who_its_for: "Businesses with a CRM that sits underused because manual data entry is too time-consuming",
    setupr_fee_inr: 19999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "ai-tools",
    category: "ai-business",
    sub_category: "AI & Automation",
    service_name: "AI Tools Onboarding",
    description_short: "Get your team using the right AI tools correctly from day one",
    who_its_for: "Business owners who know AI tools exist but do not know which ones to use or how to start",
    setupr_fee_inr: 14999,
    govt_or_third_party_fee: 0,
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
  {
    service_id: "ai-agent",
    category: "ai-business",
    sub_category: "AI & Automation",
    service_name: "Custom AI Agent Setup",
    description_short: "A purpose-built AI agent trained on your business to handle specific tasks autonomously",
    who_its_for: "Founders who want AI working as a team member, not just a tool",
    setupr_fee_inr: 29999,
    govt_or_third_party_fee: "actuals",
    delivery_type: "done-for-you",
    visibility: "public",
    default_selected: false,
  },
];

// ============================================
// BUNDLES
// ============================================

export const bundles: Bundle[] = [
  {
    bundle_id: "new-business",
    bundle_name: "New Business Starter",
    who_its_for: "First-time business owners starting fresh",
    included_service_ids: ["proprietorship", "gst", "website", "google-business"],
    bundle_setupr_fee: 15499,
    govt_fee_note: "Government / platform fees extra (at actuals)",
    icon: "Rocket",
    gradient: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    bundle_id: "digital-presence",
    bundle_name: "Professional Online Presence",
    who_its_for: "Businesses needing credibility online",
    included_service_ids: ["domain-hosting", "website", "email", "ssl-security"],
    bundle_setupr_fee: 14499,
    govt_fee_note: "Domain, hosting, and email subscriptions at actuals",
    icon: "Globe",
    gradient: "from-accent/20 via-accent/10 to-transparent",
  },
  {
    bundle_id: "just-one",
    bundle_name: "Just One Thing",
    who_its_for: "Pick exactly what you need",
    included_service_ids: [],
    bundle_setupr_fee: 0,
    govt_fee_note: "",
    icon: "Zap",
    gradient: "from-secondary/40 via-secondary/20 to-transparent",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getServiceById = (id: ServiceId): Service | undefined => {
  return services.find((s) => s.service_id === id);
};

export const getServicesByCategory = (categoryId: string): Service[] => {
  return services.filter((s) => s.category === categoryId && s.visibility === "public");
};

export const getCategoryById = (id: string): ServiceCategory | undefined => {
  return serviceCategories.find((c) => c.category_id === id);
};

export const getBundleById = (id: string): Bundle | undefined => {
  return bundles.find((b) => b.bundle_id === id);
};

export const calculateTotal = (serviceIds: ServiceId[]): number => {
  return serviceIds.reduce((sum, id) => {
    const service = getServiceById(id);
    return sum + (service?.setupr_fee_inr || 0);
  }, 0);
};

export const calculateBundleSavings = (bundle: Bundle): number => {
  const individualTotal = calculateTotal(bundle.included_service_ids);
  return individualTotal - bundle.bundle_setupr_fee;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN").format(price);
};

export const formatGovtFee = (fee: number | "actuals"): string => {
  if (fee === "actuals") return "At actuals";
  if (fee === 0) return "Nil";
  return `₹${formatPrice(fee)}`;
};
