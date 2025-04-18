import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Calendar, Briefcase, ChevronRight, TrendingUp, GraduationCap } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  // Sample data - in a real app, this would come from your database
  const userData = {
    name: profile?.full_name || session.user.email,
    goalProgress: 30,
    networkingTarget: 3,
    networkingDone: 1,
    upcomingEvents: 2,
    savedJobs: 4,
    activeApplications: 2,
    learningGoal: 1,
    learningCompleted: 0
  }

  const featuredCards = [
    {
      icon: Users,
      title: "Weekly Networking",
      value: `${userData.networkingDone}/${userData.networkingTarget}`,
      progress: (userData.networkingDone / userData.networkingTarget) * 100,
      linkText: "Connect with someone",
      path: "/networking",
      color: "bg-career-soft-purple text-career-purple",
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      value: `${userData.learningCompleted}/${userData.learningGoal} activities`,
      progress: (userData.learningCompleted / userData.learningGoal) * 100,
      linkText: "View learning path",
      path: "/development",
      color: "bg-career-soft-blue text-career-blue",
    },
    {
      icon: Briefcase,
      title: "Job Applications",
      value: `${userData.activeApplications} active`,
      progress: 40,
      linkText: "Track applications",
      path: "/jobs/applications",
      color: "bg-amber-100 text-amber-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userData.name}</h1>
        <p className="mt-2 text-gray-600">Here's your career progress</p>
      </div>

      {/* Career Goal Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">Goal: {profile?.goalType === 'new-job' ? 'Find a new job' : 
                                                profile?.goalType === 'promotion' ? 'Get promoted' : 
                                                'Develop new skills'}</h3>
              <p className="text-career-gray text-sm">{profile?.timeframe || '6 month'} timeline</p>
            </div>
            <Link href="/goals">
              <Button variant="ghost" className="h-8 text-career-gray">
                Details
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{userData.goalProgress}%</span>
            </div>
            <Progress value={userData.goalProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredCards.map((card) => (
          <Card key={card.title} className="card-hover">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${card.color}`}>
                    <card.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">{card.title}</h3>
                    <p className="text-career-gray text-sm">{card.value}</p>
                  </div>
                </div>
              </div>
              <Progress value={card.progress} className="h-1.5 mb-3" />
              <Link href={card.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-career-purple hover:text-career-dark-purple hover:bg-career-soft-purple/50 p-2 h-auto"
                >
                  <span>{card.linkText}</span>
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <div>
        <h2 className="text-lg font-semibold mb-3">What's Next</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="card-hover">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Connect with {userData.networkingTarget - userData.networkingDone} more people this week</h3>
              <p className="text-career-gray text-sm mb-3">
                You're on track to meet your networking goal
              </p>
              <Link href="/networking">
                <Button className="w-full bg-career-purple hover:bg-career-dark-purple text-white">
                  View suggested connections
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Update your skills assessment</h3>
              <p className="text-career-gray text-sm mb-3">
                Helps us tailor better recommendations
              </p>
              <Link href="/development">
                <Button variant="outline" className="w-full border-career-purple text-career-purple">
                  Take assessment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 