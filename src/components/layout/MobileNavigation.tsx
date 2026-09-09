'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, MessageCircle, Phone, Ticket, X } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { buildMainNav, routes } from '@/data/navigation';
import { contactInfo } from '@/data/contact';
import { toTelHref, toWhatsAppHref } from '@/lib/format';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * MOBIL NAVIGÁCIÓ
 * ----------------------------------------------------------------------------
 * Teljes képernyős panel, egykezes használatra: a menüpontok az alsó
 * kétharmadban kezdődnek, minden sor legalább 48 pixel magas.
 */
export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const nav = buildMainNav(t);
  const [expanded, setExpanded] = useState<string | null>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label={t.common.menu}>
      {/* Háttér-fedőréteg: kattintásra zár, de a képernyőolvasó elől rejtett —
          a bezárást a fejléc X gombja és az Escape billentyű is elvégzi. */}
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-night-950/70 backdrop-blur-sm" />

      <div className="absolute inset-0 flex animate-fade-in flex-col bg-white">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-night-100 px-4">
          <Logo compact />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.a11y.closeMenu}
            className="tap-target inline-grid place-items-center rounded-pill px-2 text-night-700 hover:bg-night-50"
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label={t.a11y.mainNavigation} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between gap-3 rounded-card px-4 py-3.5 text-left text-[1.0625rem] font-bold text-night-950 transition-colors hover:bg-frost-100"
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn('h-5 w-5 text-night-400 transition-transform duration-200', expanded === item.label && 'rotate-180')}
                      />
                    </button>
                    {expanded === item.label ? (
                      <ul className="mb-2 ml-3 animate-slide-down space-y-0.5 border-l-2 border-frost-300 pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block rounded-card px-4 py-3 text-[0.9375rem] font-medium text-night-700 transition-colors hover:bg-frost-100 hover:text-night-950"
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
                    onClick={onClose}
                    className="block rounded-card px-4 py-3.5 text-[1.0625rem] font-bold text-night-950 transition-colors hover:bg-frost-100"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={toTelHref(contactInfo.phone)}
              onClick={() => track('click_phone', { source: 'mobile-menu' })}
              className="tap-target inline-flex items-center justify-center gap-2 rounded-pill border border-night-200 px-4 text-sm font-semibold text-night-800"
            >
              <Phone aria-hidden="true" className="h-4 w-4" /> {t.cta.call}
            </a>
            <a
              href={toWhatsAppHref(contactInfo.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('click_whatsapp', { source: 'mobile-menu' })}
              className="tap-target inline-flex items-center justify-center gap-2 rounded-pill border border-night-200 px-4 text-sm font-semibold text-night-800"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" /> {t.cta.whatsapp}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              onClick={() => track('click_email', { source: 'mobile-menu' })}
              className="tap-target col-span-2 inline-flex items-center justify-center gap-2 rounded-pill border border-night-200 px-4 text-sm font-semibold text-night-800"
            >
              <Mail aria-hidden="true" className="h-4 w-4" /> {contactInfo.email}
            </a>
          </div>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-night-100 bg-frost-50 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <Link
            href={routes.tickets}
            onClick={onClose}
            className="tap-target flex w-full items-center justify-center gap-2 rounded-pill bg-sky-400 px-5 text-[0.95rem] font-bold text-night-950 shadow-glow"
          >
            <Ticket aria-hidden="true" className="h-4 w-4" />
            {t.cta.buyTicket}
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-night-600">{t.footer.language}</span>
            <LanguageSwitcher variant="inline" />
          </div>
        </div>
      </div>
    </div>
  );
}
