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

export const BusinessMarketplace: React.FC = () => {
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
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Candidate Marketplace</h1>
        <p className="text-muted-foreground">
          Search and connect with talented professionals looking for new opportunities.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name, title, or skills..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal size={16} />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              placeholder="Enter location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
            <Select
              value={experienceFilter}
              onValueChange={setExperienceFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1+ years">1+ years</SelectItem>
                <SelectItem value="3+ years">3+ years</SelectItem>
                <SelectItem value="5+ years">5+ years</SelectItem>
                <SelectItem value="10+ years">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'UI/UX'].map(skill => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleSkillSelect(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {filteredCandidates.map(candidate => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardTitle>{candidate.name}</CardTitle>
                  <p className="text-muted-foreground">{candidate.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="text-sm">{candidate.location}</span>
                  </div>
                </div>
                <Badge variant="secondary">{candidate.availability}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Experience</h3>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-muted-foreground" />
                      <span>{candidate.experience}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Education</h3>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-muted-foreground" />
                      <span>{candidate.education}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Networking Goals</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.networkingGoals.map(goal => (
                      <Badge key={goal} variant="secondary">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">View Profile</Button>
                  <Button>Contact Candidate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}; 