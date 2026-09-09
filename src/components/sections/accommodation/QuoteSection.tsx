'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { QuoteForm } from '@/components/features/QuoteForm';
import type { QuoteRequestPayload } from '@/types';

/**
 * Az árak oldalról átvezetett dátumok és létszám előtöltése.
 * (A `?arrival=…&departure=…&guests=…` paraméterekből.)
 */
export function QuoteSection() {
  const params = useSearchParams();

  const initialValues = useMemo<Partial<QuoteRequestPayload>>(() => {
    const arrival = params.get('arrival');
    const departure = params.get('departure');
    const guests = params.get('guests');

    return {
      ...(arrival ? { arrival } : {}),
      ...(departure ? { departure } : {}),
      ...(guests && Number(guests) > 0 ? { guests: Number(guests) } : {}),
    };
  }, [params]);

  return <QuoteForm initialValues={initialValues} />;
}
