'use client';

import { Baby, CarFront, Dog, MessageSquareQuote, Snowflake, Utensils, Waves } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { groupDetails } from '@/data/accommodation';
import { reviews, verifiedFacts } from '@/data/reviews';
import { track } from '@/lib/analytics';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { CardLink } from '@/components/ui/Card';
import { ProcessSteps } from '@/components/features/ProcessSteps';

const DETAIL_ICONS = {
  utensils: Utensils, baby: Baby, dog: Dog, 'car-front': CarFront, snowflake: Snowflake, waves: Waves,
} as const;

const AUDIENCES = [
  {
    id: 'friends', imageKey: 'intent-group', href: routes.inquiry,
    title: 'Baráti síutak',
    text: '8–22 fős társaságok, akik egy házban akarnak lenni. Közös konyha, nagy asztal, saját tempó.',
  },
  {
    id: 'families', imageKey: 'exp-family', href: routes.inquiry,
    title: 'Több családból álló társaságok',
    text: 'Gyerekbarát szobabeosztás, játékszoba, etetőszék és gyerekpark 300 méterre.',
  },
  {
    id: 'clubs', imageKey: 'intent-multiday', href: routes.inquiry,
    title: 'Sportklubok és egyesületek',
    text: 'Edzőtábor teljes házzal, csoportos bérlettel és a versenypálya használatával egyeztetés szerint.',
  },
  {
    id: 'company', imageKey: 'hero-groups', href: routes.inquiry,
    title: 'Céges csapatok',
    text: 'Csapatnap a hegyen, zárt terasszal, egyszámlás elszámolással és igény szerint transzferrel.',
  },
];

export function GroupsView() {
  const { t, L } = useI18n();

  const steps = [
    { title: 'Időpont kiválasztása', text: 'Nézd meg a foglaltsági naptárat, és jelöld ki a nektek megfelelő időszakot.' },
    { title: 'Igények megadása', text: 'Létszám, csoporttípus, étkezés, oktatás és bérlet — írd meg egy üzenetben.' },
    { title: 'Személyes ajánlat', text: '24 órán belül küldjük a tételes ajánlatot, és öt napig opciósan tartjuk az időpontot.' },
    { title: 'Foglalás véglegesítése', text: '30% előleg, majd a fennmaradó összeg érkezés előtt 14 nappal. Egyetlen számlával.' },
  ];

  return (
    <>
      <PageHero
        imageKey="hero-groups"
        kicker={t.nav.stay}
        title={t.groups.title}
        lead={t.groups.lead}
        crumbs={[{ label: t.nav.groups, href: routes.groups }]}
      >
        <ButtonLink
          href={routes.inquiry}
          size="lg"
          onClick={() => track('start_accommodation_inquiry', { source: 'groups-hero' })}
        >
          {t.cta.requestQuote}
        </ButtonLink>
        <ButtonLink href={routes.availability} variant="onDark" size="lg">
          {t.cta.checkAvailability}
        </ButtonLink>
      </PageHero>

      <Section tone="frost">
        <SectionHeading title={t.groups.audienceTitle} align="center" className="mb-12" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((audience, index) => (
            <Reveal key={audience.id} as="li" delay={index * 70} className="h-full">
              <CardLink href={audience.href} className="flex h-full flex-col">
                <Media
                  mediaKey={audience.imageKey}
                  className="aspect-[4/3]"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.0625rem] font-extrabold leading-snug text-night-950">{audience.title}</h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-night-600">{audience.text}</p>
                </div>
              </CardLink>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="night">
        <SectionHeading title={t.groups.processTitle} lead={t.groups.processLead} invert className="mb-12" />
        <ProcessSteps steps={steps} invert />
      </Section>

      <Section tone="white">
        <SectionHeading title={t.groups.detailsTitle} className="mb-10" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groupDetails.map((detail, index) => {
            const Icon = DETAIL_ICONS[detail.icon as keyof typeof DETAIL_ICONS] ?? Utensils;
            return (
              <Reveal key={detail.id} as="li" delay={index * 60} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-night-100 bg-white p-6 shadow-subtle">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-frost-200 text-glacier-600">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.0625rem] font-extrabold text-night-950">{L(detail.title)}</h3>
                  <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-night-600">{L(detail.text)}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* Vélemények — csak ellenőrzött tartalom kerülhet ide. */}
      <Section tone="frost">
        <SectionHeading title={t.groups.reviewsTitle} className="mb-10" />

        {reviews.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.id} className="flex h-full flex-col rounded-card border border-night-100 bg-white p-6 shadow-subtle">
                <MessageSquareQuote aria-hidden="true" className="h-6 w-6 text-glacier-500" />
                <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-night-700">{L(review.quote)}</blockquote>
                <footer className="mt-5 border-t border-night-100 pt-4 text-[0.8125rem] text-night-500">
                  <p className="font-semibold text-night-900">{review.author}</p>
                  <p className="mt-0.5">{L(review.groupType)} · {review.stayLabel} · {review.sourceLabel}</p>
                </footer>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-panel border border-night-100 bg-white p-8 shadow-subtle lg:p-10">
            <div className="max-w-2xl">
              <h3 className="font-display text-h3">{t.groups.reviewsEmptyTitle}</h3>
              <p className="mt-3 prose-body">{t.groups.reviewsEmptyText}</p>
            </div>
            <dl className="mt-8 grid gap-6 border-t border-night-100 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {verifiedFacts.map((fact) => (
                <div key={fact.id}>
                  <dt className="font-display text-[2rem] font-extrabold leading-none text-night-950">{fact.value}</dt>
                  <dd className="mt-2 text-[0.875rem] leading-snug text-night-600">{L(fact.label)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Section>

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
              onClick={() => track('start_accommodation_inquiry', { source: 'groups-footer' })}
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
