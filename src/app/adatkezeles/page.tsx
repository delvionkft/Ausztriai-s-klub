import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { LegalPage } from '@/components/sections/LegalPage';
import { privacyPolicy, LEGAL_UPDATED_AT } from '@/data/legal';

export const metadata = pageMetadata({
  title: 'Adatkezelési tájékoztató',
  description: 'Milyen adatokat kezelünk, milyen célból és meddig, valamint milyen jogaid vannak az adataiddal kapcsolatban.',
  path: routes.privacy,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Adatkezelési tájékoztató', path: routes.privacy }]))}
      />
      <LegalPage
        title="Adatkezelési tájékoztató"
        lead="Milyen adatokat kezelünk, milyen célból és meddig, valamint milyen jogaid vannak az adataiddal kapcsolatban."
        updatedAt={LEGAL_UPDATED_AT}
        sections={privacyPolicy}
        crumbs={[{ label: 'Adatkezelési tájékoztató', href: routes.privacy }]}
      />
    </>
  );
}
