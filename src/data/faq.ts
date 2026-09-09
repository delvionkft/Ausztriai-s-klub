import type { FaqItem } from '@/types';

/**
 * ============================================================================
 *  GYAKORI KÉRDÉSEK  —  ITT CSERÉLD A KÉRDÉS-VÁLASZ PÁROKAT
 * ============================================================================
 *  A `/kapcsolat` oldal kategóriákra bontva jeleníti meg, a foglalási
 *  kérdéseket pedig az ajánlatkérő oldal is átveszi (category: 'booking').
 *  A FAQPage strukturált adat automatikusan ebből épül.
 * ============================================================================
 */
export const faqItems: FaqItem[] = [
  {
    id: 'faq-ticket-online',
    category: 'tickets',
    question: { hu: 'Lehet online jegyet venni?', de: 'Kann man Tickets online kaufen?', en: 'Can I buy tickets online?' },
    answer: {
      hu: 'Az online jegyértékesítés bekötése folyamatban van. Addig a völgyállomás pénztáránál, kártyával és készpénzzel is tudsz jegyet venni, csoportos jegyet pedig e-mailben előre lefoglalhatsz.',
      de: 'Der Online-Ticketverkauf wird gerade angebunden. Bis dahin kaufst du an der Kassa der Talstation mit Karte oder bar; Gruppenkarten reservierst du per E-Mail.',
      en: 'Online ticket sales are being connected. Until then you can buy at the base station ticket office by card or cash, and reserve group tickets by email.',
    },
  },
  {
    id: 'faq-ticket-refund',
    category: 'tickets',
    question: { hu: 'Visszakapom a jegy árát, ha rossz az idő?', de: 'Bekomme ich das Geld bei schlechtem Wetter zurück?', en: 'Do I get a refund in bad weather?' },
    answer: {
      hu: 'Ha a felvonók műszaki vagy időjárási okból két óránál hosszabb ideig állnak, a napijegy árának időarányos részét jóváírjuk. A jóváírást a pénztárnál, a jegy felmutatásával lehet igényelni még aznap.',
      de: 'Stehen die Anlagen länger als zwei Stunden aus technischen oder Wettergründen still, schreiben wir den anteiligen Betrag gut. Die Gutschrift beantragst du am selben Tag an der Kassa.',
      en: 'If the lifts stop for more than two hours for technical or weather reasons, we credit the proportional value of the day pass. Claim it at the ticket office the same day.',
    },
  },
  {
    id: 'faq-ticket-child',
    category: 'tickets',
    question: { hu: 'Mennyi idős kortól kell jegy a gyereknek?', de: 'Ab welchem Alter brauchen Kinder ein Ticket?', en: 'From what age do children need a ticket?' },
    answer: {
      hu: 'Hat éves kor alatt a felvonózás ingyenes, szülői kísérettel. Hat és tizennégy év között gyermekjegy, tizenöt és tizennyolc között ifjúsági jegy váltandó. Az életkort a pénztárnál igazolni kell.',
      de: 'Unter sechs Jahren ist die Fahrt in Begleitung eines Elternteils gratis. Von 6 bis 14 gilt die Kinderkarte, von 15 bis 18 die Jugendkarte. Nachweis an der Kassa.',
      en: 'Under six, lift rides are free with a parent. From 6 to 14 a child ticket applies, from 15 to 18 a youth ticket. Age must be proven at the ticket office.',
    },
  },
  {
    id: 'faq-slopes-beginner',
    category: 'slopes',
    question: { hu: 'Van kezdőknek való pálya?', de: 'Gibt es Pisten für Anfänger?', en: 'Are there slopes for beginners?' },
    answer: {
      hu: 'Igen. A gyerekpark szőnyegfelvonóval a legelső napra való, az Almwiese pedig széles, lankás családi pálya. Ezen kívül a Silberabfahrt is végig kék jelzésű, így a csúcsról is le lehet csúszni kezdőként.',
      de: 'Ja. Das Kinderland mit Zauberteppich ist für den ersten Tag, die Almwiese eine breite Familienpiste. Auch die Silberabfahrt ist durchgehend blau markiert.',
      en: 'Yes. The kids area with its magic carpet is for day one, and the Almwiese is a wide family slope. The Silberabfahrt is blue all the way, so beginners can descend from the summit too.',
    },
  },
  {
    id: 'faq-slopes-closed',
    category: 'slopes',
    question: { hu: 'Miért van lezárva egy-egy pálya?', de: 'Warum sind einzelne Pisten gesperrt?', en: 'Why is a slope closed?' },
    answer: {
      hu: 'Leggyakrabban lavinaveszély, erős szél vagy hóhiány miatt. A lezárás oka mindig szerepel a hójelentés pályalistájában és a pályatérképen is. A jelzett lezáráson túl a mentés nem garantálható.',
      de: 'Meist wegen Lawinengefahr, starkem Wind oder Schneemangel. Der Grund steht immer in der Pistenliste und auf dem Pistenplan. Jenseits der Absperrung ist keine Rettung gewährleistet.',
      en: 'Usually avalanche risk, strong wind or lack of snow. The reason always appears in the snow report slope list and on the map. Beyond a marked closure, rescue cannot be guaranteed.',
    },
  },
  {
    id: 'faq-slopes-night',
    category: 'slopes',
    question: { hu: 'Mikor van esti síelés?', de: 'Wann gibt es Nachtskilauf?', en: 'When is night skiing?' },
    answer: {
      hu: 'Kedden és pénteken 18:30 és 21:30 között, az Almwiese pályán és az Almbahn felvonóval. Külön esti jegy váltható, de a napijegy is érvényes rá.',
      de: 'Dienstag und Freitag von 18:30 bis 21:30 Uhr auf der Almwiese mit der Almbahn. Eigenes Abendticket erhältlich, die Tageskarte gilt ebenfalls.',
      en: 'Tuesdays and Fridays from 18:30 to 21:30 on the Almwiese with the Almbahn lift. A separate evening ticket is available, and day passes are also valid.',
    },
  },
  {
    id: 'faq-school-booking',
    category: 'ski-school',
    question: { hu: 'Hogyan foglalhatok síoktatást?', de: 'Wie buche ich einen Skikurs?', en: 'How do I book ski lessons?' },
    answer: {
      hu: 'A síiskola oldalán válaszd ki a csomagot vagy az oktatót, és küldd el a foglalási kérést. Egy munkanapon belül visszaigazoljuk az időpontot. Csoportos oktatásra érdemes legalább egy héttel előre jelentkezni.',
      de: 'Wähle auf der Skischulseite ein Paket oder einen Skilehrer und sende die Anfrage. Innerhalb eines Werktags bestätigen wir den Termin.',
      en: 'On the ski school page pick a package or an instructor and send the booking request. We confirm the slot within one working day.',
    },
  },
  {
    id: 'faq-school-level',
    category: 'ski-school',
    question: { hu: 'Mi van, ha nem tudom, milyen szinten vagyok?', de: 'Was, wenn ich mein Niveau nicht kenne?', en: 'What if I do not know my level?' },
    answer: {
      hu: 'Az első óra elején az oktató néhány kanyar alapján besorol. Ha kiderül, hogy másik csoport való neked, aznap még átteszünk, felár nélkül.',
      de: 'Zu Beginn der ersten Stunde ordnet dich der Skilehrer nach einigen Schwüngen ein. Ein Gruppenwechsel ist am selben Tag kostenlos möglich.',
      en: 'At the start of the first lesson the instructor places you after a few turns. If another group suits you better, we move you the same day at no extra cost.',
    },
  },
  {
    id: 'faq-rental-reserve',
    category: 'rental',
    question: { hu: 'Előre kell foglalni a felszerelést?', de: 'Muss ich die Ausrüstung vorbestellen?', en: 'Do I need to reserve equipment in advance?' },
    answer: {
      hu: 'Hétköznap általában nem, de főszezoni hétvégén és csoportos érkezésnél érdemes. Csoportnak a méretlistát előre elküldve reggel már kikészítve várja a felszerelés.',
      de: 'Unter der Woche meist nicht, an Hauptsaison-Wochenenden und bei Gruppen aber empfehlenswert. Mit vorab gesandter Größenliste steht alles bereit.',
      en: 'Usually not on weekdays, but advisable on high-season weekends and for groups. Send us your size list and everything is laid out ready in the morning.',
    },
  },
  {
    id: 'faq-rental-helmet',
    category: 'rental',
    question: { hu: 'Kötelező a sisak?', de: 'Ist ein Helm Pflicht?', en: 'Is a helmet mandatory?' },
    answer: {
      hu: 'Tizenöt év alatt Salzburg tartományban kötelező, felette erősen ajánlott. A gyerekszettek árában a sisak benne van, felnőtteknek napi 6 euróért adjuk.',
      de: 'Unter 15 Jahren ist er im Land Salzburg Pflicht, darüber dringend empfohlen. Bei Kindersets ist der Helm inklusive, für Erwachsene 6 Euro pro Tag.',
      en: 'Mandatory under 15 in the Salzburg region and strongly recommended above. Helmets are included in kids sets and cost 6 euros a day for adults.',
    },
  },
  {
    id: 'faq-stay-whole-house',
    category: 'accommodation',
    question: { hu: 'Lehet csak egy szobát foglalni?', de: 'Kann man ein einzelnes Zimmer buchen?', en: 'Can I book a single room?' },
    answer: {
      hu: 'Nem, a Berghaus Almrauschot mindig egyben, egyetlen társaságnak adjuk ki. Ezért nincs idegen a közös térben, és a ház teljes egészében a csoporté a foglalás idejére.',
      de: 'Nein, das Berghaus Almrausch wird immer als Ganzes an eine Gruppe vergeben. So bleibt der Gemeinschaftsraum privat.',
      en: 'No — Berghaus Almrausch always goes to one group as a whole. That is why the shared spaces stay private for your stay.',
    },
  },
  {
    id: 'faq-stay-min-nights',
    category: 'accommodation',
    question: { hu: 'Hány éjszakától lehet foglalni?', de: 'Ab wie vielen Nächten kann man buchen?', en: 'What is the minimum stay?' },
    answer: {
      hu: 'Főszezonban öt éjszaka, egyéb időszakban három. Karácsony és újév között szombattól szombatig, hét éjszakára foglalható. A naptár minden napnál jelzi az adott minimumot.',
      de: 'In der Hauptsaison fünf Nächte, sonst drei. Zwischen Weihnachten und Neujahr Samstag bis Samstag, sieben Nächte. Der Kalender zeigt das Minimum je Tag an.',
      en: 'Five nights in high season, three otherwise. Saturday to Saturday, seven nights, between Christmas and New Year. The calendar shows the minimum for each day.',
    },
  },
  {
    id: 'faq-stay-linen',
    category: 'accommodation',
    question: { hu: 'Kell ágyneműt hozni?', de: 'Muss man Bettwäsche mitbringen?', en: 'Do we need to bring bed linen?' },
    answer: {
      hu: 'Nem. Az ágynemű és a törölköző az árban szerepel, személyenként 12 euró egyszeri díjjal, a végösszegben feltüntetve. Az ágyak érkezéskor be vannak vetve.',
      de: 'Nein. Bettwäsche und Handtücher sind mit einer einmaligen Gebühr von 12 Euro pro Person enthalten. Die Betten sind bei Ankunft bezogen.',
      en: 'No. Linen and towels are included at a one-off 12 euros per person, shown in the total. Beds are made up on arrival.',
    },
  },
  {
    id: 'faq-arrival-parking',
    category: 'arrival',
    question: { hu: 'Hol tudok parkolni?', de: 'Wo kann ich parken?', en: 'Where can I park?' },
    answer: {
      hu: 'A völgyállomásnál 420 ingyenes hely van, ebből 12 elektromos töltővel és 8 akadálymentes. A vendégház előtt hat, télen is takarított hely tartozik a foglaláshoz.',
      de: 'An der Talstation gibt es 420 kostenlose Plätze, 12 mit E-Ladestation und 8 barrierefrei. Zum Gästehaus gehören sechs geräumte Plätze.',
      en: 'There are 420 free spaces at the base station, 12 with EV chargers and 8 accessible. The guesthouse booking includes six cleared spaces at the house.',
    },
  },
  {
    id: 'faq-arrival-chains',
    category: 'arrival',
    question: { hu: 'Szükség van hóláncra?', de: 'Braucht man Schneeketten?', en: 'Do I need snow chains?' },
    answer: {
      hu: 'A völgybe vezető út végig sózott és folyamatosan takarított, ezért téli gumival általában elég. Hóláncot érdemes az autóban tartani erős havazás idejére — ilyenkor a rendőrség elrendelheti a használatát.',
      de: 'Die Talstraße wird gestreut und laufend geräumt, Winterreifen genügen meist. Ketten sollte man für starken Schneefall mitführen.',
      en: 'The valley road is salted and cleared continuously, so winter tyres are usually enough. Keep chains in the car for heavy snowfall, when police may require them.',
    },
  },
  {
    id: 'faq-payment-methods',
    category: 'payment',
    question: { hu: 'Milyen fizetési módot fogadtok el?', de: 'Welche Zahlungsmittel werden akzeptiert?', en: 'Which payment methods do you accept?' },
    answer: {
      hu: 'A pénztárnál bankkártyát és készpénzt, a szállásfoglalásnál banki átutalást és bankkártyát. Céges foglalásnál átutalásos számlát állítunk ki, igény szerint tételes bontással.',
      de: 'An der Kassa Karte und Bargeld, bei der Unterkunft Überweisung und Karte. Für Firmen stellen wir eine Rechnung auf Überweisung aus.',
      en: 'Card and cash at the ticket office; bank transfer and card for accommodation. For company bookings we issue an invoice payable by transfer, itemised on request.',
    },
  },
  {
    id: 'faq-booking-process',
    category: 'booking',
    question: { hu: 'Hogyan megy a foglalás?', de: 'Wie läuft die Buchung ab?', en: 'How does booking work?' },
    answer: {
      hu: 'Megnézed a naptárban a szabad időpontot, elküldöd az ajánlatkérést, mi pedig 24 órán belül személyes ajánlattal válaszolunk. Az ajánlat elfogadása és a 30% előleg beérkezése után a foglalás véglegessé válik.',
      de: 'Du prüfst den Kalender, sendest die Anfrage, und wir antworten binnen 24 Stunden mit einem persönlichen Angebot. Nach Annahme und 30% Anzahlung ist die Buchung fix.',
      en: 'Check the calendar, send the enquiry, and we reply within 24 hours with a personal quote. Once you accept and the 30% deposit arrives, the booking is confirmed.',
    },
  },
  {
    id: 'faq-booking-option',
    category: 'booking',
    question: { hu: 'Mit jelent az opciós nap a naptárban?', de: 'Was bedeutet ein Optionstag im Kalender?', en: 'What does an “on hold” day mean in the calendar?' },
    answer: {
      hu: 'Azt, hogy valaki már kért ajánlatot arra az időszakra, de még nem véglegesítette. Az opció általában öt napig él. Nyugodtan kérj ajánlatot te is — ha az opció lejár, téged értesítünk elsőként.',
      de: 'Jemand hat für diesen Zeitraum bereits angefragt, aber noch nicht fixiert. Die Option gilt meist fünf Tage. Frag ruhig an — läuft sie ab, melden wir uns zuerst bei dir.',
      en: 'Someone has already requested those dates but not confirmed. A hold usually lasts five days. Do enquire anyway — if it lapses, we contact you first.',
    },
  },
  {
    id: 'faq-booking-cancel',
    category: 'booking',
    question: { hu: 'Mi történik, ha nincs hó?', de: 'Was passiert, wenn kein Schnee liegt?', en: 'What happens if there is no snow?' },
    answer: {
      hu: 'Ha a síterep az érkezésetek napján nem üzemel hóhiány miatt, a szállásfoglalás díjmentesen lemondható vagy áttehető egy másik időpontra. Ezt írásban is rögzítjük az ajánlatban.',
      de: 'Ist das Skigebiet am Anreisetag wegen Schneemangels geschlossen, kann die Buchung kostenlos storniert oder verschoben werden. Das halten wir im Angebot schriftlich fest.',
      en: 'If the ski area is closed for lack of snow on your arrival day, the booking can be cancelled or moved free of charge. We put this in writing in your quote.',
    },
  },
];

export const bookingFaq = faqItems.filter((f) => f.category === 'booking' || f.category === 'accommodation');
