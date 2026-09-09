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

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

/** Fejléc — pontosan 6 fő menüpont (drótváz 13/01). */
export const mainNavigation: NavItem[] = [
  {
    label: 'A hegy',
    href: routes.snowReport,
    description: 'Hóhelyzet, pályatérkép, felvonók',
    children: [
      { label: 'Hójelentés', href: routes.snowReport, description: 'Hóvastagság, friss hó, előrejelzés' },
      { label: 'Pályatérkép', href: routes.slopeMap, description: 'Interaktív térkép rétegvezérlővel' },
      { label: 'Felvonók és webkamerák', href: routes.lifts, description: 'Élő státusz és nyitvatartás' },
    ],
  },
  { label: 'Jegyek', href: routes.tickets, description: 'Napijegy, bérlet, kedvezmények' },
  { label: 'Síiskola', href: routes.skiSchool, description: 'Oktatás, kölcsönző, szerviz' },
  {
    label: 'Szállás',
    href: routes.guesthouse,
    description: 'Teljes ház, csoportoknak',
    children: [
      { label: 'A vendégház', href: routes.guesthouse, description: 'Férőhely, alaprajz, galéria' },
      { label: 'Csoportoknak', href: routes.groups, description: 'Baráti, családi, klub, céges' },
      { label: 'Árak és szabad időpontok', href: routes.availability, description: 'Foglaltsági naptár' },
      { label: 'Ajánlatkérés', href: routes.quote, description: '24 órán belüli válasz' },
    ],
  },
  { label: 'Élmény', href: routes.experience, description: 'Programok, nyári üzem, események' },
  { label: 'Info', href: routes.info, description: 'Megközelítés, GYIK, kapcsolat' },
];

/** Szállás al-navigáció (drótváz 07–10 · 01 blokk). */
export const accommodationSubNav = [
  { label: 'A vendégház', href: routes.guesthouse },
  { label: 'Csoportoknak', href: routes.groups },
  { label: 'Szabad időpontok', href: routes.availability },
  { label: 'Ajánlatot kérek', href: routes.quote },
];

/** Lábléc oszlopok (drótváz 13/03). */
export const footerNavigation: Array<{ title: string; items: NavItem[] }> = [
  {
    title: 'A síközpont',
    items: [
      { label: 'Hójelentés', href: routes.snowReport },
      { label: 'Pályatérkép', href: routes.slopeMap },
      { label: 'Felvonók és nyitvatartás', href: routes.lifts },
      { label: 'Webkamerák', href: `${routes.lifts}#webkamerak` },
    ],
  },
  {
    title: 'Szolgáltatások',
    items: [
      { label: 'Jegyek és bérletek', href: routes.tickets },
      { label: 'Síiskola', href: routes.skiSchool },
      { label: 'Kölcsönző és szerviz', href: `${routes.skiSchool}#kolcsonzo` },
      { label: 'Élmény és nyári üzem', href: routes.experience },
    ],
  },
  {
    title: 'Szállás',
    items: [
      { label: 'A vendégház', href: routes.guesthouse },
      { label: 'Csoportoknak', href: routes.groups },
      { label: 'Árak és szabad időpontok', href: routes.availability },
      { label: 'Ajánlatkérés', href: routes.quote },
    ],
  },
  {
    title: 'Jogi és kapcsolat',
    items: [
      { label: 'Megközelítés', href: `${routes.info}#megkozelites` },
      { label: 'GYIK', href: `${routes.info}#gyik` },
      { label: 'Kapcsolat', href: `${routes.info}#kapcsolat` },
      { label: 'Házirend és dokumentumok', href: `${routes.info}#dokumentumok` },
    ],
  },
];
