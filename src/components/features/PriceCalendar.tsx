'use client';

import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { seasonPeriods } from '@/data/tickets';
import { adultDayPrice, periodForDate } from '@/lib/pricing';
import { buildMonthGrid, formatDate, monthLabel, parseISODate, toISODate } from '@/lib/date';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';

const WEEKDAYS = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

const TIER_STYLE: Record<string, string> = {
  low: 'bg-state-openBg text-state-openInk',
  mid: 'bg-frost-200 text-glacier-700',
  high: 'bg-state-warnBg text-state-warnInk',
  peak: 'bg-state-closedBg text-state-closedInk',
};

/**
 * NAPTÁRAS ÁRNÉZET
 * ----------------------------------------------------------------------------
 * A felhasználó megnézheti, melyik naphoz milyen felnőtt napijegy ár tartozik.
 * Az árszintek a `src/data/tickets.ts` `seasonPeriods` tömbjéből jönnek.
 */
export function PriceCalendar() {
  const { t, L, locale } = useI18n();
  const seasonStart = parseISODate(seasonPeriods[0].from);
  const [cursor, setCursor] = useState({ year: seasonStart.getFullYear(), month: seasonStart.getMonth() });
  const [selected, setSelected] = useState<string | null>(null);

  const cells = buildMonthGrid(cursor.year, cursor.month);
  const firstISO = seasonPeriods[0].from;
  const lastISO = seasonPeriods[seasonPeriods.length - 1].to;

  const shift = (delta: number) => {
    setCursor((prev) => {
      const d = new Date(prev.year, prev.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const canGoBack = toISODate(new Date(cursor.year, cursor.month, 1)) > firstISO;
  const canGoForward = toISODate(new Date(cursor.year, cursor.month + 1, 1)) <= lastISO;

  const selectedPeriod = selected ? periodForDate(selected) : null;

  return (
    <div className="overflow-hidden rounded-panel border border-night-100 bg-white shadow-subtle">
      <div className="flex items-center justify-between gap-3 border-b border-night-100 px-5 py-4">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canGoBack}
          aria-label={t.common.previous}
          className="tap-target inline-grid place-items-center rounded-pill px-2 text-night-600 transition-colors hover:bg-frost-100 disabled:opacity-30"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <p className="font-display text-base font-extrabold capitalize text-night-950">{monthLabel(cursor.year, cursor.month, locale)}</p>
        <button
          type="button"
          onClick={() => shift(1)}
          disabled={!canGoForward}
          aria-label={t.common.next}
          className="tap-target inline-grid place-items-center rounded-pill px-2 text-night-600 transition-colors hover:bg-frost-100 disabled:opacity-30"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((day) => (
            <div key={day} className="pb-2 text-[0.6875rem] font-bold uppercase tracking-wide text-night-400">{day}</div>
          ))}

          {cells.map((iso, index) => {
            if (!iso) return <div key={`empty-${index}`} aria-hidden="true" />;
            const period = periodForDate(iso);
            const inSeason = Boolean(period);
            const price = adultDayPrice(iso);
            const isSelected = selected === iso;

            return (
              <button
                key={iso}
                type="button"
                disabled={!inSeason}
                onClick={() => setSelected(iso)}
                aria-pressed={isSelected}
                className={cn(
                  'flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-lg p-1 text-center transition-all',
                  !inSeason && 'cursor-not-allowed text-night-300',
                  inSeason && !isSelected && TIER_STYLE[period!.tier],
                  inSeason && !isSelected && 'hover:ring-2 hover:ring-glacier-400',
                  isSelected && 'bg-night-950 text-white ring-2 ring-glacier-400',
                )}
              >
                <span className="text-[0.8125rem] font-bold leading-none">{Number(iso.slice(8, 10))}</span>
                {inSeason ? <span className="text-[0.6875rem] font-semibold leading-none tabular-nums">{price} €</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {selected && selectedPeriod ? (
        <div className="animate-fade-in border-t border-night-100 bg-frost-100 px-5 py-4">
          <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-night-600">
            <CalendarDays aria-hidden="true" className="h-4 w-4 text-glacier-600" />
            {formatDate(selected, locale)}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="font-display text-2xl font-extrabold text-night-950">
              {formatPrice(adultDayPrice(selected), locale)}
            </p>
            <p className="text-[0.875rem] text-night-600">{t.tickets.colAdult} · {t.common.perDay}</p>
            <span className={cn('ml-auto rounded-pill px-3 py-1 text-[0.75rem] font-bold', TIER_STYLE[selectedPeriod.tier])}>
              {L(selectedPeriod.label)}
            </span>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-night-100 px-5 py-3.5 text-[0.75rem]">
        {[
          { tier: 'low', label: t.tickets.priceTierLow },
          { tier: 'mid', label: t.tickets.priceTierMid },
          { tier: 'high', label: t.tickets.priceTierHigh },
          { tier: 'peak', label: t.tickets.priceTierPeak },
        ].map((item) => (
          <span key={item.tier} className="inline-flex items-center gap-1.5 font-medium text-night-600">
            <span aria-hidden="true" className={cn('h-3 w-3 rounded', TIER_STYLE[item.tier])} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
