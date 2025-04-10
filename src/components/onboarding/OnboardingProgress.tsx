
import { Check } from "lucide-react";

type OnboardingProgressProps = {
  currentStep: number;
  totalSteps: number;
};

const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center w-full">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step < currentStep
                  ? "bg-career-purple text-white"
                  : step === currentStep
                  ? "bg-career-purple text-white"
                  : "bg-career-light-gray text-career-gray"
              }`}
            >
              {step < currentStep ? <Check size={16} /> : step}
            </div>
            <div className="text-xs mt-1 text-career-gray">
              {step === 1
                ? "Profile"
                : step === 2
                ? "Goals"
                : step === 3
                ? "Network"
                : "Complete"}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 h-1 w-full bg-career-light-gray rounded-full overflow-hidden">
        <div
          className="h-full bg-career-purple transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OnboardingProgress;
