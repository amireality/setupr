interface IntakeProgressProps {
  currentStep: number;
  totalSteps: number;
}

const IntakeProgress = ({ currentStep, totalSteps }: IntakeProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full gradient-accent transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default IntakeProgress;