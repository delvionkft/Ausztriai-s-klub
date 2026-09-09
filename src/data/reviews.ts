import type { Localized } from '@/types';

/**
 * ============================================================================
 *  VENDÉGVÉLEMÉNYEK
 * ============================================================================
 *  SZÁNDÉKOSAN ÜRES.
 *
 *  Kitalált nevet és idézetet nem teszünk a weboldalra. Ide kizárólag olyan
 *  visszajelzés kerülhet, amit valóban nálunk járt csoporttól kaptunk, a
 *  közzétételi engedélyükkel.
 *
 *  Ha van ilyen, add hozzá a tömbhöz — a `/csoportoknak` oldal automatikusan
 *  megjeleníti a véleményszekciót az üres állapot helyett.
 * ============================================================================
 */
export interface Review {
  id: string;
  /** Ellenőrzött vendég neve vagy csoportneve, ahogyan engedélyezte. */
  author: string;
  /** Honnan származik (pl. Google, e-mail, kérdőív) — az ellenőrizhetőség miatt. */
  sourceLabel: string;
  groupType: Localized;
  stayLabel: string;
  quote: Localized;
  rating: 1 | 2 | 3 | 4 | 5;
  verifiedAt: string;
}

export const reviews: Review[] = [];

/** Amíg nincs ellenőrzött vélemény, ezek a tények jelennek meg helyettük. */
export const verifiedFacts: Array<{ id: string; value: string; label: Localized }> = [
  {
    id: 'since',
    value: '1978',
    label: { hu: 'óta üzemeltetjük a hegyet', de: 'betreiben wir den Berg', en: 'running the mountain since' },
  },
  {
    id: 'groups',
    value: '22 fő',
    label: { hu: 'a ház befogadóképessége, egyben foglalva', de: 'Kapazität des Hauses, als Ganzes buchbar', en: 'house capacity, booked as a whole' },
  },
  {
    id: 'distance',
    value: '250 m',
    label: { hu: 'a háztól a völgyállomásig', de: 'vom Haus zur Talstation', en: 'from the house to the base station' },
  },
  {
    id: 'response',
    value: '24 óra',
    label: { hu: 'alatt küldünk személyes ajánlatot', de: 'bis zum persönlichen Angebot', en: 'to a personal quote' },
  },
];
