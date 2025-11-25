'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              Shopping Cart
            </h1>
            <ShoppingCart size={32} className="text-ocean-600" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <ShoppingCart size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Add some amazing activities to your cart and start planning your perfect Turks & Caicos adventure!
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




