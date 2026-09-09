import type { Metadata } from 'next';
import { HomeHero } from '@/components/sections/home/HomeHero';
import { IntentSelector } from '@/components/sections/home/IntentSelector';
import { CurrentOffer } from '@/components/sections/home/CurrentOffer';
import { MountainStats } from '@/components/sections/home/MountainStats';
import { AccommodationTeaser } from '@/components/sections/home/AccommodationTeaser';
import { HomeEvents } from '@/components/sections/home/HomeEvents';
import { AccessQuickInfo } from '@/components/sections/home/AccessQuickInfo';
import { SnowAlertSection } from '@/components/sections/home/SnowAlertSection';
import { siteConfig } from '@/data/site.config';

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  alternates: { canonical: '/' },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: '/',
  },
};

/**
 * 01 · KEZDŐLAP — szekciók a drótváz sorrendjében.
 * 01 fejléc + élő státuszsáv .......... SiteShell (globális)
 * 02 hero + 03 CTA ................... HomeHero
 * 04 szándék-választó ................ IntentSelector
 * 05 aktuális ajánlat ................ CurrentOffer
 * 06 a hegy számokban ................ MountainStats
 * 07 szállás & vendégház ............. AccommodationTeaser
 * 08 események / hírek (max 3) ....... HomeEvents
 * 09 megközelítés & gyors infó ....... AccessQuickInfo
 * 10 hóriasztó feliratkozás .......... SnowAlertSection
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <IntentSelector />
      <CurrentOffer />
      <MountainStats />
      <AccommodationTeaser />
      <HomeEvents />
      <AccessQuickInfo />
      <SnowAlertSection />
    </>
  );
}
