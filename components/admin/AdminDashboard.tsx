'use client'

import { motion } from 'framer-motion'
import { DollarSign, Users, Calendar, TrendingUp, Activity, AlertCircle } from 'lucide-react'

export function AdminDashboard() {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$156,482',
      change: '+18.2%',
      icon: <DollarSign size={24} />,
      color: 'green',
    },
    {
      label: 'Commission Earned',
      value: '$46,945',
      change: '+15.8%',
      icon: <TrendingUp size={24} />,
      color: 'purple',
    },
    {
      label: 'Active Providers',
      value: '127',
      change: '+12',
      icon: <Users size={24} />,
      color: 'blue',
    },
    {
      label: 'Total Bookings',
      value: '1,847',
      change: '+234',
      icon: <Calendar size={24} />,
      color: 'orange',
    },
  ]

  const pendingActions = [
    { type: 'Provider Approval', count: 8, priority: 'high' },
    { type: 'Activity Review', count: 15, priority: 'medium' },
    { type: 'Booking Disputes', count: 3, priority: 'high' },
    { type: 'Document Verification', count: 12, priority: 'low' },
  ]

  const recentActivities = [
    {
      provider: 'Ocean Elite Charters',
      action: 'New listing submitted',
      activity: 'Luxury Yacht Sunset Cruise',
      time: '5 minutes ago',
    },
    {
      provider: 'Island ATV Tours',
      action: 'Booking completed',
      activity: 'ATV Beach Adventure',
      time: '23 minutes ago',
    },
    {
      provider: 'Coral Reef Divers',
      action: 'Provider profile updated',
      activity: '',
      time: '1 hour ago',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Welcome back! Here's your platform overview.</p>
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
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Actions */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2 text-orange-600" />
            Pending Actions
          </h2>
          <div className="space-y-3">
            {pendingActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900">{action.type}</p>
                  <p className="text-sm text-gray-600">{action.count} items</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    action.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : action.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {action.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Activity size={20} className="mr-2 text-ocean-600" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity size={18} className="text-ocean-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.provider}</p>
                  <p className="text-sm text-gray-600">{item.action}</p>
                  {item.activity && (
                    <p className="text-sm text-ocean-600">{item.activity}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


