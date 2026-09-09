import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { getMedia } from '@/data/media';
import { cn } from '@/lib/cn';
import { AlpineScene, DARK_SCENES } from './AlpineScene';

/**
 * KÉPMEGJELENÍTŐ
 * ----------------------------------------------------------------------------
 * Ha a `src/data/media.ts`-ben van valós kép, azt jeleníti meg optimalizálva
 * (lazy loading, AVIF/WebP). Ha nincs, dizájnolt alpesi helyőrzőt renderel a
 * feltöltendő tartalom megnevezésével.
 *
 * MIGRÁCIÓ (Emergent): ha nem Next.js alatt fut, a `next/image` importot és a
 * `<Image>` elemet cseréld sima `<img loading="lazy">`-re — csak ez az egy fájl
 * érintett.
 */

interface MediaProps {
  mediaKey: string;
  className?: string;
  /** Fedő overlay a szöveg olvashatóságáért (hero-blokkokban). */
  overlay?: 'none' | 'soft' | 'strong';
  priority?: boolean;
  sizes?: string;
  showHint?: boolean;
  rounded?: boolean;
}

export function Media({
  mediaKey,
  className,
  overlay = 'none',
  priority = false,
  sizes = '100vw',
  showHint = true,
  rounded = false,
}: MediaProps) {
  const media = getMedia(mediaKey);

  // Eleve sötét helyőrző jeleneten elég a gyengébb fedés — a kontraszt így is
  // bőven 4.5:1 felett marad, de a hegy rajzolata láthatóbb.
  const effectiveOverlay =
    overlay === 'strong' && !media.src && DARK_SCENES[media.scene] ? 'soft' : overlay;

  return (
    <div
      className={cn(
        // FONTOS: itt ne adj át `absolute` osztályt kívülről — a Tailwind
        // sorrendjében a `.relative` felülírná. Háttérképhez tegyél a Media
        // köré egy `absolute inset-0` wrappert (lásd PageHero).
        'relative isolate overflow-hidden bg-ice-100',
        rounded && 'rounded-card',
        className,
      )}
    >
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover"
        />
      ) : (
        <>
          <AlpineScene variant={media.scene} />
          {showHint ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-deep-950/70 px-3 py-2 backdrop-blur-sm">
              <ImageIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-white/80" />
              <span className="truncate text-[11px] font-medium text-white/90">{media.hint}</span>
            </div>
          ) : null}
        </>
      )}

      {effectiveOverlay !== 'none' ? (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0',
            effectiveOverlay === 'soft'
              ? 'bg-gradient-to-br from-deep-950/70 via-deep-950/45 to-deep-950/25'
              // Erős fedés: a fehér címsorok kontrasztja világos háttéren is
              // biztosan 4.5:1 felett marad.
              : 'bg-gradient-to-br from-deep-950/85 via-deep-950/65 to-deep-950/45',
          )}
        />
      ) : null}
    </div>
  );
}
