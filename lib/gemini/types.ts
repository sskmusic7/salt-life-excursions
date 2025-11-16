/**
 * Types for AI-generated excursion content
 */

export interface GeneratedExcursion {
  id: string
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  highlights: string[]
  included: string[]
  notIncluded: string[]
  whatToBring: string[]
  importantInfo: string[]
  itinerary: ItineraryItem[]
  duration: {
    hours: number
    minutes?: number
  }
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme'
  minAge: number
  maxGroupSize: number
  category: ExcursionCategory
  tags: string[]
  pricing: {
    adult: number
    child?: number
    infant?: number
    currency: string
  }
  availability: {
    daysOfWeek: string[]
    startTimes: string[]
    advanceBookingDays: number
  }
  location: {
    meetingPoint: string
    endPoint: string
    area: string
  }
  cancellationPolicy: string
  imageSearchTerms: string[]
}

export interface ItineraryItem {
  step: number
  time?: string
  location: string
  description: string
  duration?: number // minutes
}

export type ExcursionCategory =
  | 'Water Sports'
  | 'Adventure'
  | 'Relaxation'
  | 'Cultural'
  | 'Wildlife'
  | 'Luxury'
  | 'Family'
  | 'Romantic'
  | 'Party & Nightlife'
  | 'Dining'
  | 'Transportation'

export interface ExcursionGenerationRequest {
  activityType: string
  location: string
  targetAudience?: string
  priceRange?: 'budget' | 'mid-range' | 'luxury'
  duration?: 'short' | 'half-day' | 'full-day' | 'multi-day'
}

export interface BulkGenerationRequest {
  activities: string[]
  location: string
  count: number // How many variations of each activity
}


