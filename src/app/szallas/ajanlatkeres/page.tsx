import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { bookingFaq } from '@/data/faq';
import { InquiryView } from './InquiryView';

export const metadata = pageMetadata({
  title: 'Ajánlatkérés — 24 órán belül személyes ajánlat',
  description:
    'Küldd el az időpontot és a létszámot, és 24 órán belül személyes ajánlatot küldünk a Berghaus Almrausch teljes ház foglalására. WhatsApp, telefon és e-mail is elérhető.',
  path: routes.inquiry,
});

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: bookingFaq.map((item) => ({
    '@type': 'Question',
    name: item.question.hu,
    acceptedAnswer: { '@type': 'Answer', text: item.answer.hu },
  })),
};

export default function InquiryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          faqLd,
          breadcrumbLd([
            { name: 'A vendégház', path: routes.stay },
            { name: 'Ajánlatkérés', path: routes.inquiry },
          ]),
        ])}
      />
      <InquiryView />
    </>
  );
}
