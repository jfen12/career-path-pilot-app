'use client'

import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent you an email with a link to verify your account. Please check your inbox and click the link to continue.
          </p>
          <p className="mt-4 text-center text-sm text-gray-600">
            Didn't receive an email?{' '}
            <Link href="/auth/sign-up" className="font-medium text-primary-600 hover:text-primary-500">
              Try signing up again
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 