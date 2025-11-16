'use client'

import { Download } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export function AnalyticsReports() {
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 156 },
    { month: 'Feb', revenue: 52000, bookings: 178 },
    { month: 'Mar', revenue: 58000, bookings: 203 },
    { month: 'Apr', revenue: 61000, bookings: 221 },
    { month: 'May', revenue: 68000, bookings: 245 },
    { month: 'Jun', revenue: 72000, bookings: 267 },
  ]

  const categoryData = [
    { name: 'Yacht & Boat', value: 35, color: '#0891b2' },
    { name: 'Water Sports', value: 25, color: '#3b82f6' },
    { name: 'VIP Experiences', value: 20, color: '#8b5cf6' },
    { name: 'Dining', value: 12, color: '#ec4899' },
    { name: 'Others', value: 8, color: '#64748b' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Analytics & Reports
          </h1>
          <p className="text-gray-600">Platform performance and insights</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
          <Download size={20} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#0891b2" strokeWidth={2} name="Revenue ($)" />
            <Line type="monotone" dataKey="bookings" stroke="#8b5cf6" strokeWidth={2} name="Bookings" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Bookings by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Providers */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Providers</h2>
          <div className="space-y-4">
            {[
              { name: 'Ocean Elite Charters', earnings: 45680, bookings: 156 },
              { name: 'Island ATV Tours', earnings: 23450, bookings: 89 },
              { name: 'Coral Reef Divers', earnings: 18920, bookings: 134 },
              { name: 'Beach Bliss', earnings: 12340, bookings: 67 },
            ].map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{provider.name}</p>
                  <p className="text-sm text-gray-600">{provider.bookings} bookings</p>
                </div>
                <p className="text-lg font-bold text-green-600">${provider.earnings.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


