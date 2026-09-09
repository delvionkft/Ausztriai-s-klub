import type { Metadata } from 'next';
import { CableCar, Mountain, Snowflake, Thermometer, TriangleAlert, Wind } from 'lucide-react';
import { liveStatus, snowReport } from '@/data/status';
import { formatDateTimeHu } from '@/lib/date';
import { formatNumber, formatTemperature } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { PendingValue } from '@/components/ui/PendingValue';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { ForecastPanel } from '@/components/features/ForecastPanel';
import { LiftList } from '@/components/features/LiftList';
import { SlopeList } from '@/components/features/SlopeList';
import { WebcamGrid } from '@/components/features/WebcamGrid';
import { routes } from '@/data/navigation';

export const metadata: Metadata = {
  title: 'Hójelentés',
  description:
    'Aktuális hóvastagság a hegyen és a völgyben, friss hó 24/48/72 órára, hőmérséklet, szél, háromnapos előrejelzés, valamint a felvonók és pályák élő állapota.',
  alternates: { canonical: routes.snowReport },
  openGraph: { title: 'Hójelentés', description: 'Hóvastagság, friss hó, előrejelzés és élő pályastátusz.', url: routes.snowReport },
};

/**
 * 02 · HÓJELENTÉS
 * 01 fejléc + státuszsáv ....... SiteShell
 * 02 fő adatpanel .............. SnowDataPanel (görgetés nélkül látható)
 * 03 felvonólista .............. LiftList
 * 04 pályalista ................ SlopeList
 * 05 bizalmi sáv — időbélyeg ... TimestampBar
 * 06 webkamera előnézet ........ WebcamGrid
 */
