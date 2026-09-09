import { CableCar, Route, Snowflake, TrendingUp } from 'lucide-react';
import { resortInfo } from '@/data/site.config';
import { Section } from '@/components/ui/Section';
import { StatGrid, type StatItem } from '@/components/features/StatGrid';

/** 06 · A HEGY SZÁMOKBAN (drótváz 01/05) — minden érték az adatmodellből. */
export function MountainStats() {
  const items: StatItem[] = [
    {
      id: 'slope-length',
      label: 'Pályahossz',
      value: resortInfo.totalSlopeLengthKm,
      suffix: ' km',
      icon: Route,
      hint: 'Összes pályahossz megadása szükséges',
    },
    {
      id: 'vertical',
      label: 'Szintkülönbség',
      value: resortInfo.verticalDropM,
      suffix: ' m',
      icon: TrendingUp,
      hint: 'Szintkülönbség megadása szükséges',
    },
    {
      id: 'lifts',
      label: 'Felvonók',
      value: resortInfo.liftCount,
      icon: CableCar,
      hint: 'Felvonók száma megadásra vár',
    },
    {
      id: 'snowmaking',
      label: 'Hóágyúzott',
      value: resortInfo.snowmakingCoveragePercent,
      suffix: '%',
      icon: Snowflake,
      hint: 'Hóágyúzott arány megadása szükséges',
    },
  ];

  return (
    <Section tone="deep" labelledBy="szamok-cim">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-glacier-300">A hegy számokban</p>
        <h2 id="szamok-cim" className="text-h1 text-white">
          Amit a terepről tudni érdemes
        </h2>
        <p className="max-w-prose text-[0.98rem] leading-relaxed text-ice-200/80">
          Ezek az adatok a síközpont hivatalos pályakönyvéből származnak majd. Amíg nem érkeznek meg, jelöltként
          jelennek meg — kitalált számokat nem írunk ki.
        </p>
      </div>

      <StatGrid items={items} columns={4} tone="dark" className="mt-8" />
    </Section>
  );
}
