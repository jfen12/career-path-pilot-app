
import { useNavigate } from "react-router-dom";
import { Users, Calendar, Briefcase, ChevronRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Sample user data (would come from state/context in real app)
  const userData = {
    name: "Sarah",
    goalProgress: 30,
    networkingTarget: 3,
    networkingDone: 1,
    upcomingEvents: 2,
    savedJobs: 4,
    activeApplications: 2,
  };

  const featuredCards = [
    {
      icon: Users,
      title: "Weekly Networking",
      value: `${userData.networkingDone}/${userData.networkingTarget}`,
      progress: (userData.networkingDone / userData.networkingTarget) * 100,
      linkText: "Connect with someone",
      path: "/networking",
      color: "bg-career-soft-purple text-career-purple",
    },
    {
      icon: Calendar,
      title: "Professional Development",
      value: `${userData.upcomingEvents} activities`,
      progress: 50,
      linkText: "View suggestions",
      path: "/development",
      color: "bg-career-soft-blue text-career-blue",
    },
    {
      icon: Briefcase,
      title: "Job Applications",
      value: `${userData.activeApplications} active`,
      progress: 40,
      linkText: "Track applications",
      path: "/jobs/applications",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">
          Good morning, {userData.name || "there"}
        </h1>
        <p className="text-career-gray">Here's your career progress</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">Goal: Find a new job</h3>
              <p className="text-career-gray text-sm">6 month timeline</p>
            </div>
            <Button
              variant="ghost"
              className="h-8 text-career-gray"
              onClick={() => navigate("/goals")}
            >
              Details
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{userData.goalProgress}%</span>
            </div>
            <Progress value={userData.goalProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {featuredCards.map((card) => (
          <Card key={card.title} className="card-hover">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${card.color}`}>
                    <card.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">{card.title}</h3>
                    <p className="text-career-gray text-sm">{card.value}</p>
                  </div>
                </div>
              </div>
              <Progress value={card.progress} className="h-1.5 mb-3" />
              <Button
                variant="ghost"
                className="w-full justify-between text-career-purple hover:text-career-dark-purple hover:bg-career-soft-purple/50 p-2 h-auto"
                onClick={() => navigate(card.path)}
              >
                <span>{card.linkText}</span>
                <ChevronRight size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3">What's Next</h2>
      <Card className="card-hover mb-4">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Connect with 2 more people this week</h3>
          <p className="text-career-gray text-sm mb-3">
            You're on track to meet your networking goal
          </p>
          <Button
            className="w-full bg-career-purple hover:bg-career-dark-purple text-white"
            onClick={() => navigate("/networking")}
          >
            View suggested connections
          </Button>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Update your skills assessment</h3>
          <p className="text-career-gray text-sm mb-3">
            Helps us tailor better recommendations
          </p>
          <Button
            variant="outline"
            className="w-full border-career-purple text-career-purple"
            onClick={() => navigate("/development")}
          >
            Take assessment
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
