'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Waves, 
  Bike, 
  Ship, 
  Utensils, 
  Sparkles, 
  Palmtree, 
  Music, 
  Car 
} from 'lucide-react'

export function Categories() {
  const categories = [
    {
      icon: <Waves size={32} />,
      name: 'Water Sports',
      count: '15 activities',
      color: 'from-blue-400 to-cyan-500',
      href: '/activities?category=water-sports',
    },
    {
      icon: <Ship size={32} />,
      name: 'Yacht & Boat',
      count: '8 experiences',
      color: 'from-indigo-400 to-blue-500',
      href: '/activities?category=yacht',
    },
    {
      icon: <Bike size={32} />,
      name: 'ATV & Adventure',
      count: '6 tours',
      color: 'from-orange-400 to-red-500',
      href: '/activities?category=atv',
    },
    {
      icon: <Utensils size={32} />,
      name: 'Dining & Food',
      count: '12 experiences',
      color: 'from-pink-400 to-rose-500',
      href: '/activities?category=dining',
    },
    {
      icon: <Sparkles size={32} />,
      name: 'VIP Experiences',
      count: '10 services',
      color: 'from-purple-400 to-pink-500',
      href: '/activities?category=vip',
    },
    {
      icon: <Music size={32} />,
      name: 'Nightlife',
      count: '7 venues',
      color: 'from-violet-400 to-purple-500',
      href: '/activities?category=nightlife',
    },
    {
      icon: <Palmtree size={32} />,
      name: 'Beach & Relax',
      count: '9 spots',
      color: 'from-teal-400 to-green-500',
      href: '/activities?category=beach',
    },
    {
      icon: <Car size={32} />,
      name: 'Transportation',
      count: '5 services',
      color: 'from-gray-400 to-slate-500',
      href: '/activities?category=transport',
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50/10 to-white/10 backdrop-blur-sm">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4"
          >
            Explore by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            From thrilling adventures to relaxing experiences, find your perfect activity
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={category.href}
                className="group block p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-100/50 hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">{category.count}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}




