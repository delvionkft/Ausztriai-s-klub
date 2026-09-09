import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * GOMBOK
 * ----------------------------------------------------------------------------
 * Minden gomb legalább 44 pixel magas (kesztyűs használat), és jól elkülönülő
 * elsődleges / másodlagos / halvány változatban létezik.
 */
type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-sky-400 text-night-950 shadow-glow hover:bg-glacier-300 hover:shadow-lift active:bg-glacier-400',
  secondary:
    'border border-night-200 bg-white text-night-900 hover:border-glacier-400 hover:bg-frost-100 hover:text-night-950',
  ghost:
    'text-night-700 hover:bg-night-50 hover:text-night-950',
  onDark:
    'border border-white/35 bg-white/10 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/20',
  danger:
    'bg-state-closed text-white hover:bg-state-closedInk',
};

const SIZES: Record<Size, string> = {
  sm: 'h-11 px-4 text-sm',
  md: 'h-12 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold tracking-tight transition-all duration-200 ease-smooth disabled:cursor-not-allowed disabled:opacity-55 tap-target';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function ButtonLink({
  href, variant = 'primary', size = 'md', className, children, fullWidth, external, onClick, ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className);

  if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary', size = 'md', className, children, fullWidth, type = 'button', ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
