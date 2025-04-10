
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, Linkedin, Mail, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type UserData = {
  name: string;
  email: string;
  currentTitle: string;
  currentCompany: string;
  goalType: string;
  timeframe: string;
  networkingIntensity: string;
  importOption: string;
};

type NetworkingStepProps = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
};

const NetworkingStep = ({ userData, updateUserData }: NetworkingStepProps) => {
  const networkingIntensities = [
    {
      value: "light",
      title: "Light",
      description: "1 connection per week",
    },
    {
      value: "moderate",
      title: "Moderate",
      description: "3 connections per week",
    },
    {
      value: "aggressive",
      title: "Aggressive",
      description: "5 connections per day",
    },
  ];

  const importOptions = [
    {
      value: "linkedin",
      title: "LinkedIn",
      icon: Linkedin,
      buttonText: "Connect LinkedIn",
    },
    {
      value: "gmail",
      title: "Gmail Contacts",
      icon: Mail,
      buttonText: "Connect Gmail",
    },
    {
      value: "csv",
      title: "Upload CSV",
      icon: Upload,
      buttonText: "Upload File",
    },
  ];

  const handleConnect = (option: string) => {
    toast.info("Coming soon in the full version!", {
      description: "This feature will be available after the MVP testing phase",
    });
    updateUserData({ importOption: option });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Networking Preferences</h2>
        <p className="text-career-gray">
          Set your networking pace and import your contacts
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>How intensely do you want to network?</Label>
          <RadioGroup
            value={userData.networkingIntensity}
            onValueChange={(value) =>
              updateUserData({ networkingIntensity: value })
            }
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {networkingIntensities.map((intensity) => (
              <label
                key={intensity.value}
                className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${
                  userData.networkingIntensity === intensity.value
                    ? "border-career-purple bg-career-soft-purple"
                    : "border-gray-200 hover:border-career-purple"
                }`}
              >
                <RadioGroupItem
                  value={intensity.value}
                  id={intensity.value}
                  className="mt-1"
                />
                <div className="ml-3">
                  <Label
                    htmlFor={intensity.value}
                    className="font-medium text-base cursor-pointer"
                  >
                    {intensity.title}
                  </Label>
                  <p className="text-career-gray text-sm">
                    {intensity.description}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label>Import your contacts (optional)</Label>
            <div className="text-career-gray text-xs bg-career-light-gray rounded-full px-2 py-0.5">
              Optional
            </div>
          </div>

          <div className="space-y-3">
            {importOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-career-soft-purple p-2 rounded-full">
                    <option.icon
                      className="text-career-purple"
                      size={18}
                    />
                  </div>
                  <span>{option.title}</span>
                </div>
                <Button
                  variant="outline"
                  className={
                    userData.importOption === option.value
                      ? "border-career-purple text-career-purple"
                      : ""
                  }
                  onClick={() => handleConnect(option.value)}
                >
                  {option.buttonText}
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-career-light-gray p-3 rounded-lg flex gap-2 text-sm">
            <AlertCircle size={18} className="text-career-purple shrink-0 mt-0.5" />
            <p>
              You can always import your contacts later from the Networking
              section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingStep;
