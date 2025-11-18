'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, TrendingUp } from 'lucide-react'
import siteImagesConfig from '@/data/site-images-config.json'

export function PackageDeals() {
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
  ]

  // Merge with images from config
  const packages = packageData.map((pkg) => {
    const configImage = siteImagesConfig.packages.find(p => p.id === pkg.id)
    return {
      ...pkg,
      image: configImage?.image || 'https://images.unsplash.com/photo-1610484826922-3f84c2efcc89?q=80&w=2070'
    }
  })

  return (
    <section className="section-padding bg-gradient-to-b from-white/10 to-ocean-50/10 backdrop-blur-sm">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4"
          >
            <TrendingUp size={20} />
            <span className="font-semibold">Save up to 30% with Package Deals</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
          >
            Exclusive Package Deals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Combine multiple experiences and save big on your island adventure
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative rounded-2xl overflow-hidden shadow-xl ${
                pkg.popular ? 'ring-4 ring-ocean-500 lg:scale-105' : ''
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
              <div className="bg-white/90 backdrop-blur-sm p-6">
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-4xl font-bold text-ocean-600">${pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through">${pkg.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{pkg.guests} • {pkg.duration}</span>
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

        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-block bg-transparent border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-600 hover:text-white font-bold py-4 px-8 rounded-lg transition-all"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  )
}




