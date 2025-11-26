'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, MapPin, Clock, Users, Heart } from 'lucide-react'

interface Activity {
  id: number | string // Can be productCode from Viator
  title: string
  provider: string
  location: string
  price: number
  duration: string
  capacity?: string // Optional for Viator products
  rating: number
  reviews: number
  image: string
  category?: string // Optional
  featured?: boolean // Optional
  bookingLink?: string // For Viator products
  productCode?: string // For Viator products
}

interface ActivityCardProps {
  activity: Activity
  viewMode: 'grid' | 'list'
  index: number
}

export function ActivityCard({ activity, viewMode, index }: ActivityCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-80 h-64 md:h-auto relative flex-shrink-0">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
              <Heart size={20} className="text-gray-700" />
            </button>
            {activity.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  {activity.category && (
                    <span className="bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {activity.category}
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{activity.rating}</span>
                    <span className="text-gray-600 text-sm">({activity.reviews})</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-600">by {activity.provider}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-ocean-600">${activity.price}</div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-ocean-600" />
                <span className="text-sm">{activity.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={18} className="mr-2 text-ocean-600" />
                <span className="text-sm">{activity.duration}</span>
              </div>
              {activity.capacity && (
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-2 text-ocean-600" />
                  <span className="text-sm">Up to {activity.capacity}</span>
                </div>
              )}
            </div>

            <Link
              href={`/activities/${activity.id}`}
              className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
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
          <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
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
        {activity.featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star size={18} className="text-yellow-400 fill-current" />
            <span className="font-bold text-gray-900">{activity.rating}</span>
            <span className="text-gray-600 text-sm">({activity.reviews})</span>
          </div>
          <div className="text-2xl font-bold text-ocean-600">${activity.price}</div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">
          {activity.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">by {activity.provider}</p>

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
                Up to {activity.capacity}
              </div>
            )}
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
  )
}







