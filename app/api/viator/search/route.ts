/**
 * API Route: Free-text search
 * GET/POST /api/viator/search
 */

import { NextRequest, NextResponse } from 'next/server'
import { getViatorClient } from '@/lib/viator/client'
import { mockViatorProducts } from '@/lib/viator/mock-data'

// GET method for easy URL-based searches
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || 'turks caicos'
    
    const client = getViatorClient()
    
    // Log request details for debugging
    console.log('🔍 Viator API Request:', {
      endpoint: '/partner/search/freetext',
      searchTerm: query,
      env: process.env.VIATOR_ENV || 'sandbox',
      hasApiKey: !!(process.env.VIATOR_API_KEY_SANDBOX || process.env.VIATOR_API_KEY),
      timestamp: new Date().toISOString()
    })
    
    // Use Viator's product search endpoint with destination filtering
    // Turks & Caicos destination ID: 2489 (you'll need to verify this)
    // For now, we'll use modified-since to get products
    const response: any = await client.post('/partner/products/modified-since', {
      count: 50,
      currency: 'USD'
    })
    
    console.log('✅ Viator API Response received:', {
      hasData: !!response,
      hasProducts: !!(response?.data?.products || response?.products),
      productCount: response?.data?.products?.length || response?.products?.length || 0
    })
    
    // Transform the data for frontend
    const products = transformViatorProducts(response)
    
    // Only return if we got real products
    if (products.length > 0) {
      console.log(`✅ Returning ${products.length} products from Viator API`)
      return NextResponse.json({ 
        success: true, 
        products,
        count: products.length,
        source: 'viator-api'
      })
    }
    
    // If no products, throw to fallback
    throw new Error('No products returned from Viator API')
  } catch (error) {
    console.error('❌ Viator API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : typeof error,
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3) : undefined
    })
    
    // Try to use mock data as fallback, but indicate it's not from real API
    return NextResponse.json({ 
      success: true, 
      products: mockViatorProducts,
      count: mockViatorProducts.length,
      note: 'Using demo data - Viator API key may need activation or check API credentials',
      error: error instanceof Error ? error.message : 'API request failed',
      source: 'mock'
    })
  }
}

// POST method for advanced searches
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchTerm, filters, language } = body

    if (!searchTerm) {
      return NextResponse.json(
        { success: false, error: 'searchTerm is required' },
        { status: 400 }
      )
    }

    const client = getViatorClient()
    
    const response: any = await client.post('/partner/products/search', {
      searchTerm,
      pagination: {
        offset: 0,
        limit: 50
      },
      currency: 'USD',
      sorting: {
        sortBy: 'POPULARITY'
      },
      ...filters,
    }, { language })
    
    const products = transformViatorProducts(response)

    if (products.length > 0) {
      return NextResponse.json({ 
        success: true, 
        products,
        count: products.length,
        source: 'viator-api'
      })
    }
    
    throw new Error('No products returned from Viator API')
  } catch (error) {
    console.error('Viator API Error:', error)
    
    return NextResponse.json({ 
      success: true, 
      products: mockViatorProducts,
      count: mockViatorProducts.length,
      note: 'Using demo data - Viator API key may need activation or check API credentials',
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

function transformViatorProducts(response: any) {
  // Viator freetext search returns data in different formats depending on API version
  // Try multiple possible response structures
  let products = []
  
  if (response?.data?.products) {
    products = response.data.products
  } else if (response?.products) {
    products = response.products
  } else if (response?.data && Array.isArray(response.data)) {
    products = response.data
  } else if (Array.isArray(response)) {
    products = response
  }
  
  if (!products || products.length === 0) {
    console.warn('No products found in Viator API response:', response)
    return []
  }
  
  return products.map((product: any): TransformedViatorProduct => {
    const productCode = product.productCode || product.code || product.id || ''
    const productName = product.title || product.productName || product.name || 'Untitled Activity'
    
    // Build proper Viator booking URL
    const bookingLink = productCode 
      ? `https://www.viator.com/tours/Turks-and-Caicos/${productCode}`
      : product.url || `https://www.viator.com/searchResults/all?text=${encodeURIComponent(productName)}`
    
    return {
      productCode,
      productName,
      primaryDestinationName: product.destinations?.[0]?.destinationName || 
                             product.destination?.destinationName || 
                             product.primaryDestinationName ||
                             'Turks & Caicos',
      rating: product.rating?.average || product.rating?.overall || product.rating || product.reviewRating || 0,
      reviewCount: product.rating?.count || product.reviewCount || product.totalReviews || product.numberOfReviews || 0,
      duration: product.duration?.fixedDurationInMinutes 
        ? `${Math.floor(product.duration.fixedDurationInMinutes / 60)} hours`
        : product.duration?.variableDurationFromMinutes && product.duration?.variableDurationToMinutes
        ? `${Math.floor(product.duration.variableDurationFromMinutes / 60)}-${Math.floor(product.duration.variableDurationToMinutes / 60)} hours`
        : product.duration?.label || product.duration || 'Varies',
      images: (product.images || product.photoGallery || []).map((img: any) => ({
        url: img.variants?.find((v: any) => v.width >= 600)?.url || 
             img.variants?.[0]?.url || 
             img.url || 
             img.photoUrl || 
             '',
        alt: img.caption || img.title || productName,
      })),
      pricing: {
        from: product.pricing?.summary?.fromPrice || 
              product.pricing?.price || 
              product.price?.amount || 
              product.fromPrice ||
              99,
        currency: product.pricing?.currency || 
                  product.price?.currency || 
                  product.currency || 
                  'USD',
      },
      bookingLink,
    }
  }).filter((p: TransformedViatorProduct) => p.productCode || p.productName !== 'Untitled Activity') // Filter out invalid products
}


