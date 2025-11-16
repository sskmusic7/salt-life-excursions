'use client'

import { useState } from 'react'
import { Star, ThumbsUp, Flag } from 'lucide-react'
import { motion } from 'framer-motion'

interface Review {
  id: number
  userName: string
  userImage: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
  images?: string[]
}

interface ReviewSectionProps {
  activityId: number | string
  averageRating: number
  totalReviews: number
}

export function ReviewSection({ activityId, averageRating, totalReviews }: ReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      userName: 'Sarah Mitchell',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
      rating: 5,
      date: '2025-10-15',
      comment: 'Absolutely incredible experience! The crew was professional, the yacht was beautiful, and the sunset was breathtaking. We celebrated our anniversary and they made it extra special with champagne and decorations. Highly recommend!',
      helpful: 24,
      verified: true,
      images: [
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=200',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=200',
      ],
    },
    {
      id: 2,
      userName: 'James Rodriguez',
      userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100',
      rating: 5,
      date: '2025-10-10',
      comment: 'Best activity we did in Turks & Caicos! The guides were knowledgeable and made sure everyone was comfortable. Perfect for families!',
      helpful: 18,
      verified: true,
    },
    {
      id: 3,
      userName: 'Emily Chen',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
      rating: 4,
      date: '2025-10-05',
      comment: 'Really enjoyable experience. The only reason for 4 stars instead of 5 is that we wish it was a bit longer! Would definitely do it again.',
      helpful: 12,
      verified: true,
    },
    {
      id: 4,
      userName: 'Michael Thompson',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
      rating: 5,
      date: '2025-09-28',
      comment: 'Outstanding service from start to finish. The equipment was top-notch and the location was perfect. Can\'t wait to come back!',
      helpful: 9,
      verified: true,
    },
  ]

  const ratingDistribution = [
    { stars: 5, count: 95, percentage: 75 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 5, percentage: 4 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ]

  const submitReview = () => {
    console.log('Submitting review:', newReview)
    alert('Thank you for your review! It will be published after verification.')
    setShowReviewForm(false)
    setNewReview({ rating: 5, comment: '' })
  }

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
              <div className="text-6xl font-bold text-gray-900">{averageRating}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{totalReviews} reviews</p>
              </div>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Write a Review
            </button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-semibold text-gray-700">{dist.stars}</span>
                  <Star size={14} className="text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{dist.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Write Your Review</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Rating
            </label>
              <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  aria-label={`Rate ${star} stars`}
                  className="focus:outline-none"
                >
                  <Star
                    size={32}
                    className={star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                </button>
              ))}
              <span className="ml-4 text-lg font-semibold text-gray-900">
                {newReview.rating} star{newReview.rating !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              placeholder="Share your experience with others..."
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={submitReview}
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Submit Review
            </button>
            <button
              onClick={() => setShowReviewForm(false)}
              className="border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.userImage}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-gray-900">{review.userName}</h4>
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                  </div>
                  
                  <button aria-label="Report review" className="p-2 text-gray-400 hover:text-gray-600">
                    <Flag size={18} />
                  </button>
                </div>

                <p className="text-gray-700 mb-4">{review.comment}</p>

                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Review ${i + 1}`}
                        className="w-20 h-20 rounded object-cover cursor-pointer hover:opacity-75"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-ocean-600 transition-colors">
                    <ThumbsUp size={16} />
                    <span className="text-sm font-semibold">Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-50 font-bold py-3 px-8 rounded-lg transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  )
}

