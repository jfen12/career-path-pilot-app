import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KanbanBoard from "@/components/jobs/KanbanBoard";

const Jobs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1">Jobs</h1>
        <p className="body-text text-slate-gray mt-2">
          Track and manage your job applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Application Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <KanbanBoard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jobs; 