'use client';

import { useState } from 'react';
import {
  Baby,
  Bike,
  Binoculars,
  Footprints,
  Home,
  Mountain,
  PartyPopper,
  Snowflake,
} from 'lucide-react';
import { experiences } from '@/data/experiences';
import { cn } from '@/lib/cn';
import { Card } from '@/components/ui/Card';
import { PendingValue } from '@/components/ui/PendingValue';
import type { Season } from '@/types';

const icons = { Snowflake, Footprints, Home, Baby, Mountain, Bike, Binoculars, PartyPopper } as const;

const filters: Array<{ id: Season | 'all'; label: string }> = [
  { id: 'all', label: 'Mind' },
  { id: 'winter', label: 'Téli' },
  { id: 'summer', label: 'Nyári' },
];

/** ÉLMÉNYKÁRTYÁK — TÉLI ÉS NYÁRI (drótváz 11/03). */
export function ExperienceGrid() {
  const [filter, setFilter] = useState<Season | 'all'>('all');

  const visible =
    filter === 'all' ? experiences : experiences.filter((item) => item.season === filter || item.season === 'all');

  return (
    <div>
      <ul className="flex gap-2" role="group" aria-label="Élmények szűrése szezon szerint">
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

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? Snowflake;
          return (
            <Card as="li" key={item.id} className="flex h-full flex-col p-5">
              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-xl',
                  item.season === 'summer' ? 'bg-glacier-50 text-glacier-600' : 'bg-ice-100 text-deep-700',
                )}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[1.02rem] font-semibold text-deep-900">{item.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-deep-600">{item.description}</p>
              <p className="mt-4 border-t border-deep-100 pt-3 text-xs text-deep-500">
                <PendingValue value={item.detail} hint="Részletes információ megadásra vár" />
              </p>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}
