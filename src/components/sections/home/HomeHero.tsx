'use client';

import Link from 'next/link';
import { ArrowRight, Map, Play, Snowflake, Thermometer, Ticket } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { webcams } from '@/data/webcams';
import { getResortStatusSync } from '@/services/statusService';
import { formatCm, formatTemperature } from '@/lib/format';
import { track } from '@/lib/analytics';
import { Media } from '@/components/ui/Media';
import { ButtonLink } from '@/components/ui/Button';
import { UpdatedAt } from '@/components/ui/UpdatedAt';

/**
 * KEZDŐLAP — HERO
 * ----------------------------------------------------------------------------
 * Nagy háttérkép, erős főcím, a nap üzenete, két CTA és élő webkamera-előnézet.
 */
export function HomeHero() {
  const { t, L, locale } = useI18n();
  const status = getResortStatusSync();
  const cam = webcams[0];

  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--header-h)-var(--status-h))] items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Media mediaKey="hero-home" priority overlay="strong" sizes="100vw" className="h-full w-full" />
      </div>

      {/* Alsó lágy átmenet a következő szekció felé */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-night-950 to-transparent" />

      <div className="container-page w-full pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-4 py-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-glacier-200 backdrop-blur-md">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-state-open" />
              {t.home.heroKicker}
            </p>

            <h1 className="max-w-3xl text-display-xl text-white">{t.home.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lead text-frost-200">{t.home.heroLead}</p>

            {/* A nap üzenete */}
            <div className="mt-7 max-w-xl rounded-card border border-white/15 bg-white/[0.08] p-4 backdrop-blur-md">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-glacier-300">{t.home.todayMessage}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-frost-100">{L(status.message)}</p>
            </div>

            {/* Rövid státuszinformáció */}
            <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
              {[
                { icon: Snowflake, label: t.status.snowMountain, value: formatCm(status.snowDepthMountainCm, locale) },
                { icon: Thermometer, label: t.status.temperature, value: formatTemperature(status.temperatureMountainC, locale) },
                { icon: Map, label: t.status.slopesOpen, value: `${status.slopesOpen}/${status.slopesTotal}` },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <item.icon aria-hidden="true" className="h-5 w-5 text-glacier-300" />
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-frost-300/70">{item.label}</dt>
                    <dd className="font-display text-lg font-extrabold text-white">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={routes.tickets}
                size="lg"
                onClick={() => track('begin_ticket_checkout', { source: 'home-hero' })}
              >
                <Ticket aria-hidden="true" className="h-5 w-5" />
                {t.cta.buyTicket}
              </ButtonLink>
              <ButtonLink
                href={routes.slopeMap}
                variant="onDark"
                size="lg"
                onClick={() => track('open_slope_map', { source: 'home-hero' })}
              >
                <Map aria-hidden="true" className="h-5 w-5" />
                {t.cta.slopeMap}
              </ButtonLink>
            </div>
          </div>

          {/* Webkamera-előnézet */}
          <Link
            href={`${routes.lifts}#webkamerak`}
            onClick={() => track('view_webcam', { source: 'home-hero', webcam: cam.id })}
            className="group hidden overflow-hidden rounded-panel border border-white/20 bg-white/[0.07] backdrop-blur-md transition-all duration-300 hover:border-glacier-400/50 lg:block"
          >
            <div className="relative">
              <Media
                mediaKey={cam.imageKey}
                className="aspect-[16/10]"
                sizes="30vw"
                imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
                overlay="bottom"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-night-950/75 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-state-open" />
                {t.status.liveNow}
              </span>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-pill bg-white/15 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Play aria-hidden="true" className="ml-0.5 h-6 w-6" />
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3.5">
              <div className="min-w-0">
                <p className="text-[0.75rem] font-bold uppercase tracking-wider text-glacier-300">{t.home.webcamPreview}</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-white">{cam.name}</p>
                <p className="mt-0.5 text-[0.75rem] text-frost-300/70">
                  {t.common.updated}: <UpdatedAt iso={cam.updatedAt} minutesAgo={7} />
                </p>
              </div>
              <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-glacier-300 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
