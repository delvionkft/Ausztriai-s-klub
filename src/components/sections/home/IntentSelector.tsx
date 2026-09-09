import Link from 'next/link';
import { ArrowRight, CalendarDays, GraduationCap, Snowflake, Users } from 'lucide-react';
import { intentOptions } from '@/data/homepage';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const icons = { Snowflake, GraduationCap, CalendarDays, Users } as const;

/** 04 · SZÁNDÉK-VÁLASZTÓ — A FŐ ELÁGAZÁS (drótváz 01/03). */
export function IntentSelector() {
  return (
    <Section tone="white" labelledBy="szandek-cim">
      <SectionHeading
        id="szandek-cim"
        eyebrow="Hova tovább?"
        title="Mit terveztek?"
        description="Négy tipikus helyzet — válaszd ki a magadét, és egyből a neked való oldalra viszünk."
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {intentOptions.map((option) => {
          const Icon = icons[option.icon as keyof typeof icons] ?? Snowflake;
          return (
            <li key={option.id}>
              <Link
                href={option.href}
                className="group flex h-full flex-col rounded-card border border-deep-100 bg-white p-5 transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-glacier-300 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-glacier-50 text-glacier-600 transition-colors group-hover:bg-glacier-600 group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[1.05rem] font-semibold text-deep-900">{option.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-deep-600">{option.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-glacier-700">
                  Tovább
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
