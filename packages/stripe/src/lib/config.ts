import { SubscriptionPlan } from './types'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing env.STRIPE_SECRET_KEY')
}

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'price_basic',
    name: 'Basic',
    description: 'Perfect for getting started with career development',
    price: 9.99,
    interval: 'month',
    features: [
      'Access to basic career resources',
      'Job search tools',
      'Resume builder',
      'Limited interview practice',
    ],
    limits: {
      employees: 1,
      skillsPerEmployee: 5,
      customSkills: false,
      advancedAnalytics: false,
      apiAccess: false,
    },
  },
  {
    id: 'price_pro',
    name: 'Professional',
    description: 'For serious job seekers and career changers',
    price: 19.99,
    interval: 'month',
    features: [
      'All Basic features',
      'Advanced career resources',
      'Unlimited interview practice',
      'Career coach access',
      'Personalized job matches',
    ],
    limits: {
      employees: 1,
      skillsPerEmployee: -1,
      customSkills: true,
      advancedAnalytics: true,
      apiAccess: false,
    },
  },
  {
    id: 'price_enterprise',
    name: 'Enterprise',
    description: 'Complete career development solution for teams',
    price: 49.99,
    interval: 'month',
    features: [
      'All Professional features',
      'Team collaboration tools',
      'Custom training modules',
      'Priority support',
      'Analytics and reporting',
      'Dedicated account manager',
    ],
    limits: {
      employees: -1,
      skillsPerEmployee: -1,
      customSkills: true,
      advancedAnalytics: true,
      apiAccess: true,
    },
  },
] 