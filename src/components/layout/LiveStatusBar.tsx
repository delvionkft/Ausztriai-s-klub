'use client';

import { CableCar, Mountain, RefreshCw, Snowflake, Thermometer } from 'lucide-react';
import { liveStatus } from '@/data/status';
import { DEMO_DATA_ENABLED } from '@/data/placeholders';
import { formatDateTimeHu } from '@/lib/date';
import { formatNumber, formatRatio, formatTemperature } from '@/lib/format';
import { cn } from '@/lib/cn';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * ÉLŐ STÁTUSZ SÁV — minden releváns oldalon, EGYETLEN adatforrásból.
 * Forrás: `src/data/status.ts` → `src/services/statusService.ts`.
 * A szerver is renderel belőle HTML-t (jó CLS/LCP), a feliratok a nyelvi
 * szótárból jönnek (`src/i18n/`), így DE/EN/HU alatt is helyesek.
 */

const statusTone = {
  open: 'bg-status-open',
  closed: 'bg-status-closed',
  maintenance: 'bg-status-warn',
  preparing: 'bg-status-neutral',
} as const;

interface Metric {
  id: string;
  label: string;
  value: string;
  icon: typeof Snowflake;
}

const statusKey = {
  open: 'status.open',
  closed: 'status.closed',
  maintenance: 'status.maintenance',
  preparing: 'status.preparing',
} as const;

export function LiveStatusBar({ className }: { className?: string }) {
  const { t } = useI18n();

  const metrics: Metric[] = [
    {
      id: 'snow',
      label: t('status.snowDepth'),
      value: formatNumber(liveStatus.snowDepthMountainCm, ' cm'),
      icon: Snowflake,
    },
    {
      id: 'temp',
      label: t('status.temperature'),
      value: formatTemperature(liveStatus.temperatureC),
      icon: Thermometer,
    },
    {
      id: 'lifts',
      label: t('status.liftsOpen'),
      value: formatRatio(liveStatus.liftsOpen, liveStatus.liftsTotal),
      icon: CableCar,
    },
    {
      id: 'slopes',
      label: t('status.slopesOpen'),
      value: formatRatio(liveStatus.slopesOpen, liveStatus.slopesTotal),
      icon: Mountain,
    },
  ];

  return (
    <div
      className={cn('border-b border-deep-100 bg-white/95 backdrop-blur-md', className)}
      aria-label={t('status.live')}
    >
      <div className="container-page">
        {/* Asztali és tablet: egy sor */}
        <div className="hidden items-center justify-between gap-4 py-2 lg:flex">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-pill bg-deep-50 px-3 py-1 text-sm font-semibold text-deep-900">
              <span
                aria-hidden="true"
                className={cn('h-2 w-2 rounded-full', statusTone[liveStatus.resortStatus], 'animate-pulse-dot')}
              />
              {t(statusKey[liveStatus.resortStatus])}
            </span>
            <ul className="flex items-center gap-4">
              {metrics.map((metric) => (
                <li key={metric.id} className="flex items-center gap-1.5 text-sm text-deep-700">
                  <metric.icon aria-hidden="true" className="h-4 w-4 text-glacier-600" />
                  <span className="sr-only">{metric.label}: </span>
                  <span className="font-semibold text-deep-900">{metric.value}</span>
                  <span className="text-deep-500">{metric.label.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex items-center gap-1.5 whitespace-nowrap text-xs text-deep-500">
            <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            {t('status.updatedAt')}: {formatDateTimeHu(liveStatus.updatedAt)}
            {DEMO_DATA_ENABLED ? <span className="rounded bg-ice-200 px-1.5 py-0.5 font-medium text-deep-700">demó</span> : null}
          </p>
        </div>

        {/* Mobil: két tömör sor, vízszintes görgetés nélkül */}
        <div className="py-1.5 lg:hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-deep-900">
              <span
                aria-hidden="true"
                className={cn('h-2 w-2 rounded-full', statusTone[liveStatus.resortStatus], 'animate-pulse-dot')}
              />
              {t(statusKey[liveStatus.resortStatus])}
            </span>
            <span className="truncate text-[0.7rem] text-deep-500">
              {formatDateTimeHu(liveStatus.updatedAt)}
              {DEMO_DATA_ENABLED ? ' · demó' : ''}
            </span>
          </div>
          <ul className="mt-1 grid grid-cols-4 gap-1 sm:gap-2">
            {metrics.map((metric) => (
              <li key={metric.id} className="flex flex-col items-center rounded-md bg-deep-50/70 px-1 py-1 sm:flex-row sm:justify-center sm:gap-1.5 sm:px-2 sm:py-1.5">
                <metric.icon aria-hidden="true" className="h-3.5 w-3.5 text-glacier-600" />
                <span className="mt-0.5 text-[0.78rem] font-bold leading-none text-deep-900 sm:mt-0 sm:text-sm">{metric.value}</span>
                <span className="mt-0.5 max-w-full truncate text-[0.6rem] leading-none text-deep-500 sm:mt-0 sm:text-xs">{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
