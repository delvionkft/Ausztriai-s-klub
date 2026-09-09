import type { ForecastDay, LiveStatus, SnowReport } from '@/types';

/**
 * ÉLŐ STÁTUSZ — EGYETLEN KÖZPONTI ADATFORRÁS
 * ----------------------------------------------------------------------------
 * A fejléc alatti státuszsáv, a hójelentés és a kezdőlap ugyanezt olvassa.
 * INTEGRÁCIÓ: cseréld le a `src/services/statusService.ts` hívását valós API-ra,
 * ez a fájl csak a mock választ tartja.
 */

/** Rögzített referencia-időpont, hogy a szerver- és kliensoldali render egyezzen. */
export const MOCK_REFERENCE_DATE = '2026-01-17T07:40:00+01:00';

export const liveStatus: LiveStatus = {
  resortStatus: 'open',
  snowDepthMountainCm: 82,
  snowDepthValleyCm: 41,
  temperatureC: -4,
  liftsOpen: 5,
  liftsTotal: 6,
  slopesOpen: 8,
  slopesTotal: 11,
  updatedAt: MOCK_REFERENCE_DATE,
  season: 'winter',
};

export const snowReport: SnowReport = {
  freshSnow24hCm: 12,
  freshSnow48hCm: 18,
  freshSnow72hCm: 24,
  windSpeedKmh: 14,
  windDirection: 'ÉNy',
  snowQuality: 'Poros, előkészített',
  avalancheLevel: 2,
};

export const forecast: ForecastDay[] = [
  {
    date: '2026-01-17',
    label: 'Ma',
    icon: 'snow',
    summary: 'Havazás, korlátozott látótávolság a gerincen',
    tempMinC: -7,
    tempMaxC: -3,
    freshSnowCm: 8,
  },
  {
    date: '2026-01-18',
    label: 'Holnap',
    icon: 'cloud-sun',
    summary: 'Felszakadozó felhőzet, gyenge szél',
    tempMinC: -8,
    tempMaxC: -2,
    freshSnowCm: 2,
  },
  {
    date: '2026-01-19',
    label: 'Harmadnap',
    icon: 'sun',
    summary: 'Napos, hideg reggel, jó láthatóság',
    tempMinC: -11,
    tempMaxC: -1,
    freshSnowCm: 0,
  },
];
