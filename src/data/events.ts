import type { EventItem, NewsItem } from '@/types';
import { routes } from './navigation';

/**
 * ============================================================================
 *  ESEMÉNYEK ÉS HÍREK  —  ITT CSERÉLD A PROGRAMOKAT
 * ============================================================================
 *  A dátumok szándékosan rögzített ISO értékek. A szerveren előállított HTML-nek
 *  és a böngésző első renderjének azonosnak kell lennie, ezért itt nem
 *  számolunk a `new Date()`-ből. Új eseménynél egyszerűen írd át a `date` mezőt.
 * ============================================================================
 */

export const events: EventItem[] = [
  {
    id: 'night-race',
    title: { hu: 'Silbergrat éjszakai szlalom', de: 'Silbergrat Nachtslalom', en: 'Silbergrat night slalom' },
    date: '2026-01-24',
    category: { hu: 'Verseny', de: 'Rennen', en: 'Race' },
    location: 'Almwiese pálya, középállomás',
    excerpt: {
      hu: 'Nyílt szlalomverseny amatőröknek és haladóknak, kivilágított pályán. Nevezés a helyszínen 17:30-ig, kategóriák korosztály szerint.',
      de: 'Offener Slalom für Amateure und Fortgeschrittene auf beleuchteter Piste. Nennung vor Ort bis 17:30 Uhr.',
      en: 'An open slalom for amateurs and advanced skiers on the floodlit slope. Entry on site until 17:30.',
    },
    imageKey: 'event-night-race',
    href: routes.events,
  },
  {
    id: 'family-day',
    title: { hu: 'Családi nap a gyerekparkban', de: 'Familientag im Kinderland', en: 'Family day in the kids area' },
    date: '2026-01-31',
    category: { hu: 'Család', de: 'Familie', en: 'Family' },
    location: 'Gyerekpark, völgyállomás',
    excerpt: {
      hu: 'Ingyenes próbaóra a síiskolával, akadálypálya, arcfestés és forró csoki. A 14 év alattiak jegye ezen a napon ingyenes.',
      de: 'Gratis Schnupperstunde mit der Skischule, Hindernisparcours, Kinderschminken und heiße Schokolade. Kinder unter 14 fahren gratis.',
      en: 'A free taster lesson with the ski school, an obstacle course, face painting and hot chocolate. Under-14s ski free that day.',
    },
    imageKey: 'event-family-day',
    href: routes.events,
  },
  {
    id: 'apres-concert',
    title: { hu: 'Après-ski koncert a völgyállomásnál', de: 'Après-Ski-Konzert an der Talstation', en: 'Après-ski concert at the base station' },
    date: '2026-02-07',
    category: { hu: 'Zene', de: 'Musik', en: 'Music' },
    location: 'Völgyállomás előtti tér',
    excerpt: {
      hu: 'Élő zenekar 16:00-tól, helyi ételek és forralt bor a szabadtéri standoknál. Belépés díjmentes, síjegy nem szükséges.',
      de: 'Livemusik ab 16:00 Uhr, regionale Speisen und Glühwein an den Ständen. Eintritt frei, kein Skipass nötig.',
      en: 'Live band from 16:00, local food and mulled wine at the outdoor stalls. Free entry, no lift pass required.',
    },
    imageKey: 'event-apres',
    href: routes.events,
  },
  {
    id: 'season-finale',
    title: { hu: 'Szezonzáró hétvége', de: 'Saisonabschluss-Wochenende', en: 'Season finale weekend' },
    date: '2026-04-04',
    endDate: '2026-04-05',
    category: { hu: 'Rendezvény', de: 'Veranstaltung', en: 'Event' },
    location: 'Teljes síterep',
    excerpt: {
      hu: 'Jelmezes lecsúszás, grillparti a napozóteraszon és zárónapi menü minden hüttében. A gyerekjegy mindkét napon díjmentes.',
      de: 'Kostümabfahrt, Grillfest auf der Sonnenterrasse und Abschlussmenü in allen Hütten. Kinderkarten an beiden Tagen gratis.',
      en: 'A fancy-dress descent, a barbecue on the sun terrace and a finale menu in every hut. Children ski free on both days.',
    },
    imageKey: 'exp-events',
    href: routes.events,
  },
];

export const news: NewsItem[] = [
  {
    id: 'snowmaking-ready',
    title: { hu: 'Elkészült a hóágyúzás a Talabfahrt pályán', de: 'Beschneiung der Talabfahrt abgeschlossen', en: 'Snowmaking finished on the Talabfahrt' },
    date: '2026-01-15',
    category: { hu: 'Hegyi hírek', de: 'Bergnews', en: 'Mountain news' },
    excerpt: {
      hu: 'A völgybe vezető záró szakaszon befejeztük a hóágyúzást. A pálya a hó ülepedése után, várhatóan két napon belül nyit.',
      de: 'Auf dem Talabschnitt ist die Beschneiung abgeschlossen. Die Piste öffnet voraussichtlich in zwei Tagen.',
      en: 'Snowmaking on the final valley section is complete. The run is expected to open within two days once the snow settles.',
    },
    imageKey: 'news-snowmaking',
    href: routes.snowReport,
  },
  {
    id: 'new-gondola-cabins',
    title: { hu: 'Új kabinok a Silbergratbahnon', de: 'Neue Kabinen an der Silbergratbahn', en: 'New cabins on the Silbergratbahn' },
    date: '2026-01-08',
    category: { hu: 'Fejlesztés', de: 'Ausbau', en: 'Development' },
    excerpt: {
      hu: 'A nyáron kicseréltük a kabinos felvonó teljes kabinparkját. Az új, 10 személyes kabinok fűtött üléssel és kerékpártartóval üzemelnek.',
      de: 'Im Sommer haben wir alle Kabinen der Gondelbahn getauscht. Die neuen 10er-Kabinen haben Sitzheizung und Bikehalterung.',
      en: 'We replaced the gondola’s entire cabin fleet over the summer. The new 10-person cabins have heated seats and bike racks.',
    },
    imageKey: 'lift-gondola',
    href: routes.lifts,
  },
  {
    id: 'guesthouse-sauna',
    title: { hu: 'Szauna és pihenőrész a vendégházban', de: 'Sauna und Ruhebereich im Gästehaus', en: 'Sauna and relaxation area at the guesthouse' },
    date: '2025-12-30',
    category: { hu: 'Vendégház', de: 'Gästehaus', en: 'Guesthouse' },
    excerpt: {
      hu: 'Az alsó szinten elkészült a finn szauna és a hozzá tartozó pihenőrész. Használata minden foglalásban benne van, felár nélkül.',
      de: 'Im Untergeschoss sind finnische Sauna und Ruhebereich fertig. Die Nutzung ist in jeder Buchung ohne Aufpreis enthalten.',
      en: 'The Finnish sauna and its relaxation area are finished on the lower level. Use is included in every booking at no extra cost.',
    },
    imageKey: 'stay-sauna',
    href: routes.stay,
  },
];

/** Kezdőlapon legfeljebb három elem jelenik meg — események előre. */
export const homeHighlights = [...events.slice(0, 2), ...news.slice(0, 1)];
