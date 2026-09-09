import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { LegalPage } from '@/components/sections/LegalPage';
import { cookiePolicy, LEGAL_UPDATED_AT } from '@/data/legal';

export const metadata = pageMetadata({
  title: 'Sütikezelési tájékoztató',
  description: 'Milyen sütiket és böngészőben tárolt adatokat használ a weboldal, és hogyan kezelheted őket.',
  path: routes.cookies,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Sütikezelés', path: routes.cookies }]))}
      />
      <LegalPage
        title="Sütikezelési tájékoztató"
        lead="Milyen sütiket és böngészőben tárolt adatokat használ a weboldal, és hogyan kezelheted őket."
        updatedAt={LEGAL_UPDATED_AT}
        sections={cookiePolicy}
        crumbs={[{ label: 'Sütikezelés', href: routes.cookies }]}
      />
    </>
  );
}
