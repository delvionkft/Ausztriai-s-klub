'use client';

import { useEffect, useRef, useState } from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';
import { useConsent } from '@/hooks/useConsent';
import { useI18n } from '@/i18n/I18nProvider';
import { legalDocuments } from '@/data/contact';
import { cn } from '@/lib/cn';

/**
 * SÜTI- ÉS ADATVÉDELMI SÁV (GDPR-előkészítés)
 * ----------------------------------------------------------------------------
 * - Alapértelmezetten MINDEN nem szükséges kategória tiltott.
 * - Az „Elfogadom” és az „Elutasítom” egyenrangú (nincs sötét minta).
 * - A döntés a `localStorage`-ban tárolódik időbélyeggel.
 * - A mérési szkriptek csak elfogadás után töltődnek be (`AnalyticsScripts`).
 *
 * INTEGRÁCIÓ: az „Adatkezelési tájékoztató” link a `data/contact.ts`
 * `legalDocuments` tömbjéből jön — amint van feltöltött dokumentum, megjelenik.
 */
export function CookieConsent() {
  const { t } = useI18n();
  const { decided, hydrated, save, acceptAll, rejectAll } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!decided && hydrated) panelRef.current?.focus();
  }, [decided, hydrated]);

  if (!hydrated || decided) return null;

  const privacyHref = legalDocuments.find((doc) => doc.id === 'privacy')?.href ?? null;

  const toggleClass = (on: boolean) =>
    on
      ? 'border-glacier-500 bg-glacier-500 text-white'
      : 'border-deep-200 bg-white text-deep-600';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className="fixed inset-x-0 bottom-0 z-[90] px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 sm:px-4"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="mx-auto max-w-4xl rounded-card border border-deep-100 bg-white p-4 shadow-lift outline-none sm:p-5"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ice-100 text-glacier-700">
            <Cookie aria-hidden="true" className="h-[18px] w-[18px]" />
          </span>

          <div className="min-w-0 flex-1">
            <h2 id="consent-title" className="text-[1rem] font-semibold text-deep-900">
              {t('consent.title')}
            </h2>
            <p id="consent-body" className="mt-1 text-sm leading-relaxed text-deep-600">
              {t('consent.body')}
            </p>

            {privacyHref ? (
              <a
                href={privacyHref}
                className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-glacier-700 underline underline-offset-2"
              >
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                {t('consent.privacyLink')}
              </a>
            ) : (
              <p className="mt-1.5 text-xs text-deep-500">
                {t('consent.privacyLink')} — {t('common.pending')}
              </p>
            )}
          </div>
        </div>

        {showSettings ? (
          <fieldset className="mt-4 space-y-2 border-t border-deep-100 pt-4">
            <legend className="sr-only">{t('consent.settings')}</legend>

            <div className="flex items-start justify-between gap-3 rounded-lg bg-deep-50 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-deep-900">{t('consent.necessary')}</p>
                <p className="text-xs text-deep-500">{t('consent.necessaryHint')}</p>
              </div>
              <span className="mt-0.5 shrink-0 rounded-pill bg-status-openBg px-2.5 py-1 text-[0.7rem] font-semibold text-status-open">
                {t('status.open')}
              </span>
            </div>

            {(
              [
                { id: 'analytics', on: analytics, set: setAnalytics },
                { id: 'marketing', on: marketing, set: setMarketing },
              ] as const
            ).map((row) => (
              <label
                key={row.id}
                className="flex cursor-pointer items-start justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-deep-50"
              >
                <span>
                  <span className="block text-sm font-semibold text-deep-900">
                    {t(row.id === 'analytics' ? 'consent.analytics' : 'consent.marketing')}
                  </span>
                  <span className="block text-xs text-deep-500">
                    {t(row.id === 'analytics' ? 'consent.analyticsHint' : 'consent.marketingHint')}
                  </span>
                </span>
                <span className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={row.on}
                    onChange={(event) => row.set(event.target.checked)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-6 w-11 items-center rounded-pill border p-0.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-glacier-500 peer-focus-visible:ring-offset-2',
                      toggleClass(row.on),
                    )}
                  >
                    <span
                      className={cn(
                        'h-4 w-4 rounded-full bg-current transition-transform',
                        row.on ? 'translate-x-5' : 'translate-x-0',
                      )}
                    />
                  </span>
                </span>
              </label>
            ))}
          </fieldset>
        ) : null}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {showSettings ? (
            <button
              type="button"
              onClick={() => save({ analytics, marketing })}
              className="min-h-[46px] rounded-pill border border-deep-200 px-5 text-sm font-semibold text-deep-800 transition-colors hover:bg-deep-50"
            >
              {t('consent.save')}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="min-h-[46px] rounded-pill border border-deep-200 px-5 text-sm font-semibold text-deep-800 transition-colors hover:bg-deep-50"
            >
              {t('consent.settings')}
            </button>
          )}

          <button
            type="button"
            onClick={rejectAll}
            className="min-h-[46px] rounded-pill border border-deep-200 px-5 text-sm font-semibold text-deep-800 transition-colors hover:bg-deep-50"
          >
            {t('consent.rejectAll')}
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="min-h-[46px] rounded-pill bg-deep-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-deep-700"
          >
            {t('consent.acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
