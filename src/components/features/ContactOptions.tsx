'use client';

import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { contactInfo, fullAddress, officeHours } from '@/data/contact';
import { toTelHref, toWhatsAppHref } from '@/lib/format';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

/** PÁRHUZAMOS KAPCSOLATFELVÉTELI CSATORNÁK. */
export function ContactOptions({ invert = false, compact = false }: { invert?: boolean; compact?: boolean }) {
  const { t, L } = useI18n();

  const channels = [
    {
      id: 'phone',
      icon: Phone,
      label: t.cta.call,
      value: contactInfo.phoneSecondary,
      href: toTelHref(contactInfo.phoneSecondary),
      event: 'click_phone' as const,
      external: false,
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: t.cta.whatsapp,
      value: contactInfo.whatsapp,
      href: toWhatsAppHref(contactInfo.whatsapp, 'Szia! A Berghaus Almrausch szabad időpontjairól szeretnék érdeklődni.'),
      event: 'click_whatsapp' as const,
      external: true,
    },
    {
      id: 'email',
      icon: Mail,
      label: t.cta.email,
      value: contactInfo.bookingEmail,
      href: `mailto:${contactInfo.bookingEmail}`,
      event: 'click_email' as const,
      external: false,
    },
  ];

  return (
    <div className={cn('grid gap-3', compact ? 'sm:grid-cols-3' : 'sm:grid-cols-3')}>
      {channels.map((channel) => (
        <a
          key={channel.id}
          href={channel.href}
          onClick={() => track(channel.event, { source: 'contact-options' })}
          {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cn(
            'group flex items-center gap-3 rounded-card border px-4 py-4 transition-all duration-200 hover:-translate-y-0.5',
            invert
              ? 'border-white/15 bg-white/[0.06] hover:border-glacier-400/50 hover:bg-white/10'
              : 'border-night-100 bg-white shadow-subtle hover:border-glacier-300 hover:shadow-card',
          )}
        >
          <span className={cn(
            'grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors',
            invert ? 'bg-glacier-400/15 text-glacier-300' : 'bg-frost-200 text-glacier-600',
          )}>
            <channel.icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className={cn('block text-[0.75rem] font-bold uppercase tracking-wider', invert ? 'text-frost-300/70' : 'text-night-500')}>
              {channel.label}
            </span>
            <span className={cn('mt-0.5 block truncate font-semibold', invert ? 'text-white' : 'text-night-950')}>
              {channel.value}
            </span>
          </span>
        </a>
      ))}

      {!compact ? (
        <>
          <a
            href={contactInfo.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('open_directions', { source: 'contact-options' })}
            className={cn(
              'group flex items-start gap-3 rounded-card border px-4 py-4 transition-all duration-200 sm:col-span-2',
              invert ? 'border-white/15 bg-white/[0.06] hover:bg-white/10' : 'border-night-100 bg-white shadow-subtle hover:shadow-card',
            )}
          >
            <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', invert ? 'bg-glacier-400/15 text-glacier-300' : 'bg-frost-200 text-glacier-600')}>
              <MapPin aria-hidden="true" className="h-5 w-5" />
            </span>
            <span>
              <span className={cn('block text-[0.75rem] font-bold uppercase tracking-wider', invert ? 'text-frost-300/70' : 'text-night-500')}>
                {t.contact.address}
              </span>
              <span className={cn('mt-0.5 block font-semibold', invert ? 'text-white' : 'text-night-950')}>{fullAddress}</span>
            </span>
          </a>

          <div className={cn(
            'flex items-start gap-3 rounded-card border px-4 py-4',
            invert ? 'border-white/15 bg-white/[0.06]' : 'border-night-100 bg-white shadow-subtle',
          )}>
            <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl', invert ? 'bg-glacier-400/15 text-glacier-300' : 'bg-frost-200 text-glacier-600')}>
              <Clock aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className={cn('text-[0.75rem] font-bold uppercase tracking-wider', invert ? 'text-frost-300/70' : 'text-night-500')}>
                {t.contact.openingHours}
              </p>
              <ul className="mt-1 space-y-0.5">
                {officeHours.map((entry) => (
                  <li key={entry.hours + L(entry.label)} className={cn('text-[0.8125rem]', invert ? 'text-frost-200' : 'text-night-700')}>
                    <span className="font-semibold">{entry.hours}</span> · {L(entry.label)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
