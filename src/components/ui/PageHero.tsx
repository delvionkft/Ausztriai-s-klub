import { Media } from './Media';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { cn } from '@/lib/cn';

/**
 * ALOLDALI FEJLÉCKÉP
 * ----------------------------------------------------------------------------
 * Nagy fotó, olvashatóságot biztosító átmenettel, morzsamenüvel és
 * opcionális gyorsadatokkal vagy CTA-kkal.
 */
export function PageHero({
  imageKey, kicker, title, lead, crumbs, children, stats, align = 'left', height = 'md',
}: {
  imageKey: string;
  kicker?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  stats?: Array<{ label: string; value: string }>;
  align?: 'left' | 'center';
  height?: 'sm' | 'md' | 'lg';
}) {
  const minHeight =
    height === 'sm' ? 'min-h-[320px] lg:min-h-[380px]'
      : height === 'lg' ? 'min-h-[520px] lg:min-h-[640px]'
        : 'min-h-[420px] lg:min-h-[500px]';

  return (
    <header className={cn('relative isolate flex items-end overflow-hidden', minHeight)}>
      <div className="absolute inset-0 -z-10">
        <Media mediaKey={imageKey} priority overlay="strong" sizes="100vw" className="h-full w-full" />
      </div>

      <div className="container-page w-full pb-12 pt-28 lg:pb-16 lg:pt-36">
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          {crumbs ? <Breadcrumbs items={crumbs} invert className="mb-5" /> : null}
          {kicker ? (
            <p className="mb-3 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-glacier-300">{kicker}</p>
          ) : null}
          <h1 className="text-display-lg text-white">{title}</h1>
          {lead ? <p className="mt-5 max-w-2xl text-lead text-frost-200">{lead}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}

          {stats && stats.length > 0 ? (
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[0.75rem] font-semibold uppercase tracking-wider text-frost-300/80">{stat.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-extrabold text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </header>
  );
}
