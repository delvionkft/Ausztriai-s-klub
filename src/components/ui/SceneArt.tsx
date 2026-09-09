import { cn } from '@/lib/cn';

/**
 * TARTALÉK GRAFIKA
 * ----------------------------------------------------------------------------
 * Ha egy fotó bármilyen okból nem tölthető be (offline nézet, lejárt CDN-link,
 * még fel nem töltött saját kép), a `Media` komponens ezt a réteget mutatja.
 * Nem üres szürke doboz és nem drótváz: minden jelenet megkomponált,
 * a szekció hangulatához illő alpesi háttér.
 */

export type SceneVariant =
  | 'alpine-dawn' | 'alpine-day' | 'alpine-dusk'
  | 'night-ski' | 'lift' | 'ski-school'
  | 'chalet-dusk' | 'chalet-night'
  | 'summer-ridge' | 'interior-warm' | 'interior-cool' | 'portrait';

interface Palette {
  skyTop: string; skyBottom: string;
  far: string; mid: string; near: string;
  snow: string; forest: string;
  glow: string; glowOpacity: number;
  dark: boolean;
}

const PALETTES: Record<SceneVariant, Palette> = {
  'alpine-dawn': { skyTop: '#1B3A5C', skyBottom: '#F3C9A4', far: '#5E7FA3', mid: '#3D5D82', near: '#22405F', snow: '#FDF4EA', forest: '#16304A', glow: '#FFCE9A', glowOpacity: 0.75, dark: true },
  'alpine-day': { skyTop: '#2E7FC0', skyBottom: '#CFE9FB', far: '#8FBEDF', mid: '#5F9AC8', near: '#2F5F8C', snow: '#FFFFFF', forest: '#1E4568', glow: '#FFFFFF', glowOpacity: 0.55, dark: false },
  'alpine-dusk': { skyTop: '#0B1B33', skyBottom: '#7A5C93', far: '#3E4E77', mid: '#28375C', near: '#16233F', snow: '#E8EDFA', forest: '#101C33', glow: '#F2A0A0', glowOpacity: 0.5, dark: true },
  'night-ski': { skyTop: '#050F1E', skyBottom: '#12304C', far: '#123049', mid: '#0C2237', near: '#07162A', snow: '#CFE6F7', forest: '#050F1D', glow: '#38BDF8', glowOpacity: 0.42, dark: true },
  lift: { skyTop: '#3D8CC7', skyBottom: '#D9EDFB', far: '#93C2E2', mid: '#5E97C6', near: '#2C5A86', snow: '#FFFFFF', forest: '#1C4164', glow: '#FFFFFF', glowOpacity: 0.5, dark: false },
  'ski-school': { skyTop: '#57A6DA', skyBottom: '#E5F3FD', far: '#A9D2EC', mid: '#79ABD5', near: '#3A6E9B', snow: '#FFFFFF', forest: '#224C71', glow: '#FFF6D9', glowOpacity: 0.6, dark: false },
  'chalet-dusk': { skyTop: '#12294A', skyBottom: '#5C6E96', far: '#2F4970', mid: '#1F3557', near: '#14243E', snow: '#E4ECF9', forest: '#0E1C31', glow: '#FFC97A', glowOpacity: 0.55, dark: true },
  'chalet-night': { skyTop: '#050D1C', skyBottom: '#122744', far: '#152C48', mid: '#0E1F36', near: '#081426', snow: '#D5E6F6', forest: '#050D1A', glow: '#FFB865', glowOpacity: 0.5, dark: true },
  'summer-ridge': { skyTop: '#2F8FD0', skyBottom: '#D9F0F4', far: '#8FC4C9', mid: '#4E9B92', near: '#2C6E63', snow: '#EAF7F2', forest: '#1D4F46', glow: '#FFFFFF', glowOpacity: 0.5, dark: false },
  'interior-warm': { skyTop: '#3A2A20', skyBottom: '#8C6244', far: '#6B4A33', mid: '#523827', near: '#33231A', snow: '#F7E4CC', forest: '#291B13', glow: '#FFC88A', glowOpacity: 0.7, dark: true },
  'interior-cool': { skyTop: '#16304A', skyBottom: '#5E86A8', far: '#43617E', mid: '#2E475F', near: '#1C2E42', snow: '#E7F1F9', forest: '#142434', glow: '#9AD6F0', glowOpacity: 0.55, dark: true },
  portrait: { skyTop: '#123A56', skyBottom: '#7FB6D4', far: '#4E7E9C', mid: '#33607E', near: '#1F4560', snow: '#EAF4FA', forest: '#16344A', glow: '#DFF3FF', glowOpacity: 0.6, dark: true },
};

export const DARK_SCENES: Record<SceneVariant, boolean> = Object.fromEntries(
  Object.entries(PALETTES).map(([key, value]) => [key, value.dark]),
) as Record<SceneVariant, boolean>;

