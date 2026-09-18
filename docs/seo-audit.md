# Ludwighaus — SEO-audit és elvégzett munka

**Dátum:** 2026-09-18
**Vizsgált felület:** `preview/ludwighause-experience.html` (a Ludwighaus élményoldal)
**Ág:** `claude/eager-keller-ktk0ut`
**Kiindulási állapot:** `f4362c8` commit

---

## 0. Amit tudni kell, mielőtt bármit elolvasol

Három dolog, ami a számoknál fontosabb.

**1. A repóban két, egymástól független projekt van.** A `src/` mappában egy
Next.js 15 alapú *síközpont*-frontend áll (`sikozpont-web`, 13 útvonal, 109
fájl) — ez nem a Ludwighaus. A Ludwighaus a `preview/` mappában lévő önálló,
keretrendszer nélküli oldal. Az audit és minden módosítás **kizárólag** a
Ludwighaust érinti; a Next.js projekthez egyetlen sort sem nyúltam.

**2. Két valótlan adat volt a strukturált adatban, mindkettőt eltávolítottam.**
Részletek a 3.2 és 3.3 pontban. Ezek a korábbi, gyorsított SEO-körből
maradtak bent, és az egyik büntetést kockáztatott.

**3. A legnagyobb SEO-problémát nem lehet ebben a fájlban megoldani.**
A hét aloldal egyetlen URL-en, horgonnyal (`#/szobak`) váltakozik. A Google a
horgonyt eldobja, tehát az egész weboldal **egyetlen találatként** létezik.
Ez nem hiba, amit „meg lehet javítani" — ez a felépítés következménye, és
valódi útvonalakat kíván. Lásd a 6. fejezetet.

---

## 1. Kiindulási állapot

### 1.1 Technológia

| | |
|---|---|
| Keretrendszer | **nincs** — egyetlen HTML fájl, vanilla JS, kézzel írt CSS |
| Build | **nincs** — se bundler, se `package.json` ehhez a fájlhoz |
| Lint / typecheck / teszt | **nincs** ehhez a fájlhoz (lásd 8.1) |
| Útvonalkezelés | saját, horgony alapú router (`#/szobak`), 7 nézet |
| Nyelvek | HU (forrás) + EN + DE, futásidejű szótárcserével |
| Külső függőség | Google Fonts CDN (3 betűcsalád) |
| Képek | 71 db, **mind beágyazva base64 `data:` URI-ként** |

### 1.2 Mérések a kiindulási állapoton

Lighthouse 12, mobil alapértelmezés, helyi kiszolgáló:

| Kategória | Pont |
|---|---|
| Teljesítmény | **26** |
| Akadálymentesség | 95 |
| Ajánlott gyakorlatok | **0** |
| SEO | 92 |

| Mérőszám | Érték |
|---|---|
| First Contentful Paint | **52,5 s** |
| Largest Contentful Paint | **102,9 s** |
| Speed Index | 52,5 s |
| Total Blocking Time | 2 900 ms |
| HTML dokumentum mérete | **10 151 KB** |

Külön mérés, Playwright, valódi mobil emuláció (4× lassított CPU, Slow-4G:
1,6 Mbps / 150 ms RTT): a kezdőlap **50,4 másodperc** alatt töltött be.

---

## 2. Megtalált problémák, fontossági sorrendben

