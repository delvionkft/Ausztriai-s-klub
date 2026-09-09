/** Globális betöltési állapot az útvonalváltások alatt. */
export default function Loading() {
  return (
    <div className="container-page py-20" role="status" aria-live="polite">
      <span className="sr-only">Az oldal betöltése folyamatban…</span>
      <div className="space-y-6">
        <div className="skeleton h-10 w-2/3 max-w-md rounded-xl" />
        <div className="skeleton h-4 w-full max-w-xl rounded-lg" />
        <div className="skeleton h-4 w-4/5 max-w-lg rounded-lg" />
        <div className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton h-40 w-full rounded-card" />
          ))}
        </div>
      </div>
    </div>
  );
}
