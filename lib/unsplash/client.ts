/**
 * Unsplash API Client
 * For fetching high-quality images for excursions
 */

export interface UnsplashImage {
  id: string
  url: string
  thumbnailUrl: string
  regularUrl: string
  fullUrl: string
  description: string | null
  altDescription: string | null
  photographer: string
  photographerUrl: string
  downloadLocation: string
}

export class UnsplashClient {
  private accessKey: string
  private baseUrl = 'https://api.unsplash.com'

  constructor(accessKey: string) {
    this.accessKey = accessKey
  }

  /**
   * Search for images
   */
  async searchPhotos(
    query: string,
    perPage: number = 10
  ): Promise<UnsplashImage[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${this.accessKey}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`)
      }

      const data = await response.json()

      return data.results.map((photo: any) => ({
        id: photo.id,
        url: photo.urls.raw,
        thumbnailUrl: photo.urls.thumb,
        regularUrl: photo.urls.regular,
        fullUrl: photo.urls.full,
        description: photo.description,
        altDescription: photo.alt_description,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        downloadLocation: photo.links.download_location,
      }))
    } catch (error) {
      console.error('Unsplash API error:', error)
      
      // Return placeholder if API fails
      return this.getPlaceholderImages(query, perPage)
    }
  }

  /**
   * Get a random photo
   */
  async getRandomPhoto(query?: string): Promise<UnsplashImage | null> {
    try {
      const url = query
        ? `${this.baseUrl}/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`
        : `${this.baseUrl}/photos/random?orientation=landscape`

      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${this.accessKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`)
      }

      const photo = await response.json()

      return {
        id: photo.id,
        url: photo.urls.raw,
        thumbnailUrl: photo.urls.thumb,
        regularUrl: photo.urls.regular,
        fullUrl: photo.urls.full,
        description: photo.description,
        altDescription: photo.alt_description,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        downloadLocation: photo.links.download_location,
      }
    } catch (error) {
      console.error('Failed to get random photo:', error)
      return null
    }
  }

  /**
   * Trigger download (required by Unsplash API guidelines)
   */
  async triggerDownload(downloadLocation: string): Promise<void> {
    try {
      await fetch(downloadLocation, {
        headers: {
          Authorization: `Client-ID ${this.accessKey}`,
        },
      })
    } catch (error) {
      console.error('Failed to trigger download:', error)
    }
  }

  /**
   * Get placeholder images (fallback)
   */
  private getPlaceholderImages(query: string, count: number): UnsplashImage[] {
    return Array.from({ length: count }, (_, i) => ({
      id: `placeholder-${i}`,
      url: `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop`,
      thumbnailUrl: `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop`,
      regularUrl: `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1080&h=720&fit=crop`,
      fullUrl: `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1280&fit=crop`,
      description: `${query} in Turks and Caicos`,
      altDescription: `${query} in Turks and Caicos`,
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadLocation: '',
    }))
  }
}

/**
 * Create configured Unsplash client
 */
export function createUnsplashClient(): UnsplashClient {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  if (!accessKey) {
    console.warn('UNSPLASH_ACCESS_KEY not configured, using placeholders')
    // Return client with dummy key - will use placeholders
    return new UnsplashClient('dummy-key')
  }

  return new UnsplashClient(accessKey)
}

/**
 * Singleton instance
 */
let unsplashClientInstance: UnsplashClient | null = null

export function getUnsplashClient(): UnsplashClient {
  if (!unsplashClientInstance) {
    unsplashClientInstance = createUnsplashClient()
  }
  return unsplashClientInstance
}


