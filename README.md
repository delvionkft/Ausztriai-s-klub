# Síközpont weboldal — frontend

Prémium, alpesi hangulatú síközponti weboldal. A teljes felület **magyar nyelvű**,
és a mellékelt „Szerkezeti és Logikai felépítés” drótváz **mind a 13 sablonját**
megvalósítja (12 útvonal + a globális fejléc/lábléc/mobil réteg).

Jelenleg **működő frontend demó**: nincs backend, minden adat szerkeszthető
adatfájlokból jön, és minden integrációs pont jelölve van a kódban.

---

## 1. Technológiai felépítés

| Réteg | Megoldás | Miért |
|---|---|---|
| Keretrendszer | **Next.js 15** (App Router) | Statikus generálás, jó Core Web Vitals |
| Nyelv | **TypeScript 5** (`strict`) | Az adatmodell szerződésként viselkedik |
| Stílus | **Tailwind CSS 3.4** | Design tokenek egy fájlban (`tailwind.config.ts`) |
| Ikonok | **lucide-react** | Egységes, könnyű ikonkészlet |
| Animáció | CSS keyframe-ek (`tailwind.config.ts`) | Framer Motion nem kellett — kevesebb JS, gyorsabb oldal |
| Build | `next build` — minden oldal statikus (`○ Static`) | Bárhol futtatható |

> **Framer Motionről:** a briefben feltételesen szerepelt („amennyiben
> indokolt”) — végül **nem használjuk**, ezért nincs is a függőségek között.
> A finom mozgásokat (`fade-up`, `fade-in`, `pulse-dot`, `shimmer`) CSS
> keyframe-ekkel oldottuk meg: így ~40 kB-tal kevesebb JS töltődik, és a
> `prefers-reduced-motion` beállítás automatikusan érvényesül. Ha később
> bonyolultabb animáció kell, egy `npm i framer-motion` bármikor hozzáadja.

### Indítás

```bash
npm install
cp .env.example .env.local     # opcionális, a demó enélkül is fut
npm run dev                    # http://localhost:3000
```

Egyéb parancsok:

```bash
npm run build      # production build
npm run start      # production szerver
npm run lint       # ESLint
npm run typecheck  # TypeScript ellenőrzés
```

---

## 2. Oldalak és útvonalak

Az útvonalak egyetlen helyen vannak definiálva: **`src/data/navigation.ts` → `routes`**.
A kódban sehol nincs beégetett link.

| # | Drótváz | Útvonal | Fájl |
|---|---|---|---|
| 01 | Kezdőlap | `/` | `src/app/page.tsx` |
| 02 | Hójelentés | `/hojelentes` | `src/app/hojelentes/page.tsx` |
| 03 | Pályatérkép | `/palyaterkep` | `src/app/palyaterkep/page.tsx` |
| 04 | Felvonók, nyitvatartás, webkamerák | `/felvonok` | `src/app/felvonok/page.tsx` |
| 05 | Jegyek és bérletek | `/jegyek` | `src/app/jegyek/page.tsx` |
| 06 | Síiskola és kölcsönző | `/siiskola` | `src/app/siiskola/page.tsx` |
| 07 | A vendégház | `/vendeghaz` | `src/app/vendeghaz/page.tsx` |
| 08 | Csoportoknak | `/csoportoknak` | `src/app/csoportoknak/page.tsx` |
| 09 | Árak és szabad időpontok | `/arak-es-szabad-idopontok` | `src/app/arak-es-szabad-idopontok/page.tsx` |
| 10 | Ajánlatkérés | `/ajanlatkeres` | `src/app/ajanlatkeres/page.tsx` |
| 11 | Élmény és nyári üzem | `/elmeny` | `src/app/elmeny/page.tsx` |
| 12 | Megközelítés, GYIK, kapcsolat | `/informacio` | `src/app/informacio/page.tsx` |
| 13 | Fejléc, lábléc, mobil | *(globális réteg, nem útvonal)* | `src/components/layout/` |

