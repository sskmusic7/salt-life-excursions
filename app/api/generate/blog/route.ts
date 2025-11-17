/**
 * API Route: Generate Blog Posts
 * POST /api/generate/blog
 * 
 * Uses Gemini AI + Google Search to generate comprehensive blog posts
 */

import { NextRequest, NextResponse } from 'next/server'
import { BlogGenerator } from '@/lib/gemini/blog-generator'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, blogPosts, saveToFile = true } = body

    let posts = []

    if (type === 'bulk') {
      // Generate all blog posts from the blog page (24 total)
      const defaultBlogPosts = [
        {
          title: '10 Best Beaches in Turks & Caicos You Must Visit',
          category: 'Travel Guide',
          author: 'Sarah Johnson',
          topic: 'best beaches Grace Bay Providenciales'
        },
        {
          title: 'First-Time Visitor\'s Guide to Turks & Caicos',
          category: 'Travel Tips',
          author: 'Michael Chen',
          topic: 'first time visitor travel guide what to pack'
        },
        {
          title: 'The Ultimate Snorkeling Guide: Best Spots & Tips',
          category: 'Activities',
          author: 'Emily Rodriguez',
          topic: 'snorkeling spots Smith Reef Barrier Reef'
        },
        {
          title: 'Local Cuisine: Must-Try Dishes in TCI',
          category: 'Food & Drink',
          author: 'David Thompson',
          topic: 'Turks Caicos food conch fritters local cuisine'
        },
        {
          title: 'Family-Friendly Activities in Providenciales',
          category: 'Family Travel',
          author: 'Lisa Anderson',
          topic: 'family activities kids children Providenciales'
        },
        {
          title: 'Sustainable Tourism: Protecting Our Paradise',
          category: 'Sustainability',
          author: 'James Wilson',
          topic: 'sustainable tourism eco-friendly Turks Caicos'
        },
        {
          title: 'Island Hopping: Exploring All 40 Islands of Turks & Caicos',
          category: 'Travel Guide',
          author: 'Sarah Johnson',
          topic: 'island hopping Grand Turk Salt Cay North Caicos'
        },
        {
          title: 'Best Time to Visit Turks & Caicos: Weather & Seasons Guide',
          category: 'Travel Tips',
          author: 'Michael Chen',
          topic: 'best time to visit weather seasons hurricane season'
        },
        {
          title: 'Diving in Turks & Caicos: Top Dive Sites for All Levels',
          category: 'Activities',
          author: 'Emily Rodriguez',
          topic: 'diving dive sites Wall reef wreck diving'
        },
        {
          title: 'Romantic Getaways: Honeymoon Destinations in TCI',
          category: 'Travel Guide',
          author: 'Sarah Johnson',
          topic: 'romantic honeymoon couples resorts private beaches'
        },
        {
          title: 'Nightlife in Providenciales: Bars, Clubs & Entertainment',
          category: 'Food & Drink',
          author: 'David Thompson',
          topic: 'nightlife bars clubs restaurants entertainment'
        },
        {
          title: 'Wildlife Encounters: Meeting the Locals of TCI',
          category: 'Activities',
          author: 'Emily Rodriguez',
          topic: 'wildlife iguanas flamingos whales dolphins turtles'
        },
        {
          title: 'Shopping Guide: Where to Find the Best Souvenirs',
          category: 'Travel Tips',
          author: 'Michael Chen',
          topic: 'shopping souvenirs local crafts markets'
        },
        {
          title: 'Adventure Sports: Kiteboarding, Windsurfing & More',
          category: 'Activities',
          author: 'Emily Rodriguez',
          topic: 'kiteboarding windsurfing paddleboarding watersports'
        },
        {
          title: 'Luxury Resorts: Top-Rated Accommodations in TCI',
          category: 'Travel Guide',
          author: 'Sarah Johnson',
          topic: 'luxury resorts all-inclusive Grace Bay hotels'
        },
        {
          title: 'Day Trips from Providenciales: Must-Visit Destinations',
          category: 'Travel Guide',
          author: 'Sarah Johnson',
          topic: 'day trips excursions boat tours island tours'
        },
        {
          title: 'Photography Guide: Capturing the Perfect Caribbean Shot',
          category: 'Travel Tips',
          author: 'Michael Chen',
          topic: 'photography tips sunset sunrise beaches wildlife'
        },
        {
          title: 'Health & Safety: Medical Care & Emergency Services',
          category: 'Travel Tips',
          author: 'Michael Chen',
          topic: 'health safety medical care hospitals emergency'
        },
        {
          title: 'Cultural Experiences: History, Music & Local Traditions',
          category: 'Travel Guide',
          author: 'Sarah Johnson',
          topic: 'culture history music traditions local people'
        },
        {
          title: 'Budget Travel: How to Experience TCI Without Breaking the Bank',
          category: 'Travel Tips',
          author: 'Michael Chen',
          topic: 'budget travel cheap accommodations affordable activities'
        },
        {
          title: 'Sailing & Yachting: Charter Your Perfect Caribbean Adventure',
          category: 'Activities',
          author: 'Emily Rodriguez',
          topic: 'sailing yachting boat charters private cruises'
        },
        {
          title: 'Wedding Destinations: Planning Your TCI Island Wedding',
          category: 'Travel Guide',
          author: 'Sarah Johnson',
          topic: 'weddings destination wedding venues planning'
        },
        {
          title: 'Weather Patterns: Understanding TCI Climate Throughout the Year',
          category: 'Travel Tips',
          author: 'Michael Chen',
          topic: 'weather climate seasons temperature rainfall'
        },
        {
          title: 'Conservation Efforts: How TCI Protects Its Marine Environment',
          category: 'Sustainability',
          author: 'James Wilson',
          topic: 'conservation marine protection coral reef preservation'
        }
      ]

      console.log('Generating blog posts with Gemini AI + Google Search...')
      posts = await BlogGenerator.generateMultipleBlogPosts(
        blogPosts || defaultBlogPosts
      )
    } else if (type === 'single') {
      // Generate a single blog post
      const post = await BlogGenerator.generateBlogPost(body)
      posts = [post]
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid generation type. Use "bulk" or "single"' },
        { status: 400 }
      )
    }

    // Optionally save to file
    if (saveToFile) {
      const dataDir = join(process.cwd(), 'data')
      
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true })
      }
      
      const filePath = join(dataDir, 'generated-blog-posts.json')
      
      try {
        // Read existing posts if any
        let existingPosts: any[] = []
        if (existsSync(filePath)) {
          const fs = require('fs')
          const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
          existingPosts = Array.isArray(existing) ? existing : []
        }

        // Merge with new posts (replace by title if exists)
        const mergedPosts = [...existingPosts]
        for (const newPost of posts) {
          const existingIndex = mergedPosts.findIndex(p => p.title === newPost.title)
          if (existingIndex >= 0) {
            mergedPosts[existingIndex] = { ...newPost, id: mergedPosts[existingIndex].id }
          } else {
            mergedPosts.push({ ...newPost, id: mergedPosts.length + 1 })
          }
        }

        writeFileSync(filePath, JSON.stringify(mergedPosts, null, 2))
        console.log(`Saved ${posts.length} blog posts to ${filePath}`)
      } catch (error) {
        console.error('Failed to save to file:', error)
      }
    }

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts: posts.map((post, index) => ({ ...post, id: index + 1 }))
    })
  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate blog posts',
      },
      { status: 500 }
    )
  }
}

