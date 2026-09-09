import type { AccommodationFees, FloorPlan, Guesthouse, Localized, Room } from '@/types';

/**
 * ============================================================================
 *  VENDÉGHÁZ  —  ITT CSERÉLD A SZÁLLÁS ADATAIT
 * ============================================================================
 */
export const guesthouse: Guesthouse = {
  name: 'Berghaus Almrausch',
  lead: {
    hu: 'Teljes ház kizárólagos használattal, 22 főig, 250 méterre a völgyállomástól.',
    de: 'Ganzes Haus zur Alleinnutzung für bis zu 22 Personen, 250 Meter von der Talstation.',
    en: 'A whole house for your group alone, up to 22 guests, 250 metres from the base station.',
  },
  description: [
    {
      hu: 'A Berghaus Almrausch egy 1974-ben épült, 2022-ben teljesen felújított alpesi ház a völgyállomás melletti utcában. Nem szobákat adunk ki: a házat mindig egyben, egyetlen társaságnak foglaljuk, így nincs idegen a folyosón és nincs sorban állás a fürdőszobánál.',
      de: 'Das Berghaus Almrausch ist ein 1974 erbautes und 2022 komplett saniertes Alpenhaus in der Straße neben der Talstation. Wir vermieten keine Einzelzimmer: Das Haus wird immer als Ganzes an eine Gruppe vergeben.',
      en: 'Berghaus Almrausch is an alpine house built in 1974 and fully renovated in 2022, on the street beside the base station. We do not rent individual rooms: the house always goes to one group as a whole.',
    },
    {
      hu: 'A földszinten nagy közös tér van kandallóval és egy tizenhat személyes étkezőasztallal — ez a ház szíve. A konyha professzionális felszereltségű, tíz-tizenkét fős főzésre is alkalmas. A bejárat mellett fűtött sítároló, cipőszárítóval és külön léctartóval minden vendégnek.',
      de: 'Im Erdgeschoss befindet sich der große Aufenthaltsraum mit Kamin und einem Esstisch für 16 Personen. Die Küche ist professionell ausgestattet. Neben dem Eingang gibt es einen beheizten Skiraum mit Schuhtrockner.',
      en: 'The ground floor has a large living area with a fireplace and a dining table for sixteen — the heart of the house. The kitchen is professionally equipped. Next to the entrance is a heated ski room with a boot dryer and a rack for every guest.',
    },
    {
      hu: 'A ház előtt hat, télen is takarított parkolóhely, mellette fedett terasz. Az alsó szinten finn szauna és pihenőrész, síelés után szabadon használható.',
      de: 'Vor dem Haus sechs auch im Winter geräumte Parkplätze und eine überdachte Terrasse. Im Untergeschoss finnische Sauna und Ruhebereich.',
      en: 'Six parking spaces in front of the house, cleared in winter, plus a covered terrace. On the lower level a Finnish sauna and relaxation area, free to use after skiing.',
    },
  ],
  maxGuests: 22,
  bedrooms: 6,
  bathrooms: 4,
  distanceToSlopeM: 250,
  parkingSpaces: 6,
  sizeSqm: 310,
  checkIn: '16:00',
  checkOut: '10:00',
  minNights: 3,
  addressLine: 'Almweg 11, 5730 Silbergrat, Ausztria',
  coordinates: { lat: 47.2861, lng: 12.7902 },
};

