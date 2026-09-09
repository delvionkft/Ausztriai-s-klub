# Silbergrat Skiarena — síközponti weboldal

Teljes értékű, publikálásra kész frontend egy síközpont és a hozzá tartozó
vendégház számára. Minden oldal, útvonal és interakció működik, éles backend
nélkül is: az adatok a `src/data/` mappa mintaadataiból jönnek, a külső
rendszereket pedig jól elkülönített adapterek mögé tettük.

> A weboldalon szereplő márkanév, cím, árak és szövegek **valósághű
> bemutatóadatok**. A cseréjük helyét ez a dokumentum és a fájlok tetején lévő
> megjegyzések pontosan megmutatják.

---

## Gyors indulás

```bash
npm install
npm run dev        # fejlesztői szerver: http://localhost:3000
npm run build      # éles build
npm start          # éles szerver
npm run typecheck  # TypeScript ellenőrzés
npm run lint       # ESLint
```

Környezeti változók: másold a `.env.example` fájlt `.env.local` néven.
Mindegyik változó elhagyható — nélkülük is minden funkció működik.

---

## Technológiai környezet

| Réteg | Megoldás |
| --- | --- |
| Keretrendszer | Next.js 15 (App Router) |
| Nyelv | TypeScript, `strict` módban |
| Stílus | Tailwind CSS 3 központi tokenkészlettel |
| Ikonok | lucide-react |
| Animáció | CSS + IntersectionObserver (`Reveal`, `MetricCard`) |
| Adatréteg | `src/data/*` mintaadatok + `src/services/*` adapterek |

**Miért nincs Framer Motion?** A projektben már működő Next.js környezet volt,
és az összes szükséges animáció (beúszás, számláló, accordion, lightbox,
rétegváltás) megoldható CSS-sel és egy apró hookkal. Így nincs extra
futásidejű függőség, a Core Web Vitals jobb, és a komponensek könnyebben
átvihetők más React-környezetbe.

**Hordozhatóság (Emergent).** Nincs platformfüggő megoldás. A képmegjelenítő
sima `<img>` elemet használ (`next/image` helyett), az útvonalak a
`src/data/navigation.ts`-ben vannak, az adatok pedig tiszta TypeScript
objektumok. A `next/link` és `next/navigation` hívások cseréje a
`src/components/` mappában néhány import átírása.

---

## Oldalak és útvonalak

| Útvonal | Tartalom |
| --- | --- |
| `/` | Hero, szándékválasztó, aktuális ajánlat, a hegy számokban, vendégház, események, megközelítés, hóértesítő |
| `/hojelentes` | Hóadatok, háromnapos előrejelzés, felvonó- és pályaállapot, webkamerák |
| `/palyaterkep` | Interaktív SVG-térkép rétegvezérléssel, nagyítással, kattintható elemekkel |
| `/felvonok` | Szűrhető felvonólista, nyitvatartás, webkamerák |
| `/jegyek` | Jegyajánló, naptáras árnézet, ártáblázat, kedvezmények |
| `/siiskola` | Kezdőcsomag, csomagok, oktatók, mit hozz magaddal, kölcsönző és szerviz |
| `/szallas` | Vendégház, gyorsinfó, alaprajz szintenként, szűrhető galéria |
| `/szallas/arak-es-idopontok` | Foglaltsági naptár, létszám, tételes árösszesítő, feltételek |
| `/szallas/ajanlatkeres` | Folyamatjelző, validált ajánlatkérő űrlap, párhuzamos csatornák, GYIK |
| `/csoportoknak` | Célcsoportok, szervezési folyamat, csoportos részletek, vélemények |
| `/elmenyek` | Szezonfüggő hero, élménykártyák szűrővel, események, átvezetések |
| `/kapcsolat` | Megközelítés, négyféle érkezés, kategorizált GYIK, kapcsolat, dokumentumok |
| `/hazirend`, `/adatkezeles`, `/sutik`, `/aszf`, `/impresszum` | Jogi oldalak |
| `/robots.txt`, `/sitemap.xml` | Kereső-előkészítés |

A korábbi útvonalak (`/vendeghaz`, `/arak-es-szabad-idopontok`,
`/ajanlatkeres`, `/elmeny`, `/informacio`) átirányítanak az új címekre.

