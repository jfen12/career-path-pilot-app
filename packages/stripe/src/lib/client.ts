import Stripe from 'stripe'
import { STRIPE_SECRET_KEY, SUBSCRIPTION_PLANS } from './config'
import { CustomerSubscription, SubscriptionPlan, SubscriptionStatus } from './types'

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true
})

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl
}: {
  customerId: string
  priceId: string
  successUrl: string
  cancelUrl: string
}) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl
  })
}

export async function createCustomerPortalSession({
  customerId,
  returnUrl
}: {
  customerId: string
  returnUrl: string
}) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl
  })
}

export async function getCustomerSubscription(
  customerId: string
): Promise<CustomerSubscription | null> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 1
  })

  if (subscriptions.data.length === 0) {
    return null
  }

  const subscription = subscriptions.data[0]
  const plan = subscription.items.data[0].price
  const subscriptionPlan = SUBSCRIPTION_PLANS.find(p => p.id === plan.id)

  return {
    id: subscription.id,
    status: subscription.status as SubscriptionStatus,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    plan: subscriptionPlan || SUBSCRIPTION_PLANS[0]
  }
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true
  })
}

export async function reactivateSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false
  })
}

export function getPlanLimits(planId: string): SubscriptionPlan['limits'] {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId)
  return plan?.limits || SUBSCRIPTION_PLANS[0].limits
} 