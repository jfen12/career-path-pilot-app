import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Briefcase, Clock, DollarSign } from 'lucide-react'

export default async function JobPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch job details
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/jobs/${params.id}`,
    {
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    redirect('/jobs')
  }

  const job = await response.json()

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{job.company}</Badge>
                <Badge variant="outline">{job.job_type}</Badge>
                <Badge variant="outline">{job.experience_level}</Badge>
              </div>
            </div>
            {session.user.id === job.posted_by && (
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a href={`/jobs/${job.id}/edit`}>Edit</a>
                </Button>
                <Button variant="destructive">Delete</Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-500" />
              <span>{job.job_type}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span>
                ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 