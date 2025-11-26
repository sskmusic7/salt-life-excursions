'use client'

import { useState, useEffect } from 'react'

interface Activity {
  id: number | string
  title: string
  location?: string
  coordinates: { lat: number; lng: number }
  price?: number
  image?: string
}

interface ClientOnlyMapProps {
  activities: Activity[]
  center: { lat: number; lng: number }
  zoom: number
  height?: string
  showItineraryNumbers?: boolean
}

// Loading placeholder
function MapPlaceholder({ height }: { height: string }) {
  return (
    <div 
      className="w-full bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading map...</p>
      </div>
    </div>
  )
}

export function ClientOnlyMap(props: ClientOnlyMapProps) {
  const [MapComponent, setMapComponent] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Dynamically import the map component only on the client side
    import('./OpenStreetMap')
      .then((mod) => {
        setMapComponent(() => mod.OpenStreetMap)
      })
      .catch((err) => {
        console.error('Failed to load map:', err)
      })
  }, [])

  const height = props.height || '400px'

  // Don't render anything on server
  if (!mounted) {
    return <MapPlaceholder height={height} />
  }

  // Show loading while component loads
  if (!MapComponent) {
    return <MapPlaceholder height={height} />
  }

  // Render the actual map
  return <MapComponent {...props} />
}

export default ClientOnlyMap

