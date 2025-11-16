/**
 * Viator Search Results Component
 * Displays search results from Viator API
 */

'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { useViatorProducts } from '@/lib/viator/hooks/useViatorProducts'
import { ViatorActivityCard } from './ViatorActivityCard'

interface ViatorSearchResultsProps {
  initialSearchTerm?: string
  destId?: number
  filters?: {
    tags?: string[]
    priceMin?: number
    priceMax?: number
  }
}

export function ViatorSearchResults({
  initialSearchTerm = '',
  destId,
  filters: initialFilters,
}: ViatorSearchResultsProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [searchInput, setSearchInput] = useState(initialSearchTerm)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState(initialFilters || {})

  const { products, loading, error, totalCount } = useViatorProducts({
    searchTerm,
    filters: {
      destId,
      ...filters,
      currency: 'USD',
    },
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchInput)
  }

  const clearFilters = () => {
    setFilters({})
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for activities..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-600"
              aria-label="Search for activities"
            />
          </div>
          <button
            type="submit"
            className="bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            aria-label="Toggle filters"
          >
            <Filter size={20} />
            Filters
          </button>
        </form>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              {Object.keys(filters).length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-ocean-600 hover:text-ocean-700 font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, priceMin: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax || ''}
                    onChange={(e) =>
                      setFilters({ ...filters, priceMax: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Add more filter options as needed */}
            </div>

            <button
              onClick={() => setSearchTerm(searchInput)} // Trigger re-search with new filters
              className="mt-4 w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {loading ? 'Searching...' : `${totalCount} Activities Found`}
        </h2>
        {searchTerm && (
          <p className="text-gray-600 mt-1">
            Results for &quot;{searchTerm}&quot;
          </p>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-semibold">Error loading activities</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-56 bg-gray-200"></div>
              <div className="p-5">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ViatorActivityCard key={product.productCode} product={product} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && products.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No activities found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  )
}


