import type { Discount, SeasonPricePeriod, TicketType } from '@/types';

/**
 * ============================================================================
 *  JEGYEK ÉS BÉRLETEK  —  ITT CSERÉLD AZ ÁRAKAT
 * ============================================================================
 *  Minden ár euróban, egy főre, főszezoni alapáron értendő. A naptáras árnézet
 *  a `seasonPeriods` szorzóiból számol (lásd `src/lib/pricing.ts`).
 * ============================================================================
 */
export const ticketTypes: TicketType[] = [
  {
    id: 'day',
    name: { hu: 'Napijegy', de: 'Tageskarte', en: 'Day pass' },
    duration: 'day',
    description: {
      hu: 'Egész napos érvényesség minden nyitott felvonóra, a nyitástól zárásig.',
      de: 'Ganztägig gültig für alle offenen Anlagen, von Betriebsbeginn bis Betriebsschluss.',
      en: 'Valid all day on every open lift, from opening to closing.',
    },
    prices: { adult: 58, youth: 44, child: 29, student: 47, senior: 47 },
    popular: true,
    benefits: [
      { hu: 'Minden nyitott felvonó', de: 'Alle offenen Anlagen', en: 'All open lifts' },
      { hu: 'Esti síelésre is érvényes', de: 'Auch für Nachtskilauf gültig', en: 'Valid for night skiing too' },
      { hu: 'Ingyenes síbusz a völgyben', de: 'Kostenloser Skibus im Tal', en: 'Free ski bus in the valley' },
    ],
  },
  {
    id: 'half-day',
    name: { hu: 'Félnapos jegy (12:00-tól)', de: 'Halbtageskarte (ab 12:00)', en: 'Half-day pass (from 12:00)' },
    duration: 'half-day',
    description: {
      hu: 'Délutáni belépés déltől zárásig. Akkor éri meg, ha csak fél napra ugrasz fel a hegyre.',
      de: 'Nachmittagseintritt ab Mittag bis Betriebsschluss. Ideal für den kurzen Bergbesuch.',
      en: 'Afternoon access from noon until closing. Worth it for a short trip up the mountain.',
    },
    prices: { adult: 42, youth: 32, child: 21, student: 34, senior: 34 },
    benefits: [
      { hu: '12:00-tól zárásig', de: 'Ab 12:00 bis Betriebsschluss', en: 'From 12:00 until closing' },
      { hu: 'Minden nyitott felvonó', de: 'Alle offenen Anlagen', en: 'All open lifts' },
    ],
  },
  {
    id: 'night',
    name: { hu: 'Esti jegy', de: 'Abendticket', en: 'Evening pass' },
    duration: 'night',
    description: {
      hu: 'Kedden és pénteken, a kivilágított Almwiese pályára és az Almbahn felvonóra.',
      de: 'Dienstag und Freitag für die beleuchtete Almwiese und die Almbahn.',
      en: 'Tuesdays and Fridays for the floodlit Almwiese and the Almbahn lift.',
    },
    prices: { adult: 24, youth: 18, child: 12, student: 19, senior: 19 },
    benefits: [
      { hu: '18:30 – 21:30', de: '18:30 – 21:30 Uhr', en: '18:30 – 21:30' },
      { hu: 'Almwiese pálya és Almbahn', de: 'Almwiese und Almbahn', en: 'Almwiese slope and Almbahn' },
    ],
  },
  {
    id: 'multi-3',
    name: { hu: '3 napos bérlet', de: '3-Tages-Karte', en: '3-day pass' },
    duration: 'multi-day',
    days: 3,
    description: {
      hu: 'Három egymást követő síelési nap, hosszú hétvégére. Napi bontásban közel 15%-kal kedvezőbb a napijegynél.',
      de: 'Drei aufeinanderfolgende Skitage, ideal fürs verlängerte Wochenende. Pro Tag rund 15% günstiger als die Tageskarte.',
      en: 'Three consecutive ski days, ideal for a long weekend. Around 15% cheaper per day than a day pass.',
    },
    prices: { adult: 149, youth: 112, child: 74, student: 120, senior: 120 },
    popular: true,
    benefits: [
      { hu: '3 egymást követő nap', de: '3 aufeinanderfolgende Tage', en: '3 consecutive days' },
      { hu: 'Esti síelésre is érvényes', de: 'Auch für Nachtskilauf gültig', en: 'Valid for night skiing too' },
      { hu: 'Ingyenes sítárolás a völgyállomáson', de: 'Kostenloses Skidepot an der Talstation', en: 'Free ski storage at the base station' },
    ],
  },
  {
    id: 'multi-6',
    name: { hu: '6 napos bérlet', de: '6-Tages-Karte', en: '6-day pass' },
    duration: 'multi-day',
    days: 6,
    description: {
      hu: 'Egy teljes síhétre. Ez a legkedvezőbb napi ár szezonbérlet nélkül.',
      de: 'Für eine ganze Skiwoche. Der günstigste Tagespreis ohne Saisonkarte.',
      en: 'For a full ski week. The best daily rate short of a season pass.',
    },
    prices: { adult: 268, youth: 201, child: 134, student: 214, senior: 214 },
    benefits: [
      { hu: '6 nap 8 napon belül felhasználható', de: '6 Tage innerhalb von 8 Tagen nutzbar', en: '6 days usable within 8' },
      { hu: 'Ingyenes sítárolás', de: 'Kostenloses Skidepot', en: 'Free ski storage' },
      { hu: '10% kedvezmény a kölcsönzőben', de: '10% Rabatt im Verleih', en: '10% off at the rental shop' },
    ],
  },
  {
    id: 'season',
    name: { hu: 'Szezonbérlet', de: 'Saisonkarte', en: 'Season pass' },
    duration: 'season',
    description: {
      hu: 'Korlátlan síelés a teljes szezonban, minden felvonóra és az esti síelésre is. 12 síelési nap felett már megéri.',
      de: 'Unbegrenztes Skifahren die ganze Saison, alle Anlagen inklusive Nachtskilauf. Ab 12 Skitagen rechnet sie sich.',
      en: 'Unlimited skiing all season on every lift, night skiing included. It pays off from 12 ski days.',
    },
    prices: { adult: 549, youth: 412, child: 275, student: 439, senior: 439 },
    popular: true,
    benefits: [
      { hu: 'Korlátlan síelés a teljes szezonban', de: 'Unbegrenzt die ganze Saison', en: 'Unlimited all season' },
      { hu: 'Esti síelés végig benne', de: 'Nachtskilauf inklusive', en: 'Night skiing included' },
      { hu: '15% kedvezmény a hüttékben', de: '15% Rabatt in den Hütten', en: '15% off in the huts' },
      { hu: 'Ingyenes szezonális sítárolás', de: 'Kostenloses Saison-Skidepot', en: 'Free season ski storage' },
    ],
  },
  {
    id: 'family-day',
    name: { hu: 'Családi napijegy (2 felnőtt + 2 gyerek)', de: 'Familien-Tageskarte (2 Erw. + 2 Kinder)', en: 'Family day pass (2 adults + 2 children)' },
    duration: 'day',
    description: {
      hu: 'Két felnőtt és két, 15 év alatti gyerek egy jegyen. További gyerek 22 euróért csatolható.',
      de: 'Zwei Erwachsene und zwei Kinder unter 15 auf einem Ticket. Weiteres Kind für 22 Euro.',
      en: 'Two adults and two children under 15 on one ticket. Each additional child costs 22 euros.',
    },
    prices: { adult: 158 },
    benefits: [
      { hu: '2 felnőtt + 2 gyerek', de: '2 Erwachsene + 2 Kinder', en: '2 adults + 2 children' },
      { hu: '6 év alatt ingyenes', de: 'Unter 6 Jahren gratis', en: 'Free under 6' },
      { hu: 'Gyerekpark használata', de: 'Nutzung des Kinderlandes', en: 'Kids area included' },
    ],
  },
  {
    id: 'points',
    name: { hu: 'Pontos jegy (20 felvonózás)', de: 'Punktekarte (20 Fahrten)', en: 'Points card (20 rides)' },
    duration: 'points',
    description: {
      hu: 'Alkalmi síelőknek, több napra elosztva. A pontok a teljes szezonban felhasználhatók.',
      de: 'Für Gelegenheitsfahrer, über mehrere Tage verteilbar. Punkte gelten die ganze Saison.',
      en: 'For occasional skiers, spread over several days. Points are valid all season.',
    },
    prices: { adult: 72, youth: 54, child: 36, student: 58, senior: 58 },
    benefits: [
      { hu: '20 felvonózás bármikor', de: '20 Fahrten, frei einteilbar', en: '20 rides, use them any time' },
      { hu: 'Több személy is használhatja', de: 'Auch von mehreren Personen nutzbar', en: 'Shareable between people' },
    ],
  },
];

