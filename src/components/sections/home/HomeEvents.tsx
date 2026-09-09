'use client';

import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { homeHighlights } from '@/data/events';
import { routes } from '@/data/navigation';
import { EventCard } from '@/components/features/EventCard';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** ESEMÉNYEK ÉS HÍREK — legfeljebb három elem. */
export function HomeEvents() {
  const { t } = useI18n();

  return (
    <Section tone="white">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title={t.home.newsTitle} lead={t.home.newsLead} className="max-w-xl" />
        <ButtonLink href={routes.events} variant="secondary">
          {t.common.viewAll}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {homeHighlights.slice(0, 3).map((item, index) => (
          <Reveal key={item.id} as="li" delay={index * 80} className="h-full">
            <EventCard item={item} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
