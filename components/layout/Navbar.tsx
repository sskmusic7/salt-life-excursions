'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, Heart, ShoppingCart, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState('EN')

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Activities', href: '/activities' },
    { name: 'Package Deals', href: '/packages' },
    { name: 'Itinerary Builder', href: '/itinerary' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Salt Life Logo"
              className="h-16 w-16 transform group-hover:scale-110 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ocean-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-ocean-600">
              <Globe size={20} />
              <span className="text-sm font-medium">{language}</span>
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-gray-700 hover:text-ocean-600 relative">
              <Heart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-700 hover:text-ocean-600 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-ocean-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Account */}
            <Link
              href="/login"
              className="flex items-center space-x-2 bg-ocean-600 hover:bg-ocean-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <User size={20} />
              <span>Sign In</span>
            </Link>

            {/* Provider Portal */}
            <Link
              href="/provider"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Provider Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-ocean-600"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container-custom py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-ocean-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center bg-ocean-600 text-white px-4 py-3 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/provider"
                  className="block w-full text-center bg-purple-600 text-white px-4 py-3 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Provider Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

