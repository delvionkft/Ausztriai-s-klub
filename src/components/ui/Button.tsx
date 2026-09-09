import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Size = 'sm' | 'md' | 'lg';

const sizeClasses: Record<Size, string> = {
  // Minimum 44px érintőfelület mobilon (kesztyűs használat).
  sm: 'min-h-[40px] px-3.5 text-sm gap-1.5',
  md: 'min-h-[46px] px-5 text-[0.95rem] gap-2',
  lg: 'min-h-[54px] px-6 text-base gap-2.5',
};

const baseClasses =
  'inline-flex items-center justify-center rounded-pill font-semibold transition-all duration-200 ease-smooth ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none';

interface CommonProps {
  size?: Size;
  /**
   * `onDark` = sötét háttéren (hero, mélykék blokk) használt világos változat.
   * Mindig ezt használd className-felülírás helyett: a Tailwind osztályok
   * sorrendje nem garantált, ezért a `className`-ből érkező szín- és
   * háttérosztályok nem megbízhatóan írják felül az alapváltozatot.
   */
  variant?: 'default' | 'onDark';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

function Content({ icon, iconRight, loading, children }: Pick<CommonProps, 'icon' | 'iconRight' | 'loading' | 'children'>) {
  return (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon
      )}
      <span>{children}</span>
      {!loading && iconRight}
    </>
  );
}

/* ------------------------------ Elsődleges CTA ----------------------------- */

type PrimaryProps = CommonProps &
  ({ href: string; onClick?: never } | ({ href?: undefined } & ComponentPropsWithoutRef<'button'>));

export function PrimaryButton({
  size = 'md',
  variant = 'default',
  fullWidth,
  icon,
  iconRight,
  loading,
  children,
  className,
  ...rest
}: PrimaryProps) {
  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variant === 'onDark'
      ? 'bg-white text-deep-900 shadow-card ring-white/70 hover:bg-ice-100 hover:shadow-lift'
      : 'bg-deep-800 text-white shadow-card ring-deep-500 hover:bg-deep-700 hover:shadow-lift',
    'active:translate-y-px',
    fullWidth && 'w-full',
    className,
  );

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as { href: string };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        <Content icon={icon} iconRight={iconRight} loading={loading}>
          {children}
        </Content>
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<'button'>;
  return (
    <button type="button" className={classes} disabled={loading || buttonRest.disabled} {...buttonRest}>
      <Content icon={icon} iconRight={iconRight} loading={loading}>
        {children}
      </Content>
    </button>
  );
}

/* ----------------------------- Másodlagos CTA ----------------------------- */

type SecondaryProps = PrimaryProps & { tone?: 'light' | 'dark' };


export function SecondaryButton({
  size = 'md',
  variant = 'default',
  fullWidth,
  icon,
  iconRight,
  loading,
  children,
  className,
  tone,
  ...rest
}: SecondaryProps) {
  // A `variant="onDark"` és a `tone="dark"` ugyanazt jelenti — így a három
  // gombkomponens API-ja egységes marad.
  const resolvedTone = tone ?? (variant === 'onDark' ? 'dark' : 'light');
  const classes = cn(
    baseClasses,
    sizeClasses[size],
    resolvedTone === 'light'
      ? 'border border-deep-200 bg-white text-deep-800 ring-deep-400 hover:border-deep-300 hover:bg-deep-50'
      : 'border border-white/35 bg-white/10 text-white ring-white/60 backdrop-blur-sm hover:bg-white/20',
    'active:translate-y-px',
    fullWidth && 'w-full',
    className,
  );

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as { href: string };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        <Content icon={icon} iconRight={iconRight} loading={loading}>
          {children}
        </Content>
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<'button'>;
  return (
    <button type="button" className={classes} disabled={loading || buttonRest.disabled} {...buttonRest}>
      <Content icon={icon} iconRight={iconRight} loading={loading}>
        {children}
      </Content>
    </button>
  );
}

/* ------------------------------- Akcentus CTA ------------------------------ */

export function AccentButton({
  size = 'md',
  variant = 'default',
  fullWidth,
  icon,
  iconRight,
  loading,
  children,
  className,
  ...rest
}: PrimaryProps) {
  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variant === 'onDark'
      ? 'bg-white text-glacier-700 shadow-card ring-white/70 hover:bg-glacier-50 hover:shadow-lift'
      : 'bg-glacier-600 text-white shadow-card ring-glacier-500 hover:bg-glacier-700 hover:shadow-lift',
    'active:translate-y-px',
    fullWidth && 'w-full',
    className,
  );

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as { href: string };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        <Content icon={icon} iconRight={iconRight} loading={loading}>
          {children}
        </Content>
      </Link>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<'button'>;
  return (
    <button type="button" className={classes} disabled={loading || buttonRest.disabled} {...buttonRest}>
      <Content icon={icon} iconRight={iconRight} loading={loading}>
        {children}
      </Content>
    </button>
  );
}
