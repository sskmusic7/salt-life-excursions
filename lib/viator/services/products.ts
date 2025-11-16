/**
 * Viator Product Service
 * Handles product content retrieval from Viator API
 */

import { getViatorClient } from '../client'
import type { Product, ProductSearchRequest, SearchResultProduct } from '../types'

export class ViatorProductService {
  /**
   * Get a single product by product code
   * Endpoint: GET /products/{product-code}
   */
  static async getProduct(productCode: string, language?: string): Promise<Product> {
    const client = getViatorClient()
    return client.get<Product>(`/partner/products/${productCode}`, { language })
  }

  /**
   * Get multiple products in bulk
   * Endpoint: POST /products/bulk
   */
  static async getProductsBulk(productCodes: string[], language?: string): Promise<{ products: Product[] }> {
    const client = getViatorClient()
    return client.post<{ products: Product[] }>('/partner/products/bulk', {
      productCodes,
    }, { language })
  }

  /**
   * Get products modified since a given timestamp
   * Endpoint: GET /products/modified-since
   * For delta updates and initial ingestion
   */
  static async getProductsModifiedSince(
    cursor?: string,
    modifiedSince?: string,
    language?: string
  ): Promise<{
    products: Product[]
    nextCursor?: string
  }> {
    const client = getViatorClient()
    const params = new URLSearchParams()
    
    if (cursor) {
      params.append('cursor', cursor)
    }
    if (modifiedSince) {
      params.append('modifiedSince', modifiedSince)
    }

    const endpoint = `/partner/products/modified-since${params.toString() ? `?${params.toString()}` : ''}`
    return client.get(endpoint, { language })
  }

  /**
   * Search products with filtering, sorting, and pagination
   * Endpoint: POST /products/search
   */
  static async searchProducts(
    request: ProductSearchRequest,
    language?: string
  ): Promise<{
    products: SearchResultProduct[]
    totalCount: number
    nextCursor?: string
  }> {
    const client = getViatorClient()
    return client.post('/partner/products/search', request, { language })
  }

  /**
   * Get product recommendations
   * Endpoint: GET /products/recommendations
   */
  static async getProductRecommendations(
    productCode: string,
    limit: number = 10,
    language?: string
  ): Promise<{ products: SearchResultProduct[] }> {
    const client = getViatorClient()
    return client.get(
      `/partner/products/recommendations?productCode=${productCode}&limit=${limit}`,
      { language }
    )
  }

  /**
   * Get available product tags
   * Endpoint: GET /products/tags
   */
  static async getProductTags(language?: string): Promise<{
    tags: Array<{
      tag: string
      tagId: number
      parentTagId?: number
      allProductCount: number
    }>
  }> {
    const client = getViatorClient()
    return client.get('/partner/products/tags', { language })
  }

  /**
   * Get all booking questions definitions
   * Endpoint: GET /products/booking-questions
   */
  static async getBookingQuestions(language?: string): Promise<{
    bookingQuestions: Array<{
      legacyBookingQuestionId: number
      id: string
      type: string
      group: 'PER_TRAVELER' | 'PER_BOOKING'
      label: string
      hint?: string
      units?: string[]
      required: 'MANDATORY' | 'OPTIONAL' | 'CONDITIONAL'
      allowedAnswers?: string[]
      maxLength?: number
    }>
  }> {
    const client = getViatorClient()
    return client.get('/partner/products/booking-questions', { language })
  }
}


