import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  id?: string;
  children: ReactNode;
  /** Vizuális háttér. `alpine` = halvány jeges felület, `deep` = mélykék blokk. */
  tone?: 'default' | 'alpine' | 'deep' | 'white';
  spacing?: 'sm' | 'md' | 'lg';
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
}

const spacingClasses = {
  sm: 'py-10 sm:py-12',
  md: 'py-12 sm:py-16 lg:py-20',
  lg: 'py-16 sm:py-20 lg:py-28',
};

const toneClasses = {
  default: 'bg-frost',
  white: 'bg-white',
  alpine: 'alpine-surface',
  deep: 'deep-surface text-white',
};

export function Section({
  id,
  children,
  tone = 'default',
  spacing = 'md',
  as: Tag = 'section',
  className,
  containerClassName,
  labelledBy,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(toneClasses[tone], spacingClasses[spacing], className)}
    >
      <div className={cn('container-page', containerClassName)}>{children}</div>
    </Tag>
  );
}
