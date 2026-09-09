'use client';

import { Lightbulb, Snowflake } from 'lucide-react';
import type { Slope, SlopeDifficulty, SlopeStatus } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { slopes } from '@/data/slopes';
import { formatLength } from '@/lib/format';
import { cn } from '@/lib/cn';
import { StatusBadge, type BadgeTone } from '@/components/ui/StatusBadge';

export function useDifficultyLabel() {
  const { t } = useI18n();
  return (d: SlopeDifficulty, short = false) => {
    if (short) {
      return d === 'blue' ? t.difficulty.blueShort : d === 'red' ? t.difficulty.redShort : d === 'black' ? t.difficulty.blackShort : t.difficulty.skirouteShort;
    }
    return d === 'blue' ? t.difficulty.blue : d === 'red' ? t.difficulty.red : d === 'black' ? t.difficulty.black : t.difficulty.skiroute;
  };
}

export function slopeTone(status: SlopeStatus): BadgeTone {
  if (status === 'groomed') return 'open';
  if (status === 'open') return 'open';
  if (status === 'preparing') return 'warn';
  return 'closed';
}

export function useSlopeStatusLabel() {
  const { t } = useI18n();
  return (s: SlopeStatus) =>
    s === 'groomed' ? t.status.groomed : s === 'open' ? t.status.open : s === 'preparing' ? t.status.preparing : t.status.closed;
}

export const DIFFICULTY_DOT: Record<SlopeDifficulty, string> = {
  blue: 'bg-piste-blue',
  red: 'bg-piste-red',
  black: 'bg-piste-black',
  skiroute: 'bg-piste-skiroute',
};

/**
 * PÁLYALISTA
 * ----------------------------------------------------------------------------
 * Asztali nézetben táblázat, mobilon kártyanézet — vízszintes görgetés nélkül.
 */
export function SlopeList({ invert = false, items = slopes }: { invert?: boolean; items?: Slope[] }) {
  const { t, L, locale } = useI18n();
  const difficultyLabel = useDifficultyLabel();
  const statusLabel = useSlopeStatusLabel();

  return (
    <div>
      <h2 className={cn('mb-4 font-display text-lg font-extrabold', invert ? 'text-white' : 'text-night-950')}>
        {t.snow.slopesTitle}
      </h2>

      {/* Mobil: kártyák */}
      <ul className="space-y-3 lg:hidden">
        {items.map((slope) => (
          <li
            key={slope.id}
            className={cn('rounded-card border p-4', invert ? 'border-white/12 bg-white/[0.05]' : 'border-night-100 bg-white shadow-subtle')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span aria-hidden="true" className={cn('mt-1.5 h-3 w-3 shrink-0 rounded-full', DIFFICULTY_DOT[slope.difficulty])} />
                <div>
                  <p className={cn('font-semibold', invert ? 'text-white' : 'text-night-950')}>
                    <span className="mr-1.5 opacity-60">{slope.number}.</span>{slope.name}
                  </p>
                  <p className={cn('mt-0.5 text-[0.8125rem]', invert ? 'text-frost-300/70' : 'text-night-500')}>
                    {difficultyLabel(slope.difficulty)} · {formatLength(slope.lengthM, locale)}
                  </p>
                </div>
              </div>
              <StatusBadge invert={invert} size="sm" tone={slopeTone(slope.status)} label={statusLabel(slope.status)} />
            </div>
            <p className={cn('mt-3 text-[0.875rem] leading-snug', invert ? 'text-frost-300/80' : 'text-night-600')}>
              {L(slope.description)}
            </p>
          </li>
        ))}
      </ul>

      {/* Asztali: táblázat */}
      <div className={cn('hidden overflow-hidden rounded-card border lg:block', invert ? 'border-white/12' : 'border-night-100')}>
        <table className="w-full text-left text-[0.9375rem]">
          <thead>
            <tr className={cn('text-[0.75rem] uppercase tracking-wider', invert ? 'bg-white/[0.06] text-frost-300/70' : 'bg-frost-100 text-night-500')}>
              <th scope="col" className="px-5 py-3 font-bold">{t.snow.tableSlope}</th>
              <th scope="col" className="px-5 py-3 font-bold">{t.difficulty.label}</th>
              <th scope="col" className="px-5 py-3 font-bold">{t.snow.tableLength}</th>
              <th scope="col" className="px-5 py-3 font-bold">{t.map.verticalDrop}</th>
              <th scope="col" className="px-5 py-3 font-bold">{t.snow.tableStatus}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((slope) => (
              <tr key={slope.id} className={cn('border-t', invert ? 'border-white/10 bg-white/[0.03]' : 'border-night-100 bg-white')}>
                <th scope="row" className={cn('px-5 py-3.5 font-semibold', invert ? 'text-white' : 'text-night-950')}>
                  <span className="mr-2 opacity-55">{slope.number}.</span>{slope.name}
                  <span className="ml-2 inline-flex gap-1 align-middle">
                    {slope.snowmaking ? <Snowflake aria-label="Hóágyúzott" className="h-3.5 w-3.5 text-glacier-400" /> : null}
                    {slope.floodlit ? <Lightbulb aria-label="Kivilágított" className="h-3.5 w-3.5 text-state-warn" /> : null}
                  </span>
                </th>
                <td className={cn('px-5 py-3.5', invert ? 'text-frost-200' : 'text-night-700')}>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', DIFFICULTY_DOT[slope.difficulty])} />
                    {difficultyLabel(slope.difficulty, true)}
                  </span>
                </td>
                <td className={cn('px-5 py-3.5 tabular-nums', invert ? 'text-frost-200' : 'text-night-700')}>{formatLength(slope.lengthM, locale)}</td>
                <td className={cn('px-5 py-3.5 tabular-nums', invert ? 'text-frost-200' : 'text-night-700')}>{slope.verticalM} m</td>
                <td className="px-5 py-3.5">
                  <StatusBadge invert={invert} size="sm" tone={slopeTone(slope.status)} label={statusLabel(slope.status)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
