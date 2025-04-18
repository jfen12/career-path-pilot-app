import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: job, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching job:', error)
      return new NextResponse('Error fetching job', { status: 500 })
    }

    if (!job) {
      return new NextResponse('Job not found', { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      company,
      location,
      description,
      requirements,
      salary_min,
      salary_max,
      job_type,
      experience_level,
      status
    } = body

    // Check if the job exists and belongs to the user
    const { data: existingJob } = await supabase
      .from('jobs')
      .select('posted_by')
      .eq('id', params.id)
      .single()

    if (!existingJob) {
      return new NextResponse('Job not found', { status: 404 })
    }

    if (existingJob.posted_by !== session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { data: job, error } = await supabase
      .from('jobs')
      .update({
        title,
        company,
        location,
        description,
        requirements,
        salary_min,
        salary_max,
        job_type,
        experience_level,
        status
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating job:', error)
      return new NextResponse('Error updating job', { status: 500 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check if the job exists and belongs to the user
    const { data: existingJob } = await supabase
      .from('jobs')
      .select('posted_by')
      .eq('id', params.id)
      .single()

    if (!existingJob) {
      return new NextResponse('Job not found', { status: 404 })
    }

    if (existingJob.posted_by !== session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting job:', error)
      return new NextResponse('Error deleting job', { status: 500 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 