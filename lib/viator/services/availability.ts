/**
 * Viator Availability Service
 * Handles availability and pricing information from Viator API
 */

import { getViatorClient } from '../client'
import type {
  AvailabilitySchedule,
  AvailabilityCheckRequest,
  AvailabilityCheckResponse,
} from '../types'

export class ViatorAvailabilityService {
  /**
   * Get availability schedule for a single product
   * Endpoint: GET /availability/schedules/{product-code}
   */
  static async getAvailabilitySchedule(
    productCode: string,
    currency: string = 'USD',
    language?: string
  ): Promise<AvailabilitySchedule> {
    const client = getViatorClient()
    return client.get<AvailabilitySchedule>(
      `/partner/availability/schedules/${productCode}?currency=${currency}`,
      { language }
    )
  }

  /**
   * Get availability schedules in bulk for multiple products
   * Endpoint: POST /availability/schedules/bulk
   */
  static async getAvailabilitySchedulesBulk(
    productCodes: string[],
    currency: string = 'USD',
    language?: string
  ): Promise<{
    bookableItems: AvailabilitySchedule[]
  }> {
    const client = getViatorClient()
    return client.post<{ bookableItems: AvailabilitySchedule[] }>(
      `/partner/availability/schedules/bulk?currency=${currency}`,
      { productCodes },
      { language }
    )
  }

  /**
   * Get availability schedules modified since a given timestamp
   * Endpoint: GET /availability/schedules/modified-since
   * For delta updates and initial ingestion
   */
  static async getAvailabilitySchedulesModifiedSince(
    cursor?: string,
    modifiedSince?: string,
    currency: string = 'USD',
    language?: string
  ): Promise<{
    bookableItems: AvailabilitySchedule[]
    nextCursor?: string
  }> {
    const client = getViatorClient()
    const params = new URLSearchParams({ currency })
    
    if (cursor) {
      params.append('cursor', cursor)
    }
    if (modifiedSince) {
      params.append('modifiedSince', modifiedSince)
    }

    const endpoint = `/partner/availability/schedules/modified-since?${params.toString()}`
    return client.get(endpoint, { language })
  }

  /**
   * Check real-time availability and pricing for a specific product configuration
   * Endpoint: POST /availability/check
   */
  static async checkAvailability(
    request: AvailabilityCheckRequest,
    currency: string = 'USD',
    language?: string
  ): Promise<AvailabilityCheckResponse> {
    const client = getViatorClient()
    return client.post<AvailabilityCheckResponse>(
      `/partner/availability/check?currency=${currency}`,
      request,
      { language }
    )
  }

  /**
   * Check availability for multiple products/configurations at once
   * Endpoint: POST /availability/check (supports multiple items)
   */
  static async checkAvailabilityBulk(
    requests: AvailabilityCheckRequest[],
    currency: string = 'USD',
    language?: string
  ): Promise<{
    availabilityResults: AvailabilityCheckResponse[]
  }> {
    const client = getViatorClient()
    return client.post<{ availabilityResults: AvailabilityCheckResponse[] }>(
      `/partner/availability/check?currency=${currency}`,
      { items: requests },
      { language }
    )
  }
}


