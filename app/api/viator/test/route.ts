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
    
    // Test with a simple search
    console.log('Testing Viator API connection with search: "turks caicos"')
    const response = await client.post('/partner/search/freetext', {
      searchTerm: 'turks caicos',
      searchType: 'PRODUCTS',
      topX: 5,
      currency: 'USD',
      sortOrder: 'RECOMMENDED',
    })
    
    console.log('Viator API Response:', JSON.stringify(response, null, 2))
    
    // Check response structure
    const hasProducts = !!(
      response?.data?.products?.length ||
      response?.products?.length ||
      (Array.isArray(response?.data) && response.data.length) ||
      (Array.isArray(response) && response.length)
    )
    
    return NextResponse.json({
      success: true,
      message: hasProducts ? 'Viator API is working!' : 'Viator API responded but returned no products',
      diagnostics,
      responseStructure: {
        hasData: !!response?.data,
        hasProducts: !!response?.products,
        hasDataProducts: !!response?.data?.products,
        isArray: Array.isArray(response),
        isDataArray: Array.isArray(response?.data),
        productCount: response?.data?.products?.length || 
                      response?.products?.length || 
                      (Array.isArray(response?.data) ? response.data.length : 0) ||
                      (Array.isArray(response) ? response.length : 0) ||
                      0,
      },
      sampleData: response // Include raw response for debugging
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

