/** Globális betöltési állapot — a fejléc és a lábléc közötti tartalomhoz. */
export default function Loading() {
  return (
    <div className="container-page py-24" role="status" aria-live="polite">
      <span className="sr-only">Betöltés…</span>
      <div className="skeleton h-64 rounded-panel" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-40 rounded-card" />
        ))}
      </div>
    </div>
  );
}