Kiegészítő útvonalak: `not-found.tsx` (404), `error.tsx` + `global-error.tsx`
(hibahatárok), `loading.tsx`, `sitemap.ts`, `robots.ts`, `icon.svg`.

Minden oldal `page.tsx`-e **vékony**: csak összerakja a szekciókat, és megadja a
saját `metadata` blokkját. Az üzleti logika soha nem az oldalban van.

---

## 3. Központi komponensek

```
src/components/
├── layout/      SiteShell · Header · MobileNavigation · LiveStatusBar
│                Footer · StickyMobileCTA · LanguageSwitcher
│                AccommodationSubNav · Logo
├── ui/          PrimaryButton · SecondaryButton · AccentButton · StatusBadge
│                SectionHeading · Section · Card · PageHero · Media
│                AlpineScene · PendingValue · DemoNotice
│                States (Skeleton / LoadingBlock / EmptyState / ErrorState)
├── features/    LiftCard · LiftList · SlopeRow · SlopeList · WebcamCard
│                WebcamGrid · EventCard · AccommodationCard · SlopeMap
│                AvailabilityCalendar · PriceCalculator · TicketAdvisor
│                SeasonalPriceCalendar · QuoteForm · FAQAccordion
│                ContactActions · NewsletterForm · Gallery · MapEmbed
│                StatGrid · ProcessSteps / ProgressTracker · ForecastPanel
│                ExperienceGrid
└── sections/    Oldalankénti szekció-összeállítások (home/, accommodation/)
```

Támogató rétegek:

| Mappa | Tartalom |
|---|---|
| `src/types/` | A teljes adatmodell (`index.ts`) — ez a szerződés a backend felé |
| `src/lib/` | Keretrendszer-független tiszta logika: `pricing.ts`, `availability.ts`, `date.ts`, `format.ts`, `cn.ts` |
| `src/services/` | API réteg: `apiClient.ts`, `statusService.ts`, `bookingService.ts`, `ticketService.ts`, `newsletterService.ts` |
| `src/hooks/` | `useAsyncData`, `useLocale`, `useMediaQuery`, `useLockBodyScroll` |

---

## 4. Szerkeszthető adatok — hol mit írj át

**Minden tartalom a `src/data/` mappában van. Szöveg vagy adat módosításához
komponenst NEM kell megnyitni.**

| Fájl | Mit tartalmaz |
|---|---|
| `site.config.ts` | Síközpont neve, régió, magasságok, pályahossz, SEO alapok, nyelvek |
| `navigation.ts` | Útvonalak, főmenü (6 pont), szállás al-navigáció, lábléc oszlopok |
| `status.ts` | **Élő státusz** (nyitva/zárva, hó, hőmérséklet, felvonó/pálya számok), hójelentés, 3 napos előrejelzés |
| `lifts.ts` | Felvonók: név, típus, státusz, üzemidő, műszaki adatok |
| `slopes.ts` | Pályák: név, nehézség, státusz, hossz, hóágyúzás, esti síelés |
| `webcams.ts` | Webkamerák és képforrásaik |
| `tickets.ts` | Jegytípusok, **árak**, szezonsávok, kedvezmények |
| `openingHours.ts` | Napi nyitvatartás, esti síelés, szezonkezdés/-zárás |
| `events.ts` | Események és hírek |
| `experiences.ts` | Téli/nyári élménykártyák, gasztronómia |
| `accommodation.ts` | Vendégház: gyors infók, előnyök, alaprajz, csoporttípusok, folyamat, feltételek |
| `availability.ts` | Foglaltság (foglalt/opciós időszakok), **szállásárak**, kaució, min. éjszaka |
| `gallery.ts` | Galéria képei kategóriánként |
| `reviews.ts` | Vendégvélemények |
| `faq.ts` | GYIK kérdések és válaszok |
| `contact.ts` | Telefon, e-mail, cím, GPS, térkép, közösségi média, odajutás, dokumentumok |
| `skischool.ts` | Síiskola, oktatók, csomag, felszereléslista, kölcsönző/szerviz/depó |
| `homepage.ts` | Kezdőlapi szövegek: napi üzenet, szándékválasztó, ajánlat, hóriasztó |
| `media.ts` | **Képek központi nyilvántartása** — ide kell beírni a valós fotók útvonalát |
| `placeholders.ts` | **Helyőrző szövegek + a demó mód kapcsolója** |
| `../i18n/hu.ts` · `de.ts` · `en.ts` | **Fordítások** — nyelvenként külön fájl |

