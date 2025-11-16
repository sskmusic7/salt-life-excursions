'use client'

import { useState } from 'react'
import { Check, X, MessageCircle, Phone, Mail } from 'lucide-react'

export function BookingsManager() {
  const [filter, setFilter] = useState('all')

  const bookings = [
    {
      id: 1,
      bookingNumber: 'BK-2025-1001',
      activity: 'Luxury Yacht Sunset Cruise',
      customer: {
        name: 'Sarah Mitchell',
        email: 'sarah.m@email.com',
        phone: '+1 (555) 123-4567',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
      },
      date: '2025-11-05',
      time: '5:00 PM',
      guests: 8,
      amount: 3992,
      commission: 1197.6, // 30%
      netEarning: 2794.4,
      status: 'confirmed',
      createdAt: '2025-10-25',
    },
    {
      id: 2,
      bookingNumber: 'BK-2025-1002',
      activity: 'Luxury Yacht Sunset Cruise',
      customer: {
        name: 'James Rodriguez',
        email: 'james.r@email.com',
        phone: '+1 (555) 987-6543',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100',
      },
      date: '2025-11-08',
      time: '6:00 PM',
      guests: 6,
      amount: 2994,
      commission: 898.2,
      netEarning: 2095.8,
      status: 'pending',
      createdAt: '2025-10-26',
    },
    {
      id: 3,
      bookingNumber: 'BK-2025-1003',
      activity: 'Luxury Yacht Sunset Cruise',
      customer: {
        name: 'Emily Chen',
        email: 'emily.c@email.com',
        phone: '+1 (555) 456-7890',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
      },
      date: '2025-11-10',
      time: '5:30 PM',
      guests: 10,
      amount: 4990,
      commission: 1497,
      netEarning: 3493,
      status: 'confirmed',
      createdAt: '2025-10-27',
    },
    {
      id: 4,
      bookingNumber: 'BK-2025-0998',
      activity: 'Luxury Yacht Sunset Cruise',
      customer: {
        name: 'Michael Thompson',
        email: 'michael.t@email.com',
        phone: '+1 (555) 234-5678',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
      },
      date: '2025-10-30',
      time: '5:00 PM',
      guests: 12,
      amount: 5988,
      commission: 1796.4,
      netEarning: 4191.6,
      status: 'completed',
      createdAt: '2025-10-18',
    },
  ]

  const filteredBookings =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'confirmed':
        return 'bg-blue-100 text-blue-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Bookings</h1>
        <p className="text-gray-600">Manage and track all your bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-4 mb-8 border-b border-gray-200">
        {[
          { label: 'All Bookings', value: 'all' },
          { label: 'Pending', value: 'pending' },
          { label: 'Confirmed', value: 'confirmed' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`pb-4 px-2 font-semibold transition-colors border-b-2 ${
              filter === tab.value
                ? 'border-ocean-600 text-ocean-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.value !== 'all' && (
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                {bookings.filter((b) => b.status === tab.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{booking.activity}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Booking #{booking.bookingNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${booking.amount}</p>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xs text-green-600 mt-1">You earn: ${booking.netEarning}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={booking.customer.image}
                    alt={booking.customer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{booking.customer.name}</p>
                    <p className="text-sm text-gray-600">{booking.guests} guests</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={16} className="mr-2" />
                    {booking.customer.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone size={16} className="mr-2" />
                    {booking.customer.phone}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-900">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-gray-900">{booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-semibold text-gray-900">{booking.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booked On:</span>
                    <span className="font-semibold text-gray-900">{booking.createdAt}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Admin Commission (30%):</span>
                    <span className="font-semibold text-red-600">-${booking.commission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Earnings:</span>
                    <span className="font-semibold text-green-600">${booking.netEarning}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
              {booking.status === 'pending' && (
                <>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Check size={16} />
                    <span>Approve Booking</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    <X size={16} />
                    <span>Decline</span>
                  </button>
                </>
              )}
              <button className="flex items-center space-x-2 px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
                <MessageCircle size={16} />
                <span>Message Customer</span>
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}







