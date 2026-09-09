import {
  CheckCircle2, CircleSlash, Snowflake, Wrench, XCircle, Clock, AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * STÁTUSZJELZÉS
 * ----------------------------------------------------------------------------
 * Akadálymentesség: a státuszt SOHA nem csak szín jelzi — ikon és szöveg is
 * kíséri, így színtévesztéssel és fekete-fehér nyomtatásban is olvasható.
 */
export type BadgeTone = 'open' | 'closed' | 'warn' | 'idle' | 'info';

const TONES: Record<BadgeTone, { light: string; dark: string; Icon: typeof CheckCircle2 }> = {
  open: {
    light: 'bg-state-openBg text-state-openInk border-state-open/25',
    dark: 'bg-state-open/15 text-state-open border-state-open/35',
    Icon: CheckCircle2,
  },
  closed: {
    light: 'bg-state-closedBg text-state-closedInk border-state-closed/25',
    dark: 'bg-state-closed/15 text-state-closed border-state-closed/35',
    Icon: XCircle,
  },
  warn: {
    light: 'bg-state-warnBg text-state-warnInk border-state-warn/30',
    dark: 'bg-state-warn/15 text-state-warn border-state-warn/35',
    Icon: AlertTriangle,
  },
  idle: {
    light: 'bg-state-idleBg text-state-idleInk border-state-idle/25',
    dark: 'bg-white/10 text-frost-200 border-white/20',
    Icon: CircleSlash,
  },
  info: {
    light: 'bg-frost-200 text-glacier-700 border-glacier-400/30',
    dark: 'bg-glacier-400/15 text-glacier-300 border-glacier-400/35',
    Icon: Snowflake,
  },
};

const ICON_OVERRIDES = { wrench: Wrench, clock: Clock } as const;

export function StatusBadge({
  tone, label, icon, invert = false, size = 'md', className,
}: {
  tone: BadgeTone;
  label: string;
  icon?: keyof typeof ICON_OVERRIDES;
  invert?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const conf = TONES[tone];
  const Icon = icon ? ICON_OVERRIDES[icon] : conf.Icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border font-semibold',
        size === 'sm' ? 'px-2.5 py-1 text-[0.75rem]' : 'px-3 py-1.5 text-[0.8125rem]',
        invert ? conf.dark : conf.light,
        className,
      )}
    >
      <Icon aria-hidden="true" className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {label}
    </span>
  );
}

/** Nehézségi jelölés — nemzetközi szín + szöveg. */
export function DifficultyBadge({
  difficulty, label, size = 'md',
}: {
  difficulty: 'blue' | 'red' | 'black' | 'skiroute';
  label: string;
  size?: 'sm' | 'md';
}) {
  const dot =
    difficulty === 'blue' ? 'bg-piste-blue'
      : difficulty === 'red' ? 'bg-piste-red'
        : difficulty === 'black' ? 'bg-piste-black'
          : 'bg-piste-skiroute';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border border-night-200 bg-white font-semibold text-night-800',
        size === 'sm' ? 'px-2.5 py-1 text-[0.75rem]' : 'px-3 py-1.5 text-[0.8125rem]',
      )}
    >
      <span aria-hidden="true" className={cn('h-2.5 w-2.5 rounded-full', dot)} />
      {label}
    </span>
  );
}
