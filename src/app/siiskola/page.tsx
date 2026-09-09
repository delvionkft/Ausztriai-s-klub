import type { Metadata } from 'next';
import { Backpack, CalendarCheck, Check, Languages, Lock, Package, Wrench } from 'lucide-react';
import {
  instructors,
  packageOffer,
  rentalCategories,
  skiSchoolIntro,
  whatToBring,
} from '@/data/skischool';
import { routes } from '@/data/navigation';
import { formatCurrency } from '@/lib/format';
import { currency } from '@/data/tickets';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { PendingValue } from '@/components/ui/PendingValue';
import { Card } from '@/components/ui/Card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Síiskola és kölcsönző',
  description:
    'Kezdőknek is érthetően: oktatás, gyerekpark, kezdőcsomag jegy + oktatás + felszerelés, oktatók nyelvtudással, felszereléslista, kölcsönző, szerviz és depó.',
  alternates: { canonical: routes.skiSchool },
  openGraph: { title: 'Síiskola és kölcsönző', description: 'Oktatás, kölcsönző, szerviz és depó.', url: routes.skiSchool },
};

const rentalIcons = { Package, Wrench, Lock } as const;

/**
 * 06 · SÍISKOLA ÉS KÖLCSÖNZŐ
 * 02 hero — kezdő nyelvezet ..... PageHero + IntroBlock
 * 03 csomagajánlat .............. PackageSection
 * 04 oktatók .................... InstructorsSection
 * 05 „Mit hozzak magammal?” ..... WhatToBringSection
 * 06 kölcsönzés, szerviz, depó .. RentalSection
 */
export default function SkiSchoolPage() {
  return (
    <>
      <PageHero
        eyebrow={skiSchoolIntro.eyebrow}
        title={skiSchoolIntro.title}
        description={skiSchoolIntro.lead}
        mediaKey="school-hero"
        size="md"
        actions={
          <>
            <PrimaryButton
              href={routes.quote}
              size="lg" variant="onDark"
              icon={<CalendarCheck aria-hidden="true" className="h-[18px] w-[18px]" />}
            >
              Időpontot foglalok
            </PrimaryButton>
            <SecondaryButton href="#kolcsonzo" size="lg" tone="dark">
              Kölcsönző és szerviz
            </SecondaryButton>
          </>
        }
      />

      <Section tone="alpine" spacing="sm">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skiSchoolIntro.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 rounded-card border border-deep-100 bg-white px-4 py-3.5">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
              <span className="text-sm font-medium text-deep-800">{bullet}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 03 · CSOMAGAJÁNLAT */}
      <Section tone="white" labelledBy="csomag-cim">
        <div className="overflow-hidden rounded-panel border border-glacier-200 bg-glacier-50/60">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-glacier-600 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white">
                Kezdőcsomag
              </span>
              <h2 id="csomag-cim" className="mt-3 text-h1">
                {packageOffer.title}
              </h2>
              <p className="mt-3 max-w-prose text-[0.98rem] leading-relaxed text-deep-700">
                {packageOffer.description}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {packageOffer.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-deep-800">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-white bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-deep-500">Csomagár</p>
              <p className="mt-1.5 text-3xl font-bold text-deep-900">
                {packageOffer.price === null ? (
                  <PendingValue value={null} hint="Csomagár megadása szükséges" />
                ) : (
                  formatCurrency(packageOffer.price, currency)
                )}
              </p>
              <p className="mt-1 text-xs text-deep-500">{packageOffer.priceNote}</p>
              <PrimaryButton href={routes.quote} size="lg" fullWidth className="mt-5">
                Foglalás
              </PrimaryButton>
              <p className="mt-2 text-center text-xs text-deep-500">
                Az online foglalás bekötéséig az ajánlatkérőn keresztül tudsz időpontot egyeztetni.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 04 · OKTATÓK */}
      <Section tone="default" labelledBy="oktatok-cim">
        <SectionHeading
          id="oktatok-cim"
          eyebrow="Oktatók"
          title="Ki fog tanítani?"
          description="Az oktatók neve és bemutatkozása a síiskola adatszolgáltatása után kerül fel."
        />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <Card as="li" key={instructor.id} className="flex h-full flex-col p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-50 text-lg font-bold text-deep-500">
                ?
              </span>
              <h3 className="mt-3.5 font-semibold text-deep-900">
                <PendingValue value={instructor.name} hint="Oktató nevének megadása szükséges" />
              </h3>

              <dl className="mt-3 flex-1 space-y-3 text-sm">
                <div>
                  <dt className="flex items-center gap-1.5 text-xs text-deep-500">
                    <Languages aria-hidden="true" className="h-3.5 w-3.5" />
                    Nyelvek
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1">
                    {instructor.languages.map((language) => (
                      <span key={language} className="rounded-pill bg-frost px-2.5 py-1 text-xs font-medium text-deep-700">
                        {language}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-deep-500">Oktatási szint</dt>
                  <dd className="mt-1 flex flex-wrap gap-1">
                    {instructor.levels.map((level) => (
                      <span key={level} className="rounded-pill bg-glacier-50 px-2.5 py-1 text-xs font-medium text-glacier-700">
                        {level}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Card>
          ))}
        </ul>
      </Section>

      {/* 05 · „MIT HOZZAK MAGAMMAL?” */}
      <Section tone="white" labelledBy="csomaglista-cim">
        <SectionHeading
          id="csomaglista-cim"
          eyebrow="Gyakorlati lista"
          title="Mit hozzak magammal?"
          description="A felszerelést helyben ki tudod bérelni — ezek azok, amiket érdemes otthonról hoznod."
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whatToBring.map((item) => (
            <li key={item.id} className="flex items-start gap-3 rounded-card border border-deep-100 bg-white p-4">
              <Backpack aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
              <div>
                <p className="font-semibold text-deep-900">{item.label}</p>
                <p className="mt-0.5 text-sm text-deep-600">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 06 · KÖLCSÖNZÉS, SZERVIZ, DEPÓ */}
      <Section tone="default" labelledBy="kolcsonzo-cim" id="kolcsonzo">
        <SectionHeading
          id="kolcsonzo-cim"
          eyebrow="Szolgáltatások"
          title="Kölcsönző, szerviz és depó"
          description="Az árak a szolgáltató végleges árlistájának megérkezése után jelennek meg."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {rentalCategories.map((category) => {
            const Icon = rentalIcons[category.icon as keyof typeof rentalIcons] ?? Package;
            return (
              <Card key={category.id} className="flex h-full flex-col p-5 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-glacier-50 text-glacier-600">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-h3">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep-600">{category.description}</p>

                <dl className="mt-4 flex-1 divide-y divide-deep-100 border-t border-deep-100">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-baseline justify-between gap-3 py-2.5">
                      <dt className="text-sm text-deep-800">{item.label}</dt>
                      <dd className="shrink-0 text-sm font-semibold text-deep-900">
                        {item.price === null ? (
                          <PendingValue value={null} hint="Ár megadása szükséges" />
                        ) : (
                          formatCurrency(item.price, currency)
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
