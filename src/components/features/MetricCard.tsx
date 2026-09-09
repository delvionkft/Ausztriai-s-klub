'use client';

import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';

/**
 * KIEMELT SZÁMADAT
 * ----------------------------------------------------------------------------
 * A numerikus értékek felfelé számlálódnak, amikor a kártya képernyőre ér.
 * `prefers-reduced-motion` esetén azonnal a végértéket mutatja.
 */
export function MetricCard({
  value, label, icon, tone = 'light', suffix = '', className,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
  tone?: 'light' | 'dark';
  suffix?: string;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.4);
  const display = useCountUp(value, shown);

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-card p-6 transition-all duration-500 ease-smooth',
        tone === 'light'
          ? 'border border-night-100 bg-white shadow-subtle'
          : 'border border-white/12 bg-white/[0.07] backdrop-blur-sm',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        className,
      )}
    >
      {icon ? (
        <span className={cn('mb-4 inline-grid h-11 w-11 place-items-center rounded-xl', tone === 'light' ? 'bg-frost-200 text-glacier-600' : 'bg-glacier-400/15 text-glacier-300')}>
          {icon}
        </span>
      ) : null}
      <p className={cn('font-display text-[2.5rem] font-extrabold leading-none tracking-tight lg:text-[3rem]', tone === 'light' ? 'text-night-950' : 'text-white')}>
        {display}{suffix}
      </p>
      <p className={cn('mt-2.5 text-[0.9375rem] font-medium', tone === 'light' ? 'text-night-600' : 'text-frost-300')}>{label}</p>
    </div>
  );
}

/** Számlálóanimáció: a szövegben lévő első számot animálja, a többit meghagyja. */
function useCountUp(value: string, start: boolean): string {
  const [display, setDisplay] = useState(value);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return undefined;
    }

    const match = value.match(/[\d.,]+/);
    if (!match) { setDisplay(value); return undefined; }

    const target = Number(match[0].replace(',', '.'));
    if (!Number.isFinite(target)) { setDisplay(value); return undefined; }

    const decimals = match[0].includes(',') || match[0].includes('.') ? 1 : 0;
    const duration = 900;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(decimals).replace('.', decimals ? ',' : '.');
      setDisplay(value.replace(match[0], current));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [start, value]);

  return display;
}
