'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, MapPin, Clock, Users, Heart } from 'lucide-react'
import generatedExcursions from '@/data/generated-excursions.json'

export function FeaturedActivities() {
  // Use AI-generated excursions (take first 6)
  const reviewCounts = [128, 256, 342, 89, 167, 94] // Fixed review counts to avoid hydration mismatch
  const activities = generatedExcursions.slice(0, 6).map((exc: any, index: number) => ({
    id: exc.id,
    title: exc.title,
    provider: 'Salt Life Excursions',
    location: exc.location.area,
    price: exc.pricing.adult,
    duration: `${exc.duration.hours}${exc.duration.minutes ? `.${Math.floor(exc.duration.minutes / 6)}` : ''} hours`,
    capacity: `${exc.maxGroupSize} guests`,
    rating: 4.8,
    reviews: reviewCounts[index] || 100,
    image: exc.coverImage || exc.images[0]?.url,
    featured: true,
    category: exc.category,
    slug: exc.slug,
  }))

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
                <div className="absolute top-4 left-4">
                  <span className="bg-ocean-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{activity.rating}</span>
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
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-ocean-600" />
                      Up to {activity.capacity}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/activities/${activity.id}`}
                  className="block w-full text-center bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  View Details
                </Link>
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

