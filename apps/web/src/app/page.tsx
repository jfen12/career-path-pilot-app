import React from 'react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to TalentPrimer
        </h1>
        <p className="text-xl text-center mb-8">
          Identify and engage your top internal talent
        </p>
        <div className="flex justify-center">
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
} 