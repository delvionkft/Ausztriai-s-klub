'use client';

import { useMemo, useState } from 'react';
import { Download, Layers, Map as MapIcon, Minus, Plus, RotateCcw, WifiOff } from 'lucide-react';
import { difficultyColors, difficultyLabels, slopes } from '@/data/slopes';
import { liftTypeLabels, lifts } from '@/data/lifts';
import { PLACEHOLDER_MEDIA } from '@/data/placeholders';
import { formatLength, formatNumber } from '@/lib/format';
import { cn } from '@/lib/cn';
import { PendingValue } from '@/components/ui/PendingValue';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SecondaryButton } from '@/components/ui/Button';
import type { Lift, Slope, SlopeDifficulty } from '@/types';

/**
 * INTERAKTÍV PÁLYATÉRKÉP (drótváz 03/02–05)
 * ----------------------------------------------------------------------------
 * FONTOS: ez SEMATIKUS ÁBRA, nem valós domborzati térkép. Valós pályanyomvonalat
 * nem találunk ki. Amint megérkezik a végleges térkép (SVG vagy nagy felbontású
 * kép), a `src/data/media.ts` → `slope-map` bejegyzésébe kell beírni, és a
 * `MapCanvas` tartalma cserélhető — a rétegvezérlő és az infópanel marad.
 */

type LayerId = 'difficulty' | 'lifts' | 'snowmaking' | 'restaurants' | 'closures';

const layerConfig: Array<{ id: LayerId; label: string }> = [
  { id: 'difficulty', label: 'Nehézség' },
  { id: 'lifts', label: 'Felvonók' },
  { id: 'snowmaking', label: 'Hóágyúzott' },
  { id: 'restaurants', label: 'Éttermek' },
  { id: 'closures', label: 'Zárások' },
];

/** Sematikus elrendezés — geometriai pozíciók, nem földrajzi koordináták. */
const slopeGeometry: Record<string, { x: number; y: number }[]> = {
  'slope-1': [{ x: 150, y: 90 }, { x: 140, y: 200 }, { x: 165, y: 320 }, { x: 150, y: 430 }],
  'slope-2': [{ x: 250, y: 140 }, { x: 262, y: 250 }, { x: 240, y: 360 }, { x: 255, y: 430 }],
  'slope-3': [{ x: 360, y: 70 }, { x: 380, y: 190 }, { x: 350, y: 300 }, { x: 365, y: 430 }],
  'slope-4': [{ x: 470, y: 60 }, { x: 455, y: 180 }, { x: 480, y: 300 }, { x: 465, y: 430 }],
  'slope-5': [{ x: 575, y: 70 }, { x: 595, y: 190 }, { x: 565, y: 310 }, { x: 580, y: 430 }],
  'slope-6': [{ x: 680, y: 110 }, { x: 665, y: 230 }, { x: 690, y: 340 }, { x: 675, y: 430 }],
  'slope-7': [{ x: 780, y: 150 }, { x: 800, y: 260 }, { x: 770, y: 350 }, { x: 785, y: 430 }],
  'slope-8': [{ x: 875, y: 300 }, { x: 885, y: 370 }, { x: 870, y: 430 }],
  'slope-9': [{ x: 945, y: 350 }, { x: 950, y: 430 }],
  'slope-10': [{ x: 60, y: 120 }, { x: 45, y: 260 }, { x: 70, y: 430 }],
  'slope-11': [{ x: 1030, y: 250 }, { x: 1045, y: 340 }, { x: 1025, y: 430 }],
};

const liftGeometry: Record<string, { x1: number; y1: number; x2: number; y2: number }> = {
  'lift-a': { x1: 200, y1: 455, x2: 205, y2: 95 },
  'lift-b': { x1: 415, y1: 455, x2: 420, y2: 70 },
  'lift-c': { x1: 630, y1: 455, x2: 628, y2: 65 },
  'lift-d': { x1: 830, y1: 455, x2: 828, y2: 155 },
  'lift-e': { x1: 910, y1: 455, x2: 906, y2: 300 },
  'lift-f': { x1: 975, y1: 455, x2: 972, y2: 350 },
};

const difficultyStroke: Record<SlopeDifficulty, string> = {
  easy: '#3B82F6',
  intermediate: '#EF4444',
  advanced: '#0F172A',
  freeride: '#F59E0B',
  toboggan: '#22959D',
};

