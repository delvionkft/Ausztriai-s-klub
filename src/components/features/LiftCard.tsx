import { CableCar, Clock, MoveUp, Users } from 'lucide-react';
import { liftTypeLabels } from '@/data/lifts';
import { formatLength, formatNumber } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import { PendingValue } from '@/components/ui/PendingValue';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Lift } from '@/types';

/** Egy felvonó kártyanézete (drótváz 04/03). */
export function LiftCard({ lift }: { lift: Lift }) {
  return (
    <Card as="li" className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-glacier-600">
            <CableCar aria-hidden="true" className="h-3.5 w-3.5" />
            {liftTypeLabels[lift.type]}
          </span>
          <h3 className="mt-1.5 text-[1.05rem] font-semibold text-deep-900">{lift.name}</h3>
        </div>
        <StatusBadge status={lift.status} pulse={lift.status === 'open'} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-deep-100 pt-4 text-sm">
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-deep-500">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            Üzemidő
          </dt>
          <dd className="mt-0.5 font-semibold text-deep-900">
            <PendingValue value={lift.operatingHours} hint="Üzemidő megadása szükséges" />
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-deep-500">
            <Users aria-hidden="true" className="h-3.5 w-3.5" />
            Kapacitás
          </dt>
          <dd className="mt-0.5 font-semibold text-deep-900">
            {lift.capacityPerHour === null ? (
              <PendingValue value={null} hint="Kapacitás megadása szükséges" />
            ) : (
              formatNumber(lift.capacityPerHour, ' fő/óra')
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-deep-500">Hossz</dt>
          <dd className="mt-0.5 font-semibold text-deep-900">
            {lift.lengthM === null ? <PendingValue value={null} hint="Hossz megadása szükséges" /> : formatLength(lift.lengthM)}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-deep-500">
            <MoveUp aria-hidden="true" className="h-3.5 w-3.5" />
            Szintkülönbség
          </dt>
          <dd className="mt-0.5 font-semibold text-deep-900">
            {lift.verticalM === null ? (
              <PendingValue value={null} hint="Szintkülönbség megadása szükséges" />
            ) : (
              formatNumber(lift.verticalM, ' m')
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {lift.nightSkiing ? (
          <span className="rounded-pill bg-deep-50 px-2.5 py-1 text-[0.7rem] font-semibold text-deep-700">
            Esti síelés
          </span>
        ) : null}
        {lift.note ? <p className="text-xs text-deep-500">{lift.note}</p> : null}
      </div>
    </Card>
  );
}
