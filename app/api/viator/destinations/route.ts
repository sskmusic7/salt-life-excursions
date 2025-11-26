/**
 * API Route: Get all destinations
 * GET /api/viator/destinations
 * 
 * Helper endpoint to find destination IDs
 */

import { NextResponse } from 'next/server'
import { ViatorLocationService } from '@/lib/viator/services/locations'

export async function GET() {
  try {
    const destinationsResponse = await ViatorLocationService.getDestinations('en-US')
    
    // Debug: log the raw response structure
    console.log('Destinations response keys:', Object.keys(destinationsResponse || {}))
    console.log('Has destinations array?', Array.isArray(destinationsResponse?.destinations))
    console.log('Destinations count:', destinationsResponse?.destinations?.length)
    
    const destinations = destinationsResponse?.destinations || []
    const firstFew = destinations.slice(0, 3)
    console.log('First few destinations sample:', JSON.stringify(firstFew, null, 2))
    
    // Search for Turks & Caicos - try multiple variations
    const tciMatches = destinations.filter(d => {
      if (!d) return false
      const name = (d.destinationName || '').toLowerCase()
      return name.includes('turks') || 
             name.includes('caicos') || 
             name.includes('tci') ||
             name === 'turks and caicos' ||
             name.includes('turks &')
    })
    
    return NextResponse.json({
      success: true,
      total: destinations.length,
      responseKeys: Object.keys(destinationsResponse || {}),
      tciMatches: tciMatches.map(d => ({
        destId: d.destId,
        name: d.destinationName,
        parentId: d.parentId,
        timeZone: d.timeZone
      })),
      sampleDestinations: destinations.slice(0, 50).filter(d => d).map(d => ({
        destId: d.destId,
        name: d.destinationName,
        parentId: d.parentId
      }))
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