/** Miért jó csoportoknak — négy fő érv. */
export const groupBenefits: Array<{ id: string; icon: string; title: Localized; text: Localized }> = [
  {
    id: 'exclusive', icon: 'key-round',
    title: { hu: 'Kizárólagos használat', de: 'Alleinnutzung', en: 'Exclusive use' },
    text: {
      hu: 'A ház a foglalás idejére csak a tiétek. Nincs recepció, nincs idegen a közös térben, a kulcs nálatok van.',
      de: 'Das Haus gehört für die Dauer der Buchung nur euch. Keine Rezeption, keine Fremden im Gemeinschaftsraum.',
      en: 'The house is yours alone for the whole stay. No reception desk, no strangers in the shared spaces.',
    },
  },
  {
    id: 'together', icon: 'users-round',
    title: { hu: 'Mindenki egy helyen', de: 'Alle an einem Ort', en: 'Everyone under one roof' },
    text: {
      hu: 'Huszonkét fő, hat hálószoba, egy nagy asztal. Nem kell két szállás között ingázni, és este mindenki egy helyen van.',
      de: '22 Personen, sechs Schlafzimmer, ein großer Tisch. Kein Pendeln zwischen zwei Unterkünften.',
      en: '22 guests, six bedrooms, one big table. No shuttling between two properties, and everyone together in the evening.',
    },
  },
  {
    id: 'simple', icon: 'clipboard-check',
    title: { hu: 'Egyszerű szervezés', de: 'Einfache Organisation', en: 'Simple to organise' },
    text: {
      hu: 'Egy kapcsolattartó, egy e-mail-szál. A síbérletet, az oktatást és a transzfert is egyben intézzük veletek.',
      de: 'Eine Kontaktperson, ein E-Mail-Verlauf. Skipass, Unterricht und Transfer organisieren wir gemeinsam.',
      en: 'One contact person, one email thread. We arrange lift passes, lessons and transfers together with you.',
    },
  },
  {
    id: 'one-invoice', icon: 'receipt',
    title: { hu: 'Egyetlen számla', de: 'Eine Rechnung', en: 'One invoice' },
    text: {
      hu: 'A szállás, a bérlet és a kiegészítő szolgáltatások egy számlán. Céges elszámoláshoz külön bontást is adunk.',
      de: 'Unterkunft, Skipass und Zusatzleistungen auf einer Rechnung. Für Firmen auch mit getrennter Aufstellung.',
      en: 'Accommodation, passes and extras on a single invoice. We can itemise it separately for company accounting.',
    },
  },
];

export const quickFacts: Array<{ id: string; icon: string; label: Localized; value: Localized }> = [
  { id: 'guests', icon: 'users', label: { hu: 'Férőhely', de: 'Betten', en: 'Sleeps' }, value: { hu: '22 fő', de: '22 Personen', en: '22 guests' } },
  { id: 'bedrooms', icon: 'bed-double', label: { hu: 'Hálószoba', de: 'Schlafzimmer', en: 'Bedrooms' }, value: { hu: '6 szoba', de: '6 Zimmer', en: '6 rooms' } },
  { id: 'bathrooms', icon: 'shower-head', label: { hu: 'Fürdőszoba', de: 'Badezimmer', en: 'Bathrooms' }, value: { hu: '4 fürdő, 5 WC', de: '4 Bäder, 5 WC', en: '4 bathrooms, 5 WCs' } },
  { id: 'distance', icon: 'mountain-snow', label: { hu: 'Sípályától', de: 'Zur Piste', en: 'To the slope' }, value: { hu: '250 m gyalog', de: '250 m zu Fuß', en: '250 m on foot' } },
  { id: 'parking', icon: 'car', label: { hu: 'Parkolás', de: 'Parkplatz', en: 'Parking' }, value: { hu: '6 hely a ház előtt', de: '6 Plätze vor dem Haus', en: '6 spaces at the house' } },
  { id: 'ski-room', icon: 'snowflake', label: { hu: 'Sítároló', de: 'Skiraum', en: 'Ski room' }, value: { hu: 'Fűtött, cipőszárítóval', de: 'Beheizt, mit Schuhtrockner', en: 'Heated, with boot dryer' } },
  { id: 'kitchen', icon: 'chef-hat', label: { hu: 'Konyha', de: 'Küche', en: 'Kitchen' }, value: { hu: 'Profi, 12 főre', de: 'Profiküche für 12', en: 'Professional, for 12' } },
  { id: 'living', icon: 'flame', label: { hu: 'Közös tér', de: 'Aufenthaltsraum', en: 'Living area' }, value: { hu: '70 m², kandallóval', de: '70 m², mit Kamin', en: '70 m², with fireplace' } },
];

