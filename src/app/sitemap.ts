import type { MetadataRoute } from 'next';
import { routes } from '@/data/navigation';
import { siteConfig } from '@/data/site.config';

/**
 * SITEMAP
 * MIGRÁCIÓ (Emergent): ha nem Next.js alatt fut, ez a fájl kidobható, és
 * helyette egy statikus `public/sitemap.xml` generálható ugyanezekből az
 * útvonalakból (`src/data/navigation.ts` → `routes`).
 */
const priorities: Partial<Record<string, number>> = {
  [routes.home]: 1,
  [routes.snowReport]: 0.9,
  [routes.tickets]: 0.9,
  [routes.guesthouse]: 0.8,
  [routes.availability]: 0.8,
  [routes.quote]: 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-01-17');

  return Object.values(routes).map((path) => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === routes.snowReport || path === '/' ? 'daily' : 'weekly',
    priority: priorities[path] ?? 0.6,
  }));
}
