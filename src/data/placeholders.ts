/**
 * KÖZPONTI HELYŐRZŐ FÁJL
 * ----------------------------------------------------------------------------
 * Minden olyan szöveg, ami tulajdonosi adatra vár, innen jön.
 * A valós tartalom beillesztésekor elég az adatfájlokban a `null` értékeket
 * kitölteni — komponenst NEM kell módosítani.
 */

/** Egyetlen érték helyőrzője (rövid, táblázatban is jól mutat). */
export const PLACEHOLDER_VALUE = '—';

/** Címke, ami elárulja, miért üres a mező. */
export const PLACEHOLDER_HINT = 'Tulajdonosi adatra vár';

/**
 * Demó mód.
 * `true`  → az interaktív felületek (árkalkulátor, naptár, jegyajánló) demó
 *            számokkal működnek, és ezt láthatóan jelzik is.
 * `false` → csak a valós, kitöltött adatok jelennek meg.
 */
export const DEMO_DATA_ENABLED = true;

export const DEMO_NOTICE =
  'Demó adatok. A végleges árakat, időpontokat és pályaadatokat a síközpont adja meg.';

export const PLACEHOLDER_TEXT = {
  resortName: 'Síközpont neve',
  resortNameShort: 'Síközpont',
  brandLegal: 'Üzemeltető cégnév',
  address: 'Cím megadása szükséges',
  phone: 'Telefonszám megadása szükséges',
  email: 'E-mail cím megadása szükséges',
  hours: 'Nyitvatartás megadása szükséges',
  price: 'Ár egyeztetés alatt',
  image: 'Fotó helye',
  webcam: 'Webkamera-kép helye',
  map: 'Térkép helye',
  document: 'Dokumentum feltöltésre vár',
  person: 'Név megadása szükséges',
  review: 'Vélemény beillesztésre vár',
} as const;

export const PLACEHOLDER_MEDIA = {
  slopeMap: 'A végleges pályatérkép feltöltése után ez a felület automatikusan lecserélődik.',
  gallery: 'A galéria a tulajdonos által küldött fotókkal töltődik fel.',
  hero: 'Nagy felbontású borítókép helye.',
  map: 'Térkép helye',
  floorplan: 'Az alaprajz a tulajdonos által küldött rajz alapján kerül ide.',
} as const;

/** Formázó: `null`/`undefined` esetén helyőrzőt ad vissza. */
export function withPlaceholder(
  value: string | number | null | undefined,
  suffix = '',
): string {
  if (value === null || value === undefined || value === '') return PLACEHOLDER_VALUE;
  return `${value}${suffix}`;
}

/** Igaz, ha az érték helyőrző (a UI ilyenkor halványabban jelenít meg). */
export function isPending(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}
