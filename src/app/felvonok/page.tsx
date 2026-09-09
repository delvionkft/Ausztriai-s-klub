import type { Metadata } from 'next';
import { CalendarRange, Clock, Moon } from 'lucide-react';
import { dailyOpeningHours, nightSkiingInfo, openingPeriods } from '@/data/openingHours';
import { routes } from '@/data/navigation';
import { formatDateHu } from '@/lib/date';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { PendingValue } from '@/components/ui/PendingValue';
import { Card } from '@/components/ui/Card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { LiftList } from '@/components/features/LiftList';
import { WebcamGrid } from '@/components/features/WebcamGrid';

export const metadata: Metadata = {
  title: 'Felvonók, nyitvatartás és webkamerák',
  description:
    'Felvonók élő állapota kártyanézetben, üzemidők, nyitvatartás, esti síelés, szezonkezdet és szezonzárás, valamint négy webkamera.',
  alternates: { canonical: routes.lifts },
  openGraph: {
    title: 'Felvonók, nyitvatartás és webkamerák',
    description: 'Élő felvonóstátusz, nyitvatartás és webkamerák.',
    url: routes.lifts,
  },
};

/**
 * 04 · FELVONÓK, NYITVATARTÁS, WEBKAMERÁK
 * 01 fejléc + státuszsáv ....... SiteShell
 * 02 szűrő ..................... LiftList (belső)
 * 03 felvonólista kártyanézet .. LiftList
 * 04 nyitvatartás adatmodellből  OpeningHoursSection
 * 05 webkamerák (4 db) ......... WebcamGrid
 */
export default function LiftsPage() {
  return (
    <>
      <PageHero
        eyebrow="A hegy"
        title="Felvonók, nyitvatartás és webkamerák"
        description="Mi jár most, meddig tart nyitva, és mikor van esti síelés — minden a saját adatmodellünkből."
        mediaKey="lifts-hero"
        actions={
          <>
            <PrimaryButton href={routes.tickets} variant="onDark">
              Jegyvásárlás
            </PrimaryButton>
            <SecondaryButton href={routes.snowReport} tone="dark">
              Hójelentés
            </SecondaryButton>
          </>
        }
      />

      {/* 02–03 · SZŰRŐ + FELVONÓLISTA KÁRTYANÉZETBEN */}
      <Section tone="alpine" labelledBy="felvonok-cim">
        <SectionHeading
          id="felvonok-cim"
          eyebrow="Felvonók"
          title="Felvonók élő állapota"
          description="Szűrj állapot szerint. A műszaki adatok a síközpont hivatalos adatszolgáltatása után jelennek meg."
        />
        <div className="mt-6">
          <LiftList />
        </div>
      </Section>

      {/* 04 · NYITVATARTÁS — ADATMODELLBŐL GENERÁLVA */}
      <Section tone="white" labelledBy="nyitvatartas-cim" id="nyitvatartas">
        <SectionHeading
          id="nyitvatartas-cim"
          eyebrow="Nyitvatartás"
          title="Mikor van nyitva?"
          description="A táblázat az adatmodellből generálódik — a nyitvatartás módosítása egyetlen adatfájlban történik."
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-h3">
              <Clock aria-hidden="true" className="h-5 w-5 text-glacier-600" />
              Napi nyitvatartás
            </h3>
            <div className="mt-4 divide-y divide-deep-100">
              {dailyOpeningHours.map((entry) => (
                <div key={entry.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                  <div>
                    <p className="font-semibold text-deep-900">{entry.label}</p>
                    <p className="text-xs text-deep-500">{entry.days}</p>
                  </div>
                  <p className="font-semibold tabular-nums text-deep-900">
                    <PendingValue value={entry.hours} hint="Nyitvatartás megadása szükséges" />
                  </p>
                  {entry.note ? <p className="w-full text-xs text-deep-500">{entry.note}</p> : null}
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-h3">
                <Moon aria-hidden="true" className="h-5 w-5 text-glacier-600" />
                {nightSkiingInfo.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-deep-600">{nightSkiingInfo.description}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-frost px-3 py-2.5">
                  <dt className="text-[0.7rem] uppercase tracking-wide text-deep-500">Napok</dt>
                  <dd className="mt-0.5 font-semibold text-deep-900">{nightSkiingInfo.scheduleLabel}</dd>
                </div>
                <div className="rounded-xl bg-frost px-3 py-2.5">
                  <dt className="text-[0.7rem] uppercase tracking-wide text-deep-500">Időpont</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-deep-900">{nightSkiingInfo.hours}</dd>
                </div>
              </dl>
            </Card>

            <Card className="p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-h3">
                <CalendarRange aria-hidden="true" className="h-5 w-5 text-glacier-600" />
                Szezonkezdés és -zárás
              </h3>
              <dl className="mt-4 divide-y divide-deep-100">
                {openingPeriods.map((period) => (
                  <div key={period.id} className="py-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-semibold text-deep-900">{period.label}</dt>
                      <dd className="text-right font-semibold text-deep-900">
                        {period.from ? (
                          `${formatDateHu(period.from)}${period.to ? ` – ${formatDateHu(period.to)}` : ''}`
                        ) : (
                          <PendingValue value={null} hint="Időpont kihirdetésre vár" />
                        )}
                      </dd>
                    </div>
                    {period.note ? <p className="mt-1 text-xs text-deep-500">{period.note}</p> : null}
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      </Section>

      {/* 05 · WEBKAMERÁK */}
      <Section tone="default" labelledBy="webkamerak-cim" id="webkamerak">
        <SectionHeading
          id="webkamerak-cim"
          eyebrow="Webkamerák"
          title="Négy nézőpont a hegyről"
          description="Völgyállomás, középállomás, csúcs és gyerekpark."
        />
        <div className="mt-6">
          <WebcamGrid />
        </div>
      </Section>
    </>
  );
}
