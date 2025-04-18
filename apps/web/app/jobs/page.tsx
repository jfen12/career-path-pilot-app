import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Get query parameters
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 10
  const search = typeof searchParams.search === 'string' ? searchParams.search : ''
  const jobType = typeof searchParams.jobType === 'string' ? searchParams.jobType : ''
  const experienceLevel = typeof searchParams.experienceLevel === 'string' ? searchParams.experienceLevel : ''

  // Fetch jobs
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/jobs?${new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(jobType && { jobType }),
      ...(experienceLevel && { experienceLevel }),
    })}`,
    {
      cache: 'no-store',
    }
  )

  const { jobs, total, totalPages } = await response.json()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Link href="/jobs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2">
          <Input
            type="search"
            placeholder="Search jobs..."
            className="w-full"
            defaultValue={search}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select defaultValue={jobType}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={experienceLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {jobs.map((job: any) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <div className="text-sm text-gray-500">
                {job.company} • {job.location}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.requirements.map((req: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {req}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  {job.salary_min && job.salary_max && (
                    <span className="text-gray-600">
                      ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                    </span>
                  )}
                </div>
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/jobs?page=${pageNum}&limit=${limit}${
                  search ? `&search=${search}` : ''
                }${jobType ? `&jobType=${jobType}` : ''}${
                  experienceLevel ? `&experienceLevel=${experienceLevel}` : ''
                }`}
              >
                <Button
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                >
                  {pageNum}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 