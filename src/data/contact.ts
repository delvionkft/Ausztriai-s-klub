import type { Localized, TravelOption } from '@/types';

/**
 * ============================================================================
 *  ELÉRHETŐSÉGEK  —  ITT CSERÉLD A KAPCSOLATI ADATOKAT
 * ============================================================================
 */
export const contactInfo = {
  phone: '+43 6542 720 140',
  phoneSecondary: '+43 664 118 2270',
  whatsapp: '+43 664 118 2270',
  email: 'info@silbergrat.example',
  bookingEmail: 'haus@silbergrat.example',
  addressLine1: 'Talstationsweg 4',
  postalCode: '5730',
  city: 'Silbergrat',
  region: 'Salzburger Land',
  country: 'Ausztria',
  countryCode: 'AT',
  coordinates: { lat: 47.2846, lng: 12.7931 },
  /** Google Maps beágyazás. `.env` -> NEXT_PUBLIC_MAPS_EMBED_URL felülírja. */
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAPS_EMBED_URL ??
    'https://www.openstreetmap.org/export/embed.html?bbox=12.7631%2C47.2696%2C12.8231%2C47.2996&layer=mapnik&marker=47.2846%2C12.7931',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=47.2846,12.7931',
};

export const fullAddress = `${contactInfo.addressLine1}, ${contactInfo.postalCode} ${contactInfo.city}, ${contactInfo.country}`;

export const officeHours: Array<{ label: Localized; hours: string }> = [
  { label: { hu: 'Hétfő – Vasárnap (szezonban)', de: 'Montag – Sonntag (Saison)', en: 'Monday – Sunday (in season)' }, hours: '08:00 – 17:00' },
  { label: { hu: 'Esti síelés napjain', de: 'An Nachtskitagen', en: 'On night-skiing days' }, hours: '08:00 – 21:30' },
  { label: { hu: 'Szezonon kívül', de: 'Außerhalb der Saison', en: 'Out of season' }, hours: '09:00 – 14:00' },
];

export const socialLinks: Array<{ id: string; label: string; href: string; icon: 'facebook' | 'instagram' | 'youtube' | 'linkedin' }> = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
];

export const parkingInfo: Localized = {
  hu: 'A völgyállomásnál 420 ingyenes parkolóhely, ebből 12 elektromos töltővel és 8 akadálymentes hely. Csúcsnapokon 09:30 után a felső parkoló nyílik meg, ingyenes síbusszal.',
  de: '420 kostenlose Parkplätze an der Talstation, davon 12 mit E-Ladestation und 8 barrierefreie Plätze. An Spitzentagen öffnet ab 09:30 der obere Parkplatz mit kostenlosem Skibus.',
  en: '420 free parking spaces at the base station, including 12 with EV chargers and 8 accessible bays. On peak days the upper car park opens from 09:30 with a free ski bus.',
};

export const travelOptions: TravelOption[] = [
  {
    id: 'car',
    mode: 'car',
    title: { hu: 'Autóval', de: 'Mit dem Auto', en: 'By car' },
    detail: {
      hu: 'A A10-es autópályáról a Bischofshofen kijáratnál letérve a B311-en végig, majd a völgybe felvezető úton. Az út végig sózott és télen is folyamatosan karbantartott, hólánc ritkán szükséges.',
      de: 'Von der A10 bei der Ausfahrt Bischofshofen auf die B311 und weiter über die Talstraße. Die Straße wird gestreut und im Winter laufend geräumt, Schneeketten sind selten nötig.',
      en: 'Leave the A10 at the Bischofshofen exit, follow the B311, then the valley road. The route is salted and cleared throughout winter; snow chains are rarely needed.',
    },
    distance: 'Salzburg: 92 km · Bécs: 348 km · Budapest: 590 km',
    duration: '1 ó 15 p Salzburgból',
    hub: 'Talstationsweg 4, 5730 Silbergrat',
  },
  {
    id: 'bus',
    mode: 'bus',
    title: { hu: 'Síbusszal', de: 'Mit dem Skibus', en: 'By ski bus' },
    detail: {
      hu: 'Ingyenes síbusz jár a völgy szállásaitól a völgyállomásig 08:00 és 17:00 között, 30 percenként. Érvényes síjeggyel vagy vendégkártyával a járat díjmentes.',
      de: 'Kostenloser Skibus zwischen den Unterkünften im Tal und der Talstation, 08:00–17:00 Uhr, alle 30 Minuten. Mit gültigem Skipass oder Gästekarte gratis.',
      en: 'A free ski bus runs between valley accommodations and the base station from 08:00 to 17:00, every 30 minutes. Free with a valid lift pass or guest card.',
    },
    distance: 'Megállók a völgy teljes hosszában',
    duration: '5–18 perc',
    hub: 'Silbergrat Talstation megálló',
  },
  {
    id: 'train',
    mode: 'train',
    title: { hu: 'Vonattal', de: 'Mit der Bahn', en: 'By train' },
    detail: {
      hu: 'A legközelebbi vasútállomás Bischofshofen, ahonnan a 260-as regionális busz 40 perc alatt hoz fel a völgyállomásra. A busz a vonat érkezéséhez igazodik.',
      de: 'Nächster Bahnhof ist Bischofshofen, von dort bringt dich der Regionalbus 260 in 40 Minuten zur Talstation. Der Bus ist auf die Zugankunft abgestimmt.',
      en: 'The nearest railway station is Bischofshofen; regional bus 260 gets you to the base station in 40 minutes and is timed to train arrivals.',
    },
    distance: '34 km az állomástól',
    duration: '40 perc busszal',
    hub: 'Bischofshofen Bahnhof',
  },
  {
    id: 'plane',
    mode: 'plane',
    title: { hu: 'Repülővel', de: 'Mit dem Flugzeug', en: 'By plane' },
    detail: {
      hu: 'A salzburgi W. A. Mozart repülőtér a legközelebbi. Onnan bérautóval vagy előre foglalt transzferrel érhető el a völgy. A transzfert az ajánlatkérésnél is kérheted.',
      de: 'Der Flughafen Salzburg W. A. Mozart liegt am nächsten. Von dort mit Mietwagen oder vorab gebuchtem Transfer ins Tal. Den Transfer kannst du bei der Anfrage mitbestellen.',
      en: 'Salzburg W. A. Mozart Airport is the closest. From there take a hire car or a pre-booked transfer. You can request the transfer with your quote enquiry.',
    },
    distance: '96 km',
    duration: '1 ó 20 p transzferrel',
    hub: 'Salzburg Airport (SZG)',
  },
];

/** Jogi dokumentumok — a `/hazirend`, `/adatkezeles` stb. oldalak tartalma innen jön. */
export const legalEntity = {
  companyName: 'Silbergrat Bergbahnen GmbH',
  registrationNumber: 'FN 214 668 v',
  vatNumber: 'ATU 61234567',
  court: 'Landesgericht Salzburg',
  managingDirector: 'Markus Aigner',
  supervisoryAuthority: 'Bezirkshauptmannschaft St. Johann im Pongau',
  chamber: 'Wirtschaftskammer Salzburg',
};
