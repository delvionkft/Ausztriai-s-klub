import { pageMetadata } from '@/lib/seo';
import { routes } from '@/data/navigation';
import { PrintableSlopeMap } from './PrintableSlopeMap';

/**
 * NYOMTATHATÓ PÁLYATÉRKÉP
 * ----------------------------------------------------------------------------
 * Ebből a nézetből készül a `public/dokumentumok/palyaterkep.pdf` fájl, amit a
 * pályatérkép oldalról lehet letölteni offline használatra. A böngésző
 * nyomtatás funkciójával közvetlenül is kinyomtatható.
 */
export const metadata = pageMetadata({
  title: 'Nyomtatható pályatérkép',
  description: 'A síterep nyomtatható pályatérképe pálya- és felvonólistával, offline használatra.',
  path: `${routes.slopeMap}/nyomtatas`,
  noIndex: true,
});

export default function PrintablePage() {
  return <PrintableSlopeMap />;
}
