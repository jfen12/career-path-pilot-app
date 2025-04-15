import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, MapPin, GraduationCap, Briefcase } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string;
  education: string;
  networkingGoals: string[];
  availability: string;
  profileImage?: string;
}

// Mock data for demonstration
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
    experience: '5+ years',
    education: 'MS in Computer Science',
    networkingGoals: ['Tech Leadership', 'Open Source Contribution', 'Mentoring'],
    availability: 'Available in 2 weeks',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Product Designer',
    location: 'New York, NY',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'User Research'],
    experience: '3+ years',
    education: 'BFA in Design',
    networkingGoals: ['Design Leadership', 'User Experience Research'],
    availability: 'Available immediately',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Data Scientist',
    location: 'Remote',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    experience: '4+ years',
    education: 'PhD in Data Science',
    networkingGoals: ['AI Research', 'Data Engineering'],
    availability: 'Available in 1 month',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  }
];

const BusinessMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = !locationFilter || 
      candidate.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesExperience = !experienceFilter || 
      candidate.experience === experienceFilter;

    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skill => candidate.skills.includes(skill));

    return matchesSearch && matchesLocation && matchesExperience && matchesSkills;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1">Business Marketplace</h1>
        <p className="body-text text-slate-gray mt-2">
          Connect with companies and explore business opportunities
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Search companies..."
          className="max-w-md"
        />
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Featured Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray">
              Discover top companies in your industry
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray">
              Browse open positions at leading companies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-gray">
              Get the latest updates and trends in your field
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessMarketplace; 