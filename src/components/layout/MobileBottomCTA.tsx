'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck, MessageCircle, Phone, Snowflake, Ticket } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { contactInfo } from '@/data/contact';
import { toTelHref, toWhatsAppHref } from '@/lib/format';
import { track, type AnalyticsEvent } from '@/lib/analytics';

/**
 * FIX ALSÓ CTA-SÁV (mobil)
 * ----------------------------------------------------------------------------
 * Kontextusfüggő: a hegyi oldalakon jegy és hójelentés, a szállásoldalakon
 * ajánlatkérés, telefon és WhatsApp. A tartalom alján `pb-mobile-cta` gondoskodik
 * arról, hogy a sáv semmit ne takarjon.
 */
interface Action {
  key: string;
  label: string;
  href: string;
  icon: typeof Ticket;
  primary?: boolean;
  external?: boolean;
  event?: AnalyticsEvent;
}

export function MobileBottomCTA() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isStay = pathname.startsWith(routes.stay) || pathname.startsWith(routes.groups);

  const actions: Action[] = isStay
    ? [
      { key: 'dates', label: t.cta.checkAvailability, href: routes.availability, icon: CalendarCheck, event: 'select_accommodation_dates' },
      { key: 'quote', label: t.cta.requestQuote, href: routes.inquiry, icon: MessageCircle, primary: true, event: 'start_accommodation_inquiry' },
      { key: 'call', label: t.cta.call, href: toTelHref(contactInfo.phoneSecondary), icon: Phone, external: true, event: 'click_phone' },
    ]
    : [
      { key: 'snow', label: t.cta.snowReport, href: routes.snowReport, icon: Snowflake, event: 'view_snow_report' },
      { key: 'ticket', label: t.cta.buyTicket, href: routes.tickets, icon: Ticket, primary: true, event: 'begin_ticket_checkout' },
      { key: 'wa', label: t.cta.whatsapp, href: toWhatsAppHref(contactInfo.whatsapp), icon: MessageCircle, external: true, event: 'click_whatsapp' },
    ];

  return (
    <nav
      aria-label={t.a11y.mobileCta}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-night-100 bg-white/95 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-3 gap-1 px-2 py-2">
        {actions.map((action) => {
          const content = (
            <>
              <action.icon aria-hidden="true" className="h-5 w-5" />
              <span className="text-[0.6875rem] font-bold leading-tight">{action.label}</span>
            </>
          );
          const className = action.primary
            ? 'flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-card bg-sky-400 px-2 text-night-950 shadow-glow'
            : 'flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-card px-2 text-night-700 transition-colors active:bg-frost-200';

          return action.external ? (
            <a
              key={action.key}
              href={action.href}
              onClick={() => action.event && track(action.event, { source: 'mobile-cta' })}
              className={className}
              {...(action.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {content}
            </a>
          ) : (
            <Link
              key={action.key}
              href={action.href}
              onClick={() => action.event && track(action.event, { source: 'mobile-cta' })}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
