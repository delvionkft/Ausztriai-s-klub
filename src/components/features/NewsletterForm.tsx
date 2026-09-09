'use client';

import { useId, useState } from 'react';
import { BellRing, CheckCircle2 } from 'lucide-react';
import { newsletterCopy } from '@/data/homepage';
import { subscribeToSnowAlert } from '@/services/newsletterService';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { isValidEmail } from '@/lib/format';
import { cn } from '@/lib/cn';

type FormState = 'idle' | 'loading' | 'success' | 'error';

/**
 * HÓRIASZTÓ FELIRATKOZÁS (drótváz 01/09)
 * DEMÓ: az e-mail cím nem hagyja el a böngészőt.
 * INTEGRÁCIÓ: `src/services/newsletterService.ts`.
 */
export function NewsletterForm({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setState('error');
      setMessage('Kérünk, adj meg egy érvényes e-mail címet.');
      return;
    }

    setState('loading');
    const result = await subscribeToSnowAlert({ email });
    setState(result.ok ? 'success' : 'error');
    setMessage(result.message);
    if (result.ok) {
      // MÉRÉS 11: hóértesítő feliratkozás
      trackEvent(ANALYTICS_EVENTS.subscribeSnowAlert, { form_location: tone === 'dark' ? 'home' : 'inline' });
      setEmail('');
    }
  }

  const dark = tone === 'dark';

  if (state === 'success') {
    return (
      <div
        role="status"
        className={cn(
          'flex items-center gap-3 rounded-card px-5 py-4',
          dark ? 'bg-white/10 text-white' : 'bg-status-openBg text-status-open',
        )}
      >
        <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0" />
        <p className="text-sm font-semibold">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor={inputId} className={cn('mb-2 block text-sm font-semibold', dark ? 'text-ice-100' : 'text-deep-800')}>
        E-mail cím
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder={newsletterCopy.placeholder}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? `${inputId}-error` : `${inputId}-hint`}
          className={cn(
            'min-h-[52px] flex-1 rounded-pill border px-5 text-[0.95rem] outline-none transition-colors',
            dark
              ? 'border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-glacier-300'
              : 'border-deep-200 bg-white text-deep-900 placeholder:text-deep-500 focus:border-glacier-400',
            state === 'error' && 'border-status-closed',
          )}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className={cn(
            'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill px-6 font-semibold transition-colors disabled:opacity-60',
            dark ? 'bg-glacier-400 text-deep-950 hover:bg-glacier-300' : 'bg-deep-800 text-white hover:bg-deep-700',
          )}
        >
          {state === 'loading' ? (
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <BellRing aria-hidden="true" className="h-4 w-4" />
          )}
          {newsletterCopy.ctaLabel}
        </button>
      </div>

      {state === 'error' ? (
        <p id={`${inputId}-error`} role="alert" className={cn('mt-2 text-sm font-medium', dark ? 'text-red-200' : 'text-status-closed')}>
          {message}
        </p>
      ) : (
        <p id={`${inputId}-hint`} className={cn('mt-2 text-xs', dark ? 'text-ice-200/70' : 'text-deep-500')}>
          {newsletterCopy.consent}
        </p>
      )}
    </form>
  );
}
