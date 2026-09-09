import type { ContactInfo, TravelOption } from '@/types';

/**
 * KAPCSOLAT ÉS MEGKÖZELÍTÉS
 * Minden konkrét elérhetőség és koordináta tulajdonosi adat → `null`.
 * A `ContactActions` komponens automatikusan letiltja azokat a gombokat,
 * amelyekhez még nincs adat (nincs hibás vagy üres link).
 */
export const contactInfo: ContactInfo = {
  phone: null,
  whatsapp: null,
  email: null,
  addressLine: null,
  postalCode: null,
  city: null,
  country: null,
  gpsLat: null,
  gpsLng: null,
  officeHours: null,
  mapEmbedUrl: null,
  social: [
    { id: 'facebook', label: 'Facebook', url: null, icon: 'Facebook' },
    { id: 'instagram', label: 'Instagram', url: null, icon: 'Instagram' },
    { id: 'youtube', label: 'YouTube', url: null, icon: 'Youtube' },
  ],
};

export const travelOptions: TravelOption[] = [
  {
    id: 'car',
    mode: 'car',
    title: 'Autóval',
    description: 'A völgyállomás parkolójáig autóval is fel lehet jönni. Télen téli gumi kötelező, hóláncot érdemes vinni.',
    distance: null,
    duration: null,
  },
  {
    id: 'skibus',
    mode: 'skibus',
    title: 'Síbusszal',
    description: 'Síbusz járat köti össze a környező településeket a völgyállomással. A menetrendet a szolgáltató adja meg.',
    distance: null,
    duration: null,
  },
  {
    id: 'train',
    mode: 'train',
    title: 'Vonattal',
    description: 'A legközelebbi vasútállomásról transzferrel vagy síbusszal érhető el a síközpont.',
    distance: null,
    duration: null,
  },
  {
    id: 'plane',
    mode: 'plane',
    title: 'Repülővel',
    description: 'A legközelebbi nemzetközi repülőtérről bérelt autóval vagy transzferrel javasolt a továbbutazás.',
    distance: null,
    duration: null,
  },
];

export const parkingInfo = {
  title: 'Parkolás',
  points: [
    { id: 'p-1', label: 'Parkolóhelyek száma', value: null },
    { id: 'p-2', label: 'Parkolási díj', value: null },
    { id: 'p-3', label: 'Busz- és utánfutóhely', value: null },
  ],
} as const;

export const legalDocuments = [
  { id: 'house-rules', label: 'Házirend', href: null, description: 'A síközpont és a szállás használatának szabályai.' },
  { id: 'terms', label: 'Általános szerződési feltételek', href: null, description: 'Foglalási és vásárlási feltételek.' },
  { id: 'privacy', label: 'Adatkezelési tájékoztató', href: null, description: 'Hogyan kezeljük a megadott adatokat.' },
  { id: 'impressum', label: 'Impresszum', href: null, description: 'Üzemeltetői adatok.' },
];

export const accountInfo = {
  title: 'Fiók és bérletkezelés',
  description:
    'A szezonbérletek és online jegyek kezelése a jegyértékesítő rendszer bekötése után lesz elérhető. Addig a jegypénztár és a telefonos elérhetőség segít.',
} as const;
