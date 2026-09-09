'use client';

import { Check, Star } from 'lucide-react';
import type { AgeGroup } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { ageGroupInfo, ticketTypes } from '@/data/tickets';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';

const COLUMNS: AgeGroup[] = ['adult', 'youth', 'child', 'student', 'senior'];

/**
 * ÁRTÁBLÁZAT
 * ----------------------------------------------------------------------------
 * Asztali nézetben klasszikus táblázat, mobilon kártyanézet — így nincs
 * vízszintes görgetés és nem lesz apró a szöveg.
 */
export function TicketTable() {
  const { t, L, locale } = useI18n();

  const columnLabel: Record<AgeGroup, string> = {
    adult: t.tickets.colAdult,
    youth: t.tickets.colYouth,
    child: t.tickets.colChild,
    student: t.tickets.colStudent,
    senior: t.tickets.colSenior,
  };

  return (
    <div>
      {/* Mobil: kártyák */}
      <ul className="space-y-4 lg:hidden">
        {ticketTypes.map((ticket) => (
          <li key={ticket.id} className={cn('rounded-card border bg-white p-5 shadow-subtle', ticket.popular ? 'border-glacier-400' : 'border-night-100')}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[1.0625rem] font-extrabold text-night-950">{L(ticket.name)}</h3>
              {ticket.popular ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-frost-200 px-2.5 py-1 text-[0.6875rem] font-bold uppercase text-glacier-700">
                  <Star aria-hidden="true" className="h-3 w-3" /> {t.tickets.popularBadge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-[0.875rem] leading-snug text-night-600">{L(ticket.description)}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-night-100 pt-4 text-[0.875rem]">
              {COLUMNS.filter((group) => ticket.prices[group] !== undefined).map((group) => (
                <div key={group} className="flex items-center justify-between gap-2">
                  <dt className="text-night-500">{columnLabel[group]}</dt>
                  <dd className="font-bold tabular-nums text-night-950">{formatPrice(ticket.prices[group]!, locale)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* Asztali: táblázat */}
      <div className="hidden overflow-hidden rounded-panel border border-night-100 bg-white shadow-subtle lg:block">
        <table className="w-full text-left">
          <caption className="sr-only">{t.tickets.tableTitle}</caption>
          <thead>
            <tr className="bg-frost-100 text-[0.75rem] uppercase tracking-wider text-night-500">
              <th scope="col" className="px-6 py-4 font-bold">{t.tickets.colType}</th>
              {COLUMNS.map((group) => (
                <th key={group} scope="col" className="px-4 py-4 text-right font-bold">
                  {columnLabel[group]}
                  <span className="mt-0.5 block text-[0.6875rem] font-medium normal-case tracking-normal text-night-400">
                    {ageGroupInfo.find((a) => a.id === group)?.range}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ticketTypes.map((ticket) => (
              <tr key={ticket.id} className={cn('border-t border-night-100', ticket.popular && 'bg-frost-50')}>
                <th scope="row" className="px-6 py-4 font-semibold text-night-950">
                  <span className="flex items-center gap-2">
                    {L(ticket.name)}
                    {ticket.popular ? <Star aria-label={t.tickets.popularBadge} className="h-3.5 w-3.5 text-glacier-500" /> : null}
                  </span>
                  <span className="mt-1 block max-w-md text-[0.8125rem] font-normal leading-snug text-night-500">{L(ticket.description)}</span>
                </th>
                {COLUMNS.map((group) => (
                  <td key={group} className="px-4 py-4 text-right font-bold tabular-nums text-night-900">
                    {ticket.prices[group] !== undefined
                      ? formatPrice(ticket.prices[group]!, locale)
                      : <span className="text-[0.75rem] font-medium text-night-400">{t.tickets.packagePrice}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-night-100 bg-frost-100 px-6 py-3 text-[0.8125rem] text-night-600">
          <Check aria-hidden="true" className="mr-1.5 inline h-3.5 w-3.5 text-glacier-600" />
          {t.tickets.tableLead}
        </p>
      </div>
    </div>
  );
}
