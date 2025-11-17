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
      // Generate all blog posts from the blog page
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

