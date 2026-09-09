import { HomeHero } from '@/components/sections/home/HomeHero';
import { IntentSelector } from '@/components/sections/home/IntentSelector';
import { CurrentOffer } from '@/components/sections/home/CurrentOffer';
import { MountainStats } from '@/components/sections/home/MountainStats';
import { AccommodationTeaser } from '@/components/sections/home/AccommodationTeaser';
import { HomeEvents } from '@/components/sections/home/HomeEvents';
import { AccessQuickInfo } from '@/components/sections/home/AccessQuickInfo';
import { SnowAlertSection } from '@/components/sections/home/SnowAlertSection';
import { jsonLd } from '@/lib/seo';
import { siteConfig, resortInfo } from '@/data/site.config';
import { events } from '@/data/events';

/** Kezdőlap — a specifikáció 5.1–5.8 szekciói. */
const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: resortInfo.name,
  url: siteConfig.url,
  inLanguage: ['hu', 'de', 'en'],
  publisher: { '@type': 'Organization', name: resortInfo.legalName },
};

const eventsLd = events.slice(0, 3).map((event) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title.hu,
  startDate: event.date,
  ...(event.endDate ? { endDate: event.endDate } : {}),
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: event.location, address: `${event.location}, ${resortInfo.name}` },
  description: event.excerpt.hu,
  organizer: { '@type': 'Organization', name: resortInfo.legalName, url: siteConfig.url },
}));

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([websiteLd, ...eventsLd])} />
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
