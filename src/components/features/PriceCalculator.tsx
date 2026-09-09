'use client';

import { useMemo, useState } from 'react';
import { Minus, Plus, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { bookingTerms } from '@/data/accommodation';
import { pricingRules } from '@/data/availability';
import { routes } from '@/data/navigation';
import { buildAccommodationQuote } from '@/lib/pricing';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/cn';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { PendingValue } from '@/components/ui/PendingValue';
import { PrimaryButton } from '@/components/ui/Button';
import type { DateRange } from './AvailabilityCalendar';

/**
 * ÁRÖSSZESÍTŐ — MINDEN TÉTEL LÁTHATÓ (drótváz 09/04)
 * A kaució külön, a teljes összegtől elkülönítve jelenik meg.
 * DEMÓ: az összegek a `src/data/availability.ts` demó árazásából számolódnak.
 */
export function PriceCalculator({ range }: { range: DateRange }) {
  const [guests, setGuests] = useState(8);

  const quote = useMemo(() => {
    if (!range.arrival || !range.departure) return null;
    return buildAccommodationQuote(range.arrival, range.departure, guests);
  }, [range.arrival, range.departure, guests]);

  const currency = pricingRules.currency;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-deep-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-h3">Árösszesítő</h3>
            <p className="mt-1 text-sm text-deep-600">
              {range.arrival && range.departure
                ? `${range.arrival} → ${range.departure}`
                : 'Válassz időpontot a naptárban.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-deep-700">Létszám</span>
            <div className="inline-flex items-center rounded-pill border border-deep-200">
              <button
                type="button"
                onClick={() => setGuests((value) => Math.max(1, value - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-l-pill text-deep-700 transition-colors hover:bg-deep-50"
              >
                <Minus aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">Létszám csökkentése</span>
              </button>
              <span aria-live="polite" className="w-12 text-center text-[0.98rem] font-bold text-deep-900">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests((value) => value + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-r-pill text-deep-700 transition-colors hover:bg-deep-50"
              >
                <Plus aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">Létszám növelése</span>
              </button>
            </div>
          </div>
        </div>

        {quote ? (
          <>
            <dl className="divide-y divide-deep-100">
              {quote.lines.map((line) => (
                <div key={line.id} className="flex items-baseline justify-between gap-4 py-3">
                  <div>
                    <dt className="font-medium text-deep-900">{line.label}</dt>
                    {line.detail ? <p className="mt-0.5 text-xs text-deep-500">{line.detail}</p> : null}
                  </div>
                  <dd className="shrink-0 font-semibold tabular-nums text-deep-900">
                    {line.amount === null ? (
                      <PendingValue value={null} hint="Díjtétel megadása szükséges" />
                    ) : (
                      formatCurrency(line.amount, currency)
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-2 flex items-baseline justify-between gap-4 rounded-xl bg-deep-50 px-4 py-4">
              <dt className="text-[0.95rem] font-bold uppercase tracking-wide text-deep-800">Teljes összeg</dt>
              <dd className="text-xl font-bold tabular-nums text-deep-900">
                {quote.total === null ? (
                  <PendingValue value={null} hint="Az összeg a hiányzó díjtételek megadása után számolható" />
                ) : (
                  formatCurrency(quote.total, currency)
                )}
              </dd>
            </div>

            {/* Kaució — külön kezelve, nem része a teljes összegnek. */}
            <div className="mt-3 flex items-start justify-between gap-4 rounded-xl border border-dashed border-deep-200 px-4 py-3">
              <div className="flex items-start gap-2">
                <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
                <div>
                  <p className="text-sm font-semibold text-deep-900">Kaució (visszatérítendő)</p>
                  <p className="mt-0.5 text-xs text-deep-500">
                    Nem része a teljes összegnek. Sértetlen átadás után visszajár.
                  </p>
                </div>
              </div>
              <span className="shrink-0 font-semibold tabular-nums text-deep-900">
                {quote.deposit === null ? (
                  <PendingValue value={null} hint="Kaució összegének megadása szükséges" />
                ) : (
                  formatCurrency(quote.deposit, currency)
                )}
              </span>
            </div>

            <DemoNotice className="mt-4" message="Az összegek demó árazás alapján készültek. A végleges ajánlatot személyre szabottan küldjük." />

            <PrimaryButton
              href={`${routes.quote}?arrival=${range.arrival}&departure=${range.departure}&guests=${guests}`}
              size="lg"
              fullWidth
              className="mt-4"
            >
              Ajánlatot kérek erre az időpontra
            </PrimaryButton>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-deep-200 px-4 py-12 text-center">
            <p className="font-semibold text-deep-800">Még nincs kiválasztott időpont</p>
            <p className="max-w-sm text-sm text-deep-600">
              Jelöld ki az érkezés és a távozás napját a naptárban, és azonnal megjelenik a teljes árösszesítő.
            </p>
          </div>
        )}
      </div>

      {/* FELTÉTELEK (drótváz 09/04 jobb oszlop) */}
      <aside className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
        <h3 className="text-h3">Feltételek</h3>
        <dl className="mt-4 space-y-4">
          {bookingTerms.map((term) => (
            <div key={term.id} className={cn('border-b border-deep-100 pb-4 last:border-0 last:pb-0')}>
              <dt className="text-xs font-bold uppercase tracking-[0.08em] text-deep-500">{term.label}</dt>
              <dd className="mt-1 text-sm text-deep-800">
                {term.id === 'min-stay' && pricingRules.minStayNights ? (
                  `${pricingRules.minStayNights} éjszaka`
                ) : (
                  <PendingValue value={term.value} hint="Feltétel megadása szükséges" />
                )}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={`${routes.info}#dokumentumok`}
          className="mt-5 inline-block text-sm font-semibold text-glacier-700 link-underline"
        >
          Házirend és jogi dokumentumok
        </Link>
      </aside>
    </div>
  );
}