const INTERIOR: SceneVariant[] = ['interior-warm', 'interior-cool', 'portrait'];

export function SceneArt({ variant = 'alpine-day', className }: { variant?: SceneVariant; className?: string }) {
  const p = PALETTES[variant] ?? PALETTES['alpine-day'];
  const uid = `sc-${variant}`;
  const isInterior = INTERIOR.includes(variant);

  return (
    <svg
      viewBox="0 0 1200 750"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor={p.skyTop} />
          <stop offset="100%" stopColor={p.skyBottom} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={p.glow} stopOpacity={p.glowOpacity} />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skyBottom} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.skyBottom} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-snow`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={p.snow} stopOpacity="0.95" />
          <stop offset="100%" stopColor={p.snow} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <rect width="1200" height="750" fill={`url(#${uid}-sky)`} />
      <ellipse cx={variant === 'alpine-dawn' ? 300 : 880} cy="180" rx="460" ry="300" fill={`url(#${uid}-glow)`} />

      {isInterior ? (
        <InteriorScene uid={uid} p={p} variant={variant} />
      ) : (
        <MountainScene uid={uid} p={p} variant={variant} />
      )}

      {/* Finom filmes szemcse — a lapos színfelületek megtörésére. */}
      <rect width="1200" height="750" fill="#000" opacity="0.03" />
    </svg>
  );
}

