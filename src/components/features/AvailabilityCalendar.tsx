'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { availabilityLegend, availabilitySeason, pricingRules } from '@/data/availability';
import { buildAvailabilityMap, getAvailabilityState, validateRange } from '@/lib/availability';
import { HU_WEEKDAYS_SHORT, daysInMonth, monthLabel, nightsBetween, shiftMonth, weekdayIndex } from '@/lib/date';
import { cn } from '@/lib/cn';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import type { AvailabilityState } from '@/types';

/**
 * FOGLALTSÁGI NAPTÁR (drótváz 09/02–03)
 * Kliensoldali demó: az állapotok a `src/data/availability.ts`-ből számolódnak.
 * INTEGRÁCIÓ: `src/services/bookingService.ts` → `getAvailability()`.
 */

/**
 * FONTOS: ezek EGYMÁST KIZÁRÓ osztálysorok. Sosem fűzünk hozzájuk további
 * szín-/háttérosztályt, mert a Tailwind kimenetének sorrendje dönti el, melyik
 * nyer — a kiválasztott nap ettől láthatatlanná válhatna. A kiválasztás és a
 * tartomány saját, teljes osztálysort kap (lásd `cellClass`).
 */
const stateStyles: Record<AvailabilityState, string> = {
  free: 'bg-white text-deep-900 border-deep-200 hover:border-glacier-400 hover:bg-glacier-50',
  booked: 'bg-status-closedBg text-status-closed border-status-closed/25 cursor-not-allowed',
  option: 'bg-status-warnBg text-status-warn border-status-warn/25 cursor-not-allowed',
  'min-stay-blocked': 'bg-status-neutralBg text-status-neutral border-deep-200 cursor-not-allowed',
};

const SELECTED_EDGE_STYLE = 'border-deep-800 bg-deep-800 font-bold text-white hover:bg-deep-800';
const IN_RANGE_STYLE = 'border-glacier-300 bg-glacier-100 text-glacier-800 hover:bg-glacier-100';

/** Egyetlen, ütközésmentes osztálysort ad vissza a naptárcellának. */
function cellClass(state: AvailabilityState, isEdge: boolean, inRange: boolean): string {
  if (isEdge) return SELECTED_EDGE_STYLE;
  if (inRange) return IN_RANGE_STYLE;
  return stateStyles[state];
}

const legendDot: Record<string, string> = {
  free: 'bg-white border border-deep-300',
  booked: 'bg-status-closed',
  option: 'bg-status-warn',
  'min-stay-blocked': 'bg-status-neutral',
};

export interface DateRange {
  arrival: string | null;
  departure: string | null;
}

interface AvailabilityCalendarProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  /** Hány hónapot mutasson egyszerre nagy képernyőn. */
  months?: 1 | 2;
}

