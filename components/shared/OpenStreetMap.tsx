'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import 'leaflet/dist/leaflet.css'

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const createNumberedIcon = (number: number) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">${number}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  })
}

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

function FitBounds({ activities }: { activities: Activity[] }) {
  const map = useMap()

  useEffect(() => {
    if (activities.length > 0) {
      const bounds = L.latLngBounds(
        activities.map(a => [a.coordinates.lat, a.coordinates.lng])
      )
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
    }
  }, [activities, map])

  return null
}

function MapContent({ 
  activities, 
  showItineraryNumbers 
}: { 
  activities: Activity[]
  showItineraryNumbers: boolean 
}) {
  const markers = useMemo(() => {
    return activities.map((activity, index) => (
      <Marker
        key={`marker-${activity.id}`}
        position={[activity.coordinates.lat, activity.coordinates.lng]}
        icon={showItineraryNumbers ? createNumberedIcon(index + 1) : icon}
      >
        <Popup>
          <div className="min-w-[200px]">
            {activity.image && (
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-24 object-cover rounded mb-2"
              />
            )}
            <h3 className="font-bold text-gray-900 mb-1">{activity.title}</h3>
            {activity.location && (
              <p className="text-sm text-gray-600 mb-1">{activity.location}</p>
            )}
            {activity.price && (
              <p className="text-lg font-bold text-ocean-600">${activity.price}</p>
            )}
          </div>
        </Popup>
      </Marker>
    ))
  }, [activities, showItineraryNumbers])

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
      {activities.length > 1 && <FitBounds activities={activities} />}
    </>
  )
}

export function OpenStreetMap({ 
  activities, 
  center, 
  zoom, 
  height = '400px',
  showItineraryNumbers = false 
}: OpenStreetMapProps) {
  if (typeof window === 'undefined') {
    return (
      <div 
        className="w-full bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-gray-600 font-semibold">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapContent 
          activities={activities} 
          showItineraryNumbers={showItineraryNumbers} 
        />
      </MapContainer>
      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md z-[1000]">
        <p className="text-xs text-gray-600">
          🗺️ <strong>OpenStreetMap</strong> - Free & Open Source
        </p>
      </div>
    </div>
  )
}

