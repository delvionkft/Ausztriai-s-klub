/**
 * JSON-LD beillesztő.
 * Szerverkomponens — a strukturált adat már a HTML-forrásban benne van,
 * így a keresők JavaScript futtatása nélkül is látják.
 *
 * MIGRÁCIÓ (Emergent): SPA alatt ugyanez a komponens `react-helmet`
 * `<script>` gyerekeként használható, változtatás nélküli adattal.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> | null }) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : [data];
  if (payload.length === 0) return null;

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // A tartalom saját adatfájlokból jön, nem felhasználói bemenetből.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