### Fotók beillesztése

1. Tedd a képet a `public/images/` mappába.
2. `src/data/media.ts`-ben írd be az útvonalat:
   ```ts
   'home-hero': { src: '/images/hero-tel.jpg', alt: '…', scene: 'day', hint: '…' },
   ```
3. Kész — a `Media` komponens automatikusan a valós képet mutatja optimalizálva
   (lazy loading, AVIF/WebP). Amíg `src: null`, dizájnolt alpesi helyőrző jelenik meg.

---

## 5. Mock adat vs. valódi integráció

### Amit szándékosan NEM találtunk ki

A drótváz szabálya szerint **üzleti adatot nem generálunk**. Ezek a mezők `null`
értéken állnak, és a felületen kulturált helyőrző (`—` + magyarázó címke) jelenik meg:

- síközpont neve, régió, ország, cím, GPS, telefonszám, e-mail
- pályahossz, szintkülönbség, felvonók száma, hóágyúzott arány
- felvonók kapacitása, hossza, szintkülönbsége
- pályák hossza és szintkülönbsége
- vendégház férőhelye, szobái, ágyszámai, sípálya-távolsága, parkolója
- foglalási feltételek (max. létszám, fizetési ütem, lemondás, be-/kijelentkezés)
- kedvezmények mértéke, kölcsönzési és csomagárak
- oktatók neve, vendégvélemények szövege
- esemény-időpontok, szezonkezdés és -zárás, jogi dokumentumok

### Amihez demó adatot használunk (mert enélkül nem bemutatható)

Ezeket a felület **láthatóan jelöli** („demó” címke, `DemoNotice` sáv):

| Mi | Hol | Miért |
|---|---|---|
| Hó, hőmérséklet, felvonó-/pályaszámok | `status.ts` | hogy az élő státuszsáv értelmezhető legyen |
| Jegyárak, szezonsávok | `tickets.ts` | hogy a jegyajánló számoljon |
| Szállásárak, foglaltság | `availability.ts` | hogy a naptár és az árkalkulátor működjön |
| Felvonók/pályák státusza és üzemideje | `lifts.ts`, `slopes.ts` | hogy a szűrők és a térkép működjenek |

**A demó jelzés kikapcsolása:** `src/data/placeholders.ts` → `DEMO_DATA_ENABLED = false`.

### Ami frontend-demóként működik (nincs mögötte backend)

| Funkció | Mit csinál most | Fájl |
|---|---|---|
| Ajánlatkérő űrlap | Validál, sikerállapotot mutat — **az adat nem hagyja el a böngészőt** | `services/bookingService.ts` |
| Hóriasztó feliratkozás | Validál, visszaigazol — nem küld sehova | `services/newsletterService.ts` |
| Jegyvásárlás | A „Vásárlás” gomb **letiltva**, magyarázó szöveggel | `services/ticketService.ts` |
| Foglaltsági naptár | A `data/availability.ts`-ből számol | `lib/availability.ts` |
| Árkalkuláció | Tiszta függvények a demó árazásból | `lib/pricing.ts` |
| Nyelvválasztó | **Működik**: DE/EN/HU szótárak, azonnali váltás, mentett választás | `src/i18n/` |
| Mérés (GA4/GTM) | Az események a `window.dataLayer`-be mennek; GTM-konténer csak `NEXT_PUBLIC_GTM_ID` esetén tölt be | `lib/analytics.ts` |
| Süti-hozzájárulás | Működik, `localStorage`-ban tárol; mérés csak elfogadás után indul | `lib/consent.ts` |
| Pályatérkép | **Sematikus ábra**, nem valós domborzat; kattintható elemek a valós adatmodellből | `features/SlopeMap.tsx` |
| PDF letöltés / offline mentés | Gombok letiltva, amíg nincs végleges térképfájl | `features/SlopeMap.tsx` |

