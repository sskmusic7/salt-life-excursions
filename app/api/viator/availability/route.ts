/**
 * API Route: Check availability and pricing
 * POST /api/viator/availability
 */

import { NextRequest, NextResponse } from 'next/server'
import { ViatorAvailabilityService } from '@/lib/viator'
import type { AvailabilityCheckRequest } from '@/lib/viator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      productCode, 
      productOptionCode, 
      travelDate, 
      startTime, 
      paxMix,
      currency,
      language 
    } = body

    if (!productCode || !productOptionCode || !travelDate || !paxMix) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'productCode, productOptionCode, travelDate, and paxMix are required' 
        },
        { status: 400 }
      )
    }

    const availabilityRequest: AvailabilityCheckRequest = {
      productCode,
      productOptionCode,
      travelDate,
      startTime,
      paxMix,
    }

    const result = await ViatorAvailabilityService.checkAvailability(
      availabilityRequest,
      currency || 'USD',
      language || 'en-US'
    )

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error checking availability:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check availability',
      },
      { status: 500 }
    )
  }
}


