'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { ageGroupLabels, currency } from '@/data/tickets';
import { ONLINE_CHECKOUT_ENABLED, checkoutUnavailableMessage } from '@/services/ticketService';
import { recommendTicket } from '@/lib/pricing';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/cn';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { PrimaryButton } from '@/components/ui/Button';
import { routes } from '@/data/navigation';
import type { AgeGroup } from '@/types';

/**
 * DÖNTÉSTÁMOGATÓ — 3 KÉRDÉS (drótváz 05/02–03)
 * Hányan? · Hány napra? · Korosztály? → ajánlott jegytípus + ár.
 * A logika: `src/lib/pricing.ts`, az árak: `src/data/tickets.ts`.
 */

const peopleOptions = [1, 2, 3, 4, 5, 6];
const dayOptions = [1, 2, 3, 4, 5, 6, 7, 8];
const ageOptions: AgeGroup[] = ['child', 'youth', 'adult', 'senior'];

function OptionRow<T extends string | number>({
  legend,
  hint,
  options,
  value,
  onChange,
  renderLabel,
  step,
}: {
  legend: string;
  hint: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  renderLabel: (option: T) => string;
  step: number;
}) {
  return (
    <fieldset className="border-b border-deep-100 pb-5 last:border-0 last:pb-0">
      <legend className="flex items-center gap-2 text-[0.95rem] font-semibold text-deep-900">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-deep-800 text-[0.7rem] font-bold text-white">
          {step}
        </span>
        {legend}
      </legend>
      <p className="ml-8 mt-1 text-xs text-deep-500">{hint}</p>
      <div className="ml-0 mt-3 flex flex-wrap gap-2 sm:ml-8">
        {options.map((option) => (
          <button
            key={String(option)}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cn(
              'min-h-[44px] rounded-pill border px-4 text-sm font-semibold transition-colors',
              value === option
                ? 'border-deep-800 bg-deep-800 text-white'
                : 'border-deep-200 bg-white text-deep-700 hover:border-deep-300 hover:bg-deep-50',
            )}
          >
            {renderLabel(option)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function TicketAdvisor() {
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(1);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');

  const recommendation = useMemo(() => recommendTicket(people, days, ageGroup), [people, days, ageGroup]);

  // MÉRÉS 2: ajánlott jegytípus megtekintése (a válaszok minden változásakor)
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.viewRecommendedTicket, {
      ticket_id: recommendation.product.id,
      ticket_name: recommendation.product.name,
      people,
      days,
      age_group: ageGroup,
      total_price: recommendation.totalPrice,
    });
  }, [recommendation, people, days, ageGroup]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
        <div className="space-y-5">
          <OptionRow
            step={1}
            legend="Hányan jöttök?"
            hint="A jegyek darabszámát ez határozza meg."
            options={peopleOptions}
            value={people}
            onChange={setPeople}
            renderLabel={(option) => (option === 6 ? '6+ fő' : `${option} fő`)}
          />
          <OptionRow
            step={2}
            legend="Hány napra?"
            hint="Egymást követő síelt napok száma."
            options={dayOptions}
            value={days}
            onChange={setDays}
            renderLabel={(option) => (option === 8 ? '8+ nap' : `${option} nap`)}
          />
          <OptionRow
            step={3}
            legend="Melyik korosztály?"
            hint="A pontos korhatárokat a végleges árlista tartalmazza."
            options={ageOptions}
            value={ageGroup}
            onChange={setAgeGroup}
            renderLabel={(option) => ageGroupLabels[option]}
          />
        </div>
      </div>

      {/* AJÁNLOTT JEGY + AZONNALI VÁSÁRLÁS (drótváz 05/03) */}
      <div className="flex flex-col rounded-panel border border-glacier-200 bg-glacier-50/60 p-5 sm:p-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-glacier-600 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-white">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
          Ajánlott jegytípus
        </span>

        <h3 className="mt-3 text-h2" aria-live="polite">
          {recommendation.product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-deep-700">{recommendation.reason}</p>

        <ul className="mt-4 space-y-2">
          {recommendation.product.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-deep-800">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-card border border-white bg-white p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-deep-500">
                {ageGroupLabels[ageGroup]} · {days} nap
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-deep-900">
                {formatCurrency(recommendation.unitPrice, currency)}
              </p>
              <p className="text-xs text-deep-500">/ fő</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-deep-500">{people} főre</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-glacier-700">
                {formatCurrency(recommendation.totalPrice, currency)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-5">
          {ONLINE_CHECKOUT_ENABLED ? (
            <PrimaryButton
              size="lg"
              fullWidth
              onClick={() =>
                // MÉRÉS 1: jegyvásárlás megkezdése
                trackEvent(ANALYTICS_EVENTS.beginTicketPurchase, {
                  cta_location: 'ticket_advisor',
                  ticket_id: recommendation.product.id,
                  quantity: people,
                  value: recommendation.totalPrice,
                })
              }
              iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
            >
              Vásárlás
            </PrimaryButton>
          ) : (
            <>
              <PrimaryButton
                size="lg"
                fullWidth
                disabled
                title={checkoutUnavailableMessage}
                iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
              >
                Vásárlás
              </PrimaryButton>
              <p className="mt-2 text-center text-xs text-deep-600">{checkoutUnavailableMessage}</p>
              <p className="mt-3 text-center text-sm">
                <a href={`${routes.info}#kapcsolat`} className="font-semibold text-glacier-700 link-underline">
                  Kérdésed van? Írj vagy hívj minket.
                </a>
              </p>
            </>
          )}
          <DemoNotice className="mt-4" message="Az árak demó értékek a döntéstámogató bemutatásához. Végleges árlista: src/data/tickets.ts" />
        </div>
      </div>
    </div>
  );
}