export const rooms: Room[] = [
  {
    id: 'r1', name: { hu: 'Almrausch — franciaágyas', de: 'Almrausch — Doppelzimmer', en: 'Almrausch — double' },
    floor: 'first', sizeSqm: 22, sleeps: 2,
    beds: [{ type: { hu: 'Franciaágy', de: 'Doppelbett', en: 'Double bed' }, count: 1 }],
    ensuite: true,
    features: [
      { hu: 'Erkély a völgyre', de: 'Balkon zum Tal', en: 'Balcony over the valley' },
      { hu: 'Saját fürdőszoba', de: 'Eigenes Bad', en: 'En-suite bathroom' },
    ],
    imageKey: 'stay-bedroom-1',
  },
  {
    id: 'r2', name: { hu: 'Enzian — franciaágyas', de: 'Enzian — Doppelzimmer', en: 'Enzian — double' },
    floor: 'first', sizeSqm: 20, sleeps: 2,
    beds: [{ type: { hu: 'Franciaágy', de: 'Doppelbett', en: 'Double bed' }, count: 1 }],
    ensuite: true,
    features: [
      { hu: 'Déli fekvés', de: 'Südlage', en: 'South facing' },
      { hu: 'Saját fürdőszoba', de: 'Eigenes Bad', en: 'En-suite bathroom' },
    ],
    imageKey: 'stay-bedroom-2',
  },
  {
    id: 'r3', name: { hu: 'Steinbock — négyágyas', de: 'Steinbock — Vierbettzimmer', en: 'Steinbock — quad' },
    floor: 'first', sizeSqm: 26, sleeps: 4,
    beds: [
      { type: { hu: 'Egyágy', de: 'Einzelbett', en: 'Single bed' }, count: 2 },
      { type: { hu: 'Emeletes ágy', de: 'Etagenbett', en: 'Bunk bed' }, count: 1 },
    ],
    ensuite: false,
    features: [
      { hu: 'Nagy gardrób', de: 'Großer Schrank', en: 'Large wardrobe' },
      { hu: 'Fürdőszoba a folyosón', de: 'Bad am Gang', en: 'Bathroom in the corridor' },
    ],
    imageKey: 'stay-bedroom-3',
  },
  {
    id: 'r4', name: { hu: 'Falke — négyágyas', de: 'Falke — Vierbettzimmer', en: 'Falke — quad' },
    floor: 'attic', sizeSqm: 28, sleeps: 4,
    beds: [{ type: { hu: 'Emeletes ágy', de: 'Etagenbett', en: 'Bunk bed' }, count: 2 }],
    ensuite: false,
    features: [
      { hu: 'Tetőtéri ablak', de: 'Dachfenster', en: 'Skylight' },
      { hu: 'Fiataloknak és gyerekeknek', de: 'Für Jugendliche und Kinder', en: 'Great for teens and children' },
    ],
    imageKey: 'stay-bedroom-3',
  },
  {
    id: 'r5', name: { hu: 'Gipfel — ötágyas', de: 'Gipfel — Fünfbettzimmer', en: 'Gipfel — five-bed' },
    floor: 'attic', sizeSqm: 32, sleeps: 5,
    beds: [
      { type: { hu: 'Franciaágy', de: 'Doppelbett', en: 'Double bed' }, count: 1 },
      { type: { hu: 'Emeletes ágy', de: 'Etagenbett', en: 'Bunk bed' }, count: 1 },
      { type: { hu: 'Egyágy', de: 'Einzelbett', en: 'Single bed' }, count: 1 },
    ],
    ensuite: true,
    features: [
      { hu: 'A ház legnagyobb szobája', de: 'Größtes Zimmer im Haus', en: 'The largest room in the house' },
      { hu: 'Saját fürdőszoba', de: 'Eigenes Bad', en: 'En-suite bathroom' },
    ],
    imageKey: 'stay-bedroom-1',
  },
  {
    id: 'r6', name: { hu: 'Talblick — ötágyas', de: 'Talblick — Fünfbettzimmer', en: 'Talblick — five-bed' },
    floor: 'ground', sizeSqm: 30, sleeps: 5,
    beds: [
      { type: { hu: 'Egyágy', de: 'Einzelbett', en: 'Single bed' }, count: 1 },
      { type: { hu: 'Emeletes ágy', de: 'Etagenbett', en: 'Bunk bed' }, count: 2 },
    ],
    ensuite: false,
    features: [
      { hu: 'Akadálymentes megközelítés', de: 'Barrierefreier Zugang', en: 'Step-free access' },
      { hu: 'Közvetlen kijárat a teraszra', de: 'Direkter Zugang zur Terrasse', en: 'Direct access to the terrace' },
    ],
    imageKey: 'stay-bedroom-2',
  },
];

