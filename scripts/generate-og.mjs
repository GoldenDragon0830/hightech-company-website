import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const font = await readFile(
  new URL(
    '../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
    import.meta.url,
  ),
);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html><head><style>
    @font-face { font-family: Manrope; src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2'); font-weight: 200 800; }
    *{box-sizing:border-box}body{margin:0;background:#111310;color:#f4f4ed;font-family:Manrope,sans-serif;width:1200px;height:630px;overflow:hidden}
    .brand{position:absolute;left:64px;top:48px;font-size:28px;letter-spacing:-1px;font-weight:650;display:flex;align-items:center;gap:14px}
    .mark{color:#d5ff70;font-size:39px;line-height:1}.label{position:absolute;left:66px;top:157px;font-size:11px;letter-spacing:3px;color:#a5aca0;text-transform:uppercase}
    h1{position:absolute;left:61px;top:180px;margin:0;font-size:83px;line-height:1.1;letter-spacing:-6px;font-weight:450}h1 span{color:#d5ff70}
    .bottom{position:absolute;bottom:45px;left:66px;right:65px;display:flex;justify-content:space-between;border-top:1px solid #34392e;padding-top:24px;font-size:13px;color:#a5aca0}
    canvas{position:absolute;right:0;top:0;width:650px;height:570px}
  </style></head><body><canvas width="650" height="570"></canvas><div class="brand"><span class="mark">↗</span>HighTech</div><div class="label">Independent software studio</div><h1>Good ideas.<br>Built into<br><span>great software.</span></h1><div class="bottom"><span>Design-led. Engineering-minded.</span><span>Web · Mobile · Applied AI</span></div></body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    let seed = 7349;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 1000; i++) {
      const t = random() * 2 - 1;
      const spread = Math.pow(random(), 1.8) * 110;
      const angle = random() * Math.PI * 2;
      const x = 330 + Math.sin(t * 2.6) * 110 + Math.cos(angle) * spread;
      const y = 280 + t * 220 + Math.sin(angle) * spread;
      context.fillStyle = i % 6 === 0 ? '#d5ff7090' : `rgba(224,236,207,${0.15 + random() * 0.65})`;
      context.beginPath();
      context.arc(x, y, 0.5 + random() * 1.1, 0, Math.PI * 2);
      context.fill();
    }
  });
  await page.screenshot({ path: new URL('../public/og-image.png', import.meta.url).pathname });
  console.log('Generated public/og-image.png (1200 × 630).');
} finally {
  await browser.close();
}
