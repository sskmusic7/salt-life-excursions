/**
 * Google Gemini API Client
 * For generating excursion content using AI
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

export interface GeminiConfig {
  apiKey: string
  model?: string
}

export class GeminiClient {
  private genAI: GoogleGenerativeAI
  private model: string

  constructor(config: GeminiConfig) {
    this.genAI = new GoogleGenerativeAI(config.apiKey)
    this.model = config.model || 'gemini-2.0-flash-exp'
  }

  /**
   * Generate text content using Gemini
   */
  async generateText(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.model })
      const result = await model.generateContent(prompt)
      const response = result.response
      return response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Generate structured JSON content using Gemini
   */
  async generateJSON<T>(prompt: string): Promise<T> {
    const fullPrompt = `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanations, just the JSON object.`
    
    try {
      const text = await this.generateText(fullPrompt)
      
      // Extract JSON from response (in case it's wrapped in markdown)
      let jsonText = text.trim()
      
      // Remove markdown code blocks if present
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      }
      
      return JSON.parse(jsonText) as T
    } catch (error) {
      console.error('Failed to parse JSON from Gemini:', error)
      throw new Error(`Failed to generate JSON: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Generate image using Gemini/Imagen
   * Note: Image generation is not directly supported by the Generative AI SDK
   * This method is a placeholder for future Vertex AI Imagen integration
   * Currently, Unsplash is used as the primary image source
   */
  async generateImage(prompt: string): Promise<string | null> {
    // TODO: Implement image generation using Google Vertex AI Imagen API
    // The Generative AI SDK (@google/generative-ai) doesn't support image generation
    // You would need to use @google-cloud/aiplatform or Vertex AI REST API directly
    // For now, this returns null and the blog generator uses Unsplash
    
    console.warn('Image generation via Gemini requires Vertex AI Imagen API (not supported by Generative AI SDK). Using Unsplash fallback.')
    return null
  }

  /**
   * Generate content with retries
   */
  async generateWithRetry<T>(
    prompt: string,
    maxRetries: number = 3,
    parseAsJSON: boolean = false
  ): Promise<T | string> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (parseAsJSON) {
          return await this.generateJSON<T>(prompt)
        } else {
          return await this.generateText(prompt) as any
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        console.warn(`Attempt ${attempt}/${maxRetries} failed:`, lastError.message)
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        }
      }
    }

    throw lastError || new Error('Failed to generate content after retries')
  }
}

/**
 * Create a configured Gemini client instance
 */
export function createGeminiClient(): GeminiClient {
  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.NEXT_PUBLIC_GEMINI_MODEL

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required')
  }

  return new GeminiClient({ apiKey, model })
}

/**
 * Singleton instance
 */
let geminiClientInstance: GeminiClient | null = null

export function getGeminiClient(): GeminiClient {
  if (!geminiClientInstance) {
    geminiClientInstance = createGeminiClient()
  }
  return geminiClientInstance
}


