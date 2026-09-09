import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  href?: string;
  as?: 'div' | 'article' | 'li';
}

export function Card({ children, className, interactive, href, as: Tag = 'div' }: CardProps) {
  const classes = cn(
    'rounded-card border border-deep-100 bg-white shadow-subtle transition-all duration-200 ease-smooth',
    interactive && 'hover:-translate-y-0.5 hover:border-deep-200 hover:shadow-lift',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'block focus-visible:ring-2 focus-visible:ring-glacier-500')}>
        {children}
      </Link>
    );
  }

  return <Tag className={classes}>{children}</Tag>;
}
