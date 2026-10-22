/**
 * Közös alapok a minőségellenőrző vizsgálatokhoz.
 *
 * Miért van ez a repóban, és nem egy eldobható szkriptben?
 * Mert a lap hibáinak jelentős részét korábban a megrendelő találta meg, nem
 * az ellenőrzés. Ezek a vizsgálatok pontosan azokat a hibaosztályokat fogják
 * meg, amik akkor átcsúsztak: kilógó elem, levágott szöveg, olvashatatlan
 * kontraszt, apró érintőfelület, hiányzó fordítás, törött belső hivatkozás.
 * Minden módosítás után futtatandók — a `npm run qa` mindet lefuttatja.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const SITE = path.join(ROOT, 'preview');
export const PAGE = 'ludwighause-experience.html';

/** A hét nézet, ahogy a router ismeri őket. */
export const VIEWS = ['', 'szobak', 'sipalyak', 'kikapcsolodas', 'galeria', 'hazirend', 'kapcsolat'];

/** Képernyőméretek: asztali, tablet, mai telefon, régi kis telefon. */
export const PROFILES = [
  ['asztali', { viewport: { width: 1440, height: 900 } }],
  ['tablet',  { viewport: { width: 820, height: 1180 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
  ['mobil',   { viewport: { width: 390, height: 844 },  isMobile: true, hasTouch: true, deviceScaleFactor: 3 }],
  ['kicsi',   { viewport: { width: 320, height: 690 },  isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml', '.js': 'text/javascript', '.css': 'text/css',
};

/** Helyi kiszolgáló a `preview/` mappára. Visszaadja a bázis URL-t és a leállítót. */
export async function serve() {
  const srv = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const file = url === '/' ? path.join(SITE, PAGE) : path.join(SITE, url);
    if (!file.startsWith(SITE) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { 'content-type': 'text/html' });
      return res.end('<h1>404</h1>');
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(r => srv.listen(0, r));
  return { base: `http://localhost:${srv.address().port}`, stop: () => srv.close() };
}

export async function launch() {
  const { chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs');
  return chromium.launch();
}

/** A lusta képek azonnali betöltése — különben a rejtett elemeket nem mérjük. */
export async function settle(pg, ms = 900) {
  await pg.waitForTimeout(ms);
  await pg.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(i => (i.loading = 'eager')));
  await pg.waitForTimeout(600);
}

export const html = () => fs.readFileSync(path.join(SITE, PAGE), 'utf8');

/* --- jelentés -------------------------------------------------------------- */
let failures = 0;
export const fail = (msg) => { failures++; console.log('  \x1b[31mHIBA\x1b[0m  ' + msg); };
export const warn = (msg) => console.log('  \x1b[33mfigy\x1b[0m  ' + msg);
export const ok   = (msg) => console.log('  \x1b[32m ok \x1b[0m  ' + msg);
export const head = (t) => console.log('\n\x1b[1m' + t + '\x1b[0m');
export const finish = (name) => {
  if (failures) { console.log(`\n${name}: \x1b[31m${failures} hiba\x1b[0m\n`); process.exitCode = 1; }
  else console.log(`\n${name}: \x1b[32mrendben\x1b[0m\n`);
  return failures;
};
