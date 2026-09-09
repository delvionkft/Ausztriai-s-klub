'use client';

import Link from 'next/link';
import { Bus, Car, FileText, Plane, Train } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { buildLegalNav, routes } from '@/data/navigation';
import { travelOptions } from '@/data/contact';
import { faqItems } from '@/data/faq';
import { resortInfo } from '@/data/site.config';
import { slopeTotals, liftTotals } from '@/data/derived';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapEmbed } from '@/components/features/MapEmbed';
import { ContactOptions } from '@/components/features/ContactOptions';
import { FAQAccordion } from '@/components/features/FAQAccordion';
import { NewsletterForm } from '@/components/features/NewsletterForm';
import { Reveal } from '@/components/ui/Reveal';

const TRAVEL_ICONS = { car: Car, bus: Bus, train: Train, plane: Plane } as const;

export function ContactView() {
  const { t, L } = useI18n();
  const legal = buildLegalNav(t);

  return (
    <>
      <PageHero
        imageKey="hero-contact"
        kicker={t.nav.info}
        title={t.contact.title}
        lead={t.contact.lead}
        crumbs={[{ label: t.nav.info, href: routes.contact }]}
        height="sm"
      />

      {/* Megközelítés */}
      <Section tone="frost" id="megkozelites">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <MapEmbed />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading title={t.contact.travelTitle} />
            <ul className="mt-8 space-y-4">
              {travelOptions.map((option) => {
                const Icon = TRAVEL_ICONS[option.mode];
                return (
                  <li key={option.id} className="rounded-card border border-night-100 bg-white p-5 shadow-subtle">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-frost-200 text-glacier-600">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-[1rem] font-extrabold text-night-950">{L(option.title)}</h3>
                    </div>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-night-600">{L(option.detail)}</p>
                    <dl className="mt-4 grid gap-2 border-t border-night-100 pt-3 text-[0.8125rem] sm:grid-cols-3">
                      <div>
                        <dt className="text-night-500">{t.contact.distance}</dt>
                        <dd className="font-semibold text-night-900">{option.distance}</dd>
                      </div>
                      <div>
                        <dt className="text-night-500">{t.contact.duration}</dt>
                        <dd className="font-semibold text-night-900">{option.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-night-500">{t.contact.hub}</dt>
                        <dd className="font-semibold text-night-900">{option.hub}</dd>
                      </div>
                    </dl>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* GYIK */}
      <Section tone="white" id="gyik">
        <SectionHeading title={t.contact.faqTitle} lead={t.contact.faqLead} className="mb-10" />
        <FAQAccordion items={faqItems} withCategories />
      </Section>

      {/* Kapcsolat */}
      <Section tone="night" id="kapcsolat">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading title={t.contact.contactTitle} invert />
            <div className="mt-8">
              <ContactOptions invert />
            </div>
          </div>

          <div>
            <h2 className="font-display text-h3 text-white">{t.home.alertTitle}</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-frost-200">{t.home.alertLead}</p>
            <div className="mt-6">
              <NewsletterForm invert />
            </div>
          </div>
        </div>
      </Section>

      {/* Rólunk */}
      <Section tone="frost" id="rolunk">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeading kicker={t.nav.about} title={`${resortInfo.name} — ${resortInfo.region}`} />
            <div className="mt-6 space-y-4">
              <p className="prose-body">
                A Silbergrat Skiarena két völgy között fekszik, {resortInfo.altitudeValleyM} és {resortInfo.altitudePeakM} méter
                között. Családi üzemeltetésben működik 1978 óta: az első tányéros felvonót a mai völgyállomás helyén építették,
                a kabinos felvonó 2004-ben állt üzembe, kabinparkját legutóbb ezen a nyáron cseréltük.
              </p>
              <p className="prose-body">
                Ma {liftTotals.count} felvonó és {slopeTotals.count} pálya üzemel, összesen {slopeTotals.totalKm} kilométeren.
                A pályák {slopeTotals.snowmakingPercent} százaléka hóágyúzható, így a szezont december elején biztonsággal
                el tudjuk indítani. A vendégház, a Berghaus Almrausch, a völgyállomás melletti utcában áll, és ugyanahhoz a
                családhoz tartozik.
              </p>
            </div>
          </div>

          <div id="dokumentumok" className="scroll-mt-40">
            <h2 className="font-display text-h3">{t.contact.legalTitle}</h2>
            <ul className="mt-6 space-y-2">
              {legal.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-card border border-night-100 bg-white px-4 py-3.5 text-[0.9375rem] font-semibold text-night-800 shadow-subtle transition-all hover:-translate-y-0.5 hover:border-glacier-300 hover:text-night-950"
                  >
                    <FileText aria-hidden="true" className="h-4 w-4 shrink-0 text-glacier-600" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
