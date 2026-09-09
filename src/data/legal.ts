import type { LegalSection } from '@/components/sections/LegalPage';
import { contactInfo, fullAddress, legalEntity } from './contact';
import { fees, guesthouse } from './accommodation';

/**
 * ============================================================================
 *  JOGI SZÖVEGEK  —  ÉLESÍTÉS ELŐTT JOGÁSZI ELLENŐRZÉS SZÜKSÉGES
 * ============================================================================
 *  A szerkezet és a szakaszok készen állnak. Az üzemeltető jogi képviselője
 *  ezeket a szövegeket hagyja jóvá, illetve pontosítja a saját adatokkal.
 * ============================================================================
 */

export const LEGAL_UPDATED_AT = '2025. november 3.';

export const houseRules: LegalSection[] = [
  {
    heading: 'Bejelentkezés és kijelentkezés',
    paragraphs: [
      `Az érkezés ${guesthouse.checkIn} órától lehetséges, a távozás ${guesthouse.checkOut} óráig. Korábbi érkezést vagy későbbi távozást előzetes egyeztetés után, a foglaltság függvényében tudunk vállalni.`,
      'A kulcsot személyesen adjuk át. Késői érkezés esetén kulcsszéfet biztosítunk, amelynek kódját az érkezés napján küldjük el.',
    ],
  },
  {
    heading: 'A ház használata',
    list: [
      `A házat legfeljebb ${guesthouse.maxGuests} fő használhatja. A bejelentett létszámon felüli vendég csak előzetes egyeztetéssel tartózkodhat a házban.`,
      'A ház teljes területén tilos a dohányzás. A teraszon van kijelölt dohányzóhely, hamutartóval.',
      'Nyílt láng használata kizárólag a nappali kandallójában megengedett, a mellékelt használati útmutató szerint.',
      '22:00 és 07:00 között csendes pihenőidő van érvényben. A szomszédos épületek lakóit ez a rend is védi.',
      'A sífelszerelést a fűtött sítárolóban kérjük elhelyezni, a lakótérbe nem vihető be.',
    ],
  },
  {
    heading: 'Kaució és károkozás',
    paragraphs: [
      `A foglaláshoz ${fees.depositEur} euró kaució tartozik, amelyet érkezéskor kérünk, és távozáskor — a ház átadását követően — visszaadunk.`,
      'A rendeltetésszerű használatból eredő kopás nem minősül kárnak. Bármilyen sérülést vagy meghibásodást kérünk azonnal jelezni, hogy javítani tudjuk.',
    ],
  },
  {
    heading: 'Állatok',
    paragraphs: [
      `Kutyát előzetes egyeztetéssel fogadunk, éjszakánként ${fees.petFeePerNightEur} euró díjjal. A hálószobákba és a szaunába nem vihető be, a nappaliban és a teraszon szabadon tartózkodhat.`,
    ],
  },
  {
    heading: 'Biztonság',
    list: [
      'A ház füstérzékelőkkel és szén-monoxid-érzékelővel felszerelt. A menekülési útvonalak minden szinten ki vannak jelölve.',
      'Tűzoltó készülék a földszinti folyosón és a konyhában található.',
      'Vészhelyzet esetén az európai segélyhívó szám a 112, a hegyi mentőszolgálat száma a 140.',
    ],
  },
  {
    heading: 'Távozás',
    list: [
      'Kérjük, hogy a szemetet a kijelölt konténerekbe, szelektíven helyezzétek el.',
      'A használt edényeket kérjük elmosogatva vagy a mosogatógépben hagyni.',
      'A bútorokat kérjük az eredeti helyükre visszatenni. Az ágyneműt nem kell lehúzni.',
    ],
  },
];

