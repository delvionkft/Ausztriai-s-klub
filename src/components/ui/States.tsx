import type { ReactNode } from 'react';
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SecondaryButton } from './Button';

/* -------------------------------- Betöltés -------------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} aria-hidden="true" />;
}

export function LoadingBlock({ label = 'Adatok betöltése…', rows = 3 }: { label?: string; rows?: number }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={cn('h-14 w-full', i === 0 && 'h-16')} />
      ))}
    </div>
  );
}

/* ------------------------------- Üres állapot ------------------------------ */

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-deep-200 bg-white/60 px-6 py-12 text-center',
        className,
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-deep-50 text-deep-500">
        {icon ?? <Inbox aria-hidden="true" className="h-5 w-5" />}
      </span>
      <p className="font-semibold text-deep-800">{title}</p>
      {description ? <p className="max-w-sm text-sm text-deep-600">{description}</p> : null}
      {action}
    </div>
  );
}

/* ------------------------------ Hibaállapot ------------------------------- */

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Nem sikerült betölteni az adatokat',
  description = 'Ellenőrizd a kapcsolatot, majd próbáld újra.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-card border border-status-closed/25 bg-status-closedBg px-6 py-10 text-center',
        className,
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-status-closed">
        <AlertTriangle aria-hidden="true" className="h-5 w-5" />
      </span>
      <p className="font-semibold text-status-closed">{title}</p>
      <p className="max-w-sm text-sm text-deep-700">{description}</p>
      {onRetry ? (
        <SecondaryButton size="sm" onClick={onRetry} icon={<RefreshCw aria-hidden="true" className="h-4 w-4" />}>
          Újrapróbálom
        </SecondaryButton>
      ) : null}
    </div>
  );
}
