import { routes } from './navigation';

/** SZÁNDÉK-VÁLASZTÓ — a fő elágazás (drótváz 01/03). */
export const intentOptions = [
  {
    id: 'today',
    title: 'Ma síelni jövök',
    description: 'Hóhelyzet, nyitott pályák és felvonók, jegyvásárlás.',
    href: routes.snowReport,
    icon: 'Snowflake',
  },
  {
    id: 'beginner',
    title: 'Először síelnék',
    description: 'Síiskola, kölcsönző és kezdőcsomag egy helyen.',
    href: routes.skiSchool,
    icon: 'GraduationCap',
  },
  {
    id: 'multiday',
    title: 'Több napra jönnék',
    description: 'Többnapos bérlet és szállás a hegy lábánál.',
    href: routes.availability,
    icon: 'CalendarDays',
  },
  {
    id: 'group',
    title: 'Csoportot hozok',
    description: 'Teljes ház, csoportos jegy és egy szervezés.',
    href: routes.groups,
    icon: 'Users',
  },
];

/** A NAP ÜZENETE — hero (drótváz 01/02). */
export const dailyMessage = {
  badge: 'A nap üzenete',
  title: 'Friss hó a hegyen, előkészített pályákkal',
  /** A napi üzenetet éles működésben az adminfelület / API frissíti. */
  body:
    'Az élő státuszsáv mutatja, mi üzemel most. A jegyet a pénztárnál lehet megváltani, a pályatérkép pedig hálózat nélkül is elérhető.',
} as const;

/** AKTUÁLIS AJÁNLAT / SZEZONBÉRLET (drótváz 01/04). */
export const currentOffer = {
  eyebrow: 'Aktuális ajánlat',
  title: 'Szezonbérlet — ha 8 napnál többet síelnél',
  description:
    'Nyolc síelt nap felett a szezonbérlet olcsóbb, mint a napijegyek összege. Elővételben a legkedvezőbb.',
  ctaLabel: 'Megnézem',
  ctaHref: routes.tickets,
  note: 'A pontos elővételi árat és a határidőt a végleges árlista tartalmazza.',
} as const;

/** A HEGY SZÁMOKBAN (drótváz 01/05) — minden érték az adatmodellből. */
export const mountainStatsMeta = [
  { id: 'slope-length', label: 'Pályahossz', icon: 'Route', suffix: ' km' },
  { id: 'vertical', label: 'Szintkülönbség', icon: 'TrendingUp', suffix: ' m' },
  { id: 'lifts', label: 'Felvonók', icon: 'CableCar', suffix: '' },
  { id: 'snowmaking', label: 'Hóágyúzott', icon: 'Snowflake', suffix: '%' },
];

export const newsletterCopy = {
  eyebrow: 'Hóriasztó',
  title: 'Szólunk, ha friss hó esett',
  description:
    'Egy rövid e-mail, amikor számottevő friss hó érkezik vagy nyitunk egy új pályát. Reklámot nem küldünk, bármikor leiratkozhatsz.',
  ctaLabel: 'Értesítsetek',
  placeholder: 'te@email.hu',
  consent: 'Az e-mail címet kizárólag a hóriasztó küldésére használjuk.',
} as const;
