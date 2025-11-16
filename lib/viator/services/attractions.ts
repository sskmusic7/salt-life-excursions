/**
 * Viator Attractions Service
 * Handles attraction search and details
 */

import { getViatorClient } from '../client'
import type { Attraction, AttractionSearchRequest } from '../types'

export class ViatorAttractionService {
  /**
   * Search for attractions
   * Endpoint: POST /attractions/search
   */
  static async searchAttractions(
    request: AttractionSearchRequest,
    language?: string
  ): Promise<{
    attractions: Attraction[]
    totalCount: number
  }> {
    const client = getViatorClient()
    return client.post('/partner/attractions/search', request, { language })
  }

  /**
   * Get attraction details by ID
   * Endpoint: GET /attractions/{attraction-id}
   */
  static async getAttraction(
    attractionId: number,
    language?: string
  ): Promise<Attraction> {
    const client = getViatorClient()
    return client.get<Attraction>(
      `/partner/attractions/${attractionId}`,
      { language }
    )
  }

  /**
   * Search attractions by destination
   * Helper method for destination-based search
   */
  static async searchAttractionsByDestination(
    destId: number,
    searchTerm?: string,
    language?: string
  ): Promise<{
    attractions: Attraction[]
    totalCount: number
  }> {
    return this.searchAttractions({ destId, searchTerm }, language)
  }

  /**
   * Search attractions by location coordinates
   * Helper method for proximity-based search
   */
  static async searchAttractionsByLocation(
    latitude: number,
    longitude: number,
    radiusKm: number = 10,
    searchTerm?: string,
    language?: string
  ): Promise<{
    attractions: Attraction[]
    totalCount: number
  }> {
    return this.searchAttractions(
      {
        latitude,
        longitude,
        radiusKm,
        searchTerm,
      },
      language
    )
  }
}


