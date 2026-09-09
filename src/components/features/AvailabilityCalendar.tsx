'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, TriangleAlert } from 'lucide-react';
import type { AvailabilityDay } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { useMounted } from '@/hooks/useLiveTimestamp';
import { fill } from '@/i18n';
import { getAvailabilityDay, getAvailabilityMonth } from '@/data/availability';
import { buildMonthGrid, formatDate, monthLabel, toISODate } from '@/lib/date';
import { cn } from '@/lib/cn';

const WEEKDAYS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

const STATE_STYLE: Record<AvailabilityDay['state'], string> = {
  free: 'bg-state-openBg text-state-openInk hover:ring-2 hover:ring-glacier-400',
  booked: 'bg-state-closedBg text-state-closedInk/60 cursor-not-allowed',
  option: 'bg-state-warnBg text-state-warnInk',
  'blocked-min-nights': 'bg-night-100 text-night-400 cursor-not-allowed',
};

export interface DateRange {
  arrival: string | null;
  departure: string | null;
}

/**
 * FOGLALTSÁGI NAPTÁR
 * ----------------------------------------------------------------------------
 * Két hónap egymás mellett asztali nézetben, egy hónap mobilon.
 * Az érkezés és a távozás két koppintással választható, a jelmagyarázat
 * mindig látható. Minden állapotot szín ÉS szöveg jelöl.
 */
