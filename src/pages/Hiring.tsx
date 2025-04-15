import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "$199/mo",
    description: "Access masked candidate data to identify potential matches",
    features: [
      "View anonymized candidate profiles",
      "Basic search and filtering",
      "Access to candidate skills and experience",
      "Limited candidate recommendations",
      "Email support"
    ],
    buttonText: "Start Basic Trial"
  },
  {
    name: "Core",
    price: "$499/mo",
    description: "Enhanced access to candidate information and insights",
    features: [
      "All Basic features",
      "View partial candidate details",
      "Advanced search filters",
      "Candidate matching algorithm",
      "Behavioral insights",
      "Priority support"
    ],
    buttonText: "Start Core Trial",
    highlighted: true
  },
  {
    name: "Pro",
    price: "$999/mo",
    description: "Full access to comprehensive candidate profiles and hiring tools",
    features: [
      "All Core features",
      "Complete candidate profiles",
      "Personality assessments",
      "Success prediction metrics",
      "Direct messaging",
      "Dedicated account manager",
      "Custom hiring workflow"
    ],
    buttonText: "Start Pro Trial"
  }
];

interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  experience: string;
  skills: string[];
  traits: string[];
  matchScore: number;
}

const sampleCandidates: CandidateProfile[] = [
  {
    id: "1",
    name: "Sarah J.",
    title: "Senior Software Engineer",
    experience: "8 years",
    skills: ["React", "TypeScript", "Node.js", "AWS", "System Design"],
    traits: ["Problem Solver", "Team Leader", "Innovative"],
    matchScore: 95
  },
  {
    id: "2",
    name: "Michael C.",
    title: "Product Designer",
    experience: "5 years",
    skills: ["UI/UX", "Figma", "User Research", "Design Systems"],
    traits: ["Creative", "User-Focused", "Collaborative"],
    matchScore: 88
  },
  {
    id: "3",
    name: "Emily R.",
    title: "Data Scientist",
    experience: "6 years",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    traits: ["Analytical", "Detail-Oriented", "Research-Driven"],
    matchScore: 92
  }
];

const Hiring = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="heading-1">Hire Top Talent</h1>
        <p className="body-text text-slate-gray mt-4 max-w-2xl mx-auto">
          Become a TalentPrimer partner and gain access to our curated pool of exceptional candidates.
          Our comprehensive profiles and AI-powered matching help you make better hiring decisions.
        </p>
      </div>

      {/* Sample Candidates */}
      <div>
        <h2 className="heading-2 mb-6">Featured Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCandidates.map((candidate) => (
            <Card key={candidate.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                    <CardDescription>{candidate.title}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-gold-ochre text-deep-teal">
                    {candidate.matchScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-deep-teal">Experience</p>
                    <p className="text-slate-gray">{candidate.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-teal">Key Skills</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-deep-teal">Key Traits</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {candidate.traits.map((trait) => (
                        <Badge key={trait} variant="secondary">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Full Profile</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Tiers */}
      <div>
        <h2 className="heading-2 mb-6">Hiring Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${
                tier.highlighted
                  ? "border-gold-ochre shadow-lg scale-105"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gold-ochre text-deep-teal">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-deep-teal">{tier.price}</span>
                  <span className="text-slate-gray ml-2">/month</span>
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-slate-gray">
                      <svg
                        className="h-5 w-5 text-gold-ochre mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    tier.highlighted
                      ? "bg-gold-ochre text-deep-teal hover:bg-gold-ochre/90"
                      : ""
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hiring; 