'use client';

import { Award, Languages, Star } from 'lucide-react';
import type { Instructor } from '@/types';
import { useI18n } from '@/i18n/LocaleProvider';
import { track } from '@/lib/analytics';
import { Media } from '@/components/ui/Media';
import { ButtonLink } from '@/components/ui/Button';
import { routes } from '@/data/navigation';

/**
 * OKTATÓI PROFIL
 * ----------------------------------------------------------------------------
 * Szándékosan semleges, szakmai profil. Kitalált személyes történetet és
 * álértékelést nem tartalmaz — a végleges nevek és fotók a síiskolától jönnek
 * (`src/data/skischool.ts` + `src/data/media.ts`).
 */
export function InstructorCard({ instructor }: { instructor: Instructor }) {
  const { t, L } = useI18n();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-night-100 bg-white shadow-subtle transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lift">
      <Media
        mediaKey={instructor.imageKey}
        className="aspect-[4/3]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        imgClassName="transition-transform duration-500 ease-smooth group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.75rem] font-bold uppercase tracking-wider text-glacier-600">{L(instructor.role)}</p>
        <h3 className="mt-1.5 font-display text-[1.0625rem] font-extrabold leading-snug text-night-950">{instructor.displayName}</h3>

        <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-night-600">{L(instructor.bio)}</p>

        <dl className="mt-4 space-y-2 border-t border-night-100 pt-4 text-[0.8125rem]">
          <div className="flex items-start gap-2">
            <Languages aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-night-400" />
            <dt className="sr-only">{t.school.languages}</dt>
            <dd className="font-semibold text-night-800">{instructor.languages.join(' · ')}</dd>
          </div>
          <div className="flex items-start gap-2">
            <Star aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-night-400" />
            <dt className="sr-only">{t.school.levels}</dt>
            <dd className="font-semibold text-night-800">{instructor.levels.map((l) => L(l)).join(' · ')}</dd>
          </div>
          <div className="flex items-start gap-2">
            <Award aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-night-400" />
            <dt className="sr-only">Képesítés</dt>
            <dd className="leading-snug text-night-600">{L(instructor.certification)}</dd>
          </div>
        </dl>

        <ButtonLink
          href={`${routes.contact}#kapcsolat`}
          variant="secondary"
          size="sm"
          fullWidth
          className="mt-5"
          onClick={() => track('start_ski_school_booking', { instructor: instructor.id })}
        >
          {t.school.bookInstructor}
        </ButtonLink>
      </div>
    </article>
  );
}
