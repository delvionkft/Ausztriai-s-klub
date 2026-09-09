import { BellRing } from 'lucide-react';
import { newsletterCopy } from '@/data/homepage';
import { Section } from '@/components/ui/Section';
import { NewsletterForm } from '@/components/features/NewsletterForm';

/** 10 · HÓRIASZTÓ FELIRATKOZÁS (drótváz 01/09). */
export function SnowAlertSection() {
  return (
    <Section tone="deep" spacing="md" labelledBy="horiaszto-cim">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-glacier-200 ring-1 ring-inset ring-white/20">
            <BellRing aria-hidden="true" className="h-3.5 w-3.5" />
            {newsletterCopy.eyebrow}
          </span>
          <h2 id="horiaszto-cim" className="mt-4 text-h1 text-white">
            {newsletterCopy.title}
          </h2>
          <p className="mt-3 max-w-prose text-[0.98rem] leading-relaxed text-ice-200/85">
            {newsletterCopy.description}
          </p>
        </div>

        <div className="rounded-panel border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:p-6">
          <NewsletterForm tone="dark" />
        </div>
      </div>
    </Section>
  );
}
