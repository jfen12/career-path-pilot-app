
import { useState } from 'react'
import { SUBSCRIPTION_PLANS } from '@/lib/stripe'
import { PricingCard } from './PricingCard'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function PricingSection() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubscribe = async (planName: string) => {
    setLoading(true)
    try {
      if (planName === 'Free') {
        navigate('/dashboard')
        return
      }
      
      // This will be implemented when we add the Stripe integration
      toast.info('Subscription functionality coming soon!')
    } catch (error) {
      toast.error('Failed to process subscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600">
          Select the plan that best fits your career goals
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <PricingCard
            key={plan.name}
            {...plan}
            onSubscribe={() => handleSubscribe(plan.name)}
            loading={loading}
          />
        ))}
      </div>
    </div>
  )
}
