const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function capture(url, outFile, opts={width:1280,height:800}){
  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({ width: opts.width, height: opts.height });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: outFile, fullPage: true });
  await browser.close();
}

async function run(){
  const base = process.env.BASE_URL || 'http://localhost:3000';
  const outDir = path.join(__dirname, '..','assets','screenshots');
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pages = [
    { url: base + '/realisations/site-1.html', file: path.join(outDir,'site-1.png') },
    { url: base + '/realisations/site-2.html', file: path.join(outDir,'site-2.png') },
    { url: base + '/realisations/site-3.html', file: path.join(outDir,'site-3.png') },
    { url: base + '/', file: path.join(outDir,'index.png') }
  ];

  for(const p of pages){
    console.log('Capturing', p.url);
    try{ await capture(p.url, p.file); console.log('Saved', p.file); }
    catch(e){ console.error('Failed to capture', p.url, e.message); }
  }
}

run();
