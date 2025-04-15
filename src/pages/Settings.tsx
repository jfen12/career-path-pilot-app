import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1">Settings</h1>
        <p className="body-text text-slate-gray mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-deep-teal mb-1">
                Name
              </label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-teal mb-1">
                Email
              </label>
              <Input type="email" placeholder="Your email" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray mb-4">
              Choose how you want to receive notifications
            </p>
            {/* Add notification settings here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray mb-4">
              Control your privacy and data settings
            </p>
            {/* Add privacy settings here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings; 