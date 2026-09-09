import { Map, Ticket } from 'lucide-react';
import { dailyMessage } from '@/data/homepage';
import { routes } from '@/data/navigation';
import { liveStatus } from '@/data/status';
import { formatDateTimeHu } from '@/lib/date';
import { formatNumber, formatTemperature } from '@/lib/format';
import { Media } from '@/components/ui/Media';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

/** 02 · HERO — A NAP ÜZENETE + 03 · CTA-k (drótváz 01/02–03). */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-cim">
      {/* Háttérkép külön abszolút rétegben (lásd PageHero). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Media
          mediaKey="home-hero"
          priority
          showHint={false}
          overlay="strong"
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      <div className="container-page">
        <div className="grid items-end gap-10 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-glacier-200 ring-1 ring-inset ring-white/20">
              {dailyMessage.badge}
            </span>

            <h1 id="hero-cim" className="mt-4 text-display-lg text-white">
              {dailyMessage.title}
            </h1>

            <p className="mt-5 max-w-prose text-[1.05rem] leading-relaxed text-ice-100/90">
              {dailyMessage.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                href={routes.tickets}
                size="lg"
                icon={<Ticket aria-hidden="true" className="h-[18px] w-[18px]" />} variant="onDark"
              >
                Jegyvásárlás
              </PrimaryButton>
              <SecondaryButton
                href={routes.slopeMap}
                size="lg"
                tone="dark"
                icon={<Map aria-hidden="true" className="h-[18px] w-[18px]" />}
              >
                Pályatérkép
              </SecondaryButton>
            </div>
          </div>

          {/* Webkamera-kép / aznapi felvétel — a drótváz jobb oldali képhelye */}
          <div className="w-full">
            <div className="overflow-hidden rounded-panel border border-white/25 bg-white/10 p-2 backdrop-blur-md">
              <Media
                mediaKey="home-hero"
                className="aspect-[16/10] rounded-card"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <dl className="grid grid-cols-3 gap-2 p-3 text-center">
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-ice-200/70">Hó a hegyen</dt>
                  <dd className="mt-0.5 text-[0.95rem] font-bold text-white">
                    {formatNumber(liveStatus.snowDepthMountainCm, ' cm')}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-ice-200/70">Hőmérséklet</dt>
                  <dd className="mt-0.5 text-[0.95rem] font-bold text-white">
                    {formatTemperature(liveStatus.temperatureC)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-ice-200/70">Felvonó</dt>
                  <dd className="mt-0.5 text-[0.95rem] font-bold text-white">
                    {liveStatus.liftsOpen}/{liveStatus.liftsTotal}
                  </dd>
                </div>
              </dl>
              <p className="px-3 pb-2 text-center text-[0.65rem] text-ice-200/60">
                Frissítve: {formatDateTimeHu(liveStatus.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
