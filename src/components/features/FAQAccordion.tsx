'use client';

import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqCategory, FaqItem } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';

/**
 * GYIK — LENYITHATÓ KÉRDÉSEK
 * ----------------------------------------------------------------------------
 * Kategóriaszűrővel (opcionális) és akadálymentes accordion-viselkedéssel.
 */
export function FAQAccordion({
  items, withCategories = false, invert = false,
}: {
  items: FaqItem[];
  withCategories?: boolean;
  invert?: boolean;
}) {
  const { t, L } = useI18n();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const [category, setCategory] = useState<FaqCategory | 'all'>('all');

  const categories = useMemo(() => {
    const found = Array.from(new Set(items.map((item) => item.category)));
    return ['all' as const, ...found];
  }, [items]);

  const visible = category === 'all' ? items : items.filter((item) => item.category === category);

  return (
    <div>
      {withCategories && categories.length > 2 ? (
        <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t.common.filter}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                'tap-target inline-flex shrink-0 items-center rounded-pill px-4 text-sm font-semibold transition-all',
                category === cat
                  ? 'bg-night-950 text-white'
                  : invert
                    ? 'border border-white/20 text-frost-200 hover:bg-white/10'
                    : 'border border-night-200 bg-white text-night-700 hover:border-glacier-400 hover:bg-frost-100',
              )}
            >
              {cat === 'all' ? t.common.all : t.faqCategory[cat]}
            </button>
          ))}
        </div>
      ) : null}

      <ul className={cn('overflow-hidden rounded-panel border', invert ? 'border-white/12' : 'border-night-100 bg-white shadow-subtle')}>
        {visible.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id} className={cn('border-b last:border-b-0', invert ? 'border-white/10' : 'border-night-100')}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-button-${item.id}`}
                  className={cn(
                    'flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors lg:px-6 lg:py-5',
                    invert ? 'hover:bg-white/[0.05]' : 'hover:bg-frost-100',
                  )}
                >
                  <span className={cn('text-[1rem] font-bold leading-snug', invert ? 'text-white' : 'text-night-950')}>
                    {L(item.question)}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 ease-smooth',
                      open && 'rotate-180',
                      invert ? 'text-glacier-300' : 'text-night-400',
                    )}
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-button-${item.id}`}
                hidden={!open}
                className="animate-fade-in px-5 pb-5 lg:px-6 lg:pb-6"
              >
                <p className={cn('max-w-prose text-[0.9375rem] leading-relaxed', invert ? 'text-frost-200' : 'text-night-600')}>
                  {L(item.answer)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
