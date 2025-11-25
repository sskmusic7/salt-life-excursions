'use client'

import { use } from 'react'
import Link from 'next/link'
import { Check, TrendingUp, Users, Clock, DollarSign, ArrowLeft, MapPin } from 'lucide-react'
import siteImagesConfig from '@/data/site-images-config.json'

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const packageId = parseInt(id)

  // Get package data (matching the structure from packages/page.tsx)
  const packageData = [
    {
      id: 1,
      name: 'Adventure Seeker',
      description: 'Perfect for thrill-seekers',
      originalPrice: 599,
      price: 449,
      savings: 150,
      guests: '2-4 guests',
      duration: 'Full Day',
      popular: false,
      activities: [
        'Jet Ski Adventure (2 hours)',
        'ATV Beach Tour',
        'Snorkeling Experience',
        'Beach BBQ Lunch',
        'GoPro Photos Included',
      ],
    },
    {
      id: 2,
      name: 'Luxury Escape',
      description: 'Ultimate VIP experience',
      originalPrice: 1299,
      price: 999,
      savings: 300,
      guests: 'Up to 6 guests',
      duration: '2 Days',
      popular: true,
      activities: [
        'Private Yacht Charter (4 hours)',
        'VIP Concierge Dining',
        'Luxury Chauffeur Service',
        'Spa Experience',
        'Private Beach Setup',
        'Champagne & Catering',
        'Professional Photography',
      ],
    },
    {
      id: 3,
      name: 'Family Fun Pack',
      description: 'Great for families',
      originalPrice: 799,
      price: 599,
      savings: 200,
      guests: '6+ guests',
      duration: 'Full Day',
      popular: false,
      activities: [
        'See-Through Kayak Tour',
        'Snorkeling for All Ages',
        'Beach Games & Activities',
        'Family Photo Session',
        'Island Picnic Lunch',
        'Kids Activity Pack',
      ],
    },
    {
      id: 4,
      name: 'Romantic Getaway',
      description: 'Perfect for couples',
      originalPrice: 899,
      price: 699,
      savings: 200,
      guests: '2 guests',
      duration: '2 Days',
      popular: true,
      activities: [
        'Sunset Yacht Cruise',
        'Couples Spa Treatment',
        'Private Beach Dinner',
        'Champagne & Roses',
        'Professional Photoshoot',
      ],
    },
    {
      id: 5,
      name: 'Island Explorer',
      description: 'Discover hidden gems',
      originalPrice: 699,
      price: 549,
      savings: 150,
      guests: '4-6 guests',
      duration: 'Full Day',
      popular: false,
      activities: [
        'Island Hopping Tour',
        'Guided Cultural Experience',
        'Local Cuisine Tasting',
        'Historical Sites Tour',
        'Souvenir Shopping',
      ],
    },
    {
      id: 6,
      name: 'Water Sports Combo',
      description: 'For water enthusiasts',
      originalPrice: 499,
      price: 379,
      savings: 120,
      guests: '2-4 guests',
      duration: 'Half Day',
      popular: false,
      activities: [
        'Jet Ski (1 hour)',
        'Parasailing',
        'Paddleboarding',
        'Snorkeling',
        'Beach Access',
      ],
    },
  ]

  const packageConfig = siteImagesConfig.packages.find(p => p.id === packageId)
  const pkg = packageData.find(p => p.id === packageId)

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The package you're looking for doesn't exist.</p>
            <Link href="/packages" className="text-ocean-600 hover:text-ocean-700 font-semibold">
              ← Back to Packages
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const packageImage = packageConfig?.image || 'https://images.unsplash.com/photo-1610484826922-3f84c2efcc89?q=80&w=2070'

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Image */}
      <div className="relative h-96 mb-12">
        <img
          src={packageImage}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 container-custom">
          <Link href="/packages" className="inline-flex items-center text-white mb-4 hover:text-ocean-200">
            <ArrowLeft size={20} className="mr-2" />
            Back to Packages
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{pkg.name}</h1>
          <p className="text-white/90 text-lg">{pkg.description}</p>
        </div>
      </div>

      <div className="container-custom pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Pricing */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-baseline space-x-4 mb-4">
                  <span className="text-5xl font-bold text-ocean-600">${pkg.price}</span>
                  <span className="text-2xl text-gray-500 line-through">${pkg.originalPrice}</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ${pkg.savings}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Users size={18} className="mr-2" />
                    <span>{pkg.guests}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                <button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-4 rounded-lg transition-colors">
                  Book This Package
                </button>
              </div>

              {/* Activities Included */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                <ul className="space-y-4">
                  {pkg.activities.map((activity, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package Details */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Details</h2>
                <div className="prose text-gray-700">
                  <p>
                    Experience the best of Turks & Caicos with our carefully curated {pkg.name.toLowerCase()} package. 
                    This {pkg.duration.toLowerCase()} adventure is designed to give you unforgettable memories and authentic 
                    island experiences.
                  </p>
                  <p>
                    All activities are led by certified, local guides who are passionate about sharing the beauty and 
                    culture of Turks & Caicos. Equipment, safety gear, and refreshments are included in your package.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Package Highlights</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-700">All activities included</span>
                  </div>
                  <div className="flex items-start">
                    <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-700">Professional guides</span>
                  </div>
                  <div className="flex items-start">
                    <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-700">Safety equipment provided</span>
                  </div>
                  <div className="flex items-start">
                    <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-700">Free cancellation up to 48h</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <div className="flex items-start">
                  <MapPin size={18} className="text-ocean-600 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-700">Turks & Caicos Islands</span>
                </div>
              </div>

              {pkg.popular && (
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl p-6 text-center">
                  <TrendingUp size={32} className="mx-auto mb-2" />
                  <p className="font-bold">Most Popular Package</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




