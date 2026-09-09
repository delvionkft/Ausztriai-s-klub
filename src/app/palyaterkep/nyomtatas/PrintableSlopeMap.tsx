'use client';

import { useI18n } from '@/i18n/LocaleProvider';
import { lifts } from '@/data/lifts';
import { mountainPois, slopes } from '@/data/slopes';
import { resortInfo } from '@/data/site.config';
import { contactInfo, fullAddress } from '@/data/contact';
import { slopeTotals, liftTotals } from '@/data/derived';
import { formatLength } from '@/lib/format';
import { useDifficultyLabel } from '@/components/features/SlopeList';
import { useLiftStatusLabel } from '@/components/features/LiftCard';

const STROKE: Record<string, string> = {
  blue: '#2563EB', red: '#DC2626', black: '#111827', skiroute: '#F97316',
};

/** Nyomtatásra és PDF-exportra optimalizált, önálló pályatérkép-nézet. */
export function PrintableSlopeMap() {
  const { t, L, locale } = useI18n();
  const difficultyLabel = useDifficultyLabel();
  const liftStatus = useLiftStatusLabel();
  const huts = mountainPois.filter((p) => p.kind === 'restaurant' || p.kind === 'hut');

  return (
    <div className="mx-auto max-w-[1120px] bg-white px-8 py-8 text-night-900 print:px-0 print:py-0">
      <header className="mb-6 flex items-end justify-between gap-6 border-b-2 border-night-950 pb-4">
        <div>
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-glacier-600">Pályatérkép</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold">{resortInfo.name}</h1>
          <p className="mt-1 text-sm text-night-600">
            {resortInfo.altitudeValleyM}–{resortInfo.altitudePeakM} m · {slopeTotals.totalKm} km pálya ·
            {' '}{liftTotals.count} felvonó · {slopeTotals.snowmakingPercent}% hóágyúzott
          </p>
        </div>
        <div className="text-right text-[0.75rem] leading-relaxed text-night-600">
          <p className="font-semibold text-night-900">{fullAddress}</p>
          <p>{contactInfo.phone}</p>
          <p>{contactInfo.email}</p>
          <p className="mt-1 font-semibold text-state-closedInk">Segélyhívó: 112 · Hegyi mentők: 140</p>
        </div>
      </header>

      <svg viewBox="0 0 1200 800" className="w-full" role="img" aria-label="Pályatérkép">
        <defs>
          <linearGradient id="p-snow" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#DCEFFC" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="#F8FBFF" stroke="#C2D3E7" />
        <path d="M0 300 L150 190 L280 250 L420 130 L560 220 L700 110 L840 210 L980 140 L1120 240 L1200 190 L1200 800 L0 800 Z" fill="#E1EAF4" />
        <path d="M0 380 L140 270 L300 340 L450 190 L600 100 L760 200 L900 150 L1050 260 L1200 210 L1200 800 L0 800 Z" fill="url(#p-snow)" stroke="#95B2D2" strokeWidth="1.5" />

        {slopes.map((slope) => (
          <g key={slope.id}>
            <path d={slope.path} stroke="#FFFFFF" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path
              d={slope.path}
              stroke={STROKE[slope.difficulty]}
              strokeWidth="4.5"
              strokeDasharray={slope.difficulty === 'skiroute' ? '14 10' : undefined}
              fill="none"
              strokeLinecap="round"
            />
            <g transform={`translate(${slope.labelAt.x} ${slope.labelAt.y})`}>
              <circle r="12" fill="#FFFFFF" stroke={STROKE[slope.difficulty]} strokeWidth="2.5" />
              <text textAnchor="middle" dy="4.5" fontSize="12" fontWeight="700" fill="#07111F">{slope.number}</text>
            </g>
          </g>
        ))}

        {lifts.map((lift) => (
          <g key={lift.id}>
            <path d={lift.path} stroke="#07111F" strokeWidth="3" fill="none" strokeLinecap="round" />
            <g transform={`translate(${lift.labelAt.x} ${lift.labelAt.y})`}>
              <rect x="-10" y="-10" width="20" height="20" rx="5" fill="#07111F" />
              <circle r="3" fill="#FFFFFF" />
            </g>
          </g>
        ))}

        {huts.map((poi) => (
          <g key={poi.id} transform={`translate(${poi.at.x} ${poi.at.y})`}>
            <circle r="12" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M-4 -5 v10 M-1.5 -5 v10 M4 -5 c0 3 -2 3 -2 5 v5" stroke="#07111F" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        ))}
      </svg>

      <div className="mt-6 flex flex-wrap gap-5 border-y border-night-200 py-3 text-[0.8125rem] font-semibold">
        {(['blue', 'red', 'black', 'skiroute'] as const).map((d) => (
          <span key={d} className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: STROKE[d] }} />
            {difficultyLabel(d)}
          </span>
        ))}
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-night-950" /> Felvonó
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-state-warn" /> Étterem és hütte
        </span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-base font-extrabold uppercase tracking-wide">Pályák</h2>
          <table className="mt-2 w-full text-left text-[0.75rem]">
            <thead>
              <tr className="border-b border-night-300 text-night-500">
                <th className="py-1 pr-2 font-bold">#</th>
                <th className="py-1 pr-2 font-bold">Név</th>
                <th className="py-1 pr-2 font-bold">Nehézség</th>
                <th className="py-1 text-right font-bold">Hossz</th>
              </tr>
            </thead>
            <tbody>
              {slopes.map((slope) => (
                <tr key={slope.id} className="border-b border-night-100">
                  <td className="py-1 pr-2 font-bold">{slope.number}</td>
                  <td className="py-1 pr-2">{slope.name}</td>
                  <td className="py-1 pr-2">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: STROKE[slope.difficulty] }} />
                      {difficultyLabel(slope.difficulty, true)}
                    </span>
                  </td>
                  <td className="py-1 text-right tabular-nums">{formatLength(slope.lengthM, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="font-display text-base font-extrabold uppercase tracking-wide">Felvonók</h2>
          <table className="mt-2 w-full text-left text-[0.75rem]">
            <thead>
              <tr className="border-b border-night-300 text-night-500">
                <th className="py-1 pr-2 font-bold">Név</th>
                <th className="py-1 pr-2 font-bold">Típus</th>
                <th className="py-1 pr-2 font-bold">Üzemidő</th>
                <th className="py-1 font-bold">Állapot</th>
              </tr>
            </thead>
            <tbody>
              {lifts.map((lift) => (
                <tr key={lift.id} className="border-b border-night-100">
                  <td className="py-1 pr-2 font-semibold">{lift.name}</td>
                  <td className="py-1 pr-2">{t.liftType[lift.type]}</td>
                  <td className="py-1 pr-2 tabular-nums">{lift.operatingHours}</td>
                  <td className="py-1">{liftStatus(lift.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="mt-6 font-display text-base font-extrabold uppercase tracking-wide">Éttermek és hütték</h2>
          <ul className="mt-2 space-y-1 text-[0.75rem]">
            {huts.map((poi) => (
              <li key={poi.id} className="border-b border-night-100 py-1">
                <span className="font-semibold">{poi.name}</span>
                {poi.openingHours ? <span className="text-night-500"> · {poi.openingHours}</span> : null}
                <span className="block text-night-500">{L(poi.description)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 border-t border-night-200 pt-3 text-[0.6875rem] leading-relaxed text-night-500">
        A pályák és felvonók állapota naponta változik — indulás előtt nézd meg az aktuális hójelentést a
        weboldalon. A jelzett lezárásokon túl a mentés nem garantálható. Sisak viselése 15 év alatt kötelező.
      </p>
    </div>
  );
}
