import type { Metadata } from 'next';
import { Baby, Briefcase, Check, Dog, Quote, Trophy, UtensilsCrossed, Users } from 'lucide-react';
import { groupExtras, groupProcessSteps, groupTypes } from '@/data/accommodation';
import { reviews, reviewsPlaceholderNote } from '@/data/reviews';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { Card } from '@/components/ui/Card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { AccommodationSubNav } from '@/components/layout/AccommodationSubNav';
import { ProcessSteps } from '@/components/features/ProcessSteps';

export const metadata: Metadata = {
  title: 'Csoportoknak',
  description:
    'Baráti síút, több család, sportklub vagy céges csapat — teljes ház, négy lépéses szervezés, étkezési lehetőségek, gyermek- és állatbarát feltételek.',
  alternates: { canonical: routes.groups },
  openGraph: { title: 'Csoportoknak', description: 'Teljes ház csoportoknak, egy szervezéssel.', url: routes.groups },
};

const groupIcons = { Users, Baby, Trophy, Briefcase } as const;

/**
 * 08 · CSOPORTOKNAK
 * 02 kinek ajánlott — 4 típus .... GroupTypesSection
 * 03 logisztikai egyszerűség ..... ProcessSteps
 * 04 csoportos részletek ......... ExtrasSection
 * 05 vélemények .................. ReviewsSection
 * 06 záró CTA .................... FinalCta
 */
export default function GroupsPage() {
  return (
    <>
      <AccommodationSubNav />

      <PageHero
        eyebrow="Szállás"
        title="Csoportot hoztok? Ez a ház pont erre való."
        description="Egy kapcsolattartó, egy ajánlat, egy számla. A társaság nem oszlik szét, és nem kell három helyszínt egyeztetni."
        mediaKey="groups-hero"
        size="md"
        actions={
          <>
            <PrimaryButton href={routes.quote} size="lg" variant="onDark">
              Ajánlatot kérek
            </PrimaryButton>
            <SecondaryButton href={routes.availability} size="lg" tone="dark">
              Szabad időpontok
            </SecondaryButton>
          </>
        }
      />

      {/* 02 · KINEK AJÁNLOTT — NÉGY CSOPORTTÍPUS */}
      <Section tone="alpine" labelledBy="csoporttipusok-cim">
        <SectionHeading
          id="csoporttipusok-cim"
          eyebrow="Kinek ajánlott"
          title="Négy tipikus csoport"
          description="Mind a négyre ugyanaz a logika: teljes ház, kizárólagos használat, egyszerű szervezés."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groupTypes.map((group) => {
            const Icon = groupIcons[group.icon as keyof typeof groupIcons] ?? Users;
            return (
              <Card as="li" key={group.id} className="flex h-full flex-col p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-glacier-50 text-glacier-600">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[1.05rem] font-semibold text-deep-900">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep-600">{group.description}</p>
                <ul className="mt-4 space-y-2 border-t border-deep-100 pt-3">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-deep-700">
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-glacier-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </ul>
      </Section>

      {/* 03 · LOGISZTIKAI EGYSZERŰSÉG */}
      <Section tone="white" labelledBy="folyamat-cim">
        <SectionHeading
          id="folyamat-cim"
          eyebrow="Szervezés lépésről lépésre"
          title="Négy lépés az érkezésig"
        />
        <ProcessSteps steps={groupProcessSteps} className="mt-8" />
      </Section>

      {/* 04 · CSOPORTOS RÉSZLETEK */}
      <Section tone="default" labelledBy="reszletek-cim">
        <SectionHeading id="reszletek-cim" eyebrow="Csoportos részletek" title="Étkezés, gyerekek, háziállat" />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {[
            { data: groupExtras.catering, Icon: UtensilsCrossed },
            { data: groupExtras.familyFriendly, Icon: Dog },
          ].map(({ data, Icon }) => (
            <Card key={data.title} className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-deep-800 text-white">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-h3">{data.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-deep-600">{data.description}</p>
              <ul className="mt-4 space-y-2 border-t border-deep-100 pt-4">
                {data.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-deep-700">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 · VÉLEMÉNYEK — KORÁBBI CSOPORTOKTÓL */}
      <Section tone="white" labelledBy="velemenyek-cim">
        <SectionHeading
          id="velemenyek-cim"
          eyebrow="Vélemények"
          title="Korábbi csoportok visszajelzései"
          description={reviewsPlaceholderNote}
        />

        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card as="li" key={review.id} className="flex h-full flex-col border-dashed p-6">
              <Quote aria-hidden="true" className="h-6 w-6 text-deep-200" />
              {review.quote ? (
                <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-deep-700">
                  „{review.quote}”
                </blockquote>
              ) : (
                <p className="mt-3 flex-1 rounded-lg bg-frost px-3 py-6 text-center text-sm text-deep-500">
                  A vendégvélemény beillesztésre vár
                </p>
              )}
              <footer className="mt-4 border-t border-deep-100 pt-3 text-sm">
                <p className="font-semibold text-deep-900">
                  {review.author ?? <span className="text-deep-500">Név megadása szükséges</span>}
                </p>
                <p className="text-xs text-deep-500">{review.groupType}</p>
              </footer>
            </Card>
          ))}
        </ul>
      </Section>

      {/* 06 · ZÁRÓ CTA */}
      <Section tone="deep" spacing="md">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-h1 text-white">Kezdjük az időpont egyeztetésével</h2>
          <p className="max-w-xl text-ice-200/85">
            Nézd meg, mikor szabad a ház, vagy küldj ajánlatkérést — 24 órán belül személyes ajánlattal válaszolunk.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href={routes.quote} size="lg" variant="onDark">
              Ajánlatot kérek
            </PrimaryButton>
            <SecondaryButton href={routes.availability} size="lg" tone="dark">
              Szabad időpontok
            </SecondaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
