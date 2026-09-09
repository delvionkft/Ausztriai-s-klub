'use client';

import { useMemo, useState } from 'react';
import { Mountain } from 'lucide-react';
import { difficultyLabels } from '@/data/slopes';
import { getSlopes } from '@/services/statusService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { cn } from '@/lib/cn';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/States';
import { SlopeListHeader, SlopeRow } from './SlopeRow';
import type { Slope, SlopeDifficulty } from '@/types';

type Filter = 'all' | 'open' | SlopeDifficulty;

const filters: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'Mind' },
  { id: 'open', label: 'Csak nyitott' },
  { id: 'easy', label: difficultyLabels.easy },
  { id: 'intermediate', label: difficultyLabels.intermediate },
  { id: 'advanced', label: difficultyLabels.advanced },
];

export function SlopeList({ selectable = false }: { selectable?: boolean }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, state, error, reload } = useAsyncData<Slope[]>(getSlopes, []);

  const visible = useMemo(() => {
    if (!data) return [];
    if (filter === 'all') return data;
    if (filter === 'open') return data.filter((slope) => slope.status === 'open');
    return data.filter((slope) => slope.difficulty === filter);
  }, [data, filter]);

  return (
    <div>
      <div className="scroll-x">
        <ul className="flex gap-2 whitespace-nowrap pb-1" role="group" aria-label="Pályák szűrése">
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
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        {state === 'loading' ? (
          <div className="space-y-2" aria-busy="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-[62px] w-full rounded-xl" />
            ))}
          </div>
        ) : state === 'error' ? (
          <ErrorState description={error ?? undefined} onRetry={reload} />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<Mountain aria-hidden="true" className="h-5 w-5" />}
            title="Nincs a szűrőnek megfelelő pálya"
            description="Válassz másik nehézségi szintet, vagy nézd meg az összes pályát."
          />
        ) : (
          <ul className="space-y-2">
            <SlopeListHeader />
            {visible.map((slope) => (
              <SlopeRow
                key={slope.id}
                slope={slope}
                selected={selectable && selectedId === slope.id}
                onSelect={selectable ? (id) => setSelectedId(id === selectedId ? null : id) : undefined}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
