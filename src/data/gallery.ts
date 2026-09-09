import type { GalleryCategory, GalleryImage } from '@/types';

/**
 * GALÉRIA — funkció szerinti sorrendben (drótváz 07/06)
 * A `src` mező `null`, amíg nincsenek valós fotók: a `Media` komponens
 * dizájnolt helyőrzőt renderel. Fotó beillesztése = `src` kitöltése.
 */

export const galleryCategories: Array<{ id: GalleryCategory; label: string }> = [
  { id: 'common', label: 'Közös terek' },
  { id: 'bedroom', label: 'Hálószobák' },
  { id: 'bathroom-kitchen', label: 'Fürdő, konyha' },
  { id: 'skiroom', label: 'Sítároló' },
  { id: 'exterior', label: 'Külső' },
];

export const galleryImages: GalleryImage[] = [
  { id: 'g-common-1', category: 'common', caption: 'Nappali és közös tér', src: null, alt: 'A vendégház közös tere' },
  { id: 'g-common-2', category: 'common', caption: 'Étkező', src: null, alt: 'A vendégház étkezője' },
  { id: 'g-common-3', category: 'common', caption: 'Kandallós sarok', src: null, alt: 'Kandallós pihenősarok' },
  { id: 'g-bed-1', category: 'bedroom', caption: 'Hálószoba — tetőtér', src: null, alt: 'Tetőtéri hálószoba' },
  { id: 'g-bed-2', category: 'bedroom', caption: 'Hálószoba — emelet', src: null, alt: 'Emeleti hálószoba' },
  { id: 'g-bed-3', category: 'bedroom', caption: 'Hálószoba — földszint', src: null, alt: 'Földszinti hálószoba' },
  { id: 'g-bath-1', category: 'bathroom-kitchen', caption: 'Fürdőszoba', src: null, alt: 'Fürdőszoba' },
  { id: 'g-bath-2', category: 'bathroom-kitchen', caption: 'Konyha', src: null, alt: 'Felszerelt konyha' },
  { id: 'g-ski-1', category: 'skiroom', caption: 'Sítároló', src: null, alt: 'Sítároló a felszerelésnek' },
  { id: 'g-ski-2', category: 'skiroom', caption: 'Szárítási lehetőség', src: null, alt: 'Felszerelésszárító' },
  { id: 'g-ext-1', category: 'exterior', caption: 'A ház kívülről', src: null, alt: 'A vendégház külső képe' },
  { id: 'g-ext-2', category: 'exterior', caption: 'Terasz és környezet', src: null, alt: 'Terasz és a környező táj' },
];
