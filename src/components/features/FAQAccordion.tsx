'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { FaqItem } from '@/types';

/** GYIK HARMONIKA — billentyűzettel kezelhető, egyszerre egy nyitott elem. */
export function FAQAccordion({ items, allowMultiple = false }: { items: FaqItem[]; allowMultiple?: boolean }) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  };

  if (items.length === 0) {
    return <p className="text-sm text-deep-500">Jelenleg nincs megjeleníthető kérdés.</p>;
  }

  return (
    <ul className="divide-y divide-deep-100 overflow-hidden rounded-card border border-deep-100 bg-white">
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <li key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full min-h-[60px] items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-deep-50/70 sm:px-5"
              >
                <span className="text-[0.98rem] font-semibold text-deep-900">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-deep-200 text-deep-600 transition-transform duration-200',
                    open && 'rotate-45 border-glacier-400 bg-glacier-50 text-glacier-700',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-4 pb-5 sm:px-5"
            >
              <p className="max-w-prose text-[0.94rem] leading-relaxed text-deep-600">{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
