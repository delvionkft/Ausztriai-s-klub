'use client';

import { cn } from '@/lib/cn';

/** SZERVEZÉSI FOLYAMAT — számozott lépések összekötő vonallal. */
export function ProcessSteps({
  steps, invert = false,
}: {
  steps: Array<{ title: string; text: string }>;
  invert?: boolean;
}) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="relative">
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-12 top-6 hidden h-px w-[calc(100%-2rem)] lg:block',
                invert ? 'bg-white/15' : 'bg-night-200',
              )}
            />
          ) : null}
          <span
            className={cn(
              'relative z-10 grid h-12 w-12 place-items-center rounded-xl font-display text-lg font-extrabold',
              invert ? 'bg-glacier-400 text-night-950' : 'bg-night-950 text-white',
            )}
          >
            {index + 1}
          </span>
          <h3 className={cn('mt-4 font-display text-[1.0625rem] font-extrabold', invert && 'text-white')}>{step.title}</h3>
          <p className={cn('mt-2 text-[0.9375rem] leading-relaxed', invert ? 'text-frost-300/85' : 'text-night-600')}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
