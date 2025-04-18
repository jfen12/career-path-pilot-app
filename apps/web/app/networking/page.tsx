import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, Calendar, ChevronRight } from 'lucide-react'

export default async function NetworkingPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Sample data - in a real app, this would come from your database
  const connections = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Product Manager",
      company: "TechCorp",
      lastContact: "2 days ago",
      nextFollowUp: "in 5 days",
      status: "active"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Engineering Director",
      company: "StartupX",
      lastContact: "1 week ago",
      nextFollowUp: "in 2 days",
      status: "pending"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Designer",
      company: "DesignCo",
      lastContact: "3 weeks ago",
      nextFollowUp: "overdue",
      status: "overdue"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Networking</h1>
        <p className="mt-2 text-gray-600">Manage your professional connections</p>
      </div>

      {/* Connection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-career-soft-purple">
                <Users className="text-career-purple" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Total Connections</h3>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-career-soft-blue">
                <MessageSquare className="text-career-blue" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Recent Conversations</h3>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <Calendar className="text-amber-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Upcoming Follow-ups</h3>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Connections</h2>
        <div className="space-y-4">
          {connections.map((connection) => (
            <Card key={connection.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-career-soft-purple flex items-center justify-center font-medium text-career-purple">
                      {connection.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{connection.name}</h3>
                      <p className="text-career-gray text-sm">{connection.title} at {connection.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-career-gray">Last contact: {connection.lastContact}</span>
                        <span className="text-xs text-career-gray">•</span>
                        <span className={`text-xs ${
                          connection.status === 'overdue' ? 'text-red-500' : 
                          connection.status === 'pending' ? 'text-amber-500' : 
                          'text-green-500'
                        }`}>
                          Follow-up {connection.nextFollowUp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-8 text-career-gray">
                    <MessageSquare size={16} className="mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Connections */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Suggested Connections</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Find new connections</h3>
                <p className="text-career-gray text-sm">Based on your career goals and interests</p>
              </div>
              <Button className="bg-career-purple hover:bg-career-dark-purple text-white">
                View Suggestions
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 