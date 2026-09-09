'use client';

import { useEffect } from 'react';
import { useI18n } from '@/i18n/LocaleProvider';
import { routes } from '@/data/navigation';
import { slopeTotals } from '@/data/derived';
import { track } from '@/lib/analytics';
import { PageHero } from '@/components/ui/PageHero';
import { SlopeMap } from '@/components/features/SlopeMap';
import { SlopeList } from '@/components/features/SlopeList';

export function SlopeMapView() {
  const { t } = useI18n();

  useEffect(() => { track('open_slope_map', { source: 'page' }); }, []);

  return (
    <>
      <PageHero
        imageKey="hero-map"
        kicker={t.nav.mountain}
        title={t.map.title}
        lead={t.map.lead}
        crumbs={[{ label: t.nav.slopeMap, href: routes.slopeMap }]}
        height="sm"
        stats={[
          { label: t.difficulty.blueShort, value: `${slopeTotals.byDifficulty.blue}` },
          { label: t.difficulty.redShort, value: `${slopeTotals.byDifficulty.red}` },
          { label: t.difficulty.blackShort, value: `${slopeTotals.byDifficulty.black}` },
          { label: t.map.length, value: `${slopeTotals.totalKm} km` },
        ]}
      />

      <section className="surface-night py-12 lg:py-16">
        <div className="container-wide">
          <SlopeMap />
        </div>
      </section>

      <section className="surface-night border-t border-white/10 py-12 lg:py-16">
        <div className="container-page">
          <SlopeList invert />
        </div>
      </section>
    </>
  );
}
