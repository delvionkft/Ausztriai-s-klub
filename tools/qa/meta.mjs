/**
 * Útvonal-, fejléc- és hivatkozásvizsgálat.
 *
 *  - mind a hét nézet betölt, egyetlen H1-gyel
 *  - a cím és a leírás egyedi, és a Google által megjelenített hosszon belül
 *  - a strukturált adat értelmezhető, és nincs benne tiltott aggregateRating
 *  - minden belső hivatkozás létező nézetre mutat, nincs 404-es kérés
 *  - a nyelvváltás a html lang attribútumot és a lapcímet is átállítja
 *  - nincs JS- vagy konzolhiba
 */
import { serve, launch, VIEWS, head, fail, warn, ok, finish } from './lib.mjs';

const MAX_TITLE = 62, MAX_DESC = 160;

const { base, stop } = await serve();
const browser = await launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pg = await ctx.newPage();

const errors = [], bad404 = [];
pg.on('pageerror', e => errors.push('JS: ' + String(e).slice(0, 140)));
pg.on('console', m => { if (m.type() === 'error' && !/favicon/.test(m.text())) errors.push('konzol: ' + m.text().slice(0, 140)); });
pg.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) bad404.push(r.status() + ' ' + r.url().slice(base.length)); });

head('Strukturált adat');
await pg.goto(`${base}/`, { waitUntil: 'load' });
await pg.waitForTimeout(900);
const ld = await pg.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent));
for (const [n, t] of ld.entries()) {
  try {
    const j = JSON.parse(t);
    if (j.aggregateRating) fail(`${j['@type']}: aggregateRating — a Google tiltja a saját magáról szóló értékelés megjelölését`);
    else ok(`${j['@type']} értelmezhető`);
  } catch (e) { fail(`#${n} JSON-LD nem értelmezhető: ${e.message}`); }
}
if (!ld.length) fail('nincs strukturált adat a lapon');

head('Nézetek, címek, leírások');
const titles = new Map(), descs = new Map();
for (const v of VIEWS) {
  await pg.goto(`${base}/#/${v}`, { waitUntil: 'load' });
  await pg.waitForTimeout(500);
  const d = await pg.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content || '',
    h1: document.querySelectorAll('.view.is-active h1').length,
  }));
  const view = '#/' + v;
  let clean = true;
  if (d.h1 !== 1) { fail(`${view} — ${d.h1} db H1 (pontosan 1 kell)`); clean = false; }
  if (!d.title) { fail(`${view} — nincs lapcím`); clean = false; }
  else if (d.title.length > MAX_TITLE) { warn(`${view} — a cím ${d.title.length} karakter, a Google ~${MAX_TITLE}-nél vág`); }
  if (!d.desc) { fail(`${view} — nincs leírás`); clean = false; }
  else if (d.desc.length > MAX_DESC) { warn(`${view} — a leírás ${d.desc.length} karakter (max ${MAX_DESC})`); }
  if (titles.has(d.title)) { fail(`${view} — a cím azonos ezzel: ${titles.get(d.title)}`); clean = false; }
  if (descs.has(d.desc))   { fail(`${view} — a leírás azonos ezzel: ${descs.get(d.desc)}`); clean = false; }
  titles.set(d.title, view); descs.set(d.desc, view);
  if (clean) ok(`${view}  cím ${d.title.length} / leírás ${d.desc.length} karakter`);
}

head('Belső hivatkozások');
await pg.goto(`${base}/`, { waitUntil: 'load' });
await pg.waitForTimeout(600);
const links = await pg.evaluate(known => {
  const out = { good: 0, bad: [] };
  document.querySelectorAll('a[href^="#/"]').forEach(a => {
    const n = a.getAttribute('href').replace(/^#\//, '');
    if (n === '' || known.includes(n)) out.good++; else out.bad.push(a.getAttribute('href'));
  });
  return out;
}, VIEWS.filter(Boolean));
if (links.bad.length) fail(`${links.bad.length} ismeretlen nézetre mutató hivatkozás: ${links.bad.join(', ')}`);
else ok(`${links.good} belső hivatkozás, mind érvényes nézetre mutat`);

head('Nyelvváltás');
for (const lang of ['de', 'en', 'hu']) {
  await pg.goto(`${base}/#/szobak`, { waitUntil: 'load' });
  await pg.waitForTimeout(400);
  await pg.evaluate(l => {
    const b = [...document.querySelectorAll('.lang button,.lang [data-lang]')]
      .find(x => (x.dataset.lang || x.textContent.trim().toLowerCase()).startsWith(l));
    if (b) b.click();
  }, lang);
  await pg.waitForTimeout(600);
  const r = await pg.evaluate(() => ({ lang: document.documentElement.lang, title: document.title }));
  if (r.lang !== lang) fail(`${lang}: a html lang "${r.lang}" maradt`);
  else ok(`${lang}: lang="${r.lang}" · ${r.title.slice(0, 52)}`);
}

head('Hibák');
if (bad404.length) fail(`${bad404.length} sikertelen kérés: ${bad404.slice(0, 4).join(', ')}`);
else ok('nincs 404-es kérés');
if (errors.length) errors.slice(0, 5).forEach(e => fail(e));
else ok('nincs JS- vagy konzolhiba');

await browser.close(); stop();
finish('Fejléc és útvonalak');
