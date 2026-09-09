'use client';

import { AlertTriangle, Loader2, SearchX } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';
import { Button } from './Button';

/** Betöltési állapot — tartalomhoz igazított csontváz. */
export function LoadingState({ label, className, rows = 3 }: { label?: string; className?: string; rows?: number }) {
  const { t } = useI18n();
  return (
    <div className={cn('space-y-3', className)} role="status" aria-live="polite">
      <span className="sr-only">{label ?? t.common.loading}</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-16 rounded-card" />
      ))}
    </div>
  );
}

export function InlineSpinner({ label }: { label?: string }) {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center gap-2 text-sm text-night-600">
      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
      {label ?? t.common.loading}
    </span>
  );
}

/** Hibaállapot újrapróbálkozási lehetőséggel. */
export function ErrorState({
  title, text, onRetry, className,
}: { title?: string; text?: string; onRetry?: () => void; className?: string }) {
  const { t } = useI18n();
  return (
    <div className={cn('rounded-card border border-state-closed/25 bg-state-closedBg p-6 text-center', className)} role="alert">
      <AlertTriangle aria-hidden="true" className="mx-auto h-8 w-8 text-state-closedInk" />
      <h3 className="mt-3 text-base font-bold text-state-closedInk">{title ?? t.errors.genericTitle}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-night-700">{text ?? t.errors.genericText}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>
          {t.errors.retry}
        </Button>
      ) : null}
    </div>
  );
}

/** Üres állapot — szűrés után, ha nincs találat. */
export function EmptyState({
  title, text, action, className,
}: { title?: string; text?: string; action?: React.ReactNode; className?: string }) {
  const { t } = useI18n();
  return (
    <div className={cn('rounded-card border border-dashed border-night-200 bg-frost-100 p-10 text-center', className)}>
      <SearchX aria-hidden="true" className="mx-auto h-9 w-9 text-night-400" />
      <h3 className="mt-3 text-base font-bold text-night-900">{title ?? t.errors.emptyTitle}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-night-600">{text ?? t.errors.emptyText}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
