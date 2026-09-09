'use client';

import { useState } from 'react';
import {
  Baby, Building2, CalendarCheck, CheckCircle2, GraduationCap, Heart, Info, Loader2, Users,
} from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { discounts, ticketTypes } from '@/data/tickets';
import { startTicketCheckout } from '@/services/ticketService';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TicketAdvisor } from '@/components/features/TicketAdvisor';
import { PriceCalendar } from '@/components/features/PriceCalendar';
import { TicketTable } from '@/components/features/TicketTable';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { toISODate } from '@/lib/date';

const DISCOUNT_ICONS = {
  users: Users, 'graduation-cap': GraduationCap, heart: Heart,
  'building-2': Building2, baby: Baby, 'calendar-check': CalendarCheck,
} as const;

export function TicketsView() {
  const { t, L } = useI18n();
  const [checkout, setCheckout] = useState<{ status: 'idle' | 'loading' | 'done'; ticketId?: string; reference?: string }>({ status: 'idle' });

  /**
   * DEMO VÁSÁRLÁS
   * A `src/services/ticketService.ts` élesben a jegyértékesítő rendszer
   * `checkoutUrl`-jére irányít. Amíg nincs bekötve, ez a működő demo-folyamat fut.
   */
  const runCheckout = async (ticketId: string) => {
    setCheckout({ status: 'loading', ticketId });
    const result = await startTicketCheckout({
      ticketId, quantity: 1, date: toISODate(new Date()), ageGroup: 'adult',
    });
    setCheckout({ status: 'done', ticketId, reference: result.reference });
  };

  const ticketName = checkout.ticketId ? ticketTypes.find((item) => item.id === checkout.ticketId) : null;

  return (
    <>
      <PageHero
        imageKey="hero-tickets"
        kicker={t.nav.tickets}
        title={t.tickets.title}
        lead={t.tickets.lead}
        crumbs={[{ label: t.nav.tickets, href: routes.tickets }]}
        height="sm"
      />

      <Section tone="frost">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <TicketAdvisor onCheckout={runCheckout} />

            {checkout.status !== 'idle' ? (
              <div className="mt-5 animate-fade-in rounded-card border border-night-100 bg-white p-5 shadow-subtle" role="status" aria-live="polite">
                {checkout.status === 'loading' ? (
                  <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-night-700">
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    {t.tickets.checkoutTitle}…
                  </p>
                ) : (
                  <>
                    <p className="flex items-center gap-2 text-[0.9375rem] font-bold text-state-openInk">
                      <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                      {ticketName ? L(ticketName.name) : t.tickets.checkoutTitle}
                    </p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-night-600">{t.tickets.checkoutDemo}</p>
                    {checkout.reference ? (
                      <p className="mt-3 inline-block rounded-pill bg-frost-200 px-4 py-1.5 font-mono text-[0.8125rem] font-bold text-night-900">
                        {checkout.reference}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}
          </div>

          <div>
            <SectionHeading title={t.tickets.calendarTitle} lead={t.tickets.calendarLead} level={3} className="mb-6" />
            <PriceCalendar />
          </div>
        </div>
      </Section>

      <Section tone="white" id="artablazat">
        <SectionHeading title={t.tickets.tableTitle} lead={t.tickets.tableLead} className="mb-10" />
        <TicketTable />
      </Section>

      <Section tone="frost" id="kedvezmenyek">
        <SectionHeading title={t.tickets.discountsTitle} lead={t.tickets.discountsLead} className="mb-10" />

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {discounts.map((discount, index) => {
            const Icon = DISCOUNT_ICONS[discount.icon];
            return (
              <Reveal key={discount.id} as="li" delay={index * 60} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-night-100 bg-white p-6 shadow-subtle">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-frost-200 text-glacier-600">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.0625rem] font-extrabold text-night-950">{L(discount.title)}</h3>
                  <p className="mt-1.5 text-[0.875rem] font-bold text-glacier-700">{L(discount.value)}</p>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-night-600">{L(discount.description)}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-4 rounded-panel border border-night-100 bg-white p-6 shadow-subtle sm:flex-row sm:items-center lg:p-8">
          <Info aria-hidden="true" className="h-6 w-6 shrink-0 text-glacier-600" />
          <p className="flex-1 text-[0.9375rem] leading-relaxed text-night-700">
            10 fő felett csoportos ajánlatot készítünk, amelyben a síbérlet, az oktatás és a szállás egy csomagban szerepel,
            egyetlen számlával.
          </p>
          <ButtonLink href={routes.groups} size="lg" className="shrink-0">
            {t.cta.requestQuote}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
