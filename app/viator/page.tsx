/**
 * Viator Activities Page
 * Browse real activities from Viator API
 */

'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Clock, Users, Loader2 } from 'lucide-react'
import Image from 'next/image'

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

export default function ViatorPage() {
  const [products, setProducts] = useState<ViatorProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('turks caicos')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchViatorProducts()
  }, [])

  const fetchViatorProducts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/viator/search?query=${encodeURIComponent(searchTerm)}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      setProducts(data.products || [])
    } catch (err) {
      console.error('Error fetching Viator products:', err)
      setError(err instanceof Error ? err.message : 'Failed to load activities')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchViatorProducts()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-600/90 to-ocean-400/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=2070"
          alt="Viator Activities"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container-custom text-center text-white">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Viator Activities
          </h1>
          <p className="text-xl mb-8">
            Powered by the world's largest tours & activities platform
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for activities..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-ocean-500"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-8"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="animate-spin mx-auto mb-4 text-ocean-600" size={48} />
                <p className="text-gray-600">Loading amazing experiences...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-red-900 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={fetchViatorProducts}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">No activities found</p>
              <p className="text-gray-500">Try a different search term</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                  {products.length} Activities Available
                </h2>
                <p className="text-lg text-gray-600">
                  Real experiences from Viator's marketplace
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ViatorCard key={product.productCode} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function ViatorCard({ product }: { product: ViatorProduct }) {
  return (
    <div className="card overflow-hidden group hover:shadow-2xl transition-shadow">
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
            <span className="text-white text-4xl">🌴</span>
          </div>
        )}
        
        {/* Viator Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <span className="text-xs font-bold text-ocean-600">Powered by Viator</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <MapPin size={14} />
          <span>{product.primaryDestinationName}</span>
        </div>

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
            className="btn-primary"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  )
}




