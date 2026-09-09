'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Snowflake, Ticket } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { buildMainNav, routes } from '@/data/navigation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LiveStatusBar } from './LiveStatusBar';
import { MobileNavigation } from './MobileNavigation';

/**
 * GLOBÁLIS FEJLÉC
 * ----------------------------------------------------------------------------
 * Görgetéskor kompaktabbá válik, de a jegyvásárlás, a hójelentés és a menü
 * mindig elérhető marad. A státuszsáv minden oldalon a fejléc alatt ül.
 */
export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const nav = buildMainNav(t);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  const isActive = (href: string) => {
    const clean = href.split('#')[0];
    if (clean === routes.home) return pathname === routes.home;
    return pathname === clean || pathname.startsWith(`${clean}/`);
  };

  return (
    <>
      <a
        href="#fotartalom"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-sky-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-night-950"
      >
        {t.common.skipToContent}
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'border-b transition-all duration-300 ease-smooth',
            scrolled
              ? 'border-night-100 bg-white shadow-subtle'
              : 'border-transparent bg-gradient-to-b from-night-950/80 via-night-950/50 to-transparent',
          )}
        >
          <div className="container-page">
            <div className={cn('flex items-center gap-4 transition-all duration-300 ease-smooth', scrolled ? 'h-16' : 'h-16 lg:h-[76px]')}>
              <Logo invert={!scrolled} compact={scrolled} />

              <nav aria-label={t.a11y.mainNavigation} className="ml-2 hidden items-center gap-0.5 lg:flex xl:ml-4">
                {nav.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && setOpenGroup(item.label)}
                    onMouseLeave={() => setOpenGroup(null)}
                  >
                    {item.children ? (
                      <button
                        type="button"
                        aria-expanded={openGroup === item.label}
                        onClick={() => setOpenGroup((v) => (v === item.label ? null : item.label))}
                        className={cn(
                          'inline-flex h-11 items-center gap-1 whitespace-nowrap rounded-pill px-2.5 text-[0.875rem] font-semibold transition-colors xl:px-3 xl:text-[0.9375rem]',
                          scrolled
                            ? isActive(item.href) ? 'bg-frost-200 text-night-950' : 'text-night-700 hover:bg-night-50 hover:text-night-950'
                            : isActive(item.href) ? 'bg-white/15 text-white' : 'text-frost-100 hover:bg-white/10 hover:text-white',
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className={cn('h-4 w-4 transition-transform duration-200', openGroup === item.label && 'rotate-180')}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'inline-flex h-11 items-center whitespace-nowrap rounded-pill px-2.5 text-[0.875rem] font-semibold transition-colors xl:px-3 xl:text-[0.9375rem]',
                          scrolled
                            ? isActive(item.href) ? 'bg-frost-200 text-night-950' : 'text-night-700 hover:bg-night-50 hover:text-night-950'
                            : isActive(item.href) ? 'bg-white/15 text-white' : 'text-frost-100 hover:bg-white/10 hover:text-white',
                        )}
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.children && openGroup === item.label ? (
                      <div className="absolute left-0 top-full z-50 w-[22rem] animate-slide-down pt-2">
                        <ul className="overflow-hidden rounded-panel border border-night-100 bg-white p-2 shadow-lift">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-card px-4 py-3 transition-colors hover:bg-frost-100"
                              >
                                <span className="block text-[0.9375rem] font-bold text-night-950">{child.label}</span>
                                {child.description ? (
                                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-night-500">{child.description}</span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ))}
              </nav>

              <div className="ml-auto flex items-center gap-2">
                <Link
                  href={routes.snowReport}
                  onClick={() => track('view_snow_report', { source: 'header' })}
                  className={cn(
                    'tap-target hidden items-center gap-1.5 whitespace-nowrap rounded-pill px-3.5 text-sm font-semibold transition-colors md:inline-flex',
                    scrolled
                      ? 'border border-night-200 text-night-800 hover:border-glacier-400 hover:bg-frost-100'
                      : 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10',
                  )}
                >
                  <Snowflake aria-hidden="true" className="h-4 w-4" />
                  {t.cta.snowReport}
                </Link>

                <Link
                  href={routes.tickets}
                  onClick={() => track('begin_ticket_checkout', { source: 'header' })}
                  className="tap-target inline-flex items-center gap-1.5 rounded-pill bg-sky-400 px-4 text-sm font-bold text-night-950 shadow-glow transition-all hover:bg-glacier-300 hover:shadow-lift"
                >
                  <Ticket aria-hidden="true" className="h-4 w-4" />
                  <span className="hidden whitespace-nowrap sm:inline">{t.cta.buyTicket}</span>
                  <span className="sm:hidden">Jegy</span>
                </Link>

                <div className="hidden lg:block">
                  <LanguageSwitcher invert={!scrolled} />
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  aria-label={t.a11y.openMenu}
                  className={cn(
                    'tap-target inline-grid place-items-center rounded-pill px-2 transition-colors lg:hidden',
                    scrolled ? 'text-night-800 hover:bg-night-50' : 'text-white hover:bg-white/10',
                  )}
                >
                  <Menu aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <LiveStatusBar />
      </header>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
