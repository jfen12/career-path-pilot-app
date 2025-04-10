
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

type CompleteStepProps = {
  userData: UserData;
};

const CompleteStep = ({ userData }: CompleteStepProps) => {
  const getGoalText = () => {
    switch (userData.goalType) {
      case "new-job":
        return "Find a new job";
      case "promotion":
        return "Get promoted";
      case "skills":
        return "Develop new skills";
      default:
        return "Career growth";
    }
  };

  const getTimeframeText = () => {
    switch (userData.timeframe) {
      case "3-months":
        return "within 3 months";
      case "6-months":
        return "within 6 months";
      case "12-months":
        return "within 12 months";
      default:
        return "";
    }
  };

  const getNetworkingIntensityText = () => {
    switch (userData.networkingIntensity) {
      case "light":
        return "Light (1 connection per week)";
      case "moderate":
        return "Moderate (3 connections per week)";
      case "aggressive":
        return "Aggressive (5 connections per day)";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-career-soft-purple rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-career-purple" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">You're all set!</h2>
        <p className="text-career-gray text-center">
          We've prepared your personalized career development plan
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-career-gray text-sm">Your goal</p>
            <div className="flex gap-2 items-center">
              <h3 className="font-medium">{getGoalText()}</h3>
              <Badge className="bg-career-purple">{getTimeframeText()}</Badge>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-career-gray text-sm">Networking pace</p>
            <h3 className="font-medium">{getNetworkingIntensityText()}</h3>
          </div>

          <div className="space-y-1">
            <p className="text-career-gray text-sm">Next steps</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-career-soft-purple flex items-center justify-center text-xs font-medium text-career-purple">
                  1
                </div>
                <span>Complete your job preferences</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-career-soft-purple flex items-center justify-center text-xs font-medium text-career-purple">
                  2
                </div>
                <span>Connect with your first contact</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-career-soft-purple flex items-center justify-center text-xs font-medium text-career-purple">
                  3
                </div>
                <span>Explore job listings</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteStep;
