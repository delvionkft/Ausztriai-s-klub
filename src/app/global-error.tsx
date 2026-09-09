'use client';

/** Végső hibahatár — akkor is működik, ha a gyökér layout dől el. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="hu">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#F7FAFC',
          color: '#0E2540',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Váratlan hiba történt</h1>
          <p style={{ marginTop: '0.75rem', color: '#245586', lineHeight: 1.6 }}>
            Az oldal betöltése nem sikerült. Kérünk, próbáld újra.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              minHeight: '48px',
              padding: '0 1.5rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: '#143253',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            Újratöltés
          </button>
        </div>
      </body>
    </html>
  );
}
