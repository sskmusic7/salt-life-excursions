'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

interface Activity {
  id: number | string
  title: string
  location?: string
  coordinates: { lat: number; lng: number }
  price?: number
  image?: string
}

interface OpenStreetMapProps {
  activities: Activity[]
  center: { lat: number; lng: number }
  zoom: number
  height?: string
  showItineraryNumbers?: boolean
}

// Named export for backward compatibility
export function OpenStreetMap({ 
  activities, 
  center, 
  zoom, 
  height = '400px',
  showItineraryNumbers = false 
}: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [L, setL] = useState<any>(null)

  // Initialize Leaflet only on client side
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Dynamically import Leaflet
    import('leaflet').then((leaflet) => {
      setL(leaflet.default)
      setIsLoaded(true)
    }).catch(err => {
      console.error('Failed to load Leaflet:', err)
    })

    return () => {
      // Cleanup map on unmount
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (!L || !mapRef.current || leafletMapRef.current) return

    // Create map
    const map = L.map(mapRef.current).setView([center.lat, center.lng], zoom)
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    leafletMapRef.current = map

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [L, center.lat, center.lng, zoom])

  // Update markers when activities change
  useEffect(() => {
    if (!L || !leafletMapRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Default icon
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    // Add new markers
    activities.forEach((activity, index) => {
      if (!activity.coordinates) return

      let icon = defaultIcon
      
      // Create numbered icon for itinerary
      if (showItineraryNumbers) {
        icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">${index + 1}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18]
        })
      }

      const marker = L.marker([activity.coordinates.lat, activity.coordinates.lng], { icon })
        .addTo(leafletMapRef.current)

      // Create popup content
      let popupContent = `<div class="min-w-[200px]">`
      if (activity.image) {
        popupContent += `<img src="${activity.image}" alt="${activity.title}" class="w-full h-24 object-cover rounded mb-2" />`
      }
      popupContent += `<h3 class="font-bold text-gray-900 mb-1">${activity.title}</h3>`
      if (activity.location) {
        popupContent += `<p class="text-sm text-gray-600 mb-1">${activity.location}</p>`
      }
      if (activity.price) {
        popupContent += `<p class="text-lg font-bold text-ocean-600">$${activity.price}</p>`
      }
      popupContent += `</div>`

      marker.bindPopup(popupContent)
      markersRef.current.push(marker)
    })

    // Fit bounds if multiple activities
    if (activities.length > 1 && activities.every(a => a.coordinates)) {
      const bounds = L.latLngBounds(
        activities.map(a => [a.coordinates!.lat, a.coordinates!.lng])
      )
      leafletMapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
    }
  }, [L, activities, showItineraryNumbers])

  // Loading state
  if (!isLoaded) {
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

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md z-[1000]">
        <p className="text-xs text-gray-600">
          🗺️ <strong>OpenStreetMap</strong> - Free & Open Source
        </p>
      </div>
    </div>
  )
}

// Default export for dynamic import compatibility
export default OpenStreetMap
