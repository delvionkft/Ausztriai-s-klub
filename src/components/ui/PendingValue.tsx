import { cn } from '@/lib/cn';
import { PLACEHOLDER_HINT, PLACEHOLDER_VALUE } from '@/data/placeholders';

/**
 * Egységes helyőrző-megjelenítés.
 * Ha az érték `null`, jól látható, de nem zavaró jelzést ad — nem üres helyet.
 */
interface PendingValueProps {
  value: string | number | null | undefined;
  suffix?: string;
  className?: string;
  hint?: string;
}

export function PendingValue({ value, suffix = '', className, hint = PLACEHOLDER_HINT }: PendingValueProps) {
  const isPending = value === null || value === undefined || value === '';

  if (isPending) {
    return (
      <span
        title={hint}
        className={cn(
          'inline-flex items-baseline gap-1 text-deep-500',
          className,
        )}
      >
        <span aria-hidden="true">{PLACEHOLDER_VALUE}</span>
        <span className="sr-only">{hint}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  );
}
