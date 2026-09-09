'use client';

import { useEffect, useRef } from 'react';
import { Camera, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { AlpineScene } from '@/components/ui/AlpineScene';
import { PendingValue } from '@/components/ui/PendingValue';
import { formatDateTimeHu } from '@/lib/date';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import type { Webcam } from '@/types';

/**
 * WEBKAMERA ELŐNÉZET
 * INTEGRÁCIÓ: a `webcam.imageUrl` kitöltésével automatikusan valós kép jelenik meg.
 * MÉRÉS 4: a kártya akkor számít megtekintésnek, amikor tényleg látszik
 * a képernyőn (IntersectionObserver) — nem pedig a lista renderelésekor.
 */
export function WebcamCard({ webcam }: { webcam: Webcam }) {
  const ref = useRef<HTMLDivElement>(null);
  const seenRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !seenRef.current) {
            seenRef.current = true;
            trackEvent(ANALYTICS_EVENTS.viewWebcam, { webcam_id: webcam.id, webcam_name: webcam.name });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [webcam.id, webcam.name]);

  return (
    <Card as="li" className="overflow-hidden">
      <div ref={ref} className="relative aspect-video bg-ice-100">
        {webcam.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={webcam.imageUrl}
            alt={`Webkamera-kép: ${webcam.name}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <AlpineScene variant="day" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-deep-950/60 backdrop-blur-[1px]">
              <Camera aria-hidden="true" className="h-6 w-6 text-white/85" />
              <p className="px-3 text-center text-xs font-medium text-white/90">
                Élő kamerakép bekötésre vár
              </p>
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-[0.98rem] font-semibold text-deep-900">{webcam.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-deep-500">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
          <PendingValue value={webcam.location} hint="Helyszín megadása szükséges" />
          {webcam.altitudeM !== null ? <span>· {webcam.altitudeM} m</span> : null}
        </p>
        <p className="mt-2 text-[0.7rem] text-deep-500">
          {webcam.updatedAt ? `Frissítve: ${formatDateTimeHu(webcam.updatedAt)}` : 'Frissítési időbélyeg a bekötés után'}
        </p>
      </div>
    </Card>
  );
}
