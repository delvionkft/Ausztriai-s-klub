import type { Instructor, RentalCategory } from '@/types';

/**
 * SÍISKOLA, KÖLCSÖNZŐ, SZERVIZ
 * Az oktatók neve és a kölcsönzési árak tulajdonosi adatok → `null`.
 */

export const skiSchoolIntro = {
  eyebrow: 'Síiskola',
  title: 'Soha nem álltál még sílécen? Itt a helyed.',
  lead:
    'Nem kell semmit sem hoznod és nem kell előre tudnod semmit. Megmutatjuk, hol vedd fel a felszerelést, hova állj be, és az első nap végén már magadtól lecsúszol az oktatópályán.',
  bullets: [
    'Kezdő csoportok és egyéni oktatás',
    'Gyerekpark és lassú szőnyegfelvonó a legkisebbeknek',
    'Felszerelés helyben bérelhető, méretre állítva',
    'Magyar, német és angol nyelvű oktatás',
  ],
} as const;

export const packageOffer = {
  title: 'Kezdőcsomag: jegy + oktatás + felszerelés',
  description:
    'Egy csomagban a napijegy, a csoportos oktatás és a teljes bérelt felszerelés. Ez a legegyszerűbb módja annak, hogy elkezdd — nem kell külön intézned semmit.',
  includes: [
    'Napijegy az oktatópályára és a nyitott felvonókra',
    'Csoportos oktatás képzett oktatóval',
    'Sí vagy snowboard, bakancs, bot és sisak',
    'Méretre állítás és rövid biztonsági eligazítás',
  ],
  /** Ár tulajdonosi adat → helyőrző jelenik meg. */
  price: null as number | null,
  priceNote: 'A csomagár a szezontól és a létszámtól függ.',
} as const;

export const instructors: Instructor[] = [
  { id: 'ins-1', name: null, languages: ['Magyar', 'Német'], levels: ['Kezdő', 'Haladó'], specialty: null },
  { id: 'ins-2', name: null, languages: ['Magyar', 'Angol'], levels: ['Kezdő', 'Gyermek'], specialty: null },
  { id: 'ins-3', name: null, languages: ['Német', 'Angol'], levels: ['Haladó', 'Verseny'], specialty: null },
  { id: 'ins-4', name: null, languages: ['Magyar', 'Német', 'Angol'], levels: ['Snowboard'], specialty: null },
];

/** „Mit hozzak magammal?” (drótváz 06/05). */
export const whatToBring = [
  { id: 'w-1', label: 'Vízhatlan sínadrág és kabát', detail: 'Réteges öltözködés, hogy szabályozni tudd a hőt.' },
  { id: 'w-2', label: 'Kesztyű, sapka, nyakmelegítő', detail: 'A kesztyű legyen vízálló, a sisak alá vékony sapka jó.' },
  { id: 'w-3', label: 'Síszemüveg és napszemüveg', detail: 'A hó erősen visszaveri a fényt, borult időben is.' },
  { id: 'w-4', label: 'Fényvédő és ajakápoló', detail: 'Magas faktorral, a hegyen az UV-terhelés nagyobb.' },
  { id: 'w-5', label: 'Sízokni, váltóruha', detail: 'Egy vékony, hosszú szárú síthoz való zokni elég.' },
  { id: 'w-6', label: 'Személyi okmány és biztosítás', detail: 'Kedvezményhez igazolvány, baleset esetén biztosítási adat.' },
];

export const rentalCategories: RentalCategory[] = [
  {
    id: 'rental',
    title: 'Kölcsönző',
    description: 'Méretre állított felszerelés kezdőknek és haladóknak, sisakkal együtt.',
    icon: 'Package',
    items: [
      { id: 'r-1', label: 'Sí szett (léc, kötés, bot)', detail: null, price: null },
      { id: 'r-2', label: 'Snowboard szett', detail: null, price: null },
      { id: 'r-3', label: 'Sí- vagy snowboardbakancs', detail: null, price: null },
      { id: 'r-4', label: 'Sisak', detail: null, price: null },
      { id: 'r-5', label: 'Gyerek szett', detail: null, price: null },
    ],
  },
  {
    id: 'service',
    title: 'Szerviz',
    description: 'Élezés, viaszolás és kötésbeállítás — akár aznapi átvétellel.',
    icon: 'Wrench',
    items: [
      { id: 's-1', label: 'Élezés és viaszolás', detail: null, price: null },
      { id: 's-2', label: 'Kötésbeállítás', detail: null, price: null },
      { id: 's-3', label: 'Talpjavítás', detail: null, price: null },
    ],
  },
  {
    id: 'depot',
    title: 'Depó',
    description: 'Felszereléstárolás a völgyállomáson, hogy ne kelljen mindennap hazacipelni.',
    icon: 'Lock',
    items: [
      { id: 'd-1', label: 'Napi tárolás', detail: null, price: null },
      { id: 'd-2', label: 'Heti tárolás', detail: null, price: null },
      { id: 'd-3', label: 'Szárítószekrény', detail: null, price: null },
    ],
  },
];