| # | Probléma | Súly | Állapot |
|---|---|---|---|
| P1 | Hiányzó `<!DOCTYPE html>` → a böngésző **quirks módban** renderel | kritikus | ✅ javítva |
| P2 | 10,4 MB-os HTML: mind a 71 fotó base64-ben a dokumentumban | kritikus | ✅ javítva |
| P3 | Kitalált domain (`https://ludwighaus.com/`) a strukturált adatban | kritikus | ✅ eltávolítva |
| P4 | `aggregateRating` a JSON-LD-ben — a Google szabályát sérti | kritikus | ✅ eltávolítva |
| P5 | Hiányzó `<html>`, `<head>`, `<body>`; `lang` csak JS-ből | magas | ✅ javítva |
| P6 | Nincs canonical, nincs `og:url` | magas | ✅ megoldva (kapcsolóval) |
| P7 | `og:image` törött útvonalra mutatott (szóköz + zárójel a fájlnévben) | magas | ✅ javítva |
| P8 | A mobil stíluslap a fájl legvégén → 0,146 CLS | magas | ✅ javítva |
| P9 | Nincs `robots.txt`, nincs `sitemap.xml` | magas | ✅ megoldva |
| P10 | Nincs favicon → minden oldalletöltésnél 404 | közepes | ✅ javítva |
| P11 | Google Fonts CDN: renderblokkolás + GDPR-kockázat | közepes | ✅ javítva |
| P12 | Kezdőlap `<title>` 84 karakter, leírás 171 karakter (a Google vágja) | közepes | ✅ javítva |
| P13 | Lábléc `<h4>` `<h3>` nélkül → nem csökkenő címsorsorrend | közepes | ✅ javítva |
| P14 | Lábléc szövegkontraszt 2,86:1 (a WCAG AA 4,5:1-et vár) | közepes | ✅ javítva |
| P15 | Nincs GA4/GTM beépítési pont | közepes | ✅ megoldva (azonosító nélkül) |
| P16 | Nincs `WebSite` és `BreadcrumbList` séma | alacsony | ✅ hozzáadva |
| P17 | Nincs `site.webmanifest` | alacsony | ✅ hozzáadva |
| **P18** | **Horgony alapú útvonal → a Google számára 1 db oldal létezik** | **kritikus** | ❌ **nem oldható meg itt** |
| **P19** | **Nincs hreflang — a 3 nyelv egyetlen URL-en osztozik** | **magas** | ❌ **a P18-tól függ** |
| P20 | Nincs szövegtömörítés / cache-fejléc | magas | ❌ kiszolgáló-beállítás |

---

## 3. Elvégzett módosítások

### 3.1 Dokumentumszerkezet — a „quirks mode" megszüntetése (P1, P5)

A fájl `<meta charset>`-tel kezdődött: nem volt benne `<!DOCTYPE html>`,
`<html>`, `<head>` és `<body>`. A beágyazott előnézet ezeket maga pótolta,
ezért a hiba a próbalinken **láthatatlan volt** — önálló kiszolgálón viszont
a böngésző `document.compatMode = "BackCompat"`, azaz **quirks módba** esett:
elavult dobozmodellel és sortávolsággal számolt.

Mérve: `compatMode` `BackCompat` → `CSS1Compat`.

A `lang` attribútum eddig csak JS-ből került a `<html>`-re. Most statikusan
is ott van (`<html lang="hu">`), és a nyelvváltó továbbra is átírja.

> **Vizuális hatás:** a lábléc logója alól eltűnt egy ~11 px-es üres sáv (ez a
> quirks mód soralapvonal-hibája volt). Ezen kívül minden nézet képpontra
> azonos maradt — 14 teljes oldalas képernyőkép összehasonlítva, asztali és
> mobil nézetben egyaránt.

### 3.2 A kitalált domain eltávolítása (P3)

A JSON-LD-ben ez szerepelt:

```json
"url": "https://ludwighaus.com/"
```

**Ez az adat nem az ügyféltől származott.** Nem tudjuk, kié a `ludwighaus.com`;
ha másé, a séma egy idegen oldalra mutatott volna. Töröltem.

Helyette **egyetlen beállítási pont** került a fejlécbe:

```js
window.LH_SEO = { origin: '', gaId: '', gtmId: '' };
```

Amíg az `origin` üres, a lap **tudatosan nem ad ki** canonicalt, `og:url`-t és
abszolút képcímet. Üres érték jobb, mint kitalált: egy rossz canonical az
egész oldalt kiejtheti a találatokból.

### 3.3 Az `aggregateRating` eltávolítása (P4)

A JSON-LD 4,3-as értékelést és 136 véleményt jelölt meg. A szám maga valós —
az ügyfél régi oldaláról származik, és a lapon **ma is látható**. A
**megjelölés** viszont két okból is szabálytalan:

