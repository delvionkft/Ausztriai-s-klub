'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { routes } from '@/data/navigation';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

/**
 * HIBAHATÁR — az oldalak közös hibakezelője.
 * Váratlan kliensoldali hiba esetén ez jelenik meg fehér képernyő helyett.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // INTEGRÁCIÓ: itt lehet hibanaplózót (pl. Sentry) bekötni.
    console.error('Váratlan hiba:', error);
  }, [error]);

  return (
    <section className="container-page">
      <div className="mx-auto flex max-w-xl flex-col items-center py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-status-closedBg text-status-closed">
          <AlertTriangle aria-hidden="true" className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-h1">Váratlan hiba történt</h1>
        <p className="mt-3 text-deep-600">
          Sajnáljuk, ezt az oldalt most nem tudtuk betölteni. Próbáld újra, vagy térj vissza a kezdőlapra.
        </p>
        {error.digest ? (
          <p className="mt-3 rounded-lg bg-frost px-3 py-1.5 font-mono text-xs text-deep-500">
            Hibaazonosító: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton onClick={reset} icon={<RefreshCw aria-hidden="true" className="h-4 w-4" />}>
            Újratöltés
          </PrimaryButton>
          <SecondaryButton href={routes.home}>Vissza a kezdőlapra</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
