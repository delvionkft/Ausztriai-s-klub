'use client';

import { useEffect } from 'react';
import { Map, Ticket } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { getForecastSync } from '@/services/statusService';
import { track } from '@/lib/analytics';
import { PageHero } from '@/components/ui/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import { SnowPanel, ForecastStrip } from '@/components/features/SnowPanel';
import { LiftStatusList } from '@/components/features/LiftCard';
import { SlopeList } from '@/components/features/SlopeList';
import { WebcamGrid } from '@/components/features/WebcamCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** HÓJELENTÉS OLDAL — a legfontosabb adatok az első képernyőn. */
export function SnowReportView() {
  const { t } = useI18n();
  const forecast = getForecastSync();

  useEffect(() => { track('view_snow_report', { source: 'page' }); }, []);

  return (
    <>
      <PageHero
        imageKey="hero-snow"
        kicker={t.nav.mountain}
        title={t.snow.title}
        lead={t.snow.lead}
        crumbs={[{ label: t.snow.title, href: routes.snowReport }]}
        height="sm"
      >
        <ButtonLink href={routes.tickets} size="lg" onClick={() => track('begin_ticket_checkout', { source: 'snow-report' })}>
          <Ticket aria-hidden="true" className="h-5 w-5" />
          {t.cta.buyTicket}
        </ButtonLink>
        <ButtonLink href={routes.slopeMap} variant="onDark" size="lg" onClick={() => track('open_slope_map', { source: 'snow-report' })}>
          <Map aria-hidden="true" className="h-5 w-5" />
          {t.cta.slopeMap}
        </ButtonLink>
      </PageHero>

      <section className="surface-night py-14 lg:py-20">
        <div className="container-page space-y-14">
          <SnowPanel />
          <ForecastStrip days={forecast} />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <LiftStatusList />
            <SlopeList invert />
          </div>

          <div id="webkamerak" className="scroll-mt-40">
            <SectionHeading
              title={t.snow.webcamsTitle}
              lead={t.lifts.webcamLead}
              invert
              className="mb-8 max-w-xl"
            />
            <WebcamGrid />
          </div>
        </div>
      </section>
    </>
  );
}
