import type { ForecastDay, ResortStatus, Season } from '@/types';

/**
 * ============================================================================
 *  HÓJELENTÉS ÉS ÉLŐ STÁTUSZ  —  ITT CSERÉLD A HEGYI ADATOKAT
 * ============================================================================
 *  Ez a fájl a mock adatforrás. Éles működésben a `src/services/statusService.ts`
 *  a hó- és időjárás-szolgáltató API-jából tölti ugyanezt a szerkezetet, és a
 *  komponensek változtatás nélkül működnek tovább.
 *
 *  SZEZONVEZÉRLÉS
 *  --------------
 *  `NEXT_PUBLIC_SEASON_MODE` = 'auto' | 'winter' | 'summer'
 *   - 'auto'   : a dátum dönt (szezonkezdet/-zárás alapján)
 *   - 'winter' : mindig téli üzem (bemutatóhoz ez az alapértelmezés)
 *   - 'summer' : mindig nyári üzem
 * ============================================================================
 */

export const SEASON_MODE = (process.env.NEXT_PUBLIC_SEASON_MODE ?? 'winter') as 'auto' | 'winter' | 'summer';

export function getCurrentSeason(now: Date = new Date()): Season {
  if (SEASON_MODE === 'winter') return 'winter';
  if (SEASON_MODE === 'summer') return 'summer';
  const month = now.getMonth(); // 0 = január
  return month >= 11 || month <= 3 ? 'winter' : 'summer';
}

/**
 * Az „utolsó frissítés" alapértéke.
 *
 * FONTOS: ez szándékosan ÁLLANDÓ érték. A szerveren előállított HTML-nek és a
 * böngésző első renderjének azonosnak kell lennie, különben hidratálási hiba
 * keletkezik. A valós, „néhány perce" időbélyeget a `useLiveTimestamp` hook
 * állítja be a böngészőben, a hidratálás után (lásd `src/hooks/useLiveTimestamp.ts`).
 * Éles adatforrásnál ezt a mezőt a szolgáltató API-ja adja.
 */
export const STATUS_BASE_TIMESTAMP = '2026-01-17T07:12:00.000Z';

export function freshTimestamp(minutesAgo = 12): string {
  void minutesAgo;
  return STATUS_BASE_TIMESTAMP;
}

export const winterStatus: ResortStatus = {
  status: 'open',
  message: {
    hu: 'Éjszaka 18 cm friss hó esett. Minden fő felvonó üzemel, a gerincpályák délelőtt szeles időben is nyitva maradnak.',
    de: 'In der Nacht sind 18 cm Neuschnee gefallen. Alle Hauptlifte sind in Betrieb, die Gratpisten bleiben auch bei Wind am Vormittag offen.',
    en: '18 cm of fresh snow fell overnight. All main lifts are running and the ridge slopes stay open through the windy morning.',
  },
  snowDepthMountainCm: 148,
  snowDepthValleyCm: 62,
  freshSnow24hCm: 18,
  freshSnow48hCm: 26,
  freshSnow72hCm: 31,
  temperatureMountainC: -7,
  temperatureValleyC: -2,
  windSpeedKmh: 24,
  windDirection: 'ÉNy',
  snowCondition: { hu: 'Porhó', de: 'Pulverschnee', en: 'Powder' },
  liftsOpen: 8,
  liftsTotal: 9,
  slopesOpen: 19,
  slopesTotal: 21,
  slopeKmOpen: 38,
  avalancheLevel: 2,
  nightSkiingToday: true,
  updatedAt: freshTimestamp(12),
};