export function AvailabilityCalendar({
  value, onChange, months = 2,
}: {
  value: DateRange;
  onChange: (next: DateRange) => void;
  months?: number;
}) {
  const { t, locale } = useI18n();
  // A naptár a mai naptól indul, ezért csak a hidratálás után rendereljük ki —
  // különben a szerveren (build időben) és a böngészőben más hónap jelenne meg.
  const mounted = useMounted();
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const todayISO = toISODate(today);

  const shift = (delta: number) => {
    setCursor((prev) => {
      const d = new Date(prev.year, prev.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const canGoBack = new Date(cursor.year, cursor.month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  const pick = (iso: string, day: AvailabilityDay) => {
    if (day.state === 'booked' || iso < todayISO) return;

    if (!value.arrival || (value.arrival && value.departure)) {
      onChange({ arrival: iso, departure: null });
      return;
    }
    if (iso <= value.arrival) {
      onChange({ arrival: iso, departure: null });
      return;
    }
    onChange({ arrival: value.arrival, departure: iso });
  };

  const inRange = (iso: string) =>
    Boolean(value.arrival && value.departure && iso > value.arrival && iso < value.departure);

  const monthsToShow = Array.from({ length: months }, (_, i) => {
    const d = new Date(cursor.year, cursor.month + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const requiredMin = useMemo(() => {
    if (!value.arrival) return null;
    return getAvailabilityDay(value.arrival).minNights;
  }, [value.arrival]);

  if (!mounted) {
    return (
      <div className="overflow-hidden rounded-panel border border-night-100 bg-white shadow-subtle" role="status" aria-live="polite">
        <div className="flex items-center gap-2 border-b border-night-100 px-5 py-4">
          <CalendarDays aria-hidden="true" className="h-5 w-5 text-glacier-600" />
          <span className="font-display text-base font-extrabold text-night-950">{t.availability.calendarTitle}</span>
        </div>
        <div className="grid gap-6 p-4 lg:grid-cols-2 lg:p-5">
          <div className="skeleton h-[320px] rounded-card" />
          <div className="skeleton hidden h-[320px] rounded-card lg:block" />
        </div>
        <span className="sr-only">{t.common.loading}</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-panel border border-night-100 bg-white shadow-subtle">
      <div className="flex items-center justify-between gap-3 border-b border-night-100 px-5 py-4">
        <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-night-950">
          <CalendarDays aria-hidden="true" className="h-5 w-5 text-glacier-600" />
          {t.availability.calendarTitle}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button" onClick={() => shift(-1)} disabled={!canGoBack} aria-label={t.common.previous}
            className="tap-target inline-grid place-items-center rounded-pill px-2 text-night-600 transition-colors hover:bg-frost-100 disabled:opacity-30"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button" onClick={() => shift(1)} aria-label={t.common.next}
            className="tap-target inline-grid place-items-center rounded-pill px-2 text-night-600 transition-colors hover:bg-frost-100"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 p-4 lg:grid-cols-2 lg:p-5">
        {monthsToShow.map((m, monthIndex) => {
          const cells = buildMonthGrid(m.year, m.month);
          const monthData = getAvailabilityMonth(m.year, m.month);

          return (
            <div key={`${m.year}-${m.month}`} className={cn(monthIndex > 0 && 'hidden lg:block')}>
              <p className="mb-3 text-center font-display text-[0.9375rem] font-extrabold capitalize text-night-900">
                {monthLabel(m.year, m.month, locale)}
              </p>
              <div className="grid grid-cols-7 gap-1">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="pb-1.5 text-center text-[0.6875rem] font-bold uppercase text-night-400">{d}</div>
                ))}
                {cells.map((iso, index) => {
                  if (!iso) return <div key={`e-${index}`} aria-hidden="true" />;
                  const day = monthData.find((d) => d.date === iso)!;
                  const isPast = iso < todayISO;
                  const isArrival = value.arrival === iso;
                  const isDeparture = value.departure === iso;
                  const isBetween = inRange(iso);
                  const disabled = isPast || day.state === 'booked';

                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={disabled}
                      onClick={() => pick(iso, day)}
                      aria-label={
                        isPast
                          ? formatDate(iso, locale)
                          : `${formatDate(iso, locale)} — ${day.state === 'free' ? t.availability.free : day.state === 'booked' ? t.availability.booked : t.availability.option}`
                      }
                      aria-pressed={isArrival || isDeparture}
                      className={cn(
                        'flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg text-center transition-all',
                        isPast && 'cursor-not-allowed bg-transparent text-night-200',
                        !isPast && STATE_STYLE[day.state],
                        isBetween && 'bg-frost-300 text-night-900',
                        (isArrival || isDeparture) && 'bg-night-950 text-white ring-2 ring-glacier-400',
                      )}
                    >
                      <span className="text-[0.8125rem] font-bold leading-none">{Number(iso.slice(8, 10))}</span>
                      {!isPast && day.state === 'free' ? (
                        <span className="text-[0.625rem] font-semibold leading-none tabular-nums opacity-80">{day.priceEur} €</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {value.arrival && !value.departure ? (
        <p className="flex items-start gap-2 border-t border-night-100 bg-frost-100 px-5 py-3.5 text-[0.875rem] text-night-700">
          <CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
          <span>
            {t.availability.selectDeparture}
            {requiredMin ? ` — ${fill(t.availability.minNightsWarning, { n: requiredMin })}` : ''}
          </span>
        </p>
      ) : null}

      {value.arrival && value.departure ? (
        <p className="flex items-center gap-2 border-t border-night-100 bg-frost-100 px-5 py-3.5 text-[0.875rem] font-semibold text-night-800">
          <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0 text-glacier-600" />
          {formatDate(value.arrival, locale)} — {formatDate(value.departure, locale)}
        </p>
      ) : null}

      {/* Jelmagyarázat — mindig látható */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-night-100 px-5 py-3.5 text-[0.75rem]">
        <span className="font-bold uppercase tracking-wide text-night-500">{t.availability.legend}</span>
        {[
          { key: 'free', label: t.availability.free },
          { key: 'option', label: t.availability.option },
          { key: 'booked', label: t.availability.booked },
          { key: 'blocked-min-nights', label: t.availability.blocked },
        ].map((item) => (
          <span key={item.key} className="inline-flex items-center gap-1.5 font-medium text-night-600">
            <span aria-hidden="true" className={cn('h-3 w-3 rounded', STATE_STYLE[item.key as AvailabilityDay['state']].split(' ')[0])} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Figyelmeztetés, ha a kiválasztott tartomány nem foglalható. */
export function RangeWarning({ message }: { message: string }) {
  return (
    <p className="flex items-start gap-2 rounded-card border border-state-warn/30 bg-state-warnBg px-4 py-3 text-[0.875rem] text-state-warnInk" role="alert">
      <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}
