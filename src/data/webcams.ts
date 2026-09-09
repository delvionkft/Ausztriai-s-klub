import type { Webcam } from '@/types';

/**
 * WEBKAMERÁK
 * INTEGRÁCIÓ: az `imageUrl` / `streamUrl` mezőbe a valós kamerakép URL-je kerül.
 * Amíg `null`, a `WebcamCard` dizájnolt helyőrzőt mutat.
 */
export const webcams: Webcam[] = [
  { id: 'cam-1', name: 'Völgyállomás', location: null, altitudeM: null, imageUrl: null, streamUrl: null, updatedAt: null },
  { id: 'cam-2', name: 'Középállomás', location: null, altitudeM: null, imageUrl: null, streamUrl: null, updatedAt: null },
  { id: 'cam-3', name: 'Csúcs / panoráma', location: null, altitudeM: null, imageUrl: null, streamUrl: null, updatedAt: null },
  { id: 'cam-4', name: 'Gyerekpark és oktatópálya', location: null, altitudeM: null, imageUrl: null, streamUrl: null, updatedAt: null },
];
