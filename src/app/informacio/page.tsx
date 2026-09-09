import type { Metadata } from 'next';
import {
  Bus,
  Car,
  Clock,
  FileText,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Plane,
  Train,
  UserRound,
} from 'lucide-react';
import { accountInfo, contactInfo, legalDocuments, parkingInfo, travelOptions } from '@/data/contact';
import { faqItems } from '@/data/faq';
import { dailyOpeningHours } from '@/data/openingHours';
import { routes } from '@/data/navigation';
import { toDialString } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { PendingValue } from '@/components/ui/PendingValue';
import { Card } from '@/components/ui/Card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { MapEmbed } from '@/components/features/MapEmbed';
import { FAQAccordion } from '@/components/features/FAQAccordion';
import { ContactActions } from '@/components/features/ContactActions';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Megközelítés, GYIK és kapcsolat',
  description:
    'Cím, GPS-koordináták, parkolási információk, odajutás autóval, síbusszal, vonattal és repülővel. Gyakori kérdések, elérhetőségek, házirend és jogi dokumentumok.',
  alternates: { canonical: routes.info },
  openGraph: {
    title: 'Megközelítés, GYIK és kapcsolat',
    description: 'Hogyan juttok el ide, és kit kerestek.',
    url: routes.info,
  },
};

const travelIcons = { car: Car, skibus: Bus, train: Train, plane: Plane } as const;

/**
 * 12 · MEGKÖZELÍTÉS, GYIK, KAPCSOLAT
 * 02 megközelítés (térkép, cím, GPS, parkolás) .. AccessSection
 * 03 odajutás (autó / síbusz / vonat / repülő) .. TravelSection
 * 04 GYIK ....................................... FAQAccordion
 * 05 kapcsolat .................................. ContactSection
 * 06 egyéb (házirend, jogi, fiók) ............... OtherSection
 */
