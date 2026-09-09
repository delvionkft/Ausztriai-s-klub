'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Ticket } from 'lucide-react';
import { contactInfo } from '@/data/contact';
import { routes } from '@/data/navigation';
import { toDialString } from '@/lib/format';

/**
 * TAPADÓ MOBIL CTA (drótváz 13/02)
 * A két legfontosabb akció mindig elérhető a képernyő alján.
 * Nagy érintőfelület (56px), erős kontraszt, safe-area kezeléssel.
 */
export function StickyMobileCTA() {
  const pathname = usePathname();
  const accommodationRoutes: string[] = [routes.guesthouse, routes.groups, routes.availability, routes.quote];
  const isAccommodation = accommodationRoutes.includes(pathname);

  const whatsappHref = contactInfo.whatsapp
    ? `https://wa.me/${toDialString(contactInfo.whatsapp).replace('+', '')}`
    : null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-deep-100 bg-white/95 px-3 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-4px_20px_-6px_rgba(8,24,43,0.18)] backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Gyors műveletek"
    >
      <div className="flex gap-2 pb-2">
        <Link
          href={isAccommodation ? routes.quote : routes.tickets}
          className="flex min-h-[52px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill bg-deep-800 px-3 text-[0.9rem] font-bold text-white transition-colors active:bg-deep-900"
        >
          <Ticket aria-hidden="true" className="h-[18px] w-[18px]" />
          {isAccommodation ? 'Ajánlatot kérek' : 'Jegyvásárlás'}
        </Link>

        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[52px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill bg-glacier-600 px-3 text-[0.9rem] font-bold text-white transition-colors active:bg-glacier-700"
          >
            <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
        ) : (
          <Link
            href={`${routes.info}#kapcsolat`}
            className="flex min-h-[52px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill border border-deep-200 bg-white px-3 text-[0.9rem] font-bold text-deep-800 transition-colors active:bg-deep-50"
          >
            <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
            Kapcsolat
          </Link>
        )}
      </div>
    </div>
  );
}
