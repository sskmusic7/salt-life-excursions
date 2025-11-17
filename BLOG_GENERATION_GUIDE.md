# Blog Post Generation Guide

This guide explains how to use Gemini AI + Google Search API to generate comprehensive blog posts for the Salt Life Excursions website.

## Setup

### 1. Google Custom Search API Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select existing

2. **Enable Custom Search API**
   - Go to "APIs & Services" → "Library"
   - Search for "Custom Search API"
   - Click "Enable"

3. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

4. **Create Custom Search Engine**
   - Visit: https://cse.google.com/cse/
   - Click "Add" to create a new search engine
   - Set "Sites to search" to: `*` (search entire web)
   - Click "Create"
   - Go to "Setup" → "Basics"
   - Copy the "Search engine ID" (cx parameter)

5. **Add to Environment Variables**
   
   Add these to your `.env.local` file:
   ```env
   GOOGLE_SEARCH_API_KEY="your-api-key-here"
   GOOGLE_SEARCH_ENGINE_ID="your-search-engine-id-here"
   ```

### 2. Gemini API Setup

Make sure you have your Gemini API key set:

```env
GEMINI_API_KEY="your-gemini-api-key"
```

## Generating Blog Posts

### Option 1: Using the API Route (Recommended)

**Generate All Blog Posts:**

```bash
curl -X POST http://localhost:3000/api/generate/blog \
  -H "Content-Type: application/json" \
  -d '{
    "type": "bulk",
    "saveToFile": true
  }'
```

**Generate a Single Blog Post:**

```bash
curl -X POST http://localhost:3000/api/generate/blog \
  -H "Content-Type: application/json" \
  -d '{
    "type": "single",
    "title": "10 Best Beaches in Turks & Caicos",
    "category": "Travel Guide",
    "author": "Sarah Johnson",
    "topic": "best beaches Grace Bay Providenciales"
  }'
```

### Option 2: Using a Browser/Postman

1. Start your development server: `npm run dev`
2. Navigate to your API client (Postman, Insomnia, or browser console)
3. POST to: `http://localhost:3000/api/generate/blog`
4. Body (JSON):
   ```json
   {
     "type": "bulk",
     "saveToFile": true
   }
   ```

### Option 3: Create a Generation Page (Optional)

You can create a simple admin page at `/app/generate-blog/page.tsx`:

```tsx
'use client'

import { useState } from 'react'

export default function GenerateBlogPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const generateBlogs = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'bulk', saveToFile: true })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generate Blog Posts</h1>
      <button
        onClick={generateBlogs}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Generating...' : 'Generate All Blog Posts'}
      </button>
      {result && <pre className="mt-4">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
```

## How It Works

1. **Research Phase:**
   - Uses Google Custom Search API to research the blog topic
   - Searches for relevant information about Turks & Caicos
   - Gathers context from multiple sources

2. **Content Generation:**
   - Uses Gemini 2.0 Flash to write comprehensive blog posts
   - Incorporates research findings naturally
   - Generates 800-1200 word articles with proper structure

3. **Image Generation:**
   - Currently uses Unsplash for high-quality travel images
   - Images are matched to the blog post topic
   - Future: Will use Gemini 2.0 Flash (imagen-3) for AI-generated images

4. **Post Processing:**
   - Generates excerpts (200 characters)
   - Calculates read time (200 words/min)
   - Extracts relevant tags
   - Saves to `data/generated-blog-posts.json`

## Generated Blog Posts

The system generates these 6 blog posts:

1. **10 Best Beaches in Turks & Caicos You Must Visit** (Travel Guide)
2. **First-Time Visitor's Guide to Turks & Caicos** (Travel Tips)
3. **The Ultimate Snorkeling Guide: Best Spots & Tips** (Activities)
4. **Local Cuisine: Must-Try Dishes in TCI** (Food & Drink)
5. **Family-Friendly Activities in Providenciales** (Family Travel)
6. **Sustainable Tourism: Protecting Our Paradise** (Sustainability)

## Viewing Generated Posts

- **Blog List:** Visit `/blog` to see all generated posts
- **Blog Detail:** Click any post to view full content at `/blog/[id]`

## File Structure

```
data/
  generated-blog-posts.json    # Generated blog posts (auto-created)

app/
  api/generate/blog/route.ts   # Blog generation API
  blog/
    page.tsx                   # Blog listing page
    [id]/page.tsx              # Blog detail page

lib/
  gemini/
    blog-generator.ts          # Blog generation logic
    client.ts                  # Gemini API client (with image gen)
  google/
    search.ts                  # Google Search API client
```

## Notes

- **Google Search API:** Free tier: 100 searches/day. Paid: $5 per 1,000 queries
- **Gemini API:** Check pricing at https://ai.google.dev/pricing
- **Rate Limiting:** Blog generation includes delays between requests to avoid rate limits
- **Image Generation:** Currently uses Unsplash. Gemini imagen-3 integration coming soon.

## Troubleshooting

### Error: "GOOGLE_SEARCH_API_KEY not found"
- Make sure you've added the API key to `.env.local`
- Restart your dev server after adding env variables

### Error: "Failed to search Google"
- Check your API key is correct
- Verify Custom Search API is enabled in Google Cloud Console
- Check your daily quota hasn't been exceeded

### Blog posts not showing
- Generate blog posts first using the API route
- Check `data/generated-blog-posts.json` exists
- Verify the file has valid JSON content

