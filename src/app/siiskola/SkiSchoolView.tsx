'use client';

import {
  Check, Footprints, Glasses, Hand, IdCard, Shirt, Sun, Wrench,
} from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import {
  instructors, rentalItems, serviceItems, skiSchoolPackages, whatToBring,
} from '@/data/skischool';
import { formatPrice } from '@/lib/format';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { InstructorCard } from '@/components/features/InstructorCard';

const BRING_ICONS = {
  shirt: Shirt, hand: Hand, glasses: Glasses, sun: Sun, footprints: Footprints, 'id-card': IdCard,
} as const;

export function SkiSchoolView() {
  const { t, L, locale } = useI18n();
  const featured = skiSchoolPackages.find((p) => p.featured) ?? skiSchoolPackages[0];
  const others = skiSchoolPackages.filter((p) => p.id !== featured.id);

  return (
    <>
      <PageHero
        imageKey="hero-school"
        kicker={t.nav.school}
        title={t.school.heroTitle}
        lead={t.school.lead}
        crumbs={[{ label: t.school.title, href: routes.skiSchool }]}
      >
        <ButtonLink
          href={`${routes.contact}#kapcsolat`}
          size="lg"
          onClick={() => track('start_ski_school_booking', { source: 'school-hero' })}
        >
          {t.cta.bookLesson}
        </ButtonLink>
        <ButtonLink href="#kolcsonzo" variant="onDark" size="lg">
          {t.school.rentalTitle}
        </ButtonLink>
      </PageHero>

      {/* Kiemelt csomag */}
      <Section tone="frost">
        <SectionHeading title={t.school.packageTitle} lead={t.school.packageLead} className="mb-10" />

        <Reveal>
          <div className="grid overflow-hidden rounded-panel border border-night-100 bg-white shadow-card lg:grid-cols-2">
            <Media
              mediaKey={featured.imageKey}
              className="min-h-[260px] lg:min-h-[420px]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="inline-flex w-fit items-center rounded-pill bg-night-950 px-3.5 py-1.5 text-[0.75rem] font-bold uppercase tracking-wider text-glacier-300">
                {L(featured.audience)}
              </p>
              <h3 className="mt-5 font-display text-[1.75rem] font-extrabold leading-tight text-night-950">{L(featured.name)}</h3>
              <p className="mt-2 text-[0.9375rem] font-semibold text-glacier-700">{L(featured.durationLabel)}</p>

              <ul className="mt-6 space-y-2.5">
                {featured.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[0.9375rem] text-night-700">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-500" />
                    {L(item)}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-4">
                <div>
                  <p className="font-display text-[2.5rem] font-extrabold leading-none text-night-950">
                    {formatPrice(featured.priceEur, locale)}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] text-night-500">{L(featured.priceNote)}</p>
                </div>
                <ButtonLink
                  href={`${routes.contact}#kapcsolat`}
                  size="lg"
                  className="ml-auto"
                  onClick={() => track('start_ski_school_booking', { package: featured.id })}
                >
                  {t.cta.bookLesson}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>

        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((pack, index) => (
            <Reveal key={pack.id} as="li" delay={index * 70} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-card border border-night-100 bg-white shadow-subtle">
                <Media mediaKey={pack.imageKey} className="aspect-[16/9]" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.0625rem] font-extrabold text-night-950">{L(pack.name)}</h3>
                  <p className="mt-1 text-[0.8125rem] font-semibold text-glacier-700">{L(pack.durationLabel)}</p>
                  <p className="mt-2 text-[0.875rem] text-night-600">{L(pack.audience)}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {pack.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[0.875rem] text-night-600">
                        <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-glacier-500" />
                        {L(item)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-night-100 pt-4">
                    <div>
                      <p className="font-display text-xl font-extrabold text-night-950">{formatPrice(pack.priceEur, locale)}</p>
                      <p className="text-[0.75rem] text-night-500">{L(pack.priceNote)}</p>
                    </div>
                    <ButtonLink
                      href={`${routes.contact}#kapcsolat`}
                      variant="secondary"
                      size="sm"
                      onClick={() => track('start_ski_school_booking', { package: pack.id })}
                    >
                      {t.school.bookInstructor}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Oktatók */}
      <Section tone="white" id="oktatok">
        <SectionHeading title={t.school.instructorsTitle} lead={t.school.instructorsLead} className="mb-10" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor, index) => (
            <Reveal key={instructor.id} as="li" delay={index * 70} className="h-full">
              <InstructorCard instructor={instructor} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Mit hozzak magammal */}
      <Section tone="night">
        <SectionHeading title={t.school.bringTitle} lead={t.school.bringLead} invert className="mb-10" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whatToBring.map((item, index) => {
            const Icon = BRING_ICONS[item.icon as keyof typeof BRING_ICONS] ?? Check;
            return (
              <Reveal key={item.id} as="li" delay={index * 60} className="h-full">
                <div className="flex h-full gap-4 rounded-card border border-white/12 bg-white/[0.06] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-glacier-400/15 text-glacier-300">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[0.9375rem] font-extrabold text-white">{L(item.label)}</h3>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-frost-300/85">{L(item.note)}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* Kölcsönző */}
      <Section tone="frost" id="kolcsonzo">
        <SectionHeading title={t.school.rentalTitle} lead={t.school.rentalLead} className="mb-10" />

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            {/* Mobil: kártyák */}
            <ul className="space-y-4 lg:hidden">
              {rentalItems.map((item) => (
                <li key={item.id} className="rounded-card border border-night-100 bg-white p-5 shadow-subtle">
                  <h3 className="font-display text-[1rem] font-extrabold text-night-950">{L(item.category)}</h3>
                  <p className="mt-1 text-[0.8125rem] text-glacier-700">{L(item.level)}</p>
                  <ul className="mt-3 space-y-1">
                    {item.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-[0.875rem] text-night-600">
                        <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-glacier-500" />
                        {L(inc)}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-night-100 pt-3 text-[0.875rem]">
                    <div className="flex gap-1.5">
                      <dt className="text-night-500">{t.school.perDay}</dt>
                      <dd className="font-bold text-night-950">{formatPrice(item.pricePerDayEur, locale)}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-night-500">{t.school.perWeek}</dt>
                      <dd className="font-bold text-night-950">{formatPrice(item.pricePerWeekEur, locale)}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-night-500">{t.school.sizes}</dt>
                      <dd className="font-semibold text-night-800">{item.sizes}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>

            {/* Asztali: táblázat */}
            <div className="hidden overflow-hidden rounded-panel border border-night-100 bg-white shadow-subtle lg:block">
              <table className="w-full text-left">
                <caption className="sr-only">{t.school.rentalTable}</caption>
                <thead>
                  <tr className="bg-frost-100 text-[0.75rem] uppercase tracking-wider text-night-500">
                    <th scope="col" className="px-6 py-4 font-bold">{t.school.rentalTable}</th>
                    <th scope="col" className="px-4 py-4 font-bold">{t.school.sizes}</th>
                    <th scope="col" className="px-4 py-4 text-right font-bold">{t.school.perDay}</th>
                    <th scope="col" className="px-4 py-4 text-right font-bold">{t.school.perWeek}</th>
                  </tr>
                </thead>
                <tbody>
                  {rentalItems.map((item) => (
                    <tr key={item.id} className="border-t border-night-100">
                      <th scope="row" className="px-6 py-4 font-semibold text-night-950">
                        {L(item.category)}
                        <span className="mt-0.5 block text-[0.8125rem] font-normal text-night-500">
                          {L(item.level)} · {item.includes.map((inc) => L(inc)).join(', ')}
                        </span>
                      </th>
                      <td className="px-4 py-4 text-[0.875rem] text-night-700">{item.sizes}</td>
                      <td className="px-4 py-4 text-right font-bold tabular-nums text-night-950">{formatPrice(item.pricePerDayEur, locale)}</td>
                      <td className="px-4 py-4 text-right font-bold tabular-nums text-night-950">{formatPrice(item.pricePerWeekEur, locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="szerviz" className="scroll-mt-40">
            <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-night-950">
              <Wrench aria-hidden="true" className="h-5 w-5 text-glacier-600" />
              {t.school.serviceTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceItems.map((service) => (
                <li key={service.id} className={cn(
                  'rounded-card border border-night-100 bg-white p-4 shadow-subtle',
                  service.id.startsWith('depot') && 'border-glacier-200 bg-frost-50',
                )}>
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold text-night-950">{L(service.name)}</h4>
                    {service.priceEur !== null ? (
                      <p className="shrink-0 text-right">
                        <span className="font-bold tabular-nums text-night-950">{formatPrice(service.priceEur, locale)}</span>
                        <span className="block text-[0.6875rem] text-night-500">/ {L(service.priceLabel)}</span>
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-[0.875rem] leading-snug text-night-600">{L(service.description)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
