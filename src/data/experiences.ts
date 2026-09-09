import type { Experience, Localized } from '@/types';
import { routes } from './navigation';

/**
 * ============================================================================
 *  ÉLMÉNYEK ÉS NYÁRI ÜZEM  —  ITT CSERÉLD A PROGRAMOKAT
 * ============================================================================
 */
export const experiences: Experience[] = [
  {
    id: 'toboggan',
    title: { hu: 'Szánkópálya', de: 'Rodelbahn', en: 'Toboggan run' },
    description: {
      hu: '2,4 kilométeres, kivilágított szánkópálya a középállomástól a völgyig. A szánkót a völgyállomáson lehet bérelni, a felvonó este 21:00-ig visz fel.',
      de: '2,4 Kilometer beleuchtete Rodelbahn von der Mittelstation ins Tal. Rodel gibt es an der Talstation, der Lift fährt bis 21:00 Uhr.',
      en: 'A 2.4-kilometre floodlit toboggan run from the mid station to the valley. Sledges can be hired at the base; the lift runs until 21:00.',
    },
    season: 'winter', imageKey: 'exp-toboggan', href: routes.experiences,
    duration: { hu: 'kb. 20 perc lecsúszás', de: 'ca. 20 Minuten Abfahrt', en: 'about a 20-minute descent' },
  },
  {
    id: 'winter-hike',
    title: { hu: 'Téli túraútvonalak', de: 'Winterwanderwege', en: 'Winter hiking trails' },
    description: {
      hu: 'Tizennyolc kilométernyi karbantartott téli túraút a völgyben és a középállomás körül. Hótalpat és túrabotot a kölcsönzőben lehet felvenni.',
      de: '18 Kilometer präparierte Winterwanderwege im Tal und rund um die Mittelstation. Schneeschuhe und Stöcke gibt es im Verleih.',
      en: 'Eighteen kilometres of maintained winter walking trails in the valley and around the mid station. Snowshoes and poles from the rental shop.',
    },
    season: 'winter', imageKey: 'exp-winter-hike', href: routes.experiences,
    duration: { hu: '1–4 óra', de: '1–4 Stunden', en: '1–4 hours' },
  },
  {
    id: 'huts',
    title: { hu: 'Hütték és gasztronómia', de: 'Hütten und Kulinarik', en: 'Huts and food' },
    description: {
      hu: 'Három hütte a hegyen: panorámaétterem a csúcson, hagyományos almhütte a középállomásnál és egy kisebb a keleti völgyben. Csoportoknak előrendeléssel.',
      de: 'Drei Hütten am Berg: Panoramarestaurant am Gipfel, traditionelle Almhütte bei der Mittelstation und eine kleinere im Ostal.',
      en: 'Three huts on the mountain: a panorama restaurant at the summit, a traditional alm hut at the mid station and a smaller one in the eastern valley.',
    },
    season: 'all-year', imageKey: 'exp-hut', href: routes.experiences,
  },
  {
    id: 'family',
    title: { hu: 'Családi programok', de: 'Familienprogramm', en: 'Family activities' },
    description: {
      hu: 'Gyerekpark szőnyegfelvonóval, hullámpálya, bójakapuk és hétvégi gyerekverseny. A síiskola oktatói egész nap a pálya mellett vannak.',
      de: 'Kinderland mit Zauberteppich, Wellenbahn, Toren und Kinderrennen am Wochenende. Die Skischule ist ganztägig vor Ort.',
      en: 'A kids area with a magic carpet, wave track, gates and a weekend children’s race. Ski-school instructors are on site all day.',
    },
    season: 'winter', imageKey: 'exp-family', href: routes.skiSchool,
  },
  {
    id: 'summer-hike',
    title: { hu: 'Nyári hegyi túrák', de: 'Sommerwanderungen', en: 'Summer mountain hikes' },
    description: {
      hu: 'Kilenc jelzett útvonal a gerincről, a kétórás körtúrától a hatórás gerincvándorlásig. A kabinos felvonó 09:00-tól visz fel.',
      de: 'Neun markierte Routen vom Grat, von der Zweistundenrunde bis zur sechsstündigen Gratwanderung. Die Gondel fährt ab 09:00 Uhr.',
      en: 'Nine marked routes from the ridge, from a two-hour loop to a six-hour ridge traverse. The gondola runs from 09:00.',
    },
    season: 'summer', imageKey: 'exp-summer-hike', href: routes.experiences,
    duration: { hu: '2–6 óra', de: '2–6 Stunden', en: '2–6 hours' },
  },
  {
    id: 'bike',
    title: { hu: 'Kerékpározás', de: 'Biken', en: 'Mountain biking' },
    description: {
      hu: 'Két flow-pálya és egy technikás ösvény a gerincről a völgyig. A kabinos felvonó kerékpárt is szállít, e-bike töltés a völgyállomáson.',
      de: 'Zwei Flowtrails und ein technischer Trail vom Grat ins Tal. Die Gondel transportiert Bikes, E-Bike-Ladestation an der Talstation.',
      en: 'Two flow trails and one technical trail from the ridge to the valley. The gondola carries bikes; e-bike charging at the base station.',
    },
    season: 'summer', imageKey: 'exp-bike', href: routes.experiences,
  },
  {
    id: 'viewpoint',
    title: { hu: 'Kilátóterasz', de: 'Aussichtsterrasse', en: 'Viewing terrace' },
    description: {
      hu: 'Körbefutó terasz a csúcsállomáson, 2140 méteren, tájékoztató táblákkal a látható csúcsokról. Akadálymentesen megközelíthető.',
      de: 'Umlaufende Terrasse an der Bergstation auf 2140 Metern, mit Gipfeltafeln. Barrierefrei erreichbar.',
      en: 'A wrap-around terrace at the summit station at 2,140 metres, with panels naming the visible peaks. Step-free access.',
    },
    season: 'all-year', imageKey: 'exp-viewpoint', href: routes.experiences,
  },
  {
    id: 'events',
    title: { hu: 'Rendezvények', de: 'Veranstaltungen', en: 'Events' },
    description: {
      hu: 'Éjszakai verseny, après-ski koncertek, családi nap és szezonzáró. Céges rendezvényt és esküvőt is fogadunk a panorámaétteremben.',
      de: 'Nachtrennen, Après-Ski-Konzerte, Familientag und Saisonabschluss. Auch Firmenfeiern und Hochzeiten im Panoramarestaurant.',
      en: 'Night races, après-ski concerts, a family day and the season finale. We also host company events and weddings in the panorama restaurant.',
    },
    season: 'all-year', imageKey: 'exp-events', href: routes.events,
  },
];

