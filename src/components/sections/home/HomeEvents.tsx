import { ArrowRight } from 'lucide-react';
import { events } from '@/data/events';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecondaryButton } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { EventCard } from '@/components/features/EventCard';

/** 08 · ESEMÉNYEK / HÍREK — MAX. 3 (drótváz 01/07). */
export function HomeEvents() {
  const visible = events.filter((event) => event.season !== 'summer').slice(0, 3);

  return (
    <Section tone="default" labelledBy="esemenyek-cim">
      <SectionHeading
        id="esemenyek-cim"
        eyebrow="Aktuális"
        title="Események és hírek"
        description="A legfontosabb három. A teljes listát az Élmény oldalon találod."
        action={
          <SecondaryButton
            href={routes.experience}
            iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
          >
            Összes esemény
          </SecondaryButton>
        }
      />

      {visible.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="Jelenleg nincs meghirdetett esemény"
          description="Amint kihirdetjük a következő programot, itt fog megjelenni."
        />
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
