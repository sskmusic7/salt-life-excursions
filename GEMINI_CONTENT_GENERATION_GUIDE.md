# Gemini AI Content Generation Guide

## 🎯 Overview

Your Salt Life website now has an AI-powered content generation system that creates realistic excursion descriptions, itineraries, and fetches beautiful images automatically using:

- **Gemini 2.5** - Google's latest AI for generating text content
- **Unsplash API** - High-quality, free stock photography

## 🚀 Quick Start (5 Minutes)

### Step 1: Get Your Gemini API Key

1. **Visit**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click** "Create API Key"
4. **Copy** your API key

### Step 2: Get Unsplash API Key (Optional but Recommended)

1. **Visit**: https://unsplash.com/developers
2. **Sign up** for a free account
3. **Create** a new application
4. **Copy** your Access Key

### Step 3: Add API Keys to Your Project

Create or update `.env.local` in your project root:

```bash
# Gemini AI (Required)
GEMINI_API_KEY=your_actual_gemini_key_here
NEXT_PUBLIC_GEMINI_MODEL=gemini-2.0-flash-exp

# Unsplash (Optional - will use placeholders if missing)
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
```

### Step 4: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Generate Content!

1. **Open**: http://localhost:3000/generate-content
2. **Click**: "Generate Excursions with AI"
3. **Wait**: 5-10 minutes while it generates 20+ excursions
4. **Done**: Data saved to `/data/generated-excursions.json`

## 📋 What Gets Generated

For each excursion, Gemini creates:

### Text Content
- **Title**: Catchy, SEO-friendly titles
- **Descriptions**: 
  - Short description (150-200 chars)
  - Full description (3-4 paragraphs)
- **Highlights**: 5-7 key selling points
- **Itinerary**: Step-by-step activity breakdown
- **Included/Not Included**: What's in the price
- **What to Bring**: Essential items list
- **Important Info**: Restrictions, requirements

### Metadata
- **Pricing**: Adult, child, infant rates in USD
- **Duration**: Hours and minutes
- **Difficulty**: Easy, Moderate, Challenging, or Extreme
- **Group Size**: Min age and max participants
- **Category**: Water Sports, Adventure, Luxury, etc.
- **Tags**: For searching and filtering
- **Availability**: Days, times, booking requirements
- **Location**: Meeting points, areas, end points
- **Cancellation Policy**: Terms and conditions

### Images
- **5 High-Quality Photos** per excursion from Unsplash
- **Relevant to Activity**: Jet ski, snorkeling, yacht, etc.
- **Turks & Caicos Themed**: Caribbean, beach, ocean

## 📂 Generated Data Structure

The data is saved to `/data/generated-excursions.json`:

```json
[
  {
    "id": "exc_1234567890_abc123",
    "title": "Ultimate Jet Ski Adventure Tour",
    "slug": "ultimate-jet-ski-adventure-tour",
    "shortDescription": "Experience the thrill of riding...",
    "fullDescription": "Embark on an unforgettable journey...",
    "highlights": [
      "Professional guide and instruction",
      "All safety equipment provided",
      "Stunning Grace Bay views"
    ],
    "itinerary": [
      {
        "step": 1,
        "time": "09:00 AM",
        "location": "Grace Bay Beach",
        "description": "Safety briefing and equipment",
        "duration": 15
      }
    ],
    "pricing": {
      "adult": 129,
      "child": 89,
      "currency": "USD"
    },
    "images": [
      {
        "url": "https://images.unsplash.com/...",
        "thumbnail": "https://images.unsplash.com/...",
        "alt": "Jet skiing in Turks and Caicos",
        "photographer": "John Doe",
        "photographerUrl": "https://unsplash.com/@johndoe"
      }
    ],
    "coverImage": "https://images.unsplash.com/...",
    "category": "Water Sports",
    "tags": ["jet-ski", "adventure", "water-sports"],
    "duration": {
      "hours": 2,
      "minutes": 30
    }
  }
]
```

## 🎨 Using Generated Data in Your Components

