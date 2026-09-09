import type { ReactNode } from 'react';
import { AnalyticsScripts } from './AnalyticsScripts';
import { CookieConsent } from './CookieConsent';
import { Footer } from './Footer';
import { Header } from './Header';
import { LiveStatusBar } from './LiveStatusBar';
import { StickyMobileCTA } from './StickyMobileCTA';

/**
 * OLDAL VÁZ — fejléc + élő státuszsáv + tartalom + lábléc + mobil CTA.
 * Egyetlen helyen definiálva, hogy minden oldal azonosan viselkedjen.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#tartalom"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-deep-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Ugrás a tartalomra
      </a>

      <div className="sticky top-0 z-50">
        <Header />
        <LiveStatusBar />
      </div>

      <main id="tartalom" className="flex-1 pb-safe-cta">
        {children}
      </main>

      <Footer />
      <StickyMobileCTA />

      {/* Süti-sáv: a mérési szkriptek csak elfogadás után töltődnek be. */}
      <CookieConsent />
      <AnalyticsScripts />
    </div>
  );
}
