import type {
  AccommodationBenefit,
  AccommodationFact,
  BookingTerms,
  GroupType,
  ProcessStep,
  RoomLayoutFloor,
} from '@/types';

/**
 * VENDÉGHÁZ
 * ----------------------------------------------------------------------------
 * A férőhely, a szobaszám és a távolságok üzleti adatok → `null`.
 * A leírások általánosak, nem tartalmaznak kitalált konkrétumot.
 */

export const accommodationIntro = {
  eyebrow: 'Szállás',
  title: 'Teljes ház, egy csoportnak',
  lead:
    'A vendégházat egyben adjuk ki, így a társaság kizárólagosan használja. Ez a szállás elsősorban síelő csoportoknak, baráti társaságoknak és több családnak készült.',
  bullets: [
    'Teljes ház, más vendéggel nem kell osztozni',
    'Egy szervezés, egy kapcsolattartó, egy számla',
    'Sítároló és saját parkolás a házon belül',
    'Konyha és közös tér a közös étkezésekhez',
  ],
} as const;

/** Gyors infósáv — csak pontos adattal (drótváz 07/03). */
export const accommodationFacts: AccommodationFact[] = [
  { id: 'capacity', label: 'Férőhely', value: null, icon: 'Users' },
  { id: 'rooms', label: 'Háló / fürdő', value: null, icon: 'BedDouble' },
  { id: 'slope-distance', label: 'Sípálya távolság', value: null, icon: 'MapPin' },
  { id: 'parking', label: 'Parkoló', value: null, icon: 'Car' },
  { id: 'ski-storage', label: 'Sítároló', value: null, icon: 'Package' },
  { id: 'kitchen', label: 'Konyha', value: null, icon: 'CookingPot' },
  { id: 'common-area', label: 'Közös tér', value: null, icon: 'Sofa' },
];

/** Miért jó csoportnak — előnyök, nem szobák (drótváz 07/04). */
export const accommodationBenefits: AccommodationBenefit[] = [
  {
    id: 'exclusive',
    title: 'Kizárólagos használat',
    description:
      'A ház teljes egészében a csoporté. Nincs idegen vendég, nincs közös reggeliztetés, nincs kompromisszum az időbeosztásban.',
    icon: 'KeyRound',
  },
  {
    id: 'together',
    title: 'Mindenki egy helyen',
    description:
      'A társaság nem oszlik szét több szálláshelyre. Egy közös tér, egy találkozási pont, egyszerűbb reggeli indulás.',
    icon: 'Users',
  },
  {
    id: 'one-invoice',
    title: 'Egy szervezés, egy számla',
    description:
      'Egy kapcsolattartóval egyeztetünk, egy ajánlatot adunk és egy számlát állítunk ki. A csoporton belüli elszámolás így sokkal egyszerűbb.',
    icon: 'ReceiptText',
  },
];

/**
 * ALAPRAJZ / ÁGYELRENDEZÉS (drótváz 07/05)
 * A helyiségnevek és ágyszámok tulajdonosi adatok → `null`.
 * A szintstruktúra a drótváz szerinti: tetőtér / emelet / földszint.
 */
export const roomLayout: RoomLayoutFloor[] = [
  {
    id: 'attic',
    floor: 'Tetőtér',
    rooms: [
      { id: 'attic-1', name: null, beds: null, note: null },
      { id: 'attic-2', name: null, beds: null, note: null },
      { id: 'attic-3', name: null, beds: null, note: null },
      { id: 'attic-4', name: null, beds: null, note: null },
    ],
  },
  {
    id: 'first-floor',
    floor: 'Emelet',
    rooms: [
      { id: 'first-1', name: null, beds: null, note: null },
      { id: 'first-2', name: null, beds: null, note: null },
      { id: 'first-3', name: null, beds: null, note: null },
      { id: 'first-4', name: null, beds: null, note: null },
    ],
  },
  {
    id: 'ground-floor',
    floor: 'Földszint',
    rooms: [
      { id: 'ground-1', name: null, beds: null, note: null },
      { id: 'ground-2', name: null, beds: null, note: null },
      { id: 'ground-3', name: null, beds: null, note: null },
      { id: 'ground-4', name: null, beds: null, note: null },
    ],
  },
];

