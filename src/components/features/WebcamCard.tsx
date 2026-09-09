'use client';

import { useEffect, useState } from 'react';
import { Expand, MapPin, RefreshCw, X } from 'lucide-react';
import type { Webcam } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { webcams } from '@/data/webcams';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { track } from '@/lib/analytics';
import { Media } from '@/components/ui/Media';
import { UpdatedAt } from '@/components/ui/UpdatedAt';
import { Reveal } from '@/components/ui/Reveal';

/**
 * WEBKAMERA-ELŐNÉZET
 * ----------------------------------------------------------------------------
 * Amíg nincs valódi stream (`streamUrl === null`), a nyilvántartásban tárolt
 * állókép jelenik meg. A felület ettől függetlenül végleges.
 */
export function WebcamCard({ cam, onOpen }: { cam: Webcam; onOpen: (cam: Webcam) => void }) {
  const { t } = useI18n();

  return (
    <article className="group overflow-hidden rounded-card border border-white/12 bg-white/[0.05]">
      <button
        type="button"
        onClick={() => { onOpen(cam); track('view_webcam', { webcam: cam.id }); }}
        className="relative block w-full text-left"
        aria-label={`${cam.name} — ${t.common.zoomIn}`}
      >
        <Media
          mediaKey={cam.imageKey}
          className="aspect-[16/10]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
          overlay="bottom"
        />
        <span className="absolute right-3 top-3 inline-grid h-9 w-9 place-items-center rounded-pill bg-night-950/70 text-white backdrop-blur-sm transition-colors group-hover:bg-sky-400 group-hover:text-night-950">
          <Expand aria-hidden="true" className="h-4 w-4" />
        </span>
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-night-950/70 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-state-open" />
          {t.status.liveNow}
        </span>
      </button>

      <div className="p-4">
        <h3 className="font-display text-[0.9375rem] font-extrabold text-white">{cam.name}</h3>
        <p className="mt-1 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-frost-300/75">
          <MapPin aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-glacier-400" />
          {cam.location} · {cam.altitudeM} m
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-[0.75rem] text-frost-300/60">
          <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
          {t.common.updated}: <UpdatedAt iso={cam.updatedAt} minutesAgo={9} format="datetime" />
        </p>
      </div>
    </article>
  );
}

/** Webkamera-rács a nagyított nézettel együtt. */
export function WebcamGrid({ items = webcams }: { items?: Webcam[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState<Webcam | null>(null);

  useLockBodyScroll(Boolean(active));

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((cam, index) => (
          <Reveal key={cam.id} as="li" delay={index * 70}>
            <WebcamCard cam={cam} onOpen={setActive} />
          </Reveal>
        ))}
      </ul>

      {active ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={active.name}>
          <div aria-hidden="true" onClick={() => setActive(null)} className="absolute inset-0 bg-night-950/90 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-4xl animate-fade-in">
            <div className="overflow-hidden rounded-panel border border-white/15 bg-night-950 shadow-lift">
              <Media mediaKey={active.imageKey} className="aspect-[16/9]" sizes="100vw" priority />
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <h3 className="font-display text-base font-extrabold text-white">{active.name}</h3>
                  <p className="mt-0.5 text-[0.8125rem] text-frost-300/75">
                    {active.location} · {active.altitudeM} m · {t.common.updated}: <UpdatedAt iso={active.updatedAt} minutesAgo={9} format="datetime" />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="tap-target inline-flex items-center gap-1.5 rounded-pill border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
