'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, CableCar, Clock, Moon, Users } from 'lucide-react';
import type { Lift, LiftStatus } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { lifts } from '@/data/lifts';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/cn';
import { Media } from '@/components/ui/Media';
import { StatusBadge, type BadgeTone } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/States';
import { Reveal } from '@/components/ui/Reveal';

export function liftTone(status: LiftStatus): BadgeTone {
  if (status === 'running') return 'open';
  if (status === 'maintenance') return 'warn';
  if (status === 'stopped') return 'warn';
  return 'closed';
}

export function useLiftStatusLabel() {
  const { t } = useI18n();
  return (status: LiftStatus) =>
    status === 'running' ? t.status.running
      : status === 'stopped' ? t.status.stopped
        : status === 'maintenance' ? t.status.maintenance
          : t.status.closed;
}

/** Egy felvonó kártyája — kép, típus, üzemidő, állapot. */
export function LiftCard({ lift }: { lift: Lift }) {
  const { t, L } = useI18n();
  const label = useLiftStatusLabel();

  return (
    <article className="group overflow-hidden rounded-card border border-night-100 bg-white shadow-subtle transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift">
      <Media
        mediaKey={lift.imageKey}
        className="aspect-[16/9]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
      />
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-[1.0625rem] font-extrabold text-night-950">{lift.name}</h3>
          <StatusBadge size="sm" tone={liftTone(lift.status)} label={label(lift.status)} icon={lift.status === 'maintenance' ? 'wrench' : undefined} />
        </div>

        <p className="mt-1 text-[0.8125rem] font-semibold uppercase tracking-wide text-glacier-600">
          {t.liftType[lift.type]}
        </p>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-night-600">{L(lift.note)}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-night-100 pt-4 text-[0.8125rem]">
          <div className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-night-400" />
            <dt className="sr-only">{t.snow.tableHours}</dt>
            <dd className="font-semibold text-night-800">{lift.operatingHours}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-night-400" />
            <dt className="sr-only">{t.map.altitude}</dt>
            <dd className="font-semibold text-night-800">{formatNumber(lift.baseAltitudeM)} – {formatNumber(lift.topAltitudeM)} m</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Users aria-hidden="true" className="h-4 w-4 shrink-0 text-night-400" />
            <dt className="sr-only">{t.map.capacity}</dt>
            <dd className="font-semibold text-night-800">{formatNumber(lift.capacityPerHour)} fő/óra</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <CableCar aria-hidden="true" className="h-4 w-4 shrink-0 text-night-400" />
            <dt className="sr-only">{t.map.rideTime}</dt>
            <dd className="font-semibold text-night-800">{lift.rideTimeMin} perc</dd>
          </div>
          {lift.nightOperation ? (
            <div className="col-span-2 flex items-center gap-1.5">
              <Moon aria-hidden="true" className="h-4 w-4 shrink-0 text-glacier-500" />
              <dt className="sr-only">{t.status.nightSkiing}</dt>
              <dd className="font-semibold text-glacier-700">{lift.nightOperation}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </article>
  );
}

type Filter = 'all' | 'running' | 'stopped' | 'maintenance';

/** Szűrhető felvonólista. */
export function LiftGrid() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');

  const filters: Array<{ id: Filter; label: string; count: number }> = useMemo(() => [
    { id: 'all', label: t.lifts.filterAll, count: lifts.length },
    { id: 'running', label: t.lifts.filterRunning, count: lifts.filter((l) => l.status === 'running').length },
    { id: 'stopped', label: t.lifts.filterStopped, count: lifts.filter((l) => l.status === 'stopped').length },
    { id: 'maintenance', label: t.lifts.filterMaintenance, count: lifts.filter((l) => l.status === 'maintenance').length },
  ], [t]);

  const visible = filter === 'all' ? lifts : lifts.filter((l) => l.status === filter);

  return (
    <div>
      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t.common.filter}>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className={cn(
              'tap-target inline-flex shrink-0 items-center gap-2 rounded-pill px-4 text-sm font-semibold transition-all',
              filter === item.id
                ? 'bg-night-950 text-white shadow-subtle'
                : 'border border-night-200 bg-white text-night-700 hover:border-glacier-400 hover:bg-frost-100',
            )}
          >
            {item.label}
            <span className={cn('rounded-pill px-1.5 py-0.5 text-[0.6875rem] font-bold', filter === item.id ? 'bg-white/20' : 'bg-night-100 text-night-600')}>
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState title={t.lifts.emptyTitle} text={t.lifts.emptyText} />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((lift, index) => (
            <Reveal key={lift.id} as="li" delay={index * 60}>
              <LiftCard lift={lift} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Kompakt felvonólista a hójelentés oldalra — mobilon kártyanézet. */
export function LiftStatusList() {
  const { t } = useI18n();
  const label = useLiftStatusLabel();

  return (
    <div>
      <h2 className="mb-4 font-display text-lg font-extrabold text-white">{t.snow.liftsTitle}</h2>
      <ul className="overflow-hidden rounded-card border border-white/12">
        {lifts.map((lift) => (
          <li key={lift.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 bg-white/[0.04] px-5 py-4 last:border-b-0">
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{lift.name}</p>
              <p className="mt-0.5 text-[0.8125rem] text-frost-300/70">
                {t.liftType[lift.type]} · {lift.operatingHours}
              </p>
            </div>
            <StatusBadge
              invert size="sm"
              tone={liftTone(lift.status)}
              label={label(lift.status)}
              icon={lift.status === 'maintenance' ? 'wrench' : undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
