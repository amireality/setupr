import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import IntakeProgress from "@/components/intake/IntakeProgress";
import StepCurrentStage from "@/components/intake/StepCurrentStage";
import StepWorkType from "@/components/intake/StepWorkType";
import StepServicesReview from "@/components/intake/StepServicesReview";
import StepExistingSetup from "@/components/intake/StepExistingSetup";
import StepTimeline from "@/components/intake/StepTimeline";
import StepContact from "@/components/intake/StepContact";
import type { ServiceId } from "./Services";

export interface IntakeData {
  currentStage: string;
  workTypes: string[];
  selectedServices: ServiceId[];
  existingSetup: string[];
  timeline: string;
  contact: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
  };
}

const TOTAL_STEPS = 6;

const Intake = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IntakeData>({
    currentStage: "",
    workTypes: [],
    selectedServices: [],
    existingSetup: [],
    timeline: "",
    contact: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  useEffect(() => {
    const servicesParam = searchParams.get("services");
    if (servicesParam) {
      const services = servicesParam.split(",") as ServiceId[];
      setFormData(prev => ({ ...prev, selectedServices: services }));
    }
  }, [searchParams]);

  const updateFormData = (updates: Partial<IntakeData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    navigate("/pricing-summary", { state: { intakeData: formData } });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepCurrentStage
            value={formData.currentStage}
            onChange={(value) => updateFormData({ currentStage: value })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepWorkType
            values={formData.workTypes}
            onChange={(values) => updateFormData({ workTypes: values })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepServicesReview
            selectedServices={formData.selectedServices}
            onChange={(services) => updateFormData({ selectedServices: services })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepExistingSetup
            values={formData.existingSetup}
            onChange={(values) => updateFormData({ existingSetup: values })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StepTimeline
            value={formData.timeline}
            onChange={(value) => updateFormData({ timeline: value })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <StepContact
            values={formData.contact}
            onChange={(contact) => updateFormData({ contact })}
            onSubmit={handleSubmit}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="container px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-2xl mx-auto">
            <IntakeProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Intake;