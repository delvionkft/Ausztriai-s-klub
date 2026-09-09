import { cn } from '@/lib/cn';
import type { ProcessStep } from '@/types';

/** Szervezés lépésről lépésre (drótváz 08/03). */
export function ProcessSteps({ steps, className }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {steps.map((step) => (
        <li key={step.id} className="relative rounded-card border border-deep-100 bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-deep-800 text-sm font-bold text-white">
            {String(step.step).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-[1rem] font-semibold text-deep-900">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-deep-600">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Vízszintes folyamatjelző (drótváz 10/02). */
export function ProgressTracker({
  steps,
  activeIndex,
}: {
  steps: readonly { id: string; label: string }[];
  activeIndex: number;
}) {
  return (
    <nav aria-label="Foglalási folyamat">
      <ol className="scroll-x flex items-center gap-1 whitespace-nowrap">
        {steps.map((step, index) => {
          const done = index < activeIndex;
          const active = index === activeIndex;

          return (
            <li key={step.id} className="flex items-center gap-1">
              <span
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'inline-flex min-h-[40px] items-center gap-2 rounded-pill px-3.5 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-deep-800 text-white'
                    : done
                      ? 'bg-glacier-100 text-glacier-700'
                      : 'bg-white text-deep-500 ring-1 ring-inset ring-deep-100',
                )}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full text-[0.68rem] font-bold',
                    active ? 'bg-white/20 text-white' : done ? 'bg-glacier-600 text-white' : 'bg-deep-50 text-deep-500',
                  )}
                >
                  {index + 1}
                </span>
                {step.label}
              </span>
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className="h-px w-4 shrink-0 bg-deep-200 sm:w-6" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
