import { cn } from '@/lib/cn';
import type { OperationalStatus } from '@/types';

export const statusLabels: Record<OperationalStatus, string> = {
  open: 'Üzemel',
  closed: 'Áll',
  maintenance: 'Karbantartás',
  preparing: 'Előkészítés alatt',
};

export const resortStatusLabels: Record<OperationalStatus, string> = {
  open: 'Nyitva',
  closed: 'Zárva',
  maintenance: 'Karbantartás',
  preparing: 'Előkészítés alatt',
};

const styles: Record<OperationalStatus, string> = {
  open: 'bg-status-openBg text-status-open border-status-open/25',
  closed: 'bg-status-closedBg text-status-closed border-status-closed/25',
  maintenance: 'bg-status-warnBg text-status-warn border-status-warn/25',
  preparing: 'bg-status-neutralBg text-status-neutral border-status-neutral/25',
};

const dotStyles: Record<OperationalStatus, string> = {
  open: 'bg-status-open',
  closed: 'bg-status-closed',
  maintenance: 'bg-status-warn',
  preparing: 'bg-status-neutral',
};

interface StatusBadgeProps {
  status: OperationalStatus;
  label?: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'resort';
  pulse?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  label,
  size = 'sm',
  variant = 'default',
  pulse = false,
  className,
}: StatusBadgeProps) {
  const text = label ?? (variant === 'resort' ? resortStatusLabels[status] : statusLabels[status]);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border font-semibold',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        styles[status],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotStyles[status], pulse && 'animate-pulse-dot')}
      />
      {text}
    </span>
  );
}
