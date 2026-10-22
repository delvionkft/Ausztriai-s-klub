# Ludwighaus — élményoldal

Önálló, keretrendszer nélküli weboldal a Ludwighaus panziónak. **Nem** része a
repóban lévő `src/` alatti Next.js síközpont-frontendnek — az egy másik
projekt, ehhez semmi köze.

| | |
|---|---|
| Forrás | `preview/ludwighause-experience.html` (~441 KB, gzip-pel ~137 KB) |
| Kísérő fájlok | `preview/assets/img/` (75 kép), `preview/assets/fonts/` (6 betűfájl), `favicon.ico`, `site.webmanifest`, `robots.txt` |
| Külső függőség | **nincs** — a lap nulla külső kérést indít |
| Build | nincs: a fájl önmagában fut, bármilyen statikus kiszolgálóról |
| Nyelvek | magyar (forrás) + angol + német, 635-635 fordítási bejegyzés |

## A koncepció

**A görgetés = emelkedés.** A háttér a völgy fenyvesétől a gerinc kék óráján át
a felhők fölötti világosba vált; a szövegszín, a keretek és az akcentus ehhez
igazodva fordul át. A hátteret nem fotók adják, hanem egyetlen canvasra
rajzolt, magból generált gerincrétegek, hóesés, felhők és egy átsuhanó síelő.

## Felépítés

A fájl sorrendje: fejléc-meták és strukturált adat → betűtípus-definíciók →
20 `<style>` blokk → a hét nézet jelölése → adatblokk → komponensek.

### Adat — minden tartalom egy helyen

A JS elején álló konstansok tartják a teljes tartalmat. Portoláskor ezek
lesznek a props / API-válasz; a komponensek nem tartalmaznak beégetett adatot.

| Konstans | Mit tart |
|---|---|
| `ROOMS` | 7 szobatípus: szobaszám, ár, férőhely, ágykiosztás, emelet, terasz, fotók |
| `GALLERY`, `HOUSE_SHOTS` | a galéria és a „ház kívülről" csempéi |
| `ACTIVITIES`, `ACTIVITY_INFO` | nyári és téli programok, a részletes nézet tartalmával |
| `SKI_AREAS`, `WILDKOGEL`, `BIKE_TOURS` | sítereppek, a Wildkogel-Aréna, e-bike útvonalak |
| `SERVICES`, `INCLUDED`, `EXCLUDED` | szolgáltatások és ártartalom |
| `REVIEWS` | vendégvélemények |
| `PRIVACY`, `RULES_DOC` | ÁSZF + adatkezelés, házirend három nyelven |
| `VIEW_META`, `VIEW_LABELS` | nézetenkénti lapcím és leírás |
| `EN`, `DE` | fordítási szótárak |

### Komponensek

Mindegyik önálló IIFE, `(function Név(){ … })()` alakban — portoláskor
mechanikusan React-komponensre képezhetők.

| Blokk | Szerep |
|---|---|
| `AlpineScene` | háttércanvas: gerincek, hóesés, felhők, síelő |
| `Nav`, `MobileNav`, `Brand` | fejléc, teljes képernyős mobil menü, logó |
| `Router` | hash-útvonalak + hóviharos oldalváltás |
| `Rooms`, `RoomTools`, `RoomsSplit` | szobakártyák, szűrés, csoportépítő |
| `RoomPhotos`, `Lightbox` | szobafotó- és galérianagyító, előtöltéssel |
| `Gallery`, `Content`, `SkiAreas`, `SkiMix` | galéria, szövegblokkok, sítereppek |
| `WildkogelArena`, `EBike`, `ActivityInfo` | aréna-fülek, túrák, programrészletek |
| `Reviews` | lapozható vendégvélemények |
| `RulesDoc` | háromnyelvű házirend |
| `BookingForm` | foglalási űrlap |
| `Parallax`, `Reveal`, `SectionRail` | mozgás, megjelenés, oldalsó helyzetjelző |
| penguin (`peng-*`) | asszisztens az oldal adataiból válaszol |

### Útvonalak

Hét nézet egyetlen dokumentumban, horgonnyal: `#/`, `#/szobak`, `#/sipalyak`,
`#/kikapcsolodas`, `#/galeria`, `#/hazirend`, `#/kapcsolat`.

> A Google a horgonyt eldobja, ezért **a hét nézet számára egyetlen cím**.
> Valódi útvonalakra váltáshoz a routerben `location.hash` helyett
> `location.pathname` kell, és a kiszolgálón SPA-fallback. Részletek:
> `docs/seo-audit.md`, 6.1 pont.

## Nyelvkezelés

A szótárak a **magyar forrásszövegre** kulcsolnak. Betöltéskor egy TreeWalker
pillanatfelvételt készít minden szövegcsomópontról, nyelvváltáskor ezeket
cseréli. A futásidőben összeállított szövegek a `T()` függvényen mennek át.

**Ha magyar szöveget módosítasz, a kulcsot is át kell írni mindkét szótárban** —
különben a fordítás csendben elmarad. Ezt a `npm run qa` elkapja.

## Élesítési beállítások

A fejléc elején, egy helyen:

```js
window.LH_SEO = {
  origin: '',   // végleges domain, záró perjel nélkül
  gaId:   '',   // GA4 mérőazonosító (G-…)
  gtmId:  ''    // Google Tag Manager (GTM-…)
};
```

Amíg üresek, a lap tudatosan nem ad ki canonical címet és nem tölt be
mérőkódot. Ezután: `node tools/generate-seo-files.mjs https://a-domained.at`.

## Minőségellenőrzés

```bash
npm run qa              # mind az öt vizsgálat
node tools/qa/run.mjs layout   # csak egy
```

| Vizsgálat | Mit fog meg |
|---|---|
| `layout` | kilógó és levágott elem, vízszintes görgetés, apró betű és érintőfelület — négy képernyőméreten, hét nézeten |
| `contrast` | WCAG AA szövegkontraszt |
| `i18n` | duplikált és ütköző szótárkulcs, EN/DE lefedettség, lefordítatlan szöveg |
| `meta` | nézetek, egyedi cím és leírás, strukturált adat, belső hivatkozások, nyelvváltás, JS-hibák |
| `perf` | LCP, CLS, TBT, görgetés simasága, galérialapozás — Slow 4G és 4x lassított CPU mellett |

**Minden módosítás után futtasd.** Ezek pontosan azokat a hibaosztályokat
fogják meg, amik korábban a megrendelőig jutottak el.

## Teljesítményről, amit tudni kell

- Egyetlen `requestAnimationFrame` ciklus hajt minden mozgást (`onTick`).
- A dokumentum magassága és a kis kijelző ténye **gyorsítótárazva** van —
  ezeket korábban minden képkockában újraolvastuk, ami kényszerített
  újratördelést okozott.
- A hóvihar-vászon csak az első oldalváltáskor méreteződik, nem induláskor.
- A nagyítók nyitáskor előre betöltik a teljes fotósorozatot.
- `prefers-reduced-motion` automatikusan kikapcsolja a mozgást, és a fejlécben
  kézi kapcsoló is van.
