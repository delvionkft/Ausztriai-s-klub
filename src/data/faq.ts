import type { FaqItem } from '@/types';

/** GYIK — a válaszok nem tartalmaznak kitalált üzleti adatot. */
export const faqItems: FaqItem[] = [
  {
    id: 'faq-open',
    topic: 'general',
    question: 'Honnan tudom, hogy nyitva van-e a síközpont?',
    answer:
      'Az oldal tetején futó élő státuszsáv mutatja a nyitva/zárva állapotot, a hóvastagságot, a hőmérsékletet, valamint a működő felvonók és nyitott pályák számát. A sáv minden oldalon ugyanabból az adatforrásból dolgozik, és jelzi az utolsó frissítés időpontját.',
  },
  {
    id: 'faq-ticket-where',
    topic: 'tickets',
    question: 'Hol tudok jegyet venni?',
    answer:
      'A jegyeket a pénztárnál lehet megváltani. Az online jegyértékesítés bekötése folyamatban van — addig a „Jegyvásárlás” gomb a jegyek és bérletek oldalra visz, ahol minden jegytípus és a döntéstámogató elérhető.',
  },
  {
    id: 'faq-beginner',
    topic: 'skiing',
    question: 'Először síelnék. Hol kezdjem?',
    answer:
      'A síiskola oldalon találod a kezdőknek szóló csomagot, amely a jegyet, az oktatást és a felszerelést egyben tartalmazza. A gyerekpark és az oktatópálya külön, lassú felvonóval működik.',
  },
  {
    id: 'faq-rental',
    topic: 'skiing',
    question: 'Kell saját felszerelés?',
    answer:
      'Nem. A kölcsönzőben sí, snowboard, bakancs, bot és sisak is bérelhető. A pontos méretkínálatot és árakat a kölcsönző adja meg.',
  },
  {
    id: 'faq-house-capacity',
    topic: 'accommodation',
    question: 'Hány fő fér el a vendégházban?',
    answer:
      'A férőhelyet a szállásadó adja meg, ez az adat a szállás oldal gyors infósávjában és a foglalási feltételeknél jelenik meg. Ajánlatkéréskor a pontos létszámot mindig egyeztetjük.',
  },
  {
    id: 'faq-house-exclusive',
    topic: 'accommodation',
    question: 'A teljes házat kell bérelni, vagy szobánként is lehet?',
    answer:
      'A vendégházat egyben adjuk ki. Így a csoport kizárólagosan használja a hálókat, a konyhát és a közös teret, és nem kell más vendégekkel osztozni.',
  },
  {
    id: 'faq-quote-time',
    topic: 'accommodation',
    question: 'Mennyi idő alatt kapok választ az ajánlatkérésre?',
    answer:
      'Az ajánlatkérésre 24 órán belül személyes ajánlattal válaszolunk. Ha sürgős, a WhatsApp vagy a telefonos elérhetőség a leggyorsabb.',
  },
  {
    id: 'faq-deposit',
    topic: 'accommodation',
    question: 'Van kaució?',
    answer:
      'Igen, a kaució visszatérítendő tétel, és az árösszesítőben mindig külön, a teljes összegtől elkülönítve szerepel. A pontos összeget és a visszafizetés menetét az ajánlat tartalmazza.',
  },
  {
    id: 'faq-access',
    topic: 'access',
    question: 'Hogyan tudok odajutni autó nélkül?',
    answer:
      'A megközelítés oldalon összeszedtük a síbusz, a vonat és a repülő útvonalait. A távolságokat és a menetidőket a végleges helyszínadatok megadása után töltjük fel.',
  },
  {
    id: 'faq-parking',
    topic: 'access',
    question: 'Van parkolás a helyszínen?',
    answer:
      'A parkolási lehetőségeket és a kapacitást a megközelítés szekcióban tüntetjük fel, amint a végleges adatok rendelkezésre állnak.',
  },
  {
    id: 'faq-pets',
    topic: 'accommodation',
    question: 'Vihetünk háziállatot?',
    answer:
      'Háziállattal érkező csoportokat egyedi egyeztetés alapján fogadunk. Kérjük, az ajánlatkérésben jelezd, hogy ezt előre át tudjuk beszélni.',
  },
  {
    id: 'faq-night-ski',
    topic: 'skiing',
    question: 'Van esti síelés?',
    answer:
      'Igen, a megvilágított pályaszakaszokon. Az esti síelés külön jegyet igényel, a pontos napokat és időpontokat a felvonók és nyitvatartás oldalon találod.',
  },
];

export const faqByTopic = (topic: FaqItem['topic']) => faqItems.filter((item) => item.topic === topic);
