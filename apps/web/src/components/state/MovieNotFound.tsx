'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const MovieNotFound = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md text-center">
        <div className="text-gray-600 text-6xl mb-6">🎬</div>
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-xl mb-8">The movie you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button
          onClick={() => router.push('/')}
          className="border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 text-base group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Movies
        </Button>
      </div>
    </div>
  )
}