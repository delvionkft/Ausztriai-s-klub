#!/usr/bin/env node
/**
 * robots.txt + sitemap.xml előállítása a végleges domainnel.
 *
 *   node tools/generate-seo-files.mjs https://ludwighaus.at
 *
 * Miért csak egy URL van a sitemapban?
 * Mert a lap jelenleg egyetlen HTML dokumentum, és a hét nézet horgonnyal
 * (#/szobak) váltakozik. A Google a horgonyt eldobja, tehát számára egyetlen
 * cím létezik. Amint a nézetek valódi útvonalat kapnak (/szobak, /sipalyak…),
 * írd át a ROUTES tömböt `hash:false`-ra, és a sitemap hét sorossá válik.
 * Részletek: docs/seo-audit.md, H1 pont.
 */
import fs from 'node:fs';
import path from 'node:path';

const origin = (process.argv[2] || '').replace(/\/+$/, '');
if (!/^https?:\/\/[^/\s]+$/.test(origin)) {
  console.error('Használat: node tools/generate-seo-files.mjs https://a-domained.at');
  process.exit(1);
}

/** Igazra állítsd, ha a nézetek már valódi útvonalon érhetők el. */
const REAL_ROUTES = false;

const ROUTES = [
  { p: '',              prio: '1.0', freq: 'weekly'  },
  { p: 'szobak',        prio: '0.9', freq: 'monthly' },
  { p: 'sipalyak',      prio: '0.8', freq: 'monthly' },
  { p: 'kikapcsolodas', prio: '0.7', freq: 'monthly' },
  { p: 'galeria',       prio: '0.6', freq: 'monthly' },
  { p: 'kapcsolat',     prio: '0.8', freq: 'yearly'  },
  { p: 'hazirend',      prio: '0.3', freq: 'yearly'  },
];

const today = new Date().toISOString().slice(0, 10);
const urls = (REAL_ROUTES ? ROUTES : ROUTES.slice(0, 1)).map(r => `  <url>
    <loc>${origin}/${r.p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.prio}</priority>
  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `# Ludwighaus — robots.txt
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

const out = path.join(process.cwd(), 'preview');
fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(out, 'robots.txt'), robots);
console.log(`Kész: preview/robots.txt és preview/sitemap.xml (${REAL_ROUTES ? ROUTES.length : 1} URL, domain: ${origin})`);
console.log('Ne feledd: a preview/ludwighause-experience.html fejlécében a window.LH_SEO.origin értékét is állítsd be.');
