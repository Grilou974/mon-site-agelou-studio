const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async ()=>{
  const svgPath = path.resolve(__dirname,'../assets/screenshots/site-1-thumb.svg');
  const outPath = path.resolve(__dirname,'../assets/screenshots/site-1-thumb.png');
  const svg = fs.readFileSync(svgPath,'utf8');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:transparent}</style></head><body>${svg}</body></html>`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const el = await page.$('svg');
  if(!el){ console.error('SVG not found'); process.exit(1); }
  await el.screenshot({path: outPath});
  console.log('Saved', outPath);
  await browser.close();
})();