export const privacyPolicy: LegalSection[] = [
  {
    heading: 'Az adatkezelő',
    paragraphs: [
      `${legalEntity.companyName}, székhely: ${fullAddress}. Kapcsolat: ${contactInfo.email}, telefon: ${contactInfo.phone}.`,
      'Az adatkezelés az Európai Unió általános adatvédelmi rendelete (GDPR) és az osztrák adatvédelmi törvény (DSG) szerint történik.',
    ],
  },
  {
    heading: 'Milyen adatokat kezelünk?',
    list: [
      'Ajánlatkérés esetén: név, e-mail-cím, telefonszám, tervezett időpont, létszám, csoporttípus és a megjegyzés mezőben megadott információk.',
      'Hóértesítő feliratkozás esetén: e-mail-cím és a feliratkozás időpontja.',
      'A weboldal használatakor: technikai naplóadatok (IP-cím rövidített formában, böngészőtípus, a megtekintett oldalak), kizárólag üzemeltetési és biztonsági célból.',
    ],
  },
  {
    heading: 'Az adatkezelés célja és jogalapja',
    list: [
      'Ajánlatkérés feldolgozása és a szerződés előkészítése — jogalap: a szerződés megkötését megelőző lépések (GDPR 6. cikk (1) b).',
      'Hóértesítő küldése — jogalap: az érintett hozzájárulása (GDPR 6. cikk (1) a), amely bármikor visszavonható.',
      'A weboldal biztonságos üzemeltetése — jogalap: jogos érdek (GDPR 6. cikk (1) f).',
      'Számviteli bizonylatok megőrzése — jogalap: jogi kötelezettség (GDPR 6. cikk (1) c).',
    ],
  },
  {
    heading: 'Meddig őrizzük az adatokat?',
    list: [
      'Ajánlatkérés, ha nem születik foglalás: 12 hónap.',
      'Létrejött foglalás esetén a számviteli bizonylatokat a jogszabályi kötelezettségnek megfelelően 7 évig őrizzük.',
      'Hóértesítő: a leiratkozásig, illetve a hozzájárulás visszavonásáig.',
    ],
  },
  {
    heading: 'Adatfeldolgozók',
    paragraphs: [
      'Az adatokat tárhelyszolgáltató, e-mail-szolgáltató, valamint — hírlevél esetén — a hírlevélküldő rendszer üzemeltetője kezelheti a mi megbízásunkból, kizárólag az Európai Gazdasági Térségen belül vagy megfelelő garanciák mellett.',
      'Harmadik félnek marketing célból adatot nem adunk át és nem értékesítünk.',
    ],
  },
  {
    heading: 'Az érintett jogai',
    list: [
      'Tájékoztatáshoz és hozzáféréshez való jog.',
      'Helyesbítéshez és törléshez való jog.',
      'Az adatkezelés korlátozásához való jog és tiltakozási jog.',
      'Adathordozhatósághoz való jog.',
      'A hozzájárulás bármikori visszavonásának joga, amely a visszavonás előtti adatkezelés jogszerűségét nem érinti.',
      `Panasz benyújtásának joga az osztrák adatvédelmi hatóságnál (Österreichische Datenschutzbehörde). Kérésedet a ${contactInfo.email} címen is jelezheted.`,
    ],
  },
];

export const cookiePolicy: LegalSection[] = [
  {
    heading: 'Mi a süti?',
    paragraphs: [
      'A süti kis adatfájl, amelyet a böngésződ tárol. Segítségével a weboldal megjegyzi a beállításaidat, és mérni tudjuk a használatot.',
    ],
  },
  {
    heading: 'Milyen sütiket használunk?',
    list: [
      'Működéshez szükséges tárolás: a kiválasztott nyelvet a böngésződ helyi tárolójában őrizzük, hogy oldalváltáskor és frissítés után is megmaradjon. Ez az adat nem hagyja el az eszközödet.',
      'Statisztikai sütik: a látogatottság mérésére, kizárólag a hozzájárulásod után. Ezek beállítása a mérőrendszer bekötésekor lép életbe.',
      'Marketingsütit jelenleg nem használunk.',
    ],
  },
  {
    heading: 'Hogyan kezelheted a sütiket?',
    paragraphs: [
      'A böngésződ beállításaiban bármikor törölheted a tárolt adatokat, és letilthatod a sütik elhelyezését. A működéshez szükséges tárolás letiltása esetén a nyelvválasztás nem marad meg oldalváltáskor.',
    ],
  },
];

