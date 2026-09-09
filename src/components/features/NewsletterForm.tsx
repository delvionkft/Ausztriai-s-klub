'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Snowflake } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { subscribeToSnowAlert } from '@/services/newsletterService';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** HÓÉRTESÍTŐ FELIRATKOZÁS — validációval, betöltési és sikeres állapottal. */
export function NewsletterForm({ invert = true }: { invert?: boolean }) {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) { setError(t.newsletter.errorEmail); return; }
    if (!consent) { setError(t.newsletter.errorConsent); return; }

    setError(null);
    setStatus('submitting');
    try {
      const result = await subscribeToSnowAlert(email.trim());
      if (!result.ok) throw new Error('failed');
      setStatus('success');
      track('subscribe_snow_alert', { source: 'newsletter-form' });
    } catch {
      setStatus('idle');
      setError(t.newsletter.errorGeneric);
    }
  };

  if (status === 'success') {
    return (
      <div
        className={cn('rounded-panel border p-8 text-center', invert ? 'border-state-open/40 bg-state-open/10' : 'border-state-open/30 bg-state-openBg')}
        role="status"
      >
        <CheckCircle2 aria-hidden="true" className={cn('mx-auto h-10 w-10', invert ? 'text-state-open' : 'text-state-openInk')} />
        <h3 className={cn('mt-3 font-display text-lg font-extrabold', invert ? 'text-white' : 'text-state-openInk')}>
          {t.newsletter.successTitle}
        </h3>
        <p className={cn('mx-auto mt-2 max-w-sm text-[0.9375rem]', invert ? 'text-frost-200' : 'text-night-700')}>
          {t.newsletter.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="snow-alert-email" className="sr-only">{t.newsletter.emailLabel}</label>
          <input
            id="snow-alert-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            placeholder={t.newsletter.emailPlaceholder}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'snow-alert-error' : undefined}
            className={cn(
              'h-13 w-full rounded-pill border px-5 text-[1rem] transition-colors',
              'h-[52px]',
              invert
                ? 'border-white/25 bg-white/10 text-white placeholder:text-frost-300/60 focus-visible:border-glacier-400'
                : 'border-night-200 bg-white text-night-950 placeholder:text-night-400 focus-visible:border-glacier-400',
              error && 'border-state-closed',
            )}
          />
        </div>
        <Button type="submit" size="lg" disabled={status === 'submitting'} className="shrink-0">
          {status === 'submitting' ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              {t.newsletter.submitting}
            </>
          ) : (
            <>
              <Snowflake aria-hidden="true" className="h-4 w-4" />
              {t.newsletter.submit}
            </>
          )}
        </Button>
      </div>

      <label htmlFor="snow-alert-consent" className="mt-4 flex cursor-pointer items-start gap-3">
        <input
          id="snow-alert-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => { setConsent(e.target.checked); setError(null); }}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-night-300 text-glacier-500"
        />
        <span className={cn('text-[0.875rem] leading-snug', invert ? 'text-frost-300/85' : 'text-night-600')}>
          {t.newsletter.consent}{' '}
          <a href={routes.privacy} className={cn('link-underline font-semibold', invert ? 'text-white' : 'text-night-900')}>
            {t.nav.legal}
          </a>
        </span>
      </label>

      {error ? (
        <p id="snow-alert-error" role="alert" className={cn('mt-3 flex items-center gap-1.5 text-[0.875rem] font-medium', invert ? 'text-state-closed' : 'text-state-closedInk')}>
          <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </form>
  );
}
