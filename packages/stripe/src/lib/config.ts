import { SubscriptionPlan } from './types'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing env.STRIPE_SECRET_KEY')
}

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic features for small teams',
    price: 0,
    interval: 'month',
    features: [
      'Up to 10 employees',
      'Basic skill tracking',
      'Standard reports',
      'Email support'
    ],
    limits: {
      employees: 10,
      skillsPerEmployee: 5,
      customSkills: false,
      advancedAnalytics: false,
      apiAccess: false
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced features for growing teams',
    price: 29,
    interval: 'month',
    features: [
      'Up to 50 employees',
      'Unlimited skill tracking',
      'Custom skills',
      'Advanced analytics',
      'Priority support'
    ],
    limits: {
      employees: 50,
      skillsPerEmployee: -1, // unlimited
      customSkills: true,
      advancedAnalytics: true,
      apiAccess: false
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for large organizations',
    price: 99,
    interval: 'month',
    features: [
      'Unlimited employees',
      'Unlimited skill tracking',
      'Custom skills',
      'Advanced analytics',
      'API access',
      'Dedicated support',
      'Custom integrations'
    ],
    limits: {
      employees: -1, // unlimited
      skillsPerEmployee: -1, // unlimited
      customSkills: true,
      advancedAnalytics: true,
      apiAccess: true
    }
  }
] 