import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { siteConfig, resortInfo } from '@/data/site.config';
import { events } from '@/data/events';
import { ExperiencesView } from './ExperiencesView';

export const metadata = pageMetadata({
  title: 'Élmények és nyári üzem — programok a hegyen',
  description:
    'Szánkópálya, téli túrák, hütték és családi programok télen; hegyi túrák, kerékpározás és kilátóterasz nyáron. Közelgő események és rendezvények.',
  path: routes.experiences,
});

const eventsLd = events.map((event) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title.hu,
  startDate: event.date,
  ...(event.endDate ? { endDate: event.endDate } : {}),
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: event.location, address: `${event.location}, ${resortInfo.name}` },
  description: event.excerpt.hu,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  organizer: { '@type': 'Organization', name: resortInfo.legalName, url: siteConfig.url },
}));

export default function ExperiencesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          ...eventsLd,
          breadcrumbLd([{ name: 'Élmények', path: routes.experiences }]),
        ])}
      />
      <ExperiencesView />
    </>
  );
}
