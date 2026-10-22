/**
 * Szövegkontraszt-vizsgálat (WCAG 2.1 AA) mind a hét nézeten.
 * Apró szöveghez 4,5:1, nagyhoz (24px, vagy 18,66px félkövér) 3:1 kell.
 * Az átlátszó előtérszínt a legközelebbi átlátszatlan háttérre keverjük rá.
 */
import { serve, launch, VIEWS, head, fail, ok, finish } from './lib.mjs';

const { base, stop } = await serve();
const browser = await launch();
const pg = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

const probe = () => {
  const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const nums = s => { const m = s.match(/[\d.]+/g); return m ? m.map(Number) : null; };
  const bgOf = e => {
    for (let n = e; n && n !== document.documentElement; n = n.parentElement) {
      const c = nums(getComputedStyle(n).backgroundColor);
      if (c && (c.length < 4 || c[3] > 0.92)) return c.slice(0, 3);
    }
    return [10, 22, 20];                      /* a lap alap háttere */
  };
  const out = [];
  const root = document.querySelector('.view.is-active') || document;
  root.querySelectorAll('p,span,small,li,a,b,dt,dd,em,i,button,h1,h2,h3,figcaption,label,output').forEach(e => {
    const t = (e.textContent || '').trim();
    if (t.length < 2) return;
    if (e.children.length && ![...e.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim())) return;
    const s = getComputedStyle(e);
    if (s.display === 'none' || s.visibility === 'hidden' || e.offsetParent === null) return;
    const fg = nums(s.color); if (!fg) return;
    const a = fg.length > 3 ? fg[3] : 1, bg = bgOf(e);
    const mix = [0, 1, 2].map(i => a * fg[i] + (1 - a) * bg[i]);
    const ratio = (Math.max(L(...mix), L(...bg)) + 0.05) / (Math.min(L(...mix), L(...bg)) + 0.05);
    const fs = parseFloat(s.fontSize), big = fs >= 24 || (fs >= 18.66 && parseInt(s.fontWeight) >= 700);
    const need = big ? 3 : 4.5;
    if (ratio < need) out.push({
      el: (e.tagName.toLowerCase() + (e.className ? '.' + String(e.className.baseVal ?? e.className).trim().split(/\s+/).slice(0, 2).join('.') : '')).slice(0, 38),
      fs: +fs.toFixed(1), ratio: +ratio.toFixed(2), need, t: t.replace(/\s+/g, ' ').slice(0, 26),
    });
  });
  const m = new Map();
  for (const x of out) { const k = x.el + '|' + x.ratio; m.has(k) ? m.get(k).n++ : m.set(k, { ...x, n: 1 }); }
  return [...m.values()].sort((a, b) => a.ratio - b.ratio);
};

head('Szövegkontraszt (WCAG AA)');
for (const v of VIEWS) {
  await pg.goto(`${base}/#/${v}`, { waitUntil: 'load' });
  await pg.waitForTimeout(800);
  const r = await pg.evaluate(probe);
  if (!r.length) { ok('#/' + v); continue; }
  for (const x of r.slice(0, 6)) fail(`#/${v} — ${x.ratio}:1 (kell ${x.need}) ${x.fs}px ${x.el} ×${x.n} "${x.t}"`);
}
await browser.close(); stop();
finish('Kontraszt');
