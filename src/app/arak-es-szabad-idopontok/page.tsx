import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { AccommodationSubNav } from '@/components/layout/AccommodationSubNav';
import { AvailabilityAndPricing } from '@/components/sections/accommodation/AvailabilityAndPricing';
import { ProgressTracker } from '@/components/features/ProcessSteps';
import { quoteProcessSteps } from '@/data/availability';

export const metadata: Metadata = {
  title: 'Árak és szabad időpontok',
  description:
    'Teljes ház foglaltsági naptára szabad, foglalt, opciós és minimum éjszakaszám miatt zárt állapotokkal, részletes árösszesítővel és külön feltüntetett kaucióval.',
  alternates: { canonical: routes.availability },
  openGraph: {
    title: 'Árak és szabad időpontok',
    description: 'Foglaltsági naptár és teljes árösszesítő.',
    url: routes.availability,
  },
};

/**
 * 09 · ÁRAK ÉS SZABAD IDŐPONTOK
 * 01 fejléc + szállás al-navigáció .. AccommodationSubNav
 * 02 foglaltsági naptár ............. AvailabilityCalendar
 * 03 jelmagyarázat .................. AvailabilityCalendar (belső)
 * 04 árösszesítő + feltételek ....... PriceCalculator
 * 05 átvezetés az ajánlatkérésre .... PriceCalculator CTA + záró blokk
 */
export default function AvailabilityPage() {
  return (
    <>
      <AccommodationSubNav />

      <PageHero
        eyebrow="Szállás"
        title="Árak és szabad időpontok"
        description="Minden tétel látszik: szállásdíj, takarítás, idegenforgalmi adó és a kötelező tételek. A kaució külön, hogy ne torzítsa a végösszeget."
        mediaKey="availability-hero"
        actions={
          <>
            <PrimaryButton href="#naptar" variant="onDark">
              Naptár megnyitása
            </PrimaryButton>
            <SecondaryButton href={routes.quote} tone="dark">
              Ajánlatot kérek
            </SecondaryButton>
          </>
        }
      />

      <Section tone="white" spacing="sm">
        <ProgressTracker steps={quoteProcessSteps} activeIndex={0} />
      </Section>

      <Section tone="alpine" labelledBy="naptar-cim" id="naptar">
        <h2 id="naptar-cim" className="sr-only">
          Foglaltsági naptár és árösszesítő
        </h2>
        <AvailabilityAndPricing />
      </Section>
    </>
  );
}
