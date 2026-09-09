'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, CheckCircle2, Clock, Loader2, Send } from 'lucide-react';
import type { InquiryPayload } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { fill } from '@/i18n';
import { guesthouse } from '@/data/accommodation';
import { routes } from '@/data/navigation';
import { submitInquiry } from '@/services/bookingService';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

/**
 * AJÁNLATKÉRŐ ŰRLAP
 * ----------------------------------------------------------------------------
 *  - mezőnkénti validáció és hibaüzenet, `aria-invalid` + `aria-describedby`,
 *  - betöltési és sikeres állapot,
 *  - hiba esetén a beírt adatok megmaradnak,
 *  - a naptárból érkező dátumok automatikusan kitöltődnek (URL paraméterek).
 */
type Errors = Partial<Record<keyof InquiryPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const EMPTY: InquiryPayload = {
  arrival: '', departure: '', guests: 12, groupType: 'friends',
  name: '', email: '', phone: '', message: '', consent: false,
};

export function InquiryForm() {
  const { t } = useI18n();
  const params = useSearchParams();
  const [values, setValues] = useState<InquiryPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [reference, setReference] = useState<string | null>(null);

  // A naptárból átadott dátumok és létszám előtöltése.
  useEffect(() => {
    const arrival = params.get('erkezes');
    const departure = params.get('tavozas');
    const guests = params.get('letszam');
    if (!arrival && !departure && !guests) return;
    setValues((prev) => ({
      ...prev,
      arrival: arrival ?? prev.arrival,
      departure: departure ?? prev.departure,
      guests: guests ? Math.min(guesthouse.maxGuests, Math.max(1, Number(guests) || prev.guests)) : prev.guests,
    }));
    track('start_accommodation_inquiry', { source: 'calendar' });
  }, [params]);

  const groupTypes = [
    { id: 'friends', label: t.inquiry.groupTypeFriends },
    { id: 'families', label: t.inquiry.groupTypeFamilies },
    { id: 'club', label: t.inquiry.groupTypeClub },
    { id: 'company', label: t.inquiry.groupTypeCompany },
    { id: 'other', label: t.inquiry.groupTypeOther },
  ];

  const validate = (next: InquiryPayload): Errors => {
    const e: Errors = {};
    if (!next.arrival) e.arrival = t.inquiry.errRequired;
    if (!next.departure) e.departure = t.inquiry.errRequired;
    if (next.arrival && next.departure && next.departure <= next.arrival) e.departure = t.inquiry.errDates;
    if (!next.guests || next.guests < 1 || next.guests > guesthouse.maxGuests) {
      e.guests = fill(t.inquiry.errGuests, { max: guesthouse.maxGuests });
    }
    if (!next.name.trim()) e.name = t.inquiry.errRequired;
    if (!next.email.trim()) e.email = t.inquiry.errRequired;
    else if (!EMAIL_RE.test(next.email.trim())) e.email = t.inquiry.errEmail;
    if (!next.phone.trim()) e.phone = t.inquiry.errRequired;
    else if (next.phone.replace(/\D/g, '').length < 9) e.phone = t.inquiry.errPhone;
    if (!next.consent) e.consent = t.inquiry.errConsent;
    return e;
  };

  const update = <K extends keyof InquiryPayload>(key: K, value: InquiryPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const result = await submitInquiry(values);
      if (!result.ok) throw new Error(result.error ?? 'failed');
      setReference(result.reference ?? null);
      setStatus('success');
      track('submit_accommodation_inquiry', {
        guests: values.guests, group_type: values.groupType, arrival: values.arrival, departure: values.departure,
      });
    } catch {
      // Az adatok szándékosan megmaradnak, hogy újra lehessen küldeni.
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-panel border border-state-open/30 bg-state-openBg p-8 text-center" role="status">
        <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-state-openInk" />
        <h3 className="mt-4 font-display text-xl font-extrabold text-state-openInk">{t.inquiry.successTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-[0.9375rem] text-night-700">{t.inquiry.successText}</p>
        {reference ? (
          <p className="mt-3 inline-block rounded-pill bg-white px-5 py-2 font-mono text-sm font-bold tracking-wider text-night-950">
            {reference}
          </p>
        ) : null}
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={() => { setValues(EMPTY); setStatus('idle'); setReference(null); }}
          >
            {t.inquiry.successAgain}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-panel border border-night-100 bg-white p-6 shadow-card lg:p-8">
      <h3 className="font-display text-lg font-extrabold text-night-950">{t.inquiry.formTitle}</h3>

      {status === 'error' ? (
        <div className="mt-5 flex items-start gap-2.5 rounded-card border border-state-closed/30 bg-state-closedBg px-4 py-3.5" role="alert">
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-state-closedInk" />
          <div>
            <p className="font-semibold text-state-closedInk">{t.inquiry.errorTitle}</p>
            <p className="mt-0.5 text-[0.875rem] text-night-700">{t.inquiry.errorText}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="arrival" label={t.inquiry.arrival} error={errors.arrival} required>
          <input
            id="arrival" type="date" required value={values.arrival}
            onChange={(e) => update('arrival', e.target.value)}
            aria-invalid={Boolean(errors.arrival)}
            aria-describedby={errors.arrival ? 'arrival-error' : undefined}
            className={inputClass(Boolean(errors.arrival))}
          />
        </Field>

        <Field id="departure" label={t.inquiry.departure} error={errors.departure} required>
          <input
            id="departure" type="date" required value={values.departure}
            onChange={(e) => update('departure', e.target.value)}
            aria-invalid={Boolean(errors.departure)}
            aria-describedby={errors.departure ? 'departure-error' : undefined}
            className={inputClass(Boolean(errors.departure))}
          />
        </Field>

        <Field id="guests" label={t.inquiry.guests} error={errors.guests} required>
          <input
            id="guests" type="number" inputMode="numeric" min={1} max={guesthouse.maxGuests} required
            value={values.guests}
            onChange={(e) => update('guests', Number(e.target.value))}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'guests-error' : undefined}
            className={inputClass(Boolean(errors.guests))}
          />
        </Field>

        <Field id="groupType" label={t.inquiry.groupType}>
          <select
            id="groupType" value={values.groupType}
            onChange={(e) => update('groupType', e.target.value)}
            className={inputClass(false)}
          >
            {groupTypes.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
          </select>
        </Field>

        <Field id="name" label={t.inquiry.name} error={errors.name} required className="sm:col-span-2">
          <input
            id="name" type="text" required autoComplete="name" value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="email" label={t.inquiry.email} error={errors.email} required>
          <input
            id="email" type="email" required autoComplete="email" inputMode="email" value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field id="phone" label={t.inquiry.phone} error={errors.phone} required>
          <input
            id="phone" type="tel" required autoComplete="tel" inputMode="tel" value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>

        <Field id="message" label={`${t.inquiry.message} (${t.common.optional})`} className="sm:col-span-2">
          <textarea
            id="message" rows={4} value={values.message}
            placeholder={t.inquiry.messagePlaceholder}
            onChange={(e) => update('message', e.target.value)}
            className={cn(inputClass(false), 'min-h-[120px] resize-y py-3')}
          />
        </Field>
      </div>

      <div className="mt-6">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent" type="checkbox" required checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-night-300 text-glacier-500 focus-visible:ring-2 focus-visible:ring-glacier-400"
          />
          <span className="text-[0.9375rem] leading-snug text-night-700">
            {t.inquiry.consent}{' '}
            <a href={routes.privacy} className="link-underline font-semibold text-night-900">
              {t.nav.legal}
            </a>
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-2 flex items-center gap-1.5 text-[0.8125rem] font-medium text-state-closedInk">
            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'submitting'} className="sm:w-auto" fullWidth>
          {status === 'submitting' ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              {t.inquiry.submitting}
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              {t.inquiry.submit}
            </>
          )}
        </Button>
        <p className="flex items-center gap-1.5 text-[0.875rem] text-night-600">
          <Clock aria-hidden="true" className="h-4 w-4 text-glacier-600" />
          {t.inquiry.responseTime}
        </p>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    'h-12 w-full rounded-card border bg-white px-4 text-[1rem] text-night-950 transition-colors placeholder:text-night-400',
    hasError
      ? 'border-state-closed focus-visible:ring-state-closed'
      : 'border-night-200 focus-visible:border-glacier-400',
  );
}

function Field({
  id, label, error, required, children, className,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.875rem] font-semibold text-night-800">
        {label}
        {required ? <span aria-hidden="true" className="ml-1 text-state-closed">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] font-medium text-state-closedInk">
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
