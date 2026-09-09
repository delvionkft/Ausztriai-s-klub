import { cn } from '@/lib/cn';

/**
 * SZEKCIÓ-KERET
 * ----------------------------------------------------------------------------
 * A világos és sötét felületek váltakozását egyetlen helyen szabályozzuk, hogy
 * az oldalak ritmusa végig egységes maradjon.
 */
type Tone = 'white' | 'frost' | 'night' | 'slate' | 'transparent';

const TONES: Record<Tone, string> = {
  white: 'bg-white text-night-900',
  frost: 'surface-frost text-night-900',
  night: 'surface-night text-frost-100',
  slate: 'surface-slate text-frost-100',
  transparent: '',
};

export function Section({
  children, tone = 'white', className, id, size = 'md', wide = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  wide?: boolean;
}) {
  const padding = size === 'sm' ? 'py-12 lg:py-16' : size === 'lg' ? 'py-20 lg:py-32' : 'py-16 lg:py-24';

  return (
    <section id={id} className={cn('relative', TONES[tone], padding, className)}>
      <div className={wide ? 'container-wide' : 'container-page'}>{children}</div>
    </section>
  );
}

/** Hegyvonulat-motívum két szekció határán. */
export function RidgeDivider({ tone = 'white', flip = false }: { tone?: 'white' | 'frost' | 'night'; flip?: boolean }) {
  const fill = tone === 'night' ? '#07111F' : tone === 'frost' ? '#F8FBFF' : '#FFFFFF';
  return (
    <div aria-hidden="true" className={cn('pointer-events-none relative -mt-px h-10 w-full overflow-hidden lg:h-16', flip && 'rotate-180')}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="h-full w-full">
        <path d="M0 80 L120 34 L240 62 L360 18 L480 56 L600 26 L720 62 L840 30 L960 58 L1080 24 L1200 60 L1200 80 Z" fill={fill} />
      </svg>
    </div>
  );
}
