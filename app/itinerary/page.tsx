'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save, Share2, MapPin, DollarSign, Clock, Download } from 'lucide-react'

// Dynamically import OpenStreetMap (client-side only)
const OpenStreetMap = dynamic(
  () => import('@/components/shared/OpenStreetMap').then(mod => mod.OpenStreetMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading map...</p>
        </div>
      </div>
    )
  }
)

export default function ItineraryBuilderPage() {
  const [selectedActivities, setSelectedActivities] = useState<any[]>([])
  const [customNotes, setCustomNotes] = useState<Record<number, string>>({})
  const [itineraryName, setItineraryName] = useState('My Turks & Caicos Adventure')

  // Available activities with coordinates
  const availableActivities = [
    {
      id: 1,
      title: 'Luxury Yacht Sunset Cruise',
      provider: 'Ocean Elite Charters',
      location: 'Grace Bay, Providenciales',
      coordinates: { lat: 21.7907, lng: -72.2584 },
      price: 499,
      duration: '3 hours',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=300',
    },
    {
      id: 2,
      title: 'Jet Ski Island Adventure',
      provider: 'TCI Water Sports',
      location: 'Long Bay Beach',
      coordinates: { lat: 21.8028, lng: -72.2650 },
      price: 129,
      duration: '1.5 hours',
      image: 'https://images.unsplash.com/photo-1626297753255-e6f29d39dece?q=80&w=300',
    },
    {
      id: 3,
      title: 'Snorkeling & Diving Experience',
      provider: 'Coral Reef Divers',
      location: "Smith's Reef",
      coordinates: { lat: 21.7850, lng: -72.2400 },
      price: 89,
      duration: '2 hours',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=300',
    },
    {
      id: 4,
      title: 'ATV Beach & Trail Adventure',
      provider: 'Island ATV Tours',
      location: 'North Caicos',
      coordinates: { lat: 21.9200, lng: -71.9500 },
      price: 159,
      duration: '2.5 hours',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=300',
    },
    {
      id: 5,
      title: 'See-Through Kayak Tour',
      provider: 'Crystal Waters Adventures',
      location: 'Sapodilla Bay',
      coordinates: { lat: 21.7500, lng: -72.2800 },
      price: 75,
      duration: '1 hour',
      image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=300',
    },
    {
      id: 6,
      title: 'VIP Concierge Dining',
      provider: 'Salt Life Concierge',
      location: 'Grace Bay',
      coordinates: { lat: 21.7900, lng: -72.2600 },
      price: 299,
      duration: '3 hours',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300',
    },
  ]

  const addActivity = (activity: any) => {
    if (!selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  const removeActivity = (id: number) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== id))
    const newNotes = { ...customNotes }
    delete newNotes[id]
    setCustomNotes(newNotes)
  }

  const updateNote = (id: number, note: string) => {
    setCustomNotes({ ...customNotes, [id]: note })
  }

  const calculateTotal = () => {
    return selectedActivities.reduce((sum, activity) => sum + activity.price, 0)
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
    const shareUrl = `${window.location.origin}/itinerary/share?activities=${selectedActivities.map(a => a.id).join(',')}`
    navigator.clipboard.writeText(shareUrl)
    alert('Itinerary link copied to clipboard!')
  }

  const downloadPDF = () => {
    alert('PDF download functionality - Would integrate with jsPDF library in production')
  }

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
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {availableActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-2 border-gray-200 rounded-lg p-3 hover:border-ocean-500 transition-colors cursor-pointer"
                    onClick={() => addActivity(activity)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900">{activity.title}</h3>
                        <p className="text-xs text-gray-600">{activity.provider}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-bold text-ocean-600">${activity.price}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              addActivity(activity)
                            }}
                            aria-label={`Add ${activity.title} to itinerary`}
                            className="text-xs bg-ocean-100 text-ocean-700 px-2 py-1 rounded hover:bg-ocean-200"
                          >
                            <Plus size={12} className="inline" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Activities & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Itinerary Name */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <input
                type="text"
                value={itineraryName}
                onChange={(e) => setItineraryName(e.target.value)}
                className="text-3xl font-bold text-gray-900 w-full border-0 focus:ring-0 p-0"
                placeholder="Name your itinerary..."
              />
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Activities Map</h2>
              <p className="text-sm text-gray-600 mb-4">
                {selectedActivities.length > 0 
                  ? `Showing ${selectedActivities.length} activities on the map` 
                  : 'Add activities to see them on the map'}
              </p>
              <OpenStreetMap
                activities={selectedActivities}
                center={{ lat: 21.7907, lng: -72.2584 }}
                zoom={11}
                height="450px"
                showItineraryNumbers={true}
              />
            </div>

            {/* Selected Activities List */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Itinerary ({selectedActivities.length} activities)
              </h2>

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
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-24 h-24 rounded object-cover"
                        />
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
                            placeholder="Add custom notes for this activity..."
                            value={customNotes[activity.id] || ''}
                            onChange={(e) => updateNote(activity.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            rows={2}
                          />
                        </div>
                        <button
                          onClick={() => removeActivity(activity.id)}
                          aria-label={`Remove ${activity.title} from itinerary`}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary & Actions */}
            {selectedActivities.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Total Cost</h3>
                    <p className="text-sm text-gray-600">{selectedActivities.length} activities selected</p>
                  </div>
                  <div className="text-4xl font-bold text-ocean-600">
                    ${calculateTotal()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={saveItinerary}
                    className="flex items-center justify-center space-x-2 bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    <Save size={20} />
                    <span>Save Itinerary</span>
                  </button>
                  <button
                    onClick={shareItinerary}
                    className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="flex items-center justify-center space-x-2 border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-50 font-bold py-3 rounded-lg transition-colors"
                  >
                    <Download size={20} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

