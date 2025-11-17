# Visual Auditing System Guide

## Overview

The Visual Auditing System uses **Google Image Search** and **Google Vision API** to audit all images on your site and ensure they accurately match their content topics. For example, it verifies that beach images show the characteristic white sand beaches of Turks & Caicos, not brown sand beaches from other locations.

## How It Works

1. **Image Extraction**: Scans all blog posts and excursions to extract images and metadata
2. **Keyword Extraction**: Analyzes titles, content, and categories to identify relevant keywords
3. **Google Image Search**: Searches Google Images using extracted keywords (e.g., "yacht Turks and Caicos", "beach Grace Bay")
4. **Vision API Analysis** (Optional): Uses Google Vision API to detect labels in images (OCR/object detection)
5. **Matching**: Compares current images with Google Image Search results
6. **Correction**: Suggests and optionally replaces mismatched images with accurate ones

## Setup

### 1. Enable Image Search in Google Custom Search Engine

Your Custom Search Engine needs to have **Image Search** enabled:

1. Go to [Google Custom Search](https://programmablesearchengine.google.com/)
2. Select your search engine
3. Go to **Setup** → **Basics**
4. Ensure **"Search the entire web"** is enabled (or configure specific sites)
5. Go to **Setup** → **Features** → **Image Search**
6. Enable **"Image Search"**
7. Save changes

### 2. Enable Google Vision API (Optional but Recommended)

The Vision API enhances accuracy by analyzing image content:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the **Cloud Vision API**
3. Create credentials (API Key)
4. Add to your `.env.local`:

```env
GOOGLE_VISION_API_KEY="your-vision-api-key"
```

**Note**: You can use the same API key as Google Search if they're in the same project, or create a separate one.

### 3. Environment Variables

Add to your `.env.local`:

```env
# Required
GOOGLE_SEARCH_API_KEY="your-google-search-api-key"
GOOGLE_SEARCH_ENGINE_ID="your-custom-search-engine-id"

# Optional (for enhanced image analysis)
GOOGLE_VISION_API_KEY="your-google-vision-api-key"
```

## Usage

### Admin Interface

1. Navigate to: `/admin/visual-audit`
2. Select audit type:
   - **Full Audit**: Audits all images (blog posts + excursions)
   - **Blog Posts Only**: Only blog post images
   - **Excursions Only**: Only excursion images
3. Click **"Run Audit"**
4. Review results:
   - **Match Score**: Percentage match with Google Image Search results (0-100%)
   - **Current Image**: Your current image
   - **Suggested Image**: Better matching image from Google (if needed)
   - **Labels**: What Vision API detected in the image (if enabled)
   - **Keywords**: Search terms used
5. Click **"Apply All Corrections"** to automatically replace mismatched images

### API Endpoint

You can also trigger audits programmatically:

```bash
# Full audit
curl -X POST http://localhost:3000/api/visual-audit \
  -H "Content-Type: application/json" \
  -d '{"type": "full"}'

# Blog posts only
curl -X POST http://localhost:3000/api/visual-audit \
  -H "Content-Type: application/json" \
  -d '{"type": "blog"}'

# With auto-correction
curl -X POST http://localhost:3000/api/visual-audit \
  -H "Content-Type: application/json" \
  -d '{"type": "full", "applyCorrections": true}'
```

## Understanding Results

### Match Score

- **70-100%**: Excellent match ✅
- **40-70%**: Moderate match ⚠️ (may need correction)
- **0-40%**: Poor match ❌ (needs correction)

### Labels (Vision API)

If Vision API is enabled, it detects objects/features in images:
- `beach`, `white sand`, `turquoise water`
- `yacht`, `boat`, `sailing`
- `snorkeling`, `underwater`, `coral reef`
- etc.

### Keywords

Extracted from content:
- Title words (e.g., "yacht", "sunset", "cruise")
- Category (e.g., "Activities", "Travel Guide")
- Location mentions (e.g., "Grace Bay", "Turks", "Caicos")
- Content-specific terms (e.g., "snorkeling", "beach", "kayak")

## Example Use Cases

### Example 1: Beach Images

**Problem**: Blog post about "Grace Bay Beach" has an image of a brown sand beach.

**Audit Process**:
1. Extracts keywords: `grace bay`, `beach`, `white sand`, `turks caicos`
2. Searches Google Images: "Grace Bay beach Turks and Caicos white sand"
3. Finds matching images showing characteristic white sand and turquoise water
4. Compares with current image (Vision API: detects "brown sand", "tropical beach" but not "white sand")
5. Suggests replacement with accurate Grace Bay image

### Example 2: Yacht Images

**Problem**: Yacht excursion has generic yacht image, not Turks & Caicos-specific.

**Audit Process**:
1. Extracts keywords: `yacht`, `turks caicos`, `sunset`, `caribbean`
2. Searches Google Images: "yacht Turks and Caicos Caribbean sunset"
3. Finds images showing yachts in Turks & Caicos waters
4. Compares with current image (Vision API: detects "yacht", "ocean" but location unclear)
5. Suggests replacement with location-specific image

## Best Practices

1. **Run audits regularly** (e.g., after adding new content)
2. **Review suggestions before applying** (not all suggestions may be perfect)
3. **Use Vision API** for better accuracy (if budget allows)
4. **Check image licenses** when replacing images (Google Images results may have copyright restrictions)
5. **Consider Unsplash fallback** for free, high-quality images

## Troubleshooting

### No Image Search Results

- **Check**: Custom Search Engine has Image Search enabled
- **Check**: Search engine ID is correct
- **Check**: API key has permissions for Custom Search API
- **Try**: Different search queries (may need more specific keywords)

### Vision API Not Working

- **Check**: Vision API is enabled in Google Cloud Console
- **Check**: API key has Vision API permissions
- **Check**: Image URLs are publicly accessible (Vision API needs to fetch images)
- **Note**: Vision API is optional; system works without it (just less accurate)

### Rate Limiting

- **Issue**: Too many requests to Google APIs
- **Solution**: System includes rate limiting (500ms delay between images)
- **For bulk audits**: Consider running in batches (e.g., blog posts first, then excursions)

## Technical Details

### Google Image Search API

- **Endpoint**: `https://www.googleapis.com/customsearch/v1`
- **Parameters**: `searchType=image`, `imgType=photo`, `imgSize=large`
- **Rate Limits**: 100 queries/day (free tier), 10,000/day (paid)

### Google Vision API

- **Endpoint**: `https://vision.googleapis.com/v1/images:annotate`
- **Features Used**: `LABEL_DETECTION`, `TEXT_DETECTION` (optional)
- **Rate Limits**: Varies by quota

### Image Matching Algorithm

1. Extract keywords from content
2. Search Google Images with keywords
3. Get top 5-10 results
4. Analyze current image with Vision API (if available)
5. Compare labels with search results
6. Calculate match score (common labels / total labels)
7. Suggest replacement if score < 0.5 (50%)

## Future Enhancements

- [ ] OCR text extraction from images (check if text matches content)
- [ ] Color palette analysis (e.g., turquoise water detection)
- [ ] Landmark recognition (e.g., specific Turks & Caicos locations)
- [ ] Batch correction with approval workflow
- [ ] Integration with Unsplash API for free image alternatives
- [ ] Image similarity detection (avoid duplicates)

