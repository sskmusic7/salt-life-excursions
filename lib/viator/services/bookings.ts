/**
 * Viator Booking Service
 * Handles booking operations (hold, book, cancel, status)
 */

import { getViatorClient } from '../client'
import type {
  CartBookingRequest,
  BookingResponse,
  PaxMix,
  BookingQuestionAnswer,
} from '../types'

export class ViatorBookingService {
  /**
   * Hold items in the cart (reserve availability and lock pricing)
   * Endpoint: POST /bookings/cart/hold
   * Note: Available to Full-access + Booking Affiliate and Merchant partners
   */
  static async holdCart(
    request: CartBookingRequest,
    currency: string = 'USD',
    language?: string
  ): Promise<{
    holdRef: string
    expiresAt: string
    items: Array<{
      partnerItemRef: string
      productCode: string
      held: boolean
      pricing: {
        recommendedRetailPrice: number
        partnerNetPrice: number
        bookingFee: number
        partnerTotalPrice: number
      }
    }>
  }> {
    const client = getViatorClient()
    return client.post(
      `/partner/bookings/cart/hold?currency=${currency}`,
      request,
      { language }
    )
  }

  /**
   * Book (confirm) items in the cart
   * Endpoint: POST /bookings/cart/book
   * Note: Available to Full-access + Booking Affiliate and Merchant partners
   */
  static async bookCart(
    request: CartBookingRequest,
    currency: string = 'USD',
    language?: string
  ): Promise<BookingResponse> {
    const client = getViatorClient()
    return client.post<BookingResponse>(
      `/partner/bookings/cart/book?currency=${currency}`,
      request,
      { language }
    )
  }

  /**
   * Get booking status
   * Endpoint: GET /bookings/status
   */
  static async getBookingStatus(
    bookingRef: string,
    language?: string
  ): Promise<BookingResponse> {
    const client = getViatorClient()
    return client.get<BookingResponse>(
      `/partner/bookings/status?bookingRef=${bookingRef}`,
      { language }
    )
  }

  /**
   * Get cancellation reasons
   * Endpoint: GET /bookings/cancel-reasons
   */
  static async getCancelReasons(language?: string): Promise<{
    reasons: Array<{
      code: string
      description: string
    }>
  }> {
    const client = getViatorClient()
    return client.get('/partner/bookings/cancel-reasons', { language })
  }

  /**
   * Get cancellation quote
   * Endpoint: POST /bookings/{booking-reference}/cancel-quote
   */
  static async getCancelQuote(
    bookingReference: string,
    reasonCode: string,
    language?: string
  ): Promise<{
    bookingRef: string
    refundAmount: number
    refundPercentage: number
    currency: string
  }> {
    const client = getViatorClient()
    return client.post(
      `/partner/bookings/${bookingReference}/cancel-quote`,
      { reasonCode },
      { language }
    )
  }

  /**
   * Cancel a booking
   * Endpoint: POST /bookings/{booking-reference}/cancel
   */
  static async cancelBooking(
    bookingReference: string,
    reasonCode: string,
    cancellationNote?: string,
    language?: string
  ): Promise<{
    bookingRef: string
    status: string
    refundAmount: number
    refundPercentage: number
    currency: string
  }> {
    const client = getViatorClient()
    return client.post(
      `/partner/bookings/${bookingReference}/cancel`,
      { reasonCode, cancellationNote },
      { language }
    )
  }

  /**
   * Get bookings modified since a timestamp
   * Endpoint: GET /bookings/modified-since
   */
  static async getBookingsModifiedSince(
    modifiedSince: string,
    cursor?: string,
    language?: string
  ): Promise<{
    bookings: Array<{
      bookingRef: string
      eventType: string
      eventTime: string
    }>
    nextCursor?: string
  }> {
    const client = getViatorClient()
    const params = new URLSearchParams({ modifiedSince })
    if (cursor) {
      params.append('cursor', cursor)
    }

    return client.get(`/partner/bookings/modified-since?${params.toString()}`, { language })
  }

  /**
   * Acknowledge modified bookings
   * Endpoint: POST /bookings/modified-since/acknowledge
   */
  static async acknowledgeModifiedBookings(
    bookingRefs: string[],
    language?: string
  ): Promise<{ acknowledged: boolean }> {
    const client = getViatorClient()
    return client.post(
      '/partner/bookings/modified-since/acknowledge',
      { bookingRefs },
      { language }
    )
  }

  /**
   * Check if booking can be amended
   * Endpoint: GET /amendment/check/{booking-reference}
   */
  static async checkAmendment(
    bookingReference: string,
    language?: string
  ): Promise<{
    canAmend: boolean
    reasons?: string[]
  }> {
    const client = getViatorClient()
    return client.get(`/partner/amendment/check/${bookingReference}`, { language })
  }

  /**
   * Get quote for amending a booking
   * Endpoint: POST /amendment/quote
   */
  static async getAmendmentQuote(
    bookingReference: string,
    newTravelDate: string,
    newStartTime?: string,
    newPaxMix?: PaxMix[],
    language?: string
  ): Promise<{
    quoteRef: string
    expiresAt: string
    priceDifference: number
    currency: string
  }> {
    const client = getViatorClient()
    return client.post(
      '/partner/amendment/quote',
      {
        bookingReference,
        newTravelDate,
        newStartTime,
        newPaxMix,
      },
      { language }
    )
  }

  /**
   * Amend a booking
   * Endpoint: POST /amendment/amend/{quote-reference}
   */
  static async amendBooking(
    quoteReference: string,
    language?: string
  ): Promise<{
    bookingRef: string
    status: string
    amended: boolean
  }> {
    const client = getViatorClient()
    return client.post(`/partner/amendment/amend/${quoteReference}`, {}, { language })
  }
}


