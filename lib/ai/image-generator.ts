/**
 * AI Image Generator
 * Supports multiple image generation backends:
 * - Google Vertex AI Imagen 3
 * - Google Gemini (via Vertex AI)
 * - Fallback to Unsplash if generation fails
 */

import { getGeminiClient } from '@/lib/gemini/client'

export interface GeneratedImage {
  url: string
  source: 'imagen' | 'gemini' | 'unsplash' | 'fallback'
  prompt: string
  metadata?: {
    model?: string
    seed?: number
    guidanceScale?: number
  }
}

export class ImageGenerator {
  /**
   * Generate image using Vertex AI Imagen API
   * This requires @google-cloud/aiplatform package
   */
  async generateWithImagen(prompt: string): Promise<GeneratedImage | null> {
    try {
      // Check if we can use Vertex AI Imagen
      // This would require @google-cloud/aiplatform package
      // For now, we'll check environment variables and make a REST API call
      
      const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
      const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'
      const accessToken = process.env.GOOGLE_CLOUD_ACCESS_TOKEN

      if (!projectId && !accessToken) {
        console.warn('Imagen API: Missing GOOGLE_CLOUD_PROJECT_ID or GOOGLE_CLOUD_ACCESS_TOKEN')
        return null
      }

      // Use Vertex AI REST API directly
      // Note: This is a simplified version. For production, use @google-cloud/aiplatform
      const apiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagegeneration@006:predict`
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken ? `Bearer ${accessToken}` : '',
        },
        body: JSON.stringify({
          instances: [{
            prompt: prompt
          }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '16:9',
            negativePrompt: 'blurry, low quality, distorted, watermark, text'
          }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Imagen API error:', errorText)
        return null
      }

      const data = await response.json()
      
      if (data.predictions && data.predictions.length > 0) {
        return {
          url: data.predictions[0].bytesBase64Encoded 
            ? `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`
            : data.predictions[0].imageUri || '',
          source: 'imagen',
          prompt,
          metadata: {
            model: 'imagegeneration@006'
          }
        }
      }

      return null
    } catch (error) {
      console.error('Failed to generate image with Imagen:', error)
      return null
    }
  }

  /**
   * Generate image description/prompt using Gemini, then use it for image search
   * Gemini can't directly generate images, but we can use it to create better prompts
   */
  async generateWithGeminiEnhancedPrompt(
    originalPrompt: string,
    context?: string
  ): Promise<string> {
    try {
      const geminiClient = getGeminiClient()
      
      const enhancedPrompt = `
        You are a professional image search prompt generator for travel photography.
        Create an optimized, detailed image search prompt based on the following request.
        
        Original request: "${originalPrompt}"
        ${context ? `Context: ${context}` : ''}
        
        Requirements:
        - Focus on Turks & Caicos Islands specifically
        - Include visual details (colors, lighting, composition)
        - Emphasize distinctive features (white sand beaches, turquoise water, Caribbean style)
        - Make it suitable for high-quality stock photography search
        - Keep it concise (under 50 words)
        
        Return ONLY the optimized search prompt, no explanations.
      `

      const optimizedPrompt = await geminiClient.generateText(enhancedPrompt)
      return optimizedPrompt.trim()
    } catch (error) {
      console.error('Failed to enhance prompt with Gemini:', error)
      return originalPrompt // Fallback to original
    }
  }

  /**
   * Main image generation method with fallback chain
   * 1. Try Google Image Search (already done in audit)
   * 2. Try Unsplash search
   * 3. Try AI generation (Imagen/Gemini)
   */
  async generateImage(
    prompt: string,
    keywords: string[],
    context?: string
  ): Promise<GeneratedImage | null> {
    // Step 1: Try Imagen API first (if configured)
    const imagenResult = await this.generateWithImagen(prompt)
    if (imagenResult) {
      return imagenResult
    }

    // Step 2: Enhance prompt with Gemini for better results
    const enhancedPrompt = await this.generateWithGeminiEnhancedPrompt(prompt, context)
    
    // Step 3: Try Imagen again with enhanced prompt
    const imagenEnhancedResult = await this.generateWithImagen(enhancedPrompt)
    if (imagenEnhancedResult) {
      return imagenEnhancedResult
    }

    // If all AI generation fails, return null (caller should use Unsplash fallback)
    return null
  }

  /**
   * Generate image with full fallback chain:
   * 1. Google Image Search
   * 2. Unsplash
   * 3. AI Generation
   */
  async generateWithFullFallback(
    prompt: string,
    keywords: string[],
    googleImageUrl?: string,
    unsplashImageUrl?: string,
    context?: string
  ): Promise<GeneratedImage> {
    // If we already have good Google/Unsplash results, use them
    if (googleImageUrl) {
      return {
        url: googleImageUrl,
        source: 'unsplash', // Mark as from our primary source
        prompt,
      }
    }

    if (unsplashImageUrl) {
      return {
        url: unsplashImageUrl,
        source: 'unsplash',
        prompt,
      }
    }

    // Try AI generation
    const aiResult = await this.generateImage(prompt, keywords, context)
    if (aiResult) {
      return aiResult
    }

    // Final fallback
    return {
      url: `https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&h=800&fit=crop&q=80`, // Default Turks & Caicos image
      source: 'fallback',
      prompt,
    }
  }
}

/**
 * Create image generator instance
 */
let imageGeneratorInstance: ImageGenerator | null = null

export function getImageGenerator(): ImageGenerator {
  if (!imageGeneratorInstance) {
    imageGeneratorInstance = new ImageGenerator()
  }
  return imageGeneratorInstance
}

