'use client';

import { LocaleProvider } from '@/i18n/LocaleProvider';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomCTA } from './MobileBottomCTA';

/**
 * OLDALVÁZ
 * ----------------------------------------------------------------------------
 * Fejléc + státuszsáv, tartalom, lábléc és a mobil CTA-sáv. A tartalom felső
 * térköze a fejléc magasságát követi, hogy semmi ne csússzon alá.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="fotartalom" className="flex-1 pt-[calc(var(--header-h)+var(--status-h))]">
          {children}
        </main>
        <Footer />
        <MobileBottomCTA />
      </div>
    </LocaleProvider>
  );
}
