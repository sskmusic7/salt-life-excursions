'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const [searchData, setSearchData] = useState({
    activity: '',
    location: '',
    date: '',
    guests: '2',
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/90 via-primary-600/80 to-purple-600/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=2070"
          alt="Black family enjoying beach vacation in Turks & Caicos"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Wave Elements */}
      <div className="absolute bottom-0 left-0 right-0 z-20 opacity-20">
        <svg viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-30 container-custom text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6">
            Discover Paradise
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-display italic">
            Making Life Easier
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Experience the ultimate Turks & Caicos adventures. From thrilling water sports to luxury yacht experiences, 
            create unforgettable memories in paradise.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Activity Search */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What do you want to do?
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Jet ski, snorkeling..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  value={searchData.activity}
                  onChange={(e) => setSearchData({ ...searchData, activity: e.target.value })}
                />
              </div>
            </div>

            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent appearance-none"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  title="Select location"
                >
                  <option value="">All Islands</option>
                  <option value="providenciales">Providenciales</option>
                  <option value="grand-turk">Grand Turk</option>
                  <option value="north-caicos">North Caicos</option>
                  <option value="south-caicos">South Caicos</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                When
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  title="Select date"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent appearance-none"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                  title="Select number of guests"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6+">6+ Guests</option>
                </select>
              </div>
            </div>
          </div>

          <Link
            href="/activities"
            className="w-full mt-6 bg-ocean-gradient text-white font-bold py-4 px-8 rounded-lg text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 block text-center"
          >
            Search Adventures
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
        >
          {[
            { number: '50+', label: 'Activities' },
            { number: '100+', label: 'Trusted Providers' },
            { number: '10K+', label: 'Happy Guests' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

