/**
 * Activity Detail Page
 * Shows full details from Viator API - mirrors Viator's experience page
 */

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { 
  MapPin, Clock, Users, Star, 
  Shield, Heart, Share2, CheckCircle, AlertCircle, Loader2,
  ExternalLink
} from 'lucide-react'
import { ReviewSection } from '@/components/activities/ReviewSection'

// Dynamically import OpenStreetMap (client-side only)
const OpenStreetMap = dynamic(
  () => import('@/components/shared/OpenStreetMap').then(mod => mod.OpenStreetMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[350px] bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading map...</p>
        </div>
      </div>
    )
  }
)

interface ViatorProduct {
  productCode: string
  title: string
  description?: string
  images: Array<{ url: string; alt: string }>
  rating: number
  reviewCount: number
  location: string
  duration: string
  price: number
  currency: string
  bookingLink: string
  highlights?: any[]
  included?: any[]
  cancellationPolicy?: string
  tags?: any[]
}

export default function ActivityDetailPage() {
  const params = useParams()
  const productCode = params.id as string
  
  const [activity, setActivity] = useState<ViatorProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    fetchProductDetails()
  }, [productCode])

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch from Viator API
      const response = await fetch(`/api/viator/products/${productCode}?_t=${Date.now()}`)
      const data = await response.json()
      
      if (data.success && data.data) {
        const product = data.data
        
        // Transform Viator product to our format
        const transformed: ViatorProduct = {
          productCode: product.productCode || productCode,
          title: product.title || product.productName || 'Activity',
          description: product.description || product.productDescription || '',
          images: (product.images || product.photoGallery || []).map((img: any) => ({
            url: img.variants?.find((v: any) => v.width >= 800)?.url || 
                 img.variants?.[0]?.url || 
                 img.url || 
                 img.photoUrl || 
                 '',
            alt: img.caption || img.title || product.title || '',
          })).filter((img: any) => img.url), // Filter out empty URLs
          rating: product.rating || product.reviewRating || 0,
          reviewCount: product.reviewCount || product.totalReviews || 0,
          location: product.primaryDestinationName || 
                   product.destinations?.[0]?.destinationName || 
                   'Turks & Caicos',
          duration: typeof product.duration === 'string' 
            ? product.duration 
            : product.duration?.label || product.duration?.unstructuredDuration || 'Varies',
          price: product.fromPrice || product.pricing?.summary?.fromPrice || product.pricing?.price || 99,
          currency: product.currency || product.pricing?.currency || 'USD',
          bookingLink: product.productUrl || 
                      `https://www.viator.com/tours/Turks-and-Caicos/${productCode}`,
          highlights: product.highlights || [],
          included: product.included || [],
          cancellationPolicy: product.cancellationPolicy || 'Free cancellation up to 48 hours before the activity.',
          tags: product.tags || product.categories || [],
        }
        
        setActivity(transformed)
        if (transformed.images.length > 0) {
          setSelectedImage(transformed.images[0].url)
        }
      } else {
        throw new Error(data.error || 'Failed to load activity details')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activity')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto text-ocean-600" size={48} />
          <p className="mt-4 text-gray-600">Loading activity details...</p>
        </div>
      </div>
    )
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto text-red-500" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Activity Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'This activity could not be loaded.'}</p>
          <a
            href="/activities"
            className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Browse All Activities
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Image Gallery */}
      {activity.images.length > 0 && (
        <div className="bg-white">
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="relative h-96 lg:h-[600px] rounded-xl overflow-hidden">
                <img
                  src={selectedImage || activity.images[0].url}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    size={24}
                    className={isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}
                  />
                </button>
              </div>

              {/* Thumbnail Grid */}
              {activity.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {activity.images.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(img.url)}
                      className={`relative h-44 lg:h-[290px] rounded-xl overflow-hidden cursor-pointer hover:opacity-75 transition-opacity ${
                        selectedImage === img.url ? 'ring-4 ring-ocean-600' : ''
                      }`}
                    >
                      <img src={img.url} alt={img.alt || `${activity.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {activity.tags && activity.tags.length > 0 && (
                    <div className="flex items-center space-x-2 mb-2 flex-wrap">
                      {activity.tags.slice(0, 3).map((tag: any, i: number) => (
                        <span
                          key={i}
                          className="bg-ocean-100 text-ocean-700 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          {typeof tag === 'string' ? tag : String(tag)}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
                    {activity.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    {activity.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-current" size={20} />
                        <span className="font-bold text-gray-900">{activity.rating.toFixed(1)}</span>
                        <span>({activity.reviewCount} reviews)</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <MapPin size={18} />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
                <button aria-label="Share activity" className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Provider Info */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-ocean-600 rounded-full flex items-center justify-center text-white font-bold">
                    V
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Provided by</p>
                    <p className="font-bold text-gray-900">Verified Provider</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-sm font-semibold text-gray-700">Verified Provider</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-ocean-50 rounded-lg">
                  <Clock size={32} className="mx-auto text-ocean-600 mb-2" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-bold text-gray-900">{activity.duration}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Star size={32} className="mx-auto text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-bold text-gray-900">{activity.rating > 0 ? activity.rating.toFixed(1) : 'New'}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle size={32} className="mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-gray-600">Cancellation</p>
                  <p className="font-bold text-gray-900 text-xs">Free 48hr</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {activity.description && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Experience</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {activity.description}
                </div>
              </div>
            )}

            {/* Highlights */}
            {activity.highlights && activity.highlights.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activity.highlights.map((highlight: any, i: number) => (
                    <div key={i} className="flex items-start space-x-3">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{typeof highlight === 'string' ? highlight : String(highlight)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {activity.included && activity.included.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      Included
                    </h3>
                    <ul className="space-y-2">
                      {activity.included.map((item: any, i: number) => (
                        <li key={i} className="text-gray-700 ml-7">• {typeof item === 'string' ? item : String(item)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {activity.reviewCount > 0 && (
              <ReviewSection
                activityId={activity.productCode}
                averageRating={activity.rating}
                totalReviews={activity.reviewCount}
              />
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-4xl font-bold text-ocean-600">
                    {activity.currency === 'USD' ? '$' : activity.currency} {activity.price}
                  </span>
                  <span className="text-gray-600">per person</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Shield size={16} />
                  <span>Best price guarantee</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="booking-date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg p-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-gray-900">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(20, guests + 1))}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex items-center justify-between text-gray-700 mb-2">
                  <span>{activity.currency === 'USD' ? '$' : activity.currency}{activity.price} x {guests} guests</span>
                  <span>{activity.currency === 'USD' ? '$' : activity.currency}{activity.price * guests}</span>
                </div>
                <div className="flex items-center justify-between font-bold text-lg text-gray-900 mt-4">
                  <span>Total</span>
                  <span className="text-ocean-600">{activity.currency === 'USD' ? '$' : activity.currency}{activity.price * guests}</span>
                </div>
              </div>

              <a
                href={activity.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-4 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
              >
                Book Now on Viator
                <ExternalLink size={18} />
              </a>

              <div className="text-center text-sm text-gray-600 mb-4">
                <Shield size={16} className="inline mr-1" />
                {activity.cancellationPolicy}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900">Instant Confirmation</p>
                    <p className="text-green-700">Receive your booking confirmation immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
