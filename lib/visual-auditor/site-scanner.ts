/**
 * Site-Wide Image Scanner
 * Scans the entire site to find all images across all pages and components
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export interface SiteImage {
  id: string
  type: 'homepage' | 'blog' | 'excursion' | 'activity' | 'package' | 'testimonial' | 'page' | 'viator'
  title: string
  imageUrl: string
  page?: string
  component?: string
  context?: string
}

export class SiteImageScanner {
  /**
   * Extract images from homepage components
   */
  private scanHomepageImages(): SiteImage[] {
    const images: SiteImage[] = []
    
    // Hero background
    images.push({
      id: 'homepage-hero',
      type: 'homepage',
      title: 'Homepage Hero Background',
      imageUrl: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=2070',
      page: '/',
      component: 'Hero',
      context: 'Black family enjoying beach vacation in Turks & Caicos'
    })

    // Featured Activities (from generated excursions)
    try {
      const dataDir = join(process.cwd(), 'data')
      const excursionsPath = join(dataDir, 'generated-excursions.json')
      if (existsSync(excursionsPath)) {
        const excursions = JSON.parse(readFileSync(excursionsPath, 'utf-8'))
        excursions.slice(0, 6).forEach((exc: any, index: number) => {
          images.push({
            id: `homepage-featured-${exc.id}`,
            type: 'homepage',
            title: exc.title,
            imageUrl: exc.coverImage || exc.images[0]?.url || '',
            page: '/',
            component: 'FeaturedActivities',
            context: `Featured activity ${index + 1}`
          })
        })
      }
    } catch (error) {
      console.warn('Failed to scan featured activities:', error)
    }

    // Testimonials avatars
    const testimonialImages = [
      { name: 'Sarah Mitchell', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200' },
      { name: 'James Rodriguez', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200' },
      { name: 'Emily Chen', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200' },
      { name: 'Michael Thompson', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' },
      { name: 'Lisa Anderson', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200' },
      { name: 'David Kim', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' },
    ]
    
    testimonialImages.forEach((testimonial, index) => {
      images.push({
        id: `testimonial-${index + 1}`,
        type: 'testimonial',
        title: `Testimonial: ${testimonial.name}`,
        imageUrl: testimonial.url,
        page: '/',
        component: 'Testimonials',
        context: `Customer testimonial avatar`
      })
    })

    // Package Deals
    const packageImages = [
      { name: 'Adventure Seeker', url: 'https://images.unsplash.com/photo-1610484826922-3f84c2efcc89?q=80&w=2070' },
      { name: 'Luxury Escape', url: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b434b9?q=80&w=2070' },
      { name: 'Family Fun Pack', url: 'https://images.unsplash.com/photo-1605733160314-4f3d462f9529?q=80&w=2070' },
    ]
    
    packageImages.forEach((pkg, index) => {
      images.push({
        id: `homepage-package-${index + 1}`,
        type: 'package',
        title: `Package: ${pkg.name}`,
        imageUrl: pkg.url,
        page: '/',
        component: 'PackageDeals',
        context: `Homepage package deal`
      })
    })

    // Location Showcase (if used)
    const locationImages = [
      { title: 'Luxury Yacht Sunset Cruise', url: 'https://images.unsplash.com/photo-1576169495465-bbbf3d4f4b3c?q=80&w=300' },
      { title: 'Jet Ski Island Adventure', url: 'https://images.unsplash.com/photo-1626198304462-1a50a62ddb29?q=80&w=300' },
      { title: 'Snorkeling & Diving Experience', url: 'https://images.unsplash.com/photo-1582738412028-8b5bff7f8273?q=80&w=300' },
      { title: 'ATV Beach & Trail Adventure', url: 'https://images.unsplash.com/photo-1619317211153-6a40f3cfd540?q=80&w=300' },
      { title: 'See-Through Kayak Tour', url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=300' },
    ]
    
    locationImages.forEach((loc, index) => {
      images.push({
        id: `homepage-location-${index + 1}`,
        type: 'homepage',
        title: loc.title,
        imageUrl: loc.url,
        page: '/',
        component: 'LocationShowcase',
        context: `Location showcase activity`
      })
    })

    return images
  }

  /**
   * Extract images from static pages
   */
  private scanStaticPageImages(): SiteImage[] {
    const images: SiteImage[] = []

    // About page
    images.push({
      id: 'about-hero',
      type: 'page',
      title: 'About Page Hero',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
      page: '/about',
      component: 'Hero',
      context: 'About page background'
    })

    // Contact page
    images.push({
      id: 'contact-hero',
      type: 'page',
      title: 'Contact Page Hero',
      imageUrl: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070',
      page: '/contact',
      component: 'Hero',
      context: 'Contact page background'
    })

    // Viator page
    images.push({
      id: 'viator-hero',
      type: 'viator',
      title: 'Viator Page Hero',
      imageUrl: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=2070',
      page: '/viator',
      component: 'Hero',
      context: 'Viator activities page background'
    })

    return images
  }

  /**
   * Extract images from activities page
   */
  private scanActivitiesPageImages(): SiteImage[] {
    const images: SiteImage[] = []

    const activityImages = [
      { id: 1, title: 'Luxury Yacht Sunset Cruise', url: 'https://images.unsplash.com/photo-1576169495465-bbbf3d4f4b3c?q=80&w=2070' },
      { id: 2, title: 'Jet Ski Island Adventure', url: 'https://images.unsplash.com/photo-1626198304462-1a50a62ddb29?q=80&w=2070' },
      { id: 3, title: 'Snorkeling & Diving Experience', url: 'https://images.unsplash.com/photo-1582738412028-8b5bff7f8273?q=80&w=2070' },
      { id: 4, title: 'ATV Beach & Trail Adventure', url: 'https://images.unsplash.com/photo-1619317211153-6a40f3cfd540?q=80&w=300' },
      { id: 5, title: 'See-Through Kayak Tour', url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2070' },
      { id: 6, title: 'VIP Concierge Dining', url: 'https://images.unsplash.com/photo-1520201163981-8e0a1c6abbf9?q=80&w=2070' },
      { id: 7, title: 'Private Beach Picnic', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070' },
      { id: 8, title: 'Island Hopping Adventure', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070' },
    ]

    activityImages.forEach((activity) => {
      images.push({
        id: `activity-${activity.id}`,
        type: 'activity',
        title: activity.title,
        imageUrl: activity.url,
        page: '/activities',
        component: 'ActivityCard',
        context: `Activity listing`
      })
    })

    // Activity detail page gallery images
    const detailPageImages = [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800',
    ]

    detailPageImages.forEach((img, index) => {
      images.push({
        id: `activity-detail-gallery-${index + 1}`,
        type: 'activity',
        title: `Activity Detail Gallery Image ${index + 1}`,
        imageUrl: img,
        page: '/activities/[id]',
        component: 'ImageGallery',
        context: `Activity detail page gallery`
      })
    })

    // Provider logo
    images.push({
      id: 'activity-provider-logo',
      type: 'activity',
      title: 'Provider Logo',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=100',
      page: '/activities/[id]',
      component: 'ProviderInfo',
      context: `Activity provider logo`
    })

    return images
  }

  /**
   * Extract images from packages page
   */
  private scanPackagesPageImages(): SiteImage[] {
    const images: SiteImage[] = []

    const packageImages = [
      { id: 1, name: 'Adventure Seeker', url: 'https://images.unsplash.com/photo-1610484826922-3f84c2efcc89?q=80&w=2070' },
      { id: 2, name: 'Luxury Escape', url: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b434b9?q=80&w=2070' },
      { id: 3, name: 'Family Fun Pack', url: 'https://images.unsplash.com/photo-1605733160314-4f3d462f9529?q=80&w=2070' },
      { id: 4, name: 'Romantic Getaway', url: 'https://images.unsplash.com/photo-1511295742362-c92ceddbd5fd?q=80&w=2070' },
      { id: 5, name: 'Island Explorer', url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2070' },
      { id: 6, name: 'Water Sports Combo', url: 'https://images.unsplash.com/photo-1626198304462-1a50a62ddb29?q=80&w=2070' },
    ]

    packageImages.forEach((pkg) => {
      images.push({
        id: `package-${pkg.id}`,
        type: 'package',
        title: `Package: ${pkg.name}`,
        imageUrl: pkg.url,
        page: '/packages',
        component: 'PackageCard',
        context: `Package deal listing`
      })
    })

    return images
  }

  /**
   * Extract images from blog posts
   */
  private scanBlogImages(): SiteImage[] {
    const images: SiteImage[] = []
    const dataDir = join(process.cwd(), 'data')
    const filePath = join(dataDir, 'generated-blog-posts.json')
    
    if (!existsSync(filePath)) {
      return images
    }

    try {
      const fileContent = readFileSync(filePath, 'utf-8')
      const posts = JSON.parse(fileContent)
      
      posts.forEach((post: any) => {
        images.push({
          id: `blog-${post.id}`,
          type: 'blog',
          title: post.title,
          imageUrl: post.image,
          page: '/blog',
          component: 'BlogPost',
          context: `Blog post cover image`
        })
      })
    } catch (error) {
      console.error('Failed to scan blog images:', error)
    }

    return images
  }

  /**
   * Extract images from excursions
   */
  private scanExcursionImages(): SiteImage[] {
    const images: SiteImage[] = []
    const dataDir = join(process.cwd(), 'data')
    const filePath = join(dataDir, 'generated-excursions.json')
    
    if (!existsSync(filePath)) {
      return images
    }

    try {
      const fileContent = readFileSync(filePath, 'utf-8')
      const excursions = JSON.parse(fileContent)
      
      excursions.forEach((excursion: any) => {
        // Cover image
        if (excursion.coverImage) {
          images.push({
            id: `excursion-cover-${excursion.id}`,
            type: 'excursion',
            title: excursion.title,
            imageUrl: excursion.coverImage,
            page: '/excursions',
            component: 'ExcursionCard',
            context: `Excursion cover image`
          })
        }

        // Gallery images
        if (excursion.images && Array.isArray(excursion.images)) {
          excursion.images.forEach((img: any, index: number) => {
            const imageUrl = typeof img === 'string' ? img : img.url || ''
            if (imageUrl) {
              images.push({
                id: `excursion-gallery-${excursion.id}-${index}`,
                type: 'excursion',
                title: `${excursion.title} - Image ${index + 1}`,
                imageUrl,
                page: '/excursions',
                component: 'ExcursionGallery',
                context: `Excursion gallery image ${index + 1}`
              })
            }
          })
        }
      })
    } catch (error) {
      console.error('Failed to scan excursion images:', error)
    }

    return images
  }

  /**
   * Scan itinerary page images
   */
  private scanItineraryImages(): SiteImage[] {
    const images: SiteImage[] = []

    const itineraryImages = [
      { id: 1, title: 'Luxury Yacht Sunset Cruise', url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=300' },
      { id: 2, title: 'Jet Ski Island Adventure', url: 'https://images.unsplash.com/photo-1626297753255-e6f29d39dece?q=80&w=300' },
      { id: 3, title: 'Snorkeling & Diving Experience', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=300' },
      { id: 4, title: 'ATV Beach & Trail Adventure', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=300' },
      { id: 5, title: 'See-Through Kayak Tour', url: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?q=80&w=300' },
      { id: 6, title: 'VIP Concierge Dining', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300' },
    ]

    itineraryImages.forEach((activity) => {
      images.push({
        id: `itinerary-${activity.id}`,
        type: 'activity',
        title: activity.title,
        imageUrl: activity.url,
        page: '/itinerary',
        component: 'ItineraryActivity',
        context: `Itinerary builder activity`
      })
    })

    return images
  }

  /**
   * Scan blog fallback images
   */
  private scanBlogFallbackImages(): SiteImage[] {
    const images: SiteImage[] = []

    const fallbackImages = [
      { id: 1, title: '10 Best Beaches in Turks & Caicos You Must Visit', url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1070' },
      { id: 2, title: "First-Time Visitor's Guide to Turks & Caicos", url: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=1070' },
      { id: 3, title: 'The Ultimate Snorkeling Guide: Best Spots & Tips', url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1070' },
      { id: 4, title: 'Local Cuisine: Must-Try Dishes in TCI', url: 'https://images.unsplash.com/photo-1544521003-6ff72dc9ba3b?q=80&w=1070' },
      { id: 5, title: 'Family-Friendly Activities in Providenciales', url: 'https://images.unsplash.com/photo-1662756070014-e1cedc4c1e1b?q=80&w=1070' },
      { id: 6, title: 'Sustainable Tourism: Protecting Our Paradise', url: 'https://images.unsplash.com/photo-1692964870783-351ebe62edc6?q=80&w=1070' },
    ]

    fallbackImages.forEach((post) => {
      images.push({
        id: `blog-fallback-${post.id}`,
        type: 'blog',
        title: post.title,
        imageUrl: post.url,
        page: '/blog',
        component: 'BlogFallback',
        context: `Blog fallback image`
      })
    })

    return images
  }

  /**
   * Scan entire site for all images
   */
  scanEntireSite(): SiteImage[] {
    const allImages: SiteImage[] = []

    // Homepage
    allImages.push(...this.scanHomepageImages())

    // Static pages
    allImages.push(...this.scanStaticPageImages())

    // Activities page
    allImages.push(...this.scanActivitiesPageImages())

    // Packages page
    allImages.push(...this.scanPackagesPageImages())

    // Blog posts (generated + fallback)
    allImages.push(...this.scanBlogImages())
    allImages.push(...this.scanBlogFallbackImages())

    // Excursions
    allImages.push(...this.scanExcursionImages())

    // Itinerary
    allImages.push(...this.scanItineraryImages())

    // Remove duplicates (same URL)
    const uniqueImages = Array.from(
      new Map(allImages.map(img => [img.imageUrl, img])).values()
    )

    return uniqueImages
  }

  /**
   * Get count of images by type
   */
  getImageCounts(images: SiteImage[]): Record<string, number> {
    const counts: Record<string, number> = {}
    
    images.forEach(img => {
      counts[img.type] = (counts[img.type] || 0) + 1
    })
    
    return counts
  }
}

