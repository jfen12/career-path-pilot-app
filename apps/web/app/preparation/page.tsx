import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FileText, Network, Briefcase, MessageSquare, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react'
import ResumeBuilder from '@/components/preparation/resume-builder'

export default async function PreparationPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Sample data - in a real app, this would come from your database
  const preparationModules = [
    {
      id: 1,
      title: "Resume Writing",
      icon: FileText,
      progress: 75,
      steps: [
        "Basic Resume Structure",
        "Achievement Statements",
        "Keyword Optimization",
        "ATS-Friendly Formatting"
      ],
      completedSteps: 3,
      content: {
        description: "Learn how to create a professional resume that stands out to employers and passes ATS screening.",
        tips: [
          "Use action verbs to start bullet points",
          "Quantify achievements with numbers",
          "Keep it to one page for early career",
          "Customize for each job application",
          "Use industry-specific keywords",
          "Highlight relevant skills and experience"
        ],
        examples: [
          {
            title: "Before",
            content: "Managed a team of developers"
          },
          {
            title: "After",
            content: "Led a team of 5 developers to deliver 3 major product features, resulting in a 25% increase in user engagement"
          }
        ]
      }
    },
    {
      id: 2,
      title: "Job Application Strategy",
      icon: Briefcase,
      progress: 50,
      steps: [
        "Job Search Techniques",
        "Application Tracking",
        "Cover Letter Writing",
        "Follow-up Strategy"
      ],
      completedSteps: 2,
      content: {
        description: "Develop a systematic approach to job searching and application management.",
        tips: [
          "Set up job alerts for target companies",
          "Research company culture before applying",
          "Use multiple job boards",
          "Leverage your alumni network",
          "Track all applications in a spreadsheet",
          "Follow up within 1 week of applying"
        ],
        templates: [
          {
            title: "Application Tracker",
            fields: ["Company", "Position", "Date Applied", "Status", "Follow-up Date"]
          },
          {
            title: "Cover Letter Template",
            sections: ["Introduction", "Why Company", "Why You", "Call to Action"]
          }
        ]
      }
    },
    {
      id: 3,
      title: "Networking Guide",
      icon: Network,
      progress: 25,
      steps: [
        "Building Your Network",
        "LinkedIn Optimization",
        "Informational Interviews",
        "Networking Events"
      ],
      completedSteps: 1,
      content: {
        description: "Build and maintain a professional network that supports your career growth.",
        tips: [
          "Follow up within 24 hours of meeting",
          "Offer value before asking for help",
          "Keep your LinkedIn profile updated",
          "Attend industry events regularly",
          "Join professional associations",
          "Share relevant content on social media"
        ],
        scripts: [
          {
            title: "Informational Interview Request",
            content: "Hi [Name], I came across your profile and was impressed by your experience in [Industry]. I'm currently exploring career opportunities in this field and would love to learn more about your journey. Would you be open to a 15-minute chat?"
          },
          {
            title: "Follow-up After Meeting",
            content: "Thank you for taking the time to speak with me yesterday. I really appreciated your insights about [Topic]. I'll be sure to [Action Item] and would love to stay in touch."
          }
        ]
      }
    },
    {
      id: 4,
      title: "Interview Preparation",
      icon: MessageSquare,
      progress: 0,
      steps: [
        "Common Questions",
        "Behavioral Interviews",
        "Technical Interviews",
        "Salary Negotiation"
      ],
      completedSteps: 0,
      content: {
        description: "Prepare effectively for different types of interviews and salary negotiations.",
        tips: [
          "Research the company thoroughly",
          "Practice STAR method for behavioral questions",
          "Prepare questions for the interviewer",
          "Dress appropriately for the company culture",
          "Bring copies of your resume",
          "Send thank you notes within 24 hours"
        ],
        questions: [
          {
            type: "Behavioral",
            question: "Tell me about a time you faced a challenge at work.",
            tips: "Use STAR method: Situation, Task, Action, Result"
          },
          {
            type: "Technical",
            question: "How would you approach [Technical Problem]?",
            tips: "Explain your thought process, consider edge cases, discuss trade-offs"
          }
        ]
      }
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Career Preparation</h1>
        <p className="mt-2 text-gray-600">Guided content to help you prepare for your career journey</p>
      </div>

      {/* Resume Builder */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Resume Builder</h2>
        <ResumeBuilder />
      </div>

      {/* Preparation Modules */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Preparation Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preparationModules.map((module) => (
            <Card key={module.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full bg-career-soft-purple">
                      <module.icon className="text-career-purple" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{module.content.description}</p>
                      <div className="mt-4 space-y-2">
                        {module.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${
                              index < module.completedSteps 
                                ? 'bg-career-purple' 
                                : 'bg-gray-200'
                            }`} />
                            <span className={`text-sm ${
                              index < module.completedSteps 
                                ? 'text-gray-900' 
                                : 'text-gray-500'
                            }`}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Key Tips</h4>
                        <ul className="space-y-1">
                          {module.content.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 size={16} className="text-career-purple mt-0.5" />
                              <span className="text-sm text-gray-600">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Progress value={module.progress} className="w-24 h-2" />
                    <span className="text-sm text-gray-500">{module.progress}% complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-career-soft-blue">
                  <BookOpen className="text-career-blue" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Career Guide Library</h3>
                  <p className="text-sm text-gray-600">Access our collection of industry-specific career guides</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-career-soft-purple">
                  <MessageSquare className="text-career-purple" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Career Coaching</h3>
                  <p className="text-sm text-gray-600">Schedule a session with our career experts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 