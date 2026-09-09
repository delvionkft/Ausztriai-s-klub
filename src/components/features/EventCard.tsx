import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { eventCategoryLabels } from '@/data/events';
import { formatDateHu } from '@/lib/date';
import { Card } from '@/components/ui/Card';
import { Media } from '@/components/ui/Media';
import { PendingValue } from '@/components/ui/PendingValue';
import type { ResortEvent } from '@/types';

/** Esemény / hír kártya (drótváz 01/07, 11/04). */
export function EventCard({ event, variant = 'card' }: { event: ResortEvent; variant?: 'card' | 'row' }) {
  const dateLabel = formatDateHu(event.date);

  if (variant === 'row') {
    return (
      <li className="flex flex-col gap-3 border-b border-deep-100 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <span className="flex w-24 shrink-0 items-center gap-1.5 text-sm font-semibold text-deep-700">
            <CalendarDays aria-hidden="true" className="h-4 w-4 text-glacier-600" />
            {dateLabel ?? <PendingValue value={null} hint="Időpont kihirdetésre vár" />}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-deep-900">{event.title}</h3>
            <p className="mt-0.5 text-sm text-deep-600">{event.excerpt}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 self-start rounded-pill bg-deep-50 px-3 py-1.5 text-sm font-semibold text-deep-700 sm:self-auto">
          Részletek
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      </li>
    );
  }

  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden">
      <Media mediaKey={event.imageKey ?? 'home-hero'} className="aspect-[16/10]" showHint={false} sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-glacier-600">
          {eventCategoryLabels[event.category]}
        </span>
        <h3 className="mt-2 text-[1.05rem] font-semibold text-deep-900">{event.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-deep-600">{event.excerpt}</p>

        <dl className="mt-4 space-y-1.5 border-t border-deep-100 pt-3 text-xs text-deep-500">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Időpont</dt>
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            <dd>{dateLabel ?? <PendingValue value={null} hint="Időpont kihirdetésre vár" />}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Helyszín</dt>
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            <dd>
              <PendingValue value={event.location} hint="Helyszín megadása szükséges" />
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
