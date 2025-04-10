
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

type ProfileStepProps = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
};

const ProfileStep = ({ userData, updateUserData }: ProfileStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
        <p className="text-career-gray">Let's get to know you better</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={userData.name}
            onChange={(e) => updateUserData({ name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={userData.email}
            onChange={(e) => updateUserData({ email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentTitle">Current Title</Label>
          <Input
            id="currentTitle"
            placeholder="e.g. Product Manager"
            value={userData.currentTitle}
            onChange={(e) => updateUserData({ currentTitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentCompany">Current Company</Label>
          <Input
            id="currentCompany"
            placeholder="e.g. Acme Corp"
            value={userData.currentCompany}
            onChange={(e) => updateUserData({ currentCompany: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
