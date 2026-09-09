'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import type { EventItem, NewsItem } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { formatDate, formatShortDate } from '@/lib/date';
import { Media } from '@/components/ui/Media';

type Item = EventItem | NewsItem;

function isEvent(item: Item): item is EventItem {
  return 'location' in item;
}

/** ESEMÉNY- ÉS HÍRKÁRTYA — kép, dátum, kategória, cím, kivonat, CTA. */
export function EventCard({ item }: { item: Item }) {
  const { t, L, locale } = useI18n();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-night-100 bg-white shadow-subtle transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <Media
          mediaKey={item.imageKey}
          className="aspect-[16/10]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-white px-3 py-2 text-center shadow-card">
          <span className="font-display text-lg font-extrabold leading-none text-night-950">
            {new Date(`${item.date}T00:00:00`).getDate()}
          </span>
          <span className="mt-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-glacier-600">
            {formatShortDate(item.date, locale).replace(/\d+\.?\s?/, '')}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.75rem] font-bold uppercase tracking-wider text-glacier-600">{L(item.category)}</p>
        <h3 className="mt-2 font-display text-[1.0625rem] font-extrabold leading-snug text-night-950">
          <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {L(item.title)}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-night-600">{L(item.excerpt)}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-night-100 pt-4 text-[0.8125rem] text-night-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
            {formatDate(item.date, locale)}
          </span>
          {isEvent(item) ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              {item.location}
            </span>
          ) : null}
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-night-800 transition-colors group-hover:text-glacier-600">
            {t.common.details}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
