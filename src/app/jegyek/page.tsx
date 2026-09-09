import type { Metadata } from 'next';
import { ArrowRight, GraduationCap, Users } from 'lucide-react';
import { ageGroupLabels, currency, discounts, groupTicketNote, ticketProducts } from '@/data/tickets';
import { routes } from '@/data/navigation';
import { formatCurrency } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { PendingValue } from '@/components/ui/PendingValue';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Card } from '@/components/ui/Card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { TicketAdvisor } from '@/components/features/TicketAdvisor';
import { SeasonalPriceCalendar } from '@/components/features/SeasonalPriceCalendar';
import type { AgeGroup } from '@/types';

export const metadata: Metadata = {
  title: 'Jegyek és bérletek',
  description:
    'Háromlépéses jegyajánló: hányan, hány napra, milyen korosztály. Napijegy, többnapos bérlet, szezonbérlet, naptáras árazás, kedvezmények és csoportos ajánlatkérés.',
  alternates: { canonical: routes.tickets },
  openGraph: { title: 'Jegyek és bérletek', description: 'Jegyajánló, árlista és kedvezmények.', url: routes.tickets },
};

const ageOrder: AgeGroup[] = ['child', 'youth', 'adult', 'senior'];

/**
 * 05 · JEGYEK ÉS BÉRLETEK
 * 02 döntéstámogató (3 kérdés) .. TicketAdvisor
 * 03 ajánlott jegy + vásárlás ... TicketAdvisor
 * 04 szezonális árazás .......... SeasonalPriceCalendar
 * 05 ártáblázat ................. PriceTable
 * 06 kedvezmények + csoportos ... DiscountsSection
 */
export default function TicketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Jegyek"
        title="Jegyek és bérletek"
        description="Nem kell árlistát böngészned. Válaszolj három kérdésre, és megmondjuk, melyik jegy éri meg neked."
        mediaKey="tickets-hero"
        actions={
          <>
            <PrimaryButton href="#jegyajanlo" variant="onDark">
              Jegyajánló indítása
            </PrimaryButton>
            <SecondaryButton href="#artablazat" tone="dark">
              Teljes árlista
            </SecondaryButton>
          </>
        }
      />

      {/* 02–03 · DÖNTÉSTÁMOGATÓ + AJÁNLOTT JEGY */}
      <Section tone="alpine" labelledBy="jegyajanlo-cim" id="jegyajanlo">
        <SectionHeading
          id="jegyajanlo-cim"
          eyebrow="Döntéstámogató"
          title="Melyik jegy való nektek?"
          description="Három kérdés, és egyből látod az ajánlott jegytípust az árral együtt."
        />
        <div className="mt-8">
          <TicketAdvisor />
        </div>
      </Section>

      {/* 04 · SZEZONÁLIS / DINAMIKUS ÁRAZÁS */}
      <Section tone="white" labelledBy="szezonalis-cim">
        <SectionHeading
          id="szezonalis-cim"
          eyebrow="Szezonális árazás"
          title="Naptáras árnézet"
          description="Az ár a szezontól függ. A naptárban naponta látod, melyik sávba esik az adott nap."
        />
        <div className="mt-6">
          <SeasonalPriceCalendar />
        </div>
      </Section>

      {/* 05 · ÁRTÁBLÁZAT — REFERENCIA */}
      <Section tone="default" labelledBy="artablazat-cim" id="artablazat">
        <SectionHeading
          id="artablazat-cim"
          eyebrow="Referencia"
          title="Teljes árlista"
          description="Ez referencia, nem döntési eszköz — a választáshoz a fenti jegyajánlót érdemes használni."
        />

        <DemoNotice className="mt-5" message="Demó árak a felület bemutatásához. A végleges árlistát a src/data/tickets.ts fájlban kell kicserélni." />

        {/* Asztali: táblázat. Mobil: kártyák — nincs vízszintes görgetés. */}
        <div className="mt-6 hidden overflow-hidden rounded-panel border border-deep-100 bg-white sm:block">
          <table className="w-full text-sm">
            <caption className="sr-only">Jegytípusok és áraik korosztályonként</caption>
            <thead>
              <tr className="border-b border-deep-100 bg-frost">
                <th scope="col" className="px-4 py-3 text-left font-bold text-deep-800">
                  Jegytípus
                </th>
                {ageOrder.map((age) => (
                  <th key={age} scope="col" className="px-4 py-3 text-right font-bold text-deep-800">
                    {ageGroupLabels[age]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-deep-100">
              {ticketProducts.map((product) => (
                <tr key={product.id}>
                  <th scope="row" className="px-4 py-3.5 text-left">
                    <span className="block font-semibold text-deep-900">{product.name}</span>
                    <span className="mt-0.5 block text-xs font-normal text-deep-500">{product.recommendedFor}</span>
                  </th>
                  {ageOrder.map((age) => (
                    <td key={age} className="px-4 py-3.5 text-right font-semibold tabular-nums text-deep-900">
                      {formatCurrency(product.priceByAgeGroup[age], currency)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-6 space-y-3 sm:hidden">
          {ticketProducts.map((product) => (
            <Card as="li" key={product.id} className="p-4">
              <h3 className="font-semibold text-deep-900">{product.name}</h3>
              <p className="mt-0.5 text-xs text-deep-500">{product.recommendedFor}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2">
                {ageOrder.map((age) => (
                  <div key={age} className="rounded-lg bg-frost px-3 py-2">
                    <dt className="text-[0.7rem] text-deep-500">{ageGroupLabels[age]}</dt>
                    <dd className="mt-0.5 font-bold tabular-nums text-deep-900">
                      {formatCurrency(product.priceByAgeGroup[age], currency)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </ul>
      </Section>

      {/* 06 · KEDVEZMÉNYEK ÉS CSOPORTOS ÁG */}
      <Section tone="white" labelledBy="kedvezmenyek-cim">
        <SectionHeading
          id="kedvezmenyek-cim"
          eyebrow="Kedvezmények"
          title="Diák, nyugdíjas, család és csoport"
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-3">
            {discounts.map((discount) => (
              <Card as="li" key={discount.id} className="flex h-full flex-col p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-glacier-50 text-glacier-600">
                  <GraduationCap aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-3.5 font-semibold text-deep-900">{discount.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-deep-600">{discount.description}</p>
                <p className="mt-4 border-t border-deep-100 pt-3 text-sm">
                  <span className="text-deep-500">Kedvezmény mértéke: </span>
                  <span className="font-semibold text-deep-900">
                    {discount.percent === null ? (
                      <PendingValue value={null} hint="Kedvezmény mértékének megadása szükséges" />
                    ) : (
                      `${discount.percent}%`
                    )}
                  </span>
                </p>
              </Card>
            ))}
          </ul>

          <Card className="flex flex-col p-5 sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-deep-800 text-white">
              <Users aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-3.5 text-h3">Csoportot hoztok?</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-deep-600">{groupTicketNote}</p>
            <div className="mt-5 space-y-2">
              <PrimaryButton
                href={routes.quote}
                fullWidth
                iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
              >
                Csoportos ajánlatkérés
              </PrimaryButton>
              <SecondaryButton href={routes.groups} fullWidth>
                Csoportos szállás
              </SecondaryButton>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
