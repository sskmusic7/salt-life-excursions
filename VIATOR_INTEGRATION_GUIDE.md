# Viator Partner API Integration Guide

## 🎯 Overview

Your Salt Life Turks & Caicos website now has a complete integration with the Viator Partner API (2.0). This integration allows you to:

- Search and display real excursion/activity data from Viator
- Show real-time pricing and availability
- Process bookings (if you're a Full-access + Booking Affiliate or Merchant partner)
- Display customer reviews (with proper SEO protection)
- Search by destination, activity type, price range, and more

## 📋 Setup Checklist

### 1. Get Your Viator API Credentials

Contact your Viator account manager to get:
- **API Key** (`exp-api-key`)
- **Partner Type** (Basic Affiliate, Full Affiliate, Full + Booking Affiliate, or Merchant)
- **Environment URL** (Sandbox for testing, Production for live)

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp .env.example .env.local
```

Then edit `.env.local` and add your credentials:

```bash
VIATOR_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_VIATOR_API_URL=https://api.sandbox.viator.com
NEXT_PUBLIC_VIATOR_API_VERSION=2.0
NEXT_PUBLIC_VIATOR_DEFAULT_LANGUAGE=en-US
```

**Important:** 
- Use `https://api.sandbox.viator.com` for testing
- Use `https://api.viator.com` for production
- Never commit `.env.local` to version control

### 3. Test the Integration

Start your development server:

```bash
npm run dev
```

Test the API connection by visiting:
- http://localhost:3000/api/viator/products/5010SYDNEY (should return product details)

If you get an error about missing API key, double-check your `.env.local` file.

## 🚀 Using the API in Your Components

### Example 1: Search for Activities

```typescript
'use client'

import { useViatorProducts } from '@/lib/viator/hooks/useViatorProducts'

export function ActivitySearch() {
  const { products, loading, error } = useViatorProducts({
    searchTerm: 'snorkeling',
    filters: {
      destId: 123, // Turks & Caicos destination ID
      currency: 'USD'
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {products.map(product => (
        <div key={product.productCode}>
          <h3>{product.title}</h3>
          <p>${product.fromPrice}</p>
        </div>
      ))}
    </div>
  )
}
```

### Example 2: Display Product Details

```typescript
'use client'

import { useViatorProduct } from '@/lib/viator/hooks/useViatorProducts'

export function ActivityDetails({ productCode }: { productCode: string }) {
  const { product, loading, error } = useViatorProduct(productCode)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      {product.images.map((img, i) => (
        <img key={i} src={img.variants[0].url} alt={img.caption} />
      ))}
    </div>
  )
}
```

### Example 3: Show Reviews (Protected)

```typescript
import { ProtectedReviews } from '@/components/shared/ProtectedReviews'

export function ActivityPage({ productCode }: { productCode: string }) {
  return (
    <div>
      {/* Your product details here */}
      
      {/* Reviews - automatically protected from search engine indexing */}
      <ProtectedReviews productCode={productCode} pageSize={10} />
    </div>
  )
}
```

## 🔐 Important: Review Content Protection

**CRITICAL:** Viator requires that review content must NOT be indexed by search engines.

### What We've Already Implemented:

1. ✅ `robots.txt` blocks review API endpoints
2. ✅ Review API routes add `X-Robots-Tag: noindex, nofollow` header
3. ✅ `ProtectedReviews` component loads reviews dynamically via JavaScript

### What You Need to Do:

1. **Always use `ProtectedReviews` component** for displaying reviews
2. **Never** put review text directly in HTML source
3. **Don't** server-side render review content

❌ **Wrong:**
```tsx
<div>{review.text}</div> // This will be in HTML source
```

✅ **Correct:**
```tsx
<ProtectedReviews productCode="5010SYDNEY" />
```

## 📚 Available Services

### Product Service

```typescript
import { ViatorProductService } from '@/lib/viator'

// Get single product
const product = await ViatorProductService.getProduct('5010SYDNEY')

// Get multiple products
const products = await ViatorProductService.getProductsBulk(['5010SYDNEY', '10212P2'])

// Search products
const results = await ViatorProductService.searchProducts({
  filtering: {
    destId: 123,
    priceMin: 50,
    priceMax: 200
  }
})
```

### Search Service

```typescript
import { ViatorSearchService } from '@/lib/viator'

// Free-text search
const results = await ViatorSearchService.searchProducts('snorkeling', {
  destId: 123,
  currency: 'USD'
})
```

### Availability Service

```typescript
import { ViatorAvailabilityService } from '@/lib/viator'

// Check availability
const availability = await ViatorAvailabilityService.checkAvailability({
  productCode: '5010SYDNEY',
  productOptionCode: 'DEFAULT',
  travelDate: '2025-12-25',
  paxMix: [
    { ageBand: 'ADULT', numberOfTravelers: 2 },
    { ageBand: 'CHILD', numberOfTravelers: 1 }
  ]
})
```

### Booking Service (Merchant/Full-access + Booking Affiliate only)

```typescript
import { ViatorBookingService } from '@/lib/viator'

// Hold cart (optional)
const hold = await ViatorBookingService.holdCart({
  items: [/* booking items */],
  bookerInfo: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '+1234567890'
  },
  communication: {
    email: 'john@example.com',
    phone: '+1234567890'
  }
})

// Book cart
const booking = await ViatorBookingService.bookCart({
  // same structure as hold
})
```

## 🎨 Updating Your UI Components

### Current Status

Your website currently uses dummy data in components like:
- `components/home/FeaturedActivities.tsx`
- `components/home/LocationShowcase.tsx`
- `components/home/PackageDeals.tsx`

### Next Steps

1. **Replace dummy data with Viator data:**

```typescript
// Before (dummy data)
const activities = [
  { id: 1, title: 'Jet Ski Adventure', price: 129 },
  // ...
]

// After (Viator data)
const { products, loading } = useViatorProducts({
  searchTerm: 'Turks and Caicos',
  filters: { currency: 'USD' }
})
```

2. **Update components to use Viator product structure:**

```typescript
// Map Viator product to your UI
{products.map(product => (
  <ActivityCard
    key={product.productCode}
    title={product.title}
    price={product.summary?.fromPrice}
    image={product.images[0]?.variants[0]?.url}
    rating={product.reviewsInfo?.combinedAverageRating}
    reviews={product.reviewsInfo?.totalReviews}
  />
))}
```

## 🗺️ Finding Turks & Caicos Activities

### Step 1: Find the Destination ID

```typescript
import { ViatorLocationService } from '@/lib/viator'

const destinations = await ViatorLocationService.getDestinations()
const turksAndCaicos = destinations.destinations.find(d => 
  d.destinationName.includes('Turks')
)
console.log(turksAndCaicos.destId) // Use this ID
```

### Step 2: Search for Activities

```typescript
const results = await ViatorSearchService.searchProducts('', {
  destId: turksAndCaicos.destId, // From step 1
  currency: 'USD'
})
```

## 📊 Data Ingestion (Optional)

If you want to store Viator data in your own database:

### Initial Ingestion

```typescript
import { ViatorProductService, ViatorAvailabilityService } from '@/lib/viator'

// Get all products (paginated)
let cursor: string | undefined
let allProducts = []

do {
  const response = await ViatorProductService.getProductsModifiedSince(cursor)
  allProducts.push(...response.products)
  cursor = response.nextCursor
} while (cursor)

// Store in your database
// await db.products.insertMany(allProducts)
```

### Delta Updates (Run Hourly/Daily)

```typescript
const lastUpdate = '2025-10-29T10:00:00Z' // From your database

const updated = await ViatorProductService.getProductsModifiedSince(
  undefined, // cursor
  lastUpdate  // modifiedSince
)

// Update your database with changed products
```

## 🐛 Troubleshooting

### "VIATOR_API_KEY environment variable is required"

**Solution:** Make sure `.env.local` exists and contains your API key.

### "Rate limit exceeded"

**Solution:** Wait for the specified time before retrying. The Viator API has rate limits.

### Reviews are being indexed by Google

**Solution:** 
1. Verify `robots.txt` is in the `public` folder
2. Check that you're using `ProtectedReviews` component
3. Make sure reviews are loaded via JavaScript, not server-side

### Products not showing for Turks & Caicos

**Solution:** 
1. Find the correct `destId` for Turks & Caicos using the destinations endpoint
2. Use that `destId` in your search filters

### API returns 401 Unauthorized

**Solution:** 
1. Check your API key is correct
2. Verify you're using the right environment URL (sandbox vs production)
3. Make sure your API key is active (contact Viator support)

## 📖 Additional Resources

- [Viator Partner API Documentation](https://docs.viator.com/partner-api/merchant/technical/)
- [API Changelog](https://docs.viator.com/partner-api/merchant/technical/#section/Updates)
- [Content Protection Requirements](https://docs.viator.com/partner-api/merchant/technical/#section/Protecting-unique-content)
- [Booking Workflow Guide](https://docs.viator.com/partner-api/merchant/technical/#section/Booking-concepts)

## 🆘 Getting Help

- **Technical Issues:** Check the troubleshooting section above
- **API Access:** Contact your Viator account manager
- **Integration Support:** Email affiliateapi@tripadvisor.com

## ✅ Pre-Launch Checklist

Before going live with Viator integration:

- [ ] API key is configured for production environment
- [ ] `NEXT_PUBLIC_VIATOR_API_URL` points to production: `https://api.viator.com`
- [ ] Review content protection is implemented and tested
- [ ] `robots.txt` is deployed and accessible
- [ ] All dummy data is replaced with real Viator data
- [ ] Error handling is in place for all API calls
- [ ] Rate limiting is considered in your implementation
- [ ] SSL certificate is valid (required for API calls)
- [ ] Currency is set correctly (USD for Turks & Caicos)

## 🎉 You're Ready!

Your Salt Life website now has a powerful, production-ready integration with the Viator Partner API. Start by testing with sandbox data, then switch to production when you're ready to go live.

Happy coding! 🚀


