import type { Instructor, Localized, RentalItem, ServiceItem, SkiSchoolPackage } from '@/types';

/**
 * ============================================================================
 *  SÍISKOLA ÉS KÖLCSÖNZŐ  —  ITT CSERÉLD A CSOMAGOKAT ÉS ÁRAKAT
 * ============================================================================
 *  OKTATÓK: a profilok szándékosan semlegesek — beosztás, nyelvtudás és
 *  oktatási szint szerepel bennük, kitalált személyes történet nélkül.
 *  A végleges oktatói nevek és fotók a síiskolától érkeznek; cseréld a
 *  `displayName` és `imageKey` mezőt.
 * ============================================================================
 */
export const skiSchoolPackages: SkiSchoolPackage[] = [
  {
    id: 'first-timer',
    name: { hu: 'Első nap a lécen', de: 'Erster Tag auf Ski', en: 'First day on skis' },
    audience: { hu: 'Teljesen kezdőknek, 12 éves kortól', de: 'Für absolute Anfänger ab 12 Jahren', en: 'Absolute beginners, from age 12' },
    durationLabel: { hu: '1 nap · 4 óra oktatás', de: '1 Tag · 4 Stunden Unterricht', en: '1 day · 4 hours of tuition' },
    includes: [
      { hu: 'Napijegy a gyerekparkra és az Almbahnra', de: 'Tageskarte für Kinderland und Almbahn', en: 'Day pass for the kids area and the Almbahn' },
      { hu: '4 óra csoportos oktatás (max. 8 fő)', de: '4 Stunden Gruppenunterricht (max. 8 Personen)', en: '4 hours of group tuition (max 8 people)' },
      { hu: 'Teljes felszerelés: léc, cipő, bot, sisak', de: 'Komplette Ausrüstung: Ski, Schuhe, Stöcke, Helm', en: 'Full equipment: skis, boots, poles, helmet' },
      { hu: 'Meleg ital a hüttében', de: 'Heißgetränk in der Hütte', en: 'A hot drink in the hut' },
    ],
    priceEur: 129,
    priceNote: { hu: 'egy főre, mindent tartalmaz', de: 'pro Person, alles inklusive', en: 'per person, all inclusive' },
    featured: true,
    imageKey: 'school-package',
  },
  {
    id: 'beginner-week',
    name: { hu: 'Kezdő hét', de: 'Anfängerwoche', en: 'Beginner week' },
    audience: { hu: 'Kezdőknek, akik egy hét alatt önállóan akarnak lecsúszni', de: 'Für Anfänger, die in einer Woche selbstständig fahren wollen', en: 'For beginners who want to ski independently within a week' },
    durationLabel: { hu: '5 nap · napi 3 óra', de: '5 Tage · täglich 3 Stunden', en: '5 days · 3 hours a day' },
    includes: [
      { hu: '6 napos bérlet', de: '6-Tages-Skipass', en: '6-day lift pass' },
      { hu: '15 óra csoportos oktatás', de: '15 Stunden Gruppenunterricht', en: '15 hours of group tuition' },
      { hu: 'Felszereléskölcsönzés a teljes hétre', de: 'Ausrüstungsverleih für die ganze Woche', en: 'Equipment rental for the whole week' },
      { hu: 'Záró verseny és oklevél', de: 'Abschlussrennen und Urkunde', en: 'Closing race and certificate' },
    ],
    priceEur: 469,
    priceNote: { hu: 'egy főre, 6 napos bérlettel', de: 'pro Person, inkl. 6-Tages-Skipass', en: 'per person, including the 6-day pass' },
    imageKey: 'intent-beginner',
  },
  {
    id: 'kids-club',
    name: { hu: 'Gyerekklub (4–11 év)', de: 'Kinderclub (4–11 Jahre)', en: 'Kids club (ages 4–11)' },
    audience: { hu: 'Gyerekeknek, teljes napos felügyelettel', de: 'Für Kinder, mit Ganztagsbetreuung', en: 'For children, with full-day supervision' },
    durationLabel: { hu: '5 nap · 09:45 – 15:30', de: '5 Tage · 09:45 – 15:30 Uhr', en: '5 days · 09:45 – 15:30' },
    includes: [
      { hu: 'Egész napos oktatás és felügyelet', de: 'Ganztägiger Unterricht und Betreuung', en: 'Full-day tuition and supervision' },
      { hu: 'Ebéd a gyerekpark éttermében', de: 'Mittagessen im Kinderland-Restaurant', en: 'Lunch at the kids area restaurant' },
      { hu: 'Gyerekpark és szőnyegfelvonó', de: 'Kinderland und Zauberteppich', en: 'Kids area and magic carpet' },
      { hu: 'Pénteki gyerekverseny', de: 'Kinderrennen am Freitag', en: "Friday children's race" },
    ],
    priceEur: 389,
    priceNote: { hu: 'egy gyerekre, ebéddel', de: 'pro Kind, inkl. Mittagessen', en: 'per child, lunch included' },
    imageKey: 'exp-family',
  },
  {
    id: 'private',
    name: { hu: 'Magánóra', de: 'Privatstunde', en: 'Private lesson' },
    audience: { hu: 'Bármilyen szinten, egyénileg vagy kis csoportban', de: 'Auf jedem Niveau, einzeln oder in Kleingruppen', en: 'At any level, individually or in a small group' },
    durationLabel: { hu: '2 vagy 4 óra', de: '2 oder 4 Stunden', en: '2 or 4 hours' },
    includes: [
      { hu: 'Egy oktató, max. 4 fő', de: 'Ein Skilehrer, max. 4 Personen', en: 'One instructor, up to 4 people' },
      { hu: 'Szabadon választott időpont', de: 'Frei wählbarer Termin', en: 'Freely chosen time slot' },
      { hu: 'Videós technikaelemzés kérésre', de: 'Videoanalyse auf Wunsch', en: 'Video technique analysis on request' },
    ],
    priceEur: 175,
    priceNote: { hu: '2 óra, max. 4 főig azonos áron', de: '2 Stunden, bis 4 Personen zum gleichen Preis', en: '2 hours, same price for up to 4 people' },
    imageKey: 'intent-today',
  },
];