/** Korosztályok és a hozzájuk tartozó életkorhatárok. */
export const ageGroupInfo = [
  { id: 'adult' as const, label: { hu: 'Felnőtt', de: 'Erwachsene', en: 'Adult' }, range: '19–64 év' },
  { id: 'youth' as const, label: { hu: 'Ifjúsági', de: 'Jugendliche', en: 'Youth' }, range: '15–18 év' },
  { id: 'child' as const, label: { hu: 'Gyermek', de: 'Kinder', en: 'Child' }, range: '6–14 év' },
  { id: 'student' as const, label: { hu: 'Diák', de: 'Studierende', en: 'Student' }, range: 'érvényes diákigazolvánnyal' },
  { id: 'senior' as const, label: { hu: 'Nyugdíjas', de: 'Senioren', en: 'Senior' }, range: '65 év felett' },
];

/**
 * Szezonális ársávok. A naptáras árnézet ezekből számolja a napi árat.
 * Az `adultDayPrice` a felnőtt napijegy ára az adott időszakban.
 */
export const seasonPeriods: SeasonPricePeriod[] = [
  {
    id: 'early',
    label: { hu: 'Előszezon', de: 'Vorsaison', en: 'Early season' },
    from: '2025-12-05', to: '2025-12-19', tier: 'low', adultDayPrice: 44,
  },
  {
    id: 'christmas',
    label: { hu: 'Karácsony és újév', de: 'Weihnachten und Neujahr', en: 'Christmas and New Year' },
    from: '2025-12-20', to: '2026-01-06', tier: 'peak', adultDayPrice: 64,
  },
  {
    id: 'january',
    label: { hu: 'Januári alapszezon', de: 'Zwischensaison Jänner', en: 'January mid season' },
    from: '2026-01-07', to: '2026-02-05', tier: 'mid', adultDayPrice: 52,
  },
  {
    id: 'february',
    label: { hu: 'Februári főszezon', de: 'Hauptsaison Februar', en: 'February high season' },
    from: '2026-02-06', to: '2026-03-08', tier: 'high', adultDayPrice: 58,
  },
  {
    id: 'march',
    label: { hu: 'Tavaszi szezon', de: 'Frühjahrssaison', en: 'Spring season' },
    from: '2026-03-09', to: '2026-03-22', tier: 'mid', adultDayPrice: 52,
  },
  {
    id: 'late',
    label: { hu: 'Utószezon', de: 'Nachsaison', en: 'Late season' },
    from: '2026-03-23', to: '2026-04-06', tier: 'low', adultDayPrice: 44,
  },
];

