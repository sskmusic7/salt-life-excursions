/**
 * API Route: Get single product details
 * GET /api/viator/products/[productCode]
 */

import { NextRequest, NextResponse } from 'next/server'
import { ViatorProductService } from '@/lib/viator'

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string } }
) {
  try {
    const { productCode } = params
    const searchParams = request.nextUrl.searchParams
    const language = searchParams.get('language') || 'en-US'

    const product = await ViatorProductService.getProduct(productCode, language)

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
      },
      { status: 500 }
    )
  }
}


