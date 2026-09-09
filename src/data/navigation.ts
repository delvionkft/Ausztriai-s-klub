/** Útvonalak egy helyen — a linkek sehol máshol nincsenek beégetve. */
export const routes = {
  home: '/',
  snowReport: '/hojelentes',
  slopeMap: '/palyaterkep',
  lifts: '/felvonok',
  tickets: '/jegyek',
  skiSchool: '/siiskola',
  guesthouse: '/vendeghaz',
  groups: '/csoportoknak',
  availability: '/arak-es-szabad-idopontok',
  quote: '/ajanlatkeres',
  experience: '/elmeny',
  info: '/informacio',
} as const;

import type { TranslationKey } from '@/i18n/hu';

export interface NavItem {
  /** Magyar alapszöveg — ez jelenik meg, ha nincs fordítási kulcs. */
  label: string;
  href: string;
  /** Fordítási kulcs (`src/i18n/hu.ts`). Ha megvan, a `t()` ezt használja. */
  labelKey?: TranslationKey;
  description?: string;
  children?: NavItem[];
}

/** Fejléc — pontosan 6 fő menüpont (drótváz 13/01). */
export const mainNavigation: NavItem[] = [
  {
    label: 'A hegy',
    labelKey: 'nav.mountain',
    href: routes.snowReport,
    description: 'Hóhelyzet, pályatérkép, felvonók',
    children: [
      { label: 'Hójelentés', labelKey: 'nav.snowReport', href: routes.snowReport, description: 'Hóvastagság, friss hó, előrejelzés' },
      { label: 'Pályatérkép', labelKey: 'nav.slopeMap', href: routes.slopeMap, description: 'Interaktív térkép rétegvezérlővel' },
      { label: 'Felvonók és webkamerák', labelKey: 'nav.lifts', href: routes.lifts, description: 'Élő státusz és nyitvatartás' },
    ],
  },
  { label: 'Jegyek', labelKey: 'nav.tickets', href: routes.tickets, description: 'Napijegy, bérlet, kedvezmények' },
  { label: 'Síiskola', labelKey: 'nav.skiSchool', href: routes.skiSchool, description: 'Oktatás, kölcsönző, szerviz' },
  {
    label: 'Szállás',
    labelKey: 'nav.accommodation',
    href: routes.guesthouse,
    description: 'Teljes ház, csoportoknak',
    children: [
      { label: 'A vendégház', labelKey: 'nav.guesthouse', href: routes.guesthouse, description: 'Férőhely, alaprajz, galéria' },
      { label: 'Csoportoknak', labelKey: 'nav.groups', href: routes.groups, description: 'Baráti, családi, klub, céges' },
      { label: 'Árak és szabad időpontok', labelKey: 'nav.availability', href: routes.availability, description: 'Foglaltsági naptár' },
      { label: 'Ajánlatkérés', labelKey: 'nav.quote', href: routes.quote, description: '24 órán belüli válasz' },
    ],
  },
  { label: 'Élmény', labelKey: 'nav.experience', href: routes.experience, description: 'Programok, nyári üzem, események' },
  { label: 'Info', labelKey: 'nav.info', href: routes.info, description: 'Megközelítés, GYIK, kapcsolat' },
];

/** Szállás al-navigáció (drótváz 07–10 · 01 blokk). */
export const accommodationSubNav: NavItem[] = [
  { label: 'A vendégház', labelKey: 'nav.guesthouse', href: routes.guesthouse },
  { label: 'Csoportoknak', labelKey: 'nav.groups', href: routes.groups },
  { label: 'Szabad időpontok', labelKey: 'cta.availability', href: routes.availability },
  { label: 'Ajánlatot kérek', labelKey: 'cta.requestQuote', href: routes.quote },
];

/** Lábléc oszlopok (drótváz 13/03). */
export const footerNavigation: Array<{ title: string; titleKey?: TranslationKey; items: NavItem[] }> = [
  {
    title: 'A síközpont',
    titleKey: 'footer.resort',
    items: [
      { label: 'Hójelentés', href: routes.snowReport },
      { label: 'Pályatérkép', href: routes.slopeMap },
      { label: 'Felvonók és nyitvatartás', href: routes.lifts },
      { label: 'Webkamerák', href: `${routes.lifts}#webkamerak` },
    ],
  },
  {
    title: 'Szolgáltatások',
    titleKey: 'footer.services',
    items: [
      { label: 'Jegyek és bérletek', href: routes.tickets },
      { label: 'Síiskola', href: routes.skiSchool },
      { label: 'Kölcsönző és szerviz', href: `${routes.skiSchool}#kolcsonzo` },
      { label: 'Élmény és nyári üzem', href: routes.experience },
    ],
  },
  {
    title: 'Szállás',
    titleKey: 'footer.accommodation',
    items: [
      { label: 'A vendégház', href: routes.guesthouse },
      { label: 'Csoportoknak', href: routes.groups },
      { label: 'Árak és szabad időpontok', href: routes.availability },
      { label: 'Ajánlatkérés', href: routes.quote },
    ],
  },
  {
    title: 'Jogi és kapcsolat',
    titleKey: 'footer.legal',
    items: [
      { label: 'Megközelítés', href: `${routes.info}#megkozelites` },
      { label: 'GYIK', href: `${routes.info}#gyik` },
      { label: 'Kapcsolat', href: `${routes.info}#kapcsolat` },
      { label: 'Házirend és dokumentumok', href: `${routes.info}#dokumentumok` },
    ],
  },
];
