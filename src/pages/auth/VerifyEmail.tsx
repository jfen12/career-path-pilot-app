
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Check Your Email</h1>
          <p className="text-gray-600 mt-4">
            We sent you a verification link. Please check your email and click the link to verify your account.
          </p>
          <p className="mt-6 text-sm text-gray-600">
            Didn't receive the email?{' '}
            <Link to="/sign-up" className="text-primary-600 hover:text-primary-500">
              Try again
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
