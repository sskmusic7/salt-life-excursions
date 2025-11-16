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
    
    // Use Viator's correct freetext search endpoint
    const response = await client.post('/partner/search/freetext', {
      searchTerm: query,
      searchType: 'PRODUCTS',
      topX: 30,
      currency: 'USD',
    })
    
    // Transform the data for frontend
    const products = transformViatorProducts(response)
    
    return NextResponse.json({ 
      success: true, 
      products,
      count: products.length 
    })
  } catch (error) {
    console.error('Viator API Error (using mock data as fallback):', error)
    
    // Return mock data as fallback while API key is activating
    return NextResponse.json({ 
      success: true, 
      products: mockViatorProducts,
      count: mockViatorProducts.length,
      note: 'Using demo data - Viator API key pending activation (up to 24 hours)'
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
    
    const response = await client.post('/partner/search/freetext', {
      searchTerm,
      searchType: 'PRODUCTS',
      currency: 'USD',
      topX: 30,
      ...filters,
    }, { language })
    
    const products = transformViatorProducts(response)

    return NextResponse.json({ 
      success: true, 
      products,
      count: products.length 
    })
  } catch (error) {
    console.error('Viator API Error (using mock data as fallback):', error)
    
    // Return mock data as fallback while API key is activating
    return NextResponse.json({ 
      success: true, 
      products: mockViatorProducts,
      count: mockViatorProducts.length,
      note: 'Using demo data - Viator API key pending activation (up to 24 hours)'
    })
  }
}

// Transform Viator API response to our format
function transformViatorProducts(response: any) {
  // Viator freetext search returns data in a different format
  const products = response?.data || response?.products || []
  
  return products.map((product: any) => ({
    productCode: product.productCode,
    productName: product.title || product.productName || product.name,
    primaryDestinationName: product.destinations?.[0]?.destinationName || 
                           product.destination?.destinationName || 
                           'Turks & Caicos',
    rating: product.rating?.average || product.rating || 0,
    reviewCount: product.rating?.count || product.reviewCount || 0,
    duration: product.duration?.fixedDurationInMinutes 
      ? `${Math.floor(product.duration.fixedDurationInMinutes / 60)} hours`
      : product.duration?.variableDurationFromMinutes && product.duration?.variableDurationToMinutes
      ? `${Math.floor(product.duration.variableDurationFromMinutes / 60)}-${Math.floor(product.duration.variableDurationToMinutes / 60)} hours`
      : product.duration?.label || 'Varies',
    images: (product.images || []).map((img: any) => ({
      url: img.variants?.find((v: any) => v.width >= 600)?.url || img.variants?.[0]?.url || '',
      alt: img.caption || product.title || '',
    })),
    pricing: {
      from: product.pricing?.summary?.fromPrice || 
            product.pricing?.price || 
            product.price?.amount || 
            99,
      currency: product.pricing?.currency || product.price?.currency || 'USD',
    },
    bookingLink: `https://www.viator.com/tours/${product.productCode}`,
  }))
}


