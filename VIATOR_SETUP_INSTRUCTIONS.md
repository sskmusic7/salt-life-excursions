# Viator API Setup Instructions

## Current Issue

The API is returning "Invalid API Key" because there's a mismatch:
- **Environment**: Set to `production`
- **API Key**: Using production key (`08b5f73f...`)
- **API URL**: Connecting to **sandbox** (`api.sandbox.viator.com`)

**Root Cause**: The environment variable `NEXT_PUBLIC_VIATOR_API_URL` is not set, so it's defaulting to sandbox URL even though `VIATOR_ENV=production`.

## Your API Keys

✅ **Sandbox Key**: `607fa819-4a5e-49aa-b896-f8e0e8a6d652`
✅ **Production Key**: `08b5f73f-5b13-40c8-846e-4077ceab17fc`

Both keys are **Enabled** in the Viator Partner Portal.

## Fix Options

### Option 1: Use Sandbox Environment (Recommended for Testing)

In your `.env.local` file, set:

```env
VIATOR_ENV=sandbox
VIATOR_API_KEY_SANDBOX=607fa819-4a5e-49aa-b896-f8e0e8a6d652
```

This will use:
- Sandbox API URL: `https://api.sandbox.viator.com`
- Sandbox API Key: `607fa819-4a5e-49aa-b896-f8e0e8a6d652`

### Option 2: Use Production Environment

In your `.env.local` file, set:

```env
VIATOR_ENV=production
VIATOR_API_KEY_PRODUCTION=08b5f73f-5b13-40c8-846e-4077ceab17fc
NEXT_PUBLIC_VIATOR_API_URL=https://api.viator.com
```

This will use:
- Production API URL: `https://api.viator.com`
- Production API Key: `08b5f73f-5b13-40c8-846e-4077ceab17fc`

## After Making Changes

1. **Restart your dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Test the API**:
   ```bash
   curl 'http://localhost:3000/api/viator/search?query=turks'
   ```

3. **Check browser console** at `http://localhost:3000/viator`

## Next Steps (Once Authentication Works)

1. **Get Turks & Caicos Destination ID**:
   - Call `/partner/destinations` endpoint
   - Search for "Turks and Caicos" or "Turks & Caicos"
   - Note the `destId`

2. **Update Search to Filter by Destination**:
   ```typescript
   {
     filtering: {
       destination: "2489" // TCI destination ID (verify this)
     },
     pagination: { offset: 0, limit: 50 },
     currency: "USD",
     sorting: { sortBy: "POPULARITY" }
   }
   ```

## Documentation References

- **Golden Path Guide**: See `Reference/Golden Path _ Basic Access Affiliate Partners - Viator Partner Resource Center.pdf`
- **Front-End Guide**: See `Reference/Front-End Guide - Viator Partner API.pdf`
- **API Spec**: See `VIATOR DOCUMENTATION.json`

## Basic Access Endpoints

For Basic Access partners, the main endpoint is:
- `POST /partner/products/search` - Search and filter products

Optional endpoints:
- `GET /partner/destinations` - Get all destinations
- `GET /partner/products/{product-code}` - Get single product details