### Example 1: Display All Excursions

```typescript
import generatedExcursions from '@/data/generated-excursions.json'

export default function ActivitiesPage() {
  return (
    <div>
      {generatedExcursions.map((excursion) => (
        <ExcursionCard key={excursion.id} excursion={excursion} />
      ))}
    </div>
  )
}
```

### Example 2: Filter by Category

```typescript
import generatedExcursions from '@/data/generated-excursions.json'

const waterSportsActivities = generatedExcursions.filter(
  (exc) => exc.category === 'Water Sports'
)
```

### Example 3: Search by Keywords

```typescript
import generatedExcursions from '@/data/generated-excursions.json'

function searchExcursions(query: string) {
  return generatedExcursions.filter((exc) =>
    exc.title.toLowerCase().includes(query.toLowerCase()) ||
    exc.tags.some((tag) => tag.includes(query.toLowerCase()))
  )
}
```

## 🔧 Customization

### Generate Specific Activities

You can generate custom excursions by calling the API directly:

```typescript
const response = await fetch('/api/generate/excursions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'single',
    activityType: 'Private Yacht Charter',
    location: 'Turks & Caicos',
    priceRange: 'luxury',
    duration: 'full-day',
  }),
})
```

### Re-generate Content

To generate fresh content:
1. Delete `/data/generated-excursions.json`
2. Visit `/generate-content` again
3. Click "Generate Excursions with AI"

## 💰 Cost Considerations

### Gemini API
- **Free Tier**: 60 requests per minute
- **Cost**: Very low (fractions of a cent per request)
- **Generating 20 excursions**: Less than $0.10

### Unsplash API
- **Free Tier**: 50 requests per hour
- **Cost**: Completely FREE
- **Note**: Requires attribution (photographer credit)

## 🐛 Troubleshooting

### "GEMINI_API_KEY environment variable is required"
**Solution**: Make sure `.env.local` exists and contains your API key

### Images Not Loading
**Solution**: 
1. Check your Unsplash API key
2. Or, system will use placeholder images automatically

### Generation Takes Too Long
**Explanation**: Normal! Gemini generates 20+ detailed excursions with:
- Titles and descriptions
- Full itineraries
- Pricing and metadata
- Plus fetching 100+ images from Unsplash

**Expected Time**: 5-10 minutes

### "Rate Limit Exceeded"
**Solution**: Wait a few minutes and try again. The system already includes delays between requests.

## 📊 Example Activities Generated

The system generates realistic Turks & Caicos excursions including:

- Jet Ski Adventures
- Snorkeling Tours
- Scuba Diving Experiences
- Yacht Charters
- Sunset Cruises
- Party Boats
- ATV Tours
- See-Through Kayaking
- Beach Horseback Riding
- Island Hopping
- Fishing Charters
- Parasailing
- Stand-Up Paddleboarding
- Kiteboarding Lessons
- Private Beach Picnics
- Conch Diving
- Mangrove Eco Tours
- Stargazing Experiences
- Luxury Spa Days
- Rum Tasting Tours

## 🎉 Next Steps

Once you have generated content:

1. ✅ **Review** the generated data
2. ✅ **Update** your components to use it
3. ✅ **Replace** dummy data in:
   - `components/home/FeaturedActivities.tsx`
   - `components/home/PackageDeals.tsx`
   - `app/activities/page.tsx`
4. ✅ **Test** searching and filtering
5. ✅ **Deploy** your site with real content!

## 🔄 Switching to Real APIs Later

When you get Viator/GetYourGuide API access:

1. Keep the generated data as fallback
2. Fetch real data from APIs
3. Merge or replace with live data
4. Continue to use AI for custom descriptions if needed

## 📞 Need Help?

- **Gemini API Issues**: https://ai.google.dev/docs
- **Unsplash API Issues**: https://unsplash.com/documentation
- **Your Question**: I'm here to help!

---

**Ready to generate amazing content?**  
Visit: **http://localhost:3000/generate-content**

