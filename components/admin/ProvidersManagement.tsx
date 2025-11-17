'use client'

import { Check, X, Eye, Shield } from 'lucide-react'

export function ProvidersManagement() {
  const providers = [
    {
      id: 1,
      businessName: 'Ocean Elite Charters',
      contactPerson: 'John Smith',
      email: 'info@oceanelite.com',
      phone: '+1 (649) 555-1234',
      totalListings: 3,
      totalBookings: 156,
      totalEarnings: 45680,
      avgRating: 4.9,
      status: 'approved',
      verified: true,
      joinedDate: '2025-01-15',
    },
    {
      id: 2,
      businessName: 'Island ATV Tours',
      contactPerson: 'Maria Garcia',
      email: 'info@islandatv.com',
      phone: '+1 (649) 555-5678',
      totalListings: 2,
      totalBookings: 89,
      totalEarnings: 23450,
      avgRating: 4.7,
      status: 'approved',
      verified: true,
      joinedDate: '2025-02-22',
    },
    {
      id: 3,
      businessName: 'Tropical Adventures Co',
      contactPerson: 'David Johnson',
      email: 'contact@tropicaladv.com',
      phone: '+1 (649) 555-9012',
      totalListings: 1,
      totalBookings: 0,
      totalEarnings: 0,
      avgRating: 0,
      status: 'pending',
      verified: false,
      joinedDate: '2025-10-28',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Providers Management
        </h1>
        <p className="text-gray-600">Manage and approve activity providers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Total Providers</p>
          <p className="text-3xl font-bold text-gray-900">{providers.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">
            {providers.filter((p) => p.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Pending Approval</p>
          <p className="text-3xl font-bold text-yellow-600">
            {providers.filter((p) => p.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Verified</p>
          <p className="text-3xl font-bold text-blue-600">
            {providers.filter((p) => p.verified).length}
          </p>
        </div>
      </div>

      {/* Providers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Provider</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Stats</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Earnings</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">{provider.businessName}</p>
                        {provider.verified && (
                          <span title="Verified">
                            <Shield size={16} className="text-green-600" aria-label="Verified" />
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{provider.contactPerson}</p>
                      <p className="text-xs text-gray-500">Joined {provider.joinedDate}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-700">{provider.email}</p>
                    <p className="text-sm text-gray-600">{provider.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <p className="text-gray-700">
                        <span className="font-semibold">{provider.totalListings}</span> listings
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">{provider.totalBookings}</span> bookings
                      </p>
                      {provider.avgRating > 0 && (
                        <p className="text-yellow-600">★ {provider.avgRating}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900">
                      ${provider.totalEarnings.toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        provider.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : provider.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-ocean-100 hover:bg-ocean-200 text-ocean-700 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      {provider.status === 'pending' && (
                        <>
                          <button className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors">
                            <Check size={16} />
                          </button>
                          <button className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors">
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
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


