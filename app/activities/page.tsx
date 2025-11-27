/**
 * Activities Page - Search Engine for Viator Activities
 * All activities come from Viator API with infinite scroll
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Filter, SlidersHorizontal, Grid, List, Loader2, Search } from 'lucide-react'
import { ActivityCard } from '@/components/activities/ActivityCard'
import { FilterSidebar } from '@/components/activities/FilterSidebar'
import { useViatorActivities, type ViatorActivity } from '@/lib/hooks/useViatorActivities'

export default function ActivitiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('turks caicos')
  const [filters, setFilters] = useState<{
    category: string[]
    priceRange: number[]
    duration: string[]
    capacity: string[]
    rating: number
    location: string[]
  }>({
    category: [],
    priceRange: [0, 1000],
    duration: [],
    capacity: [],
    rating: 0,
    location: [],
  })

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm || 'turks caicos')
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Fetch activities from Viator API - loads 10 at a time on scroll
  const {
    activities,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refresh,
  } = useViatorActivities({
    searchTerm: debouncedSearch,
    limit: 10, // Load 10 at a time
    autoLoad: true,
  })

  // Filter activities client-side based on filters
  const filteredActivities = activities.filter((activity) => {
    // Price filter
    if (activity.price < filters.priceRange[0] || activity.price > filters.priceRange[1]) {
      return false
    }
    
    // Rating filter
    if (filters.rating > 0 && activity.rating < filters.rating) {
      return false
    }
    
    // Category filter (if we have categories)
    if (filters.category.length > 0 && activity.category) {
      if (!filters.category.includes(activity.category)) {
        return false
      }
    }
    
    return true
  })

  // Infinite scroll handler - load next 10 when near bottom
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near bottom (within 500px)
      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.offsetHeight
      
      if (scrollPosition >= documentHeight - 500) {
        if (hasMore && !loading) {
          loadMore()
        }
      }
    }

    // Throttle scroll events
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [hasMore, loading, loadMore])

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
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Discover Amazing Activities
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore {totalCount > 0 ? `${totalCount}+` : ''} verified experiences in Turks & Caicos
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-md sticky top-20 z-40">
        <div className="container-custom py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search activities..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          )}

          {/* Activities Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SlidersHorizontal size={20} />
                  <span className="font-medium">{showFilters ? 'Hide' : 'Show'} Filters</span>
                </button>
                <span className="text-gray-600">
                  Showing <span className="font-bold text-gray-900">{filteredActivities.length}</span> of {totalCount} activities
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  aria-label="Show grid view"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-ocean-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  aria-label="Show list view"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-ocean-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center mb-8">
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={refresh}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Activities Grid/List */}
            {filteredActivities.length > 0 ? (
              <>
                <div
                  className={`grid gap-6 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                  {filteredActivities.map((activity, index) => {
                    // Safely map activities with error handling
                    if (!activity || !activity.id) return null
                    return (
                      <ActivityCard
                        key={activity.id}
                        activity={{
                          id: activity.id,
                          title: activity.title || 'Untitled Activity',
                          provider: activity.provider || 'Provider',
                          location: activity.location || 'Location TBD',
                          price: activity.price || 0,
                          duration: activity.duration || 'Varies',
                          capacity: activity.capacity,
                          rating: activity.rating || 0,
                          reviews: activity.reviews || 0,
                          image: activity.image || '/placeholder-image.jpg',
                          category: activity.category,
                          featured: activity.featured,
                          bookingLink: activity.bookingLink,
                        } as any}
                        viewMode={viewMode}
                        index={index}
                      />
                    )
                  })}
                </div>

                {/* Loading More Indicator - only show if actually loading and has more */}
                {loading && hasMore && activities.length > 0 && (
                  <div className="text-center mt-12">
                    <Loader2 className="animate-spin mx-auto text-ocean-600" size={48} />
                    <p className="mt-4 text-gray-600">
                      Loading more activities... ({activities.length} of {totalCount} loaded)
                    </p>
                  </div>
                )}

                {/* Load More Button (fallback if scroll doesn't work) */}
                {hasMore && !loading && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMore}
                      className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                    >
                      Load More Activities
                    </button>
                  </div>
                )}

                {/* End of Results */}
                {!hasMore && filteredActivities.length > 0 && (
                  <div className="text-center mt-12">
                    <p className="text-gray-600">You've reached the end! All {totalCount} activities loaded.</p>
                  </div>
                )}
              </>
            ) : !loading ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-4">No activities found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="text-center py-20">
                <Loader2 className="animate-spin mx-auto text-ocean-600" size={48} />
                <p className="mt-4 text-gray-600">Loading activities...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
