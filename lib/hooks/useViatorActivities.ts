/**
 * Custom hook for fetching Viator activities with pagination
 * Uses page-based pagination to work with Viator's API
 */

import { useState, useEffect, useCallback, useRef } from 'react'

export interface ViatorActivity {
  id: string
  title: string
  provider: string
  location: string
  price: number
  duration: string
  capacity?: string
  rating: number
  reviews: number
  image: string
  category?: string
  featured?: boolean
  bookingLink: string
  productCode: string
}

interface UseViatorActivitiesOptions {
  searchTerm?: string
  limit?: number
  autoLoad?: boolean
}

export function useViatorActivities(options: UseViatorActivitiesOptions = {}) {
  const { searchTerm = 'turks caicos', limit = 10, autoLoad = true } = options
  
  const [activities, setActivities] = useState<ViatorActivity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  
  // Use refs for values that need to persist
  const pageRef = useRef(1)
  const loadingRef = useRef(false)
  const mountedRef = useRef(true)
  const allProductCodesRef = useRef<Set<string>>(new Set())

  const fetchActivities = useCallback(async (reset = false) => {
    if (loadingRef.current) {
      console.log('⏳ Already loading, skipping')
      return
    }
    
    loadingRef.current = true
    setLoading(true)
    setError(null)
    
    try {
      const query = searchTerm || 'turks caicos'
      const currentPage = reset ? 1 : pageRef.current
      
      console.log(`📡 Fetching page ${currentPage}, limit=${limit}, reset=${reset}`)
      
      const response = await fetch(
        `/api/viator/search?query=${encodeURIComponent(query)}&page=${currentPage}&limit=${limit}&_t=${Date.now()}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log(`📥 Response:`, {
        success: data.success,
        count: data.count,
        totalCount: data.totalCount,
        page: data.page,
        hasMore: data.hasMore
      })
      
      if (!mountedRef.current) return
      
      if (data.success && data.products && Array.isArray(data.products)) {
        const transformed = data.products
          .filter((product: any) => product?.productCode && (product.productName || product.title))
          .map((product: any): ViatorActivity => {
            let price = 0
            if (product.pricing?.from) {
              price = typeof product.pricing.from === 'number' ? product.pricing.from : parseFloat(product.pricing.from) || 0
            }
            
            let imageUrl = ''
            if (product.images?.length > 0) {
              imageUrl = product.images[0]?.url || ''
            }
            
            return {
              id: product.productCode,
              title: product.productName || product.title || 'Activity',
              provider: 'Verified Provider',
              location: product.primaryDestinationName || 'Turks & Caicos',
              price,
              duration: product.duration || 'Varies',
              rating: product.rating || 0,
              reviews: product.reviewCount || 0,
              image: imageUrl,
              category: 'Activity',
              featured: false,
              bookingLink: product.bookingLink || `https://www.viator.com/tours/Turks-and-Caicos/${product.productCode}`,
              productCode: product.productCode,
            }
          })
          .filter((a: ViatorActivity) => a.id && a.title !== 'Activity')
        
        setTotalCount(data.totalCount || 0)
        
        if (reset) {
          // Reset: clear and set new activities
          allProductCodesRef.current = new Set(transformed.map((a: ViatorActivity) => a.id))
          setActivities(transformed)
          pageRef.current = 2 // Next page to fetch
          console.log(`✅ Reset: ${transformed.length} activities, next page: 2`)
        } else {
          // Append: only add truly new activities
          const newActivities = transformed.filter((a: ViatorActivity) => !allProductCodesRef.current.has(a.id))
          
          if (newActivities.length > 0) {
            newActivities.forEach((a: ViatorActivity) => allProductCodesRef.current.add(a.id))
            setActivities(prev => [...prev, ...newActivities])
            console.log(`✅ Added ${newActivities.length} new activities`)
          } else {
            console.log(`⚠️ No new unique activities in this batch`)
          }
          
          pageRef.current += 1
        }
        
        // Update hasMore based on API response
        setHasMore(data.hasMore ?? false)
        
      } else {
        throw new Error(data.error || 'No activities found')
      }
    } catch (err) {
      if (!mountedRef.current) return
      setError(err instanceof Error ? err.message : 'Failed to load')
      console.error('❌ Error:', err)
      setHasMore(false)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
      loadingRef.current = false
    }
  }, [searchTerm, limit])

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (autoLoad) {
      pageRef.current = 1
      allProductCodesRef.current.clear()
      setActivities([])
      setHasMore(true)
      setTotalCount(0)
      fetchActivities(true)
    }
  }, [searchTerm, autoLoad, fetchActivities])

  const loadMore = useCallback(() => {
    console.log(`🔄 loadMore: loading=${loadingRef.current}, hasMore=${hasMore}`)
    if (!loadingRef.current && hasMore) {
      fetchActivities(false)
    }
  }, [hasMore, fetchActivities])

  const refresh = useCallback(() => {
    pageRef.current = 1
    allProductCodesRef.current.clear()
    setActivities([])
    setHasMore(true)
    setTotalCount(0)
    fetchActivities(true)
  }, [fetchActivities])

  return {
    activities,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refresh,
  }
}
