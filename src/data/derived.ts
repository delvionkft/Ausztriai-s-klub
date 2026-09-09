import { lifts } from './lifts';
import { slopes } from './slopes';

/**
 * SZÁMÍTOTT ÖSSZESÍTŐK
 * ----------------------------------------------------------------------------
 * Ezeket az értékeket sehol nem írjuk be kézzel — mindig a `slopes.ts` és a
 * `lifts.ts` tartalmából számoljuk. Így a hójelentés összesítője és a
 * részletes listák soha nem mondhatnak mást.
 */

export const OPEN_SLOPE_STATUSES = new Set(['open', 'groomed']);

export const slopeTotals = {
  count: slopes.length,
  open: slopes.filter((s) => OPEN_SLOPE_STATUSES.has(s.status)).length,
  totalKm: Math.round(slopes.reduce((sum, s) => sum + s.lengthM, 0) / 100) / 10,
  openKm: Math.round(
    slopes.filter((s) => OPEN_SLOPE_STATUSES.has(s.status)).reduce((sum, s) => sum + s.lengthM, 0) / 100,
  ) / 10,
  snowmakingPercent: Math.round((slopes.filter((s) => s.snowmaking).length / slopes.length) * 100),
  verticalDropM: Math.max(...slopes.map((s) => s.verticalM)),
  byDifficulty: {
    blue: slopes.filter((s) => s.difficulty === 'blue').length,
    red: slopes.filter((s) => s.difficulty === 'red').length,
    black: slopes.filter((s) => s.difficulty === 'black').length,
    skiroute: slopes.filter((s) => s.difficulty === 'skiroute').length,
  },
};

export const liftTotals = {
  count: lifts.length,
  running: lifts.filter((l) => l.status === 'running').length,
  capacityPerHour: lifts.reduce((sum, l) => sum + l.capacityPerHour, 0),
  highestTopM: Math.max(...lifts.map((l) => l.topAltitudeM)),
  lowestBaseM: Math.min(...lifts.map((l) => l.baseAltitudeM)),
};
