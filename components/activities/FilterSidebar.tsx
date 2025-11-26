'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, DollarSign, Star, MapPin, Navigation } from 'lucide-react'

interface FilterSidebarProps {
  filters: any
  setFilters: (filters: any) => void
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    duration: true,
    rating: true,
    location: true,
    proximity: true,
    features: true,
  })

  const [proximitySearch, setProximitySearch] = useState({
    enabled: false,
    location: '',
    radius: 5, // miles
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  const categories = [
    'Water Sports',
    'Yacht & Boat',
    'ATV & Adventure',
    'Dining & Food',
    'VIP Experiences',
    'Nightlife',
    'Beach & Relax',
    'Transportation',
    'Tours',
    'Snorkeling & Diving',
  ]

  const locations = [
    'Providenciales',
    'Grace Bay',
    'Long Bay Beach',
    'Grand Turk',
    'North Caicos',
    'South Caicos',
    'Sapodilla Bay',
  ]

  const durations = ['< 1 hour', '1-2 hours', '2-4 hours', '4-8 hours', 'Full Day', 'Multi-Day']

  const features = [
    'Free Cancellation',
    'Instant Confirmation',
    'Hotel Pickup Included',
    'Family Friendly',
    'Private Tour Available',
    'Equipment Included',
    'Photo Package Available',
    'Refreshments Included',
    'Guide Included',
    'Suitable for Beginners',
  ]

  const handleGetUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProximitySearch({
            ...proximitySearch,
            enabled: true,
            location: `${position.coords.latitude}, ${position.coords.longitude}`,
          })
          alert('Location detected! Showing activities near you.')
        },
        (error) => {
          alert('Unable to get your location. Please enter manually.')
        }
      )
    }
  }

  const FilterSection = ({
    title,
    id,
    children,
  }: {
    title: string
    id: string
    children: React.ReactNode
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-bold text-gray-900">{title}</h3>
        {expandedSections[id as keyof typeof expandedSections] ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>
      {expandedSections[id as keyof typeof expandedSections] && (
        <div className="mt-3">{children}</div>
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-40">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button className="text-sm text-ocean-600 hover:text-ocean-700 font-medium">
          Clear All
        </button>
      </div>

      {/* Categories */}
      <FilterSection title="Category" id="category">
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" id="price">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}+</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            className="w-full"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [0, parseInt(e.target.value)],
              })
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Under $100
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              $100-$300
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              $300-$500
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              $500+
            </button>
          </div>
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Duration" id="duration">
        <div className="space-y-2">
          {durations.map((duration) => (
            <label key={duration} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
              />
              <span className="text-sm text-gray-700">{duration}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Minimum Rating" id="rating">
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                className="border-gray-300 text-ocean-600 focus:ring-ocean-500"
              />
              <div className="flex items-center">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-700">& up</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection title="Location" id="location">
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
              />
              <span className="text-sm text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Proximity Search */}
      <FilterSection title="Search by Proximity" id="proximity">
        <div className="space-y-4">
          <button
            onClick={handleGetUserLocation}
            className="w-full flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Navigation size={18} />
            <span>Use My Location</span>
          </button>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Enter address or landmark..."
              value={proximitySearch.location}
              onChange={(e) => setProximitySearch({ ...proximitySearch, location: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Radius: {proximitySearch.radius} miles
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={proximitySearch.radius}
              onChange={(e) => setProximitySearch({ ...proximitySearch, radius: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>1 mi</span>
              <span>20 mi</span>
            </div>
          </div>

          {proximitySearch.enabled && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="font-semibold text-blue-900 mb-1">
                📍 Searching within {proximitySearch.radius} miles
              </p>
              <p className="text-blue-700 text-xs">
                Showing activities near your selected location
              </p>
            </div>
          )}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features & Amenities" id="features">
        <div className="space-y-2">
          {features.map((feature) => (
            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Apply Button */}
      <button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
        Apply Filters
      </button>

      {/* Active Filters Summary */}
      {(filters.priceRange[1] < 1000 || filters.rating > 0 || filters.category?.length > 0 || filters.duration?.length > 0 || filters.location?.length > 0 || proximitySearch.enabled) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center bg-ocean-100 text-ocean-700 text-xs px-2 py-1 rounded">
              Price: ${filters.priceRange[0]}-${filters.priceRange[1]}
            </span>
            {proximitySearch.enabled && (
              <span className="inline-flex items-center bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                Within {proximitySearch.radius}mi
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

