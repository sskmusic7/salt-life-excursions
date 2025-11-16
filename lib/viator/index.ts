/**
 * Viator Partner API (2.0) - Main Export
 * 
 * This module provides a comprehensive integration with the Viator Partner API.
 * 
 * Usage:
 * 1. Set up your environment variables (see .env.example)
 * 2. Import the services you need from this module
 * 3. Call the static methods on each service
 * 
 * Example:
 * ```typescript
 * import { ViatorProductService, ViatorSearchService } from '@/lib/viator'
 * 
 * // Search for products
 * const results = await ViatorSearchService.searchProducts('snorkeling', {
 *   destId: 123,
 *   currency: 'USD'
 * })
 * 
 * // Get product details
 * const product = await ViatorProductService.getProduct('10212P2')
 * ```
 */

// Export all services
export { ViatorProductService } from './services/products'
export { ViatorAvailabilityService } from './services/availability'
export { ViatorBookingService } from './services/bookings'
export { ViatorSearchService } from './services/search'
export { ViatorReviewService } from './services/reviews'
export { ViatorLocationService } from './services/locations'
export { ViatorAttractionService } from './services/attractions'
export { ViatorAuxiliaryService } from './services/auxiliary'

// Export client for advanced usage
export { ViatorAPIClient, getViatorClient, createViatorClient } from './client'

// Export all types
export * from './types'

// Version information
export const VIATOR_API_VERSION = '2.0'
export const VIATOR_API_DOCS_URL = 'https://docs.viator.com/partner-api/merchant/technical/'


