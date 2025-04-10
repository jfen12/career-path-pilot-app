
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Briefcase, TrendingUp, GraduationCap } from "lucide-react";

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

type GoalsStepProps = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
};

const GoalsStep = ({ userData, updateUserData }: GoalsStepProps) => {
  const goalTypes = [
    {
      value: "new-job",
      title: "Find a new job",
      description: "Get support in your job search journey",
      icon: Briefcase,
    },
    {
      value: "promotion",
      title: "Get promoted",
      description: "Set yourself up for advancement",
      icon: TrendingUp,
    },
    {
      value: "skills",
      title: "Develop new skills",
      description: "Grow your professional capabilities",
      icon: GraduationCap,
    },
  ];

  const timeframes = [
    {
      value: "3-months",
      title: "3 months",
      description: "Accelerated timeline",
    },
    {
      value: "6-months",
      title: "6 months",
      description: "Balanced pace",
    },
    {
      value: "12-months",
      title: "12 months",
      description: "Steady progress",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your Career Goals</h2>
        <p className="text-career-gray">Tell us what you're aiming for</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>What's your primary career goal?</Label>
          <RadioGroup
            value={userData.goalType}
            onValueChange={(value) => updateUserData({ goalType: value })}
            className="space-y-3"
          >
            {goalTypes.map((goal) => (
              <label
                key={goal.value}
                className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${
                  userData.goalType === goal.value
                    ? "border-career-purple bg-career-soft-purple"
                    : "border-gray-200 hover:border-career-purple"
                }`}
              >
                <RadioGroupItem
                  value={goal.value}
                  id={goal.value}
                  className="mt-1"
                />
                <div className="ml-3 flex items-start gap-3 flex-1">
                  <div className="bg-white p-2 rounded-full">
                    <goal.icon className="text-career-purple" size={20} />
                  </div>
                  <div>
                    <Label
                      htmlFor={goal.value}
                      className="font-medium text-base cursor-pointer"
                    >
                      {goal.title}
                    </Label>
                    <p className="text-career-gray text-sm">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>What's your timeframe?</Label>
          <RadioGroup
            value={userData.timeframe}
            onValueChange={(value) => updateUserData({ timeframe: value })}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {timeframes.map((time) => (
              <label
                key={time.value}
                className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${
                  userData.timeframe === time.value
                    ? "border-career-purple bg-career-soft-purple"
                    : "border-gray-200 hover:border-career-purple"
                }`}
              >
                <RadioGroupItem
                  value={time.value}
                  id={time.value}
                  className="mt-1"
                />
                <div className="ml-3">
                  <Label
                    htmlFor={time.value}
                    className="font-medium text-base cursor-pointer"
                  >
                    {time.title}
                  </Label>
                  <p className="text-career-gray text-sm">{time.description}</p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default GoalsStep;
