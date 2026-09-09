import Link from 'next/link';
import { cn } from '@/lib/cn';

/** Alapkártya — enyhén lekerekített, visszafogott árnyékkal. */
export function Card({
  children, className, tone = 'light', interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark' | 'glass';
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-card',
        tone === 'light' && 'border border-night-100 bg-white shadow-subtle',
        tone === 'dark' && 'border border-white/10 bg-white/[0.06] shadow-ring',
        tone === 'glass' && 'glass',
        interactive && 'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Teljes felületén kattintható kártya.
 * A látható link a címsorban van, a kiterjesztett kattintófelületet egy
 * pozicionált pszeudo-elem adja — így a képernyőolvasó egyetlen linket lát.
 */
export function CardLink({
  href, children, className, tone = 'light', onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark' | 'glass';
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative block overflow-hidden rounded-card transition-all duration-300 ease-smooth hover:-translate-y-1 focus-visible:-translate-y-1',
        tone === 'light' && 'border border-night-100 bg-white shadow-subtle hover:border-glacier-200 hover:shadow-lift',
        tone === 'dark' && 'border border-white/10 bg-white/[0.06] hover:border-glacier-400/50 hover:bg-white/[0.1]',
        tone === 'glass' && 'glass hover:bg-white/20',
        className,
      )}
    >
      {children}
    </Link>
  );
}
