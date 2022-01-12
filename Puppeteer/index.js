const puppeteer = require('puppeteer');
const fs = require('fs');
const lighthouse = require('lighthouse');

const chromeLauncher = require('chrome-launcher');
const reportGenerator = require('lighthouse/report/generator/report-generator');
const request = require('request');
const util = require('util');

const options = {
  logLevel: 'info',
  disableDeviceEmulation: true,
  chromeFlags: ['--disable-mobile-emulation']
};

let date = new Date();
// 2022-01-12T15:26:40
let filePrefix = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


// ######### LIGHTHOUSE REPORT #########
async function lighthouseFromPuppeteer(url, options, config = null) {
  // Launch chrome using chrome-launcher
  const chrome = await chromeLauncher.launch(options);
  options.port = chrome.port;

  // Connect chrome-launcher to puppeteer
  const resp = await util.promisify(request)(`http://localhost:${options.port}/json/version`);
  const { webSocketDebuggerUrl } = JSON.parse(resp.body);
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });

  // Run Lighthouse
  const { lhr } = await lighthouse(url, options, config);
  await browser.disconnect();
  await chrome.kill();

  const html = reportGenerator.generateReport(lhr, 'html');
  fs.writeFile('report.html', html, function (err) {
    if (err) throw err;
  });
}


// ######### DEVTOOLS PERFORMANCE TRACE FOR A PAGE LOAD #########
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.tracing.start({ path: filePrefix + '.json' });
  await page.goto('http://192.168.59.128:8080');
  await page.tracing.stop();
  await page.screenshot({ path: filePrefix + 'FPS.jpg', type: 'jpeg' });

  await browser.close();
})();


// ######### FPS COUNTER AND MAX GPU MEMORY USED #########
(async () => {
  const args = await puppeteer.defaultArgs().filter(flag => flag !== '--enable-automation');
  const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      ignoreDefaultArgs: true,
      args
  });
  const page = await browser.newPage();
  const devtoolsProtocolClient = await page.target().createCDPSession();
  await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true });
  await page.goto('http://192.168.59.128:8080');
  await page.screenshot({ path: filePrefix + 'GPU.jpg', type: 'jpeg' });
  await page.close();
  await browser.close();
})();

lighthouseFromPuppeteer('http://192.168.59.128:8080', options);