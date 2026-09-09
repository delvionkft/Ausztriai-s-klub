import { Cloud, CloudSun, Snowflake, Sun, Wind } from 'lucide-react';
import { forecast } from '@/data/status';
import { formatDateShortHu } from '@/lib/date';
import { formatNumber, formatTemperature } from '@/lib/format';
import { Card } from '@/components/ui/Card';
import type { ForecastDay } from '@/types';

const icons: Record<ForecastDay['icon'], typeof Sun> = {
  sun: Sun,
  'cloud-sun': CloudSun,
  cloud: Cloud,
  snow: Snowflake,
  wind: Wind,
};

/** HÁROMNAPOS ELŐREJELZÉS (drótváz 02/02). */
export function ForecastPanel() {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {forecast.map((day) => {
        const Icon = icons[day.icon];
        return (
          <Card as="li" key={day.date} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-deep-900">{day.label}</p>
                <p className="text-xs text-deep-500">{formatDateShortHu(day.date)}</p>
              </div>
              <Icon aria-hidden="true" className="h-7 w-7 text-glacier-600" />
            </div>

            <p className="mt-3 text-sm leading-snug text-deep-600">{day.summary}</p>

            <dl className="mt-3 flex items-baseline gap-4 border-t border-deep-100 pt-3">
              <div>
                <dt className="sr-only">Hőmérséklet</dt>
                <dd className="text-[0.95rem] font-bold text-deep-900">
                  {formatTemperature(day.tempMaxC)}
                  <span className="ml-1 text-sm font-medium text-deep-500">{formatTemperature(day.tempMinC)}</span>
                </dd>
              </div>
              <div className="ml-auto">
                <dt className="text-[0.68rem] text-deep-500">Friss hó</dt>
                <dd className="text-[0.95rem] font-bold text-glacier-700">{formatNumber(day.freshSnowCm, ' cm')}</dd>
              </div>
            </dl>
          </Card>
        );
      })}
    </ul>
  );
}
