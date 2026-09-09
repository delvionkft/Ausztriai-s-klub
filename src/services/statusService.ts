import type { ForecastDay, ResortStatus } from '@/types';
import { liftTotals, slopeTotals } from '@/data/derived';
import {
  getCurrentSeason, summerForecast, summerStatus, winterForecast, winterStatus,
} from '@/data/status';
import { isLiveBackend, mockResponse, request } from './apiClient';

/**
 * HÓ- ÉS ÜZEMÁLLAPOT
 * ----------------------------------------------------------------------------
 * ÉLESÍTÉS: állítsd be a `NEXT_PUBLIC_API_BASE_URL`-t, és a szolgáltató
 * `/status` illetve `/forecast` végpontja adja ugyanezt a szerkezetet.
 */

/** A felvonó- és pályaszámokat mindig a tényleges listákból vesszük át. */
function withRealCounts(base: ResortStatus): ResortStatus {
  const isWinter = getCurrentSeason() === 'winter';
  return {
    ...base,
    liftsTotal: liftTotals.count,
    liftsOpen: isWinter ? liftTotals.running : base.liftsOpen,
    slopesTotal: slopeTotals.count,
    slopesOpen: isWinter ? slopeTotals.open : 0,
    slopeKmOpen: isWinter ? slopeTotals.openKm : 0,
  };
}

export function getResortStatusSync(): ResortStatus {
  return withRealCounts(getCurrentSeason() === 'winter' ? winterStatus : summerStatus);
}

export function getForecastSync(): ForecastDay[] {
  return getCurrentSeason() === 'winter' ? winterForecast : summerForecast;
}

export async function fetchResortStatus(): Promise<ResortStatus> {
  if (isLiveBackend) return request<ResortStatus>('/status');
  return mockResponse(getResortStatusSync());
}

export async function fetchForecast(): Promise<ForecastDay[]> {
  if (isLiveBackend) return request<ForecastDay[]>('/forecast');
  return mockResponse(getForecastSync());
}
