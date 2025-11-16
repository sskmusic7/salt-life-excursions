'use client'

interface GoogleMapProps {
  activities: any[]
  center: { lat: number; lng: number }
  zoom: number
}

export function GoogleMap({ activities, center, zoom }: GoogleMapProps) {
  // This is a placeholder component
  // In production, you would integrate Google Maps JavaScript API
  // For now, showing a styled placeholder with activity markers

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg overflow-hidden">
      {/* Map Placeholder Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width=%2760%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%230891b2%27%20fill-opacity=%270.4%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button aria-label="Zoom in" className="bg-white p-2 rounded shadow-lg hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button aria-label="Zoom out" className="bg-white p-2 rounded shadow-lg hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* Activity Markers */}
      <div className="relative w-full h-full flex items-center justify-center">
        {activities.length === 0 ? (
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-600 font-semibold">Add activities to see them on the map</p>
            <p className="text-sm text-gray-500 mt-1">Interactive Google Maps will display here</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Simulated map with markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-md">
                <svg className="w-12 h-12 mx-auto text-ocean-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {activities.length} Activities Mapped
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Showing locations across Turks & Caicos
                </p>
                <div className="space-y-2 text-left">
                  {activities.slice(0, 3).map((activity, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 truncate">{activity.title}</span>
                    </div>
                  ))}
                  {activities.length > 3 && (
                    <p className="text-xs text-gray-500 pl-8">+{activities.length - 3} more...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Scattered marker positions for visual effect */}
            {activities.slice(0, 5).map((activity, i) => {
              const positions = [
                { left: '20%', top: '30%' },
                { left: '45%', top: '40%' },
                { left: '65%', top: '35%' },
                { left: '35%', top: '60%' },
                { left: '70%', top: '65%' },
              ]
              return (
                <div
                  key={activity.id}
                  className="absolute animate-bounce"
                  style={{ 
                    ...positions[i],
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s'
                  }}
                >
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center font-bold text-sm border-2 border-white">
                    {i + 1}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Google Maps Integration Note */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> Google Maps API integration ready - add API key in production
        </p>
      </div>
    </div>
  )
}

