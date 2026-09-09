/**
 * KÉPFORRÁS-ADAPTER
 * ============================================================================
 * A weboldal képei EGYETLEN helyen cserélhetők: `src/data/media.ts`.
 * Ez a fájl csak azt dönti el, hogyan áll össze a kép URL-je.
 *
 * Három forrás támogatott:
 *  1. `local`   – saját fotó a `public/images/` mappából  (ÉLES AJÁNLOTT)
 *  2. `unsplash`– jogtiszta ideiglenes fotó az Unsplash CDN-ről (alapértelmezett)
 *  3. `custom`  – bármilyen abszolút URL (CDN, DAM, media szerver)
 *
 * ÉLESÍTÉS:
 *  - tedd a végleges fotókat a `public/images/` mappába,
 *  - a `src/data/media.ts`-ben írd át a `source` mezőt `local`-ra és
 *    add meg a fájlnevet — komponenst NEM kell módosítani.
 *
 * A `.env` fájlban felülírható a CDN-gyökér is:
 *  NEXT_PUBLIC_IMAGE_CDN=https://cdn.sajat-domain.hu
 */

export type ImageSource = 'local' | 'unsplash' | 'custom';

const UNSPLASH_CDN = 'https://images.unsplash.com';
const LOCAL_BASE = process.env.NEXT_PUBLIC_IMAGE_CDN ?? '';

export interface ImageRef {
  source: ImageSource;
  /** unsplash: fotó-azonosító · local: fájlnév · custom: teljes URL */
  ref: string;
}

/** Előre definiált méretlépcsők — a srcset ezekből épül. */
export const IMAGE_WIDTHS = [480, 768, 1024, 1440, 1920] as const;

export function buildImageUrl(image: ImageRef, width: number, quality = 72): string {
  switch (image.source) {
    case 'unsplash':
      return `${UNSPLASH_CDN}/${image.ref}?auto=format&fit=crop&w=${width}&q=${quality}`;
    case 'custom':
      return image.ref;
    case 'local':
    default:
      return `${LOCAL_BASE}/images/${image.ref}`;
  }
}

/** Reszponzív srcset — csak olyan forrásnál, ami támogat méretparamétert. */
export function buildSrcSet(image: ImageRef, quality = 72): string | undefined {
  if (image.source !== 'unsplash') return undefined;
  return IMAGE_WIDTHS.map((w) => `${buildImageUrl(image, w, quality)} ${w}w`).join(', ');
}
