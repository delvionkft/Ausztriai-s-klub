import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { SlopeMapView } from './SlopeMapView';

export const metadata = pageMetadata({
  title: 'Interaktív pályatérkép',
  description:
    'Kapcsolható rétegek, kattintható pályák és felvonók, nehézségi szintek, hóágyúzott szakaszok, hütték és lezárások. A pályatérkép offline használatra is letölthető.',
  path: routes.slopeMap,
});

export default function SlopeMapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Pályatérkép', path: routes.slopeMap }]))}
      />
      <SlopeMapView />
    </>
  );
}
