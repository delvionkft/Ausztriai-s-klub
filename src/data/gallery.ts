import type { GalleryImage } from '@/types';

/**
 * ============================================================================
 *  VENDÉGHÁZ GALÉRIA  —  ITT CSERÉLD A FOTÓKAT
 * ============================================================================
 *  A képek a `src/data/media.ts`-ben megadott forrásból jönnek. Új fotó
 *  hozzáadásához vedd fel a képet ott, és hivatkozz rá `imageKey`-vel.
 * ============================================================================
 */
export const galleryImages: GalleryImage[] = [
  { id: 'g1', imageKey: 'stay-living', category: 'common', caption: { hu: 'Nappali kandallóval, 70 m²', de: 'Wohnraum mit Kamin, 70 m²', en: 'Living room with fireplace, 70 m²' } },
  { id: 'g2', imageKey: 'stay-dining', category: 'common', caption: { hu: 'Étkező tizenhat személyes asztallal', de: 'Esszimmer mit 16er-Tisch', en: 'Dining room with a table for sixteen' } },
  { id: 'g3', imageKey: 'exp-hut', category: 'common', caption: { hu: 'Olvasósarok az emeleti folyosón', de: 'Leseecke am Gang im Obergeschoss', en: 'Reading corner on the first-floor landing' } },
  { id: 'g4', imageKey: 'stay-sauna', category: 'common', caption: { hu: 'Finn szauna az alsó szinten', de: 'Finnische Sauna im Untergeschoss', en: 'Finnish sauna on the lower level' } },
  { id: 'g5', imageKey: 'stay-bedroom-1', category: 'bedrooms', caption: { hu: 'Almrausch — franciaágyas, erkéllyel', de: 'Almrausch — Doppelzimmer mit Balkon', en: 'Almrausch — double with balcony' } },
  { id: 'g6', imageKey: 'stay-bedroom-2', category: 'bedrooms', caption: { hu: 'Enzian — franciaágyas, déli fekvés', de: 'Enzian — Doppelzimmer, Südlage', en: 'Enzian — double, south facing' } },
  { id: 'g7', imageKey: 'stay-bedroom-3', category: 'bedrooms', caption: { hu: 'Falke — négyágyas a tetőtérben', de: 'Falke — Vierbettzimmer im Dachgeschoss', en: 'Falke — quad room in the attic' } },
  { id: 'g8', imageKey: 'stay-bathroom', category: 'bathrooms', caption: { hu: 'Emeleti fürdőszoba zuhanyzóval', de: 'Bad im Obergeschoss mit Dusche', en: 'First-floor bathroom with shower' } },
  { id: 'g9', imageKey: 'stay-bathroom', category: 'bathrooms', caption: { hu: 'Tetőtéri fürdőszoba', de: 'Bad im Dachgeschoss', en: 'Attic bathroom' } },
  { id: 'g10', imageKey: 'stay-kitchen', category: 'kitchen', caption: { hu: 'Profi konyha, tizenkét fős főzéshez', de: 'Profiküche, für zwölf Personen', en: 'Professional kitchen, cooking for twelve' } },
  { id: 'g11', imageKey: 'rental-shop', category: 'ski-storage', caption: { hu: 'Fűtött sítároló 24 léctartóval', de: 'Beheizter Skiraum mit 24 Skihaltern', en: 'Heated ski room with 24 ski racks' } },
  { id: 'g12', imageKey: 'stay-ski-room', category: 'ski-storage', caption: { hu: 'Cipőszárító minden vendégnek', de: 'Schuhtrockner für jeden Gast', en: 'A boot dryer for every guest' } },
  { id: 'g13', imageKey: 'stay-exterior', category: 'exterior', caption: { hu: 'A ház télen, a völgyállomás felől', de: 'Das Haus im Winter, von der Talstation', en: 'The house in winter, seen from the base station' } },
  { id: 'g14', imageKey: 'stay-terrace', category: 'exterior', caption: { hu: 'Fedett terasz a bejárat mellett', de: 'Überdachte Terrasse neben dem Eingang', en: 'Covered terrace beside the entrance' } },
  { id: 'g15', imageKey: 'stay-garden', category: 'exterior', caption: { hu: 'Parkoló a ház előtt, télen is takarítva', de: 'Parkplatz vor dem Haus, im Winter geräumt', en: 'Parking at the house, cleared in winter' } },
  { id: 'g16', imageKey: 'hero-groups', category: 'exterior', caption: { hu: 'Esti fények a ház körül', de: 'Abendlicht rund ums Haus', en: 'Evening lights around the house' } },
];
