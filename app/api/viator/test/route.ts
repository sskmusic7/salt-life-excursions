/**
 * API Route: Test Viator API Connection
 * GET /api/viator/test
 * 
 * This endpoint helps diagnose Viator API issues by showing:
 * - Whether API credentials are configured
 * - Which environment (sandbox/production) is being used
 * - Raw API response for debugging
 */

import { NextResponse } from 'next/server'
import { getViatorClient } from '@/lib/viator/client'

export async function GET() {
  try {
    const env = (process.env.VIATOR_ENV || 'sandbox').toLowerCase()
    const isProduction = env === 'production'
    const apiKey = isProduction 
      ? process.env.VIATOR_API_KEY_PRODUCTION 
      : process.env.VIATOR_API_KEY_SANDBOX || process.env.VIATOR_API_KEY
    
    const diagnostics = {
      environment: env,
      apiKeyConfigured: !!apiKey,
      apiKeyPreview: apiKey ? `${apiKey.substring(0, 8)}...` : 'NOT SET',
      baseUrl: isProduction ? 'https://api.viator.com' : 'https://api.sandbox.viator.com',
      timestamp: new Date().toISOString(),
    }

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'Viator API key not configured',
        diagnostics,
        fix: 'Add VIATOR_API_KEY_SANDBOX or VIATOR_API_KEY to your .env.local file'
      }, { status: 500 })
    }

    const client = getViatorClient()
    
    // Test with free-text search instead of single product lookup
    // This is more reliable for testing API connectivity
    console.log('Testing Viator API connection - using free-text search')
    const { ViatorSearchService } = await import('@/lib/viator/services/search')
    const response: any = await ViatorSearchService.searchProducts('turks caicos', {
      topX: 5,
      currency: 'USD'
    })
    
    console.log('Viator API Response:', JSON.stringify(response, null, 2))
    
    // Check response structure for SearchResponse format
    const hasProducts = !!(response?.products && response.products.length > 0)
    const productCount = response?.products?.length || response?.totalCount || 0
    
    return NextResponse.json({
      success: true,
      message: hasProducts ? `Viator API is working! Found ${productCount} products` : 'Viator API responded but returned no products',
      diagnostics,
      responseStructure: {
        hasProducts: !!response?.products,
        productCount: productCount,
        totalCount: response?.totalCount || 0,
        isSearchResponse: !!(response?.products && typeof response?.totalCount === 'number'),
      },
      sampleData: {
        productCount: productCount,
        totalCount: response?.totalCount,
        firstProduct: response?.products?.[0] || null
      } // Include sample for debugging (not full response to keep size manageable)
    })
    
  } catch (error) {
    console.error('Viator API Test Error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      diagnostics: {
        environment: (process.env.VIATOR_ENV || 'sandbox').toLowerCase(),
        timestamp: new Date().toISOString(),
      },
      troubleshooting: [
        '1. Verify your Viator API key is correct in .env.local',
        '2. Check if you\'re using the correct environment (sandbox vs production)',
        '3. Ensure your API key has been activated by Viator',
        '4. Check if your IP is whitelisted (if required)',
        '5. Verify the API endpoint format matches Viator\'s documentation'
      ]
    }, { status: 500 })
  }
}

