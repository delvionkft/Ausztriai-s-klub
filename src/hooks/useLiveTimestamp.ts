'use client';

import { useEffect, useState } from 'react';

/**
 * HIDRATÁLÁSBIZTOS IDŐBÉLYEG
 * ----------------------------------------------------------------------------
 * A szerveren előállított HTML és a böngésző első renderje azonos kell legyen,
 * ezért az „X perce frissítve" értéket csak a hidratálás UTÁN számoljuk ki.
 *
 * Első render: a mock/API adatból érkező `baseIso`.
 * Hidratálás után: a jelenhez képest `minutesAgo` perccel korábbi időpont.
 *
 * Éles adatforrásnál a `baseIso` már a szolgáltató valós időbélyege lesz, és a
 * `minutesAgo` paramétert egyszerűen elhagyhatod.
 */
export function useLiveTimestamp(baseIso: string, minutesAgo: number | null): string {
  const [iso, setIso] = useState(baseIso);

  useEffect(() => {
    if (minutesAgo === null) { setIso(baseIso); return; }
    setIso(new Date(Date.now() - minutesAgo * 60_000).toISOString());
  }, [baseIso, minutesAgo]);

  return iso;
}

/** Igaz, amint a komponens a böngészőben is lefutott. Naptárakhoz használjuk. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}
