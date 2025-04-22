
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface PricingCardProps {
  name: string
  price: number
  description: string
  features: string[]
  onSubscribe: () => void
  loading?: boolean
  current?: boolean
}

export function PricingCard({
  name,
  price,
  description,
  features,
  onSubscribe,
  loading,
  current
}: PricingCardProps) {
  return (
    <Card className={`p-6 ${current ? 'border-primary-500 border-2' : ''}`}>
      {current && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
            Current Plan
          </span>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <ul className="mt-6 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={onSubscribe}
        disabled={loading}
        className="w-full mt-6"
        variant={current ? "outline" : "default"}
      >
        {loading
          ? "Loading..."
          : current
          ? "Manage Subscription"
          : `Subscribe to ${name}`}
      </Button>
    </Card>
  )
}
