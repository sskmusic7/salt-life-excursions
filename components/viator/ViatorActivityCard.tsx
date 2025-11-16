/**
 * Viator Activity Card Component
 * Displays a Viator product in a card format
 */

'use client'

import { Star, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import type { Product } from '@/lib/viator'
import { getBestImageUrl, getCoverImage, formatDuration } from '@/lib/viator/utils/helpers'

interface ViatorActivityCardProps {
  product: Product
  showDescription?: boolean
  className?: string
}

export function ViatorActivityCard({
  product,
  showDescription = false,
  className = '',
}: ViatorActivityCardProps) {
  const coverImage = getCoverImage(product.images)
  const imageUrl = coverImage ? getBestImageUrl(coverImage, 400) : '/placeholder-activity.jpg'

  const rating = product.reviewsInfo?.combinedAverageRating || 0
  const reviewCount = product.reviewsInfo?.totalReviews || 0
  const duration = formatDuration(product.duration)

  // Get primary location (simplified - in real app, resolve via /locations/bulk)
  const locationName = product.locations[0]?.ref || 'Turks & Caicos'

  return (
    <Link
      href={`/activities/${product.productCode}`}
      className={`group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badge for special offers (if applicable) */}
        {/* You could check for special pricing here */}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-ocean-600 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Description (optional) */}
        {showDescription && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{duration}</span>
          </div>
          {/* Location would need to be resolved */}
        </div>

        {/* Footer: Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">From</p>
            <p className="text-2xl font-bold text-ocean-600">
              {/* Price would come from availability data */}
              <span className="text-lg">$</span>--
            </p>
          </div>
          <button className="bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
            View Details
          </button>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-3 text-xs text-gray-500">
          {product.cancellationPolicy.type === 'STANDARD' && (
            <span>✓ Free cancellation up to 24 hours before</span>
          )}
          {product.cancellationPolicy.type === 'ALL_SALES_FINAL' && (
            <span>⚠ Non-refundable</span>
          )}
        </div>
      </div>
    </Link>
  )
}


