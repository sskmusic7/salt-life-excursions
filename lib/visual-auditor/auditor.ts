/**
 * Visual Auditor
 * Audits images across the site and matches them with Google Image Search results
 * Post-processing: Google Image Search → Unsplash → AI Generation
 */

import { getGoogleImageSearchClient } from '@/lib/google/image-search'
import { getGoogleVisionClient } from '@/lib/google/vision'
import { getUnsplashClient } from '@/lib/unsplash/client'
import { getImageGenerator } from '@/lib/ai/image-generator'
import { SiteImageScanner, SiteImage } from './site-scanner'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

interface ImageAuditResult {
  id: string
  type: 'blog' | 'excursion' | 'activity' | 'homepage' | 'package' | 'testimonial' | 'page' | 'viator'
  title: string
  currentImage: string
  page?: string
  component?: string
  context?: string
  suggestedImage?: string
  suggestedImageSource?: 'google' | 'unsplash' | 'ai-generated'
  alternatives?: {
    google?: string
    unsplash?: string
    aiGenerated?: string
  }
  matchScore?: number
  keywords: string[]
  issue?: string
  labels?: string[]
  postProcessingStatus?: {
    googleChecked: boolean
    unsplashChecked: boolean
    aiGenerated: boolean
    finalSource: 'google' | 'unsplash' | 'ai-generated' | 'none'
  }
}

interface AuditSummary {
  totalAudited: number
  needsCorrection: number
  corrected: number
  results: ImageAuditResult[]
}

export class VisualAuditor {
  /**
   * Extract keywords from content for image matching
   */
  private extractKeywords(title: string, content?: string, category?: string): string[] {
    const keywords: string[] = []
    
    // Add title words
    keywords.push(...title.toLowerCase().split(/\s+/).filter(word => word.length > 3))
    
    // Add category
    if (category) {
      keywords.push(category.toLowerCase())
    }
    
    // Extract key phrases from content
    if (content) {
      const contentLower = content.toLowerCase()
      
      // Add location-specific keywords
      if (contentLower.includes('turks') || contentLower.includes('caicos')) {
        keywords.push('turks', 'caicos', 'turks caicos', 'tci')
      }
      
      if (contentLower.includes('grace bay')) keywords.push('grace bay', 'providenciales')
      if (contentLower.includes('beach')) keywords.push('beach', 'white sand', 'turquoise water')
      if (contentLower.includes('snorkel')) keywords.push('snorkeling', 'coral reef', 'underwater')
      if (contentLower.includes('yacht')) keywords.push('yacht', 'boat', 'sailing', 'caribbean')
      if (contentLower.includes('diving')) keywords.push('diving', 'scuba', 'reef')
      if (contentLower.includes('jet ski')) keywords.push('jet ski', 'watersports', 'speedboat')
      if (contentLower.includes('kayak')) keywords.push('kayak', 'paddle', 'clear water')
    }
    
    // Remove duplicates and return
    return Array.from(new Set(keywords))
  }

  /**
   * Post-process image alternatives (3-tier system)
   * 1. Check Google Image Search (already done)
   * 2. Check Unsplash for alternatives
   * 3. Generate AI image if needed
   */
  private async postProcessImageAlternatives(
    keywords: string[],
    title: string,
    googleImageUrl?: string
  ): Promise<{
    unsplash?: string
    aiGenerated?: string
    finalSource: 'google' | 'unsplash' | 'ai-generated' | 'none'
  }> {
    const alternatives: {
      unsplash?: string
      aiGenerated?: string
      finalSource: 'google' | 'unsplash' | 'ai-generated' | 'none'
    } = {
      finalSource: googleImageUrl ? 'google' : 'none'
    }

    // Tier 2: Check Unsplash
    try {
      const unsplashClient = getUnsplashClient()
      const unsplashQuery = `${title} ${keywords.slice(0, 3).join(' ')} Turks and Caicos`
      const unsplashResults = await unsplashClient.searchPhotos(unsplashQuery, 3)
      
      if (unsplashResults.length > 0) {
        alternatives.unsplash = unsplashResults[0].regularUrl
        
        // If no Google result, use Unsplash
        if (!googleImageUrl) {
          alternatives.finalSource = 'unsplash'
        }
      }
    } catch (error) {
      console.warn('Unsplash search failed:', error)
    }

    // Tier 3: AI Generation (only if no good alternatives found)
    if (!googleImageUrl && !alternatives.unsplash) {
      try {
        const imageGenerator = getImageGenerator()
        const prompt = `${title} in Turks and Caicos Islands, ${keywords.slice(0, 5).join(', ')}`
        
        const aiResult = await imageGenerator.generateWithFullFallback(
          prompt,
          keywords,
          googleImageUrl,
          alternatives.unsplash,
          title
        )
        
        if (aiResult && aiResult.source !== 'fallback') {
          alternatives.aiGenerated = aiResult.url
          alternatives.finalSource = 'ai-generated'
        }
      } catch (error) {
        console.warn('AI image generation failed:', error)
      }
    }

    return alternatives
  }

