'use client';

/** Végső hibakezelő — akkor is működik, ha a gyökér elrendezés hibázik. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="hu">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#07111F', color: '#F8FBFF' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '32rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Valami félrement</h1>
            <p style={{ marginTop: '1rem', lineHeight: 1.6, color: '#DCEFFC' }}>
              Átmeneti hiba történt. Töltsd újra az oldalt, vagy próbáld meg kicsit később.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: '1.75rem', minHeight: 48, padding: '0 1.75rem', borderRadius: 999,
                border: 'none', background: '#38BDF8', color: '#07111F', fontWeight: 700, cursor: 'pointer',
              }}
            >
              Újratöltés
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
