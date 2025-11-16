/**
 * Viator Showcase Component
 * Display real Viator activities on the homepage
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, MapPin, Clock, ArrowRight, Loader2, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface ViatorProduct {
  productCode: string
  productName: string
  primaryDestinationName: string
  rating: number
  reviewCount: number
  duration: string
  images: Array<{
    url: string
    alt: string
  }>
  pricing: {
    from: number
    currency: string
  }
  bookingLink: string
}

export function ViatorShowcase() {
  const [products, setProducts] = useState<ViatorProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchViatorProducts()
  }, [])

  const fetchViatorProducts = async () => {
    try {
      const response = await fetch('/api/viator/search?query=turks caicos')
      const data = await response.json()
      
      if (data.success && data.products) {
        // Take only first 6 products for homepage
        setProducts(data.products.slice(0, 6))
      }
    } catch (error) {
      console.error('Error fetching Viator products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-b from-white to-ocean-50">
        <div className="container-custom">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto text-ocean-600" size={48} />
            <p className="mt-4 text-gray-600">Loading experiences from Viator...</p>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null // Don't show section if no products
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white/10 to-ocean-50/10 backdrop-blur-sm">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-ocean-100 text-ocean-700 px-4 py-2 rounded-full mb-4">
              <ExternalLink size={18} />
              <span className="font-semibold">Powered by Viator</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Real Activities, Real Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse thousands of verified activities from the world's largest tours & experiences platform
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.productCode}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ViatorCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/viator"
            className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4"
          >
            Browse All Viator Activities
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ViatorCard({ product }: { product: ViatorProduct }) {
  return (
    <div className="card overflow-hidden group hover:shadow-2xl transition-all">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].alt || product.productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center">
            <span className="text-white text-5xl">🌴</span>
          </div>
        )}
        
        {/* Viator Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-bold text-ocean-600">By Viator</span>
        </div>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-2 text-white text-sm">
            <MapPin size={14} />
            <span>{product.primaryDestinationName}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-ocean-600 transition-colors">
          {product.productName}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>
        )}

        {/* Duration */}
        {product.duration && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Clock size={14} />
            <span>{product.duration}</span>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="text-2xl font-bold text-ocean-600">
              ${product.pricing.from}
            </p>
          </div>
          <a
            href={product.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-1"
          >
            Book Now
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

