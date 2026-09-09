import type { OpeningRule } from '@/types';
import { resortInfo } from './site.config';

/**
 * ============================================================================
 *  NYITVATARTÁS  —  ITT CSERÉLD AZ ÜZEMRENDET
 * ============================================================================
 */
export const openingRules: OpeningRule[] = [
  {
    id: 'daily',
    label: { hu: 'Napi üzem', de: 'Täglicher Betrieb', en: 'Daily operation' },
    detail: {
      hu: 'A felvonók naponta üzemelnek, a jegypénztár fél órával korábban nyit. Az utolsó felvonó a csúcsra 15:45-kor indul.',
      de: 'Die Lifte laufen täglich, die Kassa öffnet eine halbe Stunde früher. Die letzte Bergfahrt startet um 15:45 Uhr.',
      en: 'Lifts run daily and the ticket office opens half an hour earlier. The last ride up leaves at 15:45.',
    },
    hours: '08:30 – 16:30',
    icon: 'clock',
    highlight: true,
  },
  {
    id: 'night-ski',
    label: { hu: 'Esti síelés', de: 'Nachtskilauf', en: 'Night skiing' },
    detail: {
      hu: 'Kedden és pénteken az Almwiese pálya és az Almbahn kivilágítva üzemel. Külön esti jegy váltható, a napijegy este is érvényes.',
      de: 'Dienstag und Freitag sind die Almwiese und die Almbahn beleuchtet in Betrieb. Eigenes Abendticket erhältlich, die Tageskarte gilt auch abends.',
      en: 'On Tuesdays and Fridays the Almwiese and the Almbahn operate under floodlights. A separate evening ticket is available; day passes are also valid.',
    },
    hours: '18:30 – 21:30',
    icon: 'moon',
  },
  {
    id: 'season-start',
    label: { hu: 'Szezonnyitás', de: 'Saisonstart', en: 'Season opening' },
    detail: {
      hu: 'A tervezett nyitás időpontja a hóviszonyoktól függ. A pontos dátumot a hóértesítőben és a kezdőlapon jelezzük.',
      de: 'Der geplante Starttermin hängt von den Schneeverhältnissen ab. Das genaue Datum geben wir im Schneebericht bekannt.',
      en: 'The planned opening date depends on snow conditions. We announce the exact date in the snow alert and on the home page.',
    },
    hours: '2025. december 5.',
    icon: 'calendar',
  },
  {
    id: 'season-end',
    label: { hu: 'Tervezett szezonzárás', de: 'Geplantes Saisonende', en: 'Planned season end' },
    detail: {
      hu: 'A szezon záró hétvégéjén ingyenes a gyerekjegy, és a hüttékben zárónapi menü várja a vendégeket.',
      de: 'Am Abschlusswochenende sind Kinderkarten gratis und in den Hütten gibt es ein Saisonschlussmenü.',
      en: "On the closing weekend children's tickets are free and the huts serve a season-finale menu.",
    },
    hours: '2026. április 6.',
    icon: 'calendar',
  },
  {
    id: 'summer',
    label: { hu: 'Nyári üzem', de: 'Sommerbetrieb', en: 'Summer operation' },
    detail: {
      hu: 'Június közepétől október elejéig a Silbergratbahn kabinos felvonó túrázókat és kerékpárosokat szállít a gerincre.',
      de: 'Von Mitte Juni bis Anfang Oktober bringt die Silbergratbahn Wanderer und Biker auf den Grat.',
      en: 'From mid-June to early October the Silbergratbahn carries hikers and bikers up to the ridge.',
    },
    hours: '09:00 – 17:00',
    icon: 'snowflake',
  },
  {
    id: 'exceptions',
    label: { hu: 'Rendkívüli változások', de: 'Außerordentliche Änderungen', en: 'Exceptional changes' },
    detail: {
      hu: 'Erős szél, zivatar vagy lavinaveszély esetén egyes felvonók korábban leállhatnak. A változásokat a fejléc státuszsávjában azonnal jelezzük.',
      de: 'Bei starkem Wind, Gewitter oder Lawinengefahr können einzelne Anlagen früher schließen. Änderungen zeigen wir sofort in der Statusleiste an.',
      en: 'In strong wind, thunderstorms or avalanche risk individual lifts may close early. We show changes immediately in the header status bar.',
    },
    hours: 'Eseti',
    icon: 'alert',
  },
];

export const seasonDates = {
  start: resortInfo.seasonStart,
  end: resortInfo.seasonEnd,
};
