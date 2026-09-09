'use client';

import {
  BedDouble, Car, ChefHat, ClipboardCheck, Flame, KeyRound, MountainSnow, Receipt,
  ShowerHead, Snowflake, Users, UsersRound, Waves,
} from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { groupBenefits, guesthouse, quickFacts } from '@/data/accommodation';
import { galleryImages } from '@/data/gallery';
import { track } from '@/lib/analytics';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { FloorPlanPanel } from '@/components/features/FloorPlanPanel';
import { Gallery } from '@/components/features/Gallery';

const FACT_ICONS = {
  users: Users, 'bed-double': BedDouble, 'shower-head': ShowerHead, 'mountain-snow': MountainSnow,
  car: Car, snowflake: Snowflake, 'chef-hat': ChefHat, flame: Flame,
} as const;

const BENEFIT_ICONS = {
  'key-round': KeyRound, 'users-round': UsersRound, 'clipboard-check': ClipboardCheck, receipt: Receipt, waves: Waves,
} as const;

export function StayView() {
  const { t, L } = useI18n();

  return (
    <>
      <PageHero
        imageKey="hero-stay"
        kicker={t.nav.stay}
        title={guesthouse.name}
        lead={L(guesthouse.lead)}
        crumbs={[{ label: t.nav.guesthouse, href: routes.stay }]}
        stats={[
          { label: t.stay.guests, value: `${guesthouse.maxGuests} fő` },
          { label: t.stay.bedrooms, value: `${guesthouse.bedrooms}` },
          { label: t.stay.bathrooms, value: `${guesthouse.bathrooms}` },
          { label: t.stay.distance, value: `${guesthouse.distanceToSlopeM} m` },
        ]}
      >
        <ButtonLink
          href={routes.availability}
          size="lg"
          onClick={() => track('select_accommodation_dates', { source: 'stay-hero' })}
        >
          {t.cta.checkAvailability}
        </ButtonLink>
        <ButtonLink
          href={routes.inquiry}
          variant="onDark"
          size="lg"
          onClick={() => track('start_accommodation_inquiry', { source: 'stay-hero' })}
        >
          {t.cta.requestQuote}
        </ButtonLink>
      </PageHero>

      {/* Gyors információs sáv */}
      <section className="border-b border-night-100 bg-white py-8">
        <div className="container-page">
          <h2 className="sr-only">{t.stay.quickFacts}</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
            {quickFacts.map((fact) => {
              const Icon = FACT_ICONS[fact.icon as keyof typeof FACT_ICONS] ?? Users;
              return (
                <div key={fact.id} className="flex flex-col items-start gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-frost-200 text-glacier-600">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-wider text-night-500">{L(fact.label)}</dt>
                  <dd className="-mt-1 text-[0.875rem] font-semibold leading-snug text-night-950">{L(fact.value)}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* Bemutatás */}
      <Section tone="frost">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading kicker={t.nav.guesthouse} title={t.stay.title} />
            <div className="mt-6 space-y-4">
              {guesthouse.description.map((paragraph, i) => (
                <p key={i} className="prose-body">{L(paragraph)}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h3 className="font-display text-h3">{t.stay.whyGroupsTitle}</h3>
            <p className="mt-2 text-[0.9375rem] text-night-600">{t.stay.whyGroupsLead}</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {groupBenefits.map((benefit) => {
                const Icon = BENEFIT_ICONS[benefit.icon as keyof typeof BENEFIT_ICONS] ?? KeyRound;
                return (
                  <li key={benefit.id} className="rounded-card border border-night-100 bg-white p-5 shadow-subtle">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-night-950 text-glacier-300">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h4 className="mt-3.5 font-display text-[0.9375rem] font-extrabold text-night-950">{L(benefit.title)}</h4>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-night-600">{L(benefit.text)}</p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Alaprajz */}
      <Section tone="white" id="alaprajz">
        <SectionHeading title={t.stay.floorplanTitle} lead={t.stay.floorplanLead} className="mb-10" />
        <FloorPlanPanel />
      </Section>

      {/* Galéria */}
      <Section tone="frost" id="galeria">
        <SectionHeading title={t.stay.galleryTitle} lead={t.stay.galleryLead} className="mb-10" />
        <Gallery images={galleryImages} />
      </Section>

      {/* Záró CTA */}
      <Section tone="night" size="sm">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h2 className="text-h2 text-white">{t.groups.ctaTitle}</h2>
            <p className="mt-3 max-w-xl text-lead text-frost-200">{t.groups.ctaLead}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={routes.inquiry}
              size="lg"
              onClick={() => track('start_accommodation_inquiry', { source: 'stay-footer' })}
            >
              {t.cta.requestQuote}
            </ButtonLink>
            <ButtonLink href={routes.availability} variant="onDark" size="lg">
              {t.cta.checkAvailability}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
