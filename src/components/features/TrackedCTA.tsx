'use client';

import type { ReactNode } from 'react';
import { trackEvent, type AnalyticsEventName, type AnalyticsPayload } from '@/lib/analytics';

/**
 * MÉRÉSI BURKOLÓ LINKGOMBOKHOZ.
 * A `Button` link változata szándékosan nem fogad `onClick`-et (hogy ne
 * lehessen linkből véletlenül gombot csinálni), ezért a kattintást ez a
 * burkoló figyeli. A `display: contents` miatt a burkoló nem befolyásolja
 * az elrendezést, a billentyűzetes Enter pedig ugyanúgy `click` eseményt vált ki.
 */
export function TrackedCTA({
  event,
  params,
  children,
}: {
  event: AnalyticsEventName;
  params?: AnalyticsPayload;
  children: ReactNode;
}) {
  return (
    <span className="contents" onClick={() => trackEvent(event, params)}>
      {children}
    </span>
  );
}
