'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Menu, Phone, Snowflake, Ticket, X } from 'lucide-react';
import { mainNavigation, routes } from '@/data/navigation';
import { contactInfo } from '@/data/contact';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/cn';
import { toDialString } from '@/lib/format';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * MOBIL NAVIGÁCIÓ
 * A menü hamburgerikon mögött, nagy érintőfelületekkel (min. 48px),
 * erős kontraszttal. A státuszsáv és a fő CTA-k soha nem csukódnak össze.
 */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useLockBodyScroll(open);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-deep-200 text-deep-800 transition-colors hover:bg-deep-50 lg:hidden"
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
        <span className="sr-only">Menü megnyitása</span>
      </button>

      {/*
        A fejléc `backdrop-blur`-je saját stacking contextet hoz létre, ezért a
        menüt portállal a <body> alá rendereljük — így biztosan a tapadó fejléc
        és az élő státuszsáv FÖLÖTT jelenik meg.
      */}
      {open && mounted
        ? createPortal(
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Menü bezárása"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-deep-950/55 backdrop-blur-sm"
          />

          <nav
            id="mobile-menu"
            aria-label="Mobil főmenü"
            className="absolute inset-y-0 right-0 flex w-[min(22rem,92vw)] animate-fade-in flex-col bg-white shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-deep-100 px-4 py-3">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-deep-500">Menü</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-deep-200 text-deep-800 transition-colors hover:bg-deep-50"
              >
                <X aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Bezárás</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
              <ul className="space-y-1">
                {mainNavigation.map((item) => {
                  const isOpenGroup = expanded === item.label;
                  const active = pathname === item.href || item.children?.some((c) => c.href === pathname);

                  return (
                    <li key={item.label}>
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setExpanded(isOpenGroup ? null : item.label)}
                            aria-expanded={isOpenGroup}
                            className={cn(
                              'flex min-h-[52px] w-full items-center justify-between rounded-xl px-3 text-left text-[1.02rem] font-semibold transition-colors',
                              active ? 'bg-deep-50 text-deep-900' : 'text-deep-800 hover:bg-deep-50',
                            )}
                          >
                            {item.label}
                            <ChevronDown
                              aria-hidden="true"
                              className={cn('h-4 w-4 text-deep-500 transition-transform', isOpenGroup && 'rotate-180')}
                            />
                          </button>
                          {isOpenGroup ? (
                            <ul className="mb-1 ml-3 space-y-0.5 border-l border-deep-100 pl-3">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    aria-current={pathname === child.href ? 'page' : undefined}
                                    className={cn(
                                      'flex min-h-[48px] items-center rounded-lg px-3 text-[0.95rem] transition-colors',
                                      pathname === child.href
                                        ? 'bg-glacier-50 font-semibold text-glacier-700'
                                        : 'text-deep-700 hover:bg-deep-50',
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={pathname === item.href ? 'page' : undefined}
                          className={cn(
                            'flex min-h-[52px] items-center rounded-xl px-3 text-[1.02rem] font-semibold transition-colors',
                            pathname === item.href ? 'bg-deep-50 text-deep-900' : 'text-deep-800 hover:bg-deep-50',
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-2 border-t border-deep-100 bg-frost px-3 py-3">
              <Link
                href={routes.tickets}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-pill bg-deep-800 px-4 font-semibold text-white transition-colors hover:bg-deep-700"
              >
                <Ticket aria-hidden="true" className="h-4 w-4" />
                Jegyvásárlás
              </Link>
              <Link
                href={routes.snowReport}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-pill border border-deep-200 bg-white px-4 font-semibold text-deep-800 transition-colors hover:bg-deep-50"
              >
                <Snowflake aria-hidden="true" className="h-4 w-4" />
                Hójelentés
              </Link>
              {contactInfo.phone ? (
                <a
                  href={`tel:${toDialString(contactInfo.phone)}`}
                  className="flex min-h-[52px] items-center justify-center gap-2 rounded-pill border border-deep-200 bg-white px-4 font-semibold text-deep-800 transition-colors hover:bg-deep-50"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {contactInfo.phone}
                </a>
              ) : null}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-deep-500">Nyelv</span>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </div>,
        document.body,
      )
        : null}
    </>
  );
}
