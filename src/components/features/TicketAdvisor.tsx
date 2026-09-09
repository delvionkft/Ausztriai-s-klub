'use client';

import { useState } from 'react';
import { ArrowLeft, Check, RotateCcw, Sparkles, Ticket } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { ticketTypes } from '@/data/tickets';
import {
  recommendTicket, type AgeMix, type PartySize, type StayLength,
} from '@/lib/pricing';
import { formatPrice } from '@/lib/format';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

/**
 * JEGYAJÁNLÓ
 * ----------------------------------------------------------------------------
 * Három kérdés, majd konkrét javaslat indoklással és árral.
 * A szabályok a `src/lib/pricing.ts` `recommendTicket()` függvényében vannak.
 */
export function TicketAdvisor({ onCheckout }: { onCheckout?: (ticketId: string) => void }) {
  const { t, L, locale } = useI18n();
  const [step, setStep] = useState(0);
  const [party, setParty] = useState<PartySize | null>(null);
  const [length, setLength] = useState<StayLength | null>(null);
  const [ages, setAges] = useState<AgeMix | null>(null);

  const questions = [
    {
      key: 'party',
      title: t.tickets.q1,
      options: [
        { id: 'solo' as PartySize, label: t.tickets.q1Solo },
        { id: 'couple' as PartySize, label: t.tickets.q1Couple },
        { id: 'family' as PartySize, label: t.tickets.q1Family },
        { id: 'group' as PartySize, label: t.tickets.q1Group },
      ],
      value: party,
      set: (v: string) => { setParty(v as PartySize); setStep(1); if (step === 0) track('start_ticket_recommendation', { party: v }); },
    },
    {
      key: 'length',
      title: t.tickets.q2,
      options: [
        { id: 'one' as StayLength, label: t.tickets.q2One },
        { id: 'weekend' as StayLength, label: t.tickets.q2Weekend },
        { id: 'week' as StayLength, label: t.tickets.q2Week },
        { id: 'season' as StayLength, label: t.tickets.q2Season },
      ],
      value: length,
      set: (v: string) => { setLength(v as StayLength); setStep(2); },
    },
    {
      key: 'ages',
      title: t.tickets.q3,
      options: [
        { id: 'adult' as AgeMix, label: t.tickets.q3Adult },
        { id: 'family' as AgeMix, label: t.tickets.q3Family },
        { id: 'youth' as AgeMix, label: t.tickets.q3Youth },
        { id: 'senior' as AgeMix, label: t.tickets.q3Senior },
      ],
      value: ages,
      set: (v: string) => {
        setAges(v as AgeMix);
        setStep(3);
        track('complete_ticket_recommendation', { party: party ?? '', length: length ?? '', ages: v });
      },
    },
  ];

  const restart = () => { setStep(0); setParty(null); setLength(null); setAges(null); };

  const result = step === 3 && party && length && ages ? recommendTicket(party, length, ages) : null;
  const ticket = result ? ticketTypes.find((item) => item.id === result.ticketId) ?? null : null;
  const unitPrice = ticket && result ? ticket.prices[result.ageGroup] ?? ticket.prices.adult ?? 0 : 0;

  const reasonText = result
    ? {
      season: 'Ennyi síelési napnál a szezonbérlet napi ára már jóval a napijegy alatt van, és az esti síelés is benne van.',
      'multi-day': 'A többnapos bérlet napi bontásban olcsóbb a napijegynél, és a sítárolás is jár hozzá.',
      family: 'A családi jegy két felnőttet és két gyereket fed le egyetlen jegyen, külön váltva ez drágább lenne.',
      group: '10 fő felett a csoportos kedvezmény minden jegyre él, és a csoportvezetőnek külön pénztári sávot nyitunk.',
      'single-day': 'Egy napra a napijegy a legegyszerűbb: minden nyitott felvonóra érvényes, és az esti síelésre is jó.',
    }[result.reasonKey]
    : '';

  return (
    <div className="overflow-hidden rounded-panel border border-night-100 bg-white shadow-card">
      <div className="flex items-center gap-3 border-b border-night-100 bg-frost-100 px-6 py-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-night-950 text-glacier-300">
          <Sparkles aria-hidden="true" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-extrabold text-night-950">{t.tickets.advisorTitle}</h3>
          <p className="mt-0.5 text-[0.8125rem] text-night-600">{t.tickets.advisorLead}</p>
        </div>
        {step > 0 ? (
          <button
            type="button"
            onClick={restart}
            className="tap-target inline-flex shrink-0 items-center gap-1.5 rounded-pill px-3 text-[0.8125rem] font-semibold text-night-600 transition-colors hover:bg-white hover:text-night-950"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.tickets.restart}</span>
          </button>
        ) : null}
      </div>

      {/* Lépésjelző */}
      <ol className="flex gap-1.5 px-6 pt-5">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex-1">
            <span className="sr-only">{t.tickets.step} {i + 1}</span>
            <span
              aria-hidden="true"
              className={cn('block h-1.5 rounded-pill transition-colors duration-300', step > i ? 'bg-glacier-400' : step === i ? 'bg-night-300' : 'bg-night-100')}
            />
          </li>
        ))}
      </ol>

      {step < 3 ? (
        <div className="p-6">
          <p className="text-[0.75rem] font-bold uppercase tracking-wider text-glacier-600">
            {step + 1}. {t.tickets.step}
          </p>
          <h4 className="mt-2 font-display text-xl font-extrabold text-night-950">{questions[step].title}</h4>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {questions[step].options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => questions[step].set(option.id)}
                className={cn(
                  'tap-target flex items-center justify-between gap-3 rounded-card border px-5 py-4 text-left text-[0.9375rem] font-semibold transition-all duration-200',
                  questions[step].value === option.id
                    ? 'border-glacier-400 bg-frost-200 text-night-950'
                    : 'border-night-200 bg-white text-night-800 hover:border-glacier-400 hover:bg-frost-100',
                )}
              >
                {option.label}
                {questions[step].value === option.id ? <Check aria-hidden="true" className="h-4 w-4 text-glacier-600" /> : null}
              </button>
            ))}
          </div>

          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((v) => v - 1)}
              className="tap-target mt-5 inline-flex items-center gap-1.5 rounded-pill px-3 text-sm font-semibold text-night-600 transition-colors hover:bg-frost-100 hover:text-night-950"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {t.common.back}
            </button>
          ) : null}
        </div>
      ) : null}

      {step === 3 && ticket && result ? (
        <div className="animate-fade-in p-6">
          <p className="text-[0.75rem] font-bold uppercase tracking-wider text-glacier-600">{t.tickets.resultTitle}</p>
          <h4 className="mt-2 font-display text-2xl font-extrabold text-night-950">{L(ticket.name)}</h4>

          <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2 rounded-card bg-frost-100 px-5 py-4">
            <p className="font-display text-3xl font-extrabold text-night-950">{formatPrice(unitPrice, locale)}</p>
            <p className="text-[0.875rem] text-night-600">
              {result.quantity > 1 ? `${result.quantity} ${t.common.person} · ${formatPrice(unitPrice * result.quantity, locale)}` : t.common.perPerson}
            </p>
            {result.savingsEur > 0 ? (
              <p className="ml-auto inline-flex items-center gap-1.5 rounded-pill bg-state-openBg px-3 py-1.5 text-[0.8125rem] font-bold text-state-openInk">
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
                −{formatPrice(result.savingsEur, locale)}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <p className="text-[0.8125rem] font-bold uppercase tracking-wider text-night-500">{t.tickets.resultWhy}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-night-700">{reasonText}</p>
          </div>

          <ul className="mt-5 space-y-2">
            {ticket.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 text-[0.9375rem] text-night-700">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-500" />
                {L(benefit)}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => { track('begin_ticket_checkout', { ticket: ticket.id, source: 'advisor' }); onCheckout?.(ticket.id); }}
            >
              <Ticket aria-hidden="true" className="h-4 w-4" />
              {t.cta.buyNow}
            </Button>
            <Button variant="secondary" size="lg" onClick={restart}>
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {t.tickets.restart}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
