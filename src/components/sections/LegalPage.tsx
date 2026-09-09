import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import type { Crumb } from '@/components/ui/Breadcrumbs';

/**
 * JOGI OLDAL SABLON
 * ----------------------------------------------------------------------------
 * FONTOS: a jogi szövegeket élesítés előtt jogásszal kell véglegesíteni.
 * A tartalom szerkezete és a szakaszok itt már készen állnak, csak a
 * `sections` tömböt kell frissíteni.
 */
export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export function LegalPage({
  title, lead, updatedAt, sections, crumbs, imageKey = 'hero-contact',
}: {
  title: string;
  lead: string;
  updatedAt: string;
  sections: LegalSection[];
  crumbs: Crumb[];
  imageKey?: string;
}) {
  return (
    <>
      <PageHero imageKey={imageKey} kicker="Dokumentumok" title={title} lead={lead} crumbs={crumbs} height="sm" />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-night-500">
            Hatályos: {updatedAt}
          </p>

          <div className="mt-8 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-h3">{section.heading}</h2>
                {section.paragraphs?.map((paragraph, i) => (
                  <p key={i} className="mt-3 text-[1rem] leading-relaxed text-night-700">{paragraph}</p>
                ))}
                {section.list ? (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex gap-3 text-[1rem] leading-relaxed text-night-700">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-glacier-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
