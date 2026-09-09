import type { Webcam } from '@/types';
import { freshTimestamp } from './status';

/**
 * ============================================================================
 *  WEBKAMERÁK  —  ITT CSERÉLD A KAMERAKÉPEKET
 * ============================================================================
 *  Amíg a `streamUrl` üres, az `imageKey`-hez tartozó kép jelenik meg
 *  (`src/data/media.ts`). Éles kamerához add meg a szolgáltató álló- vagy
 *  élőkép URL-jét a `streamUrl` mezőben — a felület nem változik.
 * ============================================================================
 */
export const webcams: Webcam[] = [
  {
    id: 'peak',
    name: 'Csúcsállomás — Silbergrat',
    location: 'Gipfelrestaurant 2140, panoráma délnyugat felé',
    altitudeM: 2140,
    imageKey: 'webcam-peak',
    streamUrl: null,
    updatedAt: freshTimestamp(7),
  },
  {
    id: 'base',
    name: 'Völgyállomás és jegypénztár',
    location: 'Talstationsweg 4, kilátás a parkoló felé',
    altitudeM: 860,
    imageKey: 'webcam-base',
    streamUrl: null,
    updatedAt: freshTimestamp(4),
  },
  {
    id: 'family',
    name: 'Almwiese családi pálya',
    location: 'Középállomás, gyerekpark és szőnyegfelvonó',
    altitudeM: 1340,
    imageKey: 'webcam-family',
    streamUrl: null,
    updatedAt: freshTimestamp(9),
  },
  {
    id: 'night',
    name: 'Esti pálya — Almwiese',
    location: 'Kivilágított szakasz a középállomás alatt',
    altitudeM: 1180,
    imageKey: 'webcam-nightslope',
    streamUrl: null,
    updatedAt: freshTimestamp(6),
  },
];
