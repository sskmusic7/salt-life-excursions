/**
 * Viator Partner API (2.0) Client
 * Handles all API requests to Viator with proper authentication and headers
 */

import { ViatorAPIError } from './types'

interface ViatorClientConfig {
  apiKey: string
  baseUrl: string
  apiVersion: string
  defaultLanguage?: string
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  language?: string
  headers?: Record<string, string>
}

export class ViatorAPIClient {
  private config: ViatorClientConfig

  constructor(config: ViatorClientConfig) {
    this.config = {
      ...config,
      defaultLanguage: config.defaultLanguage || 'en-US',
    }
  }

  /**
   * Make a request to the Viator API
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      body,
      language = this.config.defaultLanguage,
      headers = {},
    } = options

    const url = `${this.config.baseUrl}${endpoint}`

    const requestHeaders: Record<string, string> = {
      'exp-api-key': this.config.apiKey,
      'Accept': `application/json;version=${this.config.apiVersion}`,
      'Accept-Language': language || this.config.defaultLanguage,
      'Accept-Encoding': 'gzip',
      ...headers,
    }

    if (body) {
      requestHeaders['Content-Type'] = 'application/json'
    }

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      })

      // Check rate limiting headers
      const rateLimitRemaining = response.headers.get('RateLimit-Remaining')
      const retryAfter = response.headers.get('Retry-After')

      if (response.status === 429) {
        const waitTime = retryAfter ? parseInt(retryAfter) : 60
        throw new Error(
          `Rate limit exceeded. Please retry after ${waitTime} seconds.`
        )
      }

      if (!response.ok) {
        const errorData: ViatorAPIError = await response.json()
        throw new Error(
          `Viator API Error (${errorData.code}): ${errorData.message}`
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        console.error('Viator API request failed:', error.message)
        throw error
      }
      throw new Error('Unknown error occurred during API request')
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body })
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body })
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body })
  }
}

/**
 * Create a configured Viator API client instance
 */
export function createViatorClient(): ViatorAPIClient {
  const env = (process.env.VIATOR_ENV || 'sandbox').toLowerCase()
  const isProduction = env === 'production'

  const apiKey =
    (isProduction ? process.env.VIATOR_API_KEY_PRODUCTION : process.env.VIATOR_API_KEY_SANDBOX) ||
    process.env.VIATOR_API_KEY // backward compatibility

  const baseUrl =
    process.env.NEXT_PUBLIC_VIATOR_API_URL ||
    (isProduction ? 'https://api.viator.com' : 'https://api.sandbox.viator.com')
  const apiVersion = process.env.NEXT_PUBLIC_VIATOR_API_VERSION || '2.0'
  const defaultLanguage = process.env.NEXT_PUBLIC_VIATOR_DEFAULT_LANGUAGE || 'en-US'

  if (!apiKey) {
    throw new Error('Missing Viator API key. Set VIATOR_API_KEY_PRODUCTION or VIATOR_API_KEY_SANDBOX (or legacy VIATOR_API_KEY) in .env.local')
  }

  return new ViatorAPIClient({
    apiKey,
    baseUrl,
    apiVersion,
    defaultLanguage,
  })
}

/**
 * Singleton instance for server-side usage
 */
let viatorClientInstance: ViatorAPIClient | null = null

export function getViatorClient(): ViatorAPIClient {
  if (!viatorClientInstance) {
    viatorClientInstance = createViatorClient()
  }
  return viatorClientInstance
}


