import type { MountainPoi, Slope } from '@/types';

/**
 * ============================================================================
 *  SÍPÁLYÁK  —  ITT CSERÉLD A PÁLYAADATOKAT
 * ============================================================================
 *  A `path` mező az interaktív pályatérkép SVG-nyomvonala (viewBox 0 0 1200 800).
 *  Végleges térkép esetén elég ezeket a nyomvonalakat lecserélni; a felület,
 *  a rétegvezérlés és az információs panel változatlanul működik.
 * ============================================================================
 */
export const slopes: Slope[] = [
  {
    id: 'silberabfahrt', number: '1', name: 'Silberabfahrt',
    difficulty: 'blue', lengthM: 4200, verticalM: 980, status: 'groomed',
    snowmaking: true, floodlit: false, lastGroomed: '05:40',
    description: {
      hu: 'A síterep gerincpályája: a csúcsállomástól egészen a völgyig vezet, végig széles nyomvonalon. Kezdők számára is bátran vállalható, mert a meredekebb szakaszokat hosszú, lankás átvezetők bontják meg.',
      de: 'Die Leitabfahrt des Gebiets: vom Gipfel durchgehend breit bis ins Tal. Auch für Anfänger machbar, da lange flache Passagen die steileren Abschnitte unterbrechen.',
      en: "The area's signature run: wide all the way from the summit to the valley. Manageable for beginners thanks to long flat sections between the steeper pitches.",
    },
    path: 'M 600 118 C 566 190 540 250 520 316 C 498 388 508 452 552 500 C 596 548 574 606 520 646 C 462 690 400 706 336 724',
    labelAt: { x: 512, y: 404 },
  },
  {
    id: 'gratweg', number: '2', name: 'Gratweg',
    difficulty: 'blue', lengthM: 2600, verticalM: 420, status: 'open',
    snowmaking: true, floodlit: false, lastGroomed: '05:55',
    description: {
      hu: 'Panorámás gerincút a csúcsállomástól a középállomásig. A legkényelmesebb lecsúszás, ha csak a kilátásért mentél fel — menet közben a teljes völgy belátható.',
      de: 'Aussichtsreiche Gratabfahrt vom Gipfel zur Mittelstation. Die bequemste Variante, wenn du nur wegen der Aussicht hinauffährst.',
      en: 'A panoramic ridge run from the summit to the mid station. The easiest way down if you rode up just for the view.',
    },
    path: 'M 606 124 C 660 176 700 226 716 288 C 730 344 692 386 636 410 C 592 428 560 424 536 418',
    labelAt: { x: 706, y: 300 },
  },
  {
    id: 'almwiese', number: '3', name: 'Almwiese',
    difficulty: 'blue', lengthM: 1400, verticalM: 180, status: 'groomed',
    snowmaking: true, floodlit: true, lastGroomed: '06:10',
    description: {
      hu: 'Széles, lankás családi pálya a középállomás alatt. Itt tanul meg a legtöbb gyerek kanyarodni, és esti síelésre is ez a pálya van kivilágítva.',
      de: 'Breite, flache Familienpiste unterhalb der Mittelstation. Hier lernen die meisten Kinder das Kurvenfahren, abends beleuchtet.',
      en: 'A wide, gentle family slope below the mid station. Where most children learn to turn, and floodlit for night skiing.',
    },
    path: 'M 512 452 C 470 492 434 528 420 570 C 406 612 400 656 386 700',
    labelAt: { x: 418, y: 566 },
  },
  {
    id: 'kinderland', number: '4', name: 'Kinderland',
    difficulty: 'blue', lengthM: 400, verticalM: 40, status: 'open',
    snowmaking: true, floodlit: true, lastGroomed: '06:20',
    description: {
      hu: 'Elkerített gyerekpark szőnyegfelvonóval, hullámpályával és bójakapukkal. A síiskola kezdő csoportjai itt kezdik az első napot.',
      de: 'Abgegrenztes Kinderland mit Zauberteppich, Wellenbahn und Toren. Hier starten die Anfängergruppen der Skischule.',
      en: 'A fenced-off kids area with a magic carpet, wave track and gates. Where ski-school beginner groups start day one.',
    },
    path: 'M 296 690 C 276 704 262 716 254 730 C 248 740 250 748 258 754',
    labelAt: { x: 252, y: 716 },
  },
  {
    id: 'nordhang', number: '5', name: 'Nordhang',
    difficulty: 'red', lengthM: 2900, verticalM: 610, status: 'groomed',
    snowmaking: true, floodlit: false, lastGroomed: '05:30',
    description: {
      hu: 'Északi fekvésű, egész nap árnyékos pálya — itt marad meg a legtovább a porhó. Egyenletesen meredek, jó ritmusú kanyarokkal.',
      de: 'Nordseitige, ganztägig schattige Piste — hier hält sich der Pulverschnee am längsten. Gleichmäßig steil mit gutem Kurvenrhythmus.',
      en: 'A north-facing slope in shade all day — where the powder lasts longest. Evenly steep with a good rhythm of turns.',
    },
    path: 'M 588 128 C 536 186 484 236 448 300 C 412 364 420 420 464 466 C 496 500 500 528 486 556',
    labelAt: { x: 434, y: 348 },
  },
  {
    id: 'sonnenhang', number: '6', name: 'Sonnenhang',
    difficulty: 'red', lengthM: 2400, verticalM: 520, status: 'open',
    snowmaking: true, floodlit: false, lastGroomed: '05:45',
    description: {
      hu: 'Déli fekvésű, napsütötte pálya a Falkeneck oldalán. Délelőtt a legjobb, délutánra puhul a hó — hosszú, lendületes ívekre való.',
      de: 'Sonnige Südhangpiste an der Falkeneck-Flanke. Vormittags am besten, nachmittags wird der Schnee weich.',
      en: 'A sunny south-facing run on the Falkeneck flank. Best in the morning; the snow softens by afternoon.',
    },
    path: 'M 700 168 C 754 222 796 274 806 336 C 816 396 786 442 736 476 C 700 500 682 528 678 560',
    labelAt: { x: 800, y: 366 },
  },
  {
    id: 'falkenrinne', number: '7', name: 'Falkenrinne',
    difficulty: 'red', lengthM: 1900, verticalM: 430, status: 'open',
    snowmaking: false, floodlit: false, lastGroomed: '05:50',
    description: {
      hu: 'Szűkebb, kanyargós vályúpálya a sziklafal mellett. Nem hóágyúzott, ezért csak természetes hó esetén tartjuk nyitva — hóesés után viszont ez a kedvenc.',
      de: 'Enge, kurvige Rinne entlang der Felswand. Nicht beschneit, daher nur bei Naturschnee offen — nach Schneefall aber die schönste.',
      en: 'A narrow, winding gully along the rock face. Not covered by snowmaking, so open on natural snow only — but the favourite after a snowfall.',
    },
    path: 'M 812 220 C 852 268 878 316 872 366 C 866 414 838 442 806 464',
    labelAt: { x: 876, y: 320 },
  },
  {
    id: 'steilhang', number: '8', name: 'Steilhang',
    difficulty: 'black', lengthM: 1600, verticalM: 520, status: 'open',
    snowmaking: true, floodlit: false, lastGroomed: '05:20',
    description: {
      hu: 'A síterep legmeredekebb ratrakolt pályája, 62%-os maximális lejtéssel. Reggel, kemény hóban tapasztalt síelőknek való.',
      de: 'Die steilste präparierte Piste im Gebiet mit bis zu 62% Gefälle. Am Morgen bei hartem Schnee nur für erfahrene Fahrer.',
      en: "The area's steepest groomed run, up to 62% gradient. In the morning, on hard snow, for experienced skiers only.",
    },
    path: 'M 566 132 C 528 184 494 226 480 274 C 466 322 478 356 508 384',
    labelAt: { x: 476, y: 250 },
  },
  {
    id: 'direttissima', number: '9', name: 'Direttissima',
    difficulty: 'black', lengthM: 2100, verticalM: 640, status: 'closed',
    snowmaking: false, floodlit: false, lastGroomed: '—',
    description: {
      hu: 'Közvetlen esésvonalú versenypálya a gerincről. Csak versenynapokon és stabil hóviszonyok mellett nyitjuk meg; jelenleg zárva.',
      de: 'Direkte Falllinien-Rennstrecke vom Grat. Nur an Renntagen und bei stabilen Verhältnissen offen; derzeit gesperrt.',
      en: 'A direct fall-line race course from the ridge. Open only on race days and in stable conditions; currently closed.',
    },
    path: 'M 640 130 C 646 200 650 268 640 334 C 632 388 610 420 580 444',
    labelAt: { x: 654, y: 244 },
  },
  {
    id: 'waldabfahrt', number: '10', name: 'Waldabfahrt',
    difficulty: 'red', lengthM: 3100, verticalM: 560, status: 'groomed',
    snowmaking: true, floodlit: false, lastGroomed: '06:00',
    description: {
      hu: 'Erdei nyiladékon vezető pálya a középállomástól a völgyig. Szeles napokon ez a legvédettebb lecsúszás, és ködben is jól látható.',
      de: 'Waldschneise von der Mittelstation ins Tal. An windigen Tagen die geschützteste Abfahrt, auch bei Nebel gut sichtbar.',
      en: 'A forest-cut run from the mid station to the valley. The most sheltered descent on windy days and clearly visible in fog.',
    },
    path: 'M 560 470 C 596 520 606 570 588 616 C 570 662 522 692 462 712 C 420 726 384 730 350 732',
    labelAt: { x: 580, y: 578 },
  },
  {
    id: 'panorama', number: '11', name: 'Panoramaabfahrt',
    difficulty: 'blue', lengthM: 3400, verticalM: 600, status: 'groomed',
    snowmaking: true, floodlit: false, lastGroomed: '06:05',
    description: {
      hu: 'Hosszú, kényelmes lecsúszás a keleti völgybe, végig kilátással a szemközti gerincre. A leglátványosabb kék pálya a terepen.',
      de: 'Lange, bequeme Abfahrt ins Ostal mit durchgehendem Blick auf den gegenüberliegenden Grat. Die schönste blaue Piste im Gebiet.',
      en: 'A long, comfortable descent into the eastern valley with a constant view of the opposite ridge. The most scenic blue run here.',
    },
    path: 'M 726 300 C 786 348 838 396 862 456 C 886 516 900 574 926 626 C 944 662 954 682 962 696',
    labelAt: { x: 878, y: 496 },
  },
  {
    id: 'ostabfahrt', number: '12', name: 'Ostabfahrt',
    difficulty: 'red', lengthM: 2700, verticalM: 540, status: 'open',
    snowmaking: true, floodlit: false, lastGroomed: '05:35',
    description: {
      hu: 'A keleti völgy fő pályája, széles és jól karbantartott. A völgyállomásnál csatlakozik a síbuszmegállóhoz és a hüttéhez.',
      de: 'Hauptpiste des Ostals, breit und gut präpariert. An der Talstation Anschluss an Skibus und Hütte.',
      en: 'The main run of the eastern valley, wide and well maintained. It links to the ski bus stop and the hut at the base.',
    },
    path: 'M 808 340 C 852 396 888 448 902 508 C 916 568 946 620 998 662',
    labelAt: { x: 908, y: 470 },
  },
  {
    id: 'silbergrat-route', number: '13', name: 'Silbergrat Skiroute',
    difficulty: 'skiroute', lengthM: 2300, verticalM: 700, status: 'open',
    snowmaking: false, floodlit: false, lastGroomed: '—',
    description: {
      hu: 'Jelzett, de nem ratrakolt szabadterepi útvonal a gerinc mögötti medencén át. Lavinafelszerelés és helyismeret szükséges; indulás előtt nézd meg a lavinajelentést.',
      de: 'Markierte, aber unpräparierte Skiroute durch das Kar hinter dem Grat. LVS-Ausrüstung und Ortskenntnis erforderlich.',
      en: 'A marked but ungroomed off-piste route through the bowl behind the ridge. Avalanche equipment and local knowledge required.',
    },
    path: 'M 618 120 C 690 150 748 190 776 246 C 802 300 780 344 736 372 C 700 394 686 420 690 448',
    labelAt: { x: 780, y: 262 },
  },
  {
    id: 'talabfahrt', number: '14', name: 'Talabfahrt',
    difficulty: 'red', lengthM: 2200, verticalM: 380, status: 'preparing',
    snowmaking: true, floodlit: false, lastGroomed: '—',
    description: {
      hu: 'A völgybe vezető záró szakasz, alacsonyabb fekvésben. Enyhébb időben ez a pálya nyit legkésőbb — most hóágyúzás és előkészítés alatt áll.',
      de: 'Der abschließende Talabschnitt in tieferer Lage. Bei milder Witterung öffnet diese Piste zuletzt — aktuell in Beschneiung.',
      en: 'The closing valley section at lower altitude. In mild weather this run opens last — currently being snow-covered and prepared.',
    },
    path: 'M 470 590 C 442 634 410 668 372 692 C 340 712 314 724 292 736',
    labelAt: { x: 404, y: 664 },
  },
];

