'use client';

import {
  CloudSnow, Clock, Gauge, Layers, Snowflake, Sun, Thermometer, TriangleAlert, Wind, Moon,
} from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { getResortStatusSync } from '@/services/statusService';
import { formatCm, formatTemperature } from '@/lib/format';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { UpdatedAt } from '@/components/ui/UpdatedAt';

/** A hójelentés fő adatpanele — az első képernyőn minden lényeges szám. */
export function SnowPanel() {
  const { t, L, locale } = useI18n();
  const s = getResortStatusSync();

  const primary = [
    { icon: Layers, label: t.status.snowMountain, value: formatCm(s.snowDepthMountainCm, locale), hint: `${1980} m` },
    { icon: Layers, label: t.status.snowValley, value: formatCm(s.snowDepthValleyCm, locale), hint: `${860} m` },
    { icon: Thermometer, label: t.status.temperature, value: formatTemperature(s.temperatureMountainC, locale), hint: `${t.map.altitude} 2140 m` },
    { icon: Wind, label: t.status.wind, value: `${s.windSpeedKmh} km/h`, hint: s.windDirection },
  ];

  const fresh = [
    { label: t.snow.newSnow24, value: formatCm(s.freshSnow24hCm, locale) },
    { label: t.snow.newSnow48, value: formatCm(s.freshSnow48hCm, locale) },
    { label: t.snow.newSnow72, value: formatCm(s.freshSnow72hCm, locale) },
  ];

  return (
    <div className="overflow-hidden rounded-panel border border-white/12 bg-white/[0.06] backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-6 py-5">
        <h2 className="mr-auto font-display text-lg font-extrabold text-white">{t.snow.mainPanel}</h2>
        <StatusBadge
          invert
          tone={s.status === 'open' ? 'open' : s.status === 'closed' ? 'closed' : 'warn'}
          label={s.status === 'open' ? t.status.open : s.status === 'closed' ? t.status.closed : t.status.partial}
        />
        <StatusBadge invert tone="info" label={L(s.snowCondition)} />
      </div>

      <p className="border-b border-white/10 px-6 py-4 text-[0.9375rem] leading-relaxed text-frost-200">{L(s.message)}</p>

      <dl className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
        {primary.map((item) => (
          <div key={item.label} className="bg-night-950/40 px-6 py-5">
            <dt className="flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-wider text-frost-300/75">
              <item.icon aria-hidden="true" className="h-3.5 w-3.5 text-glacier-400" />
              {item.label}
            </dt>
            <dd className="mt-2 font-display text-[1.875rem] font-extrabold leading-none text-white">{item.value}</dd>
            <p className="mt-1.5 text-[0.75rem] text-frost-300/60">{item.hint}</p>
          </div>
        ))}
      </dl>

      <div className="grid gap-px bg-white/10 sm:grid-cols-3">
        {fresh.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 bg-night-950/25 px-6 py-4">
            <span className="flex items-center gap-2 text-[0.8125rem] text-frost-300/80">
              <CloudSnow aria-hidden="true" className="h-4 w-4 text-glacier-400" />
              {item.label}
            </span>
            <strong className="font-display text-lg font-extrabold text-white">{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 px-6 py-4 text-[0.8125rem] text-frost-300/80">
        <span className="flex items-center gap-1.5">
          <TriangleAlert aria-hidden="true" className="h-4 w-4 text-state-warn" />
          {t.status.avalanche}: <strong className="font-semibold text-white">{s.avalancheLevel}/5</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <Gauge aria-hidden="true" className="h-4 w-4 text-glacier-400" />
          {t.status.slopesOpen}: <strong className="font-semibold text-white">{s.slopesOpen}/{s.slopesTotal} · {s.slopeKmOpen} km</strong>
        </span>
        {s.nightSkiingToday ? (
          <span className="flex items-center gap-1.5">
            <Moon aria-hidden="true" className="h-4 w-4 text-glacier-400" />
            {t.status.nightSkiing}: <strong className="font-semibold text-white">18:30 – 21:30</strong>
          </span>
        ) : null}
        <span className="ml-auto flex items-center gap-1.5">
          <Clock aria-hidden="true" className="h-4 w-4" />
          {t.status.lastUpdate}: <UpdatedAt iso={s.updatedAt} minutesAgo={12} format="datetime" />
        </span>
      </div>
    </div>
  );
}

const FORECAST_ICONS = {
  sun: Sun, partly: Sun, cloud: CloudSnow, snow: Snowflake, 'heavy-snow': CloudSnow, wind: Wind,
} as const;

/** Háromnapos előrejelzés. */
export function ForecastStrip({ days }: { days: ReturnType<typeof import('@/services/statusService').getForecastSync> }) {
  const { t, L, locale } = useI18n();

  return (
    <div>
      <h2 className="mb-4 font-display text-lg font-extrabold text-white">{t.snow.forecast}</h2>
      <ul className="grid gap-3 sm:grid-cols-3">
        {days.map((day) => {
          const Icon = FORECAST_ICONS[day.icon] ?? Snowflake;
          return (
            <li key={day.date} className="rounded-card border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-base font-bold text-white">{L(day.label)}</p>
                <Icon aria-hidden="true" className="h-6 w-6 text-glacier-300" />
              </div>
              <p className="mt-3 text-[0.875rem] leading-snug text-frost-300/85">{L(day.summary)}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <dt className="text-[0.6875rem] uppercase tracking-wide text-frost-300/60">{t.status.temperature}</dt>
                  <dd className="mt-1 text-sm font-bold text-white">
                    {formatTemperature(day.tempMinC, locale)} / {formatTemperature(day.tempMaxC, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] uppercase tracking-wide text-frost-300/60">{t.snow.newSnowShort}</dt>
                  <dd className="mt-1 text-sm font-bold text-white">{formatCm(day.newSnowCm, locale)}</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] uppercase tracking-wide text-frost-300/60">{t.snow.sunHours}</dt>
                  <dd className="mt-1 text-sm font-bold text-white">{day.sunHours} h</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
