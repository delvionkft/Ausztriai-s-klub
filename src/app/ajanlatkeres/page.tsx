import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Clock } from 'lucide-react';
import { quoteProcessSteps } from '@/data/availability';
import { faqByTopic } from '@/data/faq';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { Skeleton } from '@/components/ui/States';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { AccommodationSubNav } from '@/components/layout/AccommodationSubNav';
import { ProgressTracker } from '@/components/features/ProcessSteps';
import { ContactActions } from '@/components/features/ContactActions';
import { FAQAccordion } from '@/components/features/FAQAccordion';
import { QuoteSection } from '@/components/sections/accommodation/QuoteSection';

export const metadata: Metadata = {
  title: 'Ajánlatkérés',
  description:
    'Ajánlatkérő űrlap a teljes házra: érkezés, távozás, létszám, csoport típusa és kapcsolattartói adatok. 24 órán belül személyes ajánlattal válaszolunk.',
  alternates: { canonical: routes.quote },
  openGraph: { title: 'Ajánlatkérés', description: '24 órán belül személyes ajánlat.', url: routes.quote },
};

/**
 * 10 · AJÁNLATKÉRÉS
 * 01 fejléc + szállás al-navigáció .. AccommodationSubNav
 * 02 folyamatjelző .................. ProgressTracker
 * 03 ajánlatkérő űrlap (7 mező) ..... QuoteForm
 * 04 beküldés + válaszidő-ígéret .... QuoteForm (belső)
 * 05 párhuzamos csatornák ........... ContactActions
 * 06 GYIK ........................... FAQAccordion
 */
export default function QuotePage() {
  return (
    <>
      <AccommodationSubNav />

      <PageHero
        eyebrow="Szállás"
        title="Ajánlatkérés"
        description="Töltsd ki a mezőket, és 24 órán belül személyes ajánlatot küldünk a megadott időpontra."
        mediaKey="quote-hero"
        actions={
          <>
            <PrimaryButton href="#urlap" variant="onDark">
              Ugrás az űrlapra
            </PrimaryButton>
            <SecondaryButton href={routes.availability} tone="dark">
              Szabad időpontok
            </SecondaryButton>
          </>
        }
      />

      {/* 02 · FOLYAMATJELZŐ */}
      <Section tone="white" spacing="sm">
        <ProgressTracker steps={quoteProcessSteps} activeIndex={1} />
      </Section>

      {/* 03–04 · ŰRLAP + VÁLASZIDŐ-ÍGÉRET */}
      <Section tone="alpine" labelledBy="urlap-cim" id="urlap">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading
              id="urlap-cim"
              eyebrow="Ajánlatkérés"
              title="Mondd el, mikor és hányan jönnétek"
              description="Minden csillaggal jelölt mező kitöltése szükséges. A megjegyzésbe bármit írhatsz, amit fontosnak tartasz."
            />
            <div className="mt-6">
              <Suspense fallback={<Skeleton className="h-[720px] w-full rounded-panel" />}>
                <QuoteSection />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-panel border border-glacier-200 bg-glacier-50/70 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-h3">
                <Clock aria-hidden="true" className="h-5 w-5 text-glacier-600" />
                24 órán belül válaszolunk
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-deep-700">
                Munkanapokon általában néhány órán belül visszajelzünk. Ha sürgős, a WhatsApp vagy a telefon a
                leggyorsabb.
              </p>
            </div>

            {/* 05 · PÁRHUZAMOS CSATORNÁK */}
            <div className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6">
              <h2 className="text-h3">Vagy írj közvetlenül</h2>
              <p className="mt-2 text-sm text-deep-600">
                Ugyanaz a válasz, csak gyorsabb csatornán. Mobilon ezek a gombok a képernyő alján is elérhetők.
              </p>
              <ContactActions className="mt-4" layout="grid" />
            </div>
          </aside>
        </div>
      </Section>

      {/* 06 · GYIK — A MARADÉK KIFOGÁSOK LEZÁRÁSA */}
      <Section tone="white" labelledBy="gyik-cim">
        <SectionHeading
          id="gyik-cim"
          eyebrow="GYIK"
          title="Amit a leggyakrabban kérdeznek"
          description="Ha valami nincs benne, írd meg az ajánlatkérésben — válaszolunk rá."
        />
        <div className="mt-6">
          <FAQAccordion items={faqByTopic('accommodation')} />
        </div>
      </Section>
    </>
  );
}
