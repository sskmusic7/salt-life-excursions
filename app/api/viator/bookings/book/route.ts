/**
 * API Route: Book items in cart
 * POST /api/viator/bookings/book
 * 
 * Note: Available to Full-access + Booking Affiliate and Merchant partners only
 */

import { NextRequest, NextResponse } from 'next/server'
import { ViatorBookingService } from '@/lib/viator'
import type { CartBookingRequest } from '@/lib/viator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, bookerInfo, communication, currency, language } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'items array is required and must not be empty' },
        { status: 400 }
      )
    }

    if (!bookerInfo || !bookerInfo.firstName || !bookerInfo.lastName || !bookerInfo.email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'bookerInfo with firstName, lastName, and email is required' 
        },
        { status: 400 }
      )
    }

    if (!communication || !communication.email) {
      return NextResponse.json(
        { success: false, error: 'communication with email is required' },
        { status: 400 }
      )
    }

    const bookingRequest: CartBookingRequest = {
      items,
      bookerInfo,
      communication,
    }

    const result = await ViatorBookingService.bookCart(
      bookingRequest,
      currency || 'USD',
      language || 'en-US'
    )

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error booking cart:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to book cart',
      },
      { status: 500 }
    )
  }
}


