import type { SceneVariant } from '@/components/ui/AlpineScene';

/**
 * KÉPEK KÖZPONTI NYILVÁNTARTÁSA
 * ----------------------------------------------------------------------------
 * Amíg `src: null`, a `Media` komponens dizájnolt alpesi helyőrzőt renderel.
 * Valós fotó beillesztése: tedd a fájlt a `public/images/` mappába, és írd be
 * ide az útvonalat — egyetlen komponenst sem kell módosítani.
 *
 * Példa:  home-hero: { src: '/images/hero-tel.jpg', alt: '...', scene: 'day' }
 */

export interface MediaEntry {
  src: string | null;
  alt: string;
  scene: SceneVariant;
  /** Rövid magyarázat, mit kell ide feltölteni. */
  hint: string;
}

export const mediaLibrary: Record<string, MediaEntry> = {
  'home-hero': {
    src: null,
    alt: 'Kilátás a síközpont pályáira',
    scene: 'day',
    hint: 'Kezdőlap borítókép vagy élő webkamera-felvétel (min. 1920×1080)',
  },
  'home-accommodation': {
    src: null,
    alt: 'A vendégház télen',
    scene: 'dusk',
    hint: 'A vendégház külső képe',
  },
  'snow-hero': { src: null, alt: 'Havas hegygerinc', scene: 'dawn', hint: 'Hójelentés fejléckép' },
  'map-hero': { src: null, alt: 'A síterep panorámája', scene: 'day', hint: 'Pályatérkép oldal fejléckép' },
  'lifts-hero': { src: null, alt: 'Felvonó a hegyoldalban', scene: 'day', hint: 'Felvonók oldal fejléckép' },
  'tickets-hero': { src: null, alt: 'Jegypénztár és felvonó', scene: 'dawn', hint: 'Jegyek oldal fejléckép' },
  'school-hero': { src: null, alt: 'Oktatás a gyerekparkban', scene: 'day', hint: 'Síiskola fejléckép — gyerekpark / oktatás' },
  'guesthouse-hero': { src: null, alt: 'A vendégház és környezete', scene: 'dusk', hint: 'Vendégház fejléckép — teljes ház, külső vagy közös tér' },
  'groups-hero': { src: null, alt: 'Csoport a vendégház előtt', scene: 'dusk', hint: 'Csoportoknak oldal fejléckép' },
  'availability-hero': { src: null, alt: 'A vendégház télen', scene: 'night', hint: 'Árak és szabad időpontok fejléckép' },
  'quote-hero': { src: null, alt: 'A vendégház bejárata', scene: 'night', hint: 'Ajánlatkérés fejléckép' },
  'experience-hero': { src: null, alt: 'Nyári panoráma a hegyről', scene: 'summer', hint: 'Élmény és nyári üzem fejléckép' },
  'experience-hero-winter': { src: null, alt: 'Esti síelés a megvilágított pályán', scene: 'night', hint: 'Élmény oldal — téli / esti felvétel' },
  'info-hero': { src: null, alt: 'Út a síközpont felé', scene: 'dawn', hint: 'Info oldal fejléckép' },
  'floorplan': { src: null, alt: 'A vendégház alaprajza', scene: 'day', hint: 'Alaprajz (PNG/SVG) szintenként' },
  'slope-map': { src: null, alt: 'A síközpont pályatérképe', scene: 'day', hint: 'Végleges pályatérkép (SVG előnyben, PDF-fel együtt)' },
};

export function getMedia(key: string): MediaEntry {
  return (
    mediaLibrary[key] ?? {
      src: null,
      alt: 'Kép helye',
      scene: 'day',
      hint: 'Kép feltöltésre vár',
    }
  );
}
