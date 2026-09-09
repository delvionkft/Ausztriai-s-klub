'use client';

import { useState } from 'react';
import { BedDouble, Check, Layers3 } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { floorPlans, rooms } from '@/data/accommodation';
import { cn } from '@/lib/cn';
import { Media } from '@/components/ui/Media';

/**
 * ALAPRAJZ ÉS ÁGYELRENDEZÉS
 * ----------------------------------------------------------------------------
 * Szintválasztó, szintenkénti helyiséglista és a szinthez tartozó szobák
 * ágyszámmal. Az adatok a `src/data/accommodation.ts`-ből jönnek.
 */
export function FloorPlanPanel() {
  const { t, L } = useI18n();
  const [active, setActive] = useState(floorPlans[0].id);
  const plan = floorPlans.find((f) => f.id === active)!;
  const floorRooms = rooms.filter((r) => r.floor === active);

  return (
    <div className="overflow-hidden rounded-panel border border-night-100 bg-white shadow-subtle">
      <div className="flex gap-1 border-b border-night-100 bg-frost-100 p-2" role="tablist" aria-label={t.stay.floorplanTitle}>
        {floorPlans.map((floor) => (
          <button
            key={floor.id}
            type="button"
            role="tab"
            aria-selected={active === floor.id}
            onClick={() => setActive(floor.id)}
            className={cn(
              'tap-target flex-1 rounded-card px-3 text-sm font-bold transition-all',
              active === floor.id ? 'bg-night-950 text-white shadow-subtle' : 'text-night-600 hover:bg-white hover:text-night-950',
            )}
          >
            {L(floor.label)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-glacier-600">
            <Layers3 aria-hidden="true" className="h-4 w-4" />
            {L(plan.label)} · {plan.beds} {t.stay.beds}
          </div>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-night-700">{L(plan.summary)}</p>

          <ul className="mt-5 space-y-2">
            {plan.rooms.map((room, index) => (
              <li key={index} className="flex items-start gap-2 text-[0.9375rem] text-night-700">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-500" />
                {L(room)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          {floorRooms.length > 0 ? (
            <ul className="space-y-3">
              {floorRooms.map((room) => (
                <li key={room.id} className="flex gap-4 rounded-card border border-night-100 p-3">
                  <Media
                    mediaKey={room.imageKey}
                    className="h-20 w-24 shrink-0 rounded-lg"
                    sizes="120px"
                    alt={L(room.name)}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-night-950">{L(room.name)}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-night-600">
                      <span className="inline-flex items-center gap-1">
                        <BedDouble aria-hidden="true" className="h-3.5 w-3.5 text-night-400" />
                        {room.sleeps} {t.common.person}
                      </span>
                      <span>{room.sizeSqm} m²</span>
                      {room.ensuite ? <span className="text-glacier-600">{t.stay.ensuite}</span> : null}
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-night-500">
                      {room.beds.map((bed) => `${bed.count} × ${L(bed.type)}`).join(' · ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
