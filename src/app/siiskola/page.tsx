import { pageMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { SkiSchoolView } from './SkiSchoolView';

export const metadata = pageMetadata({
  title: 'Síiskola és kölcsönző — kezdőcsomagok, oktatók, felszerelés',
  description:
    'Kezdőcsomag síjeggyel, oktatással és teljes felszereléssel, osztrák képesítésű oktatókkal. Kölcsönző, szerviz és fűtött sítároló a völgyállomáson.',
  path: routes.skiSchool,
});

export default function SkiSchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([{ name: 'Síiskola és kölcsönző', path: routes.skiSchool }]))}
      />
      <SkiSchoolView />
    </>
  );
}
