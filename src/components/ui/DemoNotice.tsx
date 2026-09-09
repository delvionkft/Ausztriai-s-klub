import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';
import { DEMO_DATA_ENABLED, DEMO_NOTICE } from '@/data/placeholders';

/**
 * Láthatóan jelzi, hogy az adott blokk demó adattal működik.
 * Kikapcsolása: `DEMO_DATA_ENABLED = false` a `src/data/placeholders.ts`-ben.
 */
export function DemoNotice({ message, className }: { message?: string; className?: string }) {
  if (!DEMO_DATA_ENABLED) return null;

  return (
    <p
      className={cn(
        'flex items-start gap-2 rounded-lg border border-ice-300 bg-ice-100 px-3 py-2 text-[0.8rem] leading-snug text-deep-700',
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-glacier-600" />
      <span>{message ?? DEMO_NOTICE}</span>
    </p>
  );
}
