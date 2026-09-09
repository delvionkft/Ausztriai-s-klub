import type { ImageRef } from '@/lib/images';
import type { SceneVariant } from '@/components/ui/SceneArt';

/**
 * ============================================================================
 *  KÉPEK KÖZPONTI NYILVÁNTARTÁSA  —  ITT CSERÉLD A FOTÓKAT
 * ============================================================================
 *  A weboldalon EGYETLEN kép sincs beégetve komponensbe. Minden kép innen jön.
 *
 *  MOST: ideiglenes, jogtiszta Unsplash-fotók (`source: 'unsplash'`).
 *  ÉLESBEN:
 *    1. tedd a végleges fotót a `public/images/` mappába,
 *    2. írd át itt a sort:  { source: 'local', ref: 'sajat-fotó.jpg' }
 *    3. kész — komponenst nem kell módosítani.
 *
 *  A `scene` mező adja meg, milyen alpesi hátteret rajzoljon a rendszer, ha a
 *  fotó bármilyen okból nem töltődik be (offline, lejárt CDN-link). Így soha
 *  nem marad üres vagy szürke képhely a felületen.
 *
 *  Az `alt` szöveg SEO és akadálymentesség miatt kötelező és beszédes.
 * ============================================================================
 */

export interface MediaEntry extends ImageRef {
  alt: string;
  scene: SceneVariant;
  /** Fókuszpont, ha a kivágás nem középre esik jól. */
  position?: string;
}