export const summerStatus: ResortStatus = {
  status: 'partial',
  message: {
    hu: 'Nyári üzem: a Silbergrat kabinos felvonó és a kilátóterasz naponta 09:00-tól 17:00-ig várja a túrázókat és bringásokat.',
    de: 'Sommerbetrieb: Die Silbergrat-Gondelbahn und die Aussichtsterrasse sind täglich von 09:00 bis 17:00 Uhr geöffnet.',
    en: 'Summer operation: the Silbergrat gondola and the viewing terrace are open daily from 09:00 to 17:00.',
  },
  snowDepthMountainCm: 0,
  snowDepthValleyCm: 0,
  freshSnow24hCm: 0,
  freshSnow48hCm: 0,
  freshSnow72hCm: 0,
  temperatureMountainC: 11,
  temperatureValleyC: 21,
  windSpeedKmh: 9,
  windDirection: 'D',
  snowCondition: { hu: 'Nyári üzem', de: 'Sommerbetrieb', en: 'Summer operation' },
  liftsOpen: 2,
  liftsTotal: 9,
  slopesOpen: 0,
  slopesTotal: 21,
  slopeKmOpen: 0,
  avalancheLevel: 1,
  nightSkiingToday: false,
  updatedAt: freshTimestamp(35),
};

/**
 * Háromnapos előrejelzés. A dátumok állandóak (lásd a fenti megjegyzést a
 * hidratálásról); a felületen a `label` mező jelenik meg („Ma", „Holnap").
 */
const FORECAST_DATES = ['2026-01-17', '2026-01-18', '2026-01-19'];
function isoInDays(offset: number): string {
  return FORECAST_DATES[offset] ?? FORECAST_DATES[0];
}

export const winterForecast: ForecastDay[] = [
  {
    date: isoInDays(0),
    label: { hu: 'Ma', de: 'Heute', en: 'Today' },
    icon: 'snow',
    summary: { hu: 'Havazás délelőtt, délutánra felszakadozó felhőzet', de: 'Schneefall am Vormittag, nachmittags auflockernd', en: 'Snow in the morning, clearing in the afternoon' },
    tempMinC: -9, tempMaxC: -3, newSnowCm: 8, windKmh: 24, sunHours: 2,
  },
  {
    date: isoInDays(1),
    label: { hu: 'Holnap', de: 'Morgen', en: 'Tomorrow' },
    icon: 'partly',
    summary: { hu: 'Napos időszakok, gyenge szél', de: 'Sonnige Abschnitte, schwacher Wind', en: 'Sunny spells, light wind' },
    tempMinC: -11, tempMaxC: -4, newSnowCm: 0, windKmh: 11, sunHours: 6,
  },
  {
    date: isoInDays(2),
    label: { hu: 'Harmadnap', de: 'Übermorgen', en: 'Day after' },
    icon: 'sun',
    summary: { hu: 'Derült, hidegebb reggel, kiváló látási viszonyok', de: 'Klar, kalter Morgen, sehr gute Sicht', en: 'Clear, cold morning, excellent visibility' },
    tempMinC: -14, tempMaxC: -6, newSnowCm: 0, windKmh: 8, sunHours: 8,
  },
];

export const summerForecast: ForecastDay[] = [
  {
    date: isoInDays(0),
    label: { hu: 'Ma', de: 'Heute', en: 'Today' },
    icon: 'sun',
    summary: { hu: 'Napos, kellemes hegyi idő', de: 'Sonnig, angenehmes Bergwetter', en: 'Sunny, pleasant mountain weather' },
    tempMinC: 9, tempMaxC: 22, newSnowCm: 0, windKmh: 8, sunHours: 10,
  },
  {
    date: isoInDays(1),
    label: { hu: 'Holnap', de: 'Morgen', en: 'Tomorrow' },
    icon: 'partly',
    summary: { hu: 'Délutáni gomolyfelhők, zivatar lehetséges', de: 'Nachmittags Quellwolken, Gewitter möglich', en: 'Afternoon build-up, thunderstorms possible' },
    tempMinC: 11, tempMaxC: 20, newSnowCm: 0, windKmh: 14, sunHours: 6,
  },
  {
    date: isoInDays(2),
    label: { hu: 'Harmadnap', de: 'Übermorgen', en: 'Day after' },
    icon: 'cloud',
    summary: { hu: 'Változóan felhős, hűvösebb gerincidő', de: 'Wechselnd bewölkt, kühler am Grat', en: 'Variable cloud, cooler on the ridge' },
    tempMinC: 7, tempMaxC: 17, newSnowCm: 0, windKmh: 18, sunHours: 4,
  },
];
