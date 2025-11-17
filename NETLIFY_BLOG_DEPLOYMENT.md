# Netlify Blog Generation Deployment Guide

## Overview

For Netlify deployment, you have two options for blog posts:

1. **Option A: Generate locally, commit to Git** (Recommended - Faster builds)
2. **Option B: Generate during Netlify build** (Slower builds, always fresh)

## Option A: Generate Locally & Commit (Recommended)

### Steps:

1. **Add Environment Variables to Netlify:**
   - Go to your Netlify dashboard
   - Navigate to: Site Settings → Environment Variables
   - Add these variables:
     ```
     GEMINI_API_KEY=AIzaSyDGqidJewYR1oKRs7tGTChRiIs-nd75GcY
     GOOGLE_SEARCH_API_KEY=AIzaSyDGqidJewYR1oKRs7tGTChRiIs-nd75GcY
     GOOGLE_SEARCH_ENGINE_ID=f7ef4caee432a4127
     UNSPLASH_ACCESS_KEY=your-unsplash-key
     ```

2. **Generate Blog Posts Locally:**
   ```bash
   # Make sure dev server is running
   npm run dev
   
   # In another terminal, generate posts
   curl -X POST http://localhost:3000/api/generate/blog \
     -H "Content-Type: application/json" \
     -d '{"type": "bulk", "saveToFile": true}'
   ```

3. **Commit the Generated File:**
   ```bash
   git add data/generated-blog-posts.json
   git commit -m "Add generated blog posts"
   git push
   ```

4. **Netlify Auto-Deploys:**
   - Netlify will automatically rebuild when you push to GitHub
   - Blog posts will be included in the build
   - Fast builds (no generation needed)

**Note:** When you want to regenerate posts, repeat steps 2-4.

---

## Option B: Generate During Build (Always Fresh)

This generates blog posts during every Netlify build. Slower but always up-to-date.

### Steps:

1. **Add Environment Variables to Netlify** (same as Option A)

2. **Update `netlify.toml` to include blog generation:**
   ```toml
   [build]
     command = "npm run generate:blog && npm run build"
     publish = ".next"
   ```

3. **Add script to `package.json`:**
   ```json
   {
     "scripts": {
       "generate:blog": "node scripts/generate-blog.js"
     }
   }
   ```

4. **Create `scripts/generate-blog.js`:**
   ```javascript
   const https = require('https');
   
   const options = {
     hostname: 'localhost',
     port: 3000,
     path: '/api/generate/blog',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
   };
   
   // Note: This requires the Next.js server to be running
   // Better approach: Call the generator directly
   ```

**Note:** Option B is more complex and slower. Option A is recommended.

---

## Quick Setup (Option A - Recommended)

### 1. Add Env Variables to Netlify:
```
GEMINI_API_KEY
GOOGLE_SEARCH_API_KEY  
GOOGLE_SEARCH_ENGINE_ID
UNSPLASH_ACCESS_KEY
```

### 2. Generate Posts Locally & Commit:
```bash
npm run dev  # Terminal 1
curl -X POST http://localhost:3000/api/generate/blog -H "Content-Type: application/json" -d '{"type": "bulk", "saveToFile": true}'  # Terminal 2
git add data/generated-blog-posts.json
git commit -m "Add generated blog posts"
git push
```

### 3. Netlify Auto-Deploys ✅

That's it! Your blog posts will be live on Netlify.

---

## Important Notes

- **Free Tier Limits:**
  - Google Search API: 100 queries/day (free tier)
  - Gemini API: Check pricing at https://ai.google.dev/pricing
  
- **Build Time:** Option A is much faster (no generation during build)

- **Updating Posts:** Regenerate locally and commit the new JSON file

- **Alternative:** Use a database (Prisma) for blog posts if you want dynamic updates without rebuilds

