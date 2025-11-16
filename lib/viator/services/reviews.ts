/**
 * Viator Reviews Service
 * Handles product review retrieval
 * 
 * IMPORTANT: Review content must NOT be indexed by search engines
 * See: https://docs.viator.com/partner-api/merchant/technical/#section/Protecting-unique-content
 */

import { getViatorClient } from '../client'
import type { ReviewRequest, ReviewResponse } from '../types'

export class ViatorReviewService {
  /**
   * Get reviews for a product
   * Endpoint: GET /reviews/product
   * 
   * IMPORTANT: Review content obtained via this endpoint must not be indexed by search engines.
   * You must implement proper protection mechanisms as per Viator's requirements.
   */
  static async getProductReviews(
    request: ReviewRequest,
    language?: string
  ): Promise<ReviewResponse> {
    const client = getViatorClient()
    const { productCode, pagination } = request

    const params = new URLSearchParams({ productCode })
    
    if (pagination?.offset !== undefined) {
      params.append('offset', pagination.offset.toString())
    }
    if (pagination?.limit !== undefined) {
      params.append('limit', pagination.limit.toString())
    }

    return client.get<ReviewResponse>(
      `/partner/reviews/product?${params.toString()}`,
      { language }
    )
  }

  /**
   * Get paginated reviews for a product
   * Helper method with easier pagination
   */
  static async getProductReviewsPaginated(
    productCode: string,
    page: number = 1,
    pageSize: number = 20,
    language?: string
  ): Promise<ReviewResponse> {
    const offset = (page - 1) * pageSize
    
    return this.getProductReviews(
      {
        productCode,
        pagination: {
          offset,
          limit: pageSize,
        },
      },
      language
    )
  }

  /**
   * Get all reviews for a product (fetches all pages)
   * Use with caution for products with many reviews
   */
  static async getAllProductReviews(
    productCode: string,
    language?: string,
    maxReviews: number = 500
  ): Promise<ReviewResponse> {
    const pageSize = 100
    let allReviews: ReviewResponse['reviews'] = []
    let offset = 0
    let totalCount = 0

    while (allReviews.length < maxReviews) {
      const response = await this.getProductReviews(
        {
          productCode,
          pagination: { offset, limit: pageSize },
        },
        language
      )

      allReviews = [...allReviews, ...response.reviews]
      totalCount = response.totalCount

      // If we've fetched all reviews or reached the limit, break
      if (allReviews.length >= totalCount || allReviews.length >= maxReviews) {
        break
      }

      offset += pageSize
    }

    // Trim to maxReviews if we fetched more
    if (allReviews.length > maxReviews) {
      allReviews = allReviews.slice(0, maxReviews)
    }

    return {
      productCode,
      reviews: allReviews,
      totalCount,
      averageRating:
        allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length,
    }
  }
}


