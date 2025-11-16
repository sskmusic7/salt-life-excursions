'use client'

import dynamic from 'next/dynamic'
import { MapPin, Anchor, Waves, Palmtree } from 'lucide-react'

// Dynamically import OpenStreetMap (client-side only)
const OpenStreetMap = dynamic(
  () => import('@/components/shared/OpenStreetMap').then(mod => mod.OpenStreetMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading map...</p>
        </div>
      </div>
    )
  }
)

export function LocationShowcase() {
  const activities = [
    {
      id: 1,
      title: 'Luxury Yacht Sunset Cruise',
      location: 'Grace Bay, Providenciales',
      coordinates: { lat: 21.7907, lng: -72.2584 },
      price: 499,
      image: 'https://images.unsplash.com/photo-1576169495465-bbbf3d4f4b3c?q=80&w=300',
    },
    {
      id: 2,
      title: 'Jet Ski Island Adventure',
      location: 'Long Bay Beach',
      coordinates: { lat: 21.8028, lng: -72.2650 },
      price: 129,
      image: 'https://images.unsplash.com/photo-1626198304462-1a50a62ddb29?q=80&w=300',
    },
    {
      id: 3,
      title: 'Snorkeling & Diving',
      location: "Smith's Reef",
      coordinates: { lat: 21.7850, lng: -72.2400 },
      price: 89,
      image: 'https://images.unsplash.com/photo-1582738412028-8b5bff7f8273?q=80&w=300',
    },
    {
      id: 4,
      title: 'ATV Beach Adventure',
      location: 'North Caicos',
      coordinates: { lat: 21.9200, lng: -71.9500 },
      price: 159,
      image: 'https://images.unsplash.com/photo-1619317211153-6a40f3cfd540?q=80&w=300',
    },
    {
      id: 5,
      title: 'See-Through Kayak Tour',
      location: 'Sapodilla Bay',
      coordinates: { lat: 21.7500, lng: -72.2800 },
      price: 75,
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=300',
    },
  ]

  const regions = [
    {
      name: 'Grace Bay',
      description: 'World-famous beach with luxury experiences',
      icon: Palmtree,
      activityCount: 15,
      color: 'bg-blue-500',
    },
    {
      name: 'Long Bay',
      description: 'Perfect for water sports and adventures',
      icon: Waves,
      activityCount: 12,
      color: 'bg-teal-500',
    },
    {
      name: 'North Caicos',
      description: 'Remote island exploration and eco-tours',
      icon: MapPin,
      activityCount: 8,
      color: 'bg-green-500',
    },
    {
      name: 'Marina Areas',
      description: 'Yacht charters and sailing experiences',
      icon: Anchor,
      activityCount: 10,
      color: 'bg-purple-500',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white/10 to-gray-50/10 backdrop-blur-sm">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Explore Turks & Caicos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing excursions across the islands. From Grace Bay's pristine beaches to 
            North Caicos adventures, find your perfect activity.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-12">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Activity Locations</h3>
            <p className="text-gray-600">
              {activities.length} featured activities across Turks & Caicos
            </p>
          </div>
          <OpenStreetMap
            activities={activities}
            center={{ lat: 21.7907, lng: -72.2584 }}
            zoom={11}
            height="500px"
          />
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {regions.map((region, index) => {
            const Icon = region.icon
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-14 h-14 ${region.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{region.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{region.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ocean-600">
                    {region.activityCount} activities
                  </span>
                  <button className="text-ocean-600 hover:text-ocean-700 font-semibold text-sm">
                    Explore →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Featured Activity Cards */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular by Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="relative h-32">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold text-gray-900">
                    ${activity.price}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                    {activity.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin size={12} className="mr-1" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/activities"
            className="inline-block bg-ocean-600 hover:bg-ocean-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            View All Activities
          </a>
        </div>
      </div>
    </section>
  )
}

