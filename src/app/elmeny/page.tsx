import type { Metadata } from 'next';
import { ArrowRight, Check, PartyPopper, UtensilsCrossed } from 'lucide-react';
import { events } from '@/data/events';
import { gastroInfo } from '@/data/experiences';
import { liveStatus } from '@/data/status';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/States';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { ExperienceGrid } from '@/components/features/ExperienceGrid';
import { EventCard } from '@/components/features/EventCard';

export const metadata: Metadata = {
  title: 'Élmény és nyári üzem',
  description:
    'Szánkópálya, téli túra, hütték, családi program, nyári túra, kerékpár, kilátó és rendezvények. Eseménylista, céges rendezvény és esküvő, gasztronómia és après-ski.',
  alternates: { canonical: routes.experience },
  openGraph: { title: 'Élmény és nyári üzem', description: 'Téli és nyári programok a hegyen.', url: routes.experience },
};

/**
 * 11 · ÉLMÉNY ÉS NYÁRI ÜZEM
 * 01 fejléc + státuszsáv (üzemmódfüggő) .. SiteShell + szezonjelzés
 * 02 hero — üzemmódfüggő ................. PageHero (téli/nyári képkulcs)
 * 03 élménykártyák — téli és nyári ....... ExperienceGrid
 * 04 eseménylista ........................ EventsList
 * 05 átvezetés a szállás ágra ............ CrossoverSection
 */
export default function ExperiencePage() {
  const isSummer = liveStatus.season === 'summer';
  const heroKey = isSummer ? 'experience-hero' : 'experience-hero-winter';

  return (
    <>
      <PageHero
        eyebrow={isSummer ? 'Nyári üzem' : 'Téli üzem'}
        title={isSummer ? 'Nyáron is van miért feljönni a hegyre' : 'A síelésen túl is van program'}
        description={
          isSummer
            ? 'Túraútvonalak, kerékpár, kilátó és rendezvények — a felvonó nyáron is visz felfelé.'
            : 'Szánkópálya, esti síelés, hütték és családi programok. A nyári kínálat is itt található.'
        }
        mediaKey={heroKey}
        size="md"
        actions={
          <>
            <PrimaryButton href="#esemenyek" size="lg" variant="onDark">
              Programok
            </PrimaryButton>
            <SecondaryButton href={routes.quote} size="lg" tone="dark">
              Rendezvény ajánlatkérés
            </SecondaryButton>
          </>
        }
      />

      <Section tone="alpine" spacing="sm">
        <p className="rounded-card border border-ice-300 bg-ice-100 px-4 py-3 text-sm text-deep-700">
          <strong className="font-semibold">Aktuális üzemmód: {isSummer ? 'nyári' : 'téli'}.</strong>{' '}
          A fejléc alatti státuszsáv és ez az oldal ugyanabból a központi adatforrásból veszi a szezont
          (<code className="rounded bg-white px-1 py-0.5 text-xs">src/data/status.ts</code> → <code className="rounded bg-white px-1 py-0.5 text-xs">season</code>).
        </p>
      </Section>

      {/* 03 · ÉLMÉNYKÁRTYÁK */}
      <Section tone="white" labelledBy="elmenyek-cim">
        <SectionHeading
          id="elmenyek-cim"
          eyebrow="Élmények"
          title="Téli és nyári programok"
          description="Nyolc program, ami a síelésen kívül is megéri az utat."
        />
        <div className="mt-6">
          <ExperienceGrid />
        </div>
      </Section>

      {/* 04 · ESEMÉNYEK LISTÁJA */}
      <Section tone="default" labelledBy="esemenylista-cim" id="esemenyek">
        <SectionHeading
          id="esemenylista-cim"
          eyebrow="Események"
          title="Mikor mi lesz?"
          description="Az időpontokat a síközpont hirdeti ki — addig jelöltként szerepelnek."
        />

        {events.length === 0 ? (
          <EmptyState className="mt-6" title="Jelenleg nincs meghirdetett esemény" />
        ) : (
          <ul className="mt-6 rounded-panel border border-deep-100 bg-white px-5 sm:px-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} variant="row" />
            ))}
          </ul>
        )}
      </Section>

      {/* 05 · ÁTVEZETÉS A SZÁLLÁS ÁGRA */}
      <Section tone="white" labelledBy="atvezetes-cim">
        <h2 id="atvezetes-cim" className="sr-only">
          Rendezvény és gasztronómia
        </h2>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="flex flex-col p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-deep-800 text-white">
              <PartyPopper aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-h2">Céges rendezvény és esküvő</h3>
            <p className="mt-2.5 flex-1 text-[0.98rem] leading-relaxed text-deep-600">
              Csapatépítés, céges nap vagy esküvő a hegyen — a vendégház teljes házas kiadásával a társaság egy
              helyen marad. A részleteket személyre szabott ajánlatban egyeztetjük.
            </p>
            <PrimaryButton
              href={routes.quote}
              className="mt-6 self-start"
              iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
            >
              Rendezvény ajánlatkérés
            </PrimaryButton>
          </Card>

          <Card className="flex flex-col p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-glacier-600 text-white">
              <UtensilsCrossed aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-h2">{gastroInfo.title}</h3>
            <p className="mt-2.5 text-[0.98rem] leading-relaxed text-deep-600">{gastroInfo.description}</p>
            <ul className="mt-4 flex-1 space-y-2">
              {gastroInfo.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-deep-700">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-glacier-600" />
                  {point}
                </li>
              ))}
            </ul>
            <SecondaryButton href={routes.guesthouse} className="mt-6 self-start">
              A vendégház
            </SecondaryButton>
          </Card>
        </div>
      </Section>
    </>
  );
}
