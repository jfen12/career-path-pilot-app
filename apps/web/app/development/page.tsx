import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { GraduationCap, BookOpen, Target, ChevronRight } from 'lucide-react'

export default async function DevelopmentPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Sample data - in a real app, this would come from your database
  const learningPaths = [
    {
      id: 1,
      title: "Product Management Fundamentals",
      progress: 65,
      skills: ["Product Strategy", "User Research", "Agile Methodology"],
      duration: "8 weeks",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Advanced Data Analysis",
      progress: 0,
      skills: ["SQL", "Python", "Data Visualization"],
      duration: "6 weeks",
      status: "not-started"
    },
    {
      id: 3,
      title: "Leadership & Management",
      progress: 100,
      skills: ["Team Management", "Strategic Planning", "Communication"],
      duration: "10 weeks",
      status: "completed"
    }
  ]

  const skillAssessment = {
    technical: [
      { name: "JavaScript", level: "Advanced", progress: 80 },
      { name: "React", level: "Intermediate", progress: 60 },
      { name: "Node.js", level: "Intermediate", progress: 65 }
    ],
    soft: [
      { name: "Communication", level: "Advanced", progress: 85 },
      { name: "Leadership", level: "Intermediate", progress: 70 },
      { name: "Problem Solving", level: "Advanced", progress: 90 }
    ]
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Professional Development</h1>
        <p className="mt-2 text-gray-600">Track your learning progress and skill development</p>
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Learning Paths</h2>
        <div className="space-y-4">
          {learningPaths.map((path) => (
            <Card key={path.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full bg-career-soft-purple">
                      <GraduationCap className="text-career-purple" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{path.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-career-gray">{path.duration}</span>
                        <span className="text-xs text-career-gray">•</span>
                        <span className="text-xs text-career-gray">
                          {path.skills.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{path.progress}%</span>
                    <Button variant="ghost" className="h-8 text-career-gray">
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
                <Progress value={path.progress} className="h-2 mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skill Assessment */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Skill Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Technical Skills</h3>
              <div className="space-y-4">
                {skillAssessment.technical.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-career-gray">{skill.level}</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Soft Skills</h3>
              <div className="space-y-4">
                {skillAssessment.soft.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-career-gray">{skill.level}</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Learning */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recommended Learning</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Based on your career goals</h3>
                <p className="text-career-gray text-sm">Personalized learning recommendations</p>
              </div>
              <Button className="bg-career-purple hover:bg-career-dark-purple text-white">
                View Recommendations
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 