---

## 5/b. Háromnyelvű működés (DE / EN / HU)

```
src/i18n/
├── hu.ts              referencia nyelv — innen származik a TranslationKey típus
├── de.ts              német
├── en.ts              angol
├── index.ts           getDictionary() · createTranslator() — React-mentes mag
└── I18nProvider.tsx   React context: locale, setLocale, t()
```

**Használat komponensben:**

```tsx
const { t, locale, setLocale } = useI18n();
<button>{t('cta.buyTickets')}</button>   // HU: Jegyvásárlás · DE: Tickets kaufen · EN: Buy tickets
```

**Új szöveg felvétele:** írd be a kulcsot a `hu.ts`-be — a TypeScript ettől
kezdve *hibát jelez*, amíg a `de.ts` és `en.ts` is meg nem kapja. Így nyelv
nem maradhat ki csendben. Futásidőben a hiányzó kulcs a magyar szövegre esik
vissza, tehát a felület soha nem lesz üres.

**Mi van lefordítva:** a globális keret — fejléc, főmenü és almenük, élő
státuszsáv, lábléc, mobil menü, fix mobil CTA-sáv, nyelvválasztó, süti-sáv,
általános állapotüzenetek (betöltés / hiba / üres). **Az oldaltörzsek szövege
egyelőre magyar**, és a nyelvválasztó ezt meg is mondja (`lang.partial`) —
nem hazudik teljes fordítást. A bővítés mechanikus: a szöveg átkerül az
adatfájlból vagy a komponensből egy `t()` kulcs mögé.

**Nyelvenkénti URL-ek:** jelenleg egy URL-készlet van, a nyelv kliensoldali.
Ha SEO-hoz nyelvenkénti útvonal kell (`/de/…`, `/en/…`), a `layout.tsx`
`alternates.languages` blokkját és a `sitemap.ts`-t kell bővíteni — a szótárak
változatlanul használhatók.

---

## 5/c. Mérés — GA4 / Google Tag Manager

Minden esemény a `window.dataLayer`-be kerül, ezért **GTM-ben elég `event`
triggert felvenni a névre** — a kódot nem kell módosítani.

`.env.local` → `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`. Amíg üres, az események
ugyanúgy lefutnak és a `dataLayer`-ben ellenőrizhetők a konzolból:

```js
window.dataLayer.map(e => e.event)
```

| # | Esemény (GA4 név) | Mikor | Hol |
|---|---|---|---|
| 1 | `begin_ticket_purchase` | Jegyvásárlás CTA (fejléc, mobil menü, mobil sáv, jegyajánló) | `Header`, `MobileNavigation`, `StickyMobileCTA`, `TicketAdvisor` |
| 2 | `view_recommended_ticket` | A jegyajánló minden válaszváltozásakor | `TicketAdvisor` |
| 3 | `open_slope_map` | Pályatérkép megnyitása, pálya/felvonó kiválasztása | `SlopeMap` |
| 4 | `view_webcam` | A webkamera-kártya ténylegesen látszik (IntersectionObserver) | `WebcamCard` |
| 5 | `begin_ski_school_booking` | „Időpontot foglalok” | `app/siiskola` + `TrackedCTA` |
| 6 | `select_dates` | Teljes időszak kiválasztása a naptárban | `AvailabilityCalendar` |
| 7 | `submit_quote_request` | Sikeres ajánlatkérés — **a fő konverzió** | `QuoteForm` |
| 8 | `click_phone` | Telefonlink | `ContactActions`, `Footer`, `MobileNavigation` |
| 9 | `click_whatsapp` | WhatsApp-link | `ContactActions`, `StickyMobileCTA` |
| 10 | `click_email` | E-mail-link | `ContactActions`, `Footer` |
| 11 | `subscribe_snow_alert` | Sikeres hóértesítő-feliratkozás | `NewsletterForm` |
| 12 | `change_language` | Nyelvváltás (`from_language` → `to_language`) | `I18nProvider` |
| + | `consent_update` | Süti-döntés (Consent Mode v2 jelzés) | `lib/analytics.ts` |
| + | `begin_quote_request` | Ajánlatkérés megkezdése (mikrokonverzió) | `StickyMobileCTA` |

