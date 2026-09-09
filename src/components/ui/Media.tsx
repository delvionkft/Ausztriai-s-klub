'use client';

import { useState } from 'react';
import { getMedia } from '@/data/media';
import { buildImageUrl, buildSrcSet } from '@/lib/images';
import { cn } from '@/lib/cn';
import { SceneArt } from './SceneArt';

/**
 * KÉPMEGJELENÍTŐ
 * ----------------------------------------------------------------------------
 * Egyetlen komponens minden képhez. A forrás a `src/data/media.ts`-ből jön.
 *
 *  - reszponzív `srcset` + `sizes`, hogy mobilon ne töltsön be nagy fájlt,
 *  - `loading="lazy"` és `decoding="async"` az első képernyőn kívüli képekre,
 *  - ha a fotó nem tölthető be, dizájnolt alpesi jelenet lép a helyére
 *    (soha nincs törött kép vagy üres szürke doboz).
 *
 * Szándékosan sima `<img>`-et használ `next/image` helyett, hogy a komponens
 * más React-környezetbe (pl. Vite) is átvihető legyen módosítás nélkül.
 */
interface MediaProps {
  mediaKey: string;
  className?: string;
  imgClassName?: string;
  /** Sötét fedőréteg a szöveg olvashatóságáért. */
  overlay?: 'none' | 'soft' | 'strong' | 'bottom';
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
  /** Felülírja a nyilvántartásban tárolt alt szöveget (pl. dekoratív képnél ''). */
  alt?: string;
}

export function Media({
  mediaKey,
  className,
  imgClassName,
  overlay = 'none',
  priority = false,
  sizes = '100vw',
  rounded = false,
  alt,
}: MediaProps) {
  const media = getMedia(mediaKey);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const overlayClass =
    overlay === 'soft'
      ? 'bg-gradient-to-br from-night-950/65 via-night-950/35 to-night-950/15'
      : overlay === 'strong'
        ? 'bg-gradient-to-br from-night-950/85 via-night-950/60 to-night-950/35'
        : overlay === 'bottom'
          ? 'bg-gradient-to-t from-night-950/85 via-night-950/25 to-transparent'
          : '';

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-night-900',
        rounded && 'rounded-card',
        className,
      )}
    >
      <div className="absolute inset-0">
        <SceneArt variant={media.scene} />
      </div>

      {!failed ? (
        // Szándékosan sima <img>: hordozható más React-környezetbe is, és a
        // reszponzív srcset + lazy loading nélküle is optimális marad.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={buildImageUrl(media, 1440)}
          srcSet={buildSrcSet(media)}
          sizes={sizes}
          alt={alt ?? media.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            // A fotó csak akkor válik láthatóvá, amikor be is töltött. Így soha
            // nem villan fel törött kép vagy alt szöveg — addig a megkomponált
            // alpesi háttér látszik alatta.
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-smooth',
            loaded ? 'opacity-100' : 'opacity-0',
            media.position,
            imgClassName,
          )}
        />
      ) : null}

      {overlay !== 'none' ? <div aria-hidden="true" className={cn('absolute inset-0', overlayClass)} /> : null}
    </div>
  );
}
