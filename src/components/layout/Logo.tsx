import Link from 'next/link';
import { displayNameLong } from '@/data/site.config';
import { routes } from '@/data/navigation';
import { cn } from '@/lib/cn';

/**
 * LOGÓ — amíg nincs végleges logó, tipográfiai jel + hegymotívum.
 * Csere: tedd a fájlt a `public/` mappába, és cseréld az SVG-t <Image>-re.
 */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link
      href={routes.home}
      className={cn('group inline-flex items-center gap-2.5 rounded-lg', className)}
      aria-label={`${displayNameLong} — kezdőlap`}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors',
          tone === 'dark' ? 'bg-deep-800 text-white' : 'bg-white/15 text-white ring-1 ring-white/25',
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M3 19h18L14.5 6.5 11 13l-2-3z" fill="currentColor" opacity="0.9" />
          <path d="M14.5 6.5 12.2 11h4.6z" fill="#fff" opacity="0.85" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[0.95rem] font-bold tracking-tight',
            tone === 'dark' ? 'text-deep-900' : 'text-white',
          )}
        >
          {displayNameLong}
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em]',
            tone === 'dark' ? 'text-glacier-600' : 'text-glacier-200',
          )}
        >
          Sí &amp; szállás
        </span>
      </span>
    </Link>
  );
}
