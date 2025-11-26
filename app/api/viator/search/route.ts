/**
 * API Route: Viator Product Search with Cursor-based Pagination
 * GET/POST /api/viator/search
 */

import { NextRequest, NextResponse } from 'next/server'
import { ViatorProductService } from '@/lib/viator/services/products'
import { ViatorSearchService } from '@/lib/viator/services/search'
import { mockViatorProducts } from '@/lib/viator/mock-data'

// In-memory cache for cursor pagination (server-side only)
const cursorCache = new Map<string, string>()

// GET method for easy URL-based searches
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || 'turks caicos'
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const cursorParam = searchParams.get('cursor') || ''
    
    // Log request details for debugging
    const env = (process.env.VIATOR_ENV || 'sandbox').toLowerCase()
    const isProduction = env === 'production'
    const apiKey = isProduction 
      ? process.env.VIATOR_API_KEY_PRODUCTION 
      : process.env.VIATOR_API_KEY_SANDBOX || process.env.VIATOR_API_KEY
    
    console.log('🔍 Viator API Request:', {
      endpoint: '/partner/products/search',
      searchTerm: query,
      page,
      limit,
      cursor: cursorParam ? 'provided' : 'none',
      env,
      isProduction,
      hasApiKey: !!apiKey,
      timestamp: new Date().toISOString()
    })
    
    // Turks & Caicos destination ID: 963
    const tciDestinationId: string = '963'
    
    // Build search request with cursor-based pagination
    const searchRequest: any = {
      filtering: {
        destination: tciDestinationId
      },
      pagination: {
        start: (page - 1) * limit + 1, // Viator uses 1-based start
        count: limit
      },
      currency: 'USD',
      sorting: {
        sortBy: 'POPULARITY',
        sortOrder: 'DESCENDING'
      }
    }
    
    // If we have a cursor from a previous request, use it
    if (cursorParam) {
      searchRequest.pagination.cursor = cursorParam
    }
    
    console.log(`🔍 Searching products: page=${page}, limit=${limit}, start=${searchRequest.pagination.start}`)
    
    let response
    let products: any[] = []
    let totalCount = 0
    let nextCursor: string | undefined
    
    try {
      response = await ViatorProductService.searchProducts(searchRequest)
      
      if (response?.products && response.products.length > 0) {
        products = response.products
        totalCount = response.totalCount || 0
        nextCursor = response.nextCursor
        console.log(`✅ Got ${products.length} products from search, total: ${totalCount}`)
      } else {
        // Try freetext search as fallback
        console.log('⚠️ No products from destination search, trying freetext...')
        const freetextResponse = await ViatorSearchService.searchProducts(query, {
          topX: limit * page, // Get enough to slice
          currency: 'USD'
        }, 'en-US')
        
        if (freetextResponse?.products && freetextResponse.products.length > 0) {
          // Slice to get the correct page
          const startIndex = (page - 1) * limit
          products = freetextResponse.products.slice(startIndex, startIndex + limit)
          totalCount = freetextResponse.totalCount || freetextResponse.products.length
          console.log(`✅ Freetext search: sliced ${products.length} products for page ${page}`)
        }
      }
    } catch (searchError) {
      console.warn('Product search failed, using freetext:', searchError)
      try {
        const freetextResponse = await ViatorSearchService.searchProducts(query, {
          topX: Math.min(limit * page, 100), // Cap at 100
          currency: 'USD'
        }, 'en-US')
        
        if (freetextResponse?.products) {
          const startIndex = (page - 1) * limit
          products = freetextResponse.products.slice(startIndex, startIndex + limit)
          totalCount = freetextResponse.totalCount || freetextResponse.products.length
        }
      } catch (e) {
        console.error('Both searches failed')
        throw searchError
      }
    }
    
    // Transform products
    const transformedProducts = transformViatorProducts({ products, totalCount })
    
    const hasMore = transformedProducts.length === limit && (page * limit < totalCount)
    
    if (transformedProducts.length > 0) {
      console.log(`✅ Returning ${transformedProducts.length} products (page ${page}, total ${totalCount}, hasMore: ${hasMore})`)
      return NextResponse.json({ 
        success: true, 
        products: transformedProducts,
        count: transformedProducts.length,
        totalCount: totalCount,
        page: page,
        limit: limit,
        hasMore: hasMore,
        nextCursor: nextCursor,
        source: 'viator-api'
      })
    }
    
    throw new Error('No products returned from Viator API')
  } catch (error) {
    console.error('❌ Viator API Error:', error instanceof Error ? error.message : error)
    
    // Return mock data as fallback
    return NextResponse.json({ 
      success: true, 
      products: mockViatorProducts,
      count: mockViatorProducts.length,
      totalCount: mockViatorProducts.length,
      page: 1,
      limit: 10,
      hasMore: false,
      note: 'Using demo data - Viator API error',
      error: error instanceof Error ? error.message : 'API request failed',
      source: 'mock'
    })
  }
}

