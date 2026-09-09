'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { guesthouse, stayConditions } from '@/data/accommodation';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AvailabilityCalendar, type DateRange } from '@/components/features/AvailabilityCalendar';
import { StayPriceSummary } from '@/components/features/StayPriceSummary';
import { Reveal } from '@/components/ui/Reveal';

export function AvailabilityView() {
  const { t, L } = useI18n();
  const [range, setRange] = useState<DateRange>({ arrival: null, departure: null });
  const [guests, setGuests] = useState(12);

  return (
    <>
      <PageHero
        imageKey="hero-availability"
        kicker={t.nav.stay}
        title={t.availability.title}
        lead={t.availability.lead}
        crumbs={[
          { label: t.nav.guesthouse, href: routes.stay },
          { label: t.nav.availability, href: routes.availability },
        ]}
        height="sm"
      />

      <Section tone="frost">
        <div className="grid items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <div className="space-y-6">
            <AvailabilityCalendar value={range} onChange={setRange} />

            <div className="rounded-panel border border-night-100 bg-white p-5 shadow-subtle">
              <label htmlFor="guest-count" className="flex items-center gap-2 text-[0.875rem] font-semibold text-night-800">
                <Users aria-hidden="true" className="h-4 w-4 text-glacier-600" />
                {t.availability.guestCount}
              </label>
              <div className="mt-3 flex items-center gap-4">
                <input
                  id="guest-count"
                  type="range"
                  min={1}
                  max={guesthouse.maxGuests}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-pill bg-frost-300 accent-glacier-400"
                />
                <output
                  htmlFor="guest-count"
                  className="min-w-[5rem] rounded-pill bg-night-950 px-4 py-2 text-center font-display text-sm font-extrabold text-white"
                >
                  {guests} {t.common.person}
                </output>
              </div>
              <p className="mt-2 text-[0.8125rem] text-night-500">
                {t.availability.maxGuests}: {guesthouse.maxGuests} {t.common.person}
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-40">
            <StayPriceSummary arrival={range.arrival} departure={range.departure} guests={guests} />
          </div>
        </div>
      </Section>

      <Section tone="white" id="feltetelek">
        <SectionHeading title={t.availability.conditionsTitle} className="mb-10" />
        <dl className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stayConditions.map((condition, index) => (
            <Reveal key={condition.id} delay={index * 60}>
              <div className="h-full rounded-card border border-night-100 bg-white p-6 shadow-subtle">
                <dt className="font-display text-[0.9375rem] font-extrabold text-night-950">{L(condition.label)}</dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-night-600">{L(condition.value)}</dd>
              </div>
            </Reveal>
          ))}
          <Reveal delay={360}>
            <div className="h-full rounded-card border border-glacier-200 bg-frost-100 p-6">
              <dt className="font-display text-[0.9375rem] font-extrabold text-night-950">
                {t.availability.checkIn} / {t.availability.checkOut}
              </dt>
              <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-night-700">
                {t.availability.checkIn}: {guesthouse.checkIn} · {t.availability.checkOut}: {guesthouse.checkOut}
              </dd>
            </div>
          </Reveal>
        </dl>
      </Section>
    </>
  );
}
