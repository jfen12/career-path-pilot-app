'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Edit2 } from 'lucide-react'

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
}

export default function ResumeBuilder() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [summary, setSummary] = useState('')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [educations, setEducations] = useState<Education[]>([])
  const [skills, setSkills] = useState<string[]>([])

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ])
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id))
  }

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        graduationDate: ''
      }
    ])
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id))
  }

  const addSkill = () => {
    const newSkill = prompt('Enter a new skill:')
    if (newSkill) {
      setSkills([...skills, newSkill])
    }
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Textarea
                placeholder="Professional Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button onClick={addExperience} size="sm">
                <Plus size={16} className="mr-1" />
                Add Experience
              </Button>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Experience {experiences.indexOf(exp) + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                  <Input
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                    <Input
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button onClick={addEducation} size="sm">
                <Plus size={16} className="mr-1" />
                Add Education
              </Button>
            </div>
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Education {educations.indexOf(edu) + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <Input
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  />
                  <Input
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  />
                  <Input
                    placeholder="Graduation Date"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              <Button onClick={addSkill} size="sm">
                <Plus size={16} className="mr-1" />
                Add Skill
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-career-soft-purple text-career-purple px-3 py-1 rounded-full"
                >
                  <span>{skill}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <Card className="sticky top-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resume Preview</h3>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{name || 'Your Name'}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{email || 'your.email@example.com'}</p>
                <p>{phone || '(123) 456-7890'}</p>
              </div>
            </div>

            {summary && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                <p className="text-gray-700">{summary}</p>
              </div>
            )}

            {experiences.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Experience</h2>
                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <h3 className="font-medium">{exp.position || 'Position'}</h3>
                    <p className="text-sm text-gray-600">
                      {exp.company || 'Company'} • {exp.startDate || 'Start'} - {exp.endDate || 'End'}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">{exp.description || 'Description'}</p>
                  </div>
                ))}
              </div>
            )}

            {educations.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Education</h2>
                {educations.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <h3 className="font-medium">{edu.degree || 'Degree'}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.institution || 'Institution'} • {edu.field || 'Field of Study'}
                    </p>
                    <p className="text-sm text-gray-600">Graduated: {edu.graduationDate || 'Date'}</p>
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-career-soft-purple text-career-purple px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 