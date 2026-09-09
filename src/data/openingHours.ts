import type { DailyOpeningHours, OpeningPeriod } from '@/types';

/**
 * NYITVATARTÁS — ADATMODELLBŐL GENERÁLVA (drótváz 04/04)
 * A konkrét szezonkezdés/-zárás dátumok tulajdonosi adatok → `null`.
 */

export const dailyOpeningHours: DailyOpeningHours[] = [
  { id: 'lifts', label: 'Felvonók', hours: '08:30 – 16:15', days: 'Hétfő – vasárnap', note: null },
  { id: 'cashdesk', label: 'Jegypénztár', hours: '08:00 – 15:30', days: 'Hétfő – vasárnap', note: null },
  { id: 'skischool', label: 'Síiskola', hours: '09:00 – 16:00', days: 'Hétfő – vasárnap', note: null },
  { id: 'rental', label: 'Kölcsönző és szerviz', hours: '08:00 – 17:00', days: 'Hétfő – vasárnap', note: null },
  { id: 'night', label: 'Esti síelés', hours: '18:00 – 21:00', days: 'Szerda, péntek, szombat', note: 'Az esti síelés külön jegyet igényel.' },
];

export const openingPeriods: OpeningPeriod[] = [
  { id: 'season-start', label: 'Szezonkezdés', from: null, to: null, note: 'A nyitás időpontja a hóhelyzettől függ.' },
  { id: 'season-end', label: 'Szezonzárás', from: null, to: null, note: 'A zárás időpontját a síközpont hirdeti ki.' },
  { id: 'summer', label: 'Nyári üzem', from: null, to: null, note: 'Túraútvonalak, kilátó és rendezvények.' },
];

export const nightSkiingInfo = {
  title: 'Esti síelés',
  description:
    'A megvilágított pályaszakaszokon esténként is lehet síelni. A pontos pályakiosztás a napi hóhelyzettől függ.',
  scheduleLabel: 'Szerda · péntek · szombat',
  hours: '18:00 – 21:00',
} as const;