export const instructors: Instructor[] = [
  {
    id: 'ins-1',
    displayName: 'Oktató · alpesi sí, kezdő és haladó',
    role: { hu: 'Alpesi síoktató', de: 'Alpin-Skilehrer', en: 'Alpine ski instructor' },
    languages: ['DE', 'EN', 'HU'],
    levels: [
      { hu: 'Kezdő', de: 'Anfänger', en: 'Beginner' },
      { hu: 'Középhaladó', de: 'Fortgeschritten', en: 'Intermediate' },
    ],
    bio: {
      hu: 'Csoportos kezdő oktatás és technikajavítás. Türelmes tempóban dolgozik, sokat gyakoroltat a lankás terepen.',
      de: 'Gruppenunterricht für Anfänger und Technikkorrektur. Arbeitet in ruhigem Tempo mit viel Übung im flachen Gelände.',
      en: 'Beginner group tuition and technique correction. Works at a patient pace with plenty of practice on gentle terrain.',
    },
    imageKey: 'instructor-1',
    certification: { hu: 'Osztrák állami síoktatói képesítés', de: 'Staatlich geprüfte Skilehrer-Ausbildung', en: 'Austrian state ski instructor qualification' },
  },
  {
    id: 'ins-2',
    displayName: 'Oktató · gyerekcsoportok',
    role: { hu: 'Gyerekoktató', de: 'Kinderskilehrerin', en: 'Children’s instructor' },
    languages: ['DE', 'EN'],
    levels: [
      { hu: 'Óvodás', de: 'Kindergarten', en: 'Pre-school' },
      { hu: 'Kezdő', de: 'Anfänger', en: 'Beginner' },
    ],
    bio: {
      hu: 'A gyerekklub vezetője. Játékos gyakorlatokkal tanít, a nap végén mindig van verseny és oklevél.',
      de: 'Leitung des Kinderclubs. Unterrichtet mit spielerischen Übungen, am Tagesende gibt es immer ein Rennen.',
      en: 'Head of the kids club. Teaches through play-based exercises, always finishing the day with a race.',
    },
    imageKey: 'instructor-2',
    certification: { hu: 'Osztrák gyerekoktatói szakirány', de: 'Kinderskilehrer-Ausbildung', en: "Austrian children's instructor specialisation" },
  },
  {
    id: 'ins-3',
    displayName: 'Oktató · haladó és versenytechnika',
    role: { hu: 'Haladó oktató', de: 'Skilehrer für Fortgeschrittene', en: 'Advanced instructor' },
    languages: ['DE', 'EN', 'IT'],
    levels: [
      { hu: 'Haladó', de: 'Fortgeschritten', en: 'Advanced' },
      { hu: 'Versenytechnika', de: 'Renntechnik', en: 'Race technique' },
    ],
    bio: {
      hu: 'Carving- és versenytechnika, valamint meredek terepen való biztonságos haladás. Videós elemzéssel dolgozik.',
      de: 'Carving- und Renntechnik sowie sicheres Fahren im Steilgelände. Arbeitet mit Videoanalyse.',
      en: 'Carving and race technique plus safe skiing on steep terrain. Works with video analysis.',
    },
    imageKey: 'instructor-3',
    certification: { hu: 'Osztrák állami síoktató, versenyedzői szakirány', de: 'Staatlich geprüfter Skilehrer, Trainerausbildung', en: 'Austrian state instructor, race coaching specialisation' },
  },
  {
    id: 'ins-4',
    displayName: 'Oktató · snowboard és freestyle',
    role: { hu: 'Snowboardoktató', de: 'Snowboardlehrer', en: 'Snowboard instructor' },
    languages: ['DE', 'EN', 'HU'],
    levels: [
      { hu: 'Kezdő', de: 'Anfänger', en: 'Beginner' },
      { hu: 'Freestyle', de: 'Freestyle', en: 'Freestyle' },
    ],
    bio: {
      hu: 'Snowboardoktatás kezdőtől a funparkig. A hétvégi freestyle-tréningeket is ő tartja.',
      de: 'Snowboardunterricht vom Anfänger bis zum Funpark. Leitet auch das Freestyle-Training am Wochenende.',
      en: 'Snowboard tuition from beginner to funpark. Also runs the weekend freestyle sessions.',
    },
    imageKey: 'instructor-4',
    certification: { hu: 'Osztrák snowboardoktatói képesítés', de: 'Snowboardlehrer-Ausbildung', en: 'Austrian snowboard instructor qualification' },
  },
];

