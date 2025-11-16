/**
 * Viator Locations & Destinations Service
 * Handles location and destination data retrieval
 */

import { getViatorClient } from '../client'
import type { LocationDetails, Destination, DestinationsResponse } from '../types'

export class ViatorLocationService {
  /**
   * Get location details in bulk
   * Endpoint: POST /locations/bulk
   */
  static async getLocationsBulk(
    locationRefs: string[],
    language?: string
  ): Promise<{
    locations: LocationDetails[]
  }> {
    const client = getViatorClient()
    return client.post<{ locations: LocationDetails[] }>(
      '/partner/locations/bulk',
      { locationRefs },
      { language }
    )
  }

  /**
   * Get all destinations
   * Endpoint: GET /destinations
   */
  static async getDestinations(language?: string): Promise<DestinationsResponse> {
    const client = getViatorClient()
    return client.get<DestinationsResponse>('/partner/destinations', { language })
  }

  /**
   * Get destination by ID
   * Helper method that filters from all destinations
   */
  static async getDestinationById(
    destId: number,
    language?: string
  ): Promise<Destination | undefined> {
    const response = await this.getDestinations(language)
    return response.destinations.find((dest) => dest.destId === destId)
  }

  /**
   * Get destinations by parent ID
   * Helper method that filters from all destinations
   */
  static async getDestinationsByParentId(
    parentId: number,
    language?: string
  ): Promise<Destination[]> {
    const response = await this.getDestinations(language)
    return response.destinations.filter((dest) => dest.parentId === parentId)
  }

  /**
   * Search destinations by name
   * Helper method that filters from all destinations
   */
  static async searchDestinationsByName(
    searchTerm: string,
    language?: string
  ): Promise<Destination[]> {
    const response = await this.getDestinations(language)
    const lowerSearchTerm = searchTerm.toLowerCase()
    
    return response.destinations.filter((dest) =>
      dest.destinationName.toLowerCase().includes(lowerSearchTerm)
    )
  }
}


