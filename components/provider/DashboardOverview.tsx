'use client'

import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  Star,
  Eye,
  Clock,
  CheckCircle,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function DashboardOverview() {
  const stats = [
    {
      label: 'Total Earnings',
      value: '$24,580',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign size={24} />,
      color: 'green',
    },
    {
      label: 'Active Bookings',
      value: '47',
      change: '+8',
      trend: 'up',
      icon: <Calendar size={24} />,
      color: 'blue',
    },
    {
      label: 'Total Guests',
      value: '356',
      change: '+23',
      trend: 'up',
      icon: <Users size={24} />,
      color: 'purple',
    },
    {
      label: 'Average Rating',
      value: '4.9',
      change: '+0.2',
      trend: 'up',
      icon: <Star size={24} />,
      color: 'yellow',
    },
  ]

  const recentBookings = [
    {
      id: 1,
      activity: 'Luxury Yacht Sunset Cruise',
      customer: 'Sarah Mitchell',
      date: '2025-11-05',
      time: '5:00 PM',
      guests: 8,
      amount: 3992,
      status: 'confirmed',
    },
    {
      id: 2,
      activity: 'Luxury Yacht Sunset Cruise',
      customer: 'James Rodriguez',
      date: '2025-11-08',
      time: '6:00 PM',
      guests: 6,
      amount: 2994,
      status: 'pending',
    },
    {
      id: 3,
      activity: 'Luxury Yacht Sunset Cruise',
      customer: 'Emily Chen',
      date: '2025-11-10',
      time: '5:30 PM',
      guests: 10,
      amount: 4990,
      status: 'confirmed',
    },
  ]

  const monthlyData = [
    { month: 'May', earnings: 18500, bookings: 32 },
    { month: 'Jun', earnings: 21300, bookings: 38 },
    { month: 'Jul', earnings: 24800, bookings: 45 },
    { month: 'Aug', earnings: 28200, bookings: 52 },
    { month: 'Sep', earnings: 26100, bookings: 48 },
    { month: 'Oct', earnings: 24580, bookings: 47 },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your listings.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600`}
              >
                {stat.icon}
              </div>
              <span className="text-green-600 text-sm font-semibold flex items-center">
                <TrendingUp size={16} className="mr-1" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Earnings Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" fill="#0891b2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 rounded-lg transition-colors">
              + Add New Listing
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Update Availability
            </button>
            <button className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors">
              View Analytics
            </button>
            <button className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors">
              Download Reports
            </button>
          </div>

          {/* Performance Metrics */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Eye size={16} className="text-ocean-600" />
                  <span>Profile Views</span>
                </div>
                <span className="font-bold text-gray-900">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock size={16} className="text-ocean-600" />
                  <span>Response Time</span>
                </div>
                <span className="font-bold text-gray-900">2.3 hrs</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-ocean-600" />
                  <span>Completion Rate</span>
                </div>
                <span className="font-bold text-gray-900">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          <button className="text-ocean-600 hover:text-ocean-700 font-semibold">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Activity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Guests</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{booking.activity}</td>
                  <td className="py-4 px-4">{booking.customer}</td>
                  <td className="py-4 px-4">
                    {booking.date} at {booking.time}
                  </td>
                  <td className="py-4 px-4">{booking.guests}</td>
                  <td className="py-4 px-4 font-bold">${booking.amount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}







