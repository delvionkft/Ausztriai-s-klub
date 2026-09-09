import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { GroupsView } from './GroupsView';

export const metadata = pageMetadata({
  title: 'Csoportoknak — baráti, családi, klub- és céges társaságok',
  description:
    'Teljes ház 22 főig, csoportos síbérlet-kedvezmény, egy kapcsolattartó és egyetlen számla. Négylépéses szervezés, étkezési és gyerekbarát feltételek.',
  path: routes.groups,
});

export default function GroupsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Csoportoknak', path: routes.groups }]))}
      />
      <GroupsView />
    </>
  );
}
