'use client'

import { Save } from 'lucide-react'

export function CommissionSettings() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Commission Settings
        </h1>
        <p className="text-gray-600">Manage platform commission rates and payment settings</p>
      </div>

      {/* Global Commission Rate */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Global Commission Rate</h2>
        <div className="max-w-2xl">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Default Commission Percentage
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              defaultValue="30"
              min="0"
              max="100"
              className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
            <span className="text-gray-700">%</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This commission will be deducted from all bookings
          </p>
        </div>
      </div>

      {/* Category-Specific Rates */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Category-Specific Commission Rates
        </h2>
        <div className="space-y-4">
          {[
            { category: 'Yacht & Boat', rate: 30 },
            { category: 'Water Sports', rate: 25 },
            { category: 'ATV & Adventure', rate: 28 },
            { category: 'VIP Experiences', rate: 35 },
            { category: 'Dining & Food', rate: 30 },
          ].map((item) => (
            <div key={item.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-900">{item.category}</span>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  defaultValue={item.rate}
                  min="0"
                  max="100"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
                <span className="text-gray-700">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payout Schedule
            </label>
            <select className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent">
              <option>Bi-weekly (1st and 15th)</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Payout Amount
            </label>
            <div className="flex items-center space-x-4 max-w-md">
              <span className="text-gray-700">$</span>
              <input
                type="number"
                defaultValue="100"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
              />
              <span className="text-gray-700">
                Hold payouts until booking is completed
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-gray-300 text-ocean-600 focus:ring-ocean-500"
              />
              <span className="text-gray-700">
                Deduct commission automatically from bookings
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
          <Save size={20} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  )
}


