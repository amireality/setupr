import { useLocation, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingConfirmation from "@/components/pricing/PricingConfirmation";
import SelectedServicesSummary from "@/components/pricing/SelectedServicesSummary";
import PricingBreakdown from "@/components/pricing/PricingBreakdown";
import WhatsIncluded from "@/components/pricing/WhatsIncluded";
import PricingCTA from "@/components/pricing/PricingCTA";
import TrustNote from "@/components/pricing/TrustNote";
import type { IntakeData } from "./Intake";
import { Helmet } from "react-helmet-async";

const PricingSummary = () => {
  const location = useLocation();
  const intakeData = location.state?.intakeData as IntakeData | undefined;

  // Redirect if no intake data
  if (!intakeData) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Your Setup Plan & Pricing | Setupr</title>
        <meta name="description" content="Review your custom business setup plan and transparent pricing breakdown." />
        <link rel="canonical" href="https://setupr.com/pricing-summary" />
      </Helmet>
      <Navbar />
      <main className="pt-16">
        <PricingConfirmation />
        <SelectedServicesSummary services={intakeData.selectedServices} />
        <PricingBreakdown services={intakeData.selectedServices} />
        <WhatsIncluded />
        <PricingCTA contactName={intakeData.contact.fullName} intakeData={intakeData} />
        <TrustNote />
      </main>
      <Footer />
    </div>
  );
};

export default PricingSummary;
