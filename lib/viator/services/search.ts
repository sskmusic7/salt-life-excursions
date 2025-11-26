/**
 * Viator Search Service
 * Handles free-text search and filtering
 */

import { getViatorClient } from '../client'
import type { SearchRequest, SearchResponse } from '../types'

export class ViatorSearchService {
  /**
   * Free-text search for products, destinations, and attractions
   * Endpoint: POST /partner/search/freetext
   */
  static async freeTextSearch(
    request: SearchRequest,
    language?: string
  ): Promise<SearchResponse> {
    const client = getViatorClient()
    return client.post<SearchResponse>('/partner/search/freetext', request, { language })
  }

  /**
   * Search for products with specific filters
   * This is a convenience method that uses freetext search with PRODUCTS type
   */
  static async searchProducts(
    searchTerm: string,
    filters?: {
      destId?: number
      startDate?: string
      endDate?: string
      topX?: number
      currency?: string
      tags?: string[]
    },
    language?: string
  ): Promise<SearchResponse> {
    const request: SearchRequest & { filtering?: { tags?: string[] } } = {
      searchTerm,
      searchType: 'PRODUCTS',
      ...filters,
    }

    // Add tag filtering if provided
    if (filters?.tags && filters.tags.length > 0) {
      request.filtering = {
        tags: filters.tags,
      }
    }

    return this.freeTextSearch(request, language)
  }

  /**
   * Search for destinations
   * This is a convenience method that uses freetext search with DESTINATIONS type
   */
  static async searchDestinations(
    searchTerm: string,
    topX: number = 10,
    language?: string
  ): Promise<SearchResponse> {
    return this.freeTextSearch(
      {
        searchTerm,
        searchType: 'DESTINATIONS',
        topX,
      },
      language
    )
  }

  /**
   * Search for attractions
   * This is a convenience method that uses freetext search with ATTRACTIONS type
   */
  static async searchAttractions(
    searchTerm: string,
    destId?: number,
    topX: number = 10,
    language?: string
  ): Promise<SearchResponse> {
    return this.freeTextSearch(
      {
        searchTerm,
        searchType: 'ATTRACTIONS',
        destId,
        topX,
      },
      language
    )
  }
}


