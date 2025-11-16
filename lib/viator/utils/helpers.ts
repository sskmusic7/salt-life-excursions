/**
 * Viator API Helper Functions
 * Utility functions for working with Viator data
 */

import type { Product, ProductImage, Duration, PricingDetails } from '../types'

/**
 * Get the best quality image URL from a Viator product image
 */
export function getBestImageUrl(image: ProductImage, preferredWidth: number = 800): string {
  if (!image.variants || image.variants.length === 0) {
    return image.imageSource
  }

  // Sort variants by width descending
  const sortedVariants = [...image.variants].sort((a, b) => b.width - a.width)

  // Find the smallest variant that's still larger than preferred width
  const variant = sortedVariants.find((v) => v.width >= preferredWidth) || sortedVariants[0]

  return variant.url
}

/**
 * Get cover image from product images
 */
export function getCoverImage(images: ProductImage[]): ProductImage | undefined {
  return images.find((img) => img.isCover) || images[0]
}

/**
 * Format duration as human-readable string
 */
export function formatDuration(duration: Duration): string {
  if (duration.fixedDurationInMinutes) {
    const hours = Math.floor(duration.fixedDurationInMinutes / 60)
    const minutes = duration.fixedDurationInMinutes % 60

    if (hours === 0) {
      return `${minutes} minutes`
    } else if (minutes === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
    } else {
      return `${hours}h ${minutes}m`
    }
  }

  if (duration.variableDurationFromMinutes && duration.variableDurationToMinutes) {
    const fromHours = Math.floor(duration.variableDurationFromMinutes / 60)
    const toHours = Math.floor(duration.variableDurationToMinutes / 60)

    if (fromHours === toHours) {
      return `${fromHours} ${fromHours === 1 ? 'hour' : 'hours'}`
    }

    return `${fromHours}-${toHours} hours`
  }

  return 'Duration varies'
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'AU$',
    JPY: '¥',
  }

  const symbol = symbols[currency] || currency

  return `${symbol}${price.toFixed(2)}`
}

/**
 * Calculate total price from pricing details
 */
export function calculateTotalPrice(pricingDetails: PricingDetails[]): number {
  return pricingDetails.reduce((total, detail) => {
    const price = detail.price.special?.partnerTotalPrice || detail.price.original.partnerTotalPrice
    return total + price * detail.minTravelers
  }, 0)
}

/**
 * Check if product has special pricing available
 */
export function hasSpecialPricing(product: Product): boolean {
  // This would need to check the availability schedules
  // For now, return false as this requires availability data
  return false
}

/**
 * Get product rating display
 */
export function getProductRating(product: Product): {
  rating: number
  totalReviews: number
} | null {
  if (!product.reviewsInfo) {
    return null
  }

  return {
    rating: product.reviewsInfo.combinedAverageRating,
    totalReviews: product.reviewsInfo.totalReviews,
  }
}

/**
 * Extract location names from product
 * Note: Requires calling /locations/bulk to resolve location references
 */
export function getLocationRefs(product: Product): string[] {
  return product.locations.map((loc) => loc.ref)
}

/**
 * Get cancellation policy summary
 */
export function getCancellationPolicySummary(product: Product): string {
  const policy = product.cancellationPolicy

  switch (policy.type) {
    case 'STANDARD':
      return 'Free cancellation up to 24 hours before'
    case 'ALL_SALES_FINAL':
      return 'Non-refundable'
    case 'CUSTOM':
      return policy.description
    default:
      return 'See cancellation policy for details'
  }
}

/**
 * Check if product is likely available (based on simple heuristics)
 * For real availability, use the availability check API
 */
export function isLikelyAvailable(product: Product): boolean {
  // This is a simplified check
  // Real availability should be checked via the API
  return true
}

/**
 * Get age band requirements summary
 */
export function getAgeBandSummary(product: Product): string {
  const ageBands = product.pricingInfo.ageBands

  if (ageBands.length === 1 && ageBands[0].ageBand === 'TRAVELER') {
    return 'All ages'
  }

  const adultsRequired = ageBands.find((ab) => ab.ageBand === 'ADULT')
  if (adultsRequired && adultsRequired.minTravelersPerBooking > 0) {
    return `Requires at least ${adultsRequired.minTravelersPerBooking} adult(s)`
  }

  return 'See age requirements'
}

/**
 * Parse product URL to extract product code
 */
export function extractProductCode(url: string): string | null {
  const match = url.match(/\/([A-Z0-9]+P\d+)/)
  return match ? match[1] : null
}

/**
 * Build Viator product URL
 */
export function buildViatorUrl(productCode: string): string {
  return `https://www.viator.com/tours/${productCode}`
}

/**
 * Convert Viator product to simplified format for UI
 */
export function simplifyProduct(product: Product) {
  const coverImage = getCoverImage(product.images)

  return {
    id: product.productCode,
    title: product.title,
    description: product.description,
    image: coverImage ? getBestImageUrl(coverImage) : '',
    duration: formatDuration(product.duration),
    rating: getProductRating(product),
    cancellationPolicy: getCancellationPolicySummary(product),
    url: product.productUrl,
    tags: product.tags,
  }
}

/**
 * Group products by category/tag
 */
export function groupProductsByTag(products: Product[]): Map<string, Product[]> {
  const groups = new Map<string, Product[]>()

  products.forEach((product) => {
    product.tags.forEach((tag) => {
      if (!groups.has(tag)) {
        groups.set(tag, [])
      }
      groups.get(tag)!.push(product)
    })
  })

  return groups
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] {
  return products.filter((product) => {
    // This is simplified - real pricing should come from availability schedules
    return true // Would need availability data to filter properly
  })
}

/**
 * Sort products by various criteria
 */
export function sortProducts(
  products: Product[],
  sortBy: 'price-low' | 'price-high' | 'rating' | 'popular'
): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => {
        const ratingA = a.reviewsInfo?.combinedAverageRating || 0
        const ratingB = b.reviewsInfo?.combinedAverageRating || 0
        return ratingB - ratingA
      })

    case 'popular':
      return sorted.sort((a, b) => {
        const reviewsA = a.reviewsInfo?.totalReviews || 0
        const reviewsB = b.reviewsInfo?.totalReviews || 0
        return reviewsB - reviewsA
      })

    default:
      return sorted
  }
}


