import type { ResortInfo } from '@/types';

/**
 * ============================================================================
 *  A SÍKÖZPONT ALAPADATAI  —  ITT CSERÉLD A CÉGES ADATOKAT
 * ============================================================================
 *  Márkanév, székhely, magasságadatok, szezon. Ezek az értékek jelennek meg a
 *  fejlécben, a láblécben, a strukturált adatokban és az oldalcímekben.
 *
 *  A jelenlegi értékek egy valósághű bemutató síközpontot írnak le
 *  (Silbergrat Skiarena). Élesítéskor cseréld a saját adataidra.
 * ============================================================================
 */
export const resortInfo: ResortInfo = {
  name: 'Silbergrat Skiarena',
  shortName: 'Silbergrat',
  legalName: 'Silbergrat Bergbahnen GmbH',
  tagline: {
    hu: 'Alpesi síaréna és vendégház, két völgy között.',
    de: 'Skiarena und Gästehaus zwischen zwei Tälern.',
    en: 'Alpine ski arena and guesthouse between two valleys.',
  },
  region: 'Salzburger Land',
  country: 'Ausztria',
  altitudeValleyM: 860,
  altitudePeakM: 2140,
  totalSlopeLengthKm: 33,
  verticalDropM: 1280,
  liftCount: 8,
  slopeCount: 14,
  snowmakingCoveragePercent: 79,
  seasonStart: '2025-12-05',
  seasonEnd: '2026-04-06',
};

export const siteConfig = {
  /** Nyilvános alap-URL. Éles környezetben `.env` -> NEXT_PUBLIC_SITE_URL */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://silbergrat.example',
  name: resortInfo.name,
  defaultTitle: `${resortInfo.name} — hóhelyzet, jegyek és vendégház`,
  defaultDescription:
    'Aktuális hóhelyzet, pályák és felvonók élő állapota, jegyárak, síiskola és teljes ház vendégház a pálya lábánál. Minden egy helyen.',
  ogImage: '/og/og-default.svg',
  themeColor: '#07111F',
  /** A pénznem, amiben az árak megjelennek. */
  currency: 'EUR',
} as const;
