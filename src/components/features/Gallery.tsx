'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { GalleryCategory, GalleryImage } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { fill } from '@/i18n';
import { cn } from '@/lib/cn';
import { Media } from '@/components/ui/Media';
import { EmptyState } from '@/components/ui/States';

const CATEGORIES: Array<GalleryCategory | 'all'> = ['all', 'common', 'bedrooms', 'bathrooms', 'kitchen', 'ski-storage', 'exterior'];

/**
 * GALÉRIA + LIGHTBOX
 * ----------------------------------------------------------------------------
 * Funkció szerinti szűrés, nagy nézet billentyűzetes lapozással
 * (nyilak és Escape), mobilon teljes szélességű megjelenítéssel.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const { t, L } = useI18n();
  const [category, setCategory] = useState<GalleryCategory | 'all'>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (category === 'all' ? images : images.filter((img) => img.category === category)),
    [category, images],
  );

  useLockBodyScroll(activeIndex !== null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => setActiveIndex((i) => (i === null ? null : (i + 1) % visible.length)), [visible.length]);
  const prev = useCallback(() => setActiveIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)), [visible.length]);

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeIndex, close, next, prev]);

  const active = activeIndex !== null ? visible[activeIndex] : null;

  return (
    <div>
      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t.common.filter}>
        {CATEGORIES.map((cat) => {
          const count = cat === 'all' ? images.length : images.filter((img) => img.category === cat).length;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => { setCategory(cat); setActiveIndex(null); }}
              aria-pressed={category === cat}
              className={cn(
                'tap-target inline-flex shrink-0 items-center gap-2 rounded-pill px-4 text-sm font-semibold transition-all',
                category === cat ? 'bg-night-950 text-white' : 'border border-night-200 bg-white text-night-700 hover:border-glacier-400 hover:bg-frost-100',
              )}
            >
              {t.gallery[cat]}
              <span className={cn('rounded-pill px-1.5 py-0.5 text-[0.6875rem] font-bold', category === cat ? 'bg-white/20' : 'bg-night-100 text-night-600')}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((image, index) => (
            <li key={image.id} className={cn(index === 0 && 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2')}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block h-full w-full overflow-hidden rounded-card"
                aria-label={`${L(image.caption)} — ${t.gallery.openImage}`}
              >
                <Media
                  mediaKey={image.imageKey}
                  className={cn('h-full', index === 0 ? 'aspect-square sm:aspect-[4/3]' : 'aspect-square')}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
                  overlay="bottom"
                  alt={L(image.caption)}
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left">
                  <span className="text-[0.75rem] font-semibold leading-snug text-white drop-shadow">{L(image.caption)}</span>
                  <Expand aria-hidden="true" className="h-4 w-4 shrink-0 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active ? (
        <div className="fixed inset-0 z-[70] flex flex-col p-4" role="dialog" aria-modal="true" aria-label={L(active.caption)}>
          <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-night-950/95 backdrop-blur-sm" />

          <div className="relative z-10 flex items-center justify-between gap-3 pb-3">
            <p className="text-sm font-semibold text-white">
              {fill(t.gallery.imageOf, { current: (activeIndex ?? 0) + 1, total: visible.length })}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label={t.gallery.closeLightbox}
              className="tap-target inline-grid place-items-center rounded-pill border border-white/25 px-3 text-white transition-colors hover:bg-white/10"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="relative z-10 flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label={t.common.previous}
              className="tap-target hidden shrink-0 place-items-center rounded-pill border border-white/25 px-3 text-white transition-colors hover:bg-white/10 sm:grid"
            >
              <ChevronLeft aria-hidden="true" className="h-6 w-6" />
            </button>

            <figure className="flex min-h-0 flex-1 flex-col">
              <Media mediaKey={active.imageKey} className="min-h-0 flex-1 rounded-panel" sizes="100vw" priority alt={L(active.caption)} />
              <figcaption className="pt-3 text-center text-sm text-frost-200">{L(active.caption)}</figcaption>
            </figure>

            <button
              type="button"
              onClick={next}
              aria-label={t.common.next}
              className="tap-target hidden shrink-0 place-items-center rounded-pill border border-white/25 px-3 text-white transition-colors hover:bg-white/10 sm:grid"
            >
              <ChevronRight aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="relative z-10 flex justify-center gap-3 pt-3 sm:hidden">
            <button type="button" onClick={prev} aria-label={t.common.previous} className="tap-target inline-grid place-items-center rounded-pill border border-white/25 px-5 text-white">
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" onClick={next} aria-label={t.common.next} className="tap-target inline-grid place-items-center rounded-pill border border-white/25 px-5 text-white">
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
