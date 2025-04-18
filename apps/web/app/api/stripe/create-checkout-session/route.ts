import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createCheckoutSession } from '@talent-primer/stripe'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { priceId, customerId, userId } = await request.json()

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const sessionUrl = await createCheckoutSession({
      customerId: customerId || undefined,
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
    })

    return NextResponse.json({ url: sessionUrl })
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 