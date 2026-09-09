'use client';

import { Mail, MessageCircle, Phone } from 'lucide-react';
import { contactInfo } from '@/data/contact';
import { ANALYTICS_EVENTS, trackEvent, type AnalyticsEventName } from '@/lib/analytics';
import { toDialString } from '@/lib/format';
import { cn } from '@/lib/cn';

/**
 * PÁRHUZAMOS CSATORNÁK — WhatsApp · Telefon · E-mail (drótváz 10/05).
 * Ha egy elérhetőség még nincs megadva, a gomb NEM lesz üres link:
 * letiltott állapotban jelenik meg, magyarázó címkével.
 * Minden csatorna saját mérési eseményt küld (MÉRÉS 8–10).
 */
interface ContactActionsProps {
  layout?: 'row' | 'grid';
  tone?: 'light' | 'dark';
  /** Hol áll a gombsor — a mérési eseménybe kerül. */
  ctaLocation?: string;
  className?: string;
}

export function ContactActions({
  layout = 'grid',
  tone = 'light',
  ctaLocation = 'contact_actions',
  className,
}: ContactActionsProps) {
  const whatsappHref = contactInfo.whatsapp
    ? `https://wa.me/${toDialString(contactInfo.whatsapp).replace('+', '')}`
    : null;

  const actions = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: contactInfo.whatsapp,
      href: whatsappHref,
      icon: MessageCircle,
      event: ANALYTICS_EVENTS.clickWhatsapp as AnalyticsEventName,
      external: true,
      missing: 'WhatsApp szám megadása szükséges',
      accent: true,
    },
    {
      id: 'phone',
      label: 'Telefon',
      value: contactInfo.phone,
      href: contactInfo.phone ? `tel:${toDialString(contactInfo.phone)}` : null,
      icon: Phone,
      event: ANALYTICS_EVENTS.clickPhone as AnalyticsEventName,
      external: false,
      missing: 'Telefonszám megadása szükséges',
      accent: false,
    },
    {
      id: 'email',
      label: 'E-mail',
      value: contactInfo.email,
      href: contactInfo.email ? `mailto:${contactInfo.email}` : null,
      icon: Mail,
      event: ANALYTICS_EVENTS.clickEmail as AnalyticsEventName,
      external: false,
      missing: 'E-mail cím megadása szükséges',
      accent: false,
    },
  ];

  return (
    <ul
      className={cn(
        layout === 'grid' ? 'grid gap-3 sm:grid-cols-3' : 'flex flex-wrap gap-3',
        className,
      )}
    >
      {actions.map((action) => {
        const base =
          'flex min-h-[56px] w-full items-center justify-center gap-2 rounded-pill px-4 text-[0.95rem] font-semibold transition-colors';

        if (!action.href) {
          return (
            <li key={action.id} className={layout === 'row' ? 'flex-1' : undefined}>
              <span
                title={action.missing}
                className={cn(
                  base,
                  'cursor-not-allowed border border-dashed',
                  tone === 'dark'
                    ? 'border-white/25 text-white/45'
                    : 'border-deep-200 text-deep-500',
                )}
              >
                <action.icon aria-hidden="true" className="h-[18px] w-[18px]" />
                {action.label}
                <span className="sr-only"> — {action.missing}</span>
              </span>
            </li>
          );
        }

        return (
          <li key={action.id} className={layout === 'row' ? 'flex-1' : undefined}>
            <a
              href={action.href}
              {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => trackEvent(action.event, { cta_location: ctaLocation })}
              className={cn(
                base,
                action.accent
                  ? 'bg-glacier-600 text-white hover:bg-glacier-700'
                  : tone === 'dark'
                    ? 'border border-white/30 bg-white/10 text-white hover:bg-white/20'
                    : 'border border-deep-200 bg-white text-deep-800 hover:bg-deep-50',
              )}
            >
              <action.icon aria-hidden="true" className="h-[18px] w-[18px]" />
              {action.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
