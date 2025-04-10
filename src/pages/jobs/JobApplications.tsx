
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  Building, 
  Calendar, 
  FileText, 
  Plus, 
  PlusCircle,
  MessageSquarePlus,
  X,
  Star,
  StarHalf 
} from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
type JobApplication = {
  id: string;
  jobTitle: string;
  company: string;
  status: "toApply" | "applied" | "interviewing" | "offer" | "rejected";
  dateUpdated: string;
  logo?: string;
  notes?: string;
  interview?: {
    date: string;
    type: string;
  };
  documents?: string[];
  salary?: string;
  rating?: number;
};

// Sample data
const applications: JobApplication[] = [
  {
    id: "1",
    jobTitle: "Senior Product Manager",
    company: "TechCorp",
    status: "interviewing",
    dateUpdated: "Yesterday",
    notes: "Need to prepare for technical interview",
    interview: {
      date: "Jun 15, 2025",
      type: "Technical Interview",
    },
  },
  {
    id: "2",
    jobTitle: "UX Designer",
    company: "DesignStudio",
    status: "applied",
    dateUpdated: "3 days ago",
    documents: ["Resume", "Portfolio"],
  },
  {
    id: "3",
    jobTitle: "Marketing Director",
    company: "GrowthCo",
    status: "toApply",
    dateUpdated: "1 week ago",
  },
  {
    id: "4",
    jobTitle: "Software Engineer",
    company: "CodeLabs",
    status: "rejected",
    dateUpdated: "2 weeks ago",
    notes: "Will try again next year",
  },
  {
    id: "5",
    jobTitle: "Product Analyst",
    company: "DataInsights",
    status: "offer",
    dateUpdated: "1 day ago",
    salary: "$95,000",
    rating: 4,
  },
];

