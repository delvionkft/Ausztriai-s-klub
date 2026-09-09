'use client';

import { AlertTriangle, CalendarDays, Clock, Moon, Snowflake } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { openingRules } from '@/data/openingHours';
import { liftTotals } from '@/data/derived';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LiftGrid } from '@/components/features/LiftCard';
import { WebcamGrid } from '@/components/features/WebcamCard';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

const ICONS = { clock: Clock, moon: Moon, calendar: CalendarDays, alert: AlertTriangle, snowflake: Snowflake } as const;

export function LiftsView() {
  const { t, L } = useI18n();

  return (
    <>
      <PageHero
        imageKey="hero-lifts"
        kicker={t.nav.mountain}
        title={t.lifts.title}
        lead={t.lifts.lead}
        crumbs={[{ label: t.nav.lifts, href: routes.lifts }]}
        height="sm"
        stats={[
          { label: t.status.liftsOpen, value: `${liftTotals.running}/${liftTotals.count}` },
          { label: t.map.capacity, value: `${liftTotals.capacityPerHour.toLocaleString('hu-HU')} fő/óra` },
          { label: t.map.altitude, value: `${liftTotals.lowestBaseM}–${liftTotals.highestTopM} m` },
          { label: t.status.nightSkiing, value: 'Ke · P' },
        ]}
      />

      <Section tone="white">
        <LiftGrid />
      </Section>

      <Section tone="frost" id="nyitvatartas">
        <SectionHeading title={t.lifts.openingTitle} lead={t.lifts.openingLead} />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {openingRules.map((rule, index) => {
            const Icon = ICONS[rule.icon];
            return (
              <Reveal key={rule.id} as="li" delay={index * 60} className="h-full">
                <div className={cn(
                  'flex h-full flex-col rounded-card border bg-white p-5 shadow-subtle',
                  rule.highlight ? 'border-glacier-400' : 'border-night-100',
                )}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-frost-200 text-glacier-600">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1rem] font-extrabold text-night-950">{L(rule.label)}</h3>
                      <p className="mt-0.5 text-[0.875rem] font-bold text-glacier-700">{rule.hours}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-night-600">{L(rule.detail)}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <section id="webkamerak" className="surface-night scroll-mt-40 py-16 lg:py-24">
        <div className="container-page">
          <SectionHeading title={t.lifts.webcamTitle} lead={t.lifts.webcamLead} invert className="mb-10" />
          <WebcamGrid />
        </div>
      </section>
    </>
  );
}
