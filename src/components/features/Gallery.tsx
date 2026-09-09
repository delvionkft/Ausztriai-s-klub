'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryCategories, galleryImages } from '@/data/gallery';
import { PLACEHOLDER_MEDIA } from '@/data/placeholders';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/cn';
import { AlpineScene } from '@/components/ui/AlpineScene';
import type { GalleryCategory } from '@/types';

/**
 * GALÉRIA — funkció szerinti sorrendben (drótváz 07/06)
 * Valós fotó nélkül dizájnolt helyőrző jelenik meg, a képaláírással együtt.
 * Fotó beillesztése: `src/data/gallery.ts` → `src` mező kitöltése.
 */
export function Gallery() {
  const [category, setCategory] = useState<GalleryCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleImages = useMemo(
    () => (category === 'all' ? galleryImages : galleryImages.filter((image) => image.category === category)),
    [category],
  );

  useLockBodyScroll(lightboxIndex !== null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % visibleImages.length));
      if (event.key === 'ArrowLeft')
        setLightboxIndex((i) => (i === null ? null : (i - 1 + visibleImages.length) % visibleImages.length));
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, visibleImages.length]);

  const active = lightboxIndex === null ? null : visibleImages[lightboxIndex];

  return (
    <div>
      <div className="scroll-x">
        <ul className="flex gap-2 whitespace-nowrap pb-1">
          <li>
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={cn(
                'min-h-[42px] rounded-pill border px-4 text-sm font-semibold transition-colors',
                category === 'all'
                  ? 'border-deep-800 bg-deep-800 text-white'
                  : 'border-deep-200 bg-white text-deep-700 hover:bg-deep-50',
              )}
            >
              Összes
            </button>
          </li>
          {galleryCategories.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={cn(
                  'min-h-[42px] rounded-pill border px-4 text-sm font-semibold transition-colors',
                  category === item.id
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

      <p className="mt-3 text-xs text-deep-500">{PLACEHOLDER_MEDIA.gallery}</p>

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visibleImages.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-card border border-deep-100 bg-ice-100 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {image.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <AlpineScene variant={index % 2 === 0 ? 'day' : 'dusk'} />
              )}
              <span className="absolute inset-x-0 bottom-0 bg-deep-950/70 px-2.5 py-1.5 text-left text-[0.72rem] font-medium text-white backdrop-blur-sm">
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-deep-950/90 p-4"
        >
          <button
            type="button"
            aria-label="Galéria bezárása"
            onClick={() => setLightboxIndex(null)}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <div className="relative z-10 w-full max-w-4xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-panel bg-ice-100">
              {active.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.src} alt={active.alt} className="h-full w-full object-contain" />
              ) : (
                <AlpineScene variant="dusk" />
              )}
            </div>
            <p className="mt-3 text-center text-sm text-ice-100">
              {active.caption} · {lightboxIndex! + 1} / {visibleImages.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Bezárás</span>
          </button>
          <button
            type="button"
            onClick={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + visibleImages.length) % visibleImages.length))}
            className="absolute left-2 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Előző kép</span>
          </button>
          <button
            type="button"
            onClick={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % visibleImages.length))}
            className="absolute right-2 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Következő kép</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
