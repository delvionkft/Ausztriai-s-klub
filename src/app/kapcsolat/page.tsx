import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { faqItems } from '@/data/faq';
import { ContactView } from './ContactView';

export const metadata = pageMetadata({
  title: 'Megközelítés, GYIK és kapcsolat',
  description:
    'Cím, GPS-koordináták, parkolás és útvonaltervező, érkezés autóval, síbusszal, vonattal vagy repülővel, kategorizált gyakori kérdések és minden elérhetőség.',
  path: routes.contact,
});

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question.hu,
    acceptedAnswer: { '@type': 'Answer', text: item.answer.hu },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          faqLd,
          breadcrumbLd([{ name: 'Kapcsolat', path: routes.contact }]),
        ])}
      />
      <ContactView />
    </>
  );
}