> A 8–10. esemény kódja készen áll, de a gombok **letiltva** maradnak, amíg a
> `data/contact.ts`-ben nincs valós telefonszám / e-mail / WhatsApp-szám.

---

## 5/d. Süti- és adatvédelmi réteg

- **Alapértelmezés: minden nem szükséges kategória tiltott.** Amíg nincs
  döntés, `trackEvent()` semmit nem küld, és a GTM-konténer sem töltődik be.
- Az „Elfogadom” és a „Csak a szükségeseket” **egyenrangú gomb** (nincs sötét minta).
- A „Beállítások” panelen az analitika és a marketing külön kapcsolható.
- A döntés `localStorage`-ban tárolódik **időbélyeggel** (GDPR-bizonyíthatóság).
- A `CONSENT_VERSION` növelése újra bekéri a hozzájárulást — ezt kell tenni,
  ha a süti-tájékoztató érdemben változik.
- A lábléc **„Süti-beállítások”** gombja bármikor újranyitja a döntést.
- Az „Adatkezelési tájékoztató” link a `data/contact.ts` → `legalDocuments`
  tömbből jön; amíg nincs feltöltve, helyőrző szöveg jelenik meg link helyett.

Fájlok: `lib/consent.ts` (React-mentes), `hooks/useConsent.ts`,
`components/layout/CookieConsent.tsx`, `components/layout/AnalyticsScripts.tsx`.

---

## 5/e. Strukturált adatok (schema.org / JSON-LD)

| Séma | Hol | Tartalom |
|---|---|---|
| `WebSite` | minden oldal | név, URL, nyelvek |
| `SkiResort` | minden oldal | név, leírás, kép + **csak a kitöltött** elérhetőség, cím, GPS, közösségi linkek |
| `LodgingBusiness` | `/vendeghaz` | a vendégház mint szálláshely |
| `FAQPage` | `/informacio` | a teljes GYIK |
| `ItemList` / `Event` | `/elmeny` | **csak a dátummal kihirdetett** események |
| `BreadcrumbList` | `/informacio`, `/vendeghaz` | morzsamenü |

A `lib/structuredData.ts` `prune()` függvénye **minden `null` mezőt kidob**,
ezért kitalált üzleti adat nem kerülhet a strukturált adatba. Ellenőrzés:

```bash
curl -s http://localhost:3000/informacio | grep -o 'application/ld+json'
```

---

## 6. Környezeti változók

Lásd **`.env.example`** — másold `.env.local` néven.

| Változó | Kell? | Mire |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ajánlott | kanonikus linkek, sitemap, Open Graph |
| `NEXT_PUBLIC_API_BASE_URL` | backendhez | ha ki van töltve, a service réteg éles hívásokat indít |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | opcionális | beágyazott térkép |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | opcionális | webanalitika |
| `NEXT_PUBLIC_GTM_ID` | méréshez | GTM-konténer; csak süti-elfogadás után tölt be |
| `NEXT_PUBLIC_GA4_ID` | opcionális | GA4 közvetlen bekötéshez (GTM nélkül) |
| `EMAIL_API_KEY`, `EMAIL_TO` | szerveroldali | ajánlatkérés továbbítása |
| `TICKETING_API_KEY` | szerveroldali | online jegyértékesítés |
| `BOOKING_API_KEY` | szerveroldali | foglalási rendszer / channel manager |
| `WEATHER_API_KEY` | szerveroldali | hó- és időjárásadatok |

> API-kulcs, jelszó vagy titok **soha nem kerül a kódba**, és titkos érték nem
> kaphat `NEXT_PUBLIC_` előtagot — az a böngészőbe is eljut.