// POST method for advanced searches
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchTerm, filters, language, page = 1, limit = 10 } = body

    if (!searchTerm) {
      return NextResponse.json(
        { success: false, error: 'searchTerm is required' },
        { status: 400 }
      )
    }

    const response = await ViatorProductService.searchProducts({
      pagination: {
        start: (page - 1) * limit + 1,
        count: limit
      },
      currency: 'USD',
      sorting: {
        sortBy: 'POPULARITY',
        sortOrder: 'DESCENDING'
      },
      ...filters,
    }, language)
    
    const products = transformViatorProducts(response)

    if (products.length > 0) {
      return NextResponse.json({ 
        success: true, 
        products,
        count: products.length,
        totalCount: response.totalCount || products.length,
        page,
        hasMore: products.length === limit,
        source: 'viator-api'
      })
    }
    
    throw new Error('No products returned from Viator API')
  } catch (error) {
    console.error('❌ Viator API Error:', error)
    
    return NextResponse.json({ 
      success: true, 
      products: mockViatorProducts,
      count: mockViatorProducts.length,
      totalCount: mockViatorProducts.length,
      note: 'Using demo data',
      error: error instanceof Error ? error.message : 'API request failed',
      source: 'mock'
    })
  }
}

// Transform Viator API response to our format
interface TransformedViatorProduct {
  productCode: string
  productName: string
  primaryDestinationName: string
  rating: number
  reviewCount: number
  duration: string
  images: Array<{ url: string; alt: string }>
  pricing: { from: number; currency: string }
  bookingLink: string
}

function transformViatorProducts(response: any): TransformedViatorProduct[] {
  let products = []
  
  if (response?.products && Array.isArray(response.products)) {
    products = response.products
  } else if (response?.data?.products && Array.isArray(response.data.products)) {
    products = response.data.products
  } else if (Array.isArray(response)) {
    products = response
  }
  
  if (!products || products.length === 0) {
    return []
  }
  
  return products.map((product: any): TransformedViatorProduct => {
    const productCode = product.productCode || product.code || product.id || ''
    const productName = product.title || product.productName || product.name || 'Untitled Activity'
    
    const bookingLink = product.productUrl || (productCode 
      ? `https://www.viator.com/tours/Turks-and-Caicos/${productCode}`
      : `https://www.viator.com/searchResults/all?text=${encodeURIComponent(productName)}`)
    
    // Safely extract duration
    let durationString = 'Varies'
    try {
      const duration = product.duration
      if (duration) {
        if (duration.fixedDurationInMinutes) {
          const hours = Math.floor(duration.fixedDurationInMinutes / 60)
          const mins = duration.fixedDurationInMinutes % 60
          durationString = hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ''}` : `${mins}m`
        } else if (duration.variableDurationFromMinutes && duration.variableDurationToMinutes) {
          const fromHours = Math.floor(duration.variableDurationFromMinutes / 60)
          const toHours = Math.floor(duration.variableDurationToMinutes / 60)
          durationString = `${fromHours}-${toHours} hours`
        } else if (duration.label) {
          durationString = String(duration.label)
        } else if (duration.unstructuredDuration) {
          durationString = String(duration.unstructuredDuration)
        } else if (typeof duration === 'string') {
          durationString = duration
        }
      }
    } catch {
      durationString = 'Varies'
    }
    
    return {
      productCode,
      productName,
      primaryDestinationName: product.destinations?.[0]?.destinationName || 
                             product.destination?.destinationName || 
                             product.primaryDestinationName ||
                             'Turks & Caicos',
      rating: product.rating || product.reviewRating || 0,
      reviewCount: product.reviewCount || product.totalReviews || product.numberOfReviews || 0,
      duration: durationString,
      images: (product.images || product.photoGallery || []).map((img: any) => ({
        url: img.variants?.find((v: any) => v.width >= 600)?.url || 
             img.variants?.[0]?.url || 
             img.url || 
             img.photoUrl || 
             '',
        alt: img.caption || img.title || productName,
      })).filter((img: any) => img.url),
      pricing: {
        from: product.fromPrice || 
              product.pricing?.summary?.fromPrice || 
              product.pricing?.price || 
              product.price?.amount || 
              99,
        currency: product.currency || 
                  product.pricing?.currency || 
                  product.price?.currency || 
                  'USD',
      },
      bookingLink,
    }
  }).filter((p: TransformedViatorProduct) => p.productCode && p.productName !== 'Untitled Activity')
}
