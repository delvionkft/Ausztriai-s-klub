'use client';

import { useState } from 'react';
import { ArrowRight, Briefcase, Heart, Home, Mail, Music, Utensils } from 'lucide-react';
import type { Season } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { experienceBridges, experiences } from '@/data/experiences';
import { events } from '@/data/events';
import { getCurrentSeason } from '@/data/status';
import { cn } from '@/lib/cn';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { CardLink } from '@/components/ui/Card';
import { EventCard } from '@/components/features/EventCard';
import { EmptyState } from '@/components/ui/States';

const BRIDGE_ICONS = {
  briefcase: Briefcase, heart: Heart, utensils: Utensils, music: Music, home: Home, mail: Mail,
} as const;

type Filter = 'all' | 'winter' | 'summer';

export function ExperiencesView() {
  const { t, L } = useI18n();
  const season = getCurrentSeason();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all'
    ? experiences
    : experiences.filter((exp) => exp.season === filter || exp.season === 'all-year');

  const seasonLabel = (value: Season) =>
    value === 'winter' ? t.experiences.seasonWinter : value === 'summer' ? t.experiences.seasonSummer : t.experiences.seasonAll;

  return (
    <>
      {/* A hero képe és szövege az aktuális szezon szerint vált. */}
      <PageHero
        imageKey={season === 'winter' ? 'hero-experience-winter' : 'hero-experience-summer'}
        kicker={t.nav.experiences}
        title={t.experiences.title}
        lead={season === 'winter' ? t.experiences.leadWinter : t.experiences.leadSummer}
        crumbs={[{ label: t.nav.experiences, href: routes.experiences }]}
        height="sm"
      />

      <Section tone="frost">
        <div className="no-scrollbar mb-10 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t.common.filter}>
          {([
            { id: 'all' as Filter, label: t.experiences.filterAll },
            { id: 'winter' as Filter, label: t.experiences.filterWinter },
            { id: 'summer' as Filter, label: t.experiences.filterSummer },
          ]).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                'tap-target inline-flex shrink-0 items-center rounded-pill px-4 text-sm font-semibold transition-all',
                filter === item.id
                  ? 'bg-night-950 text-white'
                  : 'border border-night-200 bg-white text-night-700 hover:border-glacier-400 hover:bg-frost-100',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((exp, index) => (
              <Reveal key={exp.id} as="li" delay={index * 60} className="h-full">
                <CardLink href={exp.href} className="flex h-full flex-col">
                  <div className="relative">
                    <Media
                      mediaKey={exp.imageKey}
                      className="aspect-[16/10]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-night-900 backdrop-blur-sm">
                      {seasonLabel(exp.season)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.0625rem] font-extrabold text-night-950">{L(exp.title)}</h3>
                    {exp.duration ? (
                      <p className="mt-1 text-[0.8125rem] font-semibold text-glacier-700">{L(exp.duration)}</p>
                    ) : null}
                    <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-night-600">{L(exp.description)}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-glacier-600">
                      {t.common.details}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardLink>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <Section tone="white" id="esemenyek">
        <SectionHeading title={t.experiences.eventsTitle} lead={t.experiences.eventsLead} className="mb-10" />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <Reveal key={event.id} as="li" delay={index * 60} className="h-full">
              <EventCard item={event} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="night">
        <SectionHeading title={t.experiences.bridgeTitle} invert className="mb-10" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experienceBridges.map((bridge, index) => {
            const Icon = BRIDGE_ICONS[bridge.icon as keyof typeof BRIDGE_ICONS] ?? Briefcase;
            return (
              <Reveal key={bridge.id} as="li" delay={index * 60} className="h-full">
                <CardLink href={bridge.href} tone="dark" className="flex h-full items-start gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-glacier-400/15 text-glacier-300">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-[0.9375rem] font-extrabold text-white">{L(bridge.title)}</span>
                    <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-frost-300/85">{L(bridge.text)}</span>
                  </span>
                </CardLink>
              </Reveal>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
