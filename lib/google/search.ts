/**
 * Google Custom Search API Client
 * Used to research information for blog posts
 */

interface GoogleSearchResult {
  title: string
  link: string
  snippet: string
  displayLink: string
}

interface GoogleSearchResponse {
  items?: GoogleSearchResult[]
  searchInformation?: {
    totalResults: string
  }
}

export class GoogleSearchClient {
  private apiKey: string
  private searchEngineId: string

  constructor(apiKey: string, searchEngineId: string) {
    this.apiKey = apiKey
    this.searchEngineId = searchEngineId
  }

  /**
   * Search Google for information about a topic
   */
  async search(query: string, numResults: number = 10): Promise<GoogleSearchResult[]> {
    try {
      const url = new URL('https://www.googleapis.com/customsearch/v1')
      url.searchParams.set('key', this.apiKey)
      url.searchParams.set('cx', this.searchEngineId)
      url.searchParams.set('q', query)
      url.searchParams.set('num', Math.min(numResults, 10).toString()) // Max 10 per request

      const response = await fetch(url.toString())
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Google Search API error:', errorText)
        throw new Error(`Google Search API error: ${response.status} ${response.statusText}`)
      }

      const data: GoogleSearchResponse = await response.json()
      
      return data.items || []
    } catch (error) {
      console.error('Failed to search Google:', error)
      return []
    }
  }

  /**
   * Search for multiple queries and combine results
   */
  async searchMultiple(queries: string[], numResultsPerQuery: number = 5): Promise<GoogleSearchResult[]> {
    const allResults: GoogleSearchResult[] = []
    
    for (const query of queries) {
      const results = await this.search(query, numResultsPerQuery)
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
   * Format search results as context for AI
   */
  formatResultsAsContext(results: GoogleSearchResult[]): string {
    if (results.length === 0) {
      return 'No search results available.'
    }

    return results
      .map((result, index) => {
        return `[Source ${index + 1}]
Title: ${result.title}
URL: ${result.displayLink}
Summary: ${result.snippet}`
      })
      .join('\n\n')
  }
}

/**
 * Create a Google Search client instance
 */
export function createGoogleSearchClient(): GoogleSearchClient {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID

  if (!apiKey || !searchEngineId) {
    throw new Error('GOOGLE_SEARCH_API_KEY and GOOGLE_SEARCH_ENGINE_ID environment variables are required')
  }

  return new GoogleSearchClient(apiKey, searchEngineId)
}

/**
 * Singleton instance
 */
let googleSearchClientInstance: GoogleSearchClient | null = null

export function getGoogleSearchClient(): GoogleSearchClient {
  if (!googleSearchClientInstance) {
    googleSearchClientInstance = createGoogleSearchClient()
  }
  return googleSearchClientInstance
}

