'use client'

import { useState } from 'react'
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '@talent-primer/stripe'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface BillingClientProps {
  customerId?: string
  userId: string
}

export function BillingClient({ customerId, userId }: BillingClientProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerId,
          userId,
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {SUBSCRIPTION_PLANS.map((plan: SubscriptionPlan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
            <p className="mt-2 text-gray-600">{plan.description}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-500">/{plan.interval}</span>
            </div>
            <ul className="mt-6 space-y-2">
              {plan.features.map((feature: string) => (
                <li key={feature} className="flex items-center text-gray-600">
                  <svg
                    className="mr-2 h-5 w-5 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading}
              className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
      {customerId && (
        <div className="flex justify-center">
          <button
            onClick={handleManageSubscription}
            disabled={loading}
            className="bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Manage Subscription'}
          </button>
        </div>
      )}
    </div>
  )
} 