/** Térképi pontok — éttermek, hütték, szolgáltatások, lezárt terület. */
export const mountainPois: MountainPoi[] = [
  {
    id: 'gipfelrestaurant', name: 'Gipfelrestaurant 2140', kind: 'restaurant',
    at: { x: 618, y: 104 },
    description: {
      hu: 'Panorámaétterem a csúcsállomáson, 180 férőhellyel és körbefutó napozóterasszal.',
      de: 'Panoramarestaurant an der Bergstation mit 180 Plätzen und umlaufender Sonnenterrasse.',
      en: 'Panorama restaurant at the summit station with 180 seats and a wrap-around sun terrace.',
    },
    openingHours: '09:00 – 16:00',
  },
  {
    id: 'almhuette', name: 'Almhütte Silberbach', kind: 'hut',
    at: { x: 494, y: 448 },
    description: {
      hu: 'Hagyományos hütte a középállomás mellett — házi gulyás, kaiserschmarrn és nagy faasztalok csoportoknak.',
      de: 'Traditionelle Hütte bei der Mittelstation — hausgemachtes Gulasch, Kaiserschmarrn und große Holztische.',
      en: 'A traditional hut by the mid station — home-made goulash, Kaiserschmarrn and long wooden tables.',
    },
    openingHours: '09:30 – 16:30',
  },
  {
    id: 'osthuette', name: 'Osthütte', kind: 'hut',
    at: { x: 946, y: 640 },
    description: {
      hu: 'Kisebb hütte a keleti völgyállomásnál, gyors ebédhez és forró italokhoz.',
      de: 'Kleinere Hütte an der Ost-Talstation, für schnelles Mittagessen und heiße Getränke.',
      en: 'A smaller hut at the eastern base station, for a quick lunch and hot drinks.',
    },
    openingHours: '10:00 – 16:00',
  },
  {
    id: 'skischule', name: 'Síiskola találkozópont', kind: 'ski-school',
    at: { x: 306, y: 700 },
    description: {
      hu: 'A csoportok reggeli gyülekezőhelye a gyerekpark bejáratánál, 09:45-től.',
      de: 'Treffpunkt der Gruppen am Eingang zum Kinderland, ab 09:45 Uhr.',
      en: 'Morning meeting point for groups at the entrance to the kids area, from 09:45.',
    },
  },
  {
    id: 'verleih', name: 'Kölcsönző és szerviz', kind: 'rental',
    at: { x: 334, y: 748 },
    description: {
      hu: 'Felszereléskölcsönzés, méretbeállítás és élezés a völgyállomás épületében.',
      de: 'Verleih, Einstellung und Schliff im Gebäude der Talstation.',
      en: 'Equipment rental, binding setup and edge tuning inside the base station building.',
    },
    openingHours: '08:00 – 17:00',
  },
  {
    id: 'parkplatz', name: 'Völgyállomás parkoló', kind: 'parking',
    at: { x: 274, y: 764 },
    description: {
      hu: '420 ingyenes parkolóhely, 12 elektromos töltővel. Csúcsnapokon a felső parkoló is megnyílik.',
      de: '420 kostenlose Parkplätze, 12 mit E-Ladestation. An Spitzentagen öffnet zusätzlich der obere Parkplatz.',
      en: '420 free parking spaces, 12 with EV chargers. The upper car park also opens on peak days.',
    },
  },
  {
    id: 'sperre-nordkar', name: 'Lezárt terület — Nordkar', kind: 'closed-area',
    at: { x: 400, y: 214 },
    description: {
      hu: 'Lavinaveszély miatt lezárt medence. A jelzett lezáráson túl a mentés nem garantálható.',
      de: 'Wegen Lawinengefahr gesperrtes Kar. Jenseits der Absperrung ist keine Rettung gewährleistet.',
      en: 'Bowl closed due to avalanche risk. Beyond the marked closure, rescue cannot be guaranteed.',
    },
  },
];
