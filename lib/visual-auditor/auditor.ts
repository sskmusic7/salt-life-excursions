/**
 * Visual Auditor
 * Audits images across the site and matches them with Google Image Search results
 * Post-processing: Google Image Search → Unsplash → AI Generation
 */

import { getGoogleImageSearchClient } from '@/lib/google/image-search'
import { getGoogleVisionClient } from '@/lib/google/vision'
import { getUnsplashClient } from '@/lib/unsplash/client'
import { getImageGenerator } from '@/lib/ai/image-generator'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

interface ImageAuditResult {
  id: string
  type: 'blog' | 'excursion' | 'activity'
  title: string
  currentImage: string
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
   * Audit a single image with post-processing
   */
  async auditImage(
    id: string,
    type: 'blog' | 'excursion' | 'activity',
    title: string,
    currentImage: string,
    content?: string,
    category?: string
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
          post.category
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
      
      for (const excursion of excursions.slice(0, 20)) { // Limit to first 20
        const result = await this.auditImage(
          excursion.id,
          'excursion',
          excursion.title,
          excursion.coverImage || '',
          excursion.fullDescription || excursion.shortDescription,
          excursion.category
        )
        results.push(result)
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      return results
    } catch (error) {
      console.error('Failed to audit excursion images:', error)
      return []
    }
  }

  /**
   * Run full visual audit
   */
  async runFullAudit(): Promise<AuditSummary> {
    console.log('Starting visual audit...')
    
    const [blogResults, excursionResults] = await Promise.all([
      this.auditBlogImages(),
      this.auditExcursionImages()
    ])
    
    const allResults = [...blogResults, ...excursionResults]
    const needsCorrection = allResults.filter(r => r.suggestedImage).length
    
    return {
      totalAudited: allResults.length,
      needsCorrection,
      corrected: 0,
      results: allResults
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
            const excursion = excursions.find((e: any) => e.id === result.id)
            if (excursion) {
              excursion.coverImage = result.suggestedImage
              if (excursion.images && excursion.images.length > 0) {
                excursion.images[0].url = result.suggestedImage
              }
              corrected++
            }
          }
        }
        
        writeFileSync(excursionFilePath, JSON.stringify(excursions, null, 2))
      }
    }

    return corrected
  }
}

