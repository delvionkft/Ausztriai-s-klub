'use client';

import { useState } from 'react';
import { AvailabilityCalendar, type DateRange } from '@/components/features/AvailabilityCalendar';
import { PriceCalculator } from '@/components/features/PriceCalculator';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * A naptár és az árösszesítő közös állapota.
 * A dátumkiválasztás és az árszámítás kliensoldali demóként működik.
 */
export function AvailabilityAndPricing() {
  const [range, setRange] = useState<DateRange>({ arrival: null, departure: null });

  return (
    <>
      <div className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
        <SectionHeading
          eyebrow="Foglaltsági naptár"
          title="Teljes ház — mikor szabad?"
          description="Kattints az érkezés napjára, majd a távozáséra. Az árösszesítő azonnal frissül."
          as="h3"
        />
        <div className="mt-6">
          <AvailabilityCalendar value={range} onChange={setRange} />
        </div>
      </div>

      <div className="mt-8">
        <PriceCalculator range={range} />
      </div>
    </>
  );
}
