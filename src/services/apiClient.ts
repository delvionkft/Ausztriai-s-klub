/**
 * ============================================================================
 *  API-ADAPTER  —  ITT KÖSD BE AZ ÉLES BACKENDET
 * ============================================================================
 *  A weboldal minden külső adatot ezen a rétegen keresztül ér el. Amíg a
 *  `NEXT_PUBLIC_API_BASE_URL` üres, a szolgáltatások a `src/data/*` mock
 *  adataiból dolgoznak, és a felület teljes egészében működik.
 *
 *  ÉLESÍTÉS: állítsd be a `.env` fájlban az API gyökerét — a `request()`
 *  innentől valódi hívásokat indít, a komponensek pedig változatlanok maradnak.
 *
 *  FONTOS: titkos kulcs SOHA nem kerülhet `NEXT_PUBLIC_` változóba. A védett
 *  hívásokat szerveroldali route handlerben proxyzd.
 * ============================================================================
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const isLiveBackend = API_BASE_URL.length > 0;

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!isLiveBackend) {
    throw new ApiError('Nincs beállítva backend (NEXT_PUBLIC_API_BASE_URL).');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });

  if (!response.ok) {
    throw new ApiError(`A kérés nem sikerült: ${response.status}`, response.status);
  }

  return (await response.json()) as T;
}

/** Mock válasz késleltetéssel — így a betöltési állapotok valósághűen tesztelhetők. */
export function mockResponse<T>(data: T, delayMs = 260): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
}
