# Ludwighause — élményoldal (új, önálló felület)

Ez a felület **nem** a repóban lévő korábbi síközpont-frontend része. Önálló,
egyfájlos, függőség nélküli oldal, kifejezetten a Ludwighause ügyfélnek.

- Forrás: `preview/ludwighause-experience.html`
- Külső függőség: kizárólag a Google Fonts (Bricolage Grotesque, Manrope, JetBrains Mono).
  Nincs React, nincs bundler, nincs képfájl — a látvány canvasból generálódik.

## A koncepció

**A görgetés = emelkedés.** Az oldal egyetlen folyamatos felkapaszkodás a
völgyállomástól (940 m) a gerincig (2 340 m). Ezt három dolog viszi:

1. **Magasságfüggő paletta.** A háttér nem statikus: fenyves-éjszakából kék órán
   át felhő feletti fehérbe vált. A szövegszín, a keretek és az akcentus ehhez
   igazodva fordul át — a lap a végén *világosabb és hidegebb*, nem sötétebb.
2. **Magasságmérő (jobb szél).** Élő méterérték + az aktuális hegyzóna neve.
3. **Parallaxis gerincek + hóesés.** Egyetlen canvas, négy generált gerincréteg.
   A hóesés a csúcs közelében elfogy — a felhők fölé érsz.

## Komponenshatárok (Emergent-portoláshoz)

A HTML-ben minden szekció `<!-- KOMPONENS: Név -->` jelöléssel kezdődik, a JS-ben
ugyanezek a nevek IIFE-blokkokként szerepelnek. A leképezés mechanikus:

| Blokk | Szerep | React megfelelő |
|---|---|---|
| `AlpineScene` | háttér canvas (gerinc + hó) | `<AlpineScene/>` + `useEffect` rAF |
| `AltitudeRail` | fix magasságmérő | `<AltitudeRail progress/>` |
| `Nav` | tapadó fejléc, mozgás-kapcsoló | `<Nav/>` |
| `Hero` | belépő, élő státusz chipek | `<Hero data/>` |
| `LiveConditions` | műszerfal + előrejelzés + lavinaskála | `<LiveConditions report/>` |
| `Pistes` + `ElevationProfile` | pályakártyák (3D dőlés) + szelvény | `<Pistes items/>` |
| `Lifts` | felvonótábla | `<Lifts items/>` |
| `Gallery` | három generatív látkép | `<Gallery/>` — canvas fotóra cserélhető |
| `TicketCalculator` | árlista + megtérülés-számoló | `<TicketCalculator prices/>` |
| `GuesthouseScene` | éjszakai látkép + CTA | `<Guesthouse/>` |
| `Footer` | lábléc | `<Footer/>` |

Az összes tartalom a JS elején, az **1. ADAT** blokkban van (`RESORT`, `PISTES`,
`LIFTS`, `TICKETS`). Portoláskor ez lesz a props / API-válasz; a komponensek nem
tartalmaznak beégetett adatot.

## Teljesítmény és hozzáférhetőség

- Egyetlen `requestAnimationFrame` ciklus hajt minden mozgást (`onTick`).
- A canvas háttér lapfül-váltáskor megáll; a szelvényrajz `IntersectionObserver`-re vár.
- Hópehely-szám a képernyőterülethez skálázódik (26–110), DPR 2-re vágva.
- `prefers-reduced-motion` automatikusan kikapcsolja a mozgást, **és** a fejlécben
  van kézi „Mozgás: be/ki" kapcsoló.
- Billentyűzet-fókusz látható, a 3D dőlés csak egérrel aktív (érintésen nem).
- Nincs vízszintes görgetés; a táblázat saját `overflow-x` konténerben van.

## Adatok

Minden szám **demó érték**, az oldalon láthatóan jelölve (`Demó` sávok).
Éles adat az 1. ADAT blokk cseréjével kerül be, komponensmódosítás nélkül.