export const floorPlans: FloorPlan[] = [
  {
    id: 'ground',
    label: { hu: 'Földszint', de: 'Erdgeschoss', en: 'Ground floor' },
    summary: {
      hu: 'A közösségi szint: 70 m² nappali kandallóval, tizenhat személyes étkezővel és profi konyhával. Innen nyílik a fűtött sítároló és a terasz.',
      de: 'Die Gemeinschaftsebene: 70 m² Wohnraum mit Kamin, Esstisch für 16 und Profiküche. Von hier gehen Skiraum und Terrasse ab.',
      en: 'The social floor: a 70 m² living room with fireplace, a dining table for sixteen and a professional kitchen. The heated ski room and terrace open from here.',
    },
    rooms: [
      { hu: 'Nappali kandallóval (70 m²)', de: 'Wohnraum mit Kamin (70 m²)', en: 'Living room with fireplace (70 m²)' },
      { hu: 'Étkező, 16 fős asztallal', de: 'Esszimmer mit 16er-Tisch', en: 'Dining room with a table for 16' },
      { hu: 'Profi konyha', de: 'Profiküche', en: 'Professional kitchen' },
      { hu: 'Talblick — ötágyas szoba', de: 'Talblick — Fünfbettzimmer', en: 'Talblick — five-bed room' },
      { hu: 'Fűtött sítároló és cipőszárító', de: 'Beheizter Skiraum mit Schuhtrockner', en: 'Heated ski room and boot dryer' },
      { hu: 'Vendég-WC', de: 'Gäste-WC', en: 'Guest WC' },
    ],
    beds: 5,
  },
  {
    id: 'first',
    label: { hu: 'Emelet', de: 'Obergeschoss', en: 'First floor' },
    summary: {
      hu: 'Három hálószoba, ebből kettő saját fürdőszobával. A folyosón közös fürdő és külön WC, valamint egy kis olvasósarok.',
      de: 'Drei Schlafzimmer, zwei davon mit eigenem Bad. Am Gang ein Gemeinschaftsbad, separates WC und eine Leseecke.',
      en: 'Three bedrooms, two with en-suite bathrooms. A shared bathroom, separate WC and a small reading corner off the corridor.',
    },
    rooms: [
      { hu: 'Almrausch — franciaágyas, saját fürdővel', de: 'Almrausch — Doppelzimmer mit eigenem Bad', en: 'Almrausch — double with en-suite' },
      { hu: 'Enzian — franciaágyas, saját fürdővel', de: 'Enzian — Doppelzimmer mit eigenem Bad', en: 'Enzian — double with en-suite' },
      { hu: 'Steinbock — négyágyas', de: 'Steinbock — Vierbettzimmer', en: 'Steinbock — quad' },
      { hu: 'Közös fürdőszoba és külön WC', de: 'Gemeinschaftsbad und separates WC', en: 'Shared bathroom and separate WC' },
      { hu: 'Olvasósarok', de: 'Leseecke', en: 'Reading corner' },
    ],
    beds: 8,
  },
  {
    id: 'attic',
    label: { hu: 'Tetőtér', de: 'Dachgeschoss', en: 'Attic' },
    summary: {
      hu: 'Két nagy szoba a fiatalabb társaságnak, tetőtéri ablakokkal és a ház legjobb kilátásával. Külön fürdőszoba és játékszoba.',
      de: 'Zwei große Zimmer für die jüngere Gruppe, mit Dachfenstern und der besten Aussicht im Haus. Eigenes Bad und Spielzimmer.',
      en: 'Two large rooms for the younger part of the group, with skylights and the best view in the house. Separate bathroom and games room.',
    },
    rooms: [
      { hu: 'Falke — négyágyas', de: 'Falke — Vierbettzimmer', en: 'Falke — quad' },
      { hu: 'Gipfel — ötágyas, saját fürdővel', de: 'Gipfel — Fünfbettzimmer mit eigenem Bad', en: 'Gipfel — five-bed with en-suite' },
      { hu: 'Fürdőszoba zuhanyzóval', de: 'Bad mit Dusche', en: 'Bathroom with shower' },
      { hu: 'Játékszoba csocsóval', de: 'Spielzimmer mit Tischfußball', en: 'Games room with table football' },
    ],
    beds: 9,
  },
];

