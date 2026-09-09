'use client';

import { Check } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { stayHighlights } from '@/data/homepage';
import { routes } from '@/data/navigation';
import { track } from '@/lib/analytics';
import { Media } from '@/components/ui/Media';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

/** VENDÉGHÁZ KIEMELÉS a kezdőlapon. */
export function AccommodationTeaser() {
  const { t, L } = useI18n();

  return (
    <Section tone="frost">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <Media
              mediaKey="home-guesthouse"
              className="aspect-[4/3] rounded-panel shadow-lift"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <Media
              mediaKey="stay-exterior"
              className="absolute -bottom-8 -right-4 hidden aspect-square w-44 rounded-card border-4 border-frost-50 shadow-lift lg:block"
              sizes="180px"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-glacier-600">{t.nav.stay}</p>
          <h2 className="mt-3 text-h2">{t.home.stayTitle}</h2>
          <p className="mt-4 text-lead text-night-600">{t.home.stayLead}</p>

          <ul className="mt-7 space-y-3">
            {stayHighlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[1rem] text-night-700">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-glacier-400/20">
                  <Check aria-hidden="true" className="h-3 w-3 text-glacier-700" />
                </span>
                {L(item)}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={routes.availability}
              size="lg"
              onClick={() => track('select_accommodation_dates', { source: 'home-teaser' })}
            >
              {t.cta.checkAvailability}
            </ButtonLink>
            <ButtonLink
              href={routes.inquiry}
              variant="secondary"
              size="lg"
              onClick={() => track('start_accommodation_inquiry', { source: 'home-teaser' })}
            >
              {t.cta.requestQuote}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
