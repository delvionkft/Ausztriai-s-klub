'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';

/**
 * Görgetés közben megjelenő tartalom. Visszafogott: 16 pixel elmozdulás és
 * egy halványodás. `prefers-reduced-motion` esetén azonnal látható.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  /** Késleltetés ezredmásodpercben — listáknál lépcsőzetes megjelenéshez. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(shown ? 'reveal-shown' : 'reveal-hidden', className)}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
