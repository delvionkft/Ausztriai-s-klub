import { Car, Clock, MapPin, Navigation } from 'lucide-react';
import { contactInfo, travelOptions } from '@/data/contact';
import { dailyOpeningHours } from '@/data/openingHours';
import { routes } from '@/data/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecondaryButton } from '@/components/ui/Button';
import { PendingValue } from '@/components/ui/PendingValue';
import { MapEmbed } from '@/components/features/MapEmbed';

/** 09 · MEGKÖZELÍTÉS & GYORS INFÓ (drótváz 01/08). */
export function AccessQuickInfo() {
  const quickHours = dailyOpeningHours.slice(0, 3);

  return (
    <Section tone="white" labelledBy="megkozelites-cim">
      <SectionHeading
        id="megkozelites-cim"
        eyebrow="Megközelítés"
        title="Hogyan juttok el ide?"
        description="Térkép, cím és a legfontosabb nyitvatartási idők egy helyen."
        action={
          <SecondaryButton href={`${routes.info}#megkozelites`} icon={<Navigation aria-hidden="true" className="h-4 w-4" />}>
            Részletes útvonalak
          </SecondaryButton>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <MapEmbed className="min-h-[300px]" />

        <div className="space-y-4">
          <div className="rounded-card border border-deep-100 bg-white p-5">
            <h3 className="flex items-center gap-2 text-[1rem] font-semibold text-deep-900">
              <MapPin aria-hidden="true" className="h-4 w-4 text-glacier-600" />
              Cím és koordináták
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-deep-500">Cím</dt>
                <dd className="text-right font-medium text-deep-900">
                  <PendingValue value={contactInfo.addressLine} hint="Cím megadása szükséges" />
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-deep-500">GPS</dt>
                <dd className="text-right font-medium text-deep-900">
                  {contactInfo.gpsLat !== null && contactInfo.gpsLng !== null ? (
                    `${contactInfo.gpsLat}, ${contactInfo.gpsLng}`
                  ) : (
                    <PendingValue value={null} hint="GPS koordináta megadása szükséges" />
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-deep-500">Parkolás</dt>
                <dd className="text-right font-medium text-deep-900">
                  <PendingValue value={null} hint="Parkolási információ megadása szükséges" />
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-card border border-deep-100 bg-white p-5">
            <h3 className="flex items-center gap-2 text-[1rem] font-semibold text-deep-900">
              <Clock aria-hidden="true" className="h-4 w-4 text-glacier-600" />
              Gyors nyitvatartás
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              {quickHours.map((entry) => (
                <div key={entry.id} className="flex justify-between gap-3">
                  <dt className="text-deep-500">{entry.label}</dt>
                  <dd className="text-right font-medium text-deep-900">
                    <PendingValue value={entry.hours} hint="Nyitvatartás megadása szükséges" />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className="grid grid-cols-2 gap-2">
            {travelOptions.map((option) => (
              <li
                key={option.id}
                className="flex items-center gap-2 rounded-xl bg-frost px-3 py-2.5 text-sm font-medium text-deep-700"
              >
                <Car aria-hidden="true" className="h-4 w-4 shrink-0 text-glacier-600" />
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