export default function SnowReportPage() {
  return (
    <>
      <PageHero
        eyebrow="A hegy"
        title="Hójelentés"
        description="Minden fontos adat egy helyen: mennyi a hó, mennyi esett, mit mutat az előrejelzés, és mi üzemel most."
        mediaKey="snow-hero"
        actions={
          <>
            <PrimaryButton href={routes.tickets} variant="onDark">
              Jegyvásárlás
            </PrimaryButton>
            <SecondaryButton href={routes.slopeMap} tone="dark">
              Pályatérkép
            </SecondaryButton>
          </>
        }
      />

      {/* 02 · FŐ ADATPANEL — görgetés nélkül látható */}
      <Section tone="alpine" spacing="md" labelledBy="fo-adatpanel">
        <h2 id="fo-adatpanel" className="sr-only">
          Fő adatpanel
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-panel border border-deep-100 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-glacier-600">
              <Snowflake aria-hidden="true" className="h-3.5 w-3.5" />
              Hóvastagság
            </p>
            <p className="mt-3 text-3xl font-bold tabular-nums text-deep-900">
              {formatNumber(liveStatus.snowDepthMountainCm, ' cm')}
            </p>
            <p className="text-xs text-deep-500">a hegyen</p>
            <p className="mt-3 border-t border-deep-100 pt-3 text-lg font-semibold tabular-nums text-deep-800">
              {formatNumber(liveStatus.snowDepthValleyCm, ' cm')}
              <span className="ml-1.5 text-xs font-normal text-deep-500">a völgyben</span>
            </p>
          </article>

          <article className="rounded-panel border border-deep-100 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-glacier-600">
              <Snowflake aria-hidden="true" className="h-3.5 w-3.5" />
              Friss hó
            </p>
            <dl className="mt-3 space-y-2.5">
              {[
                { label: '24 óra', value: snowReport.freshSnow24hCm },
                { label: '48 óra', value: snowReport.freshSnow48hCm },
                { label: '72 óra', value: snowReport.freshSnow72hCm },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-2">
                  <dt className="text-sm text-deep-500">{row.label}</dt>
                  <dd className="text-xl font-bold tabular-nums text-deep-900">{formatNumber(row.value, ' cm')}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="rounded-panel border border-deep-100 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-glacier-600">
              <Thermometer aria-hidden="true" className="h-3.5 w-3.5" />
              Hőmérséklet és szél
            </p>
            <p className="mt-3 text-3xl font-bold tabular-nums text-deep-900">
              {formatTemperature(liveStatus.temperatureC)}
            </p>
            <dl className="mt-3 space-y-2 border-t border-deep-100 pt-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="flex items-center gap-1.5 text-deep-500">
                  <Wind aria-hidden="true" className="h-3.5 w-3.5" />
                  Szél
                </dt>
                <dd className="font-semibold text-deep-900">
                  {formatNumber(snowReport.windSpeedKmh, ' km/h')}
                  {snowReport.windDirection ? ` · ${snowReport.windDirection}` : ''}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="flex items-center gap-1.5 text-deep-500">
                  <TriangleAlert aria-hidden="true" className="h-3.5 w-3.5" />
                  Lavina
                </dt>
                <dd className="font-semibold text-deep-900">
                  {snowReport.avalancheLevel === null ? (
                    <PendingValue value={null} hint="Lavinafokozat megadása szükséges" />
                  ) : (
                    `${snowReport.avalancheLevel}. fokozat`
                  )}
                </dd>
              </div>
            </dl>
          </article>

          <article className="rounded-panel border border-deep-100 bg-white p-5">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-glacier-600">
              <CableCar aria-hidden="true" className="h-3.5 w-3.5" />
              Mi üzemel most
            </p>
            <dl className="mt-3 space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-deep-500">Felvonó</dt>
                <dd className="text-2xl font-bold tabular-nums text-status-open">
                  {liveStatus.liftsOpen}
                  <span className="text-base font-medium text-deep-500">/{liveStatus.liftsTotal}</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 border-t border-deep-100 pt-3">
                <dt className="flex items-center gap-1.5 text-sm text-deep-500">
                  <Mountain aria-hidden="true" className="h-3.5 w-3.5" />
                  Pálya
                </dt>
                <dd className="text-2xl font-bold tabular-nums text-status-open">
                  {liveStatus.slopesOpen}
                  <span className="text-base font-medium text-deep-500">/{liveStatus.slopesTotal}</span>
                </dd>
              </div>
              <p className="text-xs text-deep-500">
                Hóminőség:{' '}
                <PendingValue value={snowReport.snowQuality} hint="Hóminőség megadása szükséges" />
              </p>
            </dl>
          </article>
        </div>

        <DemoNotice className="mt-5" message="A hó- és időjárási adatok jelenleg demó értékek. Éles működésben időjárás- és hóállomás API-ból frissülnek." />

        {/* Háromnapos előrejelzés */}
        <div className="mt-10">
          <SectionHeading eyebrow="Előrejelzés" title="A következő három nap" as="h3" />
          <div className="mt-5">
            <ForecastPanel />
          </div>
        </div>
      </Section>

      {/* 03 · FELVONÓLISTA — ÉLŐ STÁTUSSZAL */}
      <Section tone="white" labelledBy="felvonolista-cim">
        <SectionHeading
          id="felvonolista-cim"
          eyebrow="Felvonók"
          title="Felvonólista élő státusszal"
          description="Szűrj állapot szerint, hogy azonnal lásd, mi jár most."
        />
        <div className="mt-6">
          <LiftList />
        </div>
      </Section>

      {/* 04 · PÁLYALISTA — ÉLŐ STÁTUSSZAL */}
      <Section tone="default" labelledBy="palyalista-cim">
        <SectionHeading
          id="palyalista-cim"
          eyebrow="Pályák"
          title="Pályalista nehézséggel és státusszal"
          description="A pályahosszak és szintkülönbségek a hivatalos pályakönyv megérkezése után töltődnek fel."
        />
        <div className="mt-6">
          <SlopeList />
        </div>
      </Section>

      {/* 05 · BIZALMI SÁV — IDŐBÉLYEG */}
      <Section tone="white" spacing="sm">
        <div className="flex flex-col items-center gap-2 rounded-panel border border-deep-100 bg-frost px-5 py-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-deep-500">Utolsó frissítés</p>
          <p className="text-lg font-semibold text-deep-900">{formatDateTimeHu(liveStatus.updatedAt)}</p>
          <p className="max-w-md text-sm text-deep-600">
            Az adatok egyetlen központi forrásból származnak, ugyanabból, amit a fejléc alatti státuszsáv is használ.
          </p>
        </div>
      </Section>

      {/* 06 · WEBKAMERA ELŐNÉZET */}
      <Section tone="default" labelledBy="webkamera-cim" id="webkamerak">
        <SectionHeading
          id="webkamera-cim"
          eyebrow="Webkamerák"
          title="Nézd meg, milyen most odafent"
          description="A kamerák a képforrás megadása után élő képet mutatnak."
        />
        <div className="mt-6">
          <WebcamGrid limit={3} />
        </div>
      </Section>
    </>
  );
}
