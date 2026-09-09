'use client';

import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { buildFooterNav, buildLegalNav } from '@/data/navigation';
import { contactInfo, fullAddress, socialLinks } from '@/data/contact';
import { resortInfo } from '@/data/site.config';
import { toTelHref } from '@/lib/format';
import { track } from '@/lib/analytics';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

const SOCIAL_ICONS = { facebook: Facebook, instagram: Instagram, youtube: Youtube, linkedin: Facebook } as const;

/** LÁBLÉC — másodlagos navigáció, elérhetőségek és jogi linkek. */
export function Footer() {
  const { t } = useI18n();
  const columns = buildFooterNav(t);
  const legal = buildLegalNav(t);
  const year = new Date().getFullYear();

  return (
    <footer className="surface-night pb-mobile-cta text-frost-200">
      <div className="container-page py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-frost-300/90">{t.footer.intro}</p>

            <address className="mt-6 space-y-3 not-italic text-[0.9375rem]">
              <a
                href={contactInfo.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('open_directions', { source: 'footer' })}
                className="flex min-h-[44px] items-start gap-2.5 py-1.5 text-frost-300 transition-colors hover:text-white lg:min-h-0 lg:py-0"
              >
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-400" />
                {fullAddress}
              </a>
              <a
                href={toTelHref(contactInfo.phone)}
                onClick={() => track('click_phone', { source: 'footer' })}
                className="flex min-h-[44px] items-center gap-2.5 py-1.5 text-frost-300 transition-colors hover:text-white lg:min-h-0 lg:py-0"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-glacier-400" />
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                onClick={() => track('click_email', { source: 'footer' })}
                className="flex min-h-[44px] items-center gap-2.5 py-1.5 text-frost-300 transition-colors hover:text-white lg:min-h-0 lg:py-0"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-glacier-400" />
                {contactInfo.email}
              </a>
            </address>

            <div className="mt-7">
              <p className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-frost-300/70">{t.footer.followUs}</p>
              <ul className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="tap-target inline-grid place-items-center rounded-pill border border-white/15 px-3 text-frost-200 transition-colors hover:border-glacier-400/60 hover:bg-white/10 hover:text-white"
                      >
                        <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <nav aria-label={t.a11y.footerNavigation} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="mb-4 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-white">{column.title}</h2>
                <ul className="lg:space-y-2.5">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="flex min-h-[44px] items-center text-[0.9375rem] text-frost-300/85 transition-colors hover:text-white lg:min-h-0"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legal.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-[0.8125rem] text-frost-300/75 transition-colors hover:text-white lg:min-h-0 lg:py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-frost-300/60">{t.footer.language}</span>
            <LanguageSwitcher invert variant="inline" />
          </div>
        </div>

        <p suppressHydrationWarning className="mt-8 text-[0.8125rem] text-frost-300/60">
          © {year} {resortInfo.legalName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