/** További átvezetések az élményoldal aljáról. */
export const experienceBridges: Array<{ id: string; title: Localized; text: Localized; href: string; icon: string }> = [
  {
    id: 'corporate',
    title: { hu: 'Céges rendezvények', de: 'Firmenveranstaltungen', en: 'Company events' },
    text: { hu: 'Csapatépítés a hegyen, zárt terasszal és külön pénztári sávval.', de: 'Teambuilding am Berg, mit eigener Terrasse und Kassenschalter.', en: 'Team days on the mountain, with a private terrace and dedicated ticket desk.' },
    href: routes.groups, icon: 'briefcase',
  },
  {
    id: 'weddings',
    title: { hu: 'Esküvők', de: 'Hochzeiten', en: 'Weddings' },
    text: { hu: 'Szertartás a kilátóteraszon, vacsora a panorámaétteremben, szállás a vendégházban.', de: 'Trauung auf der Aussichtsterrasse, Dinner im Panoramarestaurant, Unterkunft im Gästehaus.', en: 'Ceremony on the viewing terrace, dinner in the panorama restaurant, beds in the guesthouse.' },
    href: routes.inquiry, icon: 'heart',
  },
  {
    id: 'gastro',
    title: { hu: 'Gasztronómia', de: 'Kulinarik', en: 'Food and drink' },
    text: { hu: 'Három hütte a hegyen, csoportos előrendeléssel és helyi alapanyagokkal.', de: 'Drei Hütten am Berg, mit Gruppenvorbestellung und regionalen Zutaten.', en: 'Three huts on the mountain, with group pre-orders and local ingredients.' },
    href: routes.experiences, icon: 'utensils',
  },
  {
    id: 'apres',
    title: { hu: 'Après-ski', de: 'Après-Ski', en: 'Après-ski' },
    text: { hu: 'Élő zene a völgyállomásnál minden pénteken és szombaton 16:00-tól.', de: 'Livemusik an der Talstation, freitags und samstags ab 16:00 Uhr.', en: 'Live music at the base station every Friday and Saturday from 16:00.' },
    href: routes.events, icon: 'music',
  },
  {
    id: 'stay',
    title: { hu: 'Vendégház', de: 'Gästehaus', en: 'Guesthouse' },
    text: { hu: 'Teljes ház 22 főig, 250 méterre a völgyállomástól.', de: 'Ganzes Haus für bis zu 22 Personen, 250 Meter von der Talstation.', en: 'A whole house for up to 22 guests, 250 metres from the base station.' },
    href: routes.stay, icon: 'home',
  },
  {
    id: 'inquiry',
    title: { hu: 'Ajánlatkérés', de: 'Angebotsanfrage', en: 'Request a quote' },
    text: { hu: 'Írd meg az időpontot és a létszámot — 24 órán belül válaszolunk.', de: 'Termin und Personenzahl senden — Antwort binnen 24 Stunden.', en: 'Send us your dates and group size — we reply within 24 hours.' },
    href: routes.inquiry, icon: 'mail',
  },
];