  /**
   * Audit a single image with post-processing (enhanced to handle all types)
   */
  async auditImage(
    id: string,
    type: 'blog' | 'excursion' | 'activity' | 'homepage' | 'package' | 'testimonial' | 'page' | 'viator',
    title: string,
    currentImage: string,
    content?: string,
    category?: string,
    page?: string,
    component?: string,
    context?: string
  ): Promise<ImageAuditResult> {
    const imageSearchClient = getGoogleImageSearchClient()
    const visionClient = getGoogleVisionClient()
    
    // Extract keywords for search
    const keywords = this.extractKeywords(title, content, category)
    const searchQuery = `${title} ${keywords.slice(0, 3).join(' ')} Turks and Caicos`
    
    // Tier 1: Get Google Image Search results
    const searchResults = await imageSearchClient.searchImages(searchQuery, 5)
    const googleImageUrl = searchResults.length > 0 ? searchResults[0]?.link : undefined

    // Analyze current image labels (if Vision API available)
    let currentLabels: string[] = []
    let matchScore = 0
    
    if (visionClient && currentImage) {
      try {
        currentLabels = await visionClient.analyzeImageLabels(currentImage)
        
        // Compare with top search result
        if (googleImageUrl) {
          const searchResultLabels = await visionClient.analyzeImageLabels(googleImageUrl)
          
          // Calculate match score
          const commonLabels = currentLabels.filter(l => 
            searchResultLabels.some(sl => sl.toLowerCase() === l.toLowerCase())
          )
          matchScore = commonLabels.length / Math.max(currentLabels.length, searchResultLabels.length, 1)
        }
      } catch (error) {
        console.warn('Vision API analysis failed, using basic matching:', error)
      }
    }

    // Determine if correction is needed (match score < 0.5 means poor match)
    const needsCorrection = matchScore < 0.5 || searchResults.length === 0

    // Post-processing: Get alternatives from Unsplash and AI
    const alternatives = needsCorrection 
      ? await this.postProcessImageAlternatives(keywords, title, googleImageUrl)
      : { finalSource: 'none' as const }

    // Determine best suggested image
    let suggestedImage: string | undefined
    let suggestedImageSource: 'google' | 'unsplash' | 'ai-generated' | undefined

    if (needsCorrection) {
      if (googleImageUrl) {
        suggestedImage = googleImageUrl
        suggestedImageSource = 'google'
      } else if (alternatives.unsplash) {
        suggestedImage = alternatives.unsplash
        suggestedImageSource = 'unsplash'
      } else if (alternatives.aiGenerated) {
        suggestedImage = alternatives.aiGenerated
        suggestedImageSource = 'ai-generated'
      }
    }
    
    return {
      id,
      type,
      title,
      currentImage,
      page,
      component,
      context,
      suggestedImage,
      suggestedImageSource,
      alternatives: needsCorrection ? alternatives : undefined,
      matchScore,
      keywords,
      issue: needsCorrection ? `Poor match (score: ${matchScore.toFixed(2)})` : undefined,
      labels: currentLabels.length > 0 ? currentLabels : undefined,
      postProcessingStatus: {
        googleChecked: true,
        unsplashChecked: needsCorrection,
        aiGenerated: !!alternatives.aiGenerated,
        finalSource: alternatives.finalSource
      }
    }
  }

