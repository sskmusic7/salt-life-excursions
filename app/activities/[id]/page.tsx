'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { 
  MapPin, Clock, Users, Star, Calendar, DollarSign, 
  Shield, Award, Heart, Share2, CheckCircle, AlertCircle,
  Camera, Anchor, Waves
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

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [isLiked, setIsLiked] = useState(false)

  // Mock activity data
  const activity = {
    id: params.id,
    title: 'Luxury Yacht Sunset Cruise',
    provider: 'Ocean Elite Charters',
    providerLogo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=100',
    rating: 4.8,
    reviewCount: 126,
    location: 'Grace Bay, Providenciales',
    coordinates: { lat: 21.7907, lng: -72.2584 },
    price: 499,
    duration: '3 hours',
    groupSize: '2-10 guests',
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800',
    ],
    description: `Experience the magic of a Caribbean sunset aboard our luxurious 60-foot yacht. This premium cruise offers an unforgettable evening on the crystal-clear waters of Turks & Caicos, complete with champagne, gourmet appetizers, and breathtaking views.

Our experienced crew will navigate you through the most stunning coastal areas while you relax in comfort and style. Watch dolphins play in the wake, spot sea turtles, and witness the sky transform into a canvas of oranges, pinks, and purples as the sun sets over the horizon.

Perfect for special occasions, romantic getaways, or simply treating yourself to an extraordinary experience.`,
    highlights: [
      'Private yacht experience with professional crew',
      'Champagne and premium open bar included',
      'Gourmet appetizers and fresh fruit platters',
      'Snorkeling equipment and water toys provided',
      'Sunset photography opportunities',
      'Complimentary hotel pickup and drop-off',
      'Flexible itinerary customization available',
    ],
    included: [
      'All beverages (alcoholic & non-alcoholic)',
      'Food and snacks',
      'Snorkeling gear',
      'Life jackets',
      'Professional crew',
      'Hotel transfers',
      'Towels',
    ],
    notIncluded: [
      'Gratuity (recommended 15-20%)',
      'Personal expenses',
      'Travel insurance',
    ],
    whatToBring: [
      'Swimwear',
      'Sunscreen (reef-safe)',
      'Camera',
      'Light jacket for breeze',
      'Sunglasses',
    ],
    cancellationPolicy: 'Free cancellation up to 48 hours before the activity. Full refund guaranteed.',
    tags: ['Luxury', 'Sunset', 'Yacht', 'Romance', 'Photography', 'All-inclusive'],
  }

  const [selectedImage, setSelectedImage] = useState(activity.images[0])

  const handleBooking = () => {
    alert(`Booking ${activity.title} for ${guests} guests on ${selectedDate}. Total: $${activity.price * guests}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Image Gallery */}
      <div className="bg-white">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Main Image */}
            <div className="relative h-96 lg:h-[600px] rounded-xl overflow-hidden">
              <img
                src={selectedImage}
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
            <div className="grid grid-cols-2 gap-4">
              {activity.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-44 lg:h-[290px] rounded-xl overflow-hidden cursor-pointer hover:opacity-75 transition-opacity ${
                    selectedImage === img ? 'ring-4 ring-ocean-600' : ''
                  }`}
                >
                  <img src={img} alt={`${activity.title} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {activity.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-ocean-100 text-ocean-700 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
                    {activity.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={20} />
                      <span className="font-bold text-gray-900">{activity.rating}</span>
                      <span>({activity.reviewCount} reviews)</span>
                    </div>
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
                  <img
                    src={activity.providerLogo}
                    alt={activity.provider}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-600">Provided by</p>
                    <p className="font-bold text-gray-900">{activity.provider}</p>
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
                  <Users size={32} className="mx-auto text-purple-600 mb-2" />
                  <p className="text-sm text-gray-600">Group Size</p>
                  <p className="font-bold text-gray-900">{activity.groupSize}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Award size={32} className="mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-bold text-gray-900">Premium</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Experience</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {activity.description}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activity.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={20} />
                    Included
                  </h3>
                  <ul className="space-y-2">
                    {activity.included.map((item, i) => (
                      <li key={i} className="text-gray-700 ml-7">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="text-orange-500 mr-2" size={20} />
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {activity.notIncluded.map((item, i) => (
                      <li key={i} className="text-gray-700 ml-7">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <OpenStreetMap
                activities={[activity]}
                center={activity.coordinates}
                zoom={14}
                height="350px"
              />
              <div className="mt-4 flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <span>{activity.location}</span>
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewSection
              activityId={activity.id}
              averageRating={activity.rating}
              totalReviews={activity.reviewCount}
            />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-4xl font-bold text-ocean-600">${activity.price}</span>
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
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex items-center justify-between text-gray-700 mb-2">
                  <span>${activity.price} x {guests} guests</span>
                  <span>${activity.price * guests}</span>
                </div>
                <div className="flex items-center justify-between font-bold text-lg text-gray-900 mt-4">
                  <span>Total</span>
                  <span className="text-ocean-600">${activity.price * guests}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedDate}
                className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
              >
                {selectedDate ? 'Book Now' : 'Select a Date'}
              </button>

              <div className="text-center text-sm text-gray-600 mb-4">
                <Shield size={16} className="inline mr-1" />
                Free cancellation within 48 hours
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
