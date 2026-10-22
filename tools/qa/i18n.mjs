/**
 * Fordítási szótárak vizsgálata — statikusan és futásidőben.
 *
 *  - duplikált kulcs (a későbbi csendben felülírja a korábbit)
 *  - ütköző érték (ugyanaz a kulcs két különböző fordítással)
 *  - lefedettségi különbség EN és DE között
 *  - futásidőben: maradt-e magyar szöveg EN/DE nézetben
 *
 * A duplikált kulcs valós hibát okozott korábban: a "Szint" egyszerre jelentett
 * szinteket (Krimml) és szintemelkedést (kerékpártúra), angolul rossz lett.
 */
import { serve, launch, html, VIEWS, head, fail, warn, ok, finish } from './lib.mjs';

const src = html();

/**
 * Egy szótárblokk beolvasása.
 *
 * Nem soronkénti mintával, hanem karakterenkénti végigjárással, mert:
 *  - egy sorban több bejegyzés is állhat ('a':'b','c':'d',),
 *  - a fordítás értéke lehet APOSZTRÓFOS és IDŐZŐJELES is — ahol a szövegben
 *    aposztróf van ("Europe's"), ott a forrás idézőjelet használ.
 *
 * A korábbi, soronkénti és csak aposztrófot ismerő minta ezeket némán
 * kihagyta, és hiányzó fordítást jelentett olyan szövegekre, amik le voltak
 * fordítva. Ezért jelentjük a beolvasási maradékot is: egy vizsgálat, ami a
 * saját vakfoltját elhallgatja, rosszabb a semminél.
 */
const dict = name => {
  const i = src.indexOf(`const ${name} = {`);
  if (i < 0) return null;
  const body = src.slice(src.indexOf('{', i) + 1, src.indexOf('\n};', i));

  const rows = [];
  let p = 0, leftover = 0;

  /** Idézett szöveg beolvasása p-től; null, ha ott nem idézőjel kezdődik. */
  const readQuoted = () => {
    const q = body[p];
    if (q !== "'" && q !== '"') return null;
    let out = '';
    for (p++; p < body.length; p++) {
      const c = body[p];
      if (c === '\\') { out += body[++p] ?? ''; continue; }
      if (c === q) { p++; return out; }
      out += c;
    }
    return null;                                  /* lezáratlan idézet */
  };

  while (p < body.length) {
    const c = body[p];
    if (c === ' ' || c === '\n' || c === '\t' || c === '\r' || c === ',') { p++; continue; }
    if (c === '/' && body[p + 1] === '*') { const e = body.indexOf('*/', p); p = e < 0 ? body.length : e + 2; continue; }
    if (c === '/' && body[p + 1] === '/') { const e = body.indexOf('\n', p); p = e < 0 ? body.length : e + 1; continue; }
    const key = readQuoted();
    if (key === null) { leftover++; p++; continue; }
    while (body[p] === ' ') p++;
    if (body[p] !== ':') { leftover++; continue; }
    p++;
    while (body[p] === ' ') p++;
    const val = readQuoted();
    if (val === null) { leftover++; continue; }
    rows.push([key, val]);
  }
  rows.leftover = leftover;
  return rows;
};

head('Szótárak');
const maps = {};
for (const n of ['EN', 'DE']) {
  const d = dict(n);
  if (!d) { fail(`${n} szótár nem található`); continue; }
  const seen = new Map(), dup = [], clash = [];
  for (const [k, v] of d) {
    if (!seen.has(k)) { seen.set(k, v); continue; }
    dup.push(k);
    if (seen.get(k) !== v) clash.push(k);
  }
  maps[n] = seen;
  if (dup.length) fail(`${n}: ${dup.length} duplikált kulcs — ${dup.slice(0, 3).map(k => `"${k.slice(0, 30)}"`).join(', ')}`);
  if (clash.length) fail(`${n}: ${clash.length} ÜTKÖZŐ érték — ${clash.slice(0, 3).map(k => `"${k.slice(0, 30)}"`).join(', ')}`);
  if (d.leftover) fail(`${n}: ${d.leftover} bejegyzést nem sikerült beolvasni — a vizsgálat hiányos, javítsd a beolvasót`);
  if (!dup.length && !clash.length && !d.leftover) ok(`${n}: mind a ${d.length} bejegyzés beolvasva, duplikátum és ütközés nélkül`);
}
if (maps.EN && maps.DE) {
  const onlyEn = [...maps.EN.keys()].filter(k => !maps.DE.has(k));
  const onlyDe = [...maps.DE.keys()].filter(k => !maps.EN.has(k));
  if (onlyEn.length) warn(`csak EN-ben: ${onlyEn.length} — ${onlyEn.slice(0, 2).map(k => `"${k.slice(0, 34)}"`).join(', ')}`);
  if (onlyDe.length) warn(`csak DE-ben: ${onlyDe.length} — ${onlyDe.slice(0, 2).map(k => `"${k.slice(0, 34)}"`).join(', ')}`);
  if (!onlyEn.length && !onlyDe.length) ok('EN és DE lefedettsége azonos');
}

head('Lefordítatlan szöveg EN/DE nézetben');
const { base, stop } = await serve();
const browser = await launch();
const pg = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
/* Magyar-specifikus jelek és gyakori szavak — idézeten kívül nem maradhatnak. */
const HU = /[őűŐŰ]|\b(és|vagy|hogy|már|csak|ahol|amit|minden|között|szoba|szobák|kilátás|vízesés|felvonó|ingyenes|szállás|foglalás)\b/i;
for (const lang of ['en', 'de']) {
  const hits = new Map();
  for (const v of VIEWS) {
    await pg.goto(`${base}/#/${v}`, { waitUntil: 'load' });
    await pg.waitForTimeout(350);
    await pg.evaluate(l => {
      const b = [...document.querySelectorAll('.lang button,.lang [data-lang]')]
        .find(x => (x.dataset.lang || x.textContent.trim().toLowerCase()).startsWith(l));
      if (b) b.click();
    }, lang);
    await pg.waitForTimeout(650);
    const found = await pg.evaluate(() => {
      const out = [], root = document.querySelector('.view.is-active');
      if (!root) return out;
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode());) {
        const t = n.nodeValue.trim();
        /* Vendégidézet szándékosan eredeti nyelven marad. */
        if (n.parentElement?.closest('blockquote, .revquote')) continue;
        if (t.length > 7 && n.parentElement && n.parentElement.offsetParent !== null) out.push(t);
      }
      return out;
    });
    found.filter(t => HU.test(t)).forEach(t => hits.has(t) || hits.set(t, v || 'home'));
  }
  if (!hits.size) ok(`${lang.toUpperCase()}: nincs lefordítatlan szöveg`);
  else [...hits].slice(0, 6).forEach(([t, v]) => fail(`${lang.toUpperCase()} [${v}] "${t.slice(0, 70)}"`));
}
await browser.close(); stop();
finish('Fordítások');
