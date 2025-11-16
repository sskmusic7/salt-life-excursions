# Viator API Integration - Quick Start

## 🚀 Get Running in 5 Minutes

### 1. Add Your API Key (1 minute)

Create `.env.local` file in the project root:

```bash
VIATOR_API_KEY=your_api_key_here
NEXT_PUBLIC_VIATOR_API_URL=https://api.sandbox.viator.com
NEXT_PUBLIC_VIATOR_API_VERSION=2.0
NEXT_PUBLIC_VIATOR_DEFAULT_LANGUAGE=en-US
```

### 2. Start the Server (1 minute)

```bash
npm run dev
```

### 3. View the Demo (1 minute)

Open your browser to:
```
http://localhost:3000/viator-demo
```

You should see a working search page powered by Viator!

### 4. Test the API (1 minute)

Try these endpoints:
- http://localhost:3000/api/viator/products/5010SYDNEY
- Should return product details in JSON

### 5. Use in Your Code (1 minute)

**Client-side (in any component):**
```typescript
'use client'
import { useViatorProducts } from '@/lib/viator/hooks/useViatorProducts'

export function MyComponent() {
  const { products, loading } = useViatorProducts({
    searchTerm: 'Turks and Caicos',
    filters: { currency: 'USD' }
  })

  return <div>{products.length} activities found!</div>
}
```

**Server-side (in server components or API routes):**
```typescript
import { ViatorProductService } from '@/lib/viator'

export default async function Page() {
  const product = await ViatorProductService.getProduct('5010SYDNEY')
  return <div>{product.title}</div>
}
```

## 🎨 Pre-built Components

Use these ready-made components:

```typescript
import { ViatorSearchResults } from '@/components/viator/ViatorSearchResults'
import { ViatorActivityCard } from '@/components/viator/ViatorActivityCard'
import { ProtectedReviews } from '@/components/shared/ProtectedReviews'

// Full search page
<ViatorSearchResults initialSearchTerm="snorkeling" />

// Single activity card
<ViatorActivityCard product={product} />

// Reviews (automatically protected from search engines)
<ProtectedReviews productCode="5010SYDNEY" />
```

## ⚠️ Critical: Review Protection

**ALWAYS use `ProtectedReviews` component for reviews.**

Viator requires review content must NOT be indexed by search engines.

✅ Correct:
```tsx
<ProtectedReviews productCode="PRODUCT_CODE" />
```

❌ Wrong:
```tsx
<div>{review.text}</div>
```

## 📚 Full Documentation

- **Setup Guide:** [VIATOR_INTEGRATION_GUIDE.md](./VIATOR_INTEGRATION_GUIDE.md)
- **API Reference:** [lib/viator/README.md](./lib/viator/README.md)
- **Implementation Summary:** [VIATOR_IMPLEMENTATION_SUMMARY.md](./VIATOR_IMPLEMENTATION_SUMMARY.md)

## 🆘 Troubleshooting

**"VIATOR_API_KEY environment variable is required"**
→ Create `.env.local` file with your API key

**"404 Not Found"**
→ Make sure you're using a valid product code

**No results showing**
→ Check your API key is valid and for the right environment (sandbox vs production)

## 🎉 That's It!

You now have a working Viator integration. Check the demo page for examples!


