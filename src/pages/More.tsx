
import { User, Settings, BarChart, FileText, Send, HelpCircle, LogOut } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const More = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon: User,
      title: "My Profile",
      description: "View and edit your profile information",
      action: "/profile",
    },
    {
      icon: Settings,
      title: "Preferences",
      description: "Manage your notifications and settings",
      action: "/preferences",
    },
    {
      icon: BarChart,
      title: "Analytics",
      description: "View your career progress statistics",
      action: "/analytics",
    },
    {
      icon: FileText,
      title: "Resume Manager",
      description: "Manage your resumes and cover letters",
      action: "/resumes",
    },
    {
      icon: Send,
      title: "Share Feedback",
      description: "Help us improve the app",
      action: "feedback",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help with using the app",
      action: "help",
    },
  ];

  const handleItemClick = (action: string) => {
    if (action.startsWith("/")) {
      // This is a route
      toast.info("This feature is coming soon!");
    } else {
      // This is an action
      switch (action) {
        case "feedback":
          toast.success("Thanks for your interest! Feedback form coming soon.");
          break;
        case "help":
          toast.info("Support center will be available in the full version.");
          break;
        default:
          break;
      }
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <PageContainer title="More">
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-career-soft-purple rounded-full flex items-center justify-center text-career-purple font-medium text-xl">
              S
            </div>
            <div>
              <h2 className="font-semibold text-lg">Sarah Johnson</h2>
              <p className="text-career-gray">Product Manager</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <div className="flex justify-between mb-1">
              <span>Profile completion</span>
              <span className="font-medium">70%</span>
            </div>
            <div className="w-full bg-career-light-gray rounded-full h-2">
              <div
                className="bg-career-purple h-2 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <Button
            key={item.title}
            variant="ghost"
            className="w-full justify-start p-3 h-auto"
            onClick={() => handleItemClick(item.action)}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="bg-career-soft-purple p-2 rounded-full">
                <item.icon className="text-career-purple h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-career-gray">{item.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>

      <Separator className="my-6" />

      <Button
        variant="outline"
        className="w-full border-red-300 text-red-500 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" /> Log Out
      </Button>

      <div className="mt-6 text-center text-xs text-career-gray">
        <p>Your Career Co-Pilot</p>
        <p>Version 1.0.0 (MVP)</p>
      </div>
    </PageContainer>
  );
};

export default More;
