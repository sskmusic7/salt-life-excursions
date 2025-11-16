/**
 * Excursion Content Generator using Gemini AI
 * Generates realistic excursion descriptions, itineraries, and details
 */

import { getGeminiClient } from './client'
import type {
  GeneratedExcursion,
  ExcursionGenerationRequest,
  BulkGenerationRequest,
} from './types'

export class ExcursionGenerator {
  /**
   * Generate a single excursion
   */
  static async generateExcursion(
    request: ExcursionGenerationRequest
  ): Promise<GeneratedExcursion> {
    const client = getGeminiClient()

    const prompt = `Generate a detailed, realistic excursion for Turks & Caicos Islands.

Activity Type: ${request.activityType}
Location: ${request.location}
${request.targetAudience ? `Target Audience: ${request.targetAudience}` : ''}
${request.priceRange ? `Price Range: ${request.priceRange}` : ''}
${request.duration ? `Duration: ${request.duration}` : ''}

Generate a JSON object with the following structure:
{
  "title": "Catchy, descriptive title (50-80 characters)",
  "slug": "url-friendly-slug",
  "shortDescription": "Brief 1-2 sentence description (150-200 characters)",
  "fullDescription": "Detailed 3-4 paragraph description that sells the experience",
  "highlights": ["5-7 key highlights of the experience"],
  "included": ["List of what's included in the price"],
  "notIncluded": ["List of what's NOT included"],
  "whatToBring": ["Items customers should bring"],
  "importantInfo": ["Important notes, restrictions, requirements"],
  "itinerary": [
    {
      "step": 1,
      "time": "09:00 AM",
      "location": "Meeting point name",
      "description": "What happens at this step",
      "duration": 30
    }
  ],
  "duration": {
    "hours": 4,
    "minutes": 30
  },
  "difficulty": "Easy|Moderate|Challenging|Extreme",
  "minAge": 12,
  "maxGroupSize": 15,
  "category": "Water Sports|Adventure|Relaxation|Cultural|Wildlife|Luxury|Family|Romantic|Party & Nightlife|Dining|Transportation",
  "tags": ["relevant", "tags", "for", "searching"],
  "pricing": {
    "adult": 129,
    "child": 89,
    "infant": 0,
    "currency": "USD"
  },
  "availability": {
    "daysOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "startTimes": ["09:00", "14:00"],
    "advanceBookingDays": 1
  },
  "location": {
    "meetingPoint": "Specific meeting point address/description",
    "endPoint": "Where the tour ends",
    "area": "Grace Bay|Long Bay|North Caicos|Providenciales|Grand Turk"
  },
  "cancellationPolicy": "Free cancellation up to 24 hours before",
  "imageSearchTerms": ["search terms", "for finding", "relevant images"]
}

Make it sound exciting and authentic. Use realistic Turks & Caicos locations. Price appropriately for the market.`

    try {
      const result = await client.generateJSON<Omit<GeneratedExcursion, 'id'>>(prompt)
      
      // Add unique ID
      const id = `exc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      return {
        id,
        ...result,
      }
    } catch (error) {
      console.error('Failed to generate excursion:', error)
      throw error
    }
  }

  /**
   * Generate multiple excursions in bulk
   */
  static async generateBulk(
    request: BulkGenerationRequest
  ): Promise<GeneratedExcursion[]> {
    const excursions: GeneratedExcursion[] = []

    for (const activity of request.activities) {
      for (let i = 0; i < request.count; i++) {
        try {
          const excursion = await this.generateExcursion({
            activityType: activity,
            location: request.location,
          })
          excursions.push(excursion)
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000))
        } catch (error) {
          console.error(`Failed to generate ${activity} variation ${i + 1}:`, error)
        }
      }
    }

    return excursions
  }

  /**
   * Generate Turks & Caicos specific excursions
   */
  static async generateTurksAndCaicosExcursions(): Promise<GeneratedExcursion[]> {
    const activities = [
      'Jet Ski Adventure',
      'Snorkeling Tour',
      'Scuba Diving',
      'Yacht Charter',
      'Sunset Cruise',
      'Party Boat',
      'ATV Tour',
      'See-Through Kayak',
      'Beach Horseback Riding',
      'Island Hopping',
      'Fishing Charter',
      'Parasailing',
      'Stand-Up Paddleboarding',
      'Kiteboarding Lesson',
      'Private Beach Picnic',
      'Conch Diving Experience',
      'Mangrove Eco Tour',
      'Stargazing Experience',
      'Luxury Spa Day',
      'Rum Tasting Tour',
    ]

    console.log(`Generating ${activities.length} excursions for Turks & Caicos...`)

    return this.generateBulk({
      activities,
      location: 'Turks & Caicos Islands',
      count: 1,
    })
  }

  /**
   * Enhance existing excursion with AI-generated content
   */
  static async enhanceExcursion(
    partial: Partial<GeneratedExcursion>
  ): Promise<GeneratedExcursion> {
    const client = getGeminiClient()

    const prompt = `Enhance and complete this excursion description for Turks & Caicos:

${JSON.stringify(partial, null, 2)}

Fill in any missing fields and enhance the existing content. Return a complete JSON object following the GeneratedExcursion type structure. Make sure all required fields are present and the content is engaging and realistic.`

    const enhanced = await client.generateJSON<Omit<GeneratedExcursion, 'id'>>(prompt)

    return {
      id: partial.id || `exc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...enhanced,
    }
  }
}