const JobApplications = () => {
  const navigate = useNavigate();
  const [jobsData, setJobsData] = useState<JobApplication[]>(applications);
  
  const getStatusIcon = (status: JobApplication["status"]) => {
    switch (status) {
      case "toApply":
        return <Clock size={16} className="text-career-gray" />;
      case "applied":
        return <CheckCircle size={16} className="text-blue-500" />;
      case "interviewing":
        return <Calendar size={16} className="text-amber-500" />;
      case "offer":
        return <Star size={16} className="text-green-500" />;
      case "rejected":
        return <X size={16} className="text-red-500" />;
    }
  };

  const moveCard = (id: string, newStatus: JobApplication["status"]) => {
    setJobsData((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
    toast.success("Application status updated!");
  };

  const getApplicationsByStatus = (status: JobApplication["status"]) => {
    return jobsData.filter((job) => job.status === status);
  };

  // Function to render action buttons based on application status
  const renderActionButtons = (job: JobApplication) => {
    switch (job.status) {
      case "toApply":
        return (
          <Button
            size="sm"
            className="w-full bg-career-purple text-white"
            onClick={() => moveCard(job.id, "applied")}
          >
            <FileText size={14} className="mr-1" /> Apply
          </Button>
        );
      case "applied":
        return (
          <Button
            size="sm"
            className="w-full bg-amber-500 text-white"
            onClick={() => moveCard(job.id, "interviewing")}
          >
            <Calendar size={14} className="mr-1" /> Schedule Interview
          </Button>
        );
      case "interviewing":
        return (
          <div className="flex gap-2 w-full">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-red-500 text-red-500"
              onClick={() => moveCard(job.id, "rejected")}
            >
              <X size={14} className="mr-1" /> Rejected
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-green-500 text-white"
              onClick={() => moveCard(job.id, "offer")}
            >
              <Star size={14} className="mr-1" /> Got Offer
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderJobCard = (job: JobApplication) => (
    <Card key={job.id} className="card-hover mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-career-soft-purple flex items-center justify-center font-medium text-career-purple">
              {job.logo || job.company.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium">{job.jobTitle}</h3>
              <div className="flex items-center text-sm text-career-gray">
                <Building size={14} className="mr-1" />
                {job.company}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {getStatusIcon(job.status)}
            {job.rating && (
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => {
                  if (i < Math.floor(job.rating!)) {
                    return <Star key={i} size={14} className="text-amber-500" />;
                  } else if (i === Math.floor(job.rating!) && job.rating! % 1 > 0) {
                    return <StarHalf key={i} size={14} className="text-amber-500" />;
                  } else {
                    return <Star key={i} size={14} className="text-gray-300" />;
                  }
                })}
              </div>
            )}
          </div>
        </div>

        {job.interview && (
          <div className="mt-3 p-2 bg-amber-50 rounded border border-amber-100 text-sm">
            <div className="font-medium text-amber-700">
              {job.interview.type}
            </div>
            <div className="text-amber-600">{job.interview.date}</div>
          </div>
        )}

        {job.salary && (
          <div className="mt-3 p-2 bg-green-50 rounded border border-green-100 text-sm">
            <div className="font-medium text-green-700">
              Offer: {job.salary}
            </div>
          </div>
        )}

        {job.documents && job.documents.length > 0 && (
          <div className="mt-3 flex gap-1">
            {job.documents.map((doc) => (
              <Badge key={doc} variant="outline" className="bg-gray-50">
                {doc}
              </Badge>
            ))}
          </div>
        )}

        {job.notes && (
          <div className="mt-3 text-sm text-career-gray">
            <p className="line-clamp-2">{job.notes}</p>
          </div>
        )}

        <div className="mt-3 flex justify-between items-center">
          <div className="text-xs text-career-gray">Updated {job.dateUpdated}</div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => {
              toast("Add notes feature coming soon!");
            }}
          >
            <MessageSquarePlus size={16} className="text-career-gray" />
          </Button>
        </div>

        <div className="mt-2">{renderActionButtons(job)}</div>
      </CardContent>
    </Card>
  );

  return (
    <PageContainer title="Applications">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium">My Job Board</h2>
          <p className="text-sm text-career-gray">
            Track and manage your applications
          </p>
        </div>
        <Button 
          className="bg-career-purple hover:bg-career-dark-purple text-white"
          onClick={() => navigate("/jobs")}
        >
          <Plus size={16} className="mr-1" /> Add Job
        </Button>
      </div>

      <Tabs defaultValue="kanban">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium flex items-center mb-2">
                <Clock size={16} className="mr-1 text-career-gray" /> To Apply ({getApplicationsByStatus("toApply").length})
              </h3>
              <div className="space-y-3">
                {getApplicationsByStatus("toApply").map(renderJobCard)}
                <Button
                  variant="outline"
                  className="w-full border-dashed py-6"
                  onClick={() => navigate("/jobs")}
                >
                  <PlusCircle size={16} className="mr-1" /> Add Job
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium flex items-center mb-2">
                <CheckCircle size={16} className="mr-1 text-blue-500" /> Applied ({getApplicationsByStatus("applied").length})
              </h3>
              <div className="space-y-3">
                {getApplicationsByStatus("applied").map(renderJobCard)}
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium flex items-center mb-2">
                <Calendar size={16} className="mr-1 text-amber-500" /> Interviewing ({getApplicationsByStatus("interviewing").length})
              </h3>
              <div className="space-y-3">
                {getApplicationsByStatus("interviewing").map(renderJobCard)}
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium flex items-center mb-2">
                <Star size={16} className="mr-1 text-green-500" /> Offers ({getApplicationsByStatus("offer").length})
              </h3>
              <div className="space-y-3">
                {getApplicationsByStatus("offer").map(renderJobCard)}
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium flex items-center mb-2">
                <X size={16} className="mr-1 text-red-500" /> Rejected ({getApplicationsByStatus("rejected").length})
              </h3>
              <div className="space-y-3">
                {getApplicationsByStatus("rejected").map(renderJobCard)}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="animate-fade-in">
          <div className="space-y-3">
            {jobsData.map(renderJobCard)}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default JobApplications;
