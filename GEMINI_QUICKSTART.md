# 🚀 Generate Excursion Content with Gemini AI - Quick Start

## What You Need (2 Minutes Setup)

### 1. Get Gemini API Key (FREE)
1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### 2. Get Unsplash API Key (Optional, FREE)
1. Visit: **https://unsplash.com/developers**
2. Sign up
3. Create new app
4. Copy Access Key

### 3. Add Keys to `.env.local`

Create this file in your project root:

```bash
# Required
GEMINI_API_KEY=paste_your_gemini_key_here

# Optional model (or use default)
NEXT_PUBLIC_GEMINI_MODEL=gemini-2.0-flash-exp

# Optional (for images, will use placeholders without it)
UNSPLASH_ACCESS_KEY=paste_your_unsplash_key_here
```

### 4. Restart Server

```bash
npm run dev
```

### 5. Generate Content!

Open: **http://localhost:3000/generate-content**

Click the big purple button and wait 5-10 minutes.

## What You'll Get

✅ 20+ realistic Turks & Caicos excursions  
✅ Full descriptions and itineraries  
✅ Pricing, duration, difficulty levels  
✅ 100+ high-quality images from Unsplash  
✅ Categories, tags, and all metadata  
✅ Saved to `/data/generated-excursions.json`  

## Generated Activities Include:

- Jet Ski Adventures
- Snorkeling & Diving
- Yacht Charters
- Sunset Cruises
- ATV Tours
- Kayaking
- Horseback Riding
- Island Hopping
- Fishing
- Parasailing
- Beach Picnics
- Eco Tours
- Spa Experiences
- And more!

## Cost

- **Gemini**: ~$0.10 for 20 excursions (super cheap!)
- **Unsplash**: Completely FREE

## Need More Details?

See: **GEMINI_CONTENT_GENERATION_GUIDE.md**

---

**Ready?** Just add your API key and visit `/generate-content`!

