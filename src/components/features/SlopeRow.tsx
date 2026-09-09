import { difficultyColors, difficultyLabels } from '@/data/slopes';
import { formatLength, formatNumber } from '@/lib/format';
import { cn } from '@/lib/cn';
import { PendingValue } from '@/components/ui/PendingValue';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Slope } from '@/types';

/**
 * Egy pálya sora.
 * Asztali nézetben táblázatsor, mobilon kártya — nincs vízszintes görgetés.
 */
export function SlopeRow({ slope, onSelect, selected }: { slope: Slope; onSelect?: (id: string) => void; selected?: boolean }) {
  const colors = difficultyColors[slope.difficulty];

  const inner = (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span aria-hidden="true" className={cn('h-2.5 w-2.5 shrink-0 rounded-full', colors.dot)} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-deep-900">{slope.name}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-deep-500 sm:hidden">
            <span className={cn('rounded px-1.5 py-0.5 font-semibold', colors.bg, colors.text)}>
              {difficultyLabels[slope.difficulty]}
            </span>
            <span>
              Hossz:{' '}
              {slope.lengthM === null ? (
                <PendingValue value={null} hint="Pályahossz megadása szükséges" />
              ) : (
                formatLength(slope.lengthM)
              )}
            </span>
          </p>
        </div>
      </div>

      <span
        className={cn(
          'hidden shrink-0 rounded px-2 py-1 text-xs font-semibold sm:inline-block',
          colors.bg,
          colors.text,
        )}
      >
        {difficultyLabels[slope.difficulty]}
      </span>

      <span className="hidden w-24 shrink-0 text-sm text-deep-700 sm:inline-block">
        {slope.lengthM === null ? (
          <PendingValue value={null} hint="Pályahossz megadása szükséges" />
        ) : (
          formatLength(slope.lengthM)
        )}
      </span>

      <span className="hidden w-24 shrink-0 text-sm text-deep-700 md:inline-block">
        {slope.verticalM === null ? (
          <PendingValue value={null} hint="Szintkülönbség megadása szükséges" />
        ) : (
          formatNumber(slope.verticalM, ' m')
        )}
      </span>

      <span className="shrink-0">
        <StatusBadge status={slope.status} />
      </span>
    </>
  );

  const className = cn(
    'flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors sm:px-4',
    selected ? 'border-glacier-400 bg-glacier-50' : 'border-deep-100 bg-white hover:bg-deep-50/60',
  );

  if (onSelect) {
    return (
      <li>
        <button type="button" onClick={() => onSelect(slope.id)} aria-pressed={selected} className={className}>
          {inner}
        </button>
      </li>
    );
  }

  return <li className={className}>{inner}</li>;
}

/** Fejlécsor a pályalistához (asztali nézet). */
export function SlopeListHeader() {
  return (
    <li
      aria-hidden="true"
      className="hidden items-center gap-3 px-4 pb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-deep-500 sm:flex"
    >
      <span className="flex-1">Pálya</span>
      <span className="w-[88px] shrink-0">Nehézség</span>
      <span className="w-24 shrink-0">Hossz</span>
      <span className="hidden w-24 shrink-0 md:inline-block">Szintkül.</span>
      <span className="w-[92px] shrink-0">Státusz</span>
    </li>
  );
}
