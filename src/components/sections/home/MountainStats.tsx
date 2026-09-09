'use client';

import { CableCar, Route, Snowflake, TrendingUp } from 'lucide-react';
import { useI18n } from '@/i18n/LocaleProvider';
import { mountainStats } from '@/data/homepage';
import { MetricCard } from '@/components/features/MetricCard';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ICONS = { route: Route, 'trending-up': TrendingUp, 'cable-car': CableCar, snowflake: Snowflake } as const;

/** A HEGY SZÁMOKBAN — animált számlálókkal. */
export function MountainStats() {
  const { t, L } = useI18n();

  return (
    <Section tone="white">
      <SectionHeading title={t.home.statsTitle} lead={t.home.statsLead} align="center" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mountainStats.map((stat) => {
          const Icon = ICONS[stat.icon as keyof typeof ICONS] ?? Route;
          return (
            <MetricCard
              key={stat.id}
              value={stat.value}
              label={L(stat.label)}
              icon={<Icon aria-hidden="true" className="h-5 w-5" />}
            />
          );
        })}
      </div>
    </Section>
  );
}
