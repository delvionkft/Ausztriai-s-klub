import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { SnowReportView } from './SnowReportView';

export const metadata = pageMetadata({
  title: 'Hójelentés — aktuális hóhelyzet és előrejelzés',
  description:
    'Hóvastagság a hegyen és a völgyben, friss hó 24/48/72 órában, hőmérséklet, szél, háromnapos előrejelzés, valamint a felvonók és pályák élő állapota.',
  path: routes.snowReport,
});

export default function SnowReportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([
          { name: 'Hójelentés', path: routes.snowReport },
        ]))}
      />
      <SnowReportView />
    </>
  );
}
