'use client';

import { useI18n } from '@/i18n/LocaleProvider';
import { useLiveTimestamp } from '@/hooks/useLiveTimestamp';
import { formatDateTime, formatTimeOnly } from '@/lib/date';

/**
 * „Utolsó frissítés" megjelenítés.
 * Hidratálásbiztos: a szerveroldali és az első böngészőoldali render azonos,
 * a valós idő csak utána frissül (lásd `useLiveTimestamp`).
 */
export function UpdatedAt({
  iso, minutesAgo = null, format = 'time',
}: {
  iso: string;
  /** Ha meg van adva, a böngészőben ennyi perccel ezelőttire frissül. */
  minutesAgo?: number | null;
  format?: 'time' | 'datetime';
}) {
  const { locale } = useI18n();
  const live = useLiveTimestamp(iso, minutesAgo);
  return <time dateTime={live}>{format === 'time' ? formatTimeOnly(live, locale) : formatDateTime(live, locale)}</time>;
}
