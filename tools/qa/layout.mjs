/**
 * Elrendezés-vizsgálat négy képernyőméreten, mind a hét nézeten.
 *
 * Amit megfog:
 *  - vízszintes görgetés (a lap szélesebb a képernyőnél)
 *  - kilógó elem (a gyerek túlnyúlik a szülő dobozán)
 *  - levágott szöveg (scrollWidth > clientWidth rejtett túlcsordulás mellett)
 *  - 10 px alatti betűméret
 *  - 40 px alatti érintőfelület érintőképernyőn
 *
 * Ezek azok a hibaosztályok, amiket korábban a megrendelő vett észre először.
 */
import { serve, launch, settle, VIEWS, PROFILES, head, fail, warn, ok, finish } from './lib.mjs';

const { base, stop } = await serve();
const browser = await launch();

/** Az elemző a böngészőben fut — itt nincs DOM, ezért a függvény szövegként megy át. */
const probe = () => {
  const vw = document.documentElement.clientWidth;
  const out = { scroll: document.documentElement.scrollWidth - vw, bleed: [], clip: [], tiny: [], tap: [] };
  const root = document.querySelector('.view.is-active');
  if (!root) return out;

  const visible = e => {
    const s = getComputedStyle(e);
    return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05 && e.offsetParent !== null;
  };
  const name = e => (e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') +
    (e.className ? '.' + String(e.className.baseVal ?? e.className).trim().split(/\s+/).slice(0, 2).join('.') : '')).slice(0, 44);
  const text = e => (e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30);

  root.querySelectorAll('*').forEach(e => {
    if (!visible(e)) return;
    const p = e.parentElement;
    if (!p || p === root) return;
    const ps = getComputedStyle(p);
    if (ps.overflow !== 'visible' && ps.overflowX !== 'visible') return;
    const es = getComputedStyle(e);
    if (es.position === 'absolute' || es.position === 'fixed') return;
    const a = e.getBoundingClientRect(), c = p.getBoundingClientRect();
    if (!a.width || !c.width) return;
    const over = Math.max(c.left - a.left, a.right - c.right);
    if (over > 1.5) out.bleed.push({ el: name(e), inside: name(p), px: Math.round(over), t: text(e) });
  });

  root.querySelectorAll('p,span,b,small,h1,h2,h3,li,a,button,dd,dt,output,em,i,label').forEach(e => {
    if (!visible(e)) return;
    if (e.scrollWidth - e.clientWidth > 1 && getComputedStyle(e).overflow !== 'visible')
      out.clip.push({ el: name(e), px: e.scrollWidth - e.clientWidth, t: text(e) });
    const fs = parseFloat(getComputedStyle(e).fontSize);
    if (fs < 10 && text(e)) out.tiny.push({ el: name(e), fs: +fs.toFixed(1), t: text(e) });
  });

  if (matchMedia('(pointer:coarse)').matches)
    root.querySelectorAll('a,button,[role=button],select,input[type=checkbox]').forEach(e => {
      if (!visible(e)) return;
      const r = e.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      /* A becsomagoló címke adhatja az érintőfelületet — azt nézzük, ha van. */
      const hit = e.closest('label') || e;
      const hr = hit.getBoundingClientRect();
      if (hr.height < 40 || hr.width < 40)
        out.tap.push({ el: name(e), w: Math.round(hr.width), h: Math.round(hr.height), t: text(e) });
    });
  return out;
};

const dedup = arr => {
  const m = new Map();
  for (const x of arr) {
    const k = x.el + '|' + (x.px ?? x.fs ?? x.h);
    m.has(k) ? m.get(k).n++ : m.set(k, { ...x, n: 1 });
  }
  return [...m.values()];
};

for (const [label, opts] of PROFILES) {
  head(`${label} (${opts.viewport.width}px)`);
  const ctx = await browser.newContext(opts);
  const pg = await ctx.newPage();
  for (const v of VIEWS) {
    await pg.goto(`${base}/#/${v}`, { waitUntil: 'load' });
    await settle(pg);
    const r = await pg.evaluate(probe);
    const view = '#/' + (v || '');
    let clean = true;
    if (r.scroll > 0) { fail(`${view} — vízszintes görgetés +${r.scroll}px`); clean = false; }
    for (const x of dedup(r.bleed).slice(0, 5)) { fail(`${view} — kilóg ${x.px}px: ${x.el} (${x.inside}) ×${x.n} "${x.t}"`); clean = false; }
    for (const x of dedup(r.clip).slice(0, 5))  { fail(`${view} — levágva ${x.px}px: ${x.el} ×${x.n} "${x.t}"`); clean = false; }
    for (const x of dedup(r.tiny).slice(0, 4))  { warn(`${view} — ${x.fs}px betű: ${x.el} ×${x.n} "${x.t}"`); }
    for (const x of dedup(r.tap).slice(0, 4))   { warn(`${view} — érintőfelület ${x.w}×${x.h}: ${x.el} ×${x.n} "${x.t}"`); }
    if (clean) ok(view);
  }
  await ctx.close();
}

await browser.close(); stop();
finish('Elrendezés');
