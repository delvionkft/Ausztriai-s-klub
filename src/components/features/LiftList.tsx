'use client';

import { useMemo, useState } from 'react';
import { CableCar } from 'lucide-react';
import { getLifts } from '@/services/statusService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { cn } from '@/lib/cn';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/States';
import { LiftCard } from './LiftCard';
import type { Lift, OperationalStatus } from '@/types';

/** SZŰRŐ (drótváz 04/02): Mind / Üzemel / Áll / Karbantartás. */
const filters: Array<{ id: 'all' | OperationalStatus; label: string }> = [
  { id: 'all', label: 'Mind' },
  { id: 'open', label: 'Üzemel' },
  { id: 'closed', label: 'Áll' },
  { id: 'maintenance', label: 'Karbantartás' },
];

export function LiftList() {
  const [filter, setFilter] = useState<'all' | OperationalStatus>('all');
  const { data, state, error, reload } = useAsyncData<Lift[]>(getLifts, []);

  const visible = useMemo(() => {
    if (!data) return [];
    return filter === 'all' ? data : data.filter((lift) => lift.status === filter);
  }, [data, filter]);

  const counts = useMemo(() => {
    const source = data ?? [];
    return {
      all: source.length,
      open: source.filter((lift) => lift.status === 'open').length,
      closed: source.filter((lift) => lift.status === 'closed').length,
      maintenance: source.filter((lift) => lift.status === 'maintenance').length,
      preparing: source.filter((lift) => lift.status === 'preparing').length,
    };
  }, [data]);

  return (
    <div>
      <div className="scroll-x">
        <ul className="flex gap-2 whitespace-nowrap pb-1" role="group" aria-label="Felvonók szűrése státusz szerint">
          {filters.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={cn(
                  'min-h-[44px] rounded-pill border px-4 text-sm font-semibold transition-colors',
                  filter === item.id
                    ? 'border-deep-800 bg-deep-800 text-white'
                    : 'border-deep-200 bg-white text-deep-700 hover:bg-deep-50',
                )}
              >
                {item.label}
                <span className={cn('ml-1.5 text-xs', filter === item.id ? 'text-white/70' : 'text-deep-500')}>
                  {counts[item.id]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        {state === 'loading' ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index}>
                <Skeleton className="h-[212px] w-full rounded-card" />
              </li>
            ))}
          </ul>
        ) : state === 'error' ? (
          <ErrorState description={error ?? undefined} onRetry={reload} />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<CableCar aria-hidden="true" className="h-5 w-5" />}
            title="Ebben az állapotban most nincs felvonó"
            description="Válts másik szűrőre, vagy nézd meg az összes felvonót."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((lift) => (
              <LiftCard key={lift.id} lift={lift} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