---

## Hol módosítsd az üzleti adatokat?

Minden változó adat a `src/data/` mappában van, és egyetlen komponens sem
tartalmaz beégetett üzleti értéket.

| Fájl | Mit tartalmaz |
| --- | --- |
| `site.config.ts` | **Márkanév, cégnév, régió, magasság, szezon dátumai** |
| `contact.ts` | Telefon, e-mail, cím, GPS, közösségi média, érkezési módok, cégadatok |
| `media.ts` | **Az összes kép egy helyen** — forrás, alt szöveg, tartalék jelenet |
| `navigation.ts` | Útvonalak, fő menü, lábléc oszlopok, jogi linkek |
| `status.ts` | Hóadatok, üzemállapot, előrejelzés (téli és nyári változat) |
| `slopes.ts` | Pályák: név, nehézség, hossz, státusz, leírás, térképi nyomvonal |
| `lifts.ts` | Felvonók: típus, kapacitás, üzemidő, státusz, térképi nyomvonal |
| `webcams.ts` | Webkamerák neve, helye, képe, stream URL-je |
| `openingHours.ts` | Nyitvatartás, esti síelés, szezonkezdés és -zárás |
| `tickets.ts` | Jegytípusok, korosztályos árak, szezonális ársávok, kedvezmények |
| `skischool.ts` | Oktatási csomagok, oktatók, mit hozz magaddal, kölcsönzés, szerviz |
| `accommodation.ts` | Vendégház, szobák, alaprajz, díjak, feltételek, csoportos részletek |
| `availability.ts` | Foglaltsági naptár és szezonális szállásárak |
| `gallery.ts` | Galéria képei kategóriákkal |
| `experiences.ts` | Élmények, nyári üzem, átvezetések |
| `events.ts` | Események és hírek |
| `faq.ts` | Gyakori kérdések kategóriánként |
| `reviews.ts` | **Szándékosan üres** — ide csak ellenőrzött vendégvélemény kerülhet |
| `legal.ts` | Házirend, adatkezelés, sütik, ÁSZF, impresszum szövege |
| `homepage.ts` | Kezdőlapi szándékkártyák, aktuális ajánlat, kiemelt számadatok |

A `derived.ts` a pálya- és felvonószámokat, a hóágyúzási arányt és a
kilométereket **a listákból számolja** — így az összesítő soha nem mondhat mást,
mint a részletes lista.

---

## Képek cseréje

Az összes kép a `src/data/media.ts` fájlból jön. Egy bejegyzés így néz ki:

```ts
'hero-home': {
  source: 'unsplash',                 // 'local' | 'unsplash' | 'custom'
  ref: 'photo-1551524164-687a55dd1126',
  alt: 'Havas alpesi hegygerinc napsütésben…',
  scene: 'alpine-day',                // tartalék grafika, ha a fotó nem tölthető be
},
```

**Saját fotóra váltás** (ez az éles ajánlott mód):

1. tedd a fájlt a `public/images/` mappába,
2. írd át a sort: `{ source: 'local', ref: 'hero-tel.jpg', alt: '…', scene: 'alpine-day' }`,
3. kész — egyetlen komponenst sem kell módosítani.

A `Media` komponens reszponzív `srcset`-et épít, lusta betöltést használ, és a
fotót csak akkor teszi láthatóvá, amikor be is töltött. Ha egy kép nem érhető
el, a `scene` szerinti megkomponált alpesi háttér marad a helyén — **üres szürke
képhely vagy törött kép sosem jelenik meg**.

---

## Integrációs pontok

Minden külső rendszer a `src/services/` mappán keresztül érhető el. Amíg a
`NEXT_PUBLIC_API_BASE_URL` üres, a szolgáltatások a mintaadatokból dolgoznak.

