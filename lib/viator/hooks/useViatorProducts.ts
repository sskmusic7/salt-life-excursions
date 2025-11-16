/**
 * React Hooks for Viator API
 * Client-side hooks for fetching Viator data
 */

'use client'

import { useEffect, useState } from 'react'

interface UseViatorProductsOptions {
  searchTerm: string
  filters?: {
    destId?: number
    startDate?: string
    endDate?: string
    currency?: string
    tags?: string[]
  }
}

interface UseViatorProductsResult {
  products: any[]
  loading: boolean
  error: string | null
  totalCount: number
}

/**
 * Hook to search for Viator products
 */
export function useViatorProducts({
  searchTerm,
  filters,
}: UseViatorProductsOptions): UseViatorProductsResult {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if (!searchTerm) {
      setProducts([])
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/viator/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ searchTerm, filters }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const result = await response.json()
        
        if (result.success && result.data) {
          setProducts(result.data.products || [])
          setTotalCount(result.data.totalCount || 0)
        } else {
          throw new Error(result.error || 'Failed to fetch products')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchTerm, JSON.stringify(filters)])

  return { products, loading, error, totalCount }
}

/**
 * Hook to get a single product
 */
export function useViatorProduct(productCode: string) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productCode) {
      setLoading(false)
      return
    }

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/viator/products/${productCode}`)

        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }

        const result = await response.json()
        
        if (result.success && result.data) {
          setProduct(result.data)
        } else {
          throw new Error(result.error || 'Failed to fetch product')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productCode])

  return { product, loading, error }
}

/**
 * Hook to check availability
 */
export function useViatorAvailability(availabilityRequest: any) {
  const [availability, setAvailability] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkAvailability = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/viator/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(availabilityRequest),
      })

      if (!response.ok) {
        throw new Error('Failed to check availability')
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        setAvailability(result.data)
      } else {
        throw new Error(result.error || 'Failed to check availability')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check availability')
    } finally {
      setLoading(false)
    }
  }

  return { availability, loading, error, checkAvailability }
}


