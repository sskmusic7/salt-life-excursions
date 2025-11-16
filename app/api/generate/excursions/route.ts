/**
 * API Route: Generate Excursions
 * POST /api/generate/excursions
 * 
 * Uses Gemini AI to generate excursion content and Unsplash for images
 */

import { NextRequest, NextResponse } from 'next/server'
import { ExcursionGenerator } from '@/lib/gemini/excursion-generator'
import { getUnsplashClient } from '@/lib/unsplash/client'
import type { ExcursionGenerationRequest } from '@/lib/gemini/types'
import { writeFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {type, count = 1, saveToFile = false } = body

    let excursions = []

    if (type === 'bulk') {
      // Generate all Turks & Caicos excursions
      console.log('Generating Turks & Caicos excursions...')
      excursions = await ExcursionGenerator.generateTurksAndCaicosExcursions()
    } else if (type === 'single') {
      // Generate a single excursion
      const request: ExcursionGenerationRequest = body
      const excursion = await ExcursionGenerator.generateExcursion(request)
      excursions = [excursion]
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid generation type' },
        { status: 400 }
      )
    }

    // Fetch images for each excursion
    console.log(`Fetching images for ${excursions.length} excursions...`)
    const unsplashClient = getUnsplashClient()

    const excursionsWithImages = await Promise.all(
      excursions.map(async (excursion) => {
        try {
          const searchTerm = excursion.imageSearchTerms[0] || excursion.category
          const images = await unsplashClient.searchPhotos(
            `black people ${searchTerm} vacation diverse`,
            5
          )

          return {
            ...excursion,
            images: images.map((img) => ({
              url: img.regularUrl,
              thumbnail: img.thumbnailUrl,
              alt: img.altDescription || excursion.title,
              photographer: img.photographer,
              photographerUrl: img.photographerUrl,
            })),
            coverImage: images[0]?.regularUrl || '',
          }
        } catch (error) {
          console.error(`Failed to fetch images for ${excursion.title}:`, error)
          return {
            ...excursion,
            images: [],
            coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1080',
          }
        }
      })
    )

    // Optionally save to file
    if (saveToFile) {
      const dataDir = join(process.cwd(), 'data')
      const filePath = join(dataDir, 'generated-excursions.json')
      
      try {
        writeFileSync(filePath, JSON.stringify(excursionsWithImages, null, 2))
        console.log(`Saved ${excursionsWithImages.length} excursions to ${filePath}`)
      } catch (error) {
        console.error('Failed to save to file:', error)
      }
    }

    return NextResponse.json({
      success: true,
      count: excursionsWithImages.length,
      excursions: excursionsWithImages,
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate excursions',
      },
      { status: 500 }
    )
  }
}

