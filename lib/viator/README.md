# Viator Partner API (2.0) Integration

This directory contains a complete integration with the Viator Partner API v2.0 for the Salt Life Turks & Caicos excursions website.

## 📁 Directory Structure

```
lib/viator/
├── index.ts              # Main export file
├── client.ts             # API client with authentication
├── types.ts              # TypeScript type definitions
├── services/             # Service layer for each API domain
│   ├── products.ts       # Product content endpoints
│   ├── availability.ts   # Availability & pricing endpoints
│   ├── bookings.ts       # Booking operations
│   ├── search.ts         # Search endpoints
│   ├── reviews.ts        # Review endpoints
│   ├── locations.ts      # Location & destination endpoints
│   ├── attractions.ts    # Attraction endpoints
│   └── auxiliary.ts      # Exchange rates & supplier info
└── README.md            # This file
```

## 🚀 Getting Started

### 1. Set up environment variables

Create a `.env.local` file in the project root:

```bash
# Viator API Key (required)
VIATOR_API_KEY=your_api_key_here

# API Environment
NEXT_PUBLIC_VIATOR_API_URL=https://api.sandbox.viator.com

# API Version
NEXT_PUBLIC_VIATOR_API_VERSION=2.0

# Default language
NEXT_PUBLIC_VIATOR_DEFAULT_LANGUAGE=en-US
```

### 2. Import and use services

```typescript
import { ViatorProductService, ViatorSearchService } from '@/lib/viator'

// Search for products
const results = await ViatorSearchService.searchProducts('snorkeling', {
  destId: 123,
  currency: 'USD'
})

// Get product details
const product = await ViatorProductService.getProduct('10212P2')

// Check availability
const availability = await ViatorAvailabilityService.checkAvailability({
  productCode: '10212P2',
  productOptionCode: 'TG45',
  travelDate: '2025-12-01',
  paxMix: [{ ageBand: 'ADULT', numberOfTravelers: 2 }]
})
```

## 📚 Available Services

### ViatorProductService
- `getProduct(productCode, language?)` - Get single product details
- `getProductsBulk(productCodes[], language?)` - Get multiple products
- `getProductsModifiedSince(cursor?, modifiedSince?, language?)` - Delta updates
- `searchProducts(request, language?)` - Search with filters
- `getProductRecommendations(productCode, limit?, language?)` - Get recommendations
- `getProductTags(language?)` - Get available tags
- `getBookingQuestions(language?)` - Get booking question definitions

### ViatorAvailabilityService
- `getAvailabilitySchedule(productCode, currency?, language?)` - Get schedule for one product
- `getAvailabilitySchedulesBulk(productCodes[], currency?, language?)` - Bulk schedules
- `getAvailabilitySchedulesModifiedSince(cursor?, modifiedSince?, currency?, language?)` - Delta updates
- `checkAvailability(request, currency?, language?)` - Real-time availability check

### ViatorBookingService
- `holdCart(request, currency?, language?)` - Hold items (reserve inventory)
- `bookCart(request, currency?, language?)` - Book items (confirm booking)
- `getBookingStatus(bookingRef, language?)` - Get booking status
- `getCancelReasons(language?)` - Get cancellation reasons
- `getCancelQuote(bookingRef, reasonCode, language?)` - Get cancellation quote
- `cancelBooking(bookingRef, reasonCode, note?, language?)` - Cancel booking
- `checkAmendment(bookingRef, language?)` - Check if booking can be amended
- `getAmendmentQuote(...)` - Get quote for amendment
- `amendBooking(quoteRef, language?)` - Amend booking

### ViatorSearchService
- `freeTextSearch(request, language?)` - Free-text search
- `searchProducts(searchTerm, filters?, language?)` - Search products
- `searchDestinations(searchTerm, topX?, language?)` - Search destinations
- `searchAttractions(searchTerm, destId?, topX?, language?)` - Search attractions

### ViatorReviewService
- `getProductReviews(request, language?)` - Get product reviews
- `getProductReviewsPaginated(productCode, page?, pageSize?, language?)` - Paginated reviews
- `getAllProductReviews(productCode, language?, maxReviews?)` - Fetch all reviews

**⚠️ IMPORTANT:** Review content must NOT be indexed by search engines. See "Review Protection" section below.

### ViatorLocationService
- `getLocationsBulk(locationRefs[], language?)` - Get location details
- `getDestinations(language?)` - Get all destinations
- `getDestinationById(destId, language?)` - Get single destination
- `getDestinationsByParentId(parentId, language?)` - Get child destinations
- `searchDestinationsByName(searchTerm, language?)` - Search destinations

### ViatorAttractionService
- `searchAttractions(request, language?)` - Search attractions
- `getAttraction(attractionId, language?)` - Get attraction details
- `searchAttractionsByDestination(destId, searchTerm?, language?)` - Destination-based search
- `searchAttractionsByLocation(lat, lng, radiusKm?, searchTerm?, language?)` - Proximity search