  /**
   * Audit all blog post images
   */
  async auditBlogImages(): Promise<ImageAuditResult[]> {
    const dataDir = join(process.cwd(), 'data')
    const filePath = join(dataDir, 'generated-blog-posts.json')
    
    if (!existsSync(filePath)) {
      return []
    }

    try {
      const fileContent = readFileSync(filePath, 'utf-8')
      const posts = JSON.parse(fileContent)
      
      const results: ImageAuditResult[] = []
      
      for (const post of posts) {
        const result = await this.auditImage(
          post.id.toString(),
          'blog',
          post.title,
          post.image,
          post.content,
          post.category,
          '/blog',
          'BlogPost',
          'Blog post cover image'
        )
        results.push(result)
        
        // Rate limiting: wait between requests
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      return results
    } catch (error) {
      console.error('Failed to audit blog images:', error)
      return []
    }
  }

  /**
   * Audit all excursion images
   */
  async auditExcursionImages(): Promise<ImageAuditResult[]> {
    const dataDir = join(process.cwd(), 'data')
    const filePath = join(dataDir, 'generated-excursions.json')
    
    if (!existsSync(filePath)) {
      return []
    }

    try {
      const fileContent = readFileSync(filePath, 'utf-8')
      const excursions = JSON.parse(fileContent)
      
      const results: ImageAuditResult[] = []
      
      for (const excursion of excursions) {
        // Cover image
        if (excursion.coverImage) {
          const result = await this.auditImage(
            `${excursion.id}-cover`,
            'excursion',
            excursion.title,
            excursion.coverImage,
            excursion.fullDescription || excursion.shortDescription,
            excursion.category,
            '/excursions',
            'ExcursionCard',
            'Excursion cover image'
          )
          results.push(result)
        }

        // Gallery images (first 3 only to avoid too many requests)
        if (excursion.images && Array.isArray(excursion.images)) {
          for (const img of excursion.images.slice(0, 3)) {
            const imageUrl = typeof img === 'string' ? img : img.url || ''
            if (imageUrl) {
              const result = await this.auditImage(
                `${excursion.id}-gallery-${excursion.images.indexOf(img)}`,
                'excursion',
                `${excursion.title} - Gallery`,
                imageUrl,
                excursion.fullDescription || excursion.shortDescription,
                excursion.category,
                '/excursions',
                'ExcursionGallery',
                'Excursion gallery image'
              )
              results.push(result)
            }
            
            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 500))
          }
        }
      }
      
      return results
    } catch (error) {
      console.error('Failed to audit excursion images:', error)
      return []
    }
  }

  /**
   * Audit all images from site-wide scan
   */
  async auditSiteWideImages(): Promise<ImageAuditResult[]> {
    const scanner = new SiteImageScanner()
    const siteImages = scanner.scanEntireSite()
    
    console.log(`Found ${siteImages.length} total images across the site`)
    console.log('Image counts by type:', scanner.getImageCounts(siteImages))
    
    const results: ImageAuditResult[] = []
    
    for (const siteImage of siteImages) {
      // Extract category/content from context
      let category = siteImage.component || ''
      let content = siteImage.context || siteImage.title
      
      // Determine category based on type
      if (siteImage.type === 'package') {
        category = 'Package Deal'
      } else if (siteImage.type === 'testimonial') {
        category = 'Testimonial'
      } else if (siteImage.type === 'page') {
        category = 'Static Page'
      } else if (siteImage.type === 'homepage') {
        category = 'Homepage Component'
      }
      
      const result = await this.auditImage(
        siteImage.id,
        siteImage.type as any,
        siteImage.title,
        siteImage.imageUrl,
        content,
        category,
        siteImage.page,
        siteImage.component,
        siteImage.context
      )
      results.push(result)
      
      // Rate limiting: wait between requests
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    return results
  }

  /**
   * Run full visual audit (site-wide)
   */
  async runFullAudit(): Promise<AuditSummary> {
    console.log('Starting comprehensive site-wide visual audit...')
    
    // Use site-wide scanner for complete coverage
    const results = await this.auditSiteWideImages()
    
    const needsCorrection = results.filter(r => r.suggestedImage).length
    
    return {
      totalAudited: results.length,
      needsCorrection,
      corrected: 0,
      results
    }
  }

  /**
   * Apply corrections (replace images)
   */
  async applyCorrections(results: ImageAuditResult[], apply: boolean = false): Promise<number> {
    if (!apply) {
      return 0
    }

    const dataDir = join(process.cwd(), 'data')
    let corrected = 0

    // Update blog posts
    const blogResults = results.filter(r => r.type === 'blog')
    if (blogResults.length > 0) {
      const blogFilePath = join(dataDir, 'generated-blog-posts.json')
      if (existsSync(blogFilePath)) {
        const posts = JSON.parse(readFileSync(blogFilePath, 'utf-8'))
        
        for (const result of blogResults) {
          if (result.suggestedImage) {
            const post = posts.find((p: any) => p.id.toString() === result.id)
            if (post) {
              post.image = result.suggestedImage
              corrected++
            }
          }
        }
        
        writeFileSync(blogFilePath, JSON.stringify(posts, null, 2))
      }
    }

    // Update excursions
    const excursionResults = results.filter(r => r.type === 'excursion')
    if (excursionResults.length > 0) {
      const excursionFilePath = join(dataDir, 'generated-excursions.json')
      if (existsSync(excursionFilePath)) {
        const excursions = JSON.parse(readFileSync(excursionFilePath, 'utf-8'))
        
        for (const result of excursionResults) {
          if (result.suggestedImage) {
            // Check if this is a gallery image or cover image
            const isGallery = result.id.includes('-gallery-')
            if (isGallery) {
              // Extract excursion ID and gallery index
              // Format: "excursion-{id}-gallery-{index}"
              const match = result.id.match(/^excursion-(\d+)-gallery-(\d+)$/)
              if (match) {
                const excursionId = match[1]
                const galleryIndex = parseInt(match[2]) || 0
                
                const excursion = excursions.find((e: any) => e.id.toString() === excursionId)
                if (excursion && excursion.images && excursion.images[galleryIndex]) {
                  if (typeof excursion.images[galleryIndex] === 'string') {
                    excursion.images[galleryIndex] = result.suggestedImage
                  } else {
                    excursion.images[galleryIndex].url = result.suggestedImage
                  }
                  corrected++
                }
              }
            } else {
              // Cover image - format: "excursion-{id}-cover" or just "{id}-cover"
              const match = result.id.match(/^excursion-(\d+)-cover$|^(\d+)-cover$/)
              if (match) {
                const excursionId = match[1] || match[2]
                const excursion = excursions.find((e: any) => e.id.toString() === excursionId)
                if (excursion) {
                  excursion.coverImage = result.suggestedImage
                  if (excursion.images && excursion.images.length > 0) {
                    if (typeof excursion.images[0] === 'string') {
                      excursion.images[0] = result.suggestedImage
                    } else {
                      excursion.images[0].url = result.suggestedImage
                    }
                  }
                  corrected++
                }
              } else {
                // Try direct ID match (legacy format)
                const excursion = excursions.find((e: any) => e.id.toString() === result.id)
                if (excursion) {
                  excursion.coverImage = result.suggestedImage
                  if (excursion.images && excursion.images.length > 0) {
                    if (typeof excursion.images[0] === 'string') {
                      excursion.images[0] = result.suggestedImage
                    } else {
                      excursion.images[0].url = result.suggestedImage
                    }
                  }
                  corrected++
                }
              }
            }
          }
        }
        
        writeFileSync(excursionFilePath, JSON.stringify(excursions, null, 2))
      }
    }

    // Note: Static/hardcoded images (homepage, packages, testimonials, etc.) 
    // cannot be auto-replaced but are still audited and shown in results
    const staticImageCount = results.filter(r => 
      ['homepage', 'package', 'testimonial', 'page', 'activity'].includes(r.type)
    ).filter(r => r.suggestedImage).length

    if (staticImageCount > 0) {
      console.log(`Note: ${staticImageCount} static/hardcoded images found that need manual replacement.`)
      console.log('These images are in component files and cannot be auto-replaced.')
      console.log('Please review the audit results and update them manually.')
    }

    return corrected
  }
}

