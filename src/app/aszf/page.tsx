import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { LegalPage } from '@/components/sections/LegalPage';
import { termsOfService, LEGAL_UPDATED_AT } from '@/data/legal';

export const metadata = pageMetadata({
  title: 'Általános szerződési feltételek',
  description: 'Felvonójegyek, szállásfoglalás, síiskola és kölcsönzés feltételei, valamint a panaszkezelés rendje.',
  path: routes.terms,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'ÁSZF', path: routes.terms }]))}
      />
      <LegalPage
        title="Általános szerződési feltételek"
        lead="Felvonójegyek, szállásfoglalás, síiskola és kölcsönzés feltételei, valamint a panaszkezelés rendje."
        updatedAt={LEGAL_UPDATED_AT}
        sections={termsOfService}
        crumbs={[{ label: 'ÁSZF', href: routes.terms }]}
      />
    </>
  );
}
