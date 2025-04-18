import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@talent-primer/stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature || !webhookSecret) {
      console.error('Webhook signature or secret missing')
      return new NextResponse('Webhook signature or secret missing', { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return new NextResponse('Webhook signature verification failed', { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        try {
          await supabase
            .from('profiles')
            .update({
              subscription_status: subscription.status,
              subscription_id: subscription.id,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('stripe_customer_id', customerId)
        } catch (err) {
          console.error('Error updating subscription in database:', err)
          return new NextResponse('Error updating subscription', { status: 500 })
        }
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        try {
          await supabase
            .from('profiles')
            .update({
              stripe_customer_id: customerId,
              subscription_id: subscriptionId,
              subscription_status: 'active',
            })
            .eq('id', session.client_reference_id)
        } catch (err) {
          console.error('Error updating profile after checkout:', err)
          return new NextResponse('Error updating profile', { status: 500 })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        try {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'past_due',
            })
            .eq('stripe_customer_id', customerId)
        } catch (err) {
          console.error('Error updating subscription status:', err)
          return new NextResponse('Error updating subscription status', { status: 500 })
        }
        break
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        try {
          await supabase
            .from('profiles')
            .update({
              subscription_status: subscription.status,
            })
            .eq('stripe_customer_id', customerId)
        } catch (err) {
          console.error('Error updating trial status:', err)
          return new NextResponse('Error updating trial status', { status: 500 })
        }
        break
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`)
      }
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new NextResponse('Webhook Error', { status: 400 })
  }
} 