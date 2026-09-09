/**
 * MAGYAR SZÓTÁR — ez a referencia nyelv.
 * ----------------------------------------------------------------------------
 * Új szöveg felvétele: írd be ide, majd a `de.ts` és `en.ts` fájlokba is.
 * A TypeScript kikényszeríti, hogy egyik nyelvből se maradjon ki kulcs.
 */
export const hu = {
  /* ------------------------------- Navigáció ------------------------------- */
  'nav.mountain': 'A hegy',
  'nav.snowReport': 'Hójelentés',
  'nav.slopeMap': 'Pályatérkép',
  'nav.lifts': 'Felvonók és webkamerák',
  'nav.tickets': 'Jegyek',
  'nav.skiSchool': 'Síiskola',
  'nav.accommodation': 'Szállás',
  'nav.guesthouse': 'A vendégház',
  'nav.groups': 'Csoportoknak',
  'nav.availability': 'Árak és szabad időpontok',
  'nav.quote': 'Ajánlatkérés',
  'nav.experience': 'Élmény',
  'nav.info': 'Info',

  /* ---------------------------------- CTA ---------------------------------- */
  'cta.buyTickets': 'Jegyvásárlás',
  'cta.snowReport': 'Hójelentés',
  'cta.slopeMap': 'Pályatérkép',
  'cta.requestQuote': 'Ajánlatot kérek',
  'cta.availability': 'Szabad időpontok',
  'cta.bookLesson': 'Időpontot foglalok',
  'cta.call': 'Telefon',
  'cta.whatsapp': 'WhatsApp',
  'cta.email': 'E-mail',
  'cta.details': 'Részletek',
  'cta.menu': 'Menü',
  'cta.close': 'Bezárás',

  /* ------------------------------ Élő státusz ------------------------------ */
  'status.live': 'Élő állapot',
  'status.open': 'Nyitva',
  'status.closed': 'Zárva',
  'status.maintenance': 'Karbantartás alatt',
  'status.preparing': 'Előkészítés alatt',
  'status.snowDepth': 'Hóvastagság',
  'status.temperature': 'Hőmérséklet',
  'status.liftsOpen': 'Üzemelő felvonó',
  'status.slopesOpen': 'Nyitott pálya',
  'status.updatedAt': 'Frissítve',

  /* --------------------------------- Lábléc -------------------------------- */
  'footer.resort': 'A síközpont',
  'footer.services': 'Szolgáltatások',
  'footer.accommodation': 'Szállás',
  'footer.legal': 'Jogi és kapcsolat',
  'footer.newsletter': 'Hóértesítő',
  'footer.social': 'Kövess minket',
  'footer.rights': 'Minden jog fenntartva.',

  /* --------------------------------- Nyelv --------------------------------- */
  'lang.label': 'Nyelvválasztó',
  'lang.select': 'Nyelv kiválasztása',
  'lang.partial': 'A német és angol fordítás feltöltése folyamatban: a kereten kívüli tartalom egyelőre magyarul jelenik meg.',

  /* ------------------------------ Süti-banner ------------------------------ */
  'consent.title': 'Sütik és adatvédelem',
  'consent.body':
    'A működéshez szükséges sütiket mindig használjuk. Analitikai és marketing sütiket csak a hozzájárulásoddal töltünk be.',
  'consent.acceptAll': 'Mindet elfogadom',
  'consent.rejectAll': 'Csak a szükségeseket',
  'consent.settings': 'Beállítások',
  'consent.save': 'Beállítások mentése',
  'consent.necessary': 'Működéshez szükséges',
  'consent.necessaryHint': 'Nyelvválasztás és a hozzájárulás tárolása. Nem kapcsolható ki.',
  'consent.analytics': 'Analitika',
  'consent.analyticsHint': 'Névtelen látogatottsági mérés (GA4), hogy javíthassuk az oldalt.',
  'consent.marketing': 'Marketing',
  'consent.marketingHint': 'Hirdetési mérés és remarketing. Alapértelmezetten kikapcsolva.',
  'consent.privacyLink': 'Adatkezelési tájékoztató',
  'consent.manage': 'Süti-beállítások',

  /* -------------------------------- Általános ------------------------------ */
  'common.skipToContent': 'Ugrás a tartalomra',
  'common.loading': 'Betöltés…',
  'common.error': 'Nem sikerült betölteni az adatokat.',
  'common.retry': 'Újrapróbálom',
  'common.empty': 'Nincs megjeleníthető adat.',
  'common.pending': 'Tulajdonosi adatra vár',
} as const;

export type TranslationKey = keyof typeof hu;
export type Dictionary = Record<TranslationKey, string>;
