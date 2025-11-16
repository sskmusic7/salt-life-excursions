# Quick Deploy Instructions

## 🚀 Fast Track to Deployment

### 1️⃣ Initialize Git & Push to GitHub

```bash
# In your project directory
cd "Forbes Website"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Salt Life Excursions website"

# Create a new repository on GitHub (via web browser)
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify
5. Select your repository
6. Netlify auto-detects Next.js settings ✅
7. Click **"Deploy site"**

### 3️⃣ Add Environment Variables

Go to: **Site settings** → **Environment variables**

Add these (get values from your `.env.local`):

```
VIATOR_ENV=sandbox
VIATOR_API_KEY_SANDBOX=your_key_here
VIATOR_API_KEY_PRODUCTION=your_key_here
GEMINI_API_KEY=your_key_here
UNSPLASH_ACCESS_KEY=your_key_here
NEXTAUTH_SECRET=generate_with: openssl rand -base64 32
NEXTAUTH_URL=https://your-site.netlify.app
```

### 4️⃣ Redeploy

After adding env vars:
- **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

✅ Done! Your site is live at `https://your-site.netlify.app`

---

## 📖 Full Details

See `DEPLOYMENT_GUIDE.md` for comprehensive instructions.

