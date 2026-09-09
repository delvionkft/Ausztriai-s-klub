'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { buildStaySubNav } from '@/data/navigation';
import { contactInfo } from '@/data/contact';
import { toTelHref, toWhatsAppHref } from '@/lib/format';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

/** A szállásoldalak közös al-navigációja. */
export function StaySubNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const items = buildStaySubNav(t);

  return (
    <div className="sticky top-[calc(var(--header-h)+var(--status-h))] z-30 border-b border-night-100 bg-white/95 backdrop-blur-lg">
      <div className="container-page">
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'tap-target inline-flex shrink-0 items-center rounded-pill px-4 text-sm font-semibold transition-colors',
                  active ? 'bg-night-950 text-white' : 'text-night-600 hover:bg-frost-100 hover:text-night-950',
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <span aria-hidden="true" className="mx-1 hidden h-6 w-px shrink-0 bg-night-100 sm:block" />

          <a
            href={toWhatsAppHref(contactInfo.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('click_whatsapp', { source: 'stay-subnav' })}
            className="tap-target inline-flex shrink-0 items-center gap-1.5 rounded-pill px-3.5 text-sm font-semibold text-night-600 transition-colors hover:bg-frost-100 hover:text-night-950"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            {t.cta.whatsapp}
          </a>
          <a
            href={toTelHref(contactInfo.phoneSecondary)}
            onClick={() => track('click_phone', { source: 'stay-subnav' })}
            className="tap-target inline-flex shrink-0 items-center gap-1.5 rounded-pill px-3.5 text-sm font-semibold text-night-600 transition-colors hover:bg-frost-100 hover:text-night-950"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            {t.cta.call}
          </a>
        </div>
      </div>
    </div>
  );
}