export const mediaLibrary: Record<string, MediaEntry> = {
  /* ---------------------------------------------------------------- Hero-k */
  'hero-home': {
    source: 'unsplash', ref: 'photo-1551524164-687a55dd1126',
    alt: 'Havas alpesi hegygerinc napsütésben, előtérben frissen ratrakolt sípályával',
    scene: 'alpine-day',
  },
  'hero-snow': {
    source: 'unsplash', ref: 'photo-1418985991508-e47386d96a71',
    alt: 'Friss hóval borított hegycsúcsok hajnali fényben',
    scene: 'alpine-dawn',
  },
  'hero-map': {
    source: 'unsplash', ref: 'photo-1483728642387-6c3bdd6c93e5',
    alt: 'Panoráma a síterepről, kirajzolódó pályákkal és felvonónyomvonalakkal',
    scene: 'alpine-day',
  },
  'hero-lifts': {
    source: 'unsplash', ref: 'photo-1522056615691-da7b8106c665',
    alt: 'Ülőlift a havas hegyoldalban, alatta síelőkkel',
    scene: 'lift',
  },
  'hero-tickets': {
    source: 'unsplash', ref: 'photo-1605540436563-5bca919ae766',
    alt: 'Síelők a felvonó völgyállomásánál, reggeli fényben',
    scene: 'alpine-dawn',
  },
  'hero-school': {
    source: 'unsplash', ref: 'photo-1544966503-7cc5ac882d5f',
    alt: 'Síoktató gyerekcsoporttal a lankás gyakorlópályán',
    scene: 'ski-school',
  },
  'hero-stay': {
    source: 'unsplash', ref: 'photo-1610465299996-30f240ac2b1c',
    alt: 'Fából épült alpesi vendégház télen, kivilágított ablakokkal',
    scene: 'chalet-dusk',
  },
  'hero-groups': {
    source: 'unsplash', ref: 'photo-1520250497591-112f2f40a3f4',
    alt: 'Baráti társaság a vendégház teraszán, háttérben a havas hegyoldallal',
    scene: 'chalet-dusk',
  },
  'hero-availability': {
    source: 'unsplash', ref: 'photo-1449158743715-0a90ebb6d2d8',
    alt: 'A vendégház télen, friss hóval a tetőn',
    scene: 'chalet-night',
  },
  'hero-inquiry': {
    source: 'unsplash', ref: 'photo-1502005097973-6a7082348e28',
    alt: 'A vendégház bejárata és sítárolója havas estén',
    scene: 'chalet-night',
  },
  'hero-experience-winter': {
    source: 'unsplash', ref: 'photo-1489674267075-cee793167910',
    alt: 'Kivilágított esti sípálya a hegyoldalban',
    scene: 'night-ski',
  },
  'hero-experience-summer': {
    source: 'unsplash', ref: 'photo-1464822759023-fed622ff2c3b',
    alt: 'Nyári alpesi panoráma virágzó hegyi rétekkel',
    scene: 'summer-ridge',
  },
  'hero-contact': {
    source: 'unsplash', ref: 'photo-1476514525535-07fb3b4ae5f1',
    alt: 'Kanyargós hegyi út a síközpont felé, két oldalán hófödte fenyőkkel',
    scene: 'alpine-dawn',
  },

  /* --------------------------------------------------------- Kezdőlap · UX */
  'intent-today': {
    source: 'unsplash', ref: 'photo-1551698618-1dfe5d97d256',
    alt: 'Síelő kanyarodik a frissen ratrakolt pályán',
    scene: 'alpine-day',
  },
  'intent-beginner': {
    source: 'unsplash', ref: 'photo-1522056615691-da7b8106c665',
    alt: 'Kezdő síelők az oktatóval a gyakorlópályán',
    scene: 'ski-school',
  },
  'intent-multiday': {
    source: 'unsplash', ref: 'photo-1517649763962-0c623066013b',
    alt: 'Síelő a hegygerincen, előtte a teljes síterep panorámája',
    scene: 'alpine-dusk',
  },
  'intent-group': {
    source: 'unsplash', ref: 'photo-1487887235947-a955ef187fcc',
    alt: 'Nagyobb társaság síléccel a vendégház előtt',
    scene: 'chalet-dusk',
  },
  'offer-season-pass': {
    source: 'unsplash', ref: 'photo-1502786129293-79981df4e689',
    alt: 'Síelő a friss porhóban, háttérben a hegygerinccel',
    scene: 'alpine-day',
  },
  'home-guesthouse': {
    source: 'unsplash', ref: 'photo-1522708323590-d24dbb6b0267',
    alt: 'A vendégház tágas nappalija kandallóval és nagy étkezőasztallal',
    scene: 'interior-warm',
  },
  'map-preview': {
    source: 'unsplash', ref: 'photo-1524661135-423995f22d0b',
    alt: 'A síközpont és a völgy madártávlatból',
    scene: 'alpine-day',
  },

  /* ---------------------------------------------------------- Felvonóképek */
  'lift-gondola': {
    source: 'unsplash', ref: 'photo-1548777123-e216912df7d8',
    alt: 'Kabinos felvonó a völgyállomás felett',
    scene: 'lift',
  },
  'lift-chairlift': {
    source: 'unsplash', ref: 'photo-1522056615691-da7b8106c665',
    alt: 'Ülőlift kabinjai a havas hegyoldal fölött',
    scene: 'lift',
  },
  'lift-tbar': {
    source: 'unsplash', ref: 'photo-1551524559-8af4e6624178',
    alt: 'Tányéros felvonó nyomvonala a hóban',
    scene: 'lift',
  },
  'lift-carpet': {
    source: 'unsplash', ref: 'photo-1610909971862-4d4b9dbcf3e4',
    alt: 'Szőnyegfelvonó a gyerekparkban',
    scene: 'ski-school',
  },

  /* -------------------------------------------------------------- Webkamera */
  'webcam-peak': {
    source: 'unsplash', ref: 'photo-1517299321609-52687d1bc55a',
    alt: 'Webkamerakép a csúcsállomásról a gerinc felé',
    scene: 'alpine-day',
  },
  'webcam-base': {
    source: 'unsplash', ref: 'photo-1607604276583-eef5d076aa5f',
    alt: 'Webkamerakép a völgyállomásról és a jegypénztárról',
    scene: 'alpine-dawn',
  },
  'webcam-family': {
    source: 'unsplash', ref: 'photo-1519315901367-f34ff9154487',
    alt: 'Webkamerakép a családi pályáról és a gyerekparkról',
    scene: 'ski-school',
  },
  'webcam-nightslope': {
    source: 'unsplash', ref: 'photo-1489674267075-cee793167910',
    alt: 'Webkamerakép az esti síelésre kivilágított pályáról',
    scene: 'night-ski',
  },

  /* ----------------------------------------------------------- Síiskola */
  'school-package': {
    source: 'unsplash', ref: 'photo-1551698618-1dfe5d97d256',
    alt: 'Kezdő síelő az első lecke közben',
    scene: 'ski-school',
  },
  'instructor-1': {
    source: 'unsplash', ref: 'photo-1544027993-37dbfe43562a',
    alt: 'Síoktató a gyakorlópálya szélén, oktatói dzsekiben',
    scene: 'portrait',
  },
  'instructor-2': {
    source: 'unsplash', ref: 'photo-1543965170-4c01a586684e',
    alt: 'Síoktató sísapkában a felvonó mellett',
    scene: 'portrait',
  },
  'instructor-3': {
    source: 'unsplash', ref: 'photo-1552058544-f2b08422138a',
    alt: 'Síoktató a hegyoldalban, háttérben a pályával',
    scene: 'portrait',
  },
  'instructor-4': {
    source: 'unsplash', ref: 'photo-1531123897727-8f129e1688ce',
    alt: 'Snowboardoktató a funparknál',
    scene: 'portrait',
  },
  'rental-shop': {
    source: 'unsplash', ref: 'photo-1610909971862-4d4b9dbcf3e4',
    alt: 'Kölcsönző pult sílécekkel és sícipőkkel',
    scene: 'interior-cool',
  },

  /* ---------------------------------------------------------- Vendégház */
  'stay-exterior': {
    source: 'unsplash', ref: 'photo-1610465299996-30f240ac2b1c',
    alt: 'A vendégház külső képe télen',
    scene: 'chalet-dusk',
  },
  'stay-living': {
    source: 'unsplash', ref: 'photo-1522708323590-d24dbb6b0267',
    alt: 'Nappali kandallóval és nagy közös asztallal',
    scene: 'interior-warm',
  },
  'stay-dining': {
    source: 'unsplash', ref: 'photo-1600585154340-be6161a56a0c',
    alt: 'Étkező tizenhat személyes asztallal',
    scene: 'interior-warm',
  },
  'stay-kitchen': {
    source: 'unsplash', ref: 'photo-1556909212-d5b604d0c90d',
    alt: 'Professzionális felszereltségű konyha csoportos főzéshez',
    scene: 'interior-cool',
  },
  'stay-bedroom-1': {
    source: 'unsplash', ref: 'photo-1571003123894-1f0594d2b5d9',
    alt: 'Franciaágyas hálószoba fapadlóval és hegyi kilátással',
    scene: 'interior-warm',
  },
  'stay-bedroom-2': {
    source: 'unsplash', ref: 'photo-1505693416388-ac5ce068fe85',
    alt: 'Kétágyas hálószoba tetőtéri ablakkal',
    scene: 'interior-warm',
  },
  'stay-bedroom-3': {
    source: 'unsplash', ref: 'photo-1540518614846-7eded433c457',
    alt: 'Emeletes ágyas szoba fiatalabb vendégeknek',
    scene: 'interior-warm',
  },
  'stay-bathroom': {
    source: 'unsplash', ref: 'photo-1584622650111-993a426fbf0a',
    alt: 'Világos fürdőszoba zuhanyzóval',
    scene: 'interior-cool',
  },
  'stay-ski-room': {
    source: 'unsplash', ref: 'photo-1551524559-8af4e6624178',
    alt: 'Fűtött sítároló léctartókkal és cipőszárítóval',
    scene: 'interior-cool',
  },
  'stay-sauna': {
    source: 'unsplash', ref: 'photo-1583417319070-4a69db38a482',
    alt: 'Finn szauna a vendégház alsó szintjén',
    scene: 'interior-warm',
  },
  'stay-terrace': {
    source: 'unsplash', ref: 'photo-1449158743715-0a90ebb6d2d8',
    alt: 'Fedett terasz a ház előtt, kilátással a hegyoldalra',
    scene: 'chalet-dusk',
  },
  'stay-garden': {
    source: 'unsplash', ref: 'photo-1502005097973-6a7082348e28',
    alt: 'A ház kertje és parkolója télen',
    scene: 'chalet-night',
  },

  /* --------------------------------------------------------- Élmények */
  'exp-toboggan': {
    source: 'unsplash', ref: 'photo-1548013146-72479768bada',
    alt: 'Szánkózók a kivilágított szánkópályán',
    scene: 'night-ski',
  },
  'exp-winter-hike': {
    source: 'unsplash', ref: 'photo-1483728642387-6c3bdd6c93e5',
    alt: 'Téli túraútvonal a hófödte fenyves között',
    scene: 'alpine-day',
  },
  'exp-hut': {
    source: 'unsplash', ref: 'photo-1414235077428-338989a2e8c0',
    alt: 'Hütte belső tere hosszú faasztalokkal',
    scene: 'interior-warm',
  },
  'exp-family': {
    source: 'unsplash', ref: 'photo-1519315901367-f34ff9154487',
    alt: 'Család a gyerekpark pályáján',
    scene: 'ski-school',
  },
  'exp-summer-hike': {
    source: 'unsplash', ref: 'photo-1551632811-561732d1e306',
    alt: 'Túrázók a nyári hegygerincen',
    scene: 'summer-ridge',
  },
  'exp-bike': {
    source: 'unsplash', ref: 'photo-1502904550040-7534597429ae',
    alt: 'Hegyikerékpáros az erdei ösvényen',
    scene: 'summer-ridge',
  },
  'exp-viewpoint': {
    source: 'unsplash', ref: 'photo-1464822759023-fed622ff2c3b',
    alt: 'Kilátóterasz a csúcson, alatta a völggyel',
    scene: 'summer-ridge',
  },
  'exp-events': {
    source: 'unsplash', ref: 'photo-1470229722913-7c0e2dbbafd3',
    alt: 'Esti rendezvény a völgyállomás előtti téren',
    scene: 'night-ski',
  },

  /* ------------------------------------------------- Események és hírek */
  'event-night-race': {
    source: 'unsplash', ref: 'photo-1489674267075-cee793167910',
    alt: 'Éjszakai szlalomverseny a kivilágított pályán',
    scene: 'night-ski',
  },
  'event-family-day': {
    source: 'unsplash', ref: 'photo-1519315901367-f34ff9154487',
    alt: 'Családi nap a gyerekparkban',
    scene: 'ski-school',
  },
  'event-apres': {
    source: 'unsplash', ref: 'photo-1470229722913-7c0e2dbbafd3',
    alt: 'Après-ski koncert a völgyállomásnál',
    scene: 'night-ski',
  },
  'news-snowmaking': {
    source: 'unsplash', ref: 'photo-1548777123-e216912df7d8',
    alt: 'Hóágyúk dolgoznak a pályán szürkületben',
    scene: 'alpine-dusk',
  },

  /* ----------------------------------------------------------- Egyéb */
  'directions-map': {
    source: 'unsplash', ref: 'photo-1524661135-423995f22d0b',
    alt: 'A völgy és a síközpont megközelítési útvonala felülnézetből',
    scene: 'alpine-day',
  },
  'newsletter-bg': {
    source: 'unsplash', ref: 'photo-1418985991508-e47386d96a71',
    alt: 'Hóesés a fenyves felett',
    scene: 'alpine-dusk',
  },
};

export function getMedia(key: string): MediaEntry {
  return (
    mediaLibrary[key] ?? {
      source: 'unsplash',
      ref: 'photo-1551524164-687a55dd1126',
      alt: 'Havas alpesi tájkép',
      scene: 'alpine-day',
    }
  );
}