export const whatToBring: Array<{ id: string; icon: string; label: Localized; note: Localized }> = [
  {
    id: 'clothing', icon: 'shirt',
    label: { hu: 'Vízhatlan sídzseki és nadrág', de: 'Wasserdichte Skijacke und -hose', en: 'Waterproof ski jacket and trousers' },
    note: { hu: 'Rétegesen öltözz: aláöltözet, pulóver, kabát.', de: 'Kleide dich in Schichten: Funktionswäsche, Pullover, Jacke.', en: 'Dress in layers: base layer, mid layer, jacket.' },
  },
  {
    id: 'gloves', icon: 'hand',
    label: { hu: 'Vízhatlan kesztyű', de: 'Wasserdichte Handschuhe', en: 'Waterproof gloves' },
    note: { hu: 'Hozz egy tartalék párat is — az első nap sokat esel.', de: 'Nimm ein Ersatzpaar mit — am ersten Tag stürzt man oft.', en: 'Bring a spare pair — you will fall a lot on day one.' },
  },
  {
    id: 'goggles', icon: 'glasses',
    label: { hu: 'Síszemüveg vagy napszemüveg', de: 'Skibrille oder Sonnenbrille', en: 'Goggles or sunglasses' },
    note: { hu: 'Havazásban a síszemüveg, napsütésben a napszemüveg jobb.', de: 'Bei Schneefall Skibrille, bei Sonne Sonnenbrille.', en: 'Goggles when it snows, sunglasses when it is bright.' },
  },
  {
    id: 'sunscreen', icon: 'sun',
    label: { hu: 'Fényvédő és ajakbalzsam', de: 'Sonnencreme und Lippenbalsam', en: 'Sun cream and lip balm' },
    note: { hu: 'A hóról visszaverődő fény miatt borult időben is szükséges.', de: 'Wegen der Reflexion auch bei bewölktem Wetter nötig.', en: 'Needed even on cloudy days because of snow glare.' },
  },
  {
    id: 'socks', icon: 'footprints',
    label: { hu: 'Egy pár vékony sízokni', de: 'Ein Paar dünne Skisocken', en: 'One pair of thin ski socks' },
    note: { hu: 'Egy vékony pár melegebb, mint kettő vastag — ne szorítson a cipő.', de: 'Ein dünnes Paar wärmt besser als zwei dicke.', en: 'One thin pair keeps you warmer than two thick ones.' },
  },
  {
    id: 'id', icon: 'id-card',
    label: { hu: 'Igazolvány a kölcsönzéshez', de: 'Ausweis für den Verleih', en: 'ID for the rental shop' },
    note: { hu: 'A kölcsönzéshez fényképes igazolvány szükséges, kauciót nem kérünk.', de: 'Für den Verleih ist ein Lichtbildausweis nötig, keine Kaution.', en: 'Photo ID is required for rental; no deposit is charged.' },
  },
];

