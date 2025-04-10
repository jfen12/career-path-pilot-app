
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import ProfileStep from "./ProfileStep";
import GoalsStep from "./GoalsStep";
import NetworkingStep from "./NetworkingStep";
import CompleteStep from "./CompleteStep";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    currentTitle: "",
    currentCompany: "",
    goalType: "new-job",
    timeframe: "6-months",
    networkingIntensity: "moderate",
    importOption: "none",
  });

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Complete onboarding and redirect to dashboard
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProfileStep userData={userData} updateUserData={updateUserData} />;
      case 2:
        return <GoalsStep userData={userData} updateUserData={updateUserData} />;
      case 3:
        return <NetworkingStep userData={userData} updateUserData={updateUserData} />;
      case 4:
        return <CompleteStep userData={userData} />;
      default:
        return <ProfileStep userData={userData} updateUserData={updateUserData} />;
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !userData.name || !userData.email;
      case 2:
        return !userData.goalType || !userData.timeframe;
      case 3:
        return !userData.networkingIntensity;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-4 border-b border-career-light-gray">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft size={18} />
          </Button>
          {step < totalSteps && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="text-career-gray"
            >
              Skip for now
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 container-px container-py">
        <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
        <div className="animate-fade-in">{renderStep()}</div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-career-light-gray p-4">
        <Button
          className="w-full bg-career-purple hover:bg-career-dark-purple text-white h-12 rounded-lg font-medium"
          onClick={handleNext}
          disabled={isNextDisabled()}
        >
          {step < totalSteps ? (
            <div className="flex items-center">
              Continue <ArrowRight size={16} className="ml-1" />
            </div>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
