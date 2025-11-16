/**
 * API Route: Get product reviews
 * GET /api/viator/reviews/[productCode]
 * 
 * IMPORTANT: This endpoint returns review content that must NOT be indexed by search engines.
 * The response includes a custom header to help prevent indexing.
 */

import { NextRequest, NextResponse } from 'next/server'
import { ViatorReviewService } from '@/lib/viator'

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string } }
) {
  try {
    const { productCode } = params
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const language = searchParams.get('language') || 'en-US'

    const reviews = await ViatorReviewService.getProductReviewsPaginated(
      productCode,
      page,
      pageSize,
      language
    )

    // Add header to prevent search engine indexing
    const response = NextResponse.json({ success: true, data: reviews })
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')

    return response
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch reviews',
      },
      { status: 500 }
    )
  }
}


