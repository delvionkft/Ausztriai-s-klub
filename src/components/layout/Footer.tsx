'use client';

import Link from 'next/link';
import { Cookie, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { footerNavigation, routes } from '@/data/navigation';
import { contactInfo, legalDocuments } from '@/data/contact';
import { displayNameLong } from '@/data/site.config';
import { PLACEHOLDER_TEXT } from '@/data/placeholders';
import { toDialString } from '@/lib/format';
import { useI18n } from '@/i18n/I18nProvider';
import { useConsent } from '@/hooks/useConsent';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

const socialIcons = { Facebook, Instagram, Youtube } as const;

/** LÁBLÉC — a második navigáció (drótváz 13/03). */
export function Footer() {
  const { t } = useI18n();
  const { reopen } = useConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="deep-surface text-ice-100">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ice-200/80">
              Hóhelyzet, pályák, jegyek és teljes ház szállás — egy helyen, mindig a friss adatokkal.
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-300" />
                <span className={contactInfo.addressLine ? 'text-ice-100' : 'text-ice-300/60'}>
                  {contactInfo.addressLine ?? PLACEHOLDER_TEXT.address}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-300" />
                {contactInfo.phone ? (
                  <a
                    href={`tel:${toDialString(contactInfo.phone)}`}
                    onClick={() =>
                      // MÉRÉS 8: telefonhívás indítása
                      trackEvent(ANALYTICS_EVENTS.clickPhone, { cta_location: 'footer' })
                    }
                    className="link-underline text-ice-100"
                  >
                    {contactInfo.phone}
                  </a>
                ) : (
                  <span className="text-ice-300/60">{PLACEHOLDER_TEXT.phone}</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-300" />
                {contactInfo.email ? (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    onClick={() =>
                      // MÉRÉS 10: e-mail-kattintás
                      trackEvent(ANALYTICS_EVENTS.clickEmail, { cta_location: 'footer' })
                    }
                    className="link-underline text-ice-100"
                  >
                    {contactInfo.email}
                  </a>
                ) : (
                  <span className="text-ice-300/60">{PLACEHOLDER_TEXT.email}</span>
                )}
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2">
              {contactInfo.social.map((item) => {
                const Icon = socialIcons[item.icon as keyof typeof socialIcons] ?? Facebook;
                if (!item.url) {
                  return (
                    <span
                      key={item.id}
                      title={`${item.label} — link megadása szükséges`}
                      className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl bg-white/5 text-ice-300/40"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only">{item.label} — link megadása szükséges</span>
                    </span>
                  );
                }
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-ice-100 transition-colors hover:bg-white/20"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {footerNavigation.map((column) => {
            const title = column.titleKey ? t(column.titleKey) : column.title;
            return (
            <nav key={column.title} aria-label={title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-glacier-300">{title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ice-200/85 transition-colors hover:text-white"
                    >
                      {item.labelKey ? t(item.labelKey) : item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            );
          })}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ice-300/70">
              {legalDocuments.map((doc) => (
                <li key={doc.id}>
                  {doc.href ? (
                    <Link href={doc.href} className="transition-colors hover:text-white">
                      {doc.label}
                    </Link>
                  ) : (
                    <Link
                      href={`${routes.info}#dokumentumok`}
                      title="A dokumentum feltöltése folyamatban"
                      className="transition-colors hover:text-white"
                    >
                      {doc.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={reopen}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Cookie aria-hidden="true" className="h-3.5 w-3.5" />
                  {t('consent.manage')}
                </button>
              </li>
            </ul>
            <LanguageSwitcher variant="inline" />
          </div>

          <p className="mt-6 text-xs text-ice-300/55">
            © {year} {displayNameLong}. {t('footer.rights')} Az üzemeltető adatai az impresszumban.
          </p>
        </div>
      </div>
    </footer>
  );
}
