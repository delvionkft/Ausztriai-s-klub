'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Snowflake, Ticket } from 'lucide-react';
import { mainNavigation, routes } from '@/data/navigation';
import { useI18n } from '@/i18n/I18nProvider';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';

/**
 * FEJLÉC (drótváz 13/01)
 * Asztali: logó · 6 menüpont · Jegyvásárlás · Hójelentés · DE/EN/HU.
 * Tapad a képernyő tetejéhez, de tömör marad (68px).
 */
export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="border-b border-deep-100 bg-white/95 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label={t('cta.menu')} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNavigation.map((item) => {
                const active = pathname === item.href || item.children?.some((child) => child.href === pathname);
                const hasChildren = Boolean(item.children?.length);

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenMenu(item.label)}
                    onMouseLeave={() => hasChildren && setOpenMenu(null)}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      aria-expanded={hasChildren ? openMenu === item.label : undefined}
                      onFocus={() => hasChildren && setOpenMenu(item.label)}
                      className={cn(
                        'inline-flex min-h-[42px] items-center gap-1 rounded-lg px-3 text-[0.92rem] font-semibold transition-colors',
                        active ? 'text-glacier-700' : 'text-deep-700 hover:bg-deep-50 hover:text-deep-900',
                      )}
                    >
                      {item.labelKey ? t(item.labelKey) : item.label}
                      {hasChildren ? (
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            'h-3.5 w-3.5 text-deep-500 transition-transform',
                            openMenu === item.label && 'rotate-180',
                          )}
                        />
                      ) : null}
                    </Link>

                    {hasChildren && openMenu === item.label ? (
                      <div className="absolute left-0 top-full z-50 w-72 pt-2">
                        <ul className="overflow-hidden rounded-card border border-deep-100 bg-white p-1.5 shadow-lift">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  'block rounded-lg px-3 py-2.5 transition-colors',
                                  pathname === child.href ? 'bg-glacier-50' : 'hover:bg-deep-50',
                                )}
                              >
                                <span className="block text-sm font-semibold text-deep-900">
                                  {child.labelKey ? t(child.labelKey) : child.label}
                                </span>
                                {child.description ? (
                                  <span className="mt-0.5 block text-xs text-deep-500">{child.description}</span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={routes.snowReport}
              className="hidden min-h-[42px] items-center gap-1.5 rounded-pill border border-deep-200 px-3.5 text-sm font-semibold text-deep-800 transition-colors hover:border-deep-300 hover:bg-deep-50 md:inline-flex"
            >
              <Snowflake aria-hidden="true" className="h-4 w-4 text-glacier-600" />
              {t('cta.snowReport')}
            </Link>
            <Link
              href={routes.tickets}
              onClick={() =>
                // MÉRÉS 1: jegyvásárlás megkezdése
                trackEvent(ANALYTICS_EVENTS.beginTicketPurchase, { cta_location: 'header' })
              }
              className="hidden min-h-[42px] items-center gap-1.5 rounded-pill bg-deep-800 px-4 text-sm font-semibold text-white shadow-subtle transition-all hover:bg-deep-700 hover:shadow-card md:inline-flex"
            >
              <Ticket aria-hidden="true" className="h-4 w-4" />
              {t('cta.buyTickets')}
            </Link>
            <LanguageSwitcher className="hidden lg:block" />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
