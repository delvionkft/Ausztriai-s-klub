'use client';

import { Suspense } from 'react';
import { Check } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { bookingFaq } from '@/data/faq';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InquiryForm } from '@/components/features/InquiryForm';
import { LoadingState } from '@/components/ui/States';
import { ContactOptions } from '@/components/features/ContactOptions';
import { FAQAccordion } from '@/components/features/FAQAccordion';
import { cn } from '@/lib/cn';

export function InquiryView() {
  const { t } = useI18n();

  const steps = [
    t.inquiry.progressCalendar,
    t.inquiry.progressInquiry,
    t.inquiry.progressOffer,
    t.inquiry.progressBooking,
    t.inquiry.progressPayment,
  ];
  const activeIndex = 1;

  return (
    <>
      <PageHero
        imageKey="hero-inquiry"
        kicker={t.nav.stay}
        title={t.inquiry.title}
        lead={t.inquiry.lead}
        crumbs={[
          { label: t.nav.guesthouse, href: routes.stay },
          { label: t.nav.inquiry, href: routes.inquiry },
        ]}
        height="sm"
      />

      {/* Folyamatjelző */}
      <div className="border-b border-night-100 bg-white py-5">
        <div className="container-page">
          <ol className="no-scrollbar flex items-center gap-2 overflow-x-auto" aria-label={t.inquiry.title}>
            {steps.map((step, index) => (
              <li key={step} className="flex shrink-0 items-center gap-2">
                <span
                  aria-current={index === activeIndex ? 'step' : undefined}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-pill px-3.5 py-2 text-[0.8125rem] font-bold transition-colors',
                    index < activeIndex && 'bg-state-openBg text-state-openInk',
                    index === activeIndex && 'bg-night-950 text-white',
                    index > activeIndex && 'bg-frost-100 text-night-500',
                  )}
                >
                  <span className={cn(
                    'grid h-5 w-5 place-items-center rounded-full text-[0.6875rem]',
                    index < activeIndex && 'bg-state-open/20',
                    index === activeIndex && 'bg-white/20',
                    index > activeIndex && 'bg-night-200 text-night-600',
                  )}>
                    {index < activeIndex ? <Check aria-hidden="true" className="h-3 w-3" /> : index + 1}
                  </span>
                  {step}
                </span>
                {index < steps.length - 1 ? (
                  <span aria-hidden="true" className="h-px w-4 bg-night-200 sm:w-6" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Section tone="frost">
        <div className="grid items-start gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
          {/* Csak az űrlap függ az URL-paraméterektől, ezért a Suspense határa
              itt van — így a fejléc és a H1 a szerveren renderelt HTML-ben is
              benne van (SEO). */}
          <Suspense fallback={<LoadingState rows={5} />}>
            <InquiryForm />
          </Suspense>

          <div className="space-y-8 lg:sticky lg:top-40">
            <div>
              <h2 className="font-display text-h3">{t.inquiry.channelsTitle}</h2>
              <div className="mt-5">
                <ContactOptions compact />
              </div>
            </div>

            <div className="rounded-panel border border-glacier-200 bg-white p-6 shadow-subtle">
              <h3 className="font-display text-[1.0625rem] font-extrabold text-night-950">{t.inquiry.responseTime}</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  'Az ajánlat tartalmazza a szállásdíjat, a kötelező díjakat és a kauciót.',
                  'Ha kéred, a síbérletet és az oktatást is beleszámoljuk.',
                  'Az ajánlat öt napig érvényes, addig opciósan tartjuk az időpontot.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-night-700">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" id="gyik">
        <SectionHeading title={t.inquiry.faqTitle} className="mb-10" />
        <FAQAccordion items={bookingFaq} />
      </Section>
    </>
  );
}
