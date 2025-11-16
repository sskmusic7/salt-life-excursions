# Deployment Guide - Salt Life Excursions

This guide will help you deploy your Next.js website to **Netlify** via **GitHub**.

## 🚀 Recommended Approach: GitHub → Netlify

**Best Practice:** Push your code to GitHub first, then connect Netlify to auto-deploy from your GitHub repository. This gives you:
- ✅ Version control
- ✅ Automatic deployments on push
- ✅ Easy rollbacks
- ✅ Collaboration capabilities

---

## 📋 Prerequisites

1. **GitHub Account** - [Sign up here](https://github.com)
2. **Netlify Account** - [Sign up here](https://netlify.com)
3. **Git installed** on your computer (check with `git --version`)

---

## Step 1: Initialize Git Repository (if not done)

```bash
# Navigate to your project directory
cd "Forbes Website"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Salt Life Excursions website"
```

---

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `salt-life-excursions` (or your preferred name)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

---

## Step 3: Push to GitHub

GitHub will show you commands. Run these in your terminal:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/salt-life-excursions.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You'll need to authenticate. GitHub may prompt for:
- Username and Personal Access Token (recommended)
- Or use GitHub CLI: `gh auth login`

---

## Step 4: Deploy to Netlify

### Option A: Deploy via GitHub (Recommended)

1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository: `salt-life-excursions`
6. Netlify will auto-detect Next.js settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (handled by Netlify plugin)
   - **Node version:** 18
7. Click **"Deploy site"**

### Option B: Deploy via Netlify CLI (Alternative)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy (initial setup)
netlify deploy

# For production deployment
netlify deploy --prod
```

---

## Step 5: Configure Environment Variables

**IMPORTANT:** Your `.env.local` file is NOT committed to GitHub (it's in `.gitignore`). You need to add these in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to **"Site settings"** → **"Environment variables"**
3. Add each variable from your `.env.local`:

### Required Environment Variables:

```bash
# Viator API (choose one)
VIATOR_ENV=sandbox  # or "production"
VIATOR_API_KEY_SANDBOX=your_sandbox_key
VIATOR_API_KEY_PRODUCTION=your_production_key

# Gemini API (for content generation)
GEMINI_API_KEY=your_gemini_key

# Unsplash API (for images)
UNSPLASH_ACCESS_KEY=your_unsplash_key

# Next Auth (if using authentication)
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=generate_a_random_secret

# Database (if using Prisma)
DATABASE_URL=your_database_url
```

**How to generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

4. Click **"Save"**
5. Go to **"Deploys"** tab → **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## Step 6: Update Next.js Config (if needed)

The `netlify.toml` file is already configured. However, you may need to update `next.config.js` if you're using App Router (which you are):

```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Remove i18n if using App Router
  // i18n: { ... } - Remove this if present
}

module.exports = nextConfig
```

---

## ✅ Deployment Complete!

Your site will be live at: `https://your-site-name.netlify.app`

### Next Steps:

1. **Custom Domain** (optional):
   - Netlify Dashboard → **"Domain settings"** → **"Add custom domain"**

2. **Auto-Deployments**:
   - Every push to `main` branch automatically triggers a new deployment
   - Pull requests create preview deployments

3. **Monitor Deployments**:
   - Check Netlify dashboard for build logs
   - View deployment history and rollback if needed

---

## 🐛 Troubleshooting

### Build Fails?

1. **Check Build Logs** in Netlify dashboard
2. **Common Issues:**
   - Missing environment variables → Add them in Netlify
   - Node version mismatch → Set `NODE_VERSION = "18"` in netlify.toml
   - Build command error → Check `package.json` scripts
   - Peer dependency issues → Already handled with `--legacy-peer-deps`

### API Errors in Production?

- Make sure all environment variables are set in Netlify
- Check that API keys are production keys (not localhost-only)
- Verify CORS settings if calling external APIs

### Images Not Loading?

- Next.js image optimization works on Netlify
- Ensure image domains are in `next.config.js`
- Check Unsplash API key is set

---

## 📚 Additional Resources

- [Netlify Next.js Docs](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Guides](https://guides.github.com)

---

## 🔒 Security Notes

- ✅ `.env.local` is already in `.gitignore` (never commit secrets!)
- ✅ All API keys should be in Netlify environment variables
- ✅ Use production API keys only in production environment
- ✅ Enable HTTPS (automatically provided by Netlify)
