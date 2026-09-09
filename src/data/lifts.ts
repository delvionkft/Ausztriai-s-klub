import type { Lift } from '@/types';

/**
 * FELVONÓK
 * ----------------------------------------------------------------------------
 * A megnevezések semleges betűjelek, amíg a tulajdonos meg nem adja a valós
 * felvonóneveket. A műszaki adatok (hossz, szintkülönbség, kapacitás) `null`
 * értéken állnak — ezek üzleti adatok, nem találjuk ki őket.
 * A `status` és az `operatingHours` demó érték, éles működésben API-ból jön.
 */
export const lifts: Lift[] = [
  {
    id: 'lift-a',
    name: 'A — völgyi gondola',
    type: 'gondola',
    status: 'open',
    operatingHours: '08:30 – 16:15',
    capacityPerHour: null,
    lengthM: null,
    verticalM: null,
    nightSkiing: false,
    note: null,
  },
  {
    id: 'lift-b',
    name: 'B — négyüléses ülőlift',
    type: 'chairlift',
    status: 'open',
    operatingHours: '09:00 – 16:00',
    capacityPerHour: null,
    lengthM: null,
    verticalM: null,
    nightSkiing: true,
    note: null,
  },
  {
    id: 'lift-c',
    name: 'C — gerinc ülőlift',
    type: 'chairlift',
    status: 'open',
    operatingHours: '09:00 – 15:45',
    capacityPerHour: null,
    lengthM: null,
    verticalM: null,
    nightSkiing: false,
    note: null,
  },
  {
    id: 'lift-d',
    name: 'D — tányéros felvonó',
    type: 'draglift',
    status: 'closed',
    operatingHours: null,
    capacityPerHour: null,
    lengthM: null,
    verticalM: null,
    nightSkiing: false,
    note: 'Nyitás hóhelyzet függvényében.',
  },
  {
    id: 'lift-e',
    name: 'E — oktatópálya felvonó',
    type: 'draglift',
    status: 'open',
    operatingHours: '09:00 – 16:00',
    capacityPerHour: null,
    lengthM: null,
    verticalM: null,
    nightSkiing: true,
    note: null,
  },
  {
    id: 'lift-f',
    name: 'F — gyerekpark szőnyeg',
    type: 'carpet',
    status: 'maintenance',
    operatingHours: null,
    capacityPerHour: null,
    lengthM: null,
    verticalM: null,
    nightSkiing: false,
    note: 'Tervezett karbantartás.',
  },
];

export const liftTypeLabels: Record<Lift['type'], string> = {
  gondola: 'Gondola',
  chairlift: 'Ülőlift',
  draglift: 'Tányéros / csákányos',
  carpet: 'Szőnyegfelvonó',
  funicular: 'Sikló',
};
