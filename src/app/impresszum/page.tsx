import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { LegalPage } from '@/components/sections/LegalPage';
import { imprint, LEGAL_UPDATED_AT } from '@/data/legal';

export const metadata = pageMetadata({
  title: 'Impresszum',
  description: 'Az üzemeltető cégadatai, felügyeleti hatóság, felelősségi és szerzői jogi tájékoztatás.',
  path: routes.imprint,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Impresszum', path: routes.imprint }]))}
      />
      <LegalPage
        title="Impresszum"
        lead="Az üzemeltető cégadatai, felügyeleti hatóság, felelősségi és szerzői jogi tájékoztatás."
        updatedAt={LEGAL_UPDATED_AT}
        sections={imprint}
        crumbs={[{ label: 'Impresszum', href: routes.imprint }]}
      />
    </>
  );
}
