'use client'

import { Download, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function EarningsReport() {
  const earningsData = [
    { month: 'May', gross: 18500, commission: 5550, net: 12950 },
    { month: 'Jun', gross: 21300, commission: 6390, net: 14910 },
    { month: 'Jul', gross: 24800, commission: 7440, net: 17360 },
    { month: 'Aug', gross: 28200, commission: 8460, net: 19740 },
    { month: 'Sep', gross: 26100, commission: 7830, net: 18270 },
    { month: 'Oct', gross: 24580, commission: 7374, net: 17206 },
  ]

  const recentPayouts = [
    {
      id: 1,
      period: 'October 1-15, 2025',
      bookings: 23,
      gross: 12290,
      commission: 3687,
      net: 8603,
      status: 'paid',
      paidDate: '2025-10-20',
    },
    {
      id: 2,
      period: 'September 16-30, 2025',
      bookings: 24,
      gross: 13090,
      commission: 3927,
      net: 9163,
      status: 'paid',
      paidDate: '2025-10-05',
    },
    {
      id: 3,
      period: 'October 16-31, 2025',
      bookings: 25,
      gross: 12290,
      commission: 3687,
      net: 8603,
      status: 'pending',
      paidDate: null,
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Earnings & Payouts
          </h1>
          <p className="text-gray-600">Track your income and payment history</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
          <Download size={20} />
          <span>Download Report</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Total Earnings</p>
            <DollarSign size={20} className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$100,436</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp size={16} className="mr-1" />
            +18.2% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">This Month</p>
            <Calendar size={20} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$17,206</p>
          <p className="text-sm text-gray-600 mt-2">Net earnings</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Pending Payout</p>
            <DollarSign size={20} className="text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$8,603</p>
          <p className="text-sm text-gray-600 mt-2">Due Nov 5</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Avg Commission</p>
            <DollarSign size={20} className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">30%</p>
          <p className="text-sm text-gray-600 mt-2">Platform fee</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Earnings Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="gross"
              stroke="#9333ea"
              strokeWidth={2}
              name="Gross"
            />
            <Line
              type="monotone"
              dataKey="net"
              stroke="#0891b2"
              strokeWidth={2}
              name="Net Earnings"
            />
            <Line
              type="monotone"
              dataKey="commission"
              stroke="#ef4444"
              strokeWidth={2}
              name="Commission"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center space-x-8 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
            <span className="text-sm text-gray-600">Gross Earnings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-ocean-600 rounded"></div>
            <span className="text-sm text-gray-600">Net Earnings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-sm text-gray-600">Commission</span>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payout History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Period</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Bookings</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Gross</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Commission</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Net Payout</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayouts.map((payout) => (
                <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{payout.period}</td>
                  <td className="py-4 px-4">{payout.bookings}</td>
                  <td className="py-4 px-4 font-semibold">${payout.gross.toLocaleString()}</td>
                  <td className="py-4 px-4 text-red-600">-${payout.commission.toLocaleString()}</td>
                  <td className="py-4 px-4 font-bold text-green-600">
                    ${payout.net.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payout.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {payout.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4">{payout.paidDate || 'Scheduled'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-blue-50 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-blue-900 mb-2">Payment Schedule</h3>
        <p className="text-blue-700 text-sm">
          Payouts are processed bi-weekly (1st and 15th of each month). After a booking is completed, earnings will be included in the next scheduled payout. Commission rate: 30% per booking.
        </p>
      </div>
    </div>
  )
}







