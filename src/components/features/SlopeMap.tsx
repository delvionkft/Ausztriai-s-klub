'use client';

import { useCallback, useRef, useState } from 'react';
import {
  CableCar, Download, Info, Maximize, Minus, Mountain, Plus, Printer, Utensils, X,
} from 'lucide-react';
import type { Lift, MountainPoi, Slope } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { lifts } from '@/data/lifts';
import { mountainPois, slopes } from '@/data/slopes';
import { formatLength, formatNumber } from '@/lib/format';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { liftTone, useLiftStatusLabel } from './LiftCard';
import { slopeTone, useDifficultyLabel, useSlopeStatusLabel } from './SlopeList';

/**
 * ============================================================================
 *  INTERAKTÍV PÁLYATÉRKÉP
 * ============================================================================
 *  Rétegvezérlés, nagyítás, mobilos érintésvezérlés és kattintható elemek.
 *
 *  A terep és a nyomvonalak SVG-ben készültek (viewBox 0 0 1200 800). Végleges
 *  térkép esetén elég a `src/data/slopes.ts` és `src/data/lifts.ts` `path`
 *  mezőit lecserélni — a felület logikája változatlan marad.
 * ============================================================================
 */

const DIFFICULTY_STROKE: Record<Slope['difficulty'], string> = {
  blue: '#2563EB',
  red: '#DC2626',
  black: '#111827',
  skiroute: '#F97316',
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

type Selection =
  | { kind: 'slope'; item: Slope }
  | { kind: 'lift'; item: Lift }
  | { kind: 'poi'; item: MountainPoi }
  | null;

export function SlopeMap({ pdfHref = '/dokumentumok/palyaterkep.pdf' }: { pdfHref?: string }) {
  const { t, L, locale } = useI18n();
  const difficultyLabel = useDifficultyLabel();
  const slopeStatus = useSlopeStatusLabel();
  const liftStatus = useLiftStatusLabel();

  const [layers, setLayers] = useState({
    difficulty: true, lifts: true, snowmaking: false, food: true, closures: true,
  });
  const [selection, setSelection] = useState<Selection>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragState = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);

  const clampOffset = useCallback((next: { x: number; y: number }, s: number) => {
    const limitX = (600 * (s - 1)) / s;
    const limitY = (400 * (s - 1)) / s;
    return {
      x: Math.max(-limitX, Math.min(limitX, next.x)),
      y: Math.max(-limitY, Math.min(limitY, next.y)),
    };
  }, []);

  const zoomTo = useCallback((next: number) => {
    const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, next));
    setScale(clamped);
    setOffset((prev) => clampOffset(prev, clamped));
  }, [clampOffset]);

  const reset = () => { setScale(1); setOffset({ x: 0, y: 0 }); setSelection(null); };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      dragState.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    } else if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      dragState.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomTo(pinchStart.current.scale * (dist / pinchStart.current.dist));
      return;
    }

    const drag = dragState.current;
    if (!drag || scale === 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = ((e.clientX - drag.x) / rect.width) * 1200 / scale;
    const dy = ((e.clientY - drag.y) / rect.height) * 800 / scale;
    setOffset(clampOffset({ x: drag.ox + dx, y: drag.oy + dy }, scale));
  };

  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) dragState.current = null;
  };

  const selectSlope = (slope: Slope) => {
    setSelection({ kind: 'slope', item: slope });
    track('select_slope', { slope: slope.id, difficulty: slope.difficulty });
  };

  const layerToggles = [
    { id: 'difficulty' as const, label: t.map.layerDifficulty },
    { id: 'lifts' as const, label: t.map.layerLifts },
    { id: 'snowmaking' as const, label: t.map.layerSnowmaking },
    { id: 'food' as const, label: t.map.layerFood },
    { id: 'closures' as const, label: t.map.layerClosures },
  ];

  const closures = mountainPois.filter((p) => p.kind === 'closed-area');
  const foodPois = mountainPois.filter((p) => p.kind === 'restaurant' || p.kind === 'hut');
  const servicePois = mountainPois.filter((p) => p.kind === 'ski-school' || p.kind === 'rental' || p.kind === 'parking');

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-4">
        {/* Rétegvezérlők */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[0.75rem] font-bold uppercase tracking-wider text-frost-300/70">{t.map.layers}</span>
          {layerToggles.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setLayers((prev) => ({ ...prev, [layer.id]: !prev[layer.id] }))}
              aria-pressed={layers[layer.id]}
              className={cn(
                'tap-target inline-flex items-center gap-2 rounded-pill px-3.5 text-[0.8125rem] font-semibold transition-all',
                layers[layer.id]
                  ? 'bg-glacier-400 text-night-950'
                  : 'border border-white/20 text-frost-200 hover:border-glacier-400/60 hover:bg-white/10',
              )}
            >
              <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', layers[layer.id] ? 'bg-night-950' : 'bg-white/40')} />
              {layer.label}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-panel border border-white/12 bg-night-900">
          <svg
            viewBox="0 0 1200 800"
            className={cn('block h-auto w-full touch-none select-none', scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default')}
            role="img"
            aria-label={t.map.title}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <defs>
              <linearGradient id="map-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B1D33" />
                <stop offset="100%" stopColor="#16304C" />
              </linearGradient>
              <linearGradient id="map-snowfield" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#F2F8FF" />
                <stop offset="100%" stopColor="#C9DEF0" />
              </linearGradient>
              <linearGradient id="map-rock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3E5772" />
                <stop offset="100%" stopColor="#22384F" />
              </linearGradient>
            </defs>

            <g transform={`scale(${scale}) translate(${offset.x} ${offset.y})`} style={{ transformOrigin: '600px 400px' }}>
              {/* Terep */}
              <rect width="1200" height="800" fill="url(#map-sky)" />
              <path d="M0 300 L150 190 L280 250 L420 130 L560 220 L700 110 L840 210 L980 140 L1120 240 L1200 190 L1200 800 L0 800 Z" fill="url(#map-rock)" opacity="0.75" />
              <path
                d="M0 380 L140 270 L300 340 L450 190 L600 100 L760 200 L900 150 L1050 260 L1200 210 L1200 800 L0 800 Z"
                fill="url(#map-snowfield)"
              />
              <path d="M600 100 L668 176 L634 190 L566 176 Z" fill="#FFFFFF" />
              <path d="M450 190 L502 250 L474 262 L420 246 Z" fill="#FFFFFF" opacity="0.9" />

              {/* Erdősávok */}
              <g fill="#1E4F42" opacity="0.35">
                <path d="M40 560 C 140 520 220 560 300 540 C 360 524 400 552 430 580 L430 800 L40 800 Z" />
                <path d="M980 520 C 1060 496 1120 528 1200 512 L1200 800 L980 800 Z" />
                <path d="M540 660 C 620 636 700 668 780 648 L800 800 L540 800 Z" />
              </g>

              {/* Hóágyúzott szakaszok kiemelése */}
              {layers.snowmaking
                ? slopes.filter((s) => s.snowmaking).map((slope) => (
                  <path key={`sm-${slope.id}`} d={slope.path} stroke="#19C3E6" strokeWidth="18" strokeOpacity="0.28" fill="none" strokeLinecap="round" />
                ))
                : null}

              {/* Pályák */}
              {layers.difficulty
                ? slopes.map((slope) => {
                  const isSelected = selection?.kind === 'slope' && selection.item.id === slope.id;
                  return (
                    <g key={slope.id}>
                      <path d={slope.path} stroke="#FFFFFF" strokeWidth="10" strokeOpacity="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d={slope.path}
                        stroke={DIFFICULTY_STROKE[slope.difficulty]}
                        strokeWidth={isSelected ? 8 : 5}
                        strokeDasharray={slope.difficulty === 'skiroute' ? '14 10' : undefined}
                        strokeOpacity={slope.status === 'closed' ? 0.35 : 1}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Kattintási sáv — vastagabb, hogy ujjal is eltalálható legyen */}
                      <path
                        d={slope.path}
                        stroke="transparent"
                        strokeWidth="28"
                        fill="none"
                        className="cursor-pointer"
                        onClick={() => selectSlope(slope)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${slope.number}. ${slope.name}`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSlope(slope); } }}
                      />
                      <g transform={`translate(${slope.labelAt.x} ${slope.labelAt.y})`} className="pointer-events-none">
                        <circle r="12" fill="#FFFFFF" stroke={DIFFICULTY_STROKE[slope.difficulty]} strokeWidth="2.5" />
                        <text textAnchor="middle" dy="4.5" fontSize="12" fontWeight="700" fill="#07111F">{slope.number}</text>
                      </g>
                    </g>
                  );
                })
                : null}

              {/* Felvonók */}
              {layers.lifts
                ? lifts.map((lift) => {
                  const isSelected = selection?.kind === 'lift' && selection.item.id === lift.id;
                  return (
                    <g key={lift.id}>
                      <path d={lift.path} stroke="#07111F" strokeWidth={isSelected ? 5 : 3.5} fill="none" strokeLinecap="round" />
                      <path d={lift.path} stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 8" fill="none" />
                      <path
                        d={lift.path}
                        stroke="transparent"
                        strokeWidth="26"
                        fill="none"
                        className="cursor-pointer"
                        onClick={() => setSelection({ kind: 'lift', item: lift })}
                        role="button"
                        tabIndex={0}
                        aria-label={lift.name}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelection({ kind: 'lift', item: lift }); } }}
                      />
                      <g transform={`translate(${lift.labelAt.x} ${lift.labelAt.y})`} className="pointer-events-none">
                        <rect x="-11" y="-11" width="22" height="22" rx="6" fill="#07111F" />
                        <circle cx="0" cy="0" r="3.4" fill={lift.status === 'running' ? '#22C55E' : lift.status === 'maintenance' ? '#F59E0B' : '#EF4444'} />
                      </g>
                    </g>
                  );
                })
                : null}

              {/* Lezárások */}
              {layers.closures
                ? closures.map((poi) => (
                  <g
                    key={poi.id}
                    transform={`translate(${poi.at.x} ${poi.at.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelection({ kind: 'poi', item: poi })}
                    role="button"
                    tabIndex={0}
                    aria-label={poi.name}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelection({ kind: 'poi', item: poi }); } }}
                  >
                    <circle r="34" fill="#EF4444" fillOpacity="0.16" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 5" />
                    <path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                ))
                : null}

              {/* Éttermek és hütték */}
              {layers.food
                ? foodPois.map((poi) => (
                  <g
                    key={poi.id}
                    transform={`translate(${poi.at.x} ${poi.at.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelection({ kind: 'poi', item: poi })}
                    role="button"
                    tabIndex={0}
                    aria-label={poi.name}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelection({ kind: 'poi', item: poi }); } }}
                  >
                    <circle r="13" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
                    <path d="M-4 -5 v10 M-1.5 -5 v10 M4 -5 c0 3 -2 3 -2 5 v5" stroke="#07111F" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  </g>
                ))
                : null}

              {/* Állandó szolgáltatáspontok */}
              {servicePois.map((poi) => (
                <g
                  key={poi.id}
                  transform={`translate(${poi.at.x} ${poi.at.y})`}
                  className="cursor-pointer"
                  onClick={() => setSelection({ kind: 'poi', item: poi })}
                  role="button"
                  tabIndex={0}
                  aria-label={poi.name}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelection({ kind: 'poi', item: poi }); } }}
                >
                  <circle r="11" fill="#0B1D33" stroke="#19C3E6" strokeWidth="2.5" />
                  <circle r="3" fill="#19C3E6" />
                </g>
              ))}
            </g>
          </svg>

          {/* Nagyítás vezérlők */}
          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            <button type="button" onClick={() => zoomTo(scale + 0.5)} aria-label={t.common.zoomIn} className="tap-target inline-grid place-items-center rounded-xl border border-white/20 bg-night-950/75 px-2 text-white backdrop-blur-sm transition-colors hover:bg-night-950">
              <Plus aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => zoomTo(scale - 0.5)} aria-label={t.common.zoomOut} className="tap-target inline-grid place-items-center rounded-xl border border-white/20 bg-night-950/75 px-2 text-white backdrop-blur-sm transition-colors hover:bg-night-950">
              <Minus aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" onClick={reset} aria-label={t.common.reset} className="tap-target inline-grid place-items-center rounded-xl border border-white/20 bg-night-950/75 px-2 text-white backdrop-blur-sm transition-colors hover:bg-night-950">
              <Maximize aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          {/* Jelmagyarázat */}
          <div className="absolute bottom-3 left-3 hidden flex-wrap gap-x-4 gap-y-1.5 rounded-card border border-white/15 bg-night-950/80 px-4 py-2.5 text-[0.75rem] text-frost-200 backdrop-blur-sm sm:flex">
            {(['blue', 'red', 'black', 'skiroute'] as const).map((d) => (
              <span key={d} className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: DIFFICULTY_STROKE[d] }} />
                {difficultyLabel(d, true)}
              </span>
            ))}
          </div>
        </div>

        {/* Offline lehetőség */}
        <div className="flex flex-col gap-4 rounded-card border border-white/12 bg-white/[0.05] p-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h3 className="font-display text-base font-extrabold text-white">{t.map.offlineTitle}</h3>
            <p className="mt-1.5 text-[0.875rem] leading-snug text-frost-300/80">{t.map.offlineText}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button
              variant="onDark"
              onClick={() => { track('open_slope_map', { action: 'download-pdf' }); window.open(pdfHref, '_blank', 'noopener'); }}
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              {t.cta.downloadMap}
            </Button>
            <Button
              variant="onDark"
              onClick={() => { track('open_slope_map', { action: 'print-view' }); window.open('/palyaterkep/nyomtatas', '_blank', 'noopener'); }}
            >
              <Printer aria-hidden="true" className="h-4 w-4" />
              Nyomtatható nézet
            </Button>
          </div>
        </div>
      </div>

      {/* Információs panel */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        {!selection ? (
          <div className="rounded-panel border border-dashed border-white/20 bg-white/[0.04] p-8 text-center">
            <Info aria-hidden="true" className="mx-auto h-8 w-8 text-glacier-400" />
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-frost-300/85">
              <span className="hidden lg:inline">{t.map.selectHint}</span>
              <span className="lg:hidden">{t.map.selectHintMobile}</span>
            </p>
          </div>
        ) : (
          <div className="animate-fade-in rounded-panel border border-white/12 bg-white/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.75rem] font-bold uppercase tracking-wider text-glacier-300">
                  {selection.kind === 'slope' ? t.snow.tableSlope : selection.kind === 'lift' ? t.snow.tableLift : t.map.layerFood}
                </p>
                <h3 className="mt-1 font-display text-xl font-extrabold text-white">
                  {selection.kind === 'slope' ? `${selection.item.number}. ${selection.item.name}` : selection.item.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelection(null)}
                aria-label={t.common.close}
                className="tap-target -mr-2 -mt-2 inline-grid place-items-center rounded-pill px-2 text-frost-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            {selection.kind === 'slope' ? (
              <>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-pill border border-white/20 px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: DIFFICULTY_STROKE[selection.item.difficulty] }} />
                    {difficultyLabel(selection.item.difficulty)}
                  </span>
                  <StatusBadge invert size="sm" tone={slopeTone(selection.item.status)} label={slopeStatus(selection.item.status)} />
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
                  <div>
                    <dt className="text-[0.75rem] uppercase tracking-wide text-frost-300/60">{t.map.length}</dt>
                    <dd className="mt-1 font-display text-lg font-extrabold text-white">{formatLength(selection.item.lengthM, locale)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] uppercase tracking-wide text-frost-300/60">{t.map.verticalDrop}</dt>
                    <dd className="mt-1 font-display text-lg font-extrabold text-white">{selection.item.verticalM} m</dd>
                  </div>
                </dl>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-frost-200">{L(selection.item.description)}</p>
                {selection.item.lastGroomed !== '—' ? (
                  <p className="mt-4 flex items-center gap-1.5 text-[0.8125rem] text-frost-300/70">
                    <Mountain aria-hidden="true" className="h-4 w-4" />
                    {t.status.groomed}: {selection.item.lastGroomed}
                  </p>
                ) : null}
              </>
            ) : null}

            {selection.kind === 'lift' ? (
              <>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-pill border border-white/20 px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                    <CableCar aria-hidden="true" className="h-4 w-4 text-glacier-300" />
                    {t.liftType[selection.item.type]}
                  </span>
                  <StatusBadge invert size="sm" tone={liftTone(selection.item.status)} label={liftStatus(selection.item.status)} />
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
                  <div>
                    <dt className="text-[0.75rem] uppercase tracking-wide text-frost-300/60">{t.map.altitude}</dt>
                    <dd className="mt-1 font-semibold text-white">{formatNumber(selection.item.baseAltitudeM)} – {formatNumber(selection.item.topAltitudeM)} m</dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] uppercase tracking-wide text-frost-300/60">{t.map.rideTime}</dt>
                    <dd className="mt-1 font-semibold text-white">{selection.item.rideTimeMin} perc</dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] uppercase tracking-wide text-frost-300/60">{t.map.capacity}</dt>
                    <dd className="mt-1 font-semibold text-white">{formatNumber(selection.item.capacityPerHour)} fő/óra</dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] uppercase tracking-wide text-frost-300/60">{t.snow.tableHours}</dt>
                    <dd className="mt-1 font-semibold text-white">{selection.item.operatingHours}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-frost-200">{L(selection.item.note)}</p>
              </>
            ) : null}

            {selection.kind === 'poi' ? (
              <>
                <p className="mt-4 inline-flex items-center gap-2 rounded-pill border border-white/20 px-3 py-1.5 text-[0.8125rem] font-semibold text-white">
                  <Utensils aria-hidden="true" className="h-4 w-4 text-glacier-300" />
                  {selection.item.kind === 'closed-area' ? t.map.layerClosures : t.map.layerFood}
                </p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-frost-200">{L(selection.item.description)}</p>
                {selection.item.openingHours ? (
                  <p className="mt-4 text-[0.8125rem] text-frost-300/75">{t.contact.openingHours}: {selection.item.openingHours}</p>
                ) : null}
              </>
            ) : null}
          </div>
        )}
      </aside>
    </div>
  );
}
