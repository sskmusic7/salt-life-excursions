'use client'

import { Check, X, Eye } from 'lucide-react'

export function ActivitiesApproval() {
  const activities = [
    {
      id: 1,
      title: 'Sunset Beach Dinner',
      provider: 'Ocean Elite Charters',
      category: 'Dining',
      price: 249,
      status: 'pending',
      submittedDate: '2025-10-28',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=200',
    },
    {
      id: 2,
      title: 'Private Island Hopping',
      provider: 'Island Express',
      category: 'Tours',
      price: 899,
      status: 'pending',
      submittedDate: '2025-10-27',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=200',
    },
    {
      id: 3,
      title: 'Scuba Diving Adventure',
      provider: 'Coral Reef Divers',
      category: 'Water Sports',
      price: 189,
      status: 'approved',
      submittedDate: '2025-10-25',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=200',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Activities Approval
        </h1>
        <p className="text-gray-600">Review and approve new activity listings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-600">
            {activities.filter((a) => a.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">
            {activities.filter((a) => a.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Total Activities</p>
          <p className="text-3xl font-bold text-gray-900">{activities.length}</p>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-48 h-48 md:h-auto relative flex-shrink-0">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : activity.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600">by {activity.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-ocean-600">${activity.price}</p>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Category</p>
                    <p className="font-semibold text-gray-900">{activity.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Submitted</p>
                    <p className="font-semibold text-gray-900">{activity.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Provider</p>
                    <p className="font-semibold text-gray-900">{activity.provider}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-ocean-600 hover:bg-ocean-700 text-white rounded-lg transition-colors">
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  {activity.status === 'pending' && (
                    <>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <Check size={16} />
                        <span>Approve</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        <X size={16} />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