1. A Google strukturált adatra vonatkozó irányelve szerint a vállalkozás
   **nem jelölheti meg a saját magáról szóló** („self-serving") értékelést
   `LocalBusiness` / `LodgingBusiness` típuson.
2. A máshonnan (itt: a Google saját profiljából) összegyűjtött értékelés
   újrajelölése szintén tiltott.

Vagyis a megjelölés **nem hozott volna csillagot a találatban**, viszont
strukturált adat miatti manuális büntetést kockáztatott. A látható 4,3 / 136
az oldalon maradt — az tartalom, nem megjelölés.

### 3.4 Képek: 10,4 MB → 430 KB (P2)

Mind a 71 fotó base64 `data:` URI-ként ült a HTML-ben. Ennek minden
következménye rossz:

- a base64 **33%-kal nagyobb**, mint a bináris;
- a böngésző **minden képet letölt az első festés előtt** — a galériát, a
  házirend képeit, mind a hét nézetét;
- a képek **nem gyorsítótárazhatók** külön;
- a `loading="lazy"` értelmetlen, mert a bájtok már a dokumentumban vannak;
- a **Google Képek nem tudja indexelni** a `data:` URI-t.

A 71 képet külön fájlba emeltem (`preview/assets/img/`), WebP formátumban
(ahol a WebP nem lett kisebb, maradt az eredeti JPEG). A `<img>` elemek
változatlanok, csak a `src` mutat fájlra. A meglévő `loading="lazy"` így
végre **valóban** működik: a rejtett nézetek képei nem töltődnek le.

| | Előtte | Utána |
|---|---|---|
| HTML dokumentum | 10 151 KB | **430 KB** (gzip-pel **132 KB**) |
| Kezdőlap teljes átvitele | 10 151 KB | **~430 KB** |
| Képek (7,13 MB dekódolva) | a HTML-ben | **6,3 MB külön fájlban, igény szerint** |

### 3.5 A CLS-regresszió megtalálása és javítása (P8)

A képek kiemelése után a mért CLS **0-ról 0,146-ra romlott** (a „jó" határ
0,1). Ok: a dokumentum most fokozatosan érkezik, és **a mobil stíluslap a
fájl legvégén volt** — a böngésző 688 ms-nál már festett, a mobil szabályok
viszont csak ~2 400 ms-nál értek oda, és átrendezték a kész oldalt.

Korábban ez azért nem látszott, mert a 10 MB miatt a böngésző úgysem festett
semmit, mielőtt a fájl végére ért volna. **A régi állapot nem volt jobb —
csak egyenletesen rossz.**

Javítás: mind a 19 `<style>` blokkot a `<head>`-be mozgattam, **pontosan az
eredeti sorrendben**, így a kaszkád bitre ugyanaz maradt (14 képernyőképpel
ellenőrizve).

Eredmény: **CLS 0,146 → 0,0006**.

### 3.6 Betűtípusok saját kiszolgálóra (P11)

A három betűcsalád a Google Fonts CDN-jéről töltődött. Két okból hoztam át:

1. **Sebesség.** A külső stíluslap renderelést blokkolt — a Lighthouse
   szerint **780 ms**-ot késleltetett mobilon.
2. **Adatvédelem.** A Google Fonts beágyazása minden látogató IP-címét
   elküldi a Google-nak. A müncheni tartományi bíróság 2022-es ítélete
   (LG München I, 3 O 17493/20) szerint ez hozzájárulás nélkül sérti a
   GDPR-t. **Osztrák szálláshelynél, európai közönséggel ez valós
   kockázat** — és a lapon van adatkezelési tájékoztató is.

A fájlok a Google saját kiszolgálójáról származnak, változatlanul, csak a
`latin` és `latin-ext` részhalmazzal (a magyar `ő`/`ű` és a német
`ä`/`ö`/`ü`/`ß` is benne van). **6 variábilis fájl, összesen 186 KB**, minden
vastagságra. A betűkép azonos.

Ellenőrizve: a lap most **nulla külső kérést** indít.

### 3.7 Címek és leírások (P12)

| Nézet | Cím (kar.) | Leírás (kar.) |
|---|---|---|
| Kezdőlap | 84 → **59** | 171 → **139** |
| Szobák | 48 | 141 |
| Sípályák | 50 | 148 |
| Kikapcsolódás | 55 | 125 |
| Galéria | 49 | 111 |
| Házirend | 50 | 107 |
| Foglalás és kapcsolat | 63 → **46** | 143 |

A kezdőlap címe:
`Ludwighaus — alpesi panzió Neukirchen am Großvenedigerben, a Wildkogel-Aréna tövében`
→ `Ludwighaus — magyar panzió a Wildkogel-Arénánál, Neukirchen`

Az EN és DE fordítás is ehhez igazodik. A hosszú nézetneveknél egy
`shortTitle()` függvény 60 karakter felett rövidebb helymegjelölést használ.

### 3.8 Ikonok, manifest, robots (P9, P10, P17)

- `preview/favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png`
  (180), `icon-512.png` — a **meglévő logó síelő emblémájából**, a márka
  sötétzöld alapján. Új dizájnt nem terveztem.
- `preview/site.webmanifest`
- `preview/robots.txt` — használatra kész; a `Sitemap:` sor kommentben, mert
  abszolút címet kíván.
- `tools/generate-seo-files.mjs` — egy paranccsal kitölti mindkettőt.

### 3.9 Strukturált adat (P16)

| Séma | Állapot |
|---|---|
| `LodgingBusiness` | megvolt; `aggregateRating` és kitalált `url` **eltávolítva**, `hasMap` és `availableLanguage` **hozzáadva** |
| `WebSite` | **új** |
| `BreadcrumbList` | **új**, nézetenként frissül, nyelvet követi |

Mindhárom blokk `JSON.parse`-szal ellenőrizve mind a 7 nézeten.

### 3.10 Mérőkód helye — azonosító nélkül (P15)

Sem GA4-, sem GTM-azonosítót nem találtam ki. A beépítési hely kész és
kipróbált; `window.LH_SEO.gaId` / `.gtmId` kitöltéséig **semmi nem töltődik
be**. Ha mindkettő ki van töltve, a GTM nyer, hogy ne számoljon duplán.

Mivel a lap egy dokumentum hét nézettel, az automatikus oldalletöltés-mérés
ki van kapcsolva (`send_page_view: false`), és a router küldi nézetenként a
`window.__trackView()`-n keresztül. **Kipróbálva:** kitöltött azonosító
mellett a nézetváltás `page_view` eseményt küld.

### 3.11 Akadálymentesség (P13, P14)

- A lábléc négy `<h4>` címsora `<h2 class="foot-h">` lett (a `<h3>` hiánya
  miatt nem volt csökkenő a sorrend). Megjelenés változatlan.
- A lábléc halvány szövege 2,86:1 kontraszttal nem felelt meg a WCAG AA-nak.
  Csak a láblécre hatóan emeltem (`--foot-faint`, **5,07:1**). Visszaállítani
  egyetlen érték átírásával lehet.

Lighthouse akadálymentesség: **95 → 100**.

---

## 4. Módosított és létrehozott fájlok

| Fájl | Mi történt |
|---|---|
| `preview/ludwighause-experience.html` | **módosítva** — fejléc, dokumentumszerkezet, stíluslapok helye, képhivatkozások, router-fejlécfrissítés |
| `preview/assets/img/` (**új**, 74 fájl) | a 71 kiemelt fotó + megosztókép + 3 ikon |
| `preview/assets/fonts/` (**új**, 6 fájl) | saját kiszolgálású betűtípusok |
| `preview/favicon.ico` (**új**) | klasszikus favicon |
| `preview/site.webmanifest` (**új**) | webalkalmazás-manifest |
| `preview/robots.txt` (**új**) | keresőrobot-utasítás |
| `tools/generate-seo-files.mjs` (**új**) | robots.txt + sitemap.xml előállítása |
| `docs/seo-audit.md` (**új**) | ez a dokumentum |

**Amihez nem nyúltam:** `src/`, `public/`, `package.json`, `next.config.mjs`,
`tailwind.config.ts` — ezek a másik projekthez tartoznak. Egyetlen URL sem
változott, tehát 301-es átirányításra nincs szükség. Funkciót, komponenst,
tartalmat nem töröltem.

---

## 5. Céloldalak és keresési szándék

Fontos: ez a táblázat **ma még elvi**. Amíg a hét nézet egyetlen URL-en
osztozik (P18), a Google az egészet egy találatként kezeli.

| Nézet | Elsődleges keresési szándék | Kulcskifejezések (magyar közönség) |
|---|---|---|
| Kezdőlap | „hol szálljak meg síeléshez Ausztriában, magyarul" | ausztriai szállás síeléshez, magyar panzió Ausztria, Wildkogel szállás |
| Szobák | szobatípus, férőhely, ár összehasonlítása | Neukirchen szállás árak, apartman Wildkogel, csoportos szállás Ausztria |
| Sípályák | melyik síterep érhető el a szállásról | Wildkogel-Aréna pályák, Kitzbühel Mittersill, Zillertal Aréna sípályák |
| Kikapcsolódás | mit lehet csinálni síelésen kívül | Krimml vízesés, Hohe Tauern nemzeti park, szánkópálya Wildkogel |
| Galéria | „hogy néz ki valójában" — foglalás előtti ellenőrzés | Ludwighaus fotók, Neukirchen am Großvenediger képek |
| Házirend | foglalás utáni gyakorlati kérdések | Ludwighaus házirend, érkezés, kulcsátvétel |
| Foglalás és kapcsolat | tranzakciós szándék | Ludwighaus foglalás, Marktstraße 121 Neukirchen, teljes ház bérlés |

Német és angol nyelven ugyanez a szerkezet érvényes, de **saját URL nélkül
egyik sem versenyképes** (P19).

---

## 6. Amit NEM végeztem el, és miért

### 6.1 Valódi útvonalak a horgony helyett (P18) — a legnagyobb tétel

**A helyzet.** A hét nézet `#/szobak` alakú horgonnyal váltakozik. A Google a
`#` utáni részt eldobja. Következmény:

- **egyetlen** cím indexelhető a hétből;
- nem lehet nézetenkénti canonical;
- nem lehet hreflang (P19) — a három nyelv ugyanazon a címen van;
- a sitemap egyetlen sorból áll;
- a morzsamenü nem jelenhet meg a találatban;
- a nézetek nem szerezhetnek külön hivatkozásokat.

**Miért nem csináltam meg.** Valódi útvonalhoz (`/szobak`) a kiszolgálónak
minden ismeretlen címet az `index.html`-re kell irányítania (SPA-fallback).
Ez **kiszolgáló-beállítás**, amit nem ismerek: nem tudom, hova kerül az oldal.
Ha most átírnám az útvonalakat, és a tárhely nem tud fallbacket, **minden
aloldal 404-et adna** — a működő oldal helyett egy törött oldal.

Ez az egyetlen pont, ahol a briefben kért „ne törölj működő funkciót" és a
SEO-optimum ütközik. A működő oldal mellett döntöttem.

**Mi kell hozzá.** Amint eldől a tárhely (Emergent, Netlify, Vercel, saját
szerver):

1. A routerben a `location.hash` helyett `location.pathname` olvasása,
   `history.pushState('/szobak')`.
2. SPA-fallback a kiszolgálón (`_redirects`, `vercel.json` vagy `try_files`).
3. `tools/generate-seo-files.mjs`-ben `REAL_ROUTES = true` → 7 soros sitemap.
4. Nézetenkénti canonical és `hreflang` a három nyelvre.

Becslés: fél-egy nap. **Ez hozza a legtöbbet az összes hátralévő tétel közül.**

### 6.2 Szövegtömörítés és cache-fejlécek (P20) — kiszolgáló-beállítás

Nem a fájlban dől el. Mérve, mit ér:

| | gzip nélkül | gzip + cache-fejlécek |
|---|---|---|
| HTML átvitele | 430 KB | **132 KB** |
| Lighthouse teljesítmény | 78 | **94** |
| LCP | 4,4 s | **2,9 s** |
| FCP | 3,5 s | **1,8 s** |

Kérendő a tárhelytől: `gzip` vagy `brotli` a HTML/CSS/JS/XML fájlokra, és
`Cache-Control: public, max-age=31536000, immutable` a képekre és
betűtípusokra.

### 6.3 CSS/JS minifikálás

Szándékosan **nem** minifikáltam. A fájl kommentezett forráskód, és a
következő lépés az Emergentre portolás — a minifikált változat ott
használhatatlan. Ez a tárhely vagy a build lépés dolga, nem a forrásé.

### 6.4 Vélemények fordítása

Az EN és DE nyelven **egyetlen** magyar szöveg marad: egy vendégidézet.
Nem fordítottam le, mert az idézet szó szerinti tartalom. Ha kell, a helyes
megoldás a fordítás **plusz** egy „magyarból fordítva" jelzés — ez tartalmi
döntés, kérdezd meg az ügyfelet.

### 6.5 Amit kifejezetten tiltott a brief, és be is tartottam

- nem írtam újra a projektet, nem terveztem új dizájnt;
- nem találtam ki céges adatot, árat, garanciát, referenciát, szolgáltatást;
- nem készítettem tömeges városi/kulcsszavas aloldalakat;
- nem alkalmaztam kulcsszóhalmozást, rejtett szöveget;
- nem tettem be kitalált GA4-/GTM-azonosítót;
- nem tiltottam le `robots.txt`-ben olyan lapot, aminek `noindex`-ét a
  Google-nak fel kellene dolgoznia (a `robots.txt` erre külön figyelmeztet);
- nem töröltem működő függőséget vagy stílust.

---

## 7. Hiányzó üzleti adatok — az ügyfélnek

### 7.1 Blokkoló (enélkül nem élesíthető)

| Adat | Hova kell | Mi történik nélküle |
|---|---|---|
| **Végleges domain** | `window.LH_SEO.origin` | nincs canonical, nincs `og:url`, a megosztásnál nem látszik a kép, a sitemap nem készíthető el |
| **GA4 mérőazonosító** (`G-…`) | `window.LH_SEO.gaId` | nincs mérés |
| **GTM-azonosító** (`GTM-…`), ha van | `window.LH_SEO.gtmId` | — |
| **EmailJS kulcsok** | foglalási űrlap | az űrlap nem küld |

### 7.2 Ellentmondó adatok — mindegyiket az ügyfélnek kell eldöntenie

Ezek **nem SEO-hibák**, de az oldalon ma egyszerre két különböző állítás
szerepel, és a strukturált adatban egy konkrét értéket kellett választani.

| Kérdés | „A" változat | „B" változat | Most a sémában |
|---|---|---|---|
| Férőhely | 45 (több helyen a lapon, és az ügyfél szövege szerint a teljes ház max. 45 fő) | 47 (a hét szobatípus összege) | 45 |
| Érkezés / távozás | 16:00 / 9:30 (ÁSZF + lap) | 15:00 / 10:00 (házirend PDF) | 16:00 / 09:30 |
| Kaució (teljes ház) | €500 (ügyfél üzenete, a lapon) | €1000 (ÁSZF 10.3) | nincs a sémában |
| Lemondási feltétel | ÁSZF 8.2 | ÁSZF 8.3 (ellentmond a 8.2-nek) | nincs a sémában |
| Telefon | +36 20 597 2010 | +36 30 245 3873 (adatkezelési tájékoztató) | az első |
| E-mail | ludwighausaustria@gmail.com | ausztraisiklub@gmail.com (adatkezelési tájékoztató) | az első |
| Großvenediger magassága | 3 662 m (a lapon) | 3 666 m (források) / 3 657 m (tényleges) | nincs a sémában |

**Két további, nem SEO-jellegű, de komoly tétel:**

1. Az adatkezelési tájékoztató a sütik és a szerverlogok által kezelt adatok
   között felsorolja a **„személyazonosító igazolvány szám"**-ot. Ez
   nyilvánvalóan másolási hiba, és **jogilag kockázatos** — sütik nem
   kezelnek személyi igazolvány számot. Javítandó.
2. A vendégvélemények két ponton **ellentmondanak a lap állításainak**:
   „Főzni nem lehet a konyhában" szemben a hirdetett self-cooking konyhával,
   és két vélemény a pincei disco zaját kifogásolja, miközben a lap a disco
   belépőt előnyként sorolja. Ez foglalás utáni csalódás és rossz értékelés
   forrása. Érdemes tisztázni, mi a mai valós helyzet.

### 7.3 Hiányzó tartalom (a korábbi körökből)

- a 8 téli program mögött nincs részletes tartalom (a kártyák nem kattinthatók);
- a Szobák aloldalon a szobatípus-lista még a pontatlan változat
  (`Családi / Kétágyas / Franciaágyas / Ikerágyas / **Fürdőszoba**`) —
  a kezdőlapon ez már javítva van;
- két alacsony felbontású programfotó (500×500 és 600×335);
- nincs fotó a konyháról, a sítárolóról és csoportokról;
- a „kerékpáros szobák" ingyenes e-bike ajánlat olyan szobakategóriára
  hivatkozik, ami nem létezik.

---

## 8. Ellenőrzés és mérés

### 8.1 Amit a brief kért, és mi lett belőle

| Kért ellenőrzés | Eredmény |
|---|---|
| Lint | ✅ `npm run lint` — **hibátlan**. ⚠️ De a `sikozpont-web` projektre fut, nem a Ludwighausra: az egyetlen HTML fájlhoz nincs linter a repóban. |
| Typecheck | ✅ `npm run typecheck` — **hibátlan**. Ugyanaz a megszorítás. |
| Tesztek | ❌ **Nincs `test` script a repóban.** Nem írtam újat: a brief kifejezetten tiltotta a projekt átírását. |
| Production build | ✅ `npm run build` — **sikeres**, 18 statikus oldal. Szintén a másik projekt. |
| Publikus útvonalak | ✅ mind a 7 nézet betölt, egyedi címmel és leírással |
| Törött hivatkozás | ✅ 47 belső hivatkozás, **mind érvényes**; 0 db 404-es kérés |
| Cím/leírás/canonical/robots | ✅ ellenőrizve, lásd 3.7 |
| Sitemap | ✅ generátor kipróbálva; érvényes XML |
| Strukturált adat szintaxisa | ✅ mind a 3 blokk `JSON.parse`-olható mind a 7 nézeten |
| Mobil megjelenés | ✅ valódi mobil emuláció (`isMobile`), 7 nézet |
| Űrlap / CTA működés | ✅ JS-hiba nincs; az űrlap háttér nélkül változatlanul viselkedik |
| Dizájn változatlansága | ✅ 14 teljes oldalas képernyőkép összehasonlítva |
| Lighthouse | ✅ lefutott, lásd alább |

> **Őszintén a lint/typecheck/build sorokról:** ezek zöldek, de a Ludwighausról
> semmit nem mondanak. Az a fájl nem TypeScript, nem megy át semmilyen
> buildelésen. Amit helyettük futtattam: a 4 beágyazott `<script>` blokk
> kiemelése és `node --check`-elése, i18n-szótáraudit (duplikált kulcs,
> ütköző érték, lefedettség), és futásidejű ellenőrzés valódi böngészőben.

### 8.2 Saját ellenőrzések

| Ellenőrzés | Eredmény |
|---|---|
| JS szintaxis (4 blokk, `node --check`) | hibátlan |
| i18n szótárak | 268 EN / 273 DE bejegyzés, **0 duplikált kulcs, 0 ütköző érték** |
| Lefordítatlan szöveg EN/DE nézetben | 1 db (vendégidézet — szándékos, lásd 6.4) |
| Külső hálózati kérés | **0** (korábban 3 a Google felé) |
| Konzol- és JS-hiba | **0** |
| Képernyőkép-összehasonlítás | 14 nézet; eltérés csak a láblécben (3.1) |

### 8.3 Lighthouse (12-es verzió, mobil alapértelmezés)

| Kategória | Előtte | Utána | Utána + kiszolgáló-beállítás |
|---|---|---|---|
| Teljesítmény | 26 | 78 | **94** |
| Akadálymentesség | 95 | 100 | **100** |
| Ajánlott gyakorlatok | 0 | 100 | **100** |
| SEO | 92 | 100 | **100** |

| Mérőszám | Előtte | Utána + kiszolgáló-beállítás |
|---|---|---|
| First Contentful Paint | 52,5 s | **1,8 s** |
| Largest Contentful Paint | 102,9 s | **2,9 s** |
| Speed Index | 52,5 s | **1,8 s** |
| Total Blocking Time | 2 900 ms | **0 ms** |
| Cumulative Layout Shift | 0 | **0** |

A „kiszolgáló-beállítás" oszlop gzip-tömörítéssel és cache-fejlécekkel mért —
ez az, amit egy éles tárhelytől el kell kérni (6.2).

### 8.4 Valódi mobil emuláció (Playwright, 4× lassított CPU, Slow-4G)

| | Előtte | Utána |
|---|---|---|
| Kezdőlap betöltése | **50 365 ms** | **2 297 ms** |
| HTML dokumentum | 10 151 KB | 422 KB |
| CLS | 0 | 0,0006 |

---

## 9. Kézi teendők

### 9.1 Élesítés előtt (kód)

1. `preview/ludwighause-experience.html`, a fejléc elején:
   ```js
   window.LH_SEO = {
     origin: 'https://a-vegleges-domain.at',   // záró perjel NÉLKÜL
     gaId:   'G-XXXXXXXXXX',
     gtmId:  ''                                 // ha van GTM, ide, és a gaId maradjon üres
   };
   ```
2. `node tools/generate-seo-files.mjs https://a-vegleges-domain.at`
3. Tárhelyen: gzip/brotli + cache-fejlécek (6.2).

### 9.2 Google Search Console

1. **Tulajdon hozzáadása** — „Domain" típus, ha a DNS elérhető, különben
   „URL-előtag".
2. **Tulajdonjog igazolása** — DNS TXT rekord (domain típusnál) vagy
   HTML-fájl feltöltése.
3. **Sitemap beküldése** — Sitemaps → `sitemap.xml`.
4. **URL-ellenőrzés** a kezdőlapra → „Élő URL tesztelése" → megnézni, hogy a
   renderelt HTML-ben ott van-e a szöveg. Ez azért **kritikus**, mert az
   oldal tartalmának nagy része JavaScriptből jön: itt látod először, hogy a
   Google ugyanazt látja-e, mint a látogató.
5. **Indexelés kérése** a kezdőlapra.
6. Két hét múlva: **Oldalak** jelentés → mi indexelt, mi nem, és miért.
7. **Bing Webmaster Tools** — a Search Console-ból egy kattintással
   importálható; a magyar közönség nem elhanyagolható részét hozza.

### 9.3 Google Business Profile — a szálláshely legnagyobb helyi SEO-eszköze

A `sameAs` mezőbe felvehető, és a helyi találatokban többet ér, mint az
oldal SEO-ja. Ellenőrizd:

- a cím pontosan `Marktstraße 121, 5741 Neukirchen am Großvenediger`;
- a telefonszám és a weboldal a **véglegesített** adatokkal egyezik (7.2);
- nyitvatartás, fotók, szolgáltatások kitöltve;
- a profil a weboldalra mutat, és a weboldal `sameAs`-ban a profilra.

A weboldal és a profil közti eltérés (NAP-inkonzisztencia) a helyi
rangsorolás egyik leggyakoribb rontója — ezért lényeges a 7.2 tisztázása.

### 9.4 GA4 / GTM

1. GA4 tulajdon létrehozása → adatfolyam (Web) → mérőazonosító (`G-…`).
2. Az azonosítót a `window.LH_SEO.gaId`-be.
3. GA4-ben: **Adatfolyam → Bővített mérés** — a „Lapmegtekintések" maradhat
   bekapcsolva, a kód `send_page_view: false`-szal küld, duplázás nem lesz.
4. Ellenőrzés: GA4 → Jelentések → Valós idejű, majd kattints végig a hét
   nézeten. Mind a hétnek külön `page_path`-tal kell megjelennie.
5. Konverziónak jelöld: a foglalási űrlap elküldése, a `tel:` és a `mailto:`
   kattintás. **Ezek ma nincsenek eseményként kiküldve** — ha kell,
   egy külön körben beépíthető.

---

## 10. További javaslatok

### 10.1 Tartalom (sorrendben, hatás szerint)

1. **A 8 téli program tartalma** (7.3). Ma üres kártyák; ez egy egész
   keresési szándékcsoport, ami most nincs lefedve.
2. **Gyakori kérdések (FAQ) szekció** a foglalási oldalra. Valódi kérdésekkel,
   `FAQPage` sémával — ez a kevés séma egyike, ami szálláshelynél ma is
   hozhat kiterjesztett találatot. Az alapanyag megvan: az ÁSZF, a házirend
   és a vendégkérdések.
3. **Nézetenkénti egyedi szöveg mélyítése.** A Sípályák és a Kikapcsolódás
   nézet tartalmas; a Galéria és a Házirend szinte csak felsorolás.
4. **A 7.2 ellentmondásainak feloldása.** Nem SEO-tétel, de a mai állapot
   rossz értékeléseket termel, azok pedig a helyi rangsorolást rontják.

### 10.2 Hivatkozásépítés

Sorrendben, a legkönnyebbtől:

1. **Wildkogel-Arena és a Nationalpark Sommercard** partnerszállás-listái —
   ide szálláshelyként be lehet kerülni, ez a legtermészetesebb hivatkozás.
2. **Neukirchen am Großvenediger / Oberpinzgau turisztikai egyesület** —
   helyi szálláslista.
3. **Magyar síelős közösségek és fórumok** — a valódi célközönség.
4. **Booking / Airbnb profil** — nem közvetlen SEO-érték, de a márkanév
   keresésénél megerősítés.
5. **Magyar utazási blogok** — egy-egy valódi tapasztalatbeszámoló többet ér,
   mint tíz katalógusbejegyzés.

Amit **ne** csinálj: fizetett linkkatalógusok, linkcsere-hálózatok,
tömeges vendégposztolás. Szálláshelynél ez gyorsan büntetést hoz.

### 10.3 Technikai, később

1. **Valódi útvonalak** (6.1) — messze a legfontosabb.
2. **hreflang** a három nyelvre, amint saját URL-t kapnak.
3. **Képméretek**: ma minden kép egy méretben van. `srcset`-tel a telefonok
   feleakkora fájlt tölthetnének. A képkonténereken van `aspect-ratio`, így
   ez CLS-kockázat nélkül megtehető.
4. **`Organization` séma** külön, ha a Ludwighaus üzemeltetője önálló cég.

---

## 11. Összefoglalás

Az oldal SEO szempontból eddig **nem volt kiszolgálható**: egy 10 MB-os,
quirks módban renderelő dokumentum, amiben két valótlan adat is szerepelt a
strukturált adatban. Ez mind javítva van, méréssel igazoltan, a dizájn
érintése nélkül.

Ami marad, két csoportba esik:

- **Az ügyfélen múlik:** domain, mérőazonosítók, és a 7.2 ellentmondásainak
  eldöntése.
- **A tárhelyen múlik:** tömörítés, cache-fejlécek, és — a legfontosabb —
  a valódi útvonalak, amikkel a hét nézetből hét indexelhető oldal lesz.

Amíg az utolsó nem történik meg, a Ludwighaus a Google szemében **egyetlen
oldal marad**, bármilyen jó is minden más rajta.