export const rentalItems: RentalItem[] = [
  {
    id: 'ski-standard',
    category: { hu: 'Sífelszerelés — Standard', de: 'Skiausrüstung — Standard', en: 'Ski set — Standard' },
    level: { hu: 'Kezdő és középhaladó', de: 'Anfänger und Fortgeschrittene', en: 'Beginner and intermediate' },
    includes: [
      { hu: 'Léc és kötés beállítva', de: 'Ski und eingestellte Bindung', en: 'Skis with adjusted bindings' },
      { hu: 'Sícipő', de: 'Skischuhe', en: 'Ski boots' },
      { hu: 'Botok', de: 'Stöcke', en: 'Poles' },
    ],
    pricePerDayEur: 29, pricePerWeekEur: 132, sizes: '110 – 180 cm', icon: 'skis',
  },
  {
    id: 'ski-premium',
    category: { hu: 'Sífelszerelés — Premium', de: 'Skiausrüstung — Premium', en: 'Ski set — Premium' },
    level: { hu: 'Haladó', de: 'Fortgeschritten', en: 'Advanced' },
    includes: [
      { hu: 'Aktuális szezonos versenyléc', de: 'Aktueller Race-Carver', en: 'Current-season race carver' },
      { hu: 'Versenycipő', de: 'Race-Schuh', en: 'Race boot' },
      { hu: 'Napi élezés és viaszolás', de: 'Täglicher Schliff und Wachs', en: 'Daily tune and wax' },
    ],
    pricePerDayEur: 42, pricePerWeekEur: 198, sizes: '150 – 188 cm', icon: 'skis',
  },
  {
    id: 'snowboard',
    category: { hu: 'Snowboard szett', de: 'Snowboard-Set', en: 'Snowboard set' },
    level: { hu: 'Minden szinten', de: 'Alle Niveaus', en: 'All levels' },
    includes: [
      { hu: 'Deszka és kötés', de: 'Board und Bindung', en: 'Board and bindings' },
      { hu: 'Snowboardcipő', de: 'Snowboardschuhe', en: 'Snowboard boots' },
    ],
    pricePerDayEur: 32, pricePerWeekEur: 145, sizes: '128 – 160 cm', icon: 'snowboard',
  },
  {
    id: 'kids',
    category: { hu: 'Gyerekszett (14 év alatt)', de: 'Kinderset (unter 14)', en: 'Kids set (under 14)' },
    level: { hu: 'Kezdő és haladó', de: 'Anfänger und Fortgeschrittene', en: 'Beginner and advanced' },
    includes: [
      { hu: 'Léc, cipő, bot', de: 'Ski, Schuhe, Stöcke', en: 'Skis, boots, poles' },
      { hu: 'Sisak díjmentesen', de: 'Helm kostenlos', en: 'Helmet free of charge' },
    ],
    pricePerDayEur: 17, pricePerWeekEur: 78, sizes: '70 – 130 cm', icon: 'kids',
  },
  {
    id: 'helmet',
    category: { hu: 'Sisak', de: 'Helm', en: 'Helmet' },
    level: { hu: 'Mindenkinek ajánlott', de: 'Für alle empfohlen', en: 'Recommended for everyone' },
    includes: [{ hu: 'Fertőtlenített, méretre állított sisak', de: 'Desinfizierter, angepasster Helm', en: 'Sanitised, fitted helmet' }],
    pricePerDayEur: 6, pricePerWeekEur: 26, sizes: 'XS – XL', icon: 'helmet',
  },
  {
    id: 'boots-only',
    category: { hu: 'Csak sícipő', de: 'Nur Skischuhe', en: 'Boots only' },
    level: { hu: 'Saját léccel érkezőknek', de: 'Für Gäste mit eigenen Ski', en: 'For guests with their own skis' },
    includes: [{ hu: 'Cipő méretbeállítással', de: 'Schuh mit Anpassung', en: 'Boots with fitting' }],
    pricePerDayEur: 14, pricePerWeekEur: 62, sizes: '22 – 31 Mondopoint', icon: 'boots',
  },
];