---

## 7. Emergentben bekötendő funkciók

A frontend úgy készült, hogy a backend bekötése **egyetlen komponenst se
érintsen**. Minden hívás a `src/services/` rétegen megy át, és a
visszatérési típusok a `src/types/index.ts`-ben rögzítettek.

| Sorrend | Funkció | Endpoint javaslat | Hol kell átírni |
|---|---|---|---|
| 1 | **Ajánlatkérés** (a legnagyobb üzleti érték) | `POST /quote-requests` | `services/bookingService.ts` → `submitQuoteRequest()` |
| 2 | **Foglaltság** | `GET /availability` | `services/bookingService.ts` → `getAvailability()` |
| 3 | **Élő státusz + hójelentés** | `GET /status/live`, `/status/snow`, `/status/forecast` | `services/statusService.ts` |
| 4 | **Felvonók / pályák / webkamerák** | `GET /lifts`, `/slopes`, `/webcams` | `services/statusService.ts` |
| 5 | **Jegyek és árak** | `GET /tickets`, `POST /checkout` | `services/ticketService.ts` (+ `ONLINE_CHECKOUT_ENABLED = true`) |
| 6 | **Hóriasztó feliratkozás** | `POST /newsletter/subscribe` | `services/newsletterService.ts` |
| 7 | **Admin felület** | a `src/data/*` fájlok tartalma → adatbázistábla | típusok készen: `src/types/index.ts` |

A gyakorlati lépés minden service-ben ugyanaz:

```ts
// ELŐTTE (demó)
return mockDelay(liveStatus);

// UTÁNA (éles)
return apiFetch<LiveStatus>('/status/live');
```

Az `apiClient.ts` a `NEXT_PUBLIC_API_BASE_URL` alapján automatikusan felismeri,
van-e backend (`HAS_BACKEND`).

---

## 8. Amit migráláskor módosítani kell

A projekt szándékosan kerüli a nehezen átvihető Next.js-specifikus megoldásokat:
**nincs** Server Action, nincs API route, nincs middleware, nincs `next-intl`,
nincs ISR/revalidate. A komponensek szabványos React + TypeScript fájlok.

Ha az Emergent nem Next.js alatt fut (pl. Vite/CRA + React Router):

| Fájl / téma | Teendő | Nehézség |
|---|---|---|
| `src/app/**/page.tsx` | Route-komponensekké alakítani (React Router). A **tartalom változatlanul átvihető** — a `page.tsx`-ek csak szekciókat állítanak sorba. | kicsi |
| `next/link` | Cseréld `react-router-dom` `<Link>`-re. Érintett: `Button.tsx`, `Card.tsx`, `Header.tsx`, `Footer.tsx`, `MobileNavigation.tsx`, `AccommodationSubNav.tsx`, `StickyMobileCTA.tsx`, `Logo.tsx`, `IntentSelector.tsx` | kicsi, mechanikus |
| `next/image` | **Csak a `src/components/ui/Media.tsx`-et érinti** — cseréld sima `<img loading="lazy">`-re. | 1 fájl |
| `usePathname()` | `useLocation().pathname`. Érintett: `Header`, `MobileNavigation`, `StickyMobileCTA`, `AccommodationSubNav` | kicsi |
| `useSearchParams()` | `react-router-dom` `useSearchParams` (majdnem azonos API). Érintett: `sections/accommodation/QuoteSection.tsx` | 1 fájl |
| `export const metadata` | Cseréld `react-helmet`-re vagy a rendszer saját SEO megoldására. A szövegek a `page.tsx`-ekben, oldalanként megvannak. | kicsi |
| `app/sitemap.ts`, `app/robots.ts` | Töröld, és generálj statikus `public/sitemap.xml` + `public/robots.txt` fájlt a `routes` objektumból. | kicsi |
| `error.tsx`, `global-error.tsx`, `loading.tsx`, `not-found.tsx` | React `ErrorBoundary` + útvonal-fallback. A megjelenés átvihető. | kicsi |
| `'use client'` direktívák | Egyszerűen eltávolíthatók. | triviális |
| `src/data/`, `src/lib/`, `src/types/`, `src/hooks/`, `src/services/` | **Nem igényel módosítást** — tiszta TypeScript, nincs benne Next.js. | nincs |
| `src/i18n/` | A szótárak és az `index.ts` változatlan. Az `I18nProvider.tsx`-ből csak a `'use client'` sor törlendő. | triviális |
| `lib/analytics.ts`, `lib/consent.ts`, `lib/structuredData.ts` | **Nem igényel módosítást** — tiszta TypeScript. | nincs |
| `AnalyticsScripts.tsx` | `usePathname()` → `useLocation().pathname`. | 1 sor |
| `components/seo/JsonLd.tsx` | SPA alatt `react-helmet` `<script>` gyerekeként, azonos adattal. | 1 fájl |
| `src/components/ui/`, `features/`, `sections/` | A fentieken (Link/Image) túl **nem igényel módosítást**. | nincs |

