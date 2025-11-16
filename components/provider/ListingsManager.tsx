'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react'

export function ListingsManager() {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Luxury Yacht Sunset Cruise',
      category: 'Yacht',
      price: 499,
      duration: '3 hours',
      capacity: 12,
      status: 'active',
      views: 1247,
      bookings: 47,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=300',
    },
    {
      id: 2,
      title: 'Private Island Hopping',
      category: 'Tours',
      price: 899,
      duration: 'Full Day',
      capacity: 10,
      status: 'active',
      views: 892,
      bookings: 28,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=300',
    },
    {
      id: 3,
      title: 'Sunset Beach Dinner',
      category: 'Dining',
      price: 249,
      duration: '2 hours',
      capacity: 8,
      status: 'pending',
      views: 156,
      bookings: 0,
      rating: 0,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300',
    },
  ])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">My Listings</h1>
          <p className="text-gray-600">Manage your activities and experiences</p>
        </div>
        <button className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-6 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={20} />
          <span>Add New Listing</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Total Listings</p>
          <p className="text-3xl font-bold text-gray-900">{listings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Active</p>
          <p className="text-3xl font-bold text-green-600">
            {listings.filter((l) => l.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Pending Approval</p>
          <p className="text-3xl font-bold text-yellow-600">
            {listings.filter((l) => l.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-purple-600">
            {listings.reduce((sum, l) => sum + l.bookings, 0)}
          </p>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-64 h-48 md:h-auto relative flex-shrink-0">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      listing.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : listing.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h3>
                    <p className="text-gray-600">{listing.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-ocean-600">${listing.price}</p>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                </div>

                {/* Listing Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Duration</p>
                    <p className="font-semibold text-gray-900">{listing.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Capacity</p>
                    <p className="font-semibold text-gray-900">{listing.capacity} guests</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Views</p>
                    <p className="font-semibold text-gray-900">{listing.views}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Bookings</p>
                    <p className="font-semibold text-gray-900">{listing.bookings}</p>
                  </div>
                </div>

                {/* Rating */}
                {listing.rating > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="text-lg font-bold text-yellow-500">★ {listing.rating}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                    <Eye size={16} />
                    <span>Preview</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                    <EyeOff size={16} />
                    <span>Deactivate</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}







