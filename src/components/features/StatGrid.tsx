import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { PendingValue } from '@/components/ui/PendingValue';

export interface StatItem {
  id: string;
  label: string;
  value: string | number | null;
  suffix?: string;
  icon?: LucideIcon;
  hint?: string;
}

/** Adatblokk — „A hegy számokban”, gyors infósáv stb. */
export function StatGrid({
  items,
  columns = 4,
  tone = 'light',
  className,
}: {
  items: StatItem[];
  columns?: 3 | 4 | 5 | 7;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const columnClass = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    7: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7',
  }[columns];

  return (
    <dl className={cn('grid gap-3', columnClass, className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'rounded-card border p-4',
            tone === 'dark' ? 'border-white/10 bg-white/10' : 'border-deep-100 bg-white',
          )}
        >
          {item.icon ? (
            <item.icon
              aria-hidden="true"
              className={cn('h-5 w-5', tone === 'dark' ? 'text-glacier-300' : 'text-glacier-600')}
            />
          ) : null}
          <dd
            className={cn(
              'mt-2 text-xl font-bold tabular-nums sm:text-2xl',
              tone === 'dark' ? 'text-white' : 'text-deep-900',
            )}
          >
            <PendingValue value={item.value} suffix={item.suffix} hint={item.hint} />
          </dd>
          <dt
            className={cn(
              'mt-1 text-[0.78rem] font-medium',
              tone === 'dark' ? 'text-ice-200/75' : 'text-deep-500',
            )}
          >
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