**Gyakorlati becslés:** a migráció a fájlok kevesebb mint 15%-át érinti, és
lényegében import-cserékből áll. Az üzleti logika (`lib/`), az adatmodell
(`types/`), az adatok (`data/`) és a service réteg (`services/`) változatlanul
átemelhető.

### Két Tailwind buktató, amibe már belefutottunk

Ha a stílusokon dolgozol, érdemes tudni:

1. **Az opacitás-módosító csak 5-ös lépésekben létezik** (`/70`, `/75`, `/80`…).
   A `bg-white/8` vagy `from-deep-950/88` **egyáltalán nem generál CSS-t**, és
   némán eltűnik. Maradj az 5-tel osztható értékeknél.
2. **Ütköző utility-osztályokat ne fűzz össze.** A `cn('bg-white text-deep-900', selected && 'bg-deep-800 text-white')`
   kimenete a CSS sorrendjétől függ, nem a felsorolástól — így lett egyszer
   láthatatlan a kiválasztott nap a naptárban. Használj **egymást kizáró,
   teljes osztálysorokat** (lásd `AvailabilityCalendar.tsx` → `cellClass()`),
   vagy adj a komponensnek `variant` propot (lásd `Button.tsx` → `variant="onDark"`).

---

## Minőségbiztosítás — mi lett ellenőrizve

- `npm run lint` — 0 hiba, 0 figyelmeztetés
- `npm run typecheck` — 0 hiba (`strict`, `noUnusedLocals`, `noUnusedParameters`)
- `npm run build` — sikeres, mind a 13 útvonal statikusan generálva
- Mind a 12 útvonal + 404 HTTP 200/404 státusszal válaszol
- **Vízszintes görgetés: nincs** — 375 px, 768 px és 1440 px szélességen ellenőrizve
- **Kontraszt:** minden hero címsor 6,4:1 felett; a felület szövegei WCAG AA felett
  (pixelmintavételes méréssel is ellenőrizve a képre/áttetsző sávra írt szövegeknél)
- **34 automatizált interakciós teszt** (mobilmenü, nyelvváltás, szűrők,
  térképrétegek, jegyajánló, naptár, árkalkuláció, űrlapvalidáció és -beküldés,
  GYIK, galéria, hóriasztó, billentyűzetes navigáció)
- **30 további automatizált teszt** az új rétegekre: süti-sáv megjelenése és
  elrejtése, részleges hozzájárulás mentése, kapcsoló egérrel és billentyűzettel,
  mérési események tiltása hozzájárulás előtt és után, mind a 12 esemény
  kiváltása, HU→DE→EN váltás a fejlécben / státuszsávban / láblécben, a nyelv
  megőrzése oldalváltáskor, `<html lang>` állítása, JSON-LD jelenléte és
  tartalma (kitalált adat nélkül)
- Minden oldalon pontosan egy `<h1>`, egyedi `title` és `description`
- Nincs üres vagy `#`-re mutató link; a hiányzó elérhetőségek letiltott,
  magyarázó címkés gombként jelennek meg