export const termsOfService: LegalSection[] = [
  {
    heading: 'A szolgáltató',
    paragraphs: [
      `${legalEntity.companyName}, székhely: ${fullAddress}, cégjegyzékszám: ${legalEntity.registrationNumber}, adószám: ${legalEntity.vatNumber}.`,
    ],
  },
  {
    heading: 'Felvonójegyek',
    list: [
      'A jegy a rajta feltüntetett érvényességi időn belül, a nyitva tartó felvonókra jogosít fel. A jegy másra át nem ruházható.',
      'Ha a felvonók műszaki vagy időjárási okból két óránál hosszabb ideig állnak, a napijegy árának időarányos részét jóváírjuk. A jóváírást a jegy felmutatásával, még aznap lehet igényelni a pénztárnál.',
      'A pályák és felvonók használata mindenki saját felelősségére történik, a helyszínen kihelyezett pályarend betartása mellett.',
      'A lezárt pályákon és a jelzett lezárásokon túl a mentés nem garantálható.',
    ],
  },
  {
    heading: 'Szállásfoglalás',
    list: [
      `A ${guesthouse.name} a teljes ház bérbeadásával foglalható, legfeljebb ${guesthouse.maxGuests} fő részére.`,
      'A foglalás akkor válik véglegessé, amikor a visszaigazolt ajánlat alapján a 30% előleg beérkezik. A fennmaradó összeg az érkezés előtt 14 nappal esedékes.',
      'Lemondás érkezés előtt 60 napig díjmentes; 60 és 30 nap között az előleget, 30 napon belül a teljes összeg 50 százalékát számítjuk fel.',
      'Ha a síterep az érkezés napján hóhiány miatt nem üzemel, a foglalás díjmentesen lemondható vagy áttehető.',
    ],
  },
  {
    heading: 'Síiskola és kölcsönző',
    list: [
      'Az oktatási időpontok lemondása a kezdés előtt 48 óráig díjmentes.',
      'A kölcsönzött felszerelésért a bérlő felel. A rendeltetésszerű használatból eredő kopás nem minősül kárnak.',
      'A kötésbeállítás a megadott testsúly és tudásszint alapján, jegyzőkönyvvel történik.',
    ],
  },
  {
    heading: 'Panaszkezelés',
    paragraphs: [
      `Panaszt a ${contactInfo.email} címen vagy a ${contactInfo.phone} telefonszámon lehet bejelenteni. A panaszt 30 napon belül kivizsgáljuk és írásban válaszolunk.`,
      'Fogyasztói jogvita esetén az Európai Bizottság online vitarendezési platformja is igénybe vehető.',
    ],
  },
];

export const imprint: LegalSection[] = [
  {
    heading: 'Az üzemeltető adatai',
    list: [
      `Cégnév: ${legalEntity.companyName}`,
      `Székhely: ${fullAddress}`,
      `Cégjegyzékszám: ${legalEntity.registrationNumber}`,
      `Nyilvántartó bíróság: ${legalEntity.court}`,
      `Adószám: ${legalEntity.vatNumber}`,
      `Ügyvezető: ${legalEntity.managingDirector}`,
      `Telefon: ${contactInfo.phone}`,
      `E-mail: ${contactInfo.email}`,
    ],
  },
  {
    heading: 'Hatóság és kamarai tagság',
    list: [
      `Felügyeleti hatóság: ${legalEntity.supervisoryAuthority}`,
      `Kamarai tagság: ${legalEntity.chamber}`,
      'Tevékenység: kötélpálya-üzemeltetés, szálláshely-szolgáltatás, síoktatás és felszereléskölcsönzés.',
    ],
  },
  {
    heading: 'Felelősség a tartalomért',
    paragraphs: [
      'A weboldal tartalmát a lehető legnagyobb gondossággal állítjuk össze. A hó-, időjárás- és üzemállapot-adatok tájékoztató jellegűek; a hegyen kihelyezett tábla és a pénztári tájékoztatás az irányadó.',
      'A külső hivatkozások tartalmáért az adott oldal üzemeltetője felel.',
    ],
  },
  {
    heading: 'Szerzői jog',
    paragraphs: [
      'A weboldalon szereplő szövegek, grafikák és fotók szerzői jogi védelem alatt állnak. Felhasználásuk kizárólag előzetes írásbeli engedéllyel lehetséges.',
    ],
  },
];
