import { ArrowRight, CalendarCheck } from 'lucide-react';
import { accommodationFacts, accommodationIntro } from '@/data/accommodation';
import { routes } from '@/data/navigation';
import { Media } from '@/components/ui/Media';
import { PendingValue } from '@/components/ui/PendingValue';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

/**
 * SZÁLLÁS & VENDÉGHÁZ — a csoportos ág belépője (drótváz 01/06).
 * Ugyanaz az adatforrás, mint a szállás oldalakon.
 */
export function AccommodationCard() {
  return (
    <div className="overflow-hidden rounded-panel border border-deep-100 bg-white shadow-card">
      <div className="grid lg:grid-cols-2">
        <Media
          mediaKey="home-accommodation"
          className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[380px]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-glacier-600">
            {accommodationIntro.eyebrow}
          </p>
          <h2 className="mt-2 text-h1">{accommodationIntro.title}</h2>
          <p className="mt-3 max-w-prose text-[0.98rem] leading-relaxed text-deep-600">
            {accommodationIntro.lead}
          </p>

          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {accommodationFacts.slice(0, 4).map((fact) => (
              <li key={fact.id} className="rounded-xl bg-frost px-3 py-2.5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-deep-500">{fact.label}</p>
                <p className="mt-0.5 font-semibold text-deep-900">
                  <PendingValue value={fact.value} hint={`${fact.label} megadása szükséges`} />
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
            <PrimaryButton
              href={routes.availability}
              icon={<CalendarCheck aria-hidden="true" className="h-4 w-4" />}
            >
              Szabad időpontok
            </PrimaryButton>
            <SecondaryButton
              href={routes.quote}
              iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
            >
              Ajánlatot kérek
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
