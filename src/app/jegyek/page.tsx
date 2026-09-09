import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { TicketsView } from './TicketsView';

export const metadata = pageMetadata({
  title: 'Jegyek és bérletek — árak, kedvezmények, jegyajánló',
  description:
    'Háromlépéses jegyajánló, naptáras napi árak, teljes ártáblázat felnőtt, ifjúsági, gyermek, diák és nyugdíjas jeggyel, valamint családi és csoportos kedvezmények.',
  path: routes.tickets,
});

export default function TicketsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Jegyek és bérletek', path: routes.tickets }]))}
      />
      <TicketsView />
    </>
  );
}
