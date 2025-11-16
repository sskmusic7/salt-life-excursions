'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

export function CalendarManager() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10)) // November 2025

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Mock availability data
  const availability: Record<number, { available: boolean; bookings: number; capacity: number }> = {
    5: { available: true, bookings: 1, capacity: 2 },
    8: { available: true, bookings: 1, capacity: 2 },
    10: { available: true, bookings: 1, capacity: 2 },
    12: { available: true, bookings: 0, capacity: 2 },
    15: { available: true, bookings: 2, capacity: 2 },
    18: { available: false, bookings: 0, capacity: 2 },
    20: { available: true, bookings: 1, capacity: 2 },
    25: { available: true, bookings: 0, capacity: 2 },
    28: { available: true, bookings: 0, capacity: 2 },
  }

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    )
  }

  const getDayStatus = (day: number) => {
    const dayData = availability[day]
    if (!dayData) return 'default'
    if (!dayData.available) return 'blocked'
    if (dayData.bookings >= dayData.capacity) return 'full'
    if (dayData.bookings > 0) return 'partial'
    return 'available'
  }

  const getDayClass = (status: string) => {
    switch (status) {
      case 'blocked':
        return 'bg-gray-300 text-gray-500 cursor-not-allowed'
      case 'full':
        return 'bg-red-100 text-red-700 cursor-pointer hover:bg-red-200'
      case 'partial':
        return 'bg-yellow-100 text-yellow-700 cursor-pointer hover:bg-yellow-200'
      case 'available':
        return 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'
      default:
        return 'bg-white text-gray-900 cursor-pointer hover:bg-gray-50'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Availability Calendar
        </h1>
        <p className="text-gray-600">Manage your availability for all listings</p>
      </div>

      {/* Listing Selector */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Listing
        </label>
        <select className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent">
          <option>Luxury Yacht Sunset Cruise</option>
          <option>Private Island Hopping</option>
          <option>Sunset Beach Dinner</option>
        </select>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-gray-700">Partially Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-gray-700">Fully Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded"></div>
            <span className="text-gray-700">Blocked</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-700 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {[...Array(firstDayOfMonth)].map((_, i) => (
            <div key={`empty-${i}`} className="p-4"></div>
          ))}

          {/* Calendar days */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1
            const status = getDayStatus(day)
            const dayData = availability[day]

            return (
              <div
                key={day}
                className={`p-4 rounded-lg border-2 border-gray-200 text-center transition-all ${getDayClass(status)}`}
              >
                <div className="font-bold text-lg mb-1">{day}</div>
                {dayData && (
                  <div className="text-xs">
                    {dayData.bookings}/{dayData.capacity}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
              <Plus size={20} />
              <span>Add Available Dates</span>
            </button>
            <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              Block Multiple Dates
            </button>
            <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              Set Recurring Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}







