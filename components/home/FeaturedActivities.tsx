/**
 * Featured Activities Component
 * Displays activities from Viator API
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, MapPin, Clock, Users, Heart, Loader2 } from 'lucide-react'

interface ViatorProduct {
  productCode: string
  productName: string
  primaryDestinationName: string
  rating: number
  reviewCount: number
  duration: string
  images: Array<{ url: string; alt: string }>
  pricing: { from: number; currency: string }
  bookingLink: string
}

export function FeaturedActivities() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/viator/search?query=turks caicos&limit=6')
      const data = await response.json()
      
      if (data.success && data.products) {
        // Transform Viator products to activity format
        const transformed = data.products.map((product: ViatorProduct) => ({
          id: product.productCode,
          title: product.productName,
          provider: 'Verified Provider',
          location: product.primaryDestinationName,
          price: product.pricing.from,
          duration: product.duration,
          capacity: 'Varies',
          rating: product.rating || 4.5,
          reviews: product.reviewCount || 0,
          image: product.images[0]?.url || '',
          category: 'Activity',
          featured: true,
          slug: product.productCode,
          bookingLink: product.bookingLink,
        }))
        setActivities(transformed)
      }
    } catch (error) {
      console.error('Error fetching featured activities:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="section-padding bg-white/10 backdrop-blur-sm">
        <div className="container-custom">
          <div className="text-center py-20">
            <Loader2 className="animate-spin mx-auto text-ocean-600" size={48} />
            <p className="mt-4 text-gray-600">Loading featured experiences...</p>
          </div>
        </div>
      </section>
    )
  }

  if (activities.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-white/10 backdrop-blur-sm">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
          >
            Featured Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Handpicked adventures for an unforgettable island experience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <button 
                    aria-label="Add to wishlist"
                    className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Heart size={20} className="text-gray-700" />
                  </button>
                </div>
                {activity.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-ocean-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {activity.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{activity.rating.toFixed(1)}</span>
                    <span className="text-gray-600 text-sm">({activity.reviews})</span>
                  </div>
                  <div className="text-2xl font-bold text-ocean-600">
                    ${activity.price}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  by {activity.provider}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 text-ocean-600" />
                    {activity.location}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-ocean-600" />
                      {activity.duration}
                    </div>
                    {activity.capacity && (
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-ocean-600" />
                        {activity.capacity}
                      </div>
                    )}
                  </div>
                </div>

                {activity.bookingLink ? (
                  <a
                    href={activity.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Book Now
                  </a>
                ) : (
                  <Link
                    href={`/activities/${activity.id}`}
                    className="block w-full text-center bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/activities"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-lg transition-colors"
          >
            View All Activities
          </Link>
        </div>
      </div>
    </section>
  )
}