function MountainScene({ uid, p, variant }: { uid: string; p: Palette; variant: SceneVariant }) {
  const showStars = variant === 'night-ski' || variant === 'chalet-night';
  const showChalet = variant === 'chalet-dusk' || variant === 'chalet-night';
  const showLift = variant === 'lift';
  const showPistes = variant === 'ski-school' || variant === 'alpine-day' || variant === 'night-ski';
  const summer = variant === 'summer-ridge';

  return (
    <>
      {showStars ? (
        <g fill={p.snow} opacity="0.8">
          {[[140, 70, 1.6], [300, 128, 1.1], [470, 62, 1.8], [640, 110, 1.2], [820, 74, 1.5], [1010, 132, 1.2], [1120, 66, 1.7]].map(
            ([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />,
          )}
        </g>
      ) : (
        <circle cx={variant === 'alpine-dawn' ? 300 : 880} cy="176" r="46" fill={p.snow} opacity={p.dark ? 0.55 : 0.85} />
      )}

      {/* Távoli gerinc — párás, kékes */}
      <path
        d="M0 392 L104 300 L176 348 L268 232 L352 322 L436 268 L520 356 L604 274 L700 350 L790 282 L884 358 L978 288 L1080 352 L1200 296 L1200 750 L0 750 Z"
        fill={p.far} opacity="0.55"
      />
      <path d="M268 232 L308 278 L282 288 L242 270 Z" fill={p.snow} opacity="0.5" />
      <path d="M604 274 L644 320 L618 330 L578 312 Z" fill={p.snow} opacity="0.45" />

      {/* Középső gerinc */}
      <path
        d="M0 470 L120 372 L232 440 L340 320 L452 424 L556 356 L664 452 L784 366 L892 446 L1012 372 L1120 442 L1200 396 L1200 750 L0 750 Z"
        fill={p.mid}
      />
      <path d="M340 320 L390 376 L358 388 L310 366 Z" fill={p.snow} opacity="0.9" />
      <path d="M784 366 L830 420 L800 430 L756 410 Z" fill={p.snow} opacity="0.85" />
      <path d="M1012 372 L1054 424 L1026 434 L986 414 Z" fill={p.snow} opacity="0.8" />

      <rect y="330" width="1200" height="240" fill={`url(#${uid}-haze)`} opacity="0.4" />

      {/* Havas (vagy nyáron füves) előtér */}
      <path
        d="M0 560 L170 494 L330 548 L500 480 L664 546 L826 486 L980 552 L1130 496 L1200 528 L1200 750 L0 750 Z"
        fill={p.near}
      />
      <path
        d="M0 612 C 180 574 320 620 480 596 C 640 572 780 618 940 600 C 1060 586 1140 606 1200 596 L1200 750 L0 750 Z"
        fill={`url(#${uid}-snow)`} opacity={summer ? 0.35 : 0.92}
      />

      {showPistes ? (
        <g stroke={p.snow} strokeOpacity={variant === 'night-ski' ? 0.55 : 0.75} fill="none" strokeLinecap="round">
          <path d="M470 486 C 452 546 418 596 356 638" strokeWidth="26" strokeOpacity="0.28" />
          <path d="M700 500 C 726 556 748 606 800 646" strokeWidth="22" strokeOpacity="0.22" />
        </g>
      ) : null}

      {/* Fenyves sziluett */}
      <g fill={p.forest} opacity={summer ? 0.85 : 0.95}>
        {[40, 92, 150, 208, 262, 930, 986, 1042, 1098, 1152].map((x, i) => (
          <path key={x} d={`M${x} ${648 - (i % 3) * 10} l14 40 h-28 Z M${x} ${672 - (i % 3) * 10} l19 44 h-38 Z M${x} ${698 - (i % 3) * 10} l24 46 h-48 Z`} />
        ))}
      </g>

      {showLift ? (
        <g>
          <path d="M120 700 L 470 452 L 830 262" stroke={p.forest} strokeWidth="3" fill="none" opacity="0.85" />
          <path d="M120 700 L 470 452 L 830 262" stroke={p.snow} strokeWidth="1" fill="none" opacity="0.35" />
          {[[240, 620], [470, 452], [700, 330]].map(([x, y]) => (
            <g key={`${x}`}>
              <rect x={x - 3} y={y} width="6" height="70" fill={p.forest} opacity="0.9" />
              <rect x={x - 22} y={y - 6} width="44" height="6" rx="3" fill={p.forest} opacity="0.9" />
            </g>
          ))}
          {[[330, 552], [560, 392], [760, 296]].map(([x, y]) => (
            <g key={`c-${x}`}>
              <line x1={x} y1={y} x2={x} y2={y + 18} stroke={p.forest} strokeWidth="2.5" />
              <rect x={x - 12} y={y + 18} width="24" height="20" rx="5" fill={p.forest} />
              <rect x={x - 9} y={y + 22} width="18" height="8" rx="2" fill={p.glow} opacity="0.5" />
            </g>
          ))}
        </g>
      ) : null}

      {showChalet ? (
        <g>
          <path d="M420 640 L560 552 L700 640 L700 738 L420 738 Z" fill={p.forest} />
          <path d="M400 646 L560 542 L720 646 L706 660 L560 566 L414 660 Z" fill={p.snow} opacity="0.85" />
          {[[470, 664], [530, 664], [590, 664], [650, 664], [500, 704], [610, 704]].map(([x, y]) => (
            <rect key={`w-${x}-${y}`} x={x} y={y} width="34" height="26" rx="3" fill={p.glow} opacity="0.85" />
          ))}
          <ellipse cx="560" cy="742" rx="230" ry="26" fill={p.glow} opacity="0.12" />
        </g>
      ) : null}
    </>
  );
}

function InteriorScene({ uid, p, variant }: { uid: string; p: Palette; variant: SceneVariant }) {
  if (variant === 'portrait') {
    return (
      <>
        <circle cx="600" cy="330" r="250" fill={p.mid} opacity="0.35" />
        <g fill={p.snow} opacity="0.22">
          <circle cx="600" cy="330" r="118" />
          <path d="M600 470 C 470 470 384 560 366 700 L834 700 C 816 560 730 470 600 470 Z" />
        </g>
        <rect y="560" width="1200" height="190" fill={p.near} opacity="0.55" />
      </>
    );
  }

  return (
    <>
      {/* Fal és padló */}
      <rect y="0" width="1200" height="520" fill={p.mid} opacity="0.55" />
      <rect y="520" width="1200" height="230" fill={p.near} />
      <rect y="512" width="1200" height="12" fill={p.forest} opacity="0.6" />

      {/* Ablak, meleg fénnyel */}
      <rect x="742" y="140" width="330" height="290" rx="10" fill={p.forest} opacity="0.8" />
      <rect x="758" y="156" width="298" height="258" rx="6" fill={`url(#${uid}-glow)`} />
      <rect x="758" y="156" width="298" height="258" rx="6" fill={p.glow} opacity="0.28" />
      <line x1="907" y1="156" x2="907" y2="414" stroke={p.forest} strokeWidth="8" opacity="0.8" />
      <line x1="758" y1="285" x2="1056" y2="285" stroke={p.forest} strokeWidth="8" opacity="0.8" />

      {/* Faburkolat csíkjai */}
      <g stroke={p.forest} strokeOpacity="0.25" strokeWidth="2">
        {[60, 120, 180, 240, 300, 360, 420, 480].map((y) => (
          <line key={y} x1="0" y1={y} x2="700" y2={y} />
        ))}
      </g>

      {/* Bútor sziluettek */}
      <rect x="120" y="360" width="440" height="130" rx="18" fill={p.forest} opacity="0.55" />
      <rect x="150" y="330" width="120" height="46" rx="12" fill={p.snow} opacity="0.22" />
      <rect x="300" y="330" width="120" height="46" rx="12" fill={p.snow} opacity="0.18" />
      <rect x="180" y="500" width="330" height="16" rx="8" fill={p.forest} opacity="0.4" />
      <ellipse cx="600" cy="640" rx="520" ry="60" fill={p.glow} opacity="0.1" />
    </>
  );
}
