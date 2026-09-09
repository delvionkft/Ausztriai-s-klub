'use client';

import { Car, CircleParking, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { accessFacts } from '@/data/homepage';
import { routes } from '@/data/navigation';
import { MapEmbed } from '@/components/features/MapEmbed';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ICONS = { 'map-pin': MapPin, 'circle-parking': CircleParking, car: Car } as const;

/** MEGKÖZELÍTÉS — térkép-előnézet és gyorsadatok. */
export function AccessQuickInfo() {
  const { t, L } = useI18n();

  return (
    <Section tone="frost" id="megkozelites">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <MapEmbed compact />
        </Reveal>

        <Reveal delay={100}>
          <SectionHeading title={t.home.accessTitle} lead={t.home.accessLead} />

          <dl className="mt-8 space-y-5">
            {accessFacts.map((fact) => {
              const Icon = ICONS[fact.icon as keyof typeof ICONS] ?? MapPin;
              return (
                <div key={fact.id} className="flex items-start gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-glacier-600 shadow-subtle">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-[0.75rem] font-bold uppercase tracking-wider text-night-500">{L(fact.label)}</dt>
                    <dd className="mt-0.5 font-semibold text-night-950">{L(fact.value)}</dd>
                  </div>
                </div>
              );
            })}
          </dl>

          <div className="mt-8">
            <ButtonLink href={routes.directions} variant="secondary" size="lg">
              {t.contact.travelTitle}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
