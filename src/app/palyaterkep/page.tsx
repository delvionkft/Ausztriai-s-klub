import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { SlopeMap } from '@/components/features/SlopeMap';
import { SlopeList } from '@/components/features/SlopeList';

export const metadata: Metadata = {
  title: 'Pályatérkép',
  description:
    'Interaktív pályatérkép rétegvezérlővel: nehézség, felvonók, hóágyúzott szakaszok, éttermek és lezárások. Kattintható pályák és felvonók, részletes adatpanellel.',
  alternates: { canonical: routes.slopeMap },
  openGraph: { title: 'Pályatérkép', description: 'Interaktív pályatérkép rétegvezérlővel.', url: routes.slopeMap },
};

/**
 * 03 · PÁLYATÉRKÉP
 * 01 fejléc + státuszsáv .......... SiteShell
 * 02 rétegvezérlő ................. SlopeMap (belső)
 * 03 térkép — kattintható ......... SlopeMap
 * 04 kiválasztott elem panel ...... SlopeMap
 * 05 offline tartalék ............. SlopeMap
 */
export default function SlopeMapPage() {
  return (
    <>
      <PageHero
        eyebrow="A hegy"
        title="Pályatérkép"
        description="Kapcsold be, ami érdekel, és kattints rá egy pályára vagy felvonóra — az adatai azonnal megjelennek alatta."
        mediaKey="map-hero"
        actions={
          <>
            <PrimaryButton href={routes.snowReport} variant="onDark">
              Hójelentés
            </PrimaryButton>
            <SecondaryButton href={routes.lifts} tone="dark">
              Felvonók és nyitvatartás
            </SecondaryButton>
          </>
        }
      />

      <Section tone="alpine" labelledBy="terkep-cim">
        <h2 id="terkep-cim" className="sr-only">
          Interaktív pályatérkép
        </h2>
        <SlopeMap />
      </Section>

      <Section tone="white" labelledBy="palyak-cim">
        <SectionHeading
          id="palyak-cim"
          eyebrow="Pályák"
          title="Az összes pálya listában is"
          description="Ha inkább listából választanál: ugyanaz az adat, más nézetben."
        />
        <div className="mt-6">
          <SlopeList selectable />
        </div>
      </Section>
    </>
  );
}
