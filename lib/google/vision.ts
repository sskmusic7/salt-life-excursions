/**
 * Google Cloud Vision API Client
 * For analyzing image content using OCR and label detection
 */

interface VisionAnnotation {
  description: string
  score: number
  topicality?: number
}

interface VisionResponse {
  responses: Array<{
    labelAnnotations?: VisionAnnotation[]
    textAnnotations?: Array<{
      description: string
      boundingPoly?: any
    }>
    error?: {
      code: number
      message: string
    }
  }>
}

export class GoogleVisionClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Analyze an image URL to extract labels (what's in the image)
   */
  async analyzeImageLabels(imageUrl: string): Promise<string[]> {
    try {
      const url = `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [{
            image: {
              source: {
                imageUri: imageUrl
              }
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10
              }
            ]
          }]
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Google Vision API error:', errorText)
        return []
      }

      const data: VisionResponse = await response.json()
      
      if (data.responses[0]?.error) {
        console.error('Vision API error:', data.responses[0].error)
        return []
      }

      const labels = data.responses[0]?.labelAnnotations || []
      
      // Return labels sorted by score (confidence)
      return labels
        .filter(label => label.score > 0.7) // Only high-confidence labels
        .map(label => label.description)
    } catch (error) {
      console.error('Failed to analyze image with Vision API:', error)
      return []
    }
  }

  /**
   * Extract text from an image using OCR
   */
  async extractTextFromImage(imageUrl: string): Promise<string> {
    try {
      const url = `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [{
            image: {
              source: {
                imageUri: imageUrl
              }
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 1
              }
            ]
          }]
        })
      })

      if (!response.ok) {
        return ''
      }

      const data: VisionResponse = await response.json()
      
      if (data.responses[0]?.error || !data.responses[0]?.textAnnotations) {
        return ''
      }

      // Return the full text (first annotation is usually the full text)
      return data.responses[0].textAnnotations[0]?.description || ''
    } catch (error) {
      console.error('Failed to extract text with Vision API:', error)
      return ''
    }
  }

  /**
   * Compare two images to see if they're similar
   * Uses label detection to compare content
   */
  async compareImages(imageUrl1: string, imageUrl2: string): Promise<number> {
    try {
      const [labels1, labels2] = await Promise.all([
        this.analyzeImageLabels(imageUrl1),
        this.analyzeImageLabels(imageUrl2)
      ])

      if (labels1.length === 0 || labels2.length === 0) {
        return 0
      }

      // Calculate similarity based on common labels
      const commonLabels = labels1.filter(label => 
        labels2.some(l2 => l2.toLowerCase() === label.toLowerCase())
      )

      // Return similarity score (0-1)
      return commonLabels.length / Math.max(labels1.length, labels2.length)
    } catch (error) {
      console.error('Failed to compare images:', error)
      return 0
    }
  }
}

/**
 * Create a Google Vision client instance
 */
export function createGoogleVisionClient(): GoogleVisionClient | null {
  const apiKey = process.env.GOOGLE_VISION_API_KEY || process.env.GOOGLE_SEARCH_API_KEY

  if (!apiKey) {
    console.warn('GOOGLE_VISION_API_KEY not set. Vision API features will be disabled.')
    return null
  }

  return new GoogleVisionClient(apiKey)
}

/**
 * Singleton instance
 */
let googleVisionClientInstance: GoogleVisionClient | null = null

export function getGoogleVisionClient(): GoogleVisionClient | null {
  if (!googleVisionClientInstance) {
    googleVisionClientInstance = createGoogleVisionClient()
  }
  return googleVisionClientInstance
}

