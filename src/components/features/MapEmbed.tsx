'use client';

import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { contactInfo, fullAddress, parkingInfo } from '@/data/contact';
import { track } from '@/lib/analytics';
import { ButtonLink } from '@/components/ui/Button';

/**
 * TÉRKÉP BEÁGYAZÁS
 * ----------------------------------------------------------------------------
 * Alapértelmezetten OpenStreetMap beágyazás (nem igényel API-kulcsot).
 * Google Maps-hez: `.env` -> NEXT_PUBLIC_MAPS_EMBED_URL, vagy írd át a
 * `src/data/contact.ts` `mapEmbedUrl` mezőjét.
 */
export function MapEmbed({ compact = false }: { compact?: boolean }) {
  const { t, L } = useI18n();

  return (
    <div className="overflow-hidden rounded-panel border border-night-100 bg-white shadow-subtle">
      <div className={compact ? 'aspect-[16/10]' : 'aspect-[16/9]'}>
        <iframe
          src={contactInfo.mapEmbedUrl}
          title={`${t.contact.directionsTitle} — ${fullAddress}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start gap-2.5">
          <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-glacier-600" />
          <div>
            <p className="font-semibold text-night-950">{fullAddress}</p>
            <p className="mt-0.5 text-[0.8125rem] text-night-500">
              {t.contact.coordinates}: {contactInfo.coordinates.lat}, {contactInfo.coordinates.lng}
            </p>
          </div>
        </div>

        {!compact ? (
          <p className="text-[0.9375rem] leading-relaxed text-night-600">{L(parkingInfo)}</p>
        ) : null}

        <ButtonLink
          href={contactInfo.directionsUrl}
          variant="secondary"
          fullWidth
          external
          onClick={() => track('open_directions', { source: 'map-embed' })}
        >
          <Navigation aria-hidden="true" className="h-4 w-4" />
          {t.cta.planRoute}
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />
        </ButtonLink>
      </div>
    </div>
  );
}
