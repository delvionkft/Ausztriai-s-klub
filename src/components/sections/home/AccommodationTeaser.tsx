import { Section } from '@/components/ui/Section';
import { AccommodationCard } from '@/components/features/AccommodationCard';

/** 07 · SZÁLLÁS & VENDÉGHÁZ — a csoportos ág belépője (drótváz 01/06). */
export function AccommodationTeaser() {
  return (
    <Section tone="alpine" labelledBy="szallas-teaser-cim">
      <h2 id="szallas-teaser-cim" className="sr-only">
        Szállás és vendégház
      </h2>
      <AccommodationCard />
    </Section>
  );
}
