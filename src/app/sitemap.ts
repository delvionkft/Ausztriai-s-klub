import type { MetadataRoute } from 'next';
import { routes } from '@/data/navigation';
import { siteConfig } from '@/data/site.config';

/** Sitemap — minden nyilvános útvonal, prioritással és frissítési gyakorisággal. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: routes.home, priority: 1, changeFrequency: 'daily' },
    { path: routes.snowReport, priority: 0.95, changeFrequency: 'hourly' },
    { path: routes.slopeMap, priority: 0.8, changeFrequency: 'weekly' },
    { path: routes.lifts, priority: 0.85, changeFrequency: 'daily' },
    { path: routes.tickets, priority: 0.9, changeFrequency: 'weekly' },
    { path: routes.skiSchool, priority: 0.8, changeFrequency: 'monthly' },
    { path: routes.stay, priority: 0.9, changeFrequency: 'weekly' },
    { path: routes.groups, priority: 0.8, changeFrequency: 'monthly' },
    { path: routes.availability, priority: 0.85, changeFrequency: 'daily' },
    { path: routes.inquiry, priority: 0.8, changeFrequency: 'monthly' },
    { path: routes.experiences, priority: 0.7, changeFrequency: 'weekly' },
    { path: routes.contact, priority: 0.7, changeFrequency: 'monthly' },
    { path: routes.houseRules, priority: 0.3, changeFrequency: 'yearly' },
    { path: routes.privacy, priority: 0.3, changeFrequency: 'yearly' },
    { path: routes.cookies, priority: 0.3, changeFrequency: 'yearly' },
    { path: routes.terms, priority: 0.3, changeFrequency: 'yearly' },
    { path: routes.imprint, priority: 0.3, changeFrequency: 'yearly' },
  ];

  return entries.map((entry) => ({
    url: `${siteConfig.url}${entry.path === '/' ? '' : entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
