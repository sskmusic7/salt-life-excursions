# Viator API Integration Guide

## Overview

The Viator integration allows your site to display **real-time activity listings** directly from Viator's API. The `/viator` page acts as a "window" or "mirror" to Viator's search engine, showing live data that updates automatically.

## Current Issue

🔴 **The Viator page is showing only 6 static mock listings because the API credentials are not configured.**

## Setup Instructions

### 1. Get Your Viator API Key

1. Sign up for a Viator Partner API account at: https://www.viator.com/partner-api
2. Request API access (you'll receive separate keys for **Sandbox** and **Production** environments)
3. Wait for activation (can take 1-3 business days)

### 2. Configure Environment Variables

Add these to your `.env.local` file (or Netlify environment variables):

```bash
# Viator Partner API
VIATOR_ENV="sandbox"  # Use "production" when ready for live data
VIATOR_API_KEY_SANDBOX="your-actual-sandbox-key-here"
VIATOR_API_KEY_PRODUCTION="your-actual-production-key-here"
```

### 3. Test the Connection

After adding your API key, test it:

```bash
# Visit this endpoint in your browser:
https://salt-life-excursions.netlify.app/api/viator/test
```

✅ **Success response:**
```json
{
  "success": true,
  "message": "Viator API is working!",
  "diagnostics": {
    "environment": "sandbox",
    "apiKeyConfigured": true,
    "productCount": 50
  }
}
```

❌ **Error response (no API key):**
```json
{
  "success": false,
  "error": "Viator API key not configured",
  "fix": "Add VIATOR_API_KEY_SANDBOX or VIATOR_API_KEY to your .env.local file"
}
```

### 4. Deploy to Netlify

Once testing locally works:

1. Go to: https://app.netlify.com (your site settings)
2. Navigate to: **Site settings → Environment variables**
3. Add the same variables:
   - `VIATOR_ENV` = `sandbox`
   - `VIATOR_API_KEY_SANDBOX` = `your-actual-key`
4. Click **"Save"**
5. Trigger a new deploy: **Deploys → Trigger deploy → Deploy site**

## How It Works

### Frontend (`/app/viator/page.tsx`)
- Auto-fetches Viator products on page load
- Acts as a real-time "window" to Viator's API
- Displays live activity listings with pricing, ratings, images
- Users can search and filter
- "Book Now" buttons link directly to Viator's booking pages

### Backend (`/app/api/viator/search/route.ts`)
- Calls Viator's `/partner/search/freetext` endpoint
- Transforms API response to our format
- **Falls back to 6 mock listings if API call fails** (current behavior)
- Returns 50 real listings when working properly

### Booking Flow
- Users click "Book Now" → Opens Viator's booking page in new tab
- Viator handles payment, confirmation, customer service
- You earn commission on each booking

## Troubleshooting

### Issue: Still seeing only 6 listings

**Causes:**
1. ❌ API key not set in environment variables
2. ❌ API key not activated by Viator yet
3. ❌ Wrong environment (using production key in sandbox mode)
4. ❌ IP not whitelisted (some Viator accounts require this)

**Solutions:**
1. ✅ Check `/api/viator/test` endpoint
2. ✅ Verify `.env.local` has the correct key
3. ✅ Check Netlify environment variables
4. ✅ Contact Viator support to activate your key
5. ✅ Check browser console for errors

### Issue: "Rate limit exceeded"

Viator has rate limits. If you see this:
- Wait 60 seconds
- Reduce search frequency
- Cache results on your end

### Issue: Products show but wrong location

Update the search term in `/app/viator/page.tsx`:

```typescript
const [searchTerm, setSearchTerm] = useState('turks caicos') // Change this
```

## API Endpoints

### Search Products
```
GET /api/viator/search?query=turks+caicos
```

### Test Connection
```
GET /api/viator/test
```

## Switching from Sandbox to Production

Once you're ready for live bookings and real commissions:

1. Get your production API key from Viator
2. Update environment variables:
   ```bash
   VIATOR_ENV="production"
   VIATOR_API_KEY_PRODUCTION="your-production-key"
   ```
3. Redeploy

## Support

- **Viator Partner Support**: https://www.viator.com/partner-support
- **API Documentation**: https://www.viator.com/partner-api/docs
- **Partner Resources**: https://partnerresources.viator.com

## Expected Behavior

### ✅ With API Key (Working)
- Shows 50+ real Viator activities
- Real pricing in USD
- Real ratings and reviews
- Direct booking links
- Auto-updates with Viator's inventory
- Different results for different search terms

### ❌ Without API Key (Current State)
- Shows only 6 static mock listings
- Same listings every time
- Generic pricing
- Console message: "Using demo data - Viator API key may need activation"

---

**Next Steps:**
1. Get Viator Partner API credentials
2. Add to `.env.local` and Netlify
3. Test with `/api/viator/test`
4. Redeploy
5. Verify live listings appear

