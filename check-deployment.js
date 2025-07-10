const puppeteer = require('puppeteer');

async function checkSite(url, name) {
  console.log(`\nChecking ${name}: ${url}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    const response = await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    const status = response.status();
    console.log(`  Status: ${status}`);
    
    if (status === 200) {
      // Take screenshot
      await page.screenshot({ 
        path: `screenshots/${name}.png`,
        fullPage: false 
      });
      console.log(`  ✅ Screenshot saved: screenshots/${name}.png`);
      
      // Check for common error indicators
      const pageContent = await page.content();
      if (pageContent.includes('404') || pageContent.includes('Page not found')) {
        console.log(`  ⚠️  Warning: Page might contain 404 error`);
      }
      
      // Get page title
      const title = await page.title();
      console.log(`  Title: ${title}`);
      
      // Check if React app loaded
      const hasReactRoot = await page.evaluate(() => {
        return document.querySelector('#root') !== null;
      });
      console.log(`  React root found: ${hasReactRoot ? '✅' : '❌'}`);
      
      // Check for subdomain-specific content
      if (name !== 'main') {
        const hasSubdomainContent = await page.evaluate(() => {
          const bodyText = document.body.innerText || '';
          return bodyText.length > 100; // Simple check for content
        });
        console.log(`  Has content: ${hasSubdomainContent ? '✅' : '❌'}`);
      }
      
    } else {
      console.log(`  ❌ Error: HTTP ${status}`);
    }
    
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

async function checkAllSites() {
  // Create screenshots directory
  const fs = require('fs');
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  
  // First check if subdomains work via DNS
  console.log('=== Checking Subdomain DNS ===');
  const subdomainSites = [
    { url: 'https://tmj.gregpedromd.com', name: 'tmj-dns' },
    { url: 'https://implants.gregpedromd.com', name: 'implants-dns' },
    { url: 'https://robotic.gregpedromd.com', name: 'robotic-dns' },
    { url: 'https://medspa.gregpedromd.com', name: 'medspa-dns' },
    { url: 'https://aboutface.gregpedromd.com', name: 'aboutface-dns' }
  ];
  
  for (const site of subdomainSites) {
    await checkSite(site.url, site.name);
  }
  
  // Now check path-based routing
  console.log('\n\n=== Checking Path-Based Routing ===');
  const pathBasedSites = [
    { url: 'https://gregpedromd.com', name: 'main' },
    { url: 'https://gregpedromd.com/tmj', name: 'tmj-path' },
    { url: 'https://gregpedromd.com/implants', name: 'implants-path' },
    { url: 'https://gregpedromd.com/robotic', name: 'robotic-path' },
    { url: 'https://gregpedromd.com/medspa', name: 'medspa-path' },
    { url: 'https://gregpedromd.com/aboutface', name: 'aboutface-path' }
  ];
  
  for (const site of pathBasedSites) {
    await checkSite(site.url, site.name);
  }
  
  console.log('\n✅ Deployment check complete!');
  console.log('\nSummary:');
  console.log('- If subdomain DNS checks failed but path-based checks succeeded, you need to configure DNS records');
  console.log('- Check the screenshots folder to visually verify each site');
}

checkAllSites().catch(console.error);
