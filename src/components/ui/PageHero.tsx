import type { ReactNode } from 'react';
import { Media } from './Media';
import { cn } from '@/lib/cn';

/**
 * OLDAL FEJLÉCKÉP — minden aloldal tetején egységes.
 * A kép a `src/data/media.ts`-ből jön; ha nincs, dizájnolt helyőrző.
 */
interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  mediaKey: string;
  actions?: ReactNode;
  aside?: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  mediaKey,
  actions,
  aside,
  size = 'sm',
  className,
}: PageHeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden', className)}>
      {/* Háttérkép: külön abszolút pozicionált réteg, hogy a Media saját
          `relative` alapállapota ne ütközzön a pozicionálással. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Media
          mediaKey={mediaKey}
          priority
          showHint={false}
          overlay="strong"
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      <div className="container-page">
        <div
          className={cn(
            'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
            size === 'sm' ? 'py-12 sm:py-16' : 'py-16 sm:py-24',
          )}
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-glacier-200">{eyebrow}</p>
            <h1 className={cn('mt-3 text-white', size === 'sm' ? 'text-h1' : 'text-display')}>{title}</h1>
            {description ? (
              <p className="mt-4 max-w-prose text-[1.02rem] leading-relaxed text-ice-100/90">{description}</p>
            ) : null}
            {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {aside ? <div className="w-full lg:w-auto lg:max-w-sm">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
