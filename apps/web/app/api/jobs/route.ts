import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const jobType = searchParams.get('jobType')
    const experienceLevel = searchParams.get('experienceLevel')
    
    // Calculate offset
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Add filters if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }
    if (jobType) {
      query = query.eq('job_type', jobType)
    }
    if (experienceLevel) {
      query = query.eq('experience_level', experienceLevel)
    }

    const { data: jobs, count, error } = await query

    if (error) {
      console.error('Error fetching jobs:', error)
      return new NextResponse('Error fetching jobs', { status: 500 })
    }

    return NextResponse.json({
      jobs,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
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
      experience_level
    } = body

    // Validate required fields
    if (!title || !company || !location || !description || !requirements || !job_type || !experience_level) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const { data: job, error } = await supabase
      .from('jobs')
      .insert({
        title,
        company,
        location,
        description,
        requirements,
        salary_min,
        salary_max,
        job_type,
        experience_level,
        posted_by: session.user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating job:', error)
      return new NextResponse('Error creating job', { status: 500 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 