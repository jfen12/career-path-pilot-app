
import { AuthForm } from '@/components/auth/AuthForm'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        
        <AuthForm mode="sign-in" />
        
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
