
import { AuthForm } from '@/components/auth/AuthForm'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-600 mt-2">Get started with Career Co-Pilot</p>
        </div>
        
        <AuthForm mode="sign-up" />
        
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
