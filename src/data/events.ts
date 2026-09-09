import type { ResortEvent } from '@/types';

/**
 * ESEMÉNYEK ÉS HÍREK
 * A dátumok `null` értéken állnak, amíg a síközpont ki nem hirdeti őket.
 * A kezdőlapon legfeljebb 3 elem jelenik meg (drótváz 01/07).
 */
export const events: ResortEvent[] = [
  {
    id: 'event-season-opening',
    title: 'Szezonnyitó hétvége',
    date: null,
    endDate: null,
    category: 'event',
    season: 'winter',
    excerpt: 'Nyitóhétvége a pályákon, kedvezményes napijeggyel és bemutatókkal.',
    location: null,
    imageKey: 'event-opening',
  },
  {
    id: 'event-night-ski',
    title: 'Esti síelés — fáklyás levezetés',
    date: null,
    endDate: null,
    category: 'family',
    season: 'winter',
    excerpt: 'Megvilágított pálya, fáklyás levezetés és forró ital a völgyállomáson.',
    location: null,
    imageKey: 'event-night',
  },
  {
    id: 'event-kids-race',
    title: 'Gyerekverseny és síiskola-bemutató',
    date: null,
    endDate: null,
    category: 'race',
    season: 'winter',
    excerpt: 'Játékos verseny a legkisebbeknek, oktatóink felügyeletével.',
    location: null,
    imageKey: 'event-kids',
  },
  {
    id: 'event-summer-hike',
    title: 'Nyári túranap a gerincen',
    date: null,
    endDate: null,
    category: 'event',
    season: 'summer',
    excerpt: 'Vezetett túra a kilátóig, felvonós felszállással.',
    location: null,
    imageKey: 'event-hike',
  },
  {
    id: 'event-gastro',
    title: 'Hütte-esték és après-ski',
    date: null,
    endDate: null,
    category: 'gastro',
    season: 'all',
    excerpt: 'Élőzene és helyi konyha a pálya melletti vendéglátóhelyen.',
    location: null,
    imageKey: 'event-gastro',
  },
];

export const eventCategoryLabels: Record<ResortEvent['category'], string> = {
  event: 'Rendezvény',
  news: 'Hír',
  race: 'Verseny',
  family: 'Családi',
  gastro: 'Gasztro',
};
