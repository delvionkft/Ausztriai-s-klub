'use client';

import Link from 'next/link';
import {
  ArrowRight, CableCar, CircleCheck, CircleX, Clock, Mountain, Snowflake, Thermometer, TriangleAlert,
} from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { getResortStatusSync } from '@/services/statusService';
import { formatCm, formatTemperature } from '@/lib/format';
import { cn } from '@/lib/cn';
import { UpdatedAt } from '@/components/ui/UpdatedAt';

/**
 * ÉLŐ STÁTUSZSÁV
 * ----------------------------------------------------------------------------
 * Minden oldalon ugyanabból az adatforrásból (`statusService`) dolgozik.
 * Az állapotot szín, ikon ÉS szöveg együtt jelzi.
 * Mobilon vízszintesen görgethető, de a legfontosabb két adat mindig látszik.
 */
export function LiveStatusBar() {
  const { t, L, locale } = useI18n();
  const status = getResortStatusSync();

  const tone =
    status.status === 'open' ? 'open' : status.status === 'closed' ? 'closed' : 'warn';
  const StateIcon = tone === 'open' ? CircleCheck : tone === 'closed' ? CircleX : TriangleAlert;
  const stateLabel =
    status.status === 'open' ? t.status.open
      : status.status === 'closed' ? t.status.closed
        : status.status === 'maintenance' ? t.status.maintenance
          : status.status === 'preparing' ? t.status.preparing
            : t.status.partial;

  const items = [
    { icon: Snowflake, label: t.status.snowMountain, value: formatCm(status.snowDepthMountainCm, locale), hideBelowXl: false },
    { icon: Mountain, label: t.status.snowValley, value: formatCm(status.snowDepthValleyCm, locale), hideBelowXl: true },
    { icon: Thermometer, label: t.status.temperature, value: formatTemperature(status.temperatureMountainC, locale), hideBelowXl: false },
    { icon: CableCar, label: t.status.liftsOpen, value: `${status.liftsOpen}/${status.liftsTotal}`, hideBelowXl: false },
    { icon: Mountain, label: t.status.slopesOpen, value: `${status.slopesOpen}/${status.slopesTotal}`, hideBelowXl: false },
  ];

  return (
    <div
      role="region"
      aria-label={t.a11y.statusRegion}
      className="border-b border-white/10 bg-night-950/95 text-frost-100 backdrop-blur-md"
    >
      <div className="container-page">
        <div className="no-scrollbar flex h-10 items-center gap-4 overflow-x-auto lg:h-11 lg:gap-6">
          <span
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-wide',
              tone === 'open' && 'bg-state-open/20 text-state-open',
              tone === 'warn' && 'bg-state-warn/20 text-state-warn',
              tone === 'closed' && 'bg-state-closed/20 text-state-closed',
            )}
          >
            <StateIcon aria-hidden="true" className="h-3.5 w-3.5" />
            {stateLabel}
          </span>

          <span className="sr-only">{L(status.message)}</span>

          {items.map((item) => (
            <span
              key={item.label}
              className={cn(
                'shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.8125rem]',
                item.hideBelowXl ? 'hidden xl:flex' : 'flex',
              )}
            >
              <item.icon aria-hidden="true" className="h-3.5 w-3.5 text-glacier-400" />
              <span className="text-frost-300/80">{item.label}:</span>
              <strong className="font-semibold text-white">{item.value}</strong>
            </span>
          ))}

          <span className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.8125rem] text-frost-300/70 lg:flex">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {t.status.lastUpdate}: <UpdatedAt iso={status.updatedAt} minutesAgo={12} />
          </span>

          <Link
            href={routes.snowReport}
            className="ml-auto hidden shrink-0 items-center gap-1 rounded-pill px-2.5 py-1 text-[0.8125rem] font-semibold text-glacier-300 transition-colors hover:bg-white/10 hover:text-white lg:inline-flex"
          >
            {t.cta.snowReport}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
