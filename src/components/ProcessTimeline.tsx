import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface ProcessTimelineProps {
  steps?: TimelineStep[];
}

const defaultSteps: TimelineStep[] = [
  {
    step: 1,
    title: "Submit Details",
    description: "Fill a simple form with your business information. Takes just 5 minutes.",
    duration: "5 min",
  },
  {
    step: 2,
    title: "Document Review",
    description: "Our experts review your documents and prepare the filing. We handle all the paperwork.",
    duration: "1-2 days",
  },
  {
    step: 3,
    title: "Filing & Processing",
    description: "We file with the relevant authorities and track progress. You get regular updates.",
    duration: "5-10 days",
  },
  {
    step: 4,
    title: "Completion",
    description: "Receive your certificates and documents. We'll guide you on next steps.",
    duration: "Final",
  },
];

const ProcessTimeline = ({ steps = defaultSteps }: ProcessTimelineProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
        Our Process
      </h2>
      <p className="text-muted-foreground mb-8">
        Simple, transparent, stress-free
      </p>

      {/* Horizontal Timeline - Desktop */}
      <div className="hidden md:block relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-border">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
              className="flex flex-col items-center w-1/4 group cursor-pointer"
              onMouseEnter={() => setActiveStep(item.step)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10",
                  activeStep === item.step
                    ? "bg-primary text-primary-foreground scale-110 shadow-glow"
                    : "bg-secondary text-foreground group-hover:bg-primary/20"
                )}
              >
                {item.step}
              </div>

              {/* Duration Badge */}
              <span className="mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {item.duration}
              </span>

              {/* Title */}
              <h3 className="mt-3 text-sm font-semibold text-foreground text-center">
                {item.title}
              </h3>

              {/* Description - Shows on hover */}
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeStep === item.step ? 1 : 0,
                  height: activeStep === item.step ? "auto" : 0,
                }}
                className="mt-2 text-xs text-muted-foreground text-center px-2 overflow-hidden"
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vertical Timeline - Mobile */}
      <div className="md:hidden space-y-6">
        {steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex gap-4"
          >
            {/* Step Circle & Line */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                {item.step}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="pb-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {item.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total Timeline */}
      <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Total estimated time:</span>
        <span className="text-sm font-semibold text-primary">7-15 business days</span>
      </div>
    </motion.div>
  );
};

export default ProcessTimeline;
