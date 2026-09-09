'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { cn } from '@/lib/cn';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, invert = false, className }: { items: Crumb[]; invert?: boolean; className?: string }) {
  const { t } = useI18n();

  return (
    <nav aria-label={t.common.breadcrumb} className={cn('text-[0.8125rem]', className)}>
      <ol className="flex flex-wrap items-center gap-1">
        <li className="flex items-center gap-1">
          <Link
            href={routes.home}
            className={cn('inline-flex min-h-[36px] items-center rounded px-1 transition-colors', invert ? 'text-frost-200 hover:text-white' : 'text-night-500 hover:text-night-900')}
          >
            {t.common.homeLabel}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            <ChevronRight aria-hidden="true" className={cn('h-3.5 w-3.5', invert ? 'text-frost-300/60' : 'text-night-300')} />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={cn('inline-flex min-h-[36px] items-center rounded px-1 transition-colors', invert ? 'text-frost-200 hover:text-white' : 'text-night-500 hover:text-night-900')}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn('inline-flex min-h-[36px] items-center px-1 font-semibold', invert ? 'text-white' : 'text-night-900')}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