export const discounts: Discount[] = [
  {
    id: 'family',
    title: { hu: 'Családi kedvezmény', de: 'Familienermäßigung', en: 'Family discount' },
    description: {
      hu: 'Két szülő és a saját gyerekeik együtt váltott jeggyel. A harmadik és minden további gyerek jegye fél áron.',
      de: 'Zwei Elternteile mit den eigenen Kindern auf einem Ticket. Ab dem dritten Kind halber Preis.',
      en: 'Two parents with their own children on one ticket. From the third child onwards, half price.',
    },
    icon: 'heart',
    value: { hu: 'A 3. gyerektől 50%', de: 'Ab dem 3. Kind 50%', en: '50% from the 3rd child' },
  },
  {
    id: 'under-6',
    title: { hu: '6 év alatt ingyenes', de: 'Unter 6 Jahren gratis', en: 'Free under 6' },
    description: {
      hu: 'A 2020. január 1. után született gyerekek minden felvonót ingyen használhatnak, szülői kísérettel.',
      de: 'Kinder, geboren nach dem 1. Jänner 2020, fahren in Begleitung eines Elternteils gratis.',
      en: 'Children born after 1 January 2020 ride all lifts free when accompanied by a parent.',
    },
    icon: 'baby',
    value: { hu: '100% kedvezmény', de: '100% Ermäßigung', en: '100% discount' },
  },
  {
    id: 'student',
    title: { hu: 'Diák- és nyugdíjaskedvezmény', de: 'Ermäßigung für Studierende und Senioren', en: 'Student and senior discount' },
    description: {
      hu: 'Érvényes diákigazolvánnyal vagy 65 év felett minden jegytípusra. Az igazolványt a pénztárnál kérjük bemutatni.',
      de: 'Mit gültigem Studierendenausweis oder ab 65 Jahren auf alle Tickets. Nachweis an der Kassa erforderlich.',
      en: 'With a valid student card or from age 65, on every ticket type. Please show proof at the ticket office.',
    },
    icon: 'graduation-cap',
    value: { hu: '20% kedvezmény', de: '20% Ermäßigung', en: '20% discount' },
  },
  {
    id: 'group',
    title: { hu: 'Csoportos kedvezmény', de: 'Gruppenermäßigung', en: 'Group discount' },
    description: {
      hu: '10 fő felett minden jegytípusra, egyben váltva. 20 fő felett a csoportvezető jegye díjmentes.',
      de: 'Ab 10 Personen auf alle Tickets bei gemeinsamer Buchung. Ab 20 Personen fährt die Gruppenleitung gratis.',
      en: 'From 10 people on any ticket type when booked together. From 20 people the group leader rides free.',
    },
    icon: 'users',
    value: { hu: '15% kedvezmény', de: '15% Ermäßigung', en: '15% discount' },
  },
  {
    id: 'stay-and-ski',
    title: { hu: 'Szállás + síbérlet', de: 'Unterkunft + Skipass', en: 'Stay and ski' },
    description: {
      hu: 'A vendégházban foglaló csoportok tagjai kedvezményesen váltják a többnapos bérletet. Az ajánlatkérésnél automatikusan beszámítjuk.',
      de: 'Gruppen, die im Gästehaus buchen, erhalten die Mehrtageskarte ermäßigt. Wird im Angebot automatisch berücksichtigt.',
      en: 'Groups booking the guesthouse get a reduced multi-day pass. It is included automatically in your quote.',
    },
    icon: 'calendar-check',
    value: { hu: '10% kedvezmény a bérletre', de: '10% auf den Skipass', en: '10% off the pass' },
  },
  {
    id: 'company',
    title: { hu: 'Céges és klubcsomagok', de: 'Firmen- und Vereinspakete', en: 'Company and club packages' },
    description: {
      hu: 'Egyedi elszámolás, számlázás egy tételben, igény szerint névre szóló bérletekkel és külön pénztári sávval.',
      de: 'Individuelle Abrechnung, eine Sammelrechnung, auf Wunsch personalisierte Karten und eigener Kassenschalter.',
      en: 'Custom billing on a single invoice, optional personalised passes and a dedicated ticket desk.',
    },
    icon: 'building-2',
    value: { hu: 'Egyedi ajánlat', de: 'Individuelles Angebot', en: 'Custom quote' },
  },
];
