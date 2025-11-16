/**
 * Protected Reviews Component
 * 
 * This component ensures review content is loaded dynamically via JavaScript
 * and never appears in the HTML source, preventing search engine indexing.
 * 
 * This is REQUIRED by Viator Partner API terms.
 */

'use client'

import { useEffect, useState } from 'react'
import { Star, ThumbsUp, User } from 'lucide-react'
import type { Review } from '@/lib/viator'

interface ProtectedReviewsProps {
  productCode: string
  pageSize?: number
}

export function ProtectedReviews({ productCode, pageSize = 10 }: ProtectedReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true)
      setError(null)

      try {
        // Load reviews via API route (which adds X-Robots-Tag header)
        const response = await fetch(
          `/api/viator/reviews/${productCode}?page=${currentPage}&pageSize=${pageSize}`
        )

        if (!response.ok) {
          throw new Error('Failed to load reviews')
        }

        const result = await response.json()
        
        if (result.success && result.data) {
          setReviews(result.data.reviews || [])
          setTotalCount(result.data.totalCount || 0)
          setAverageRating(result.data.averageRating || 0)
        } else {
          throw new Error(result.error || 'Failed to load reviews')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [productCode, currentPage, pageSize])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6 mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-semibold">Unable to load reviews</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <User size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 font-semibold">No reviews yet</p>
        <p className="text-sm text-gray-500">Be the first to review this experience!</p>
      </div>
    )
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="ml-2 text-gray-600">({totalCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.reviewId}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <p className="font-semibold text-gray-900">{review.travelerName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.publishedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-xs text-gray-500 uppercase">
                {review.provider}
              </div>
            </div>

            {/* Review Title */}
            {review.title && (
              <h4 className="font-bold text-gray-900 mb-2">{review.title}</h4>
            )}

            {/* Review Text */}
            <p className="text-gray-700 leading-relaxed mb-3">{review.text}</p>

            {/* Review Photos */}
            {review.photosInfo && review.photosInfo.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.photosInfo.slice(0, 3).map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.photoURL}
                    alt={photo.caption || 'Review photo'}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}

            {/* Helpful Votes */}
            <div className="flex items-center text-sm text-gray-600">
              <ThumbsUp size={14} className="mr-1" />
              <span>{review.helpfulVotes} people found this helpful</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}

      {/* SEO-friendly hidden text (for context, not reviews) */}
      <div className="sr-only">
        Customer reviews and ratings for this tour. Average rating: {averageRating.toFixed(1)} out of 5 stars based on {totalCount} reviews.
      </div>
    </div>
  )
}


