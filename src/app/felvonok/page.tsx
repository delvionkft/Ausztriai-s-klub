import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { LiftsView } from './LiftsView';

export const metadata = pageMetadata({
  title: 'Felvonók, nyitvatartás és webkamerák',
  description:
    'Élő felvonóállapot szűrhető listában, üzemidők, esti síelés, szezonkezdés és -zárás, valamint négy webkamera a hegyről.',
  path: routes.lifts,
});

export default function LiftsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Felvonók és nyitvatartás', path: routes.lifts }]))}
      />
      <LiftsView />
    </>
  );
}