### ViatorAuxiliaryService
- `getExchangeRates(language?)` - Get current exchange rates
- `searchSuppliersByProductCodes(productCodes[], language?)` - Get supplier info

## 🔐 Authentication

All API requests are authenticated using the `exp-api-key` header parameter. The client automatically adds this header to every request using the `VIATOR_API_KEY` environment variable.

## 🌍 Localization

The API supports multiple languages. Set the language per request:

```typescript
const product = await ViatorProductService.getProduct('10212P2', 'es')
```

Supported languages:
- English: `en-US`, `en-GB`, `en-AU`, `en-CA`
- Spanish: `es`, `es-AR`, `es-MX`
- French: `fr`, `fr-CA`
- German: `de`
- Italian: `it`
- Portuguese: `pt-BR`
- Japanese: `ja`
- And more...

## 🔒 Review Content Protection

**CRITICAL:** Viator requires that review content obtained via the API must NOT be indexed by search engines.

### Implementation

1. **API Route Protection:** Review API routes automatically add `X-Robots-Tag: noindex, nofollow` header
2. **Frontend Protection:** Load reviews via external JavaScript blocked in `robots.txt`
3. **robots.txt Configuration:** Add blocking rules (see below)

### robots.txt Example

```
User-Agent: *
Disallow: /api/viator/reviews
```

### Loading Reviews Correctly

❌ **Don't do this** (reviews in HTML source):
```tsx
<div>{review.text}</div>
```

✅ **Do this** (loaded dynamically):
```tsx
useEffect(() => {
  fetch('/api/viator/reviews/PRODUCT_CODE')
    .then(res => res.json())
    .then(data => setReviews(data))
}, [])
```

## 📊 Rate Limiting

The Viator API imposes rate limits. The client automatically checks for rate limit headers and throws an error if the limit is exceeded.

Rate limit headers:
- `RateLimit-Limit` - Maximum requests allowed
- `RateLimit-Remaining` - Requests remaining
- `RateLimit-Reset` - When the limit resets
- `Retry-After` - Seconds to wait before retrying

## 🏗️ Data Ingestion Strategy

For partners who want to ingest and store product data locally:

### Initial Ingestion

```typescript
// 1. Get all products
let cursor: string | undefined
let allProducts = []

while (true) {
  const response = await ViatorProductService.getProductsModifiedSince(cursor)
  allProducts = [...allProducts, ...response.products]
  
  if (!response.nextCursor) break
  cursor = response.nextCursor
}

// 2. Get availability schedules
cursor = undefined
let allSchedules = []

while (true) {
  const response = await ViatorAvailabilityService.getAvailabilitySchedulesModifiedSince(cursor)
  allSchedules = [...allSchedules, ...response.bookableItems]
  
  if (!response.nextCursor) break
  cursor = response.nextCursor
}
```

### Delta Updates

Run periodically (e.g., every hour):

```typescript
const lastUpdateTime = '2025-10-29T10:00:00Z' // Store this timestamp

// Get products modified since last update
const updatedProducts = await ViatorProductService.getProductsModifiedSince(
  undefined,
  lastUpdateTime
)

// Get availability schedules modified since last update
const updatedSchedules = await ViatorAvailabilityService.getAvailabilitySchedulesModifiedSince(
  undefined,
  lastUpdateTime
)

// Update your database with the changes
```

## 🎯 Partner Types & Access

Different partner types have access to different endpoints:

| Partner Type | Description | Transactional |
|--------------|-------------|---------------|
| Basic Affiliate | Limited product content | ❌ |
| Full Affiliate | All content, no transactions | ❌ |
| Full + Booking Affiliate | All content + cart booking | ✅ |
| Merchant | Full access including direct bookings | ✅ |

## 🔧 Error Handling

All services throw errors that can be caught and handled:

```typescript
try {
  const product = await ViatorProductService.getProduct('INVALID_CODE')
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message)
    // Handle specific error types
  }
}
```

## 📖 Additional Resources

- [Viator Partner API Documentation](https://docs.viator.com/partner-api/merchant/technical/)
- [API Version 2.0 Changelog](https://docs.viator.com/partner-api/merchant/technical/#section/Updates)
- [Content Ingestion Guide](https://docs.viator.com/partner-api/merchant/technical/#section/Key-concepts/Product-content-and-availability-endpoints)
- [Booking Workflow](https://docs.viator.com/partner-api/merchant/technical/#section/Booking-concepts)

## 🐛 Troubleshooting

### "VIATOR_API_KEY environment variable is required"
Make sure you've created `.env.local` with your API key.

### "Rate limit exceeded"
Wait for the time specified in the error message before retrying.

### "Cannot find module '@/lib/viator'"
Make sure TypeScript paths are configured correctly in `tsconfig.json`.

### Reviews are being indexed
Check that:
1. API routes add the `X-Robots-Tag` header
2. `robots.txt` blocks review endpoints
3. Reviews are loaded via JavaScript, not in HTML source

## 📝 License

This integration follows Viator's API terms of service. Review content protection is mandatory per their requirements.


