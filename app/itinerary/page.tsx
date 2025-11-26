'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save, Share2, MapPin, DollarSign, Clock, Loader2 } from 'lucide-react'

// Dynamically import OpenStreetMap with proper loading state
const OpenStreetMap = dynamic(
  () => import('@/components/shared/OpenStreetMap').then(mod => ({ default: mod.OpenStreetMap })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading map...</p>
        </div>
      </div>
    )
  }
)

interface Activity {
  id: string
  title: string
  provider: string
  location: string
  coordinates: { lat: number; lng: number }
  price: number
  duration: string
  image: string
  bookingLink?: string
}

// Default coordinates for Turks & Caicos
const DEFAULT_CENTER = { lat: 21.7907, lng: -72.2584 }

export default function ItineraryBuilderPage() {
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([])
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({})
  const [itineraryName, setItineraryName] = useState('My Turks & Caicos Adventure')
  const [availableActivities, setAvailableActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [mapReady, setMapReady] = useState(false)

  // Set map ready after component mounts
  useEffect(() => {
    setMapReady(true)
  }, [])

  // Fetch activities from Viator API
  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/viator/search?query=turks caicos&page=1&limit=50')
      const data = await response.json()
      
      if (data.success && data.products) {
        const transformed = data.products
          .filter((product: any) => product?.productCode && product?.productName)
          .map((product: any): Activity => ({
            id: product.productCode,
            title: product.productName || 'Activity',
            provider: 'Verified Provider',
            location: product.primaryDestinationName || 'Turks & Caicos',
            coordinates: DEFAULT_CENTER,
            price: product.pricing?.from || 0,
            duration: product.duration || 'Varies',
            image: product.images?.[0]?.url || '',
            bookingLink: product.bookingLink,
          }))
        setAvailableActivities(transformed)
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const addActivity = (activity: Activity) => {
    if (!selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  const removeActivity = (id: string) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== id))
    const newNotes = { ...customNotes }
    delete newNotes[id]
    setCustomNotes(newNotes)
  }

  const updateNote = (id: string, note: string) => {
    setCustomNotes({ ...customNotes, [id]: note })
  }

  const calculateTotal = () => {
    return selectedActivities.reduce((sum, activity) => sum + (activity.price || 0), 0)
  }

  const saveItinerary = () => {
    const itinerary = {
      name: itineraryName,
      activities: selectedActivities,
      notes: customNotes,
      total: calculateTotal(),
      created: new Date().toISOString(),
    }
    localStorage.setItem('saved-itinerary', JSON.stringify(itinerary))
    alert('Itinerary saved successfully!')
  }

  const shareItinerary = () => {
    const shareText = `Check out my Turks & Caicos itinerary: ${itineraryName}\n\n${selectedActivities.map(a => `- ${a.title} ($${a.price})`).join('\n')}\n\nTotal: $${calculateTotal()}`
    
    if (navigator.share) {
      navigator.share({
        title: itineraryName,
        text: shareText,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Itinerary copied to clipboard!')
    }
  }

  // Prepare activities for map
  const mapActivities = selectedActivities.map((activity, index) => ({
    id: activity.id,
    title: activity.title,
    location: activity.location,
    coordinates: activity.coordinates,
    price: activity.price,
    image: activity.image,
  }))

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-ocean-gradient text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Build Your Perfect Itinerary
          </h1>
          <p className="text-xl text-white/90">
            Plan your Turks & Caicos adventure - select activities, add notes, and visualize your trip!
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Activities</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="animate-spin mx-auto text-ocean-600" size={32} />
                  <p className="mt-2 text-gray-600 text-sm">Loading activities...</p>
                </div>
              ) : availableActivities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No activities available</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {availableActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-2 border-gray-200 rounded-lg p-3 hover:border-ocean-500 transition-colors cursor-pointer"
                      onClick={() => addActivity(activity)}
                    >
                      <div className="flex items-center space-x-3">
                        {activity.image ? (
                          <img
                            src={activity.image}
                            alt={activity.title}
                            className="w-16 h-16 rounded object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                            <MapPin className="text-gray-400" size={24} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 truncate">{activity.title}</h3>
                          <p className="text-xs text-gray-600">{activity.provider}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-bold text-ocean-600">${activity.price}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                addActivity(activity)
                              }}
                              className="text-ocean-600 hover:text-ocean-700"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map and Selected Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Itinerary Map</h2>
              {mapReady ? (
                <OpenStreetMap
                  activities={mapActivities}
                  center={DEFAULT_CENTER}
                  zoom={11}
                  height="400px"
                  showItineraryNumbers={true}
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Loading map...</p>
                </div>
              )}
            </div>

            {/* Selected Activities List */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Itinerary ({selectedActivities.length} activities)
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={saveItinerary}
                    className="flex items-center gap-2 px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    onClick={shareItinerary}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>

              {selectedActivities.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600">No activities selected yet</p>
                  <p className="text-sm text-gray-500">Click on activities from the left to add them</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-2 border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-ocean-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        {activity.image ? (
                          <img
                            src={activity.image}
                            alt={activity.title}
                            className="w-24 h-24 rounded object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded bg-gray-200 flex items-center justify-center">
                            <MapPin className="text-gray-400" size={32} />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{activity.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{activity.provider}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {activity.location}
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {activity.duration}
                            </div>
                            <div className="flex items-center">
                              <DollarSign size={14} className="mr-1" />
                              ${activity.price}
                            </div>
                          </div>

                          <textarea
                            value={customNotes[activity.id] || ''}
                            onChange={(e) => updateNote(activity.id, e.target.value)}
                            placeholder="Add notes about this activity..."
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm mb-2"
                            rows={2}
                          />

                          <div className="flex items-center justify-between">
                            {activity.bookingLink ? (
                              <a
                                href={activity.bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ocean-600 hover:text-ocean-700 text-sm font-medium"
                              >
                                Book Now →
                              </a>
                            ) : (
                              <span className="text-sm text-gray-500">Ready to book</span>
                            )}
                            <button
                              onClick={() => removeActivity(activity.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Total Cost */}
                  <div className="bg-ocean-50 rounded-lg p-6 border-2 border-ocean-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600">Total Cost</p>
                        <p className="text-3xl font-bold text-ocean-600">${calculateTotal()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{selectedActivities.length} activities</p>
                        {selectedActivities.length > 0 && (
                          <p className="text-sm text-gray-500">
                            Average: ${Math.round(calculateTotal() / selectedActivities.length)} per activity
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
