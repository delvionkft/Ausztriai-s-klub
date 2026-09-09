'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { currentOffer } from '@/data/homepage';
import { formatPrice } from '@/lib/format';
import { track } from '@/lib/analytics';
import { Media } from '@/components/ui/Media';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/** AKTUÁLIS AJÁNLAT — nagy képes blokk, előnyökkel és árral. */
export function CurrentOffer() {
  const { t, L, locale } = useI18n();

  return (
    <section className="surface-night py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <div className="grid overflow-hidden rounded-panel border border-white/12 bg-white/[0.05] lg:grid-cols-2">
            <Media
              mediaKey={currentOffer.imageKey}
              className="min-h-[280px] lg:min-h-[440px]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="inline-flex w-fit items-center rounded-pill bg-glacier-400 px-3.5 py-1.5 text-[0.75rem] font-bold uppercase tracking-wider text-night-950">
                {L(currentOffer.badge)}
              </p>
              <p className="mt-5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-glacier-300">{t.home.offerKicker}</p>
              <h2 className="mt-2 text-h2 text-white">{L(currentOffer.title)}</h2>
              <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-frost-200">{L(currentOffer.text)}</p>

              <ul className="mt-6 space-y-2.5">
                {currentOffer.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[0.9375rem] text-frost-200">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-300" />
                    {L(bullet)}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-4">
                <div>
                  <p className="font-display text-[2.5rem] font-extrabold leading-none text-white">
                    {formatPrice(currentOffer.priceEur, locale)}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] text-frost-300/80">{L(currentOffer.priceNote)}</p>
                </div>
                <ButtonLink
                  href={currentOffer.href}
                  size="lg"
                  className="ml-auto"
                  onClick={() => track('begin_ticket_checkout', { source: 'home-offer' })}
                >
                  {t.cta.seeMore}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
