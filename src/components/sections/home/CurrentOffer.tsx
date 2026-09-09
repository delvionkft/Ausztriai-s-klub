import { ArrowRight, Sparkles } from 'lucide-react';
import { currentOffer } from '@/data/homepage';
import { Section } from '@/components/ui/Section';
import { PrimaryButton } from '@/components/ui/Button';

/** 05 · AKTUÁLIS AJÁNLAT / SZEZONBÉRLET (drótváz 01/04). */
export function CurrentOffer() {
  return (
    <Section tone="default" spacing="sm">
      <div className="overflow-hidden rounded-panel border border-glacier-200 bg-glacier-50/70">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-glacier-600 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              {currentOffer.eyebrow}
            </span>
            <h2 className="mt-3 text-h1">{currentOffer.title}</h2>
            <p className="mt-2.5 text-[0.98rem] leading-relaxed text-deep-700">{currentOffer.description}</p>
            <p className="mt-2 text-xs text-deep-500">{currentOffer.note}</p>
          </div>

          <PrimaryButton
            href={currentOffer.ctaHref}
            size="lg"
            className="shrink-0"
            iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
          >
            {currentOffer.ctaLabel}
          </PrimaryButton>
        </div>
      </div>
    </Section>
  );
}
