/**
 * Blog Post Generator using Gemini AI + Google Search
 * Generates comprehensive, well-researched blog posts
 */

import { getGeminiClient } from './client'
import { getGoogleSearchClient } from '@/lib/google/search'
import { getUnsplashClient } from '@/lib/unsplash/client'

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  tags?: string[]
}

interface BlogPostGenerationRequest {
  title: string
  category: string
  author: string
  topic?: string
}

export class BlogGenerator {
  /**
   * Generate a complete blog post with research and content
   */
  static async generateBlogPost(request: BlogPostGenerationRequest): Promise<BlogPost> {
    const geminiClient = getGeminiClient()
    let googleSearchClient: ReturnType<typeof getGoogleSearchClient> | null = null

    try {
      googleSearchClient = getGoogleSearchClient()
    } catch (error) {
      console.warn('Google Search API not configured, generating without research:', error)
    }

    // Step 1: Research the topic using Google Search
    let researchContext = ''
    if (googleSearchClient) {
      try {
        const searchQueries = [
          `${request.title} Turks and Caicos`,
          `${request.category} travel guide`,
          request.topic || request.title
        ]
        
        const searchResults = await googleSearchClient.searchMultiple(searchQueries, 5)
        researchContext = googleSearchClient.formatResultsAsContext(searchResults)
        
        console.log(`Found ${searchResults.length} research sources for: ${request.title}`)
      } catch (error) {
        console.error('Failed to research topic:', error)
      }
    }

    // Step 2: Generate blog content using Gemini
    const contentPrompt = this.buildContentPrompt(request, researchContext)
    const content = await geminiClient.generateWithRetry<string>(contentPrompt, 3, false)

    // Step 3: Generate excerpt
    const excerptPrompt = `Based on this blog post, create a compelling 1-2 sentence excerpt (max 200 characters) that summarizes the key points:\n\n${content.slice(0, 500)}\n\nExcerpt:`
    const excerpt = await geminiClient.generateText(excerptPrompt)
    
    // Step 4: Estimate read time (average reading speed: 200 words/min)
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)
    const readTimeStr = `${readTime} min read`

    // Step 5: Generate or fetch image
    let imageUrl = ''
    try {
      // Use Unsplash for high-quality travel photography
      // Note: Gemini 2.0 Flash doesn't directly support image generation via the Generative AI SDK
      // For image generation, you would need to use Google's Vertex AI or Imagen API separately
      // Unsplash provides excellent free stock photos perfect for travel blogs
      
      const unsplashClient = getUnsplashClient()
      const imageSearchTerm = request.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ')
      const images = await unsplashClient.searchPhotos(`turks caicos ${imageSearchTerm} vacation diverse`, 1)
      imageUrl = images[0]?.regularUrl || images[0]?.url || ''
      
      // Alternative: Future Gemini image generation (would require Vertex AI setup)
      // const imagePrompt = `High-quality, professional travel photography: ${request.title} in Turks and Caicos. Beautiful, vibrant colors, perfect composition, travel magazine style.`
      // const geminiImage = await geminiClient.generateImage(imagePrompt)
      // if (geminiImage) {
      //   imageUrl = geminiImage
      // }
    } catch (error) {
      console.error('Failed to get image:', error)
      imageUrl = 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2070'
    }

    // Step 6: Generate tags
    const tagsPrompt = `Extract 3-5 relevant hashtags/tags for this blog post title: "${request.title}". Return only the tags as a comma-separated list, no explanations.`
    const tagsText = await geminiClient.generateText(tagsPrompt)
    const tags = tagsText
      .split(',')
      .map(tag => tag.trim().replace(/^#/, ''))
      .filter(tag => tag.length > 0)
      .slice(0, 5)

    return {
      id: Date.now(), // Temporary ID
      title: request.title,
      excerpt: excerpt.trim().slice(0, 200),
      content,
      image: imageUrl,
      category: request.category,
      author: request.author,
      date: new Date().toISOString().split('T')[0],
      readTime: readTimeStr,
      tags
    }
  }

  /**
   * Build the content generation prompt with research context
   */
  private static buildContentPrompt(request: BlogPostGenerationRequest, researchContext: string): string {
    const hasResearch = researchContext.length > 0
    
    return `You are an expert travel writer specializing in Turks and Caicos Islands. Write a comprehensive, engaging blog post with the following requirements:

**Title:** ${request.title}
**Category:** ${request.category}
**Target Audience:** Travelers planning a trip to Turks and Caicos

**Research Context:**
${hasResearch ? researchContext : 'Write based on your knowledge of Turks and Caicos and best travel writing practices.'}

**Requirements:**
1. Write 800-1200 words of high-quality, informative content
2. Use a friendly, engaging tone that inspires travel
3. Include specific, accurate details about Turks and Caicos
4. Structure with clear headings (H2, H3) and paragraphs
5. Include practical tips and recommendations
6. Make it SEO-friendly with natural keyword integration
7. Use markdown formatting for headings, lists, and emphasis
8. ${hasResearch ? 'Incorporate insights from the research provided, but write in your own voice.' : 'Write from your knowledge, ensuring accuracy.'}
9. End with a compelling call-to-action encouraging readers to book activities

**Content Structure:**
- Introduction (engaging hook)
- Main content sections with subheadings
- Practical tips or recommendations
- Conclusion with call-to-action

Begin writing the blog post now:`
  }

  /**
   * Generate multiple blog posts from titles
   */
  static async generateMultipleBlogPosts(
    requests: BlogPostGenerationRequest[]
  ): Promise<BlogPost[]> {
    const posts: BlogPost[] = []

    for (const request of requests) {
      try {
        console.log(`Generating blog post: ${request.title}...`)
        const post = await this.generateBlogPost(request)
        posts.push(post)
        
        // Rate limiting: wait 2 seconds between posts
        if (requests.indexOf(request) < requests.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      } catch (error) {
        console.error(`Failed to generate blog post "${request.title}":`, error)
        // Continue with next post
      }
    }

    return posts
  }
}

