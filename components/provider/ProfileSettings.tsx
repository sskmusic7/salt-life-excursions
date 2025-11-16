'use client'

import { Save, Upload } from 'lucide-react'

export function ProfileSettings() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your provider profile and business information</p>
      </div>

      {/* Profile Photo */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Photo</h2>
        <div className="flex items-center space-x-6">
          <img
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=200"
            alt="Business"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
              <Upload size={16} />
              <span>Upload New Photo</span>
            </button>
            <p className="text-sm text-gray-600 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              defaultValue="Ocean Elite Charters"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Person
            </label>
            <input
              type="text"
              defaultValue="John Smith"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              defaultValue="info@oceanelite.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              defaultValue="+1 (649) 555-1234"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Address
            </label>
            <input
              type="text"
              defaultValue="Grace Bay, Providenciales, Turks & Caicos"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              rows={4}
              defaultValue="Premium yacht charter service offering luxury sunset cruises and private island tours."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Documents & Verification */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Documents & Verification</h2>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Business License</p>
            <button className="text-sm text-ocean-600 hover:text-ocean-700 font-semibold">
              Upload Document
            </button>
            <p className="text-xs text-green-600 mt-2">✓ Verified</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Insurance Certificate</p>
            <button className="text-sm text-ocean-600 hover:text-ocean-700 font-semibold">
              Upload Document
            </button>
            <p className="text-xs text-green-600 mt-2">✓ Verified</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Tax ID / Business Registration</p>
            <button className="text-sm text-ocean-600 hover:text-ocean-700 font-semibold">
              Upload Document
            </button>
            <p className="text-xs text-yellow-600 mt-2">⏳ Pending Review</p>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bank Name *
            </label>
            <input
              type="text"
              placeholder="Enter bank name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Holder Name *
            </label>
            <input
              type="text"
              placeholder="Enter account holder name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Number *
            </label>
            <input
              type="text"
              placeholder="Enter account number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Routing Number
            </label>
            <input
              type="text"
              placeholder="Enter routing number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SWIFT/BIC</label>
            <input
              type="text"
              placeholder="Enter SWIFT/BIC code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
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
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  )
}







