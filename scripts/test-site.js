const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

class SiteTester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.visitedUrls = new Set();
    this.results = {
      passed: [],
      failed: [],
      warnings: [],
      pageLoadTimes: []
    };
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    const isHeadless = process.env.headless === 'true' || process.env.HEADLESS === 'true';
    
    this.browser = await chromium.launch({ 
      headless: isHeadless, // Can be set via environment variable
      slowMo: isHeadless ? 0 : 100 // Slows down actions when not headless
    });
    
    const context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    
    this.page = await context.newPage();
    
    // Listen for console messages
    this.page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        this.results.warnings.push({
          type: 'console_error',
          message: text,
          url: this.page.url()
        });
      }
    });

    // Listen for page errors
    this.page.on('pageerror', error => {
      this.results.failed.push({
        type: 'page_error',
        message: error.message,
        stack: error.stack,
        url: this.page.url()
      });
    });

    // Listen for failed requests
    this.page.on('response', response => {
      const status = response.status();
      // Ignore 304 (cached) and successful responses
      if (!response.ok() && status !== 304) {
        this.results.warnings.push({
          type: 'failed_request',
          status: status,
          statusText: response.statusText(),
          url: response.url(),
          page: this.page.url()
        });
      }
    });

    // Listen for request failures
    this.page.on('requestfailed', request => {
      this.results.warnings.push({
        type: 'request_failed',
        url: request.url(),
        failure: request.failure().errorText,
        page: this.page.url()
      });
    });
  }

  async testPage(url) {
    if (this.visitedUrls.has(url)) {
      return;
    }

    console.log(`\n🔍 Testing: ${url}`);
    this.visitedUrls.add(url);

    try {
      const startTime = Date.now();
      
      // Navigate to the page
      const response = await this.page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      const loadTime = Date.now() - startTime;
      
      this.results.pageLoadTimes.push({
        url: url,
        loadTime: loadTime
      });

      if (loadTime > 3000) {
        this.results.warnings.push({
          type: 'slow_page_load',
          url: url,
          loadTime: `${loadTime}ms`
        });
      }

      // Check if page loaded successfully
      if (!response.ok()) {
        this.results.failed.push({
          type: 'page_load_failed',
          status: response.status(),
          url: url
        });
        return;
      }

      // Wait a bit for any dynamic content
      await this.page.waitForTimeout(1000);

      // Take a screenshot
      const screenshotDir = './screenshots';
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      
      const sanitizedUrl = url.replace(/[^a-z0-9]/gi, '_');
      await this.page.screenshot({ 
        path: `${screenshotDir}/${sanitizedUrl}.png`,
        fullPage: true 
      });

      // Check page title
      const title = await this.page.title();
      if (!title || title.trim() === '') {
        this.results.warnings.push({
          type: 'missing_title',
          url: url
        });
      }

      // Check for broken images
      const brokenImages = await this.page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images
          .filter(img => !img.complete || img.naturalHeight === 0)
          .map(img => ({ src: img.src, alt: img.alt }));
      });

      if (brokenImages.length > 0) {
        this.results.warnings.push({
          type: 'broken_images',
          url: url,
          count: brokenImages.length,
          images: brokenImages
        });
      }

      // Check for images without alt text
      const imagesWithoutAlt = await this.page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images
          .filter(img => !img.alt || img.alt.trim() === '')
          .map(img => img.src);
      });

      if (imagesWithoutAlt.length > 0) {
        this.results.warnings.push({
          type: 'images_without_alt',
          url: url,
          count: imagesWithoutAlt.length
        });
      }

      // Get all links on the page
      const links = await this.page.evaluate((baseUrl) => {
        const anchors = Array.from(document.querySelectorAll('a[href]'));
        return anchors
          .map(a => {
            const href = a.getAttribute('href');
            const text = a.textContent.trim();
            // Convert relative URLs to absolute
            try {
              const fullUrl = new URL(href, window.location.href).href;
              return { url: fullUrl, text: text };
            } catch {
              return null;
            }
          })
          .filter(link => link && link.url.startsWith(baseUrl));
      }, this.baseUrl);

      console.log(`   📊 Found ${links.length} internal link(s)`);

      // Test navigation elements (common on tourism sites)
      const navElements = await this.page.evaluate(() => {
        const nav = document.querySelector('nav');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        
        return {
          hasNav: !!nav,
          hasHeader: !!header,
          hasFooter: !!footer
        };
      });

      // Check for forms (booking forms, contact forms, etc.)
      const forms = await this.page.$$('form');
      if (forms.length > 0) {
        console.log(`   📝 Found ${forms.length} form(s) - testing basic functionality...`);
        
        for (let i = 0; i < forms.length; i++) {
          const formInfo = await this.page.evaluate((index) => {
            const form = document.querySelectorAll('form')[index];
            return {
              action: form.action,
              method: form.method,
              hasSubmitButton: !!form.querySelector('button[type="submit"], input[type="submit"]'),
              inputCount: form.querySelectorAll('input, textarea, select').length
            };
          }, i);

          if (!formInfo.hasSubmitButton) {
            this.results.warnings.push({
              type: 'form_missing_submit',
              url: url,
              formIndex: i
            });
          }
        }
      }

      // Check for buttons that might be broken
      const brokenButtons = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
        return buttons
          .filter(btn => {
            const onClick = btn.getAttribute('onclick');
            const href = btn.getAttribute('href');
            return !onClick && !href && btn.type !== 'submit';
          })
          .length;
      });

      if (brokenButtons > 0) {
        this.results.warnings.push({
          type: 'potentially_broken_buttons',
          url: url,
          count: brokenButtons
        });
      }

      // Check mobile responsiveness by testing viewport
      await this.page.setViewportSize({ width: 375, height: 667 }); // iPhone size
      await this.page.waitForTimeout(500);
      
      const mobileScreenshot = `${screenshotDir}/${sanitizedUrl}_mobile.png`;
      await this.page.screenshot({ 
        path: mobileScreenshot,
        fullPage: false 
      });

      // Reset viewport
      await this.page.setViewportSize({ width: 1920, height: 1080 });

      // Crawl linked pages (limit depth to avoid infinite loops)
      const uniqueLinks = [...new Set(links.map(l => l.url))];
      for (const link of uniqueLinks.slice(0, 10)) { // Limit to 10 links per page
        if (link.startsWith(this.baseUrl) && this.visitedUrls.size < 50) { // Max 50 pages
          await this.testPage(link);
        }
      }

      this.results.passed.push({
        url: url,
        title: title,
        links: links.length,
        forms: forms.length,
        loadTime: `${loadTime}ms`,
        navigation: navElements,
        timestamp: new Date().toISOString()
      });

      console.log(`   ✅ Page tested successfully (${loadTime}ms)`);
    } catch (error) {
      this.results.failed.push({
        type: 'test_error',
        url: url,
        error: error.message,
        stack: error.stack
      });
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  async generateReport() {
    const avgLoadTime = this.results.pageLoadTimes.length > 0
      ? this.results.pageLoadTimes.reduce((sum, p) => sum + p.loadTime, 0) / this.results.pageLoadTimes.length
      : 0;

    const report = {
      summary: {
        total_pages: this.visitedUrls.size,
        passed: this.results.passed.length,
        failed: this.results.failed.length,
        warnings: this.results.warnings.length,
        average_load_time: `${Math.round(avgLoadTime)}ms`,
        base_url: this.baseUrl
      },
      details: this.results,
      tested_at: new Date().toISOString()
    };

    // Save JSON report
    fs.writeFileSync(
      'test-report.json',
      JSON.stringify(report, null, 2)
    );

    // Generate HTML report
    const htmlReport = this.generateHtmlReport(report);
    fs.writeFileSync('test-report.html', htmlReport);

    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`🌐 Site: ${this.baseUrl}`);
    console.log(`📄 Total Pages Tested: ${report.summary.total_pages}`);
    console.log(`✅ Passed: ${report.summary.passed}`);
    console.log(`❌ Failed: ${report.summary.failed}`);
    console.log(`⚠️  Warnings: ${report.summary.warnings}`);
    console.log(`⚡ Avg Load Time: ${report.summary.average_load_time}`);
    console.log('='.repeat(50));
    console.log('\n📄 Reports saved:');
    console.log('   ✓ test-report.json');
    console.log('   ✓ test-report.html');
    console.log('   ✓ screenshots/ directory (desktop + mobile)');
    console.log('\n💡 Open test-report.html in your browser to see detailed results');
  }

  generateHtmlReport(report) {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Salt Life Excursions - Test Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      color: #333;
    }
    .container { 
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { 
      color: #667eea;
      font-size: 36px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .subtitle {
      color: #666;
      font-size: 18px;
      margin-bottom: 30px;
    }
    .summary { 
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .stat-box { 
      padding: 25px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .stat-box:hover { transform: translateY(-5px); }
    .stat-box.total { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    .stat-box.passed { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; }
    .stat-box.failed { background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%); color: white; }
    .stat-box.warnings { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
    .stat-box.performance { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; }
    .stat-label { font-size: 14px; opacity: 0.9; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .stat-number { font-size: 48px; font-weight: bold; margin: 15px 0; }
    .section { margin: 40px 0; }
    .section h2 { 
      color: #333;
      margin-bottom: 20px;
      font-size: 24px;
      border-left: 4px solid #667eea;
      padding-left: 15px;
    }
    .issue, .warning, .passed { 
      background: #f8f9fa;
      padding: 20px;
      margin: 15px 0;
      border-radius: 8px;
      border-left: 4px solid;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .issue { border-left-color: #f44336; }
    .warning { border-left-color: #ff9800; }
    .passed { border-left-color: #4caf50; }
    .issue strong, .warning strong, .passed strong { 
      display: block;
      margin-bottom: 10px;
      font-size: 16px;
      color: #333;
    }
    code { 
      background: #e9ecef;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;
      font-family: 'Courier New', monospace;
      color: #c7254e;
    }
    .url-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    .url-link:hover {
      text-decoration: underline;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
    }
    .badge-error { background: #ffebee; color: #c62828; }
    .badge-warning { background: #fff3e0; color: #e65100; }
    .badge-success { background: #e8f5e9; color: #2e7d32; }
    .timestamp {
      color: #999;
      font-size: 14px;
      font-style: italic;
    }
    .details {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #dee2e6;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>
      <span>🧪</span> Site Test Report
    </h1>
    <div class="subtitle">
      <strong>${report.summary.base_url}</strong><br>
      <span class="timestamp">Generated: ${new Date(report.tested_at).toLocaleString()}</span>
    </div>
    
    <div class="summary">
      <div class="stat-box total">
        <div class="stat-label">Total Pages</div>
        <div class="stat-number">${report.summary.total_pages}</div>
      </div>
      <div class="stat-box passed">
        <div class="stat-label">Passed</div>
        <div class="stat-number">${report.summary.passed}</div>
      </div>
      <div class="stat-box failed">
        <div class="stat-label">Failed</div>
        <div class="stat-number">${report.summary.failed}</div>
      </div>
      <div class="stat-box warnings">
        <div class="stat-label">Warnings</div>
        <div class="stat-number">${report.summary.warnings}</div>
      </div>
      <div class="stat-box performance">
        <div class="stat-label">Avg Load Time</div>
        <div class="stat-number" style="font-size: 32px;">${report.summary.average_load_time}</div>
      </div>
    </div>

    ${report.details.failed.length > 0 ? `
    <div class="section">
      <h2>❌ Failed Tests <span class="badge badge-error">${report.details.failed.length}</span></h2>
      ${report.details.failed.map(issue => `
        <div class="issue">
          <strong>${issue.type.replace(/_/g, ' ').toUpperCase()}</strong>
          <a href="${issue.url}" class="url-link" target="_blank"><code>${issue.url}</code></a>
          <div class="details">
            ${issue.error || issue.message || `Status: ${issue.status}`}
          </div>
        </div>
      `).join('')}
    </div>
    ` : '<div class="section"><h2>✅ No Failed Tests - Excellent!</h2></div>'}

    ${report.details.warnings.length > 0 ? `
    <div class="section">
      <h2>⚠️ Warnings <span class="badge badge-warning">${report.details.warnings.length}</span></h2>
      ${report.details.warnings.map(warning => `
        <div class="warning">
          <strong>${warning.type.replace(/_/g, ' ').toUpperCase()}</strong>
          <a href="${warning.url || warning.page}" class="url-link" target="_blank"><code>${warning.url || warning.page}</code></a>
          <div class="details">
            ${warning.message || ''}
            ${warning.status ? `Status: ${warning.status}` : ''}
            ${warning.failure ? `Failure: ${warning.failure}` : ''}
            ${warning.count ? `Count: ${warning.count}` : ''}
            ${warning.loadTime ? `Load Time: ${warning.loadTime}` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div class="section">
      <h2>✅ Passed Tests <span class="badge badge-success">${report.details.passed.length}</span></h2>
      ${report.details.passed.map(page => `
        <div class="passed">
          <strong>${page.title || 'Untitled Page'}</strong>
          <a href="${page.url}" class="url-link" target="_blank"><code>${page.url}</code></a>
          <div class="details">
            📊 ${page.links} links found | 
            📝 ${page.forms} forms | 
            ⚡ Load time: ${page.loadTime} |
            ${page.navigation.hasNav ? '✓ Nav' : '✗ Nav'} |
            ${page.navigation.hasHeader ? '✓ Header' : '✗ Header'} |
            ${page.navigation.hasFooter ? '✓ Footer' : '✗ Footer'}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>
    `;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run the tests
async function runTests() {
  // Use production URL by default, or allow override via environment variable
  const baseUrl = process.env.TEST_URL || 'https://salt-life-excursions.netlify.app';
  
  console.log('🚀 Starting comprehensive site test...');
  console.log(`🌐 Testing: ${baseUrl}\n`);
  
  const tester = new SiteTester(baseUrl);
  
  try {
    await tester.initialize();
    await tester.testPage(baseUrl);
    await tester.generateReport();
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  } finally {
    await tester.close();
  }
}

runTests();

