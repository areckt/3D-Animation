const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.tracing.start({ path: 'profile.json' });
  await page.goto('http://192.168.59.128:8080');
  await page.tracing.stop();

  // await page.waitForSelector('.webgl');
  // await page.waitForTimeout(5000);
  // await page.screenshot({path: 'ss.png'});

  await browser.close();
})();