export default function InfoPage() {
  return (
    <>
      {/* Strukturált adat: a GYIK a találati listában is megjelenhet. */}
      <JsonLd
        data={[
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: 'Kezdőlap', path: routes.home },
            { name: 'Info', path: routes.info },
          ]),
        ].filter(Boolean) as Array<Record<string, unknown>>}
      />

      <PageHero
        eyebrow="Info"
        title="Megközelítés, GYIK és kapcsolat"
        description="Minden gyakorlati információ egy oldalon: hol vagyunk, hogyan juttok el ide, és kit kerestek, ha kérdés merül fel."
        mediaKey="info-hero"
        actions={
          <>
            <PrimaryButton href="#kapcsolat" variant="onDark">
              Kapcsolat
            </PrimaryButton>
            <SecondaryButton href="#gyik" tone="dark">
              Gyakori kérdések
            </SecondaryButton>
          </>
        }
      />

      {/* 02 · MEGKÖZELÍTÉS */}
      <Section tone="alpine" labelledBy="megkozelites-cim" id="megkozelites">
        <SectionHeading
          id="megkozelites-cim"
          eyebrow="Megközelítés"
          title="Hol találtok minket?"
          description="A pontos cím és a térkép a helyszínadatok megadása után jelenik meg."
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <MapEmbed className="min-h-[360px]" title="A síközpont elhelyezkedése" />

          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="flex items-center gap-2 font-semibold text-deep-900">
                <MapPin aria-hidden="true" className="h-4 w-4 text-glacier-600" />
                Cím
              </h3>
              <p className="mt-2 text-sm text-deep-800">
                <PendingValue value={contactInfo.addressLine} hint="Utca és házszám megadása szükséges" />
                <br />
                <PendingValue value={contactInfo.postalCode} hint="Irányítószám megadása szükséges" />{' '}
                <PendingValue value={contactInfo.city} hint="Település megadása szükséges" />
                <br />
                <PendingValue value={contactInfo.country} hint="Ország megadása szükséges" />
              </p>
            </Card>

            <Card className="p-5">
              <h3 className="flex items-center gap-2 font-semibold text-deep-900">
                <Navigation aria-hidden="true" className="h-4 w-4 text-glacier-600" />
                GPS-koordináták
              </h3>
              <p className="mt-2 font-mono text-sm text-deep-800">
                {contactInfo.gpsLat !== null && contactInfo.gpsLng !== null ? (
                  `${contactInfo.gpsLat}, ${contactInfo.gpsLng}`
                ) : (
                  <PendingValue value={null} hint="GPS koordináták megadása szükséges" />
                )}
              </p>
            </Card>

            <Card className="p-5">
              <h3 className="flex items-center gap-2 font-semibold text-deep-900">
                <Car aria-hidden="true" className="h-4 w-4 text-glacier-600" />
                {parkingInfo.title}
              </h3>
              <dl className="mt-2 space-y-1.5 text-sm">
                {parkingInfo.points.map((point) => (
                  <div key={point.id} className="flex justify-between gap-3">
                    <dt className="text-deep-500">{point.label}</dt>
                    <dd className="text-right font-medium text-deep-900">
                      <PendingValue value={point.value} hint={`${point.label} megadása szükséges`} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      </Section>

      {/* 03 · ODAJUTÁS */}
      <Section tone="white" labelledBy="odajutas-cim">
        <SectionHeading
          id="odajutas-cim"
          eyebrow="Odajutás"
          title="Négy módon lehet ideérni"
          description="A távolságok és menetidők a végleges helyszínadatok megadása után töltődnek fel."
        />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {travelOptions.map((option) => {
            const Icon = travelIcons[option.mode];
            return (
              <Card as="li" key={option.id} className="flex h-full flex-col p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-glacier-50 text-glacier-600">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[1.02rem] font-semibold text-deep-900">{option.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-deep-600">{option.description}</p>
                <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-deep-100 pt-3">
                  <div>
                    <dt className="text-[0.7rem] text-deep-500">Távolság</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-deep-900">
                      <PendingValue value={option.distance} hint="Távolság megadása szükséges" />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] text-deep-500">Menetidő</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-deep-900">
                      <PendingValue value={option.duration} hint="Menetidő megadása szükséges" />
                    </dd>
                  </div>
                </dl>
              </Card>
            );
          })}
        </ul>
      </Section>

      {/* 04 · GYIK */}
      <Section tone="default" labelledBy="gyik-cim" id="gyik">
        <SectionHeading
          id="gyik-cim"
          eyebrow="GYIK"
          title="Gyakori kérdések"
          description="A leggyakoribb kérdések a síelésről, a jegyekről, a szállásról és a megközelítésről."
        />
        <div className="mt-6">
          <FAQAccordion items={faqItems} />
        </div>
      </Section>

      {/* 05 · KAPCSOLAT */}
      <Section tone="white" labelledBy="kapcsolat-cim" id="kapcsolat">
        <SectionHeading id="kapcsolat-cim" eyebrow="Kapcsolat" title="Írj vagy hívj minket" />

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Card className="p-5">
            <h3 className="flex items-center gap-2 font-semibold text-deep-900">
              <Phone aria-hidden="true" className="h-4 w-4 text-glacier-600" />
              Telefon
            </h3>
            <p className="mt-2 text-sm">
              {contactInfo.phone ? (
                <a href={`tel:${toDialString(contactInfo.phone)}`} className="link-underline font-semibold text-deep-900">
                  {contactInfo.phone}
                </a>
              ) : (
                <PendingValue value={null} hint="Telefonszám megadása szükséges" />
              )}
            </p>
          </Card>

          <Card className="p-5">
            <h3 className="flex items-center gap-2 font-semibold text-deep-900">
              <Mail aria-hidden="true" className="h-4 w-4 text-glacier-600" />
              E-mail
            </h3>
            <p className="mt-2 break-words text-sm">
              {contactInfo.email ? (
                <a href={`mailto:${contactInfo.email}`} className="link-underline font-semibold text-deep-900">
                  {contactInfo.email}
                </a>
              ) : (
                <PendingValue value={null} hint="E-mail cím megadása szükséges" />
              )}
            </p>
          </Card>

          <Card className="p-5">
            <h3 className="flex items-center gap-2 font-semibold text-deep-900">
              <Clock aria-hidden="true" className="h-4 w-4 text-glacier-600" />
              Nyitvatartás
            </h3>
            <dl className="mt-2 space-y-1 text-sm">
              {dailyOpeningHours.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex justify-between gap-3">
                  <dt className="text-deep-500">{entry.label}</dt>
                  <dd className="text-right font-medium text-deep-900">
                    <PendingValue value={entry.hours} hint="Nyitvatartás megadása szükséges" />
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        <ContactActions className="mt-6" />
      </Section>

      {/* 06 · EGYÉB */}
      <Section tone="default" labelledBy="egyeb-cim" id="dokumentumok">
        <SectionHeading id="egyeb-cim" eyebrow="Egyéb" title="Házirend, dokumentumok és fiók" />

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <Card className="p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-h3">
              <FileText aria-hidden="true" className="h-5 w-5 text-glacier-600" />
              Házirend és jogi dokumentumok
            </h3>
            <ul className="mt-4 divide-y divide-deep-100">
              {legalDocuments.map((doc) => (
                <li key={doc.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-semibold text-deep-900">{doc.label}</p>
                    <p className="mt-0.5 text-sm text-deep-600">{doc.description}</p>
                  </div>
                  <span className="shrink-0 self-center rounded-pill bg-frost px-3 py-1.5 text-xs font-semibold text-deep-500">
                    Feltöltésre vár
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="flex flex-col p-5 sm:p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-deep-800 text-white">
              <UserRound aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-h3">{accountInfo.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-deep-600">{accountInfo.description}</p>
            <SecondaryButton href={routes.tickets} className="mt-5 self-start">
              Jegyek és bérletek
            </SecondaryButton>
          </Card>
        </div>
      </Section>
    </>
  );
}
