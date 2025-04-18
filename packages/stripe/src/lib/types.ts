export type SubscriptionPlan = {
  id: string
  name: string
  description: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    employees: number
    skillsPerEmployee: number
    customSkills: boolean
    advancedAnalytics: boolean
    apiAccess: boolean
  }
}

export type SubscriptionStatus = 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid'

export type CustomerSubscription = {
  id: string
  status: SubscriptionStatus
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  plan: SubscriptionPlan
} 