'use client'

import { Search, MapPin, Calendar, Users } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Activity Search */}
      <div className="md:col-span-2 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search activities..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
        />
      </div>

      {/* Location */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent appearance-none">
          <option value="">All Locations</option>
          <option value="providenciales">Providenciales</option>
          <option value="grand-turk">Grand Turk</option>
          <option value="north-caicos">North Caicos</option>
          <option value="south-caicos">South Caicos</option>
        </select>
      </div>

      {/* Date */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="date"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
        />
      </div>

      {/* Search Button */}
      <button className="bg-ocean-600 hover:bg-ocean-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
        <Search size={20} />
        <span>Search</span>
      </button>
    </div>
  )
}







