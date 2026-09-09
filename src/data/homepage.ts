import type { Localized } from '@/types';
import { routes } from './navigation';
import { slopeTotals, liftTotals } from './derived';
import { resortInfo } from './site.config';

/**
 * ============================================================================
 *  KEZDŐLAP TARTALMA  —  ITT CSERÉLD AZ AJÁNLATOT ÉS A KIEMELÉSEKET
 * ============================================================================
 */

/** 5.2 — látogatói szándékválasztó. */
export interface IntentCard {
  id: 'today' | 'beginner' | 'multi-day' | 'group';
  href: string;
  imageKey: string;
  icon: 'snowflake' | 'graduation-cap' | 'calendar-days' | 'users';
}

export const intentCards: IntentCard[] = [
  { id: 'today', href: routes.snowReport, imageKey: 'intent-today', icon: 'snowflake' },
  { id: 'beginner', href: routes.skiSchool, imageKey: 'intent-beginner', icon: 'graduation-cap' },
  { id: 'multi-day', href: routes.tickets, imageKey: 'intent-multiday', icon: 'calendar-days' },
  { id: 'group', href: routes.groups, imageKey: 'intent-group', icon: 'users' },
];

/** 5.3 — aktuális ajánlat. */
export const currentOffer = {
  imageKey: 'offer-season-pass',
  badge: { hu: 'Szezonbérlet 2025/26', de: 'Saisonkarte 2025/26', en: 'Season pass 2025/26' } as Localized,
  title: {
    hu: 'Tizenkét síelési nap fölött már a bérlet éri meg',
    de: 'Ab zwölf Skitagen rechnet sich die Saisonkarte',
    en: 'From twelve ski days, the season pass pays for itself',
  } as Localized,
  text: {
    hu: 'Korlátlan síelés a teljes szezonban, esti síeléssel együtt, 15% kedvezménnyel a hüttékben és ingyenes szezonális sítárolóval. December 1-ig elővételi áron.',
    de: 'Unbegrenztes Skifahren die ganze Saison inklusive Nachtskilauf, 15% Rabatt in den Hütten und kostenloses Saison-Skidepot. Bis 1. Dezember zum Vorverkaufspreis.',
    en: 'Unlimited skiing all season including night skiing, 15% off in the huts and a free season ski locker. At the early-bird price until 1 December.',
  } as Localized,
  priceEur: 549,
  priceNote: { hu: 'felnőtt, elővételben 499 €', de: 'Erwachsene, im Vorverkauf 499 €', en: 'adult, 499 € in advance' } as Localized,
  href: routes.tickets,
  bullets: [
    { hu: 'Minden felvonó, minden nyitvatartási napon', de: 'Alle Anlagen, an jedem Betriebstag', en: 'Every lift, every operating day' },
    { hu: 'Esti síelés kedden és pénteken', de: 'Nachtskilauf am Dienstag und Freitag', en: 'Night skiing on Tuesdays and Fridays' },
    { hu: 'Ingyenes szezonális sítároló a völgyállomáson', de: 'Kostenloses Saison-Skidepot an der Talstation', en: 'Free season ski locker at the base station' },
  ] as Localized[],
};

/** 5.4 — a hegy számokban. Az értékek a pálya- és felvonólistából számítottak. */
export const mountainStats: Array<{ id: string; value: string; label: Localized; icon: string }> = [
  {
    id: 'length', value: `${slopeTotals.totalKm} km`,
    label: { hu: 'Teljes pályahossz', de: 'Pistenkilometer gesamt', en: 'Total slope length' },
    icon: 'route',
  },
  {
    id: 'vertical', value: `${resortInfo.verticalDropM} m`,
    label: { hu: 'Szintkülönbség', de: 'Höhenunterschied', en: 'Vertical drop' },
    icon: 'trending-up',
  },
  {
    id: 'lifts', value: `${liftTotals.count}`,
    label: { hu: 'Felvonó', de: 'Anlagen', en: 'Lifts' },
    icon: 'cable-car',
  },
  {
    id: 'snowmaking', value: `${slopeTotals.snowmakingPercent}%`,
    label: { hu: 'Hóágyúzott pálya', de: 'Beschneite Pisten', en: 'Snowmaking coverage' },
    icon: 'snowflake',
  },
];

/** 5.5 — vendégház kiemelés. */
export const stayHighlights: Localized[] = [
  { hu: '22 fő, hat hálószoba, négy fürdőszoba', de: '22 Personen, sechs Schlafzimmer, vier Bäder', en: '22 guests, six bedrooms, four bathrooms' },
  { hu: 'Kizárólagos használat — nincs idegen a házban', de: 'Alleinnutzung — keine fremden Gäste im Haus', en: 'Exclusive use — no other guests in the house' },
  { hu: '250 méterre a völgyállomástól, gyalog', de: '250 Meter zur Talstation, zu Fuß', en: '250 metres to the base station, on foot' },
  { hu: 'Egy kapcsolattartó, egy számla', de: 'Eine Kontaktperson, eine Rechnung', en: 'One contact person, one invoice' },
];

/** 5.7 — megközelítés gyorsinfó. */
export const accessFacts: Array<{ id: string; icon: string; label: Localized; value: Localized }> = [
  {
    id: 'address', icon: 'map-pin',
    label: { hu: 'Cím', de: 'Adresse', en: 'Address' },
    value: { hu: 'Talstationsweg 4, 5730 Silbergrat', de: 'Talstationsweg 4, 5730 Silbergrat', en: 'Talstationsweg 4, 5730 Silbergrat' },
  },
  {
    id: 'parking', icon: 'circle-parking',
    label: { hu: 'Parkolás', de: 'Parken', en: 'Parking' },
    value: { hu: '420 ingyenes hely a völgyállomásnál', de: '420 kostenlose Plätze an der Talstation', en: '420 free spaces at the base station' },
  },
  {
    id: 'from-salzburg', icon: 'car',
    label: { hu: 'Salzburgból', de: 'Ab Salzburg', en: 'From Salzburg' },
    value: { hu: '92 km · 1 óra 15 perc', de: '92 km · 1 Std. 15 Min.', en: '92 km · 1 hr 15 min' },
  },
];
