#!/usr/bin/env node
/**
 * FRONTEND AUDIT - Real Playwright Browser Testing
 * Opens actual browser, visits pages, checks for JS errors
 * 
 * Usage: 
 *   node scripts/frontend-audit.js                    # Visible browser
 *   HEADLESS=true node scripts/frontend-audit.js     # Headless mode
 */

const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const HEADLESS = process.env.HEADLESS === 'true';

// Pages to test - all header/nav links
const PAGES_TO_TEST = [
  { path: '/', name: 'Home' },
  { path: '/activities', name: 'Activities' },
  { path: '/packages', name: 'Package Deals' },
  { path: '/itinerary', name: 'Itinerary Builder' },
  { path: '/blog', name: 'Blog' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/wishlist', name: 'Wishlist' },
  { path: '/cart', name: 'Cart' },
  { path: '/login', name: 'Login' },
  { path: '/careers', name: 'Careers' },
  { path: '/help', name: 'Help Center' },
  { path: '/terms', name: 'Terms' },
  { path: '/privacy', name: 'Privacy' },
];

async function runAudit() {
  console.log('\n🔍 FRONTEND AUDIT - Real Browser Testing');
  console.log('=========================================');
  console.log(`📍 Target: ${BASE_URL}`);
  console.log(`🖥️  Mode: ${HEADLESS ? 'Headless' : 'Visible Browser'}`);
  console.log('=========================================\n');

  const browser = await chromium.launch({ 
    headless: HEADLESS,
    slowMo: HEADLESS ? 0 : 100 // Slow down visible mode for debugging
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  for (const pageInfo of PAGES_TO_TEST) {
    const url = `${BASE_URL}${pageInfo.path}`;
    console.log(`\n🔍 Testing: ${pageInfo.name} (${pageInfo.path})`);
    
    const page = await context.newPage();
    const jsErrors = [];
    const consoleErrors = [];
    const failedRequests = [];

    // Capture JavaScript errors
    page.on('pageerror', error => {
      jsErrors.push({
        message: error.message,
        stack: error.stack
      });
    });

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Capture failed network requests
    page.on('requestfailed', request => {
      const url = request.url();
      // Ignore favicon and external resources
      if (!url.includes('favicon') && !url.includes('chrome-extension')) {
        failedRequests.push({
          url: url,
          failure: request.failure()?.errorText || 'Unknown'
        });
      }
    });

    try {
      const startTime = Date.now();
      
      // Navigate to page
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      const loadTime = Date.now() - startTime;
      const status = response?.status() || 0;

      // Wait a bit for any JS to execute
      await page.waitForTimeout(1000);

      // Check for error indicators on the page
      const hasAppError = await page.locator('text=Application error').count() > 0;
      const has404 = await page.locator('text=404').count() > 0 && await page.locator('text=not be found').count() > 0;

      // Determine result
      if (status !== 200) {
        results.failed.push({
          page: pageInfo.name,
          path: pageInfo.path,
          reason: `HTTP ${status}`,
          errors: jsErrors
        });
        console.log(`   ❌ FAILED: HTTP ${status}`);
      } else if (jsErrors.length > 0) {
        results.failed.push({
          page: pageInfo.name,
          path: pageInfo.path,
          reason: 'JavaScript errors',
          errors: jsErrors.map(e => e.message)
        });
        console.log(`   ❌ FAILED: ${jsErrors.length} JS error(s)`);
        jsErrors.forEach(e => console.log(`      → ${e.message.substring(0, 100)}`));
      } else if (hasAppError) {
        results.failed.push({
          page: pageInfo.name,
          path: pageInfo.path,
          reason: 'Application error displayed',
          errors: consoleErrors
        });
        console.log(`   ❌ FAILED: Application error displayed on page`);
      } else if (has404) {
        results.failed.push({
          page: pageInfo.name,
          path: pageInfo.path,
          reason: '404 Not Found',
          errors: []
        });
        console.log(`   ❌ FAILED: 404 Not Found`);
      } else {
        results.passed.push({
          page: pageInfo.name,
          path: pageInfo.path,
          loadTime: `${loadTime}ms`
        });
        console.log(`   ✅ PASSED (${loadTime}ms)`);
        
        // Log warnings if any console errors
        if (consoleErrors.length > 0) {
          results.warnings.push({
            page: pageInfo.name,
            warnings: consoleErrors
          });
          console.log(`   ⚠️  ${consoleErrors.length} console warning(s)`);
        }
      }

      // Log failed requests
      if (failedRequests.length > 0) {
        console.log(`   ⚠️  ${failedRequests.length} failed request(s)`);
        failedRequests.forEach(r => {
          console.log(`      → ${r.url.substring(0, 60)}... (${r.failure})`);
        });
      }

    } catch (error) {
      results.failed.push({
        page: pageInfo.name,
        path: pageInfo.path,
        reason: error.message,
        errors: []
      });
      console.log(`   ❌ FAILED: ${error.message}`);
    }

    await page.close();
  }

  await browser.close();

  // Print summary
  console.log('\n=========================================');
  console.log('📊 AUDIT SUMMARY');
  console.log('=========================================');
  console.log(`✅ Passed: ${results.passed.length}/${PAGES_TO_TEST.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${PAGES_TO_TEST.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ FAILED PAGES:');
    results.failed.forEach(f => {
      console.log(`   • ${f.page} (${f.path}): ${f.reason}`);
      if (f.errors && f.errors.length > 0) {
        f.errors.slice(0, 3).forEach(e => {
          console.log(`     → ${String(e).substring(0, 80)}`);
        });
      }
    });
  }

  console.log('\n=========================================\n');
  
  // Exit with error code if any failures
  process.exit(results.failed.length > 0 ? 1 : 0);
}

// Run the audit
runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});