const restaurantPoints = [
  { id: 'rest-1', x: 300, y: 430, label: 'Völgyállomás — étterem' },
  { id: 'rest-2', x: 520, y: 220, label: 'Hütte — középállomás' },
  { id: 'rest-3', x: 700, y: 95, label: 'Panoráma büfé' },
];

function toPath(points: { x: number; y: number }[]): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
}

type Selection = { kind: 'slope'; item: Slope } | { kind: 'lift'; item: Lift } | null;

export function SlopeMap() {
  const [layers, setLayers] = useState<Record<LayerId, boolean>>({
    difficulty: true,
    lifts: true,
    snowmaking: false,
    restaurants: true,
    closures: true,
  });
  const [zoom, setZoom] = useState(1);
  const [selection, setSelection] = useState<Selection>(null);

  const closedSlopes = useMemo(() => slopes.filter((slope) => slope.status !== 'open'), []);

  const toggleLayer = (id: LayerId) => setLayers((current) => ({ ...current, [id]: !current[id] }));

  return (
    <div className="space-y-5">
      {/* 02 · RÉTEGVEZÉRLŐ */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-deep-500">
          <Layers aria-hidden="true" className="h-4 w-4" />
          Rétegek
        </span>
        {layerConfig.map((layer) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => toggleLayer(layer.id)}
            aria-pressed={layers[layer.id]}
            className={cn(
              'min-h-[42px] rounded-pill border px-4 text-sm font-semibold transition-colors',
              layers[layer.id]
                ? 'border-deep-800 bg-deep-800 text-white'
                : 'border-deep-200 bg-white text-deep-600 hover:bg-deep-50',
            )}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* 03 · TÉRKÉP */}
      <div className="relative overflow-hidden rounded-panel border border-deep-100 bg-ice-50">
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1 rounded-xl border border-deep-100 bg-white/95 p-1 shadow-subtle">
          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(2.5, Number((value + 0.25).toFixed(2))))}
            disabled={zoom >= 2.5}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-deep-700 transition-colors hover:bg-deep-50 disabled:opacity-40"
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">Nagyítás</span>
          </button>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(1, Number((value - 0.25).toFixed(2))))}
            disabled={zoom <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-deep-700 transition-colors hover:bg-deep-50 disabled:opacity-40"
          >
            <Minus aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">Kicsinyítés</span>
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-deep-700 transition-colors hover:bg-deep-50"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">Nagyítás visszaállítása</span>
          </button>
        </div>

        <p className="absolute left-3 top-3 z-10 max-w-[62%] rounded-lg bg-white/95 px-3 py-2 text-[0.7rem] font-medium leading-snug text-deep-600 shadow-subtle">
          Sematikus ábra a felvonók és pályák viszonyáról. {PLACEHOLDER_MEDIA.slopeMap}
        </p>

        <div className={cn('overflow-auto', zoom > 1 && 'cursor-grab')}>
          <svg
            viewBox="0 0 1100 500"
            role="img"
            aria-label="Sematikus pályatérkép — kattintható pályák és felvonók"
            className="block h-auto w-full min-w-[680px] origin-top-left transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
          >
            <defs>
              <pattern id="snowmaking-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <line x1="0" y="0" x2="0" y2="8" stroke="#43B4BB" strokeWidth="3" opacity="0.35" />
              </pattern>
            </defs>

            {/* Háttér: gerinc és völgy sávok */}
            <rect width="1100" height="500" fill="#F6FBFE" />
            <path d="M0 60 H1100 V120 H0 Z" fill="#D5E9F6" opacity="0.55" />
            <path d="M0 430 H1100 V500 H0 Z" fill="#DEEAF5" opacity="0.8" />
            <text x="16" y="46" fill="#5A8FBF" fontSize="13" fontWeight="700" letterSpacing="1">
              GERINC / CSÚCS
            </text>
            <text x="16" y="478" fill="#5A8FBF" fontSize="13" fontWeight="700" letterSpacing="1">
              VÖLGYÁLLOMÁS
            </text>

            {/* Hóágyúzott réteg */}
            {layers.snowmaking
              ? slopes
                  .filter((slope) => slope.snowmaking && slopeGeometry[slope.id])
                  .map((slope) => (
                    <path
                      key={`snow-${slope.id}`}
                      d={toPath(slopeGeometry[slope.id])}
                      stroke="url(#snowmaking-hatch)"
                      strokeWidth="18"
                      fill="none"
                      strokeLinecap="round"
                    />
                  ))
              : null}

            {/* Felvonók */}
            {layers.lifts
              ? lifts.map((lift) => {
                  const geo = liftGeometry[lift.id];
                  if (!geo) return null;
                  const active = selection?.kind === 'lift' && selection.item.id === lift.id;
                  return (
                    <g
                      key={lift.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${lift.name} felvonó kiválasztása`}
                      onClick={() => setSelection({ kind: 'lift', item: lift })}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setSelection({ kind: 'lift', item: lift });
                        }
                      }}
                      className="cursor-pointer outline-none"
                    >
                      <line
                        x1={geo.x1}
                        y1={geo.y1}
                        x2={geo.x2}
                        y2={geo.y2}
                        stroke="transparent"
                        strokeWidth="22"
                      />
                      <line
                        x1={geo.x1}
                        y1={geo.y1}
                        x2={geo.x2}
                        y2={geo.y2}
                        stroke={lift.status === 'open' ? '#0E2540' : '#94A3B8'}
                        strokeWidth={active ? 5 : 3}
                        strokeDasharray="1 10"
                        strokeLinecap="round"
                      />
                      <circle cx={geo.x2} cy={geo.y2} r={active ? 9 : 7} fill={lift.status === 'open' ? '#22959D' : '#94A3B8'} />
                      <circle cx={geo.x1} cy={geo.y1} r={active ? 9 : 7} fill={lift.status === 'open' ? '#0E2540' : '#94A3B8'} />
                    </g>
                  );
                })
              : null}

            {/* Pályák */}
            {slopes.map((slope) => {
              const geo = slopeGeometry[slope.id];
              if (!geo) return null;
              const active = selection?.kind === 'slope' && selection.item.id === slope.id;
              const isClosed = slope.status !== 'open';
              if (isClosed && !layers.closures) return null;

              return (
                <g
                  key={slope.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${slope.name} kiválasztása`}
                  onClick={() => setSelection({ kind: 'slope', item: slope })}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelection({ kind: 'slope', item: slope });
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <path d={toPath(geo)} stroke="transparent" strokeWidth="26" fill="none" />
                  <path
                    d={toPath(geo)}
                    stroke={layers.difficulty ? difficultyStroke[slope.difficulty] : '#64748B'}
                    strokeWidth={active ? 8 : 5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity={isClosed ? 0.35 : 1}
                    strokeDasharray={isClosed ? '10 8' : undefined}
                  />
                  {isClosed && layers.closures ? (
                    <g>
                      <circle cx={geo[0].x} cy={geo[0].y - 16} r="10" fill="#B91C1C" />
                      <path
                        d={`M${geo[0].x - 4} ${geo[0].y - 20} L${geo[0].x + 4} ${geo[0].y - 12} M${geo[0].x + 4} ${geo[0].y - 20} L${geo[0].x - 4} ${geo[0].y - 12}`}
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : null}
                </g>
              );
            })}

            {/* Éttermek */}
            {layers.restaurants
              ? restaurantPoints.map((point) => (
                  <g key={point.id}>
                    <circle cx={point.x} cy={point.y} r="11" fill="#fff" stroke="#245586" strokeWidth="2" />
                    <path
                      d={`M${point.x - 3} ${point.y - 5} v10 M${point.x} ${point.y - 5} v10 M${point.x + 3.5} ${point.y - 5} v4 a1.5 1.5 0 0 1 -3 0`}
                      stroke="#245586"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <title>{point.label}</title>
                  </g>
                ))
              : null}
          </svg>
        </div>
      </div>

      {/* Jelmagyarázat */}
      {layers.difficulty ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {(Object.keys(difficultyLabels) as SlopeDifficulty[]).map((key) => (
            <li key={key} className="flex items-center gap-2 text-xs text-deep-600">
              <span aria-hidden="true" className="h-1 w-6 rounded-full" style={{ backgroundColor: difficultyStroke[key] }} />
              {difficultyLabels[key]}
            </li>
          ))}
        </ul>
      ) : null}

      {/* 04 · KIVÁLASZTOTT ELEM PANEL */}
      <div
        aria-live="polite"
        className="rounded-panel border border-deep-100 bg-white p-5 sm:p-6"
      >
        {selection === null ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <MapIcon aria-hidden="true" className="h-6 w-6 text-deep-300" />
            <p className="font-semibold text-deep-800">Válassz ki egy pályát vagy felvonót</p>
            <p className="max-w-md text-sm text-deep-600">
              Kattints a térképen egy vonalra, és itt megjelennek az adatai: nehézség, hossz, szintkülönbség és aktuális státusz.
            </p>
          </div>
        ) : selection.kind === 'slope' ? (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-glacier-600">Kiválasztott pálya</p>
                <h3 className="mt-1 text-h3">{selection.item.name}</h3>
              </div>
              <StatusBadge status={selection.item.status} size="md" />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-deep-100 pt-5 sm:grid-cols-4">
              <div>
                <dt className="text-xs text-deep-500">Nehézség</dt>
                <dd className={cn('mt-1 font-semibold', difficultyColors[selection.item.difficulty].text)}>
                  {difficultyLabels[selection.item.difficulty]}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-deep-500">Hossz</dt>
                <dd className="mt-1 font-semibold text-deep-900">
                  {selection.item.lengthM === null ? (
                    <PendingValue value={null} hint="Pályahossz megadása szükséges" />
                  ) : (
                    formatLength(selection.item.lengthM)
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-deep-500">Szintkülönbség</dt>
                <dd className="mt-1 font-semibold text-deep-900">
                  {selection.item.verticalM === null ? (
                    <PendingValue value={null} hint="Szintkülönbség megadása szükséges" />
                  ) : (
                    formatNumber(selection.item.verticalM, ' m')
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-deep-500">Hóágyúzott</dt>
                <dd className="mt-1 font-semibold text-deep-900">{selection.item.snowmaking ? 'Igen' : 'Nem'}</dd>
              </div>
            </dl>
            {selection.item.note ? <p className="mt-4 text-sm text-deep-600">{selection.item.note}</p> : null}
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-glacier-600">Kiválasztott felvonó</p>
                <h3 className="mt-1 text-h3">{selection.item.name}</h3>
              </div>
              <StatusBadge status={selection.item.status} size="md" />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-deep-100 pt-5 sm:grid-cols-4">
              <div>
                <dt className="text-xs text-deep-500">Típus</dt>
                <dd className="mt-1 font-semibold text-deep-900">{liftTypeLabels[selection.item.type]}</dd>
              </div>
              <div>
                <dt className="text-xs text-deep-500">Üzemidő</dt>
                <dd className="mt-1 font-semibold text-deep-900">
                  <PendingValue value={selection.item.operatingHours} hint="Üzemidő megadása szükséges" />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-deep-500">Hossz</dt>
                <dd className="mt-1 font-semibold text-deep-900">
                  {selection.item.lengthM === null ? (
                    <PendingValue value={null} hint="Hossz megadása szükséges" />
                  ) : (
                    formatLength(selection.item.lengthM)
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-deep-500">Esti síelés</dt>
                <dd className="mt-1 font-semibold text-deep-900">{selection.item.nightSkiing ? 'Igen' : 'Nem'}</dd>
              </div>
            </dl>
          </>
        )}
      </div>

      {/* Zárások összefoglaló */}
      {layers.closures && closedSlopes.length > 0 ? (
        <div className="rounded-card border border-status-closed/20 bg-status-closedBg p-4">
          <p className="text-sm font-semibold text-status-closed">
            Jelenleg {closedSlopes.length} pálya nem üzemel
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-deep-700">
            {closedSlopes.map((slope) => (
              <li key={slope.id}>{slope.name}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* 05 · OFFLINE TARTALÉK */}
      <div className="flex flex-col gap-4 rounded-panel border border-deep-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <WifiOff aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-glacier-600" />
          <div>
            <h3 className="font-semibold text-deep-900">Hálózat nélkül is elérhető</h3>
            <p className="mt-1 max-w-md text-sm text-deep-600">
              A hegyen gyakran nincs térerő. Töltsd le a térképet indulás előtt, hogy offline is kéznél legyen.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <SecondaryButton
            disabled
            title="A letölthető PDF a végleges pályatérkép elkészülte után lesz elérhető."
            icon={<Download aria-hidden="true" className="h-4 w-4" />}
          >
            PDF letöltés
          </SecondaryButton>
          <SecondaryButton
            disabled
            title="Az offline mentés a végleges térképfájl feltöltése után kapcsolható be."
            icon={<WifiOff aria-hidden="true" className="h-4 w-4" />}
          >
            Offline mentés
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
