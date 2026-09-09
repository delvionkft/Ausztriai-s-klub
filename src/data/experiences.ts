import type { ExperienceItem } from '@/types';

/** ÉLMÉNYKÁRTYÁK — téli és nyári (drótváz 11/03). */
export const experiences: ExperienceItem[] = [
  {
    id: 'toboggan',
    title: 'Szánkópálya',
    season: 'winter',
    description: 'Kivilágított szánkópálya a völgyállomás mellől, szánkókölcsönzéssel.',
    icon: 'Snowflake',
    detail: null,
    imageKey: 'exp-toboggan',
  },
  {
    id: 'winter-hike',
    title: 'Téli túra',
    season: 'winter',
    description: 'Előkészített téli túraútvonalak és hótalpas szakaszok a pályák mellett.',
    icon: 'Footprints',
    detail: null,
    imageKey: 'exp-winterhike',
  },
  {
    id: 'huts',
    title: 'Hütték',
    season: 'winter',
    description: 'Melegedő és étkezés a hegyen, napozóterasszal a déli oldalon.',
    icon: 'Home',
    detail: null,
    imageKey: 'exp-hut',
  },
  {
    id: 'family',
    title: 'Családi program',
    season: 'winter',
    description: 'Gyerekpark, szőnyegfelvonó és játékos oktatás a legkisebbeknek.',
    icon: 'Baby',
    detail: null,
    imageKey: 'exp-family',
  },
  {
    id: 'summer-hike',
    title: 'Nyári túra',
    season: 'summer',
    description: 'Jelzett túraútvonalak a gerincen, felvonós felszállási lehetőséggel.',
    icon: 'Mountain',
    detail: null,
    imageKey: 'exp-summerhike',
  },
  {
    id: 'bike',
    title: 'Kerékpár',
    season: 'summer',
    description: 'Kerékpáros útvonalak és felvonós szállítás a hegyi kiindulópontig.',
    icon: 'Bike',
    detail: null,
    imageKey: 'exp-bike',
  },
  {
    id: 'viewpoint',
    title: 'Kilátó',
    season: 'summer',
    description: 'Panorámapont a csúcson, akadálymentes megközelítéssel a felvonótól.',
    icon: 'Binoculars',
    detail: null,
    imageKey: 'exp-view',
  },
  {
    id: 'events',
    title: 'Rendezvény',
    season: 'all',
    description: 'Céges nap, csapatépítés és esküvő a hegyen — teljes szervezéssel.',
    icon: 'PartyPopper',
    detail: null,
    imageKey: 'exp-event',
  },
];

export const gastroInfo = {
  title: 'Gasztronómia és après-ski',
  description:
    'A pálya melletti vendéglátóhelyeken meleg ételt, kávét és après-ski hangulatot találsz. A pontos kínálatot és nyitvatartást az üzemeltetők adják meg.',
  points: [
    'Önkiszolgáló étterem a völgyállomáson',
    'Hütte a középállomás közelében, napozóterasszal',
    'Après-ski bár a felvonó zárása után',
    'Csoportos étkezés előzetes egyeztetéssel',
  ],
} as const;
