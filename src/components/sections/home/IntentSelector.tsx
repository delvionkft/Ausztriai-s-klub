'use client';

import { ArrowRight, CalendarDays, GraduationCap, Snowflake, Users } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { intentCards } from '@/data/homepage';
import { track } from '@/lib/analytics';
import { Media } from '@/components/ui/Media';
import { CardLink } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ICONS = { snowflake: Snowflake, 'graduation-cap': GraduationCap, 'calendar-days': CalendarDays, users: Users } as const;

/**
 * LÁTOGATÓI SZÁNDÉKVÁLASZTÓ
 * ----------------------------------------------------------------------------
 * A kezdőlap legfontosabb navigációs eleme: négy kép a négy tipikus
 * látogatói helyzethez, teljes felületén kattintható kártyákon.
 */
export function IntentSelector() {
  const { t } = useI18n();

  const copy = {
    today: { title: t.intent.todayTitle, text: t.intent.todayText },
    beginner: { title: t.intent.beginnerTitle, text: t.intent.beginnerText },
    'multi-day': { title: t.intent.multiDayTitle, text: t.intent.multiDayText },
    group: { title: t.intent.groupTitle, text: t.intent.groupText },
  };

  return (
    <Section tone="frost" id="szandek">
      <SectionHeading kicker={t.home.intentTitle} title={t.home.intentTitle} lead={t.home.intentLead} align="center" />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {intentCards.map((card, index) => {
          const Icon = ICONS[card.icon];
          return (
            <Reveal key={card.id} as="li" delay={index * 80} className="h-full">
              <CardLink
                href={card.href}
                className="flex h-full flex-col"
                onClick={() => track('open_slope_map', { source: 'intent', intent: card.id })}
              >
                <div className="relative">
                  <Media
                    mediaKey={card.imageKey}
                    className="aspect-[4/3]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
                    overlay="bottom"
                  />
                  <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.0625rem] font-extrabold leading-snug text-night-950">{copy[card.id].title}</h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-night-600">{copy[card.id].text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-glacier-600">
                    {t.common.more}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </CardLink>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
