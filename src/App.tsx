import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import InstallPrompt from "@/components/InstallPrompt";
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Intake = lazy(() => import("./pages/Intake"));
const PricingSummary = lazy(() => import("./pages/PricingSummary"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Refund = lazy(() => import("./pages/Refund"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Career = lazy(() => import("./pages/Career"));
const AuthorPage = lazy(() => import("./pages/AuthorPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const GuidesIndex = lazy(() => import("./pages/guides/GuidesIndex"));
const StartingBusinessGuide = lazy(() => import("./pages/guides/StartingBusinessGuide"));
const BusinessTypesGuide = lazy(() => import("./pages/guides/BusinessTypesGuide"));
const StoreLanding = lazy(() => import("./pages/store/StoreLanding"));
const StoreProducts = lazy(() => import("./pages/store/StoreProducts"));
const StoreProductDetail = lazy(() => import("./pages/store/StoreProductDetail"));
const StoreLogin = lazy(() => import("./pages/store/StoreLogin"));
const StoreSignup = lazy(() => import("./pages/store/StoreSignup"));
const StoreDashboard = lazy(() => import("./pages/store/StoreDashboard"));
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import InstallPrompt from "@/components/InstallPrompt";
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Intake = lazy(() => import("./pages/Intake"));
const PricingSummary = lazy(() => import("./pages/PricingSummary"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Refund = lazy(() => import("./pages/Refund"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Career = lazy(() => import("./pages/Career"));
const AuthorPage = lazy(() => import("./pages/AuthorPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const GuidesIndex = lazy(() => import("./pages/guides/GuidesIndex"));
const StartingBusinessGuide = lazy(() => import("./pages/guides/StartingBusinessGuide"));
const BusinessTypesGuide = lazy(() => import("./pages/guides/BusinessTypesGuide"));
const StoreLanding = lazy(() => import("./pages/store/StoreLanding"));
const StoreProducts = lazy(() => import("./pages/store/StoreProducts"));
const StoreProductDetail = lazy(() => import("./pages/store/StoreProductDetail"));
const StoreLogin = lazy(() => import("./pages/store/StoreLogin"));
const StoreSignup = lazy(() => import("./pages/store/StoreSignup"));
const StoreDashboard = lazy(() => import("./pages/store/StoreDashboard"));
const StoreCheckout = lazy(() => import("./pages/store/StoreCheckout"));
const ApplyLoan = lazy(() => import("./pages/ApplyLoan"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Install = lazy(() => import("./pages/Install"));

import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }
  },
};


const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <img 
      src="/setupr-logo-animated.gif" 
      alt="Loading..." 
      className="w-24 h-24 object-contain opacity-80" 
    />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        <ErrorBoundary><Suspense fallback={<PageFallback />}><Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/pricing-summary" element={<PricingSummary />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/career" element={<Career />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:authorSlug" element={<AuthorPage />} />
          <Route path="/guides" element={<GuidesIndex />} />
          <Route path="/guides/starting-business-india" element={<StartingBusinessGuide />} />
          <Route path="/guides/business-types" element={<BusinessTypesGuide />} />
          <Route path="/store" element={<StoreLanding />} />
          <Route path="/store/products" element={<StoreProducts />} />
          <Route path="/store/products/:slug" element={<StoreProductDetail />} />
          <Route path="/store/login" element={<StoreLogin />} />
          <Route path="/store/signup" element={<StoreSignup />} />
          <Route path="/store/dashboard" element={<StoreDashboard />} />
          <Route path="/store/checkout" element={<StoreCheckout />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/install" element={<Install />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes></Suspense></ErrorBoundary>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgress />
        <InstallPrompt />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
