'use client';

import { useI18n } from '@/i18n/LocaleProvider';
import { Media } from '@/components/ui/Media';
import { NewsletterForm } from '@/components/features/NewsletterForm';
import { Reveal } from '@/components/ui/Reveal';

/** HÓÉRTESÍTŐ — látványos feliratkozási szekció. */
export function SnowAlertSection() {
  const { t } = useI18n();

  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <Media mediaKey="newsletter-bg" overlay="strong" sizes="100vw" className="h-full w-full" />
      </div>

      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2 text-white">{t.home.alertTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-frost-200">{t.home.alertLead}</p>
            <div className="mt-9 text-left">
              <NewsletterForm invert />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
