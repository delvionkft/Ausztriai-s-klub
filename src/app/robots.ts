import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site.config';

/**
 * ROBOTS.TXT
 * MIGRÁCIÓ (Emergent): kiváltható statikus `public/robots.txt` fájllal.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
