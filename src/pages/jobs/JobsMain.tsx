
import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Building, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  logo?: string;
  description: string;
  saved?: boolean;
  applied?: boolean;
  matchScore?: number;
};

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Product Manager",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedDate: "2 days ago",
    description: "Leading product development initiatives for our SaaS platform.",
    matchScore: 92,
  },
  {
    id: "2",
    title: "Senior UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Full-time",
    postedDate: "1 week ago",
    description: "Creating user-centered designs for enterprise applications.",
    matchScore: 85,
  },
  {
    id: "3",
    title: "Marketing Specialist",
    company: "GrowthCo",
    location: "New York, NY",
    type: "Contract",
    salary: "$80,000 - $100,000",
    postedDate: "3 days ago",
    description: "Developing and implementing marketing strategies.",
    matchScore: 78,
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "InnoTech",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    postedDate: "Just now",
    description: "Building scalable backend systems using modern technologies.",
    matchScore: 89,
  },
];

const JobsMain = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  
  const handleSaveJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          const newSavedState = !job.saved;
          toast(
            newSavedState ? "Job saved successfully!" : "Job removed from saved list"
          );
          return { ...job, saved: newSavedState };
        }
        return job;
      })
    );
  };

  const handleApplyClick = (jobId: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          navigate(`/jobs/apply/${jobId}`);
          return job;
        }
        return job;
      })
    );
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderJobCard = (job: Job) => (
    <Card key={job.id} className="card-hover mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-career-soft-purple flex items-center justify-center font-medium text-career-purple">
              {job.logo || job.company.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium">{job.title}</h3>
              <div className="text-career-gray text-sm">{job.company}</div>
            </div>
          </div>
          {job.matchScore && (
            <Badge className="bg-career-soft-purple text-career-purple border-0">
              {job.matchScore}% Match
            </Badge>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-y-2 text-sm text-career-gray">
          <div className="flex items-center mr-4">
            <MapPin size={14} className="mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Building size={14} className="mr-1" />
            {job.type}
          </div>
        </div>

        {job.salary && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Salary:</span> {job.salary}
          </div>
        )}

        <p className="mt-3 text-sm line-clamp-2">{job.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-career-gray">Posted {job.postedDate}</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`${
                job.saved
                  ? "bg-career-soft-purple text-career-purple border-career-purple"
                  : ""
              }`}
              onClick={() => handleSaveJob(job.id)}
            >
              <Bookmark size={14} className="mr-1" />
              {job.saved ? "Saved" : "Save"}
            </Button>
            <Button
              size="sm"
              className="bg-career-purple hover:bg-career-dark-purple text-white"
              onClick={() => handleApplyClick(job.id)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageContainer title="Job Search">
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-career-gray" size={18} />
        <Input
          placeholder="Search job title, company, or location..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Button variant="outline" className="text-career-gray">
          <SlidersHorizontal size={16} className="mr-1" /> Filters
        </Button>
        <div className="text-sm text-career-gray">
          {filteredJobs.length} jobs found
        </div>
      </div>

      <Tabs defaultValue="recommended">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="animate-fade-in">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(renderJobCard)
          ) : (
            <div className="text-center py-8">
              <p>No jobs match your search.</p>
              <p className="text-career-gray">Try adjusting your search criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="animate-fade-in">
          {filteredJobs.filter((job) => job.saved).length > 0 ? (
            filteredJobs.filter((job) => job.saved).map(renderJobCard)
          ) : (
            <div className="text-center py-8">
              <p>No saved jobs yet.</p>
              <p className="text-career-gray">Save jobs you're interested in to view them here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default JobsMain;
