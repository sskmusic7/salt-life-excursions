/**
 * Generated Excursions Page
 * Displays all AI-generated excursions from Gemini
 */

import generatedExcursions from '@/data/generated-excursions.json'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Users, DollarSign } from 'lucide-react'

export default function ExcursionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean-600 to-ocean-400 text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-display font-bold mb-4">
            Our Excursions
          </h1>
          <p className="text-xl text-ocean-50 max-w-3xl">
            Discover {generatedExcursions.length} amazing adventures in Turks & Caicos,
            powered by AI-generated content with real images
          </p>
        </div>
      </div>

      {/* Excursions Grid */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {generatedExcursions.map((excursion) => (
            <ExcursionCard key={excursion.id} excursion={excursion} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ExcursionCard({ excursion }: { excursion: any }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image from Unsplash */}
      <div className="relative h-64 w-full">
        <Image
          src={excursion.coverImage || excursion.images[0]?.url}
          alt={excursion.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-ocean-600">{excursion.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {excursion.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {excursion.shortDescription}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={16} className="text-ocean-500" />
            <span>{excursion.duration.hours}h {excursion.duration.minutes || 0}m</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users size={16} className="text-ocean-500" />
            <span>Max {excursion.maxGroupSize}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <DollarSign size={16} className="text-ocean-500" />
            <span className="font-bold">${excursion.pricing.adult}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              excursion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              excursion.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
              excursion.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {excursion.difficulty}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {excursion.highlights.slice(0, 3).map((highlight: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-ocean-500 mt-1">•</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link
          href={`/excursions/${excursion.slug}`}
          className="block w-full bg-gradient-to-r from-ocean-600 to-ocean-400 hover:from-ocean-700 hover:to-ocean-500 text-white text-center font-semibold py-3 px-6 rounded-lg transition-all"
        >
          View Details
        </Link>
      </div>

      {/* Photo Credit */}
      {excursion.images[0]?.photographer && (
        <div className="px-6 pb-4 text-xs text-gray-500">
          Photo by {excursion.images[0].photographer}
        </div>
      )}
    </div>
  )
}