/** Kinek ajánlott — négy csoporttípus (drótváz 08/02). */
export const groupTypes: GroupType[] = [
  {
    id: 'friends',
    title: 'Baráti síút',
    description: 'Rugalmas időbeosztás, közös főzés és este a közös térben.',
    icon: 'Users',
    points: ['Saját tempó, kötött étkezési idő nélkül', 'Közös konyha és nappali', 'Sítároló a felszerelésnek'],
  },
  {
    id: 'families',
    title: 'Több család',
    description: 'Külön hálók a családoknak, közös tér a gyerekeknek és a felnőtteknek.',
    icon: 'Baby',
    points: ['Külön hálószobák családonként', 'Gyerekbarát közös tér', 'Konyha saját étkezéshez'],
  },
  {
    id: 'club',
    title: 'Sportklub',
    description: 'Edzőtábor és versenyhétvége teljes házas elhelyezéssel.',
    icon: 'Trophy',
    points: ['Egy helyen az egész csapat', 'Felszereléstároló és szárítási lehetőség', 'Egy számla az egyesületnek'],
  },
  {
    id: 'company',
    title: 'Céges csapat',
    description: 'Csapatépítés vagy céges síhétvége, számlázható szervezéssel.',
    icon: 'Briefcase',
    points: ['Céges számla és szerződés', 'Közös tér megbeszéléshez', 'Igény szerinti étkezésszervezés'],
  },
];

/** Szervezés lépésről lépésre (drótváz 08/03). */
export const groupProcessSteps: ProcessStep[] = [
  { id: 'step-1', step: 1, title: 'Időpont egyeztetés', description: 'Megnézed a foglaltsági naptárat, és kiválasztod az érkezés–távozás dátumot.' },
  { id: 'step-2', step: 2, title: 'Ajánlatkérés', description: 'Megadod a létszámot és a csoport típusát. 24 órán belül személyes ajánlatot küldünk.' },
  { id: 'step-3', step: 3, title: 'Foglalás visszaigazolása', description: 'Az elfogadott ajánlat alapján rögzítjük az időpontot és megküldjük a feltételeket.' },
  { id: 'step-4', step: 4, title: 'Érkezés és átadás', description: 'Érkezéskor átadjuk a házat, ismertetjük a sítároló és a parkolás használatát.' },
];

export const groupExtras = {
  catering: {
    title: 'Étkezési lehetőségek',
    description:
      'A ház saját konyhával rendelkezik, így a csoport önállóan főzhet. Igény esetén külső étkezésszervezésben is segítünk — a pontos lehetőségeket egyeztetés után adjuk meg.',
    points: ['Saját konyhahasználat', 'Közös étkező a társaságnak', 'Külső étkeztetés egyeztetés alapján'],
  },
  familyFriendly: {
    title: 'Gyermek- és állatbarát feltételek',
    description:
      'Gyerekekkel érkező csoportokat szívesen fogadunk. A háziállattal kapcsolatos feltételeket foglalás előtt egyeztetjük.',
    points: ['Gyerekekkel érkező csoportok fogadása', 'Háziállat egyedi egyeztetéssel', 'Biztonsági szempontok átbeszélése érkezéskor'],
  },
} as const;

/** Foglalási feltételek (drótváz 09/04 — jobb oszlop). */
export const bookingTerms: BookingTerms[] = [
  { id: 'min-stay', label: 'Minimum tartózkodás', value: null, icon: 'CalendarRange' },
  { id: 'max-guests', label: 'Maximális létszám', value: null, icon: 'Users' },
  { id: 'included', label: 'Mi van benne', value: null, icon: 'PackageCheck' },
  { id: 'payment', label: 'Fizetési ütem', value: null, icon: 'CreditCard' },
  { id: 'cancellation', label: 'Lemondási feltételek', value: null, icon: 'FileText' },
  { id: 'checkin', label: 'Be- és kijelentkezés', value: null, icon: 'Clock' },
];
