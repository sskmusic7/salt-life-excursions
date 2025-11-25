# Site Testing Scripts

## Playwright Site Tester

Comprehensive automated testing for Salt Life Excursions website using Playwright.

### Installation

Playwright is installed as a dev dependency. After installation, install browser binaries:

```bash
npx playwright install chromium
```

Or install all browsers:

```bash
npx playwright install
```

### Usage

#### Test Production Site (Default)

```bash
npm run test:site
```

This will:
- Test the production site at `https://salt-life-excursions.netlify.app`
- Crawl pages and test links
- Capture screenshots (desktop + mobile)
- Generate HTML and JSON reports
- Check for errors, broken images, missing alt text, etc.

#### Test Custom URL

Set the `TEST_URL` environment variable:

```bash
TEST_URL=http://localhost:3000 npm run test:site
```

#### Run in Headless Mode

To run without opening a browser window:

```bash
npm run test:site:headless
```

Or manually edit `scripts/test-site.js` and change `headless: false` to `headless: true`.

### What It Tests

- ✅ Page load times
- ✅ Broken links (404s)
- ✅ Broken images
- ✅ Missing image alt text
- ✅ Console errors
- ✅ JavaScript errors
- ✅ Failed network requests
- ✅ Form functionality
- ✅ Navigation elements
- ✅ Mobile responsiveness
- ✅ Page titles
- ✅ Button functionality

### Output

The script generates:

1. **test-report.html** - Beautiful HTML report with full details
2. **test-report.json** - Machine-readable JSON report
3. **screenshots/** - Desktop and mobile screenshots of all tested pages

### Configuration

Edit `scripts/test-site.js` to customize:

- `baseUrl` - Default site URL
- `headless` - Run browser in background
- `slowMo` - Slow down actions (helpful for debugging)
- Maximum pages to crawl (currently 50)
- Maximum links per page (currently 10)

### Example Output

```
🚀 Starting comprehensive site test...
🌐 Testing: https://salt-life-excursions.netlify.app

🔍 Testing: https://salt-life-excursions.netlify.app
   📊 Found 25 internal link(s)
   📝 Found 1 form(s) - testing basic functionality...
   ✅ Page tested successfully (1234ms)

📊 TEST SUMMARY
==================================================
🌐 Site: https://salt-life-excursions.netlify.app
📄 Total Pages Tested: 15
✅ Passed: 15
❌ Failed: 0
⚠️  Warnings: 3
⚡ Avg Load Time: 1456ms
==================================================

📄 Reports saved:
   ✓ test-report.json
   ✓ test-report.html
   ✓ screenshots/ directory (desktop + mobile)
```

