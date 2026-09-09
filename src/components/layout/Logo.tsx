import Link from 'next/link';
import { routes } from '@/data/navigation';
import { resortInfo } from '@/data/site.config';
import { cn } from '@/lib/cn';

/**
 * LOGÓ
 * ----------------------------------------------------------------------------
 * Stilizált hegycsúcs + márkanév. Végleges logó esetén cseréld az SVG-t vagy
 * tegyél a helyére képet — a méretezés és a link változatlan marad.
 */
export function Logo({ invert = false, compact = false }: { invert?: boolean; compact?: boolean }) {
  return (
    <Link
      href={routes.home}
      className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:ring-offset-0"
      aria-label={`${resortInfo.name} — kezdőlap`}
    >
      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-xl transition-all duration-300 ease-smooth',
          compact ? 'h-9 w-9' : 'h-10 w-10',
          invert ? 'bg-white/10 ring-1 ring-white/25' : 'bg-night-950 shadow-subtle',
        )}
      >
        <svg viewBox="0 0 32 32" className={compact ? 'h-5 w-5' : 'h-[22px] w-[22px]'} aria-hidden="true">
          <path d="M2 26 L11 11 L16.5 20 L20 14 L30 26 Z" fill="#19C3E6" />
          <path d="M11 11 L14.4 16.6 L11 18.2 L7.6 16.6 Z" fill="#F8FBFF" />
          <path d="M20 14 L22.4 18 L20 19 L17.6 18 Z" fill="#F8FBFF" opacity="0.9" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display font-extrabold tracking-tight', compact ? 'text-[0.95rem]' : 'text-[1.05rem]', invert ? 'text-white' : 'text-night-950')}>
          {resortInfo.shortName}
        </span>
        <span className={cn('mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]', invert ? 'text-glacier-300' : 'text-glacier-600')}>
          Skiarena
        </span>
      </span>
    </Link>
  );
}
