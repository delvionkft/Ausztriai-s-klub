import type { Metadata } from 'next';
import {
  BedDouble,
  Car,
  Check,
  CookingPot,
  KeyRound,
  Layers3,
  MapPin,
  Package,
  ReceiptText,
  Sofa,
  Users,
} from 'lucide-react';
import {
  accommodationBenefits,
  accommodationFacts,
  accommodationIntro,
  roomLayout,
} from '@/data/accommodation';
import { PLACEHOLDER_MEDIA } from '@/data/placeholders';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { PendingValue } from '@/components/ui/PendingValue';
import { Card } from '@/components/ui/Card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { AccommodationSubNav } from '@/components/layout/AccommodationSubNav';
import { Gallery } from '@/components/features/Gallery';

export const metadata: Metadata = {
  title: 'A vendégház',
  description:
    'Teljes ház egy csoportnak: férőhely, hálók és fürdők, sípályától való távolság, parkolás, sítároló, konyha és közös tér, alaprajz szintenként, valamint funkció szerinti galéria.',
  alternates: { canonical: routes.guesthouse },
  openGraph: { title: 'A vendégház', description: 'Teljes ház csoportoknak, a hegy lábánál.', url: routes.guesthouse },
};

const factIcons = { Users, BedDouble, MapPin, Car, Package, CookingPot, Sofa } as const;
const benefitIcons = { KeyRound, Users, ReceiptText } as const;

/**
 * 07 · A VENDÉGHÁZ
 * 01 fejléc + szállás al-navigáció .. AccommodationSubNav
 * 02 nyitószekció ................... PageHero + bullets
 * 03 gyors infósáv .................. FactsBar
 * 04 miért jó csoportnak ............ BenefitsSection
 * 05 alaprajz / ágyelrendezés ....... FloorPlanSection
 * 06 galéria funkció szerint ........ Gallery
 */
export default function GuesthousePage() {
  return (
    <>
      <AccommodationSubNav />

      <PageHero
        eyebrow={accommodationIntro.eyebrow}
        title={accommodationIntro.title}
        description={accommodationIntro.lead}
        mediaKey="guesthouse-hero"
        size="md"
        actions={
          <>
            <PrimaryButton href={routes.availability} size="lg" variant="onDark">
              Szabad időpontok
            </PrimaryButton>
            <SecondaryButton href={routes.quote} size="lg" tone="dark">
              Ajánlatot kérek
            </SecondaryButton>
          </>
        }
      />

      {/* 03 · GYORS INFÓSÁV — CSAK PONTOS ADATTAL */}
      <Section tone="alpine" spacing="sm" labelledBy="gyorsinfo-cim">
        <h2 id="gyorsinfo-cim" className="sr-only">
          Gyors információk
        </h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {accommodationFacts.map((fact) => {
            const Icon = factIcons[fact.icon as keyof typeof factIcons] ?? Users;
            return (
              <div key={fact.id} className="rounded-card border border-deep-100 bg-white p-4">
                <Icon aria-hidden="true" className="h-5 w-5 text-glacier-600" />
                <dd className="mt-2 text-[1.05rem] font-bold text-deep-900">
                  <PendingValue value={fact.value} hint={`${fact.label} megadása szükséges`} />
                </dd>
                <dt className="mt-0.5 text-[0.75rem] font-medium text-deep-500">{fact.label}</dt>
              </div>
            );
          })}
        </dl>
        <p className="mt-4 text-xs text-deep-500">
          Ezeket az adatokat szándékosan nem találjuk ki. A szállásadó megadása után automatikusan itt jelennek meg.
        </p>
      </Section>

      <Section tone="white" spacing="sm">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {accommodationIntro.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 rounded-card border border-deep-100 bg-frost px-4 py-3.5">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
              <span className="text-sm font-medium text-deep-800">{bullet}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 04 · MIÉRT JÓ CSOPORTNAK — ELŐNYÖK, NEM SZOBÁK */}
      <Section tone="default" labelledBy="elonyok-cim">
        <SectionHeading
          id="elonyok-cim"
          eyebrow="Miért jó csoportnak"
          title="Nem szobákat adunk el, hanem egy egyszerűbb síutat"
        />
        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {accommodationBenefits.map((benefit) => {
            const Icon = benefitIcons[benefit.icon as keyof typeof benefitIcons] ?? KeyRound;
            return (
              <Card as="li" key={benefit.id} className="h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-deep-800 text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-h3">{benefit.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-deep-600">{benefit.description}</p>
              </Card>
            );
          })}
        </ul>
      </Section>

      {/* 05 · ALAPRAJZ / ÁGYELRENDEZÉS */}
      <Section tone="white" labelledBy="alaprajz-cim">
        <SectionHeading
          id="alaprajz-cim"
          eyebrow="Alaprajz"
          title="Szintek és szobabeosztás"
          description="A szintstruktúra adott, a helyiségnevek és ágyszámok a szállásadó adatai alapján töltődnek fel."
        />

        <div className="mt-6 space-y-4">
          {roomLayout.map((floor) => (
            <div key={floor.id} className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-[1rem] font-bold uppercase tracking-[0.08em] text-deep-700">
                <Layers3 aria-hidden="true" className="h-4 w-4 text-glacier-600" />
                {floor.floor}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {floor.rooms.map((room) => (
                  <li
                    key={room.id}
                    className="rounded-card border border-dashed border-deep-200 bg-frost px-4 py-3.5"
                  >
                    <p className="font-semibold text-deep-900">
                      <PendingValue value={room.name} hint="Helyiség megnevezése megadásra vár" />
                    </p>
                    <p className="mt-1 text-sm text-deep-600">
                      <PendingValue value={room.beds} suffix=" ágy" hint="Ágyszám megadása szükséges" />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-4 rounded-lg bg-frost px-4 py-3 text-sm text-deep-600">
          {PLACEHOLDER_MEDIA.floorplan}
        </p>
      </Section>

      {/* 06 · GALÉRIA — FUNKCIÓ SZERINTI SORRENDBEN */}
      <Section tone="default" labelledBy="galeria-cim">
        <SectionHeading
          id="galeria-cim"
          eyebrow="Galéria"
          title="Nézd meg a házat"
          description="Közös terek, hálószobák, fürdő és konyha, sítároló, végül a külső."
        />
        <div className="mt-6">
          <Gallery />
        </div>
      </Section>

      <Section tone="white" spacing="sm">
        <div className="flex flex-col items-center gap-4 rounded-panel border border-deep-100 bg-frost px-6 py-8 text-center">
          <h2 className="text-h2">Megnézed, mikor szabad?</h2>
          <p className="max-w-md text-deep-600">
            A foglaltsági naptárban azonnal látod a szabad időpontokat, és egy kattintással ajánlatot kérhetsz rá.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={routes.availability} size="lg">
              Szabad időpontok
            </PrimaryButton>
            <SecondaryButton href={routes.quote} size="lg">
              Ajánlatot kérek
            </SecondaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