export const serviceItems: ServiceItem[] = [
  {
    id: 'wax',
    name: { hu: 'Viaszolás', de: 'Wachsen', en: 'Waxing' },
    description: { hu: 'Meleg viaszolás és polírozás, 1 óra alatt kész.', de: 'Heißwachsen und Polieren, in einer Stunde fertig.', en: 'Hot wax and polish, ready within an hour.' },
    priceEur: 18, priceLabel: { hu: 'pár', de: 'Paar', en: 'per pair' },
  },
  {
    id: 'edge',
    name: { hu: 'Élezés és viaszolás', de: 'Schleifen und Wachsen', en: 'Edge tune and wax' },
    description: { hu: 'Gépi élezés, alapjavítás és viaszolás. Este leadva reggelre kész.', de: 'Maschinenschliff, Belagsreparatur und Wachs. Abends abgeben, morgens fertig.', en: 'Machine tune, base repair and wax. Drop off in the evening, ready by morning.' },
    priceEur: 34, priceLabel: { hu: 'pár', de: 'Paar', en: 'per pair' },
  },
  {
    id: 'binding',
    name: { hu: 'Kötésbeállítás', de: 'Bindungseinstellung', en: 'Binding adjustment' },
    description: { hu: 'Testsúly és tudásszint szerinti beállítás, jegyzőkönyvvel.', de: 'Einstellung nach Gewicht und Können, mit Protokoll.', en: 'Set to your weight and ability, with a written record.' },
    priceEur: 12, priceLabel: { hu: 'pár', de: 'Paar', en: 'per pair' },
  },
  {
    id: 'depot',
    name: { hu: 'Sítároló (depó)', de: 'Skidepot', en: 'Ski depot' },
    description: { hu: 'Fűtött szekrény a völgyállomáson, cipőszárítóval. Nem kell hazacipelni a felszerelést.', de: 'Beheizter Schrank an der Talstation mit Schuhtrockner.', en: 'Heated locker at the base station with a boot dryer.' },
    priceEur: 5, priceLabel: { hu: 'nap', de: 'Tag', en: 'per day' },
  },
  {
    id: 'depot-season',
    name: { hu: 'Szezonális sítároló', de: 'Saison-Skidepot', en: 'Season ski depot' },
    description: { hu: 'Saját szekrény a teljes szezonra. Szezonbérlettel díjmentes.', de: 'Eigener Schrank für die ganze Saison. Mit Saisonkarte gratis.', en: 'Your own locker for the whole season. Free with a season pass.' },
    priceEur: 120, priceLabel: { hu: 'szezon', de: 'Saison', en: 'per season' },
  },
];
