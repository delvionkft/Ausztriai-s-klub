'use client';

import { useCallback, useEffect, useState } from 'react';

export type AsyncState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncData<T> {
  data: T | null;
  state: AsyncState;
  error: string | null;
  reload: () => void;
}

/**
 * Egységes betöltési / hiba / siker állapotkezelés a service hívásokhoz.
 * Ugyanez a hook használható valós API mögött is — nem kell módosítani.
 */
export function useAsyncData<T>(loader: () => Promise<T>, deps: unknown[] = []): AsyncData<T> {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<AsyncState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableLoader = useCallback(loader, deps);

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    setError(null);

    stableLoader()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setState('success');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt.');
        setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [stableLoader, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { data, state, error, reload };
}
