'use client';

import { useEffect, useId, useState } from 'react';
import { CheckCircle2, Clock, Send } from 'lucide-react';
import { groupTypeOptions } from '@/data/availability';
import { submitQuoteRequest, validateQuoteRequest, type QuoteValidationErrors } from '@/services/bookingService';
import { cn } from '@/lib/cn';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import type { QuoteRequestPayload } from '@/types';

/**
 * AJÁNLATKÉRŐ ŰRLAP — HÉT MEZŐ (drótváz 10/03)
 * Kliensoldali validáció, hibajelzések, sikeres beküldési állapot.
 * DEMÓ: az adat NEM hagyja el a böngészőt.
 * INTEGRÁCIÓ: `src/services/bookingService.ts` → `submitQuoteRequest()`.
 */

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface QuoteFormProps {
  /** Előre kitöltött értékek (pl. az árak oldalról átvezetve). */
  initialValues?: Partial<QuoteRequestPayload>;
  onSubmitted?: () => void;
}

const emptyValues: QuoteRequestPayload = {
  arrival: '',
  departure: '',
  guests: 2,
  groupType: '',
  contactName: '',
  email: '',
  phone: '',
  message: '',
};

export function QuoteForm({ initialValues, onSubmitted }: QuoteFormProps) {
  const formId = useId();
  const [values, setValues] = useState<QuoteRequestPayload>({ ...emptyValues, ...initialValues });
  const [errors, setErrors] = useState<QuoteValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialValues) setValues((current) => ({ ...current, ...initialValues }));
  }, [initialValues]);

  function update<K extends keyof QuoteRequestPayload>(key: K, value: QuoteRequestPayload[K]) {
    setValues((current) => {
      const next = { ...current, [key]: value };
      if (touched[key as string]) setErrors(validateQuoteRequest(next));
      return next;
    });
  }

  function markTouched(key: keyof QuoteRequestPayload) {
    setTouched((current) => ({ ...current, [key]: true }));
    setErrors(validateQuoteRequest(values));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuoteRequest(values);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])));

    if (Object.keys(nextErrors).length > 0) {
      setState('error');
      setMessage('Néhány mező hiányzik vagy hibás. Ellenőrizd a pirossal jelölt részeket.');
      document.getElementById(`${formId}-first-error`)?.scrollIntoView({ block: 'center' });
      return;
    }

    setState('submitting');
    const result = await submitQuoteRequest(values);

    if (result.ok) {
      setState('success');
      setMessage(result.message);
      onSubmitted?.();
    } else {
      setState('error');
      setMessage(result.message);
    }
  }

  if (state === 'success') {
    return (
      <div
        role="status"
        className="rounded-panel border border-status-open/25 bg-status-openBg p-6 text-center sm:p-8"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-status-open">
          <CheckCircle2 aria-hidden="true" className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-h3 text-status-open">Megkaptuk az ajánlatkérést</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-deep-700">{message}</p>
        <p className="mx-auto mt-3 max-w-md rounded-lg bg-white/70 px-3 py-2 text-xs text-deep-600">
          Demó beküldés: az adatok jelenleg nem hagyják el a böngészőt. Az éles működéshez backend-integráció szükséges.
        </p>
        <SecondaryButton
          className="mt-5"
          onClick={() => {
            setValues({ ...emptyValues, ...initialValues });
            setTouched({});
            setErrors({});
            setState('idle');
          }}
        >
          Új ajánlatkérés
        </SecondaryButton>
      </div>
    );
  }

  const fieldClass = (hasError: boolean) =>
    cn(
      'min-h-[52px] w-full rounded-xl border bg-white px-4 text-[0.95rem] text-deep-900 outline-none transition-colors',
      'placeholder:text-deep-500 focus:border-glacier-400',
      hasError ? 'border-status-closed bg-status-closedBg/40' : 'border-deep-200',
    );

  const showError = (key: keyof QuoteValidationErrors) => touched[key] && errors[key];

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-arrival`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            Érkezés <span className="text-status-closed">*</span>
          </label>
          <input
            id={`${formId}-arrival`}
            type="date"
            required
            value={values.arrival}
            onChange={(event) => update('arrival', event.target.value)}
            onBlur={() => markTouched('arrival')}
            aria-invalid={Boolean(showError('arrival'))}
            aria-describedby={showError('arrival') ? `${formId}-arrival-error` : undefined}
            className={fieldClass(Boolean(showError('arrival')))}
          />
          {showError('arrival') ? (
            <p id={`${formId}-arrival-error`} className="mt-1.5 text-xs font-medium text-status-closed">
              {errors.arrival}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-departure`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            Távozás <span className="text-status-closed">*</span>
          </label>
          <input
            id={`${formId}-departure`}
            type="date"
            required
            value={values.departure}
            min={values.arrival || undefined}
            onChange={(event) => update('departure', event.target.value)}
            onBlur={() => markTouched('departure')}
            aria-invalid={Boolean(showError('departure'))}
            aria-describedby={showError('departure') ? `${formId}-departure-error` : undefined}
            className={fieldClass(Boolean(showError('departure')))}
          />
          {showError('departure') ? (
            <p id={`${formId}-departure-error`} className="mt-1.5 text-xs font-medium text-status-closed">
              {errors.departure}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-guests`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            Létszám <span className="text-status-closed">*</span>
          </label>
          <input
            id={`${formId}-guests`}
            type="number"
            inputMode="numeric"
            min={1}
            required
            value={values.guests}
            onChange={(event) => update('guests', Number(event.target.value))}
            onBlur={() => markTouched('guests')}
            aria-invalid={Boolean(showError('guests'))}
            aria-describedby={showError('guests') ? `${formId}-guests-error` : undefined}
            className={fieldClass(Boolean(showError('guests')))}
          />
          {showError('guests') ? (
            <p id={`${formId}-guests-error`} className="mt-1.5 text-xs font-medium text-status-closed">
              {errors.guests}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-groupType`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            Csoport típusa <span className="text-status-closed">*</span>
          </label>
          <select
            id={`${formId}-groupType`}
            required
            value={values.groupType}
            onChange={(event) => update('groupType', event.target.value)}
            onBlur={() => markTouched('groupType')}
            aria-invalid={Boolean(showError('groupType'))}
            aria-describedby={showError('groupType') ? `${formId}-groupType-error` : undefined}
            className={fieldClass(Boolean(showError('groupType')))}
          >
            <option value="">Válassz…</option>
            {groupTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {showError('groupType') ? (
            <p id={`${formId}-groupType-error`} className="mt-1.5 text-xs font-medium text-status-closed">
              {errors.groupType}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-contactName`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            Kapcsolattartó neve <span className="text-status-closed">*</span>
          </label>
          <input
            id={`${formId}-contactName`}
            type="text"
            autoComplete="name"
            required
            value={values.contactName}
            onChange={(event) => update('contactName', event.target.value)}
            onBlur={() => markTouched('contactName')}
            aria-invalid={Boolean(showError('contactName'))}
            aria-describedby={showError('contactName') ? `${formId}-contactName-error` : undefined}
            className={fieldClass(Boolean(showError('contactName')))}
          />
          {showError('contactName') ? (
            <p id={`${formId}-contactName-error`} className="mt-1.5 text-xs font-medium text-status-closed">
              {errors.contactName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            E-mail <span className="text-status-closed">*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            onBlur={() => markTouched('email')}
            aria-invalid={Boolean(showError('email'))}
            aria-describedby={showError('email') ? `${formId}-email-error` : undefined}
            className={fieldClass(Boolean(showError('email')))}
          />
          {showError('email') ? (
            <p id={`${formId}-email-error`} className="mt-1.5 text-xs font-medium text-status-closed">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            Telefonszám <span className="text-status-closed">*</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+36 …"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            onBlur={() => markTouched('phone')}
            aria-invalid={Boolean(showError('phone'))}
            aria-describedby={showError('phone') ? `${formId}-phone-error` : undefined}
            className={fieldClass(Boolean(showError('phone')))}
          />
          {showError('phone') ? (
            <p id={`${formId}-phone-error`} className="mt-1.5 text-xs font-medium text-status-closed">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-semibold text-deep-800">
            Megjegyzés <span className="font-normal text-deep-500">(opcionális)</span>
          </label>
          <textarea
            id={`${formId}-message`}
            rows={4}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            placeholder="Például: gyerekekkel érkezünk, háziállatot hoznánk, étkezés érdekelne."
            className={cn(fieldClass(false), 'min-h-[120px] resize-y py-3 leading-relaxed')}
          />
        </div>
      </div>

      {state === 'error' && message ? (
        <p role="alert" className="mt-4 rounded-lg bg-status-closedBg px-3 py-2 text-sm font-medium text-status-closed">
          {message}
        </p>
      ) : null}

      {/* 04 · BEKÜLDÉS + VÁLASZIDŐ-ÍGÉRET */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PrimaryButton
          size="lg"
          loading={state === 'submitting'}
          icon={<Send aria-hidden="true" className="h-4 w-4" />}
          className="sm:w-auto"
          {...({ type: 'submit' } as const)}
        >
          Ajánlatot kérek
        </PrimaryButton>
        <p className="flex items-center gap-2 text-sm text-deep-600">
          <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-glacier-600" />
          24 órán belül személyes ajánlatot küldünk.
        </p>
      </div>

      <p className="mt-4 rounded-lg bg-frost px-3 py-2 text-xs leading-snug text-deep-600">
        Demó űrlap: a beküldött adatok jelenleg nem hagyják el a böngészőt, és sehova nem kerülnek elmentésre.
        Az éles működéshez e-mail- vagy CRM-integráció szükséges.
      </p>
    </form>
  );
}
