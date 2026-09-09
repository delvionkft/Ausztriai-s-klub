import type { Locale, ResortInfo } from '@/types';
import { PLACEHOLDER_TEXT } from './placeholders';

/**
 * A síközpont alapadatai.
 * `null` = tulajdonosi adatra vár, a felületen helyőrző jelenik meg.
 */
export const resortInfo: ResortInfo = {
  name: null,
  shortName: null,
  tagline: 'Alpesi síélmény, egy helyen a hegy, a pályák és a szállás.',
  region: null,
  country: null,
  altitudeValleyM: null,
  altitudePeakM: null,
  totalSlopeLengthKm: null,
  verticalDropM: null,
  liftCount: null,
  snowmakingCoveragePercent: null,
};

/** Megjelenítéshez használt név — amíg nincs márkanév, semleges megnevezés. */
export const displayName = resortInfo.name ?? PLACEHOLDER_TEXT.resortNameShort;
export const displayNameLong = resortInfo.name ?? PLACEHOLDER_TEXT.resortName;

export const siteConfig = {
  /** SEO / Open Graph alap-URL. Éles környezetben .env-ből. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
  defaultLocale: 'hu' as Locale,
  locales: ['hu', 'de', 'en'] as Locale[],
  defaultTitle: `${displayNameLong} — hóhelyzet, jegyek és szállás`,
  defaultDescription:
    'Aktuális hóhelyzet, pályák és felvonók állapota, jegyárak, síiskola és teljes ház szállás egy helyen.',
  ogImage: '/og/og-default.svg',
  themeColor: '#0E2540',
} as const;

export const localeLabels: Record<Locale, { short: string; long: string }> = {
  de: { short: 'DE', long: 'Deutsch' },
  en: { short: 'EN', long: 'English' },
  hu: { short: 'HU', long: 'Magyar' },
};
