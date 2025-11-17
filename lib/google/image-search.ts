/**
 * Google Image Search Client
 * Uses Custom Search API with Image Search enabled
 */

interface GoogleImageResult {
  title: string
  link: string
  displayLink: string
  snippet: string
  mime: string
  image: {
    contextLink: string
    height: number
    width: number
    byteSize: number
    thumbnailLink: string
    thumbnailHeight: number
    thumbnailWidth: number
  }
}

interface GoogleImageSearchResponse {
  items?: GoogleImageResult[]
  searchInformation?: {
    totalResults: string
  }
}

export class GoogleImageSearchClient {
  private apiKey: string
  private searchEngineId: string

  constructor(apiKey: string, searchEngineId: string) {
    this.apiKey = apiKey
    this.searchEngineId = searchEngineId
  }

  /**
   * Search Google Images for a specific query
   */
  async searchImages(query: string, numResults: number = 10): Promise<GoogleImageResult[]> {
    try {
      const url = new URL('https://www.googleapis.com/customsearch/v1')
      url.searchParams.set('key', this.apiKey)
      url.searchParams.set('cx', this.searchEngineId)
      url.searchParams.set('q', query)
      url.searchParams.set('searchType', 'image') // Enable image search
      url.searchParams.set('num', Math.min(numResults, 10).toString()) // Max 10 per request
      url.searchParams.set('safe', 'active') // Safe search
      url.searchParams.set('imgType', 'photo') // Only photos, not clipart
      url.searchParams.set('imgSize', 'large') // Large images for quality

      const response = await fetch(url.toString())
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Google Image Search API error:', errorText)
        throw new Error(`Google Image Search API error: ${response.status} ${response.statusText}`)
      }

      const data: GoogleImageSearchResponse = await response.json()
      
      return data.items || []
    } catch (error) {
      console.error('Failed to search Google Images:', error)
      return []
    }
  }

  /**
   * Search for multiple queries and combine results
   */
  async searchMultipleQueries(queries: string[], numResultsPerQuery: number = 5): Promise<GoogleImageResult[]> {
    const allResults: GoogleImageResult[] = []
    
    for (const query of queries) {
      const results = await this.searchImages(query, numResultsPerQuery)
      allResults.push(...results)
      
      // Rate limiting: wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Remove duplicates based on link
    const uniqueResults = Array.from(
      new Map(allResults.map(item => [item.link, item])).values()
    )

    return uniqueResults
  }

  /**
   * Find the best matching image for a given topic
   */
  async findBestMatchingImage(
    topic: string,
    keywords: string[],
    currentImageUrl?: string
  ): Promise<GoogleImageResult | null> {
    // Build search query combining topic and keywords
    const searchQueries = [
      `${topic} ${keywords.join(' ')}`,
      `${keywords.join(' ')} Turks and Caicos`,
      topic
    ]

    const results = await this.searchMultipleQueries(searchQueries, 3)
    
    if (results.length === 0) {
      return null
    }

    // Return the first result (Google ranks by relevance)
    // Could enhance with Vision API comparison in the future
    return results[0]
  }
}

/**
 * Create a Google Image Search client instance
 */
export function createGoogleImageSearchClient(): GoogleImageSearchClient {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID

  if (!apiKey || !searchEngineId) {
    throw new Error('GOOGLE_SEARCH_API_KEY and GOOGLE_SEARCH_ENGINE_ID environment variables are required')
  }

  return new GoogleImageSearchClient(apiKey, searchEngineId)
}

/**
 * Singleton instance
 */
let googleImageSearchClientInstance: GoogleImageSearchClient | null = null

export function getGoogleImageSearchClient(): GoogleImageSearchClient {
  if (!googleImageSearchClientInstance) {
    googleImageSearchClientInstance = createGoogleImageSearchClient()
  }
  return googleImageSearchClientInstance
}