| Szolgáltatás | Fájl | Éles végpont |
| --- | --- | --- |
| Hó- és üzemállapot | `statusService.ts` | `GET /status`, `GET /forecast` |
| Foglaltság és ajánlatkérés | `bookingService.ts` | `GET /availability`, `POST /inquiries` |
| Hóértesítő | `newsletterService.ts` | `POST /newsletter` |
| Jegyvásárlás | `ticketService.ts` | `POST /checkout` → `checkoutUrl` |
| Térkép | `data/contact.ts` · `MapEmbed` | `NEXT_PUBLIC_MAPS_EMBED_URL` |
| Mérés | `lib/analytics.ts` · `AnalyticsScripts` | `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_ID` |

Titkos kulcs soha nem kerül a böngészőbe: a `NEXT_PUBLIC_` előtag nélküli
változókat kizárólag szerveroldalon szabad használni.

---

## Mérés

Minden esemény a `track()` segédfüggvényen keresztül megy a `window.dataLayer`-be
(`src/lib/analytics.ts`), így a GTM bekötése egyetlen azonosító megadása:

`view_snow_report` · `open_slope_map` · `select_slope` · `view_webcam` ·
`start_ticket_recommendation` · `complete_ticket_recommendation` ·
`begin_ticket_checkout` · `start_ski_school_booking` ·
`select_accommodation_dates` · `start_accommodation_inquiry` ·
`submit_accommodation_inquiry` · `click_phone` · `click_whatsapp` ·
`click_email` · `subscribe_snow_alert` · `change_language` · `open_directions`

---

## Többnyelvűség

Három nyelv: **magyar (alapértelmezett), német, angol**.

- A felület minden szövege a `src/i18n/{hu,de,en}.ts` fájlokban van, azonos
  kulcsszerkezettel. A `hu.ts` a forrás, belőle származik a `Dictionary` típus,
  így hiányzó kulcs esetén a build hibát jelez.
- Az üzleti adatok nyelvfüggő mezői `Localized` típusúak (`{ hu, de?, en? }`).
  Ha egy nyelvhez még nincs fordítás, a magyar szöveg jelenik meg — üres felület
  soha nem marad.
- A választott nyelv `localStorage`-ban marad meg (oldalváltás és frissítés
  után is), és frissíti a `<html lang>` attribútumot.

---

## Akadálymentesség és mobil

- Minden állapotot **szín, ikon és szöveg együtt** jelez.
- Az érintési felületek legalább 44 px magasak (kesztyűs használat).
- Mobilon a táblázatok kártyanézetté alakulnak, nincs vízszintes görgetés.
- A fix alsó CTA-sáv kontextusfüggő, és a `pb-mobile-cta` miatt semmit nem takar.
- A `prefers-reduced-motion` beállítást minden animáció tiszteletben tartja.
- Fókuszjelzés, `aria-*` attribútumok, „Ugrás a tartalomra" link, szemantikus HTML.

---

## Ellenőrzött állapot

- `npm run build` hibamentesen lefut, mind a 28 útvonal előrenderelődik.
- `npm run typecheck` és `npm run lint` tiszta.
- Böngészős ellenőrzés (Chromium, 1440×950 és 390×844):
  nincs konzolhiba, nincs hidratálási hiba, nincs vízszintes görgetés,
  és sehol nem jelenik meg helyőrző szöveg.
- 32 interakciós teszt fut le sikeresen: jegyajánló, ár-naptár, felvonószűrő,
  térkép, foglaltsági naptár, árösszesítő, űrlapvalidáció és -beküldés,
  galéria, GYIK, nyelvváltás, hírlevél, mobil menü és CTA-sáv.

---

## Még szükséges az élesítéshez

1. **Végleges fotóanyag** a `public/images/` mappába (a `media.ts` jelenleg
   ideiglenes, jogtiszta képforrásra mutat).
2. **Valós üzleti adatok**: márkanév, cégadatok, elérhetőségek, árak,
   pálya- és felvonólista, nyitvatartás.
3. **Backend vagy külső API-k**: hó- és időjárásadat, foglaltság, ajánlatkérés
   továbbítása e-mailben, jegyértékesítés, webkamera-stream.
4. **GTM-azonosító** a méréshez.
5. **Jogi szövegek ellenőrzése** ügyvéddel (`src/data/legal.ts`).
6. **Pályatérkép PDF** a `public/dokumentumok/palyaterkep.pdf` útvonalra.
7. **DE/EN fordítások** véglegesítése az üzleti adatok mezőiben.
