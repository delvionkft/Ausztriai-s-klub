import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { LegalPage } from '@/components/sections/LegalPage';
import { houseRules, LEGAL_UPDATED_AT } from '@/data/legal';

export const metadata = pageMetadata({
  title: 'Házirend',
  description: 'A vendégház használatának szabályai — érkezés, csendes pihenő, sítároló, kaució és távozás.',
  path: routes.houseRules,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Házirend', path: routes.houseRules }]))}
      />
      <LegalPage
        title="Házirend"
        lead="A vendégház használatának szabályai — érkezés, csendes pihenő, sítároló, kaució és távozás."
        updatedAt={LEGAL_UPDATED_AT}
        sections={houseRules}
        crumbs={[{ label: 'Házirend', href: routes.houseRules }]}
      />
    </>
  );
}
