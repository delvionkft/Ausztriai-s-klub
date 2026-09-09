'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { seasonalPriceBands, ticketProducts, currency } from '@/data/tickets';
import { ticketSeasonMultiplier } from '@/lib/pricing';
import { HU_WEEKDAYS_SHORT, daysInMonth, monthLabel, shiftMonth, weekdayIndex } from '@/lib/date';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/cn';
import { DemoNotice } from '@/components/ui/DemoNotice';

/**
 * SZEZONÁLIS / DINAMIKUS ÁRAZÁS — NAPTÁRAS ÁRNÉZET (drótváz 05/04)
 * A sávok és szorzók a `src/data/tickets.ts` fájlból jönnek.
 */
const bandStyles: Record<string, string> = {
  low: 'bg-status-openBg text-status-open border-status-open/20',
  mid: 'bg-ice-100 text-deep-800 border-ice-300',
  high: 'bg-status-warnBg text-status-warn border-status-warn/25',
};

const FIRST_MONTH = '2025-12';
const LAST_MONTH = '2026-04';

export function SeasonalPriceCalendar() {
  const [month, setMonth] = useState('2026-01');
  const dayTicket = ticketProducts.find((product) => product.id === 'day')!;
  const basePrice = dayTicket.priceByAgeGroup.adult;

  const canBack = month > FIRST_MONTH;
  const canForward = month < LAST_MONTH;

  return (
    <div className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => canBack && setMonth(shiftMonth(month, -1))}
          disabled={!canBack}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-deep-200 text-deep-700 transition-colors hover:bg-deep-50 disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Előző hónap</span>
        </button>
        <p aria-live="polite" className="font-semibold text-deep-900">
          {monthLabel(month)}
        </p>
        <button
          type="button"
          onClick={() => canForward && setMonth(shiftMonth(month, 1))}
          disabled={!canForward}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-deep-200 text-deep-700 transition-colors hover:bg-deep-50 disabled:opacity-40"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Következő hónap</span>
        </button>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-7 gap-1 pb-1">
          {HU_WEEKDAYS_SHORT.map((day) => (
            <div key={day} className="py-1 text-center text-[0.68rem] font-bold uppercase text-deep-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: weekdayIndex(`${month}-01`) }).map((_, index) => (
            <div key={`pad-${index}`} aria-hidden="true" />
          ))}
          {daysInMonth(month).map((iso) => {
            const band = ticketSeasonMultiplier(iso);
            const price = basePrice === null ? null : Math.round(basePrice * band.multiplier);
            const dayNumber = Number(iso.slice(8));

            return (
              <div
                key={iso}
                title={`${iso} — ${band.label}`}
                className={cn(
                  'flex min-h-[54px] flex-col items-center justify-center rounded-lg border px-1 py-1',
                  bandStyles[band.bandId] ?? bandStyles.mid,
                )}
              >
                <span className="text-[0.8rem] font-semibold leading-none">{dayNumber}</span>
                <span className="mt-1 text-[0.62rem] font-bold leading-none tabular-nums sm:text-[0.68rem]">
                  {price === null ? '—' : formatCurrency(price, currency)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-deep-100 pt-4">
        {seasonalPriceBands.map((band) => (
          <li key={band.id} className="flex items-center gap-2 text-xs text-deep-600">
            <span aria-hidden="true" className={cn('h-3 w-3 rounded border', bandStyles[band.colorToken])} />
            {band.label} · ×{band.multiplier}
          </li>
        ))}
      </ul>

      <DemoNotice className="mt-4" message="Naptáras árnézet felnőtt napijegyre, demó árakkal. A szezonsávokat a src/data/tickets.ts fájlban lehet módosítani." />
    </div>
  );
}
