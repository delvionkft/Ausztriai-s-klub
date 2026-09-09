import { cn } from '@/lib/cn';

/**
 * SZEKCIÓCÍM
 * ----------------------------------------------------------------------------
 * Egységes kicker + címsor + bevezető hármas. A `level` a helyes H2/H3
 * hierarchia miatt állítható.
 */
export function SectionHeading({
  kicker, title, lead, align = 'left', invert = false, level = 2, className, id,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  invert?: boolean;
  level?: 2 | 3;
  className?: string;
  id?: string;
}) {
  const Tag = level === 2 ? 'h2' : 'h3';

  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {kicker ? (
        <p className={cn(
          'mb-3 text-[0.8125rem] font-bold uppercase tracking-[0.14em]',
          invert ? 'text-glacier-300' : 'text-glacier-600',
        )}>
          {kicker}
        </p>
      ) : null}
      <Tag id={id} className={cn(level === 2 ? 'text-h2' : 'text-h3', invert && 'text-white')}>
        {title}
      </Tag>
      {lead ? (
        <p className={cn('mt-4 text-lead', invert ? 'text-frost-200' : 'text-night-600')}>{lead}</p>
      ) : null}
    </div>
  );
}