export const fees: AccommodationFees = {
  cleaningFeeEur: 180,
  touristTaxPerPersonPerNightEur: 2.5,
  linenFeePerPersonEur: 12,
  depositEur: 500,
  petFeePerNightEur: 12,
};

export const stayConditions: Array<{ id: string; label: Localized; value: Localized }> = [
  {
    id: 'min-stay',
    label: { hu: 'Minimum tartózkodás', de: 'Mindestaufenthalt', en: 'Minimum stay' },
    value: {
      hu: 'Főszezonban 5 éjszaka, egyéb időszakban 3 éjszaka. Karácsony és újév között szombattól szombatig foglalható.',
      de: 'In der Hauptsaison 5 Nächte, sonst 3 Nächte. Zwischen Weihnachten und Neujahr Samstag bis Samstag.',
      en: 'Five nights in high season, three otherwise. Saturday to Saturday between Christmas and New Year.',
    },
  },
  {
    id: 'max-guests',
    label: { hu: 'Maximum létszám', de: 'Maximale Personenzahl', en: 'Maximum guests' },
    value: {
      hu: '22 fő, pótágyazás nélkül. 22 fő felett a szomszédos apartmant tudjuk ajánlani további 6 főre.',
      de: '22 Personen ohne Zusatzbetten. Darüber hinaus können wir das Nachbarapartment für weitere 6 Personen anbieten.',
      en: '22 guests, with no extra beds. Above that we can offer the neighbouring apartment for a further six.',
    },
  },
  {
    id: 'included',
    label: { hu: 'Az ár tartalmazza', de: 'Im Preis enthalten', en: 'The price includes' },
    value: {
      hu: 'A teljes ház használatát, fűtést, áramot, wifit, a szauna használatát, a sítárolót és a parkolást.',
      de: 'Die Nutzung des ganzen Hauses, Heizung, Strom, WLAN, Sauna, Skiraum und Parkplatz.',
      en: 'Use of the whole house, heating, electricity, wifi, the sauna, the ski room and parking.',
    },
  },
  {
    id: 'payment',
    label: { hu: 'Fizetési ütemezés', de: 'Zahlungsplan', en: 'Payment schedule' },
    value: {
      hu: 'Foglaláskor 30% előleg, a fennmaradó összeg érkezés előtt 14 nappal. Banki átutalással vagy bankkártyával.',
      de: '30% Anzahlung bei Buchung, Restbetrag 14 Tage vor Anreise. Per Überweisung oder Karte.',
      en: 'A 30% deposit on booking, the balance 14 days before arrival. By bank transfer or card.',
    },
  },
  {
    id: 'cancellation',
    label: { hu: 'Lemondási feltételek', de: 'Stornobedingungen', en: 'Cancellation terms' },
    value: {
      hu: 'Érkezés előtt 60 napig díjmentes, 60–30 nap között az előleg, 30 napon belül a teljes összeg 50%-a. Hóhiány miatti lemondás mindig díjmentes.',
      de: 'Bis 60 Tage vor Anreise kostenlos, 60–30 Tage die Anzahlung, innerhalb von 30 Tagen 50% des Gesamtbetrags. Bei Schneemangel immer kostenlos.',
      en: 'Free up to 60 days before arrival; the deposit between 60 and 30 days; 50% of the total within 30 days. Cancellation for lack of snow is always free.',
    },
  },
  {
    id: 'checkin',
    label: { hu: 'Bejelentkezés és kijelentkezés', de: 'Check-in und Check-out', en: 'Check-in and check-out' },
    value: {
      hu: 'Érkezés 16:00-tól, távozás 10:00-ig. Korábbi érkezést egyeztetés után tudunk vállalni.',
      de: 'Anreise ab 16:00 Uhr, Abreise bis 10:00 Uhr. Frühere Anreise nach Absprache möglich.',
      en: 'Arrival from 16:00, departure by 10:00. Earlier arrival possible by arrangement.',
    },
  },
];

