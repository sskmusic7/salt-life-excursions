'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react'
import { ActivityCard } from '@/components/activities/ActivityCard'
import { FilterSidebar } from '@/components/activities/FilterSidebar'
import { SearchBar } from '@/components/activities/SearchBar'

export default function ActivitiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 1000],
    duration: [],
    capacity: [],
    rating: 0,
    location: [],
  })

  // Mock data - in production this would come from API
  const activities = [
    {
      id: 1,
      title: 'Luxury Yacht Sunset Cruise',
      provider: 'Ocean Elite Charters',
      location: 'Grace Bay, Providenciales',
      price: 499,
      duration: '3 hours',
      capacity: '12 guests',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1576169495465-bbbf3d4f4b3c?q=80&w=2070',
      category: 'Yacht',
      featured: true,
    },
    {
      id: 2,
      title: 'Jet Ski Island Adventure',
      provider: 'TCI Water Sports',
      location: 'Long Bay Beach',
      price: 129,
      duration: '1.5 hours',
      capacity: '2 guests',
      rating: 4.8,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1626198304462-1a50a62ddb29?q=80&w=2070',
      category: 'Water Sports',
      featured: true,
    },
    {
      id: 3,
      title: 'Snorkeling & Diving Experience',
      provider: 'Coral Reef Divers',
      location: "Smith's Reef",
      price: 89,
      duration: '2 hours',
      capacity: '8 guests',
      rating: 5.0,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1582738412028-8b5bff7f8273?q=80&w=2070',
      category: 'Snorkeling',
      featured: true,
    },
    {
      id: 4,
      title: 'ATV Beach & Trail Adventure',
      provider: 'Island ATV Tours',
      location: 'North Caicos',
      price: 159,
      duration: '2.5 hours',
      capacity: '6 guests',
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1619317211153-6a40f3cfd540?q=80&w=2070',
      category: 'ATV',
      featured: false,
    },
    {
      id: 5,
      title: 'See-Through Kayak Tour',
      provider: 'Crystal Waters Adventures',
      location: 'Sapodilla Bay',
      price: 75,
      duration: '1 hour',
      capacity: '4 guests',
      rating: 4.9,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2070',
      category: 'Water Sports',
      featured: false,
    },
    {
      id: 6,
      title: 'VIP Concierge Dining',
      provider: 'Salt Life Concierge',
      location: 'Various Locations',
      price: 299,
      duration: '3 hours',
      capacity: '10 guests',
      rating: 5.0,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1520201163981-8e0a1c6abbf9?q=80&w=2070',
      category: 'VIP',
      featured: false,
    },
    {
      id: 7,
      title: 'Private Beach Picnic',
      provider: 'Beach Bliss',
      location: 'Taylor Bay',
      price: 199,
      duration: '4 hours',
      capacity: '6 guests',
      rating: 4.8,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',
      category: 'Beach',
      featured: false,
    },
    {
      id: 8,
      title: 'Island Hopping Adventure',
      provider: 'Island Express',
      location: 'Multiple Islands',
      price: 349,
      duration: 'Full Day',
      capacity: '15 guests',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070',
      category: 'Tours',
      featured: true,
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
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Discover Amazing Activities
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore {activities.length}+ verified experiences in Turks & Caicos
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-md sticky top-20 z-40">
        <div className="container-custom py-4">
          <SearchBar />
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
                  Showing <span className="font-bold text-gray-900">{activities.length}</span> activities
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

            {/* Activities Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {activities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Load More Activities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




