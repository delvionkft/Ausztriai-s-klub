import { MapPin } from 'lucide-react';
import { contactInfo } from '@/data/contact';
import { PLACEHOLDER_MEDIA } from '@/data/placeholders';
import { cn } from '@/lib/cn';

/**
 * BEÁGYAZOTT TÉRKÉP
 * INTEGRÁCIÓ: töltsd ki a `contactInfo.mapEmbedUrl` mezőt
 * (`src/data/contact.ts`) egy Google Maps / OpenStreetMap embed URL-lel.
 * Amíg üres, kulturált helyőrző jelenik meg — nem törött iframe.
 */
export function MapEmbed({ className, title = 'Térkép' }: { className?: string; title?: string }) {
  if (contactInfo.mapEmbedUrl) {
    return (
      <div className={cn('overflow-hidden rounded-panel border border-deep-100', className)}>
        <iframe
          src={contactInfo.mapEmbedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[300px] w-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-panel border border-dashed border-deep-200 bg-ice-50',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 600 340" className="absolute inset-0 h-full w-full opacity-45">
        <rect width="600" height="340" fill="#EAF4FB" />
        <g stroke="#B6D8EF" strokeWidth="1.5" fill="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="340" />
          ))}
        </g>
        <path d="M0 250 Q150 200 300 235 T600 190" stroke="#8FC1E3" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M120 340 Q180 220 260 160 T420 60" stroke="#D5E9F6" strokeWidth="14" fill="none" strokeLinecap="round" />
      </svg>

      <div className="relative flex flex-col items-center gap-2 rounded-card bg-white/90 px-5 py-4 text-center shadow-subtle backdrop-blur-sm">
        <MapPin aria-hidden="true" className="h-5 w-5 text-glacier-600" />
        <p className="text-sm font-semibold text-deep-900">{PLACEHOLDER_MEDIA.map ?? 'Térkép helye'}</p>
        <p className="max-w-xs text-xs text-deep-600">
          A beágyazott térkép a pontos cím és a térkép-URL megadása után jelenik meg.
        </p>
      </div>
    </div>
  );
}