/** Csoportoknak szóló gyakorlati részletek. */
export const groupDetails: Array<{ id: string; icon: string; title: Localized; text: Localized }> = [
  {
    id: 'catering', icon: 'utensils',
    title: { hu: 'Étkezés', de: 'Verpflegung', en: 'Catering' },
    text: {
      hu: 'A konyha teljesen felszerelt, tizenkét fős főzéshez is elég. Ha nem szeretnétek főzni, helyi szakácsot vagy reggeliszállítást tudunk szervezni, és a völgyben két étterem fogad csoportokat előrendeléssel.',
      de: 'Die Küche ist voll ausgestattet, auch für zwölf Personen. Auf Wunsch organisieren wir einen Koch oder Frühstückslieferung; zwei Restaurants im Tal nehmen Gruppen mit Vorbestellung.',
      en: 'The kitchen is fully equipped, enough to cook for twelve. If you would rather not cook, we can arrange a local chef or breakfast delivery, and two restaurants in the valley take group pre-orders.',
    },
  },
  {
    id: 'children', icon: 'baby',
    title: { hu: 'Gyerekbarát feltételek', de: 'Kinderfreundlich', en: 'Family friendly' },
    text: {
      hu: 'Két gyerekágy, három etetőszék, lépcsőrács és játékszoba a tetőtérben. A gyerekpark 300 méterre van, a síiskola gyülekezője pedig ott, ahol a szőnyegfelvonó indul.',
      de: 'Zwei Kinderbetten, drei Hochstühle, Treppengitter und Spielzimmer im Dachgeschoss. Das Kinderland liegt 300 Meter entfernt.',
      en: 'Two cots, three high chairs, a stair gate and a games room in the attic. The kids area is 300 metres away, where the ski-school meeting point is.',
    },
  },
  {
    id: 'pets', icon: 'dog',
    title: { hu: 'Állatbarát feltételek', de: 'Haustiere', en: 'Pets' },
    text: {
      hu: 'Kutyát előzetes egyeztetéssel fogadunk, éjszakánként 12 euró díjjal. A hálószobákba nem vihető be, de a nappaliban és a teraszon szabadon lehet.',
      de: 'Hunde nach Absprache, 12 Euro pro Nacht. In den Schlafzimmern nicht erlaubt, im Wohnraum und auf der Terrasse schon.',
      en: 'Dogs are welcome by prior arrangement at 12 euros a night. Not allowed in the bedrooms, but free to be in the living room and on the terrace.',
    },
  },
  {
    id: 'arrival', icon: 'car-front',
    title: { hu: 'Parkolás és érkezés', de: 'Parken und Anreise', en: 'Parking and arrival' },
    text: {
      hu: 'Hat parkolóhely a ház előtt, télen is takarítva; busz számára a völgyállomás parkolójában biztosítunk helyet. Kulcsátadás személyesen 16:00-tól, késői érkezés esetén kulcsszéffel.',
      de: 'Sechs geräumte Parkplätze vor dem Haus; für Busse ein Platz am Talstationsparkplatz. Schlüsselübergabe ab 16:00 Uhr, bei später Anreise per Schlüsseltresor.',
      en: 'Six cleared parking spaces at the house; for a coach we reserve space in the base station car park. Keys handed over in person from 16:00, or by key safe for late arrivals.',
    },
  },
  {
    id: 'ski-storage', icon: 'snowflake',
    title: { hu: 'Csoportos felszereléstárolás', de: 'Ausrüstung für Gruppen', en: 'Group equipment storage' },
    text: {
      hu: 'A fűtött sítárolóban 24 léctartó és 24 cipőszárító hely van, tehát a teljes társaság felszerelése elfér, és reggelre minden száraz.',
      de: 'Im beheizten Skiraum gibt es 24 Skihalter und 24 Schuhtrocknerplätze — die Ausrüstung der ganzen Gruppe passt hinein.',
      en: 'The heated ski room has 24 ski racks and 24 boot-dryer slots, so the whole group’s kit fits and is dry by morning.',
    },
  },
  {
    id: 'sauna', icon: 'waves',
    title: { hu: 'Szauna és pihenés', de: 'Sauna und Erholung', en: 'Sauna and downtime' },
    text: {
      hu: 'Finn szauna az alsó szinten, hat főig egyszerre, felár nélkül. Mellette pihenőrész és zuhanyzó — a síelés utáni fél óra itt telik.',
      de: 'Finnische Sauna im Untergeschoss für bis zu sechs Personen, ohne Aufpreis. Daneben Ruhebereich und Dusche.',
      en: 'A Finnish sauna on the lower level for up to six at a time, at no extra cost. Next to it a relaxation area and shower.',
    },
  },
];
