'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              My Wishlist
            </h1>
            <Heart size={32} className="text-red-500 fill-current" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Heart size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Start saving your favorite activities and experiences. Click the heart icon on any activity to add it to your wishlist.
            </p>
            <Link 
              href="/activities"
              className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Activities
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}




