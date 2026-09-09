'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/data/navigation';

/** HIBAÁLLAPOT — újratöltési lehetőséggel. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Éles környezetben ide köthető a hibanaplózó (pl. Sentry).
    console.error(error);
  }, [error]);

  return (
    <section className="surface-frost">
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-panel bg-state-closedBg text-state-closedInk">
          <AlertTriangle aria-hidden="true" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-h2">Valami félrement</h1>
        <p className="mx-auto mt-4 max-w-md text-lead text-night-600">
          Átmeneti hiba történt. Töltsd újra az oldalt, vagy próbáld meg kicsit később.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="tap-target inline-flex items-center gap-2 rounded-pill bg-sky-400 px-6 font-bold text-night-950 shadow-glow transition-colors hover:bg-glacier-300"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Újratöltés
          </button>
          <Link
            href={routes.home}
            className="tap-target inline-flex items-center gap-2 rounded-pill border border-night-200 bg-white px-6 font-semibold text-night-900 transition-colors hover:border-glacier-400"
          >
            <Home aria-hidden="true" className="h-4 w-4" />
            Kezdőlap
          </Link>
        </div>
      </div>
    </section>
  );
}
