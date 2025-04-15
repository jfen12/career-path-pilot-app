import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Jobs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1">Jobs</h1>
        <p className="body-text text-slate-gray mt-2">
          Find and apply to jobs that match your career goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray">Track and manage your job applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray">View jobs you've saved for later</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Search</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray">Search for new job opportunities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jobs; 