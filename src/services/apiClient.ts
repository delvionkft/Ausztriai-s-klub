/**
 * ============================================================================
 *  API KLIENS — INTEGRÁCIÓS PONT
 * ============================================================================
 *  Jelenleg NINCS backend: minden service a `src/data/*` mock fájlokból olvas.
 *
 *  EMERGENT MIGRÁCIÓ:
 *   1. Állítsd be a `NEXT_PUBLIC_API_BASE_URL` (vagy `REACT_APP_API_BASE_URL`)
 *      környezeti változót — lásd `.env.example`.
 *   2. A service fájlokban cseréld a `mockDelay(...)` ágakat `apiFetch(...)`-re.
 *   3. A visszatérési típusok (`src/types/index.ts`) változatlanok maradnak,
 *      így egyetlen komponenst sem kell módosítani.
 * ============================================================================
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/** `true`, ha van bekötött backend. Amíg `false`, a mock adatok élnek. */
export const HAS_BACKEND = API_BASE_URL.length > 0;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Hálózati hívás — csak akkor használjuk, ha `HAS_BACKEND` igaz. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!HAS_BACKEND) {
    throw new ApiError('Nincs beállított API_BASE_URL.', 0);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(`A kérés nem sikerült (${response.status}).`, response.status);
  }

  return (await response.json()) as T;
}

/** Mock késleltetés, hogy a betöltési állapotok valósághűen tesztelhetők legyenek. */
export function mockDelay<T>(payload: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(payload), ms));
}
