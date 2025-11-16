'use client'

export function BookingsManagement() {
  const bookings = [
    {
      id: 1,
      bookingNumber: 'BK-2025-1005',
      customer: 'Sarah Mitchell',
      provider: 'Ocean Elite Charters',
      activity: 'Luxury Yacht Sunset Cruise',
      date: '2025-11-05',
      amount: 3992,
      commission: 1197.6,
      status: 'confirmed',
    },
    {
      id: 2,
      bookingNumber: 'BK-2025-1006',
      customer: 'James Rodriguez',
      provider: 'Island ATV Tours',
      activity: 'ATV Beach Adventure',
      date: '2025-11-08',
      amount: 954,
      commission: 286.2,
      status: 'completed',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Bookings Management
        </h1>
        <p className="text-gray-600">Monitor all platform bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900">1,847</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">This Month</p>
          <p className="text-3xl font-bold text-blue-600">234</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Commission Earned</p>
          <p className="text-3xl font-bold text-green-600">$46,945</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-600 text-sm mb-1">Avg Commission</p>
          <p className="text-3xl font-bold text-purple-600">30%</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Booking #</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Provider</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Activity</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Commission</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-ocean-600">
                    {booking.bookingNumber}
                  </td>
                  <td className="py-4 px-6">{booking.customer}</td>
                  <td className="py-4 px-6">{booking.provider}</td>
                  <td className="py-4 px-6">{booking.activity}</td>
                  <td className="py-4 px-6">{booking.date}</td>
                  <td className="py-4 px-6 font-bold">${booking.amount}</td>
                  <td className="py-4 px-6 font-bold text-green-600">+${booking.commission}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
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


