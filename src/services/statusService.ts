import { forecast, liveStatus, snowReport } from '@/data/status';
import { lifts } from '@/data/lifts';
import { slopes } from '@/data/slopes';
import { webcams } from '@/data/webcams';
import type { ForecastDay, Lift, LiveStatus, Slope, SnowReport, Webcam } from '@/types';
import { mockDelay } from './apiClient';

/**
 * ÉLŐ STÁTUSZ SERVICE
 * INTEGRÁCIÓ: cseréld a `mockDelay(...)` sorokat `apiFetch<...>('/status')`-ra.
 * A státuszsáv, a hójelentés és a kezdőlap ugyanezt a forrást használja.
 */

export async function getLiveStatus(): Promise<LiveStatus> {
  // return apiFetch<LiveStatus>('/status/live');
  return mockDelay(liveStatus);
}

export async function getSnowReport(): Promise<SnowReport> {
  // return apiFetch<SnowReport>('/status/snow');
  return mockDelay(snowReport);
}

export async function getForecast(): Promise<ForecastDay[]> {
  // return apiFetch<ForecastDay[]>('/status/forecast');
  return mockDelay(forecast);
}

export async function getLifts(): Promise<Lift[]> {
  // return apiFetch<Lift[]>('/lifts');
  return mockDelay(lifts);
}

export async function getSlopes(): Promise<Slope[]> {
  // return apiFetch<Slope[]>('/slopes');
  return mockDelay(slopes);
}

export async function getWebcams(): Promise<Webcam[]> {
  // return apiFetch<Webcam[]>('/webcams');
  return mockDelay(webcams);
}

/** Szinkron változat a szerveroldali (statikus) rendereléshez. */
export const statusSnapshot = {
  liveStatus,
  snowReport,
  forecast,
  lifts,
  slopes,
  webcams,
};
