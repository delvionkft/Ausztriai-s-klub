'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck, FileText, Home, MessageCircle, Phone, Users } from 'lucide-react';
import { contactInfo } from '@/data/contact';
import { routes } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { toDialString } from '@/lib/format';

/**
 * SZÁLLÁS AL-NAVIGÁCIÓ (drótváz 07–10 · 01 blokk)
 * A szállás ág minden oldalán megjelenik, a négy fő akcióval.
 */
const navItems = [
  { href: routes.guesthouse, label: 'A vendégház', icon: Home },
  { href: routes.groups, label: 'Csoportoknak', icon: Users },
  { href: routes.availability, label: 'Szabad időpontok', icon: CalendarCheck },
  { href: routes.quote, label: 'Ajánlatot kérek', icon: FileText },
];

export function AccommodationSubNav() {
  const pathname = usePathname();

  const whatsappHref = contactInfo.whatsapp
    ? `https://wa.me/${toDialString(contactInfo.whatsapp).replace('+', '')}`
    : null;

  return (
    <div className="border-b border-deep-100 bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-2 py-2.5 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Szállás al-navigáció" className="scroll-x">
            <ul className="flex items-center gap-1 whitespace-nowrap">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-[42px] items-center gap-1.5 rounded-pill px-3.5 text-sm font-semibold transition-colors',
                        active
                          ? 'bg-deep-800 text-white'
                          : 'border border-deep-200 text-deep-700 hover:bg-deep-50',
                      )}
                    >
                      <item.icon aria-hidden="true" className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-pill bg-glacier-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-glacier-700"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp
              </a>
            ) : (
              <span
                title="WhatsApp szám megadása szükséges"
                className="inline-flex min-h-[42px] cursor-not-allowed items-center gap-1.5 rounded-pill border border-dashed border-deep-200 px-3.5 text-sm font-semibold text-deep-500"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp
              </span>
            )}

            {contactInfo.phone ? (
              <a
                href={`tel:${toDialString(contactInfo.phone)}`}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-pill border border-deep-200 px-3.5 text-sm font-semibold text-deep-800 transition-colors hover:bg-deep-50"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {contactInfo.phone}
              </a>
            ) : (
              <span
                title="Telefonszám megadása szükséges"
                className="inline-flex min-h-[42px] cursor-not-allowed items-center gap-1.5 rounded-pill border border-dashed border-deep-200 px-3.5 text-sm font-semibold text-deep-500"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                Telefon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
