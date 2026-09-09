'use client';

import { useEffect } from 'react';

/** Megnyitott menü / lightbox alatt a háttér ne görgethessen. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
