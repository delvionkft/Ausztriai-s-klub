'use client';

import { Info, Receipt, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { fill } from '@/i18n';
import { guesthouse } from '@/data/accommodation';
import { buildStayQuote } from '@/lib/pricing';
import { formatPrice } from '@/lib/format';
import { ButtonLink } from '@/components/ui/Button';
import { routes } from '@/data/navigation';
import { track } from '@/lib/analytics';

/**
 * ÁRÖSSZESÍTŐ
 * ----------------------------------------------------------------------------
 * Tételes bontás: szállásdíj, takarítás, idegenforgalmi adó, ágynemű.
 * A kauciót külön, a fizetendő összegen kívül tüntetjük fel.
 */
export function StayPriceSummary({
  arrival, departure, guests,
}: { arrival: string | null; departure: string | null; guests: number }) {
  const { t, L, locale } = useI18n();
  const quote = arrival && departure ? buildStayQuote(arrival, departure, guests) : null;

  if (!quote) {
    return (
      <div className="rounded-panel border border-dashed border-night-200 bg-frost-100 p-8 text-center">
        <Receipt aria-hidden="true" className="mx-auto h-8 w-8 text-night-400" />
        <p className="mt-3 text-[0.9375rem] text-night-600">{t.availability.summaryEmpty}</p>
      </div>
    );
  }

  const seasonLabels = Array.from(new Set(quote.days.map((d) => L(d.seasonLabel))));
  const rows = [
    {
      key: 'accommodation',
      label: `${t.availability.accommodationFee} · ${quote.nights} ${t.common.nights}`,
      note: seasonLabels.join(' · '),
      value: quote.accommodationEur,
    },
    { key: 'cleaning', label: t.availability.cleaningFee, note: 'egyszeri', value: quote.cleaningEur },
    {
      key: 'tax',
      label: t.availability.touristTax,
      note: `${guests} ${t.common.person} · ${quote.nights} ${t.common.nights}`,
      value: quote.touristTaxEur,
    },
    { key: 'linen', label: t.availability.linenFee, note: `${guests} ${t.common.person}`, value: quote.linenEur },
  ];

  const inquiryHref = `${routes.inquiry}?erkezes=${arrival}&tavozas=${departure}&letszam=${guests}`;

  return (
    <div className="overflow-hidden rounded-panel border border-night-100 bg-white shadow-card">
      <h3 className="flex items-center gap-2 border-b border-night-100 px-6 py-4 font-display text-base font-extrabold text-night-950">
        <Receipt aria-hidden="true" className="h-5 w-5 text-glacier-600" />
        {t.availability.summaryTitle}
      </h3>

      <dl className="divide-y divide-night-100">
        {rows.map((row) => (
          <div key={row.key} className="flex items-start justify-between gap-4 px-6 py-3.5">
            <div>
              <dt className="text-[0.9375rem] font-medium text-night-800">{row.label}</dt>
              <p className="mt-0.5 text-[0.75rem] text-night-500">{row.note}</p>
            </div>
            <dd className="shrink-0 font-semibold tabular-nums text-night-950">{formatPrice(row.value, locale)}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center justify-between gap-4 border-t-2 border-night-950/10 bg-frost-100 px-6 py-4">
        <p className="font-display text-[0.9375rem] font-extrabold uppercase tracking-wide text-night-700">{t.availability.totalPayable}</p>
        <p className="font-display text-2xl font-extrabold tabular-nums text-night-950">{formatPrice(quote.totalEur, locale)}</p>
      </div>

      <div className="flex items-start gap-2.5 border-t border-night-100 px-6 py-4">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
        <div>
          <p className="text-[0.875rem] font-semibold text-night-800">
            {t.availability.deposit}: {formatPrice(quote.depositEur, locale)}
          </p>
          <p className="mt-0.5 text-[0.8125rem] leading-snug text-night-500">{t.availability.depositNote}</p>
        </div>
      </div>

      {quote.nights < quote.requiredMinNights ? (
        <p className="flex items-start gap-2 border-t border-night-100 bg-state-warnBg px-6 py-3.5 text-[0.875rem] text-state-warnInk" role="alert">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {fill(t.availability.minNightsWarning, { n: quote.requiredMinNights })}
        </p>
      ) : null}

      {quote.hasUnavailable ? (
        <p className="flex items-start gap-2 border-t border-night-100 bg-state-warnBg px-6 py-3.5 text-[0.875rem] text-state-warnInk" role="alert">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {t.availability.rangeUnavailable}
        </p>
      ) : null}

      <div className="p-6 pt-4">
        <ButtonLink
          href={inquiryHref}
          size="lg"
          fullWidth
          onClick={() => track('select_accommodation_dates', {
            arrival: arrival ?? undefined,
            departure: departure ?? undefined,
            guests,
            nights: quote.nights,
          })}
        >
          {t.availability.ctaForDates}
        </ButtonLink>
        <p className="mt-3 text-center text-[0.8125rem] text-night-500">
          {t.inquiry.responseTime} · {t.availability.maxGuests}: {guesthouse.maxGuests} {t.common.person}
        </p>
      </div>
    </div>
  );
}
