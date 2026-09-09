import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { AvailabilityView } from './AvailabilityView';

export const metadata = pageMetadata({
  title: 'Árak és szabad időpontok — Berghaus Almrausch',
  description:
    'Foglaltsági naptár szabad, foglalt és opciós napokkal, tételes árösszesítő szállásdíjjal, takarítási díjjal, idegenforgalmi adóval és külön feltüntetett kaucióval.',
  path: routes.availability,
});

export default function AvailabilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([
          { name: 'A vendégház', path: routes.stay },
          { name: 'Árak és szabad időpontok', path: routes.availability },
        ]))}
      />
      <AvailabilityView />
    </>
  );
}
