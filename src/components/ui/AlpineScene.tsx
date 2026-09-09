import { cn } from '@/lib/cn';

/**
 * Dizájnolt hegyi háttér — valós fotó helyett.
 * Nem "kitalált fotó", hanem szándékosan illusztratív felület, amíg a
 * tulajdonos fotói meg nem érkeznek. Cseréje: `src/data/media.ts` + `Media`.
 */

export type SceneVariant = 'dawn' | 'day' | 'dusk' | 'night' | 'summer';

const palettes: Record<SceneVariant, { sky: [string, string]; far: string; mid: string; near: string; snow: string; accent: string }> = {
  dawn: { sky: ['#EAF4FB', '#D5E9F6'], far: '#B6D8EF', mid: '#8FC1E3', near: '#356EA3', snow: '#FFFFFF', accent: '#79D0D5' },
  day: { sky: ['#E7F3FC', '#C9E3F5'], far: '#AFD3EC', mid: '#7FB2DA', near: '#245586', snow: '#FFFFFF', accent: '#43B4BB' },
  dusk: { sky: ['#1B426C', '#356EA3'], far: '#245586', mid: '#143253', near: '#0E2540', snow: '#EAF4FB', accent: '#43B4BB' },
  night: { sky: ['#08182B', '#143253'], far: '#0E2540', mid: '#08182B', near: '#061321', snow: '#D5E9F6', accent: '#22959D' },
  summer: { sky: ['#EDF7FB', '#D8EDF1'], far: '#AEE5E7', mid: '#79D0D5', near: '#177880', snow: '#F6FBFE', accent: '#43B4BB' },
};

/**
 * Melyik jelenet eleve sötét. A `Media` ez alapján választ gyengébb fedést,
 * hogy a hegy rajzolata látszódjon, de a fehér szöveg kontrasztja megmaradjon.
 */
export const DARK_SCENES: Record<SceneVariant, boolean> = {
  dawn: false,
  day: false,
  dusk: true,
  night: true,
  summer: false,
};

interface AlpineSceneProps {
  variant?: SceneVariant;
  className?: string;
}

export function AlpineScene({ variant = 'day', className }: AlpineSceneProps) {
  const p = palettes[variant];
  const uid = `alpine-${variant}`;

  return (
    <svg
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="100%" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`${uid}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.snow} stopOpacity="0" />
          <stop offset="100%" stopColor={p.snow} stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <rect width="1200" height="675" fill={`url(#${uid}-sky)`} />

      {variant === 'night' ? (
        <g fill={p.snow} opacity="0.7">
          <circle cx="180" cy="90" r="1.6" />
          <circle cx="340" cy="150" r="1.2" />
          <circle cx="520" cy="70" r="1.8" />
          <circle cx="760" cy="130" r="1.3" />
          <circle cx="940" cy="80" r="1.6" />
          <circle cx="1080" cy="160" r="1.2" />
        </g>
      ) : (
        <circle cx="960" cy="150" r="58" fill={p.snow} opacity={variant === 'dusk' ? 0.28 : 0.55} />
      )}

      {/* Távoli gerinc */}
      <path
        d="M0 430 L130 310 L215 370 L330 245 L430 340 L520 280 L620 380 L720 300 L830 385 L950 295 L1060 375 L1200 300 L1200 675 L0 675 Z"
        fill={p.far}
        opacity="0.75"
      />
      {/* Középső gerinc */}
      <path
        d="M0 500 L120 400 L240 470 L360 350 L470 445 L580 385 L700 480 L820 400 L930 470 L1050 395 L1200 465 L1200 675 L0 675 Z"
        fill={p.mid}
        opacity="0.9"
      />
      {/* Havas csúcsok */}
      <path d="M360 350 L400 392 L378 398 L342 384 Z" fill={p.snow} opacity="0.9" />
      <path d="M580 385 L616 424 L596 428 L562 414 Z" fill={p.snow} opacity="0.85" />
      <path d="M1050 395 L1088 434 L1066 438 L1032 424 Z" fill={p.snow} opacity="0.85" />

      {/* Előtér */}
      <path
        d="M0 585 L160 505 L300 560 L450 480 L600 555 L760 495 L900 565 L1060 500 L1200 555 L1200 675 L0 675 Z"
        fill={p.near}
      />

      {/* Fenyők sziluettje */}
      <g fill={p.near} opacity="0.9">
        {[80, 140, 205, 990, 1055, 1120].map((x, i) => (
          <path key={x} d={`M${x} ${610 - (i % 2) * 12} l16 46 h-32 Z M${x} ${632 - (i % 2) * 12} l20 46 h-40 Z`} />
        ))}
      </g>

      <rect y="430" width="1200" height="245" fill={`url(#${uid}-haze)`} opacity="0.25" />
    </svg>
  );
}