export function AvailabilityCalendar({ value, onChange, months = 2 }: AvailabilityCalendarProps) {
  const availabilityMap = useMemo(() => buildAvailabilityMap(), []);
  const [visibleMonth, setVisibleMonth] = useState<string>(availabilitySeason.defaultMonth);
  const [internal, setInternal] = useState<DateRange>({ arrival: null, departure: null });

  const range = value ?? internal;
  const setRange = (next: DateRange) => {
    if (!value) setInternal(next);
    onChange?.(next);
  };

  const seasonFirstMonth = availabilitySeason.from.slice(0, 7);
  const seasonLastMonth = availabilitySeason.to.slice(0, 7);
  const canGoBack = visibleMonth > seasonFirstMonth;
  const canGoForward = shiftMonth(visibleMonth, months) <= seasonLastMonth;

  const validation =
    range.arrival && range.departure ? validateRange(availabilityMap, range.arrival, range.departure) : null;

  function handleDayClick(iso: string) {
    const state = getAvailabilityState(availabilityMap, iso);
    if (state !== 'free') return;

    // Első kattintás vagy újraindítás → érkezés.
    if (!range.arrival || range.departure || iso <= range.arrival) {
      setRange({ arrival: iso, departure: null });
      return;
    }
    setRange({ arrival: range.arrival, departure: iso });

    // MÉRÉS 6: dátum kiválasztása (csak a teljes időszak számít konverziós lépésnek)
    trackEvent(ANALYTICS_EVENTS.selectDates, {
      arrival: range.arrival,
      departure: iso,
      nights: nightsBetween(range.arrival, iso),
    });
  }

  const monthsToRender = Array.from({ length: months }, (_, index) => shiftMonth(visibleMonth, index)).filter(
    (month) => month <= seasonLastMonth,
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => canGoBack && setVisibleMonth(shiftMonth(visibleMonth, -1))}
          disabled={!canGoBack}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-deep-200 text-deep-700 transition-colors hover:bg-deep-50 disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Előző hónap</span>
        </button>

        <p aria-live="polite" className="text-center text-[0.95rem] font-semibold text-deep-900">
          {monthsToRender.map((month) => monthLabel(month)).join(' – ')}
        </p>

        <button
          type="button"
          onClick={() => canGoForward && setVisibleMonth(shiftMonth(visibleMonth, 1))}
          disabled={!canGoForward}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-deep-200 text-deep-700 transition-colors hover:bg-deep-50 disabled:opacity-40"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Következő hónap</span>
        </button>
      </div>

      <div className={cn('mt-5 grid gap-6', months === 2 && 'lg:grid-cols-2')}>
        {monthsToRender.map((month, monthIndex) => (
          <div key={month} className={cn(monthIndex > 0 && 'hidden lg:block')}>
            <p className="mb-2 text-sm font-semibold text-deep-700">{monthLabel(month)}</p>
            <div role="grid" aria-label={`${monthLabel(month)} foglaltsági naptár`}>
              <div role="row" className="grid grid-cols-7 gap-1 pb-1">
                {HU_WEEKDAYS_SHORT.map((day) => (
                  <div
                    key={day}
                    role="columnheader"
                    className="py-1 text-center text-[0.68rem] font-bold uppercase text-deep-500"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: weekdayIndex(`${month}-01`) }).map((_, index) => (
                  <div key={`pad-${index}`} aria-hidden="true" />
                ))}
                {daysInMonth(month).map((iso) => {
                  const state = getAvailabilityState(availabilityMap, iso);
                  const dayNumber = Number(iso.slice(8));

                  if (state === 'out-of-season') {
                    return (
                      <div
                        key={iso}
                        className="flex min-h-[42px] items-center justify-center rounded-lg border border-transparent text-sm text-deep-200"
                      >
                        {dayNumber}
                      </div>
                    );
                  }

                  const isArrival = range.arrival === iso;
                  const isDeparture = range.departure === iso;
                  const inRange =
                    range.arrival && range.departure && iso > range.arrival && iso < range.departure;

                  return (
                    <button
                      key={iso}
                      type="button"
                      role="gridcell"
                      onClick={() => handleDayClick(iso)}
                      disabled={state !== 'free'}
                      aria-label={`${iso} — ${availabilityLegend.find((l) => l.state === state)?.label ?? ''}`}
                      aria-selected={isArrival || isDeparture || Boolean(inRange)}
                      className={cn(
                        'flex min-h-[42px] items-center justify-center rounded-lg border text-sm font-medium transition-colors',
                        cellClass(state, isArrival || isDeparture, Boolean(inRange)),
                      )}
                    >
                      {dayNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jelmagyarázat (drótváz 09/03) */}
      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-deep-100 pt-4">
        {availabilityLegend.map((item) => (
          <li key={item.state} className="flex items-center gap-2 text-xs text-deep-600">
            <span aria-hidden="true" className={cn('h-3 w-3 rounded', legendDot[item.state])} />
            {item.label}
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-4">
        {!range.arrival ? (
          <p className="text-sm text-deep-600">
            Válaszd ki az érkezés napját, majd a távozásét. Minimum {pricingRules.minStayNights} éjszaka.
          </p>
        ) : !range.departure ? (
          <p className="text-sm text-deep-600">
            Érkezés kiválasztva: <strong className="text-deep-900">{range.arrival}</strong>. Most válaszd ki a távozás napját.
          </p>
        ) : validation?.ok ? (
          <p className="rounded-lg bg-status-openBg px-3 py-2 text-sm font-medium text-status-open">
            {range.arrival} → {range.departure} · {validation.nights} éjszaka
          </p>
        ) : (
          <p role="alert" className="rounded-lg bg-status-closedBg px-3 py-2 text-sm font-medium text-status-closed">
            {validation?.error}
          </p>
        )}
      </div>
    </div>
  );
}
