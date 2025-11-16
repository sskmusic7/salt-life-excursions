'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, TrendingUp, Users, Clock } from 'lucide-react'

export default function PackagesPage() {
  const packages = [
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
      image: 'https://images.unsplash.com/photo-1610484826922-3f84c2efcc89?q=80&w=2070',
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
      image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b434b9?q=80&w=2070',
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
      image: 'https://images.unsplash.com/photo-1605733160314-4f3d462f9529?q=80&w=2070',
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
      image: 'https://images.unsplash.com/photo-1511295742362-c92ceddbd5fd?q=80&w=2070',
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
      image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2070',
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
      image: 'https://images.unsplash.com/photo-1626198304462-1a50a62ddb29?q=80&w=2070',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-ocean-gradient text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
              <TrendingUp size={20} />
              <span className="font-semibold">Save up to 30% with Package Deals</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Exclusive Package Deals
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Combine multiple experiences and save big on your island adventure
            </p>
          </motion.div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow ${
                pkg.popular ? 'ring-4 ring-ocean-500 transform scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-6 right-6 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  MOST POPULAR
                </div>
              )}

              {/* Image */}
              <div className="relative h-56">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-1">{pkg.name}</h3>
                  <p className="text-white/90">{pkg.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white p-6">
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-4xl font-bold text-ocean-600">${pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through">${pkg.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <Users size={16} className="mr-1" />
                        {pkg.guests}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {pkg.duration}
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      Save ${pkg.savings}
                    </span>
                  </div>
                </div>

                {/* Activities Included */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {pkg.activities.map((activity, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/packages/${pkg.id}`}
                  className={`block w-full text-center font-bold py-3 rounded-lg transition-all ${
                    pkg.popular
                      ? 'bg-ocean-gradient text-white hover:shadow-xl transform hover:scale-105'
                      : 'bg-ocean-600 hover:bg-ocean-700 text-white'
                  }`}
                >
                  Book This Package
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Packages */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Package Deals?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Save Money</h3>
              <p className="text-gray-600">
                Save up to 30% compared to booking activities individually
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Save Time</h3>
              <p className="text-gray-600">
                Everything pre-planned and coordinated for a hassle-free experience
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Best Experience</h3>
              <p className="text-gray-600">
                Curated combinations designed for maximum enjoyment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


