'use client';

import { useI18n } from '@/i18n/I18nProvider';

/**
 * NYELVVÁLASZTÓ HOOK
 * Vékony burkolat az `I18nProvider` fölött — a korábbi hívási felület
 * (`{ locale, setLocale, ready }`) változatlan, kiegészítve a `t()` fordítóval.
 */
export function useLocale() {
  return useI18n();
}
