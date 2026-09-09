/**
 * STRUKTURÁLT ADATOK (schema.org / JSON-LD)
 * ----------------------------------------------------------------------------
 * Keretrendszer-független: tiszta objektumokat állít elő, a beillesztést a
 * `components/seo/JsonLd.tsx` végzi.
 *
 * FONTOS SZABÁLY: kitalált üzleti adat NEM kerülhet a strukturált adatba.
 * Minden `null` mező kimarad a kimenetből — a Google a hiányzó mezőt tolerálja,
 * a valótlan adatot nem.
 */
import type { FaqItem, ResortEvent } from '@/types';
import { resortInfo, siteConfig, displayNameLong } from '@/data/site.config';
import { contactInfo } from '@/data/contact';
import { accommodationIntro } from '@/data/accommodation';
import { routes } from '@/data/navigation';

type Json = Record<string, unknown>;

/** Az `undefined` és a `null` értékű kulcsokat kiszedi (rekurzívan). */
function prune<T extends Json>(input: T): T {
  const output: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === null || value === undefined || value === '') continue;
    if (Array.isArray(value)) {
      const items = value.filter((item) => item !== null && item !== undefined);
      if (items.length > 0) output[key] = items;
      continue;
    }
    if (typeof value === 'object') {
      const nested = prune(value as Json);
      if (Object.keys(nested).length > 1) output[key] = nested; // csak @type ne maradjon
      continue;
    }
    output[key] = value;
  }
  return output as T;
}

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

function postalAddress(): Json | null {
  const address = prune({
    '@type': 'PostalAddress',
    streetAddress: contactInfo.addressLine,
    postalCode: contactInfo.postalCode,
    addressLocality: contactInfo.city,
    addressCountry: contactInfo.country,
  });
  return Object.keys(address).length > 1 ? address : null;
}

function geoCoordinates(): Json | null {
  if (contactInfo.gpsLat === null || contactInfo.gpsLng === null) return null;
  return { '@type': 'GeoCoordinates', latitude: contactInfo.gpsLat, longitude: contactInfo.gpsLng };
}

/** A síközpont mint hely (SkiResort a LocalBusiness leszármazottja). */
export function skiResortSchema(): Json {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'SkiResort',
    '@id': `${siteConfig.url}#skiresort`,
    name: displayNameLong,
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: postalAddress(),
    geo: geoCoordinates(),
    areaServed: resortInfo.region,
    sameAs: contactInfo.social.map((item) => item.url).filter((url): url is string => Boolean(url)),
  });
}

/** A vendégház mint szálláshely. */
export function lodgingSchema(): Json {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${siteConfig.url}${routes.guesthouse}#lodging`,
    name: accommodationIntro.title,
    description: accommodationIntro.lead,
    url: absoluteUrl(routes.guesthouse),
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: postalAddress(),
    geo: geoCoordinates(),
    petsAllowed: undefined, // tulajdonosi adatra vár
  });
}

/** Események — csak a kihirdetett (dátummal rendelkező) elemek kerülnek bele. */
export function eventListSchema(items: ResortEvent[]): Json | null {
  const dated = items.filter((item) => Boolean(item.date));
  if (dated.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: dated.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: prune({
        '@type': 'Event',
        name: item.title,
        description: item.excerpt,
        startDate: item.date,
        endDate: item.endDate,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: prune({
          '@type': 'Place',
          name: item.location ?? displayNameLong,
          address: postalAddress(),
        }),
      }),
    })),
  };
}

/** GYIK — a Google „FAQ” találati kiemeléséhez. */
export function faqSchema(items: FaqItem[]): Json | null {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Morzsamenü — az aloldalak helyét mutatja a keresőnek. */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

/** A weboldal maga (kereső-doboz nélkül, mert nincs belső kereső). */
export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    name: displayNameLong,
    url: siteConfig.url,
    inLanguage: siteConfig.locales,
  };